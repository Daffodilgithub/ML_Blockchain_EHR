
import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography, Paper } from "@mui/material";

const ViewDoctorData = ({ state }) => {
  const { account, contract, web3 } = state;
  console.log(account, contract);

  const [doctorLicenseId, setDoctorLicenseId] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch doctor License ID based on the address
  useEffect(() => {
    const fetchDoctorLicenseId = async () => {
      try {
        const licenseId = await contract.methods.getDoctorLicenseidByAddress(account).call();
        console.log(licenseId);
        setDoctorLicenseId(licenseId);
      } catch (error) {
        console.error("Error fetching doctor license ID:", error);
      }
    };

    if (account && contract) {
      fetchDoctorLicenseId();
    }
  }, [account, contract]);

  // Fetch doctor details
  const fetchDoctorData = async () => {
    setLoading(true);
    try {
     
      const details = await contract.methods.retrieveDoctorDetails(doctorLicenseId).call();
      setDoctorDetails(details);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
    setLoading(false);
  };

  return (
    <Box>
      {doctorLicenseId === null ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
          <Button variant="contained" onClick={fetchDoctorData} disabled={loading}>
            {loading ? "Loading..." : "View Your Details"}
          </Button>

          {doctorDetails && (
            <Paper elevation={3} sx={{ mt: 2, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6">Doctor Details</Typography>
              <Typography>Name: {doctorDetails.doctorName}</Typography>
             {/* <Typography>Age: {Number(doctorDetails.age)}</Typography>
              <Typography>Email: {doctorDetails.email}</Typography> */}
              <Typography>Phone: {Number(doctorDetails.doctorPhone)}</Typography>
             {/* <Typography>Gender: {doctorDetails.gender}</Typography> */}
              <Typography>Hospital: {doctorDetails.hospitalName}</Typography>
              <Typography>Specialization: {doctorDetails.specialization}</Typography>
              <Typography>License ID: {doctorDetails.doctorLicenseid}</Typography>
             {/* <Typography>Doctor Address: {doctorDetails.doctorAddress}</Typography> */}
              
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default ViewDoctorData;

