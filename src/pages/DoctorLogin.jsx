import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authvalidation from './Authvalidation';

const DoctorLogin = ({ state }) => {
  const { account, contract, web3 } = state;
  console.log(account)

  const [doctorLicenseid, setdoctorLicenseid] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!doctorLicenseid || !password || !securityCode) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

   

    try {
      const registerdoctorLicenseid = await contract.methods.getDoctorLicenseidByAddress(account).call();

      if (doctorLicenseid !== registerdoctorLicenseid) {
        setErrorMsg("Doctor id does not match with MetaMask account.");
        return;
      }

     // console.log(password)

      const DoctorDetails = await contract.methods.retrieveDoctorDetails(doctorLicenseid).call({ from: account });
      const doctorName = DoctorDetails.doctorName;
      const storedHash = await contract.methods.getDoctorSignatureHash(doctorLicenseid).call();
      console.log(storedHash)
      const isValid = await Authvalidation(doctorName, account, password, securityCode, web3, storedHash);

      if (isValid) {
        setIsLoggedIn(true);
        navigate('/dashboard-doctor'); 
      } else {
        setErrorMsg("Incorrect credentials.");
        setPassword('');
        setSecurityCode('');
      }

    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred during login.");
    }
  };

  
  const goToRegister = () => {
    navigate('/reg-doctor'); 
  };

  
  const styles = {
    loginContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    formField: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '15px',
    },
    registerButton: {
      padding: '8px 16px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    registerButtonHover: {
      backgroundColor: '#0056b3',
    },
    errorMessage: {
      color: 'red',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '15px',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <h1 style={styles.heading}>Login to Your Account</h1>

      {errorMsg && <div style={styles.errorMessage}>{errorMsg}</div>} 

      <form onSubmit={handleLogin}>
        <div style={styles.formField}>
          <label htmlFor="doctorLicenseid" style={styles.label}>Doctor licenseid</label>
          <input
            type="text"
            id="doctorLicenseid"
            value={doctorLicenseid}
            onChange={(e) => setdoctorLicenseid(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formField}>
          <label htmlFor="securityCode" style={styles.label}>Security Code</label>
          <input
            type="text"
            id="securityCode"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.registerLink}>
        <p>Don't have an account?</p>
        <button onClick={goToRegister} style={styles.registerButton}>  
          Register
        </button>
      </div>
    </div>
  );
};

export default DoctorLogin;




