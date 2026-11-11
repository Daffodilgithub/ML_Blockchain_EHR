import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegPatient.css";
import AuthenticationHash from "./AuthenticationHash";
import { useNavigate } from "react-router-dom";

const RegDoctor = ({ state }) => {
  const { account, contract, web3 } = state;
  console.log(account, contract);

  
  // age, email, gender , address
  const [doctorName, setDoctorName] = useState("");
//  const [age, setAge] = useState("");
//  const [email, setEmail] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
 // const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorLicenseid, setDoctorLicenseid] = useState("");
 // const [ doctorAddress, setDoctorAddress]=useState("");
  
  const [password, setPassword] = useState("");
  const [digicode, setDigicode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);
    setIsLoading(true);
    setErrorMessage('');
    try {
      console.log(account);
      console.log(contract.methods);

      

     
      // Generate Authentication Hash
      const finalHash = await AuthenticationHash(
        doctorName,
        account,
        password,
        digicode,
        web3
      );
      console.log(finalHash);

      if ( contract && contract.methods) {
        // Register doctor on the blockchain
        const result = await contract.methods
          .regDoctor(
            doctorName,
           // age,
           // email,
            doctorPhone,
           // gender,
           // doctorAddress,
            specialization,
            hospitalName,
            doctorLicenseid,
            finalHash
          )
          .send({ from: account });  

        const id = result.events?.DoctorRegistered?.returnValues[0];
        console.log(id);
        setIsLoading(false);
        alert(`Registration successful! Your Doctor licenseID is: ${id}`);
        navigate("/login-doctor");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Doctor Registration</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>

       {/* <div className="form-row">
         <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div> 

          <div className="form-group">
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
          </div>
        </div>
        */}

      {/*  <div className="form-group">
            <label>Doctor Address</label>
            <input
              type="text"
              value={doctorAddress}
              onChange={(e) => setDoctorAddress(e.target.value)}
              required
            />
          </div> */}

        <div className="form-row">
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Hospital Name</label>
            <input
              type="text"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Doctor License ID</label>
          <input
            type="text"
            value={doctorLicenseid}
            onChange={(e) => setDoctorLicenseid(e.target.value)}
            required
          />
        </div>

        

        <div className="form-row">
          <div className="form-group">
            <label>Doctor Phone</label>
            <input
              type="text"
              value={doctorPhone}
              onChange={(e) => setDoctorPhone(e.target.value)}
              required
            />
          </div>

        {/* <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}
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
          {isLoading ? "Registering..." : "Register Doctor"}
        </button>

        <p>
          Already registered?{" "}
          <Link to="/login-doctor" style={{ color: "yellow", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegDoctor;
