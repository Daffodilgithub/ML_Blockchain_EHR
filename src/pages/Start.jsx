import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start = ({state}) => {
    const { account, contract, web3 } = state;
  console.log(account,contract,web3);
  const navigate = useNavigate();

  const handlePatientLogin = () => {
    // Navigate to the patient login page
    navigate("/login-patient");
  };

  const handleDoctorLogin = () => {
    // Navigate to the doctor login page
    navigate("/login-doctor");
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Login as</h2>
        <button
          onClick={handlePatientLogin}
          style={{
            width: '200px',
            padding: '12px 0',
            margin: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
        >
          Patient
        </button>
        <br />
        <button
          onClick={handleDoctorLogin}
          style={{
            width: '200px',
            padding: '12px 0',
            margin: '10px',
            fontSize: '16px',
            backgroundColor: '#008CBA',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
        >
          Doctor
        </button>
      </div>
    </div>
  );
};

export default Start;
