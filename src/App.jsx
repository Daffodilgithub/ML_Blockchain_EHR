import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Navbar from './pages/Navbar';
import Home from "./pages/Home";
import RegPatient from './pages/RegPatient';

//import Update from './pages/Update';
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Predictionform from "./pages/Predictionform"
import ViewPatientData from "./pages/ViewPatientData"
import Addmedical from "./pages/Addmedical"
import DoctorLogin from './pages/DoctorLogin'
import Start from './pages/Start';
import RegDoctor from './pages/RegDoctor';
import DashboardDoctor from './pages/DashboardDoctor';
import ViewDoctorData from './pages/ViewDoctorData';
import Request from './pages/Request'
import ApprovePage from './pages/ApprovePage';
import OtpVerify from './pages/OtpVerify';


import './App.css'

function App() {

  const [state, setState] = useState({ web3: null,   contract: null,  account: null});
  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  const router = createBrowserRouter([
    { path: "/", element: <Home saveState={saveState}/> },
    { path: "/reg-patient", element: <RegPatient state={state}/> },
   
   // { path: "/update-patient", element: <Update/> },
    {path:"/login-patient",element:<Login state={state}/>},
    {path:"/dashboard-patient",element:<Dashboard state={state}/>},
    {path:"/prediction-patient",element:<Predictionform state={state}/>},
    {path:"/view-patient",element:<ViewPatientData state={state}/>},
    {path:"/report-patient",element:<Addmedical state={state}/>},
    {path:"/login-doctor",element:<DoctorLogin state={state}/>},
    {path:"/start",element:<Start state={state}/>},
    {path:"/reg-doctor",element:<RegDoctor state={state}/>},
    {path:"/dashboard-doctor",element:<DashboardDoctor state={state}/>},
    {path:"/view-doctor",element:<ViewDoctorData state={state}/>},
    {path:"/request-access",element:<Request state={state}/>},
    {path:"/approve-access/:patientId" ,element:<ApprovePage />},
    {path:"/verify-otp/:patientId" , element:<OtpVerify/>} 

  ]);

  

  return (
    
    <>
    <RouterProvider router={router} /> 
    </>           
    
  )
}

export default App
