


import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Request = ({ state }) => {
  const { account, contract, web3 } = state;
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [sseConnection, setSseConnection] = useState(null); // To store the SSE connection

  const [showGrantAccessButton, setShowGrantAccessButton] = useState(false); // Flag to show grant access button

  // Store patient ID after the access request is sent
  const [storedPatientId, setStoredPatientId] = useState("");

  const [grantAccess, setGrantAccess] = useState(false); // Flag to track if grant access was successful

////////////
   const [patientDetails, setPatientDetails] = useState(null);
   const [predictions, setPredictions] = useState([]);
   const [reportLinks, setReportLinks] = useState([]);
   const [showReports, setShowReports] = useState(false);
 ///////////// 


  
  const handleRequestAccess = async () => {
    setLoading(true);
    setNotification(""); 

    if (!patientId || !patientName) {
      setNotification("Patient ID and Name are required.");
      setLoading(false);
      return;
    }

    try {
     
      const result = await contract.methods
        .requestAccess(patientId, patientName) 
        .send({ from: account });

      if (result) {
        setNotification("Access request sent successfully!");

       
        setStoredPatientId(patientId);


       
        await sendToBackend(patientId, account);
      }
    } catch (error) {
      console.error("Error in requesting access:", error);
      setNotification("Error in sending request. Please try again.");
    }

    setLoading(false);
  };

  // Function to send data to the backend
  const sendToBackend = async (patientId, doctorAddress) => {
    try {
      const response = await fetch('http://localhost:3000/api/doctor-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId, doctorAddress }),
      });

      if (response.ok) {
        console.log('Request sent to the backend successfully');
      } else {
        console.error('Error sending request to the backend');
      }
    } catch (error) {
      console.error('Error in backend call:', error);
    }
  };

  
  // Function to establish SSE connection and listen for updates
const establishSSEConnection = () => {
  // Check  an open SSE connection
  if (sseConnection) return;

  
  const eventSource = new EventSource(`http://localhost:3000/api/notify-doctor/${account}`);

  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received message:', data);

    
    setNotification(data.message);
    if (data.message === "You have been granted access to the patient\'s medical records.") {
      setShowGrantAccessButton(true);
    }
  };

 
  eventSource.onerror = (error) => {
    console.error('Error with SSE connection:', error);
   
    eventSource.close();
  };

  
  setSseConnection(eventSource);
};


useEffect(() => {
  
  if (account) {
    establishSSEConnection();
  }

  // Clean up the SSE connection when the component unmounts
  return () => {
    if (sseConnection) {
      sseConnection.close();
    }
  };
}, [account]);  






const handleGrantAccess = async () => {

  if (!storedPatientId) {
    setNotification("No patient ID found to grant access.");
    return;
  }


  try {
    
      
     const doctorLicenseId = await contract.methods.getDoctorLicenseidByAddress(account).call();

     
      const response = await contract.methods.grantAccess(patientId, doctorLicenseId).send({ from: account });

      console.log('Access granted:', response);

      if (response.status === 1n) {
        setGrantAccess(true);
        setNotification("You can now view the patient's medical reports.");
      }
    
  } catch (error) {
    console.error('Error granting access:', error);
    setNotification("Failed to record grant access in smart contract. Please try again.");
  }
};


const fetchPatientReports = async () => {
  setLoading(true);

  try {
    const details = await contract.methods.retrievePatientDetails(storedPatientId).call();
    setPatientDetails(details);

   const predictionsData = await contract.methods.getPredictions(storedPatientId).call();
    setPredictions(predictionsData);

    const links = details.medicalReport.map((report) => {
      return `https://pink-big-cattle-300.mypinata.cloud/ipfs/${report}`;
    });

    setReportLinks(links);
    
  } catch (error) {
    console.error("Error fetching patient reports or predictions", error);
    setNotification("Error fetching patient reports. Please try again.");
  }

  setLoading(false);
};



  return (
    <div>
      <h2>Request Access to Patient's Data</h2>
      
      <div>
        <label htmlFor="patientId">Patient ID:</label>
        <input
          type="number"
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID"
        />
      </div>

      <div>
        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter Patient Name"
        />
      </div>

      <button onClick={handleRequestAccess} disabled={loading}>
        {loading ? 'Processing...' : 'Request Access'}
      </button>

      {notification && <p>{notification}</p>}

      
      {showGrantAccessButton && (
        <div>
          <p>Click below to record grant access to patient's records:</p>
          <button onClick={handleGrantAccess}>Grant Access recorded</button>
        </div>
      )}



      
      {/* Show "Grant Access" button after notification */}
      {grantAccess && (
        <div>
          <p>You have been granted access. Click below to view the patient's medical reports:</p>
          <button onClick={fetchPatientReports}>View Patient Reports</button>
        </div>
      )}


{predictions.length > 0 && (
  <div style={{ marginTop: '20px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h3>Predictions</h3>
    <ul>
      {predictions.map((prediction, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>
          <p>{prediction.prediction}</p>
          <small>(Timestamp: {new Date(Number(prediction.timestamp) * 1000).toLocaleString()})</small>
        </li>
      ))}
    </ul>
  </div>
)}

{reportLinks.length > 0 && (
  <div style={{ marginTop: '20px', padding: '20px' }}>
    <button onClick={() => setShowReports(!showReports)}>
      {showReports ? "Hide" : "Show reports"}
    </button>
    {showReports && (
      <ul>
        {reportLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Report {index + 1}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
)}



    </div>
  );
};

export default Request;

