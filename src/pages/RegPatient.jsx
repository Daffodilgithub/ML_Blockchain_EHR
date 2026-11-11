import { useState} from "react";
import { Link } from "react-router-dom";
import "./Regpatient.css"
import AuthenticationHash from "./AuthenticationHash"
import { useNavigate } from "react-router-dom";





const RegPatient=({state})=>{
    const {account,contract,web3}=state;
    console.log(account,contract)
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler=(e) => {
    setSelectedFile(e.target.files[0]);
  };


   /// name , age , ph , bloodgroup, medical report , authenticate hash

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
 // const [email, setEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
 // const [gender, setGender] = useState("");
  const[bloodGroup,setbloodGroup]=useState("")
 // const [patientAddress, setPatientAddress] = useState("");
 //  const [medicalCondition,setmedicalCondition]=useState("")
  const [password, setPassword] = useState("");
  const [digicode, setDigicode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 
  const navigate=useNavigate();
 
  

  

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(password)
    setIsLoading(true);
    setErrorMessage('');
    try{

      console.log(account)
      console.log(contract.methods)

      

        const formData=new FormData();
        formData.append("file",selectedFile);
        const metadata=JSON.stringify({name:selectedFile.name});
        formData.append("pinataMetadata",metadata);

        const options=JSON.stringify({
            cidVersion: 0
        });

        formData.append("pinataOptions",options);

        const res=await fetch(

            "https://api.pinata.cloud/pinning/pinFileToIPFS",

            {
                method:"POST",
                headers:{

                    Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NDMxMmE2Yy00YjIzLTQxYWMtYTE5Yy02YmM5Yjg0YTZkNTQiLCJlbWFpbCI6InNhZ2FyaWthMDEwMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJmZGM4NWQzMDAwZGZiMTBhYTNkIiwic2NvcGVkS2V5U2VjcmV0IjoiOWViMTM0MWRjNzBkNjBlZWFjODYxNDkwNGE5ZDVhYmRjMzgwYTg4ZDliOGQ4MTMwMGMyOGIzNmY5YzhjOWI4YyIsImV4cCI6MTc1NDgzODAwMX0.FJpwCIdY6YSt2Ia6J46vx-E8CiHcyflv4WA-AXSrjYQ`

                } ,
                body: formData
            }


        );

        const resData=await res.json();
        console.log(resData) 

        const medicalreportHash=resData.IpfsHash

        //authentication Hash 

        const finalHash = await AuthenticationHash(patientName, account, password, digicode, web3);
        console.log(finalHash)


        if (medicalreportHash && contract && contract.methods) {
            const result = 
            await contract.methods
              .regPatient(
               
                patientName,
                age,
               // email,
                patientPhone,
               // gender,
                bloodGroup,
               // patientAddress,
               // medicalCondition,
                [medicalreportHash],
                finalHash 
             ) 
              .send({ from: account });
             const id= result.events?.PatientRegistered?.returnValues[0];
             const numId=Number(id)
             console.log("Patient id is:", numId)
             setIsLoading(false);
             alert(`Registration successful! Your Patient ID is: ${id}`); 
             navigate('/login-patient')  

            



    }
   }catch(error)
    {
        console.error(error);
        setErrorMessage("Registration failed. Please try again.");
        setIsLoading(false);
    }



};





    return<>

    <div className="registration-container">
      <h2>Patient Registration</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

     { /*  <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>  */ }
        </div>
        
        <div className="form-row">
        <div className="form-group">
          <label>Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setbloodGroup(e.target.value)}
            required
          >
            <option value="">Select Bloodgroup</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
          </select>
        </div>




      {/*  <div className="form-group">
          <label>Patient Address</label>
          <textarea
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
            required
          />
        </div> */} 
        </div>
        
        <div className="form-row">
        <div className="form-group">
          <label>Patient Phone</label>
          <input
            type="text"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            required
          />
        </div>

     { /*  <div className="form-group">
          <label>Medical Condition</label>
          <textarea
            value={medicalCondition}
            onChange={(e) => setmedicalCondition(e.target.value)}
            required
          />
        </div> */} 
        </div>
        <div className="form-row">
        <div className="form-group">
          <label>Medical Report </label>
          <input
            type="file"
            onChange={changeHandler}
            required
          />
        </div>
       
      {/*  <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>  */}  
        </div>
        <div className="form-row">
        
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        


        <div className="form-group">
          <label>Digicode</label>
          <input
            type="text"
            value={digicode}
            onChange={(e) => setDigicode(e.target.value)}
            required
          />
        </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Patient'}
        </button>



        <p>
        Already registered? <Link to="/login-patient" style={{ color: 'yellow', textDecoration: 'none' }}>Login here</Link>
      </p>

      </form>
    </div>
   
    </>
}

export default RegPatient;