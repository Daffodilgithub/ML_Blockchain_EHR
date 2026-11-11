import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; 
import { Button, Typography, Box } from '@mui/material';

const ApprovePage = () => {
  const { patientId } = useParams(); 
  const location = useLocation(); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGrantAccess = async () => {
    setLoading(true);
    try {
      // Send a POST request to backend to grant access
      const response = await fetch('http://localhost:3000/api/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, decision: 'grant' }), // send patientId and decision
      });

      const result = await response.json();
      if (result.success) {
      setMessage("otp sent successfully!");
      } else {
        setMessage("otp could not be sent");
      }
    } catch (error) {
      console.error("Error granting access:", error);
      setMessage("Error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleDenyAccess = async () => {
    setLoading(true);
    try {
      // Send a POST request to backend to deny access
      const response = await fetch('http://localhost:3000/api/deny-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, decision: 'deny' }), // send patientId and decision
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Access denied successfully!");
      } else {
        setMessage("Failed to deny access.");
      }
    } catch (error) {
      console.error("Error denying access:", error);
      setMessage("Error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Do you want to grant or deny access to your medical data?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please choose one of the options below:
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGrantAccess}
          sx={{ marginRight: 2 }}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Grant Access'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDenyAccess}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Deny Access'}
        </Button>
      </Box>

      {message && <Typography variant="body2" sx={{ marginTop: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default ApprovePage;
