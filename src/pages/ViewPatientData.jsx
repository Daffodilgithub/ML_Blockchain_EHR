
import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography,Paper } from "@mui/material";
import {Web3} from "web3";

const ViewPatientData = ({state }) => {
  const {account,contract,web3}=state;
  console.log(account,contract);
  const [patientId, setPatientId] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [reportLinks, setReportLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReports, setShowReports] = useState(false);

  // Fetch patient ID from the address
  useEffect(() => {
    const fetchPatientId = async () => {
      try {
        const id = await contract.methods.getPatientIdByAddress(account).call();
        console.log(id)
        const patientIdNumber=Number(id);
        console.log(patientIdNumber)
        // Set the patientId state
        setPatientId(patientIdNumber);
      } catch (error) {
        console.error("Error fetching patient ID:", error); 
      }
    };

    if (account && contract) {
      fetchPatientId();
    }
  }, [account, contract]);

  
  const fetchPatientData = async () => {
    setLoading(true);
    try {
      // Fetch patient details
      const details = await contract.methods.retrievePatientDetails(patientId).call();
      setPatientDetails(details);

    
      const predictionsData = await contract.methods.getPredictions(patientId).call();
      setPredictions(predictionsData);

     
      const links = details.medicalReport.map((report) => {
        
        return `https://pink-big-cattle-300.mypinata.cloud/ipfs/${report}`;
      });
      setReportLinks(links);
    } catch (error) {
      console.error("Error fetching patient details or predictions:", error);
    }
    setLoading(false);
  };

  return (
    <Box>
      {patientId === null ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
          <Button variant="contained" onClick={fetchPatientData} disabled={loading}>
            {loading ? "Loading..." : "View Your Details"}
          </Button>

          {patientDetails && (
            <Paper elevation={3} sx={{ mt: 2, p: 2,display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6">Patient Details</Typography>
              <Typography>Name: {patientDetails.patientName}</Typography>
              <Typography>Age: {Number(patientDetails.age)}</Typography>
            {/* <Typography>Email: {patientDetails.email}</Typography> */}
              <Typography>Phone: {Number(patientDetails.patientPhone)}</Typography>
             {/* <Typography>Gender: {patientDetails.gender}</Typography> */}
              <Typography>Blood Group: {patientDetails.bloodGroup}</Typography>
             {/*  <Typography>Address: {patientDetails.patientAddress}</Typography>
              <Typography>Medical Condition: {patientDetails.medicalCondition}</Typography> */}
            </Paper>
          )}

          {predictions.length > 0 && (
           <Paper elevation={3} sx={{ mt: 2, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="h6">Predictions</Typography>
              <List>
                {predictions.map((prediction, index) => (
                  <ListItem key={index}>
                    <Typography>{prediction.prediction}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        (Timestamp: {new Date(Number(prediction.timestamp) * 1000).toLocaleString()})
                    </Typography>

                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {reportLinks.length > 0 && (
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
              <Button variant="contained" onClick={() => setShowReports(!showReports)}>
                {showReports? "Hide" : "Show reports"}
              </Button>
              {showReports && (
              <List>
                {reportLinks.map((link, index) => (
                  <ListItem key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Report {index + 1}
                    </a>
                  </ListItem>
                ))}
              </List>
              )}
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default ViewPatientData; 
