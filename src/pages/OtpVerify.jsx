import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';

const OtpVerify = () => {
  const { patientId } = useParams(); // Get the patientId from the URL
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage(''); 
  
    try {
      const response = await fetch('http://localhost:3000/api/match-otp', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, otp }), // Send the patientId and OTP to backend
      });

      const result = await response.json();

      if (result.success) {
        setMessage('OTP verified successfully! Access granted.');
       
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setMessage('An error occurred. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Enter the OTP to Verify Access
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please enter the OTP sent to your mobile phone to verify access.
      </Typography> 

      <TextField
        label="Enter OTP"
        variant="outlined"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      {message && <Typography variant="body2" sx={{ marginTop: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default OtpVerify;
