import {useState} from'react'

const ViewPatient=({state})=>{
   const{account,contract}=state;
  // console.log(contract,account)



  const [patientData,setpatientData]=useState(); 
  

  const viewPatient =async(event)=>{     
      try{
         event.preventDefault()  
         const patientid = document.querySelector("#patientId").value;                               
         const res = await fetch(`http://localhost:3000/viewPatientDetails/${patientid}`,    
         {
           method:"GET",
           headers:{
               "content-type":"application/json"  // content 
           }
         });
         const patientData = await res.json();
         
         if(patientData.status===200)
         {
         // console.log(patientData.patientDetailsRes)
          setpatientData(patientData.patientDetailsRes)
         }
         else{
          throw new Error;
         }
      }catch(error){
         
          console.error(error)
      }
   }


   const [links, setLinks] = useState([]);
   const baseUrl = 'https://pink-big-cattle-300.mypinata.cloud/ipfs/';


   const medicalReports = (medReport) => {

    console.log(medReport)
    /*return medReport.map((hash, index) => {
      const url = `https://pink-big-cattle-300.mypinata.cloud/ipfs/${hash}`;
      const buttonLabel = `Report ${index + 1}`;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"

          style={{ display: 'block', margin: '10px 0', textDecoration: 'none', color: '#007bff' }}
          
        >
          {buttonLabel}
        </a>
      );
    });*/

    const newLinks = medReport.map(value => `${baseUrl}${value}`);
    setLinks(newLinks);

  };



  
  








    return<>
    <Navbar/>

    <div>
        {patientData?(
            <div>

          <h3>Patient Details</h3>
          <p><strong>ID:</strong> {patientData.patientId}</p>
          <p><strong>Name:</strong> {patientData.patientName}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
        {/*  <p><strong>Gender:</strong> {patientData.gender}</p>
        //  <p><strong>Address:</strong> {patientData.patientAddress}</p> */}
          <p><strong>Phone:</strong> {patientData.patientPhone}</p>
        {/* <p><strong>Medical Data:</strong> {patientData.medicalData}</p>
         <p><strong>Email:</strong> {patientData.email}</p> */ }

         <div>
          <button
                 onClick={() =>
               medicalReports(patientData.medicalReport)
                     }
          >
             View Reports
            </button>


         <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Report {index + 1}
            </a>
          </li>
        ))}
      </ul>


            </div>





          
        </div>

        ):(<p>search patient id</p>)}
    
    
       <form onSubmit={viewPatient}>
         <label>
           Patient ID:
            <input id="patientId"></input></label>
            <button type="submit">View Patient details</button></form>

    
          
          
     </div> 
    </>
}

export default ViewPatient;   

