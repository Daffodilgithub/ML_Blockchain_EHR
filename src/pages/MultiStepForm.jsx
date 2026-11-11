import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import FormNavigation from './FormNavigation';
import "./Multi.css";
import { useNavigate } from "react-router-dom";
import {Web3} from "web3";



const MultiStepForm = ({state}) => {
   
  const {account,contract,web3}=state;
  console.log(account);
  const navigate=useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    textureMean: '',
                   smoothnessMean: '',
                   compactnessMean: '',
                   concavePointsMean: '',
                   symmetryMean: '', 
                   fractalDimensionMean: '',
                   textureSe: '',
                   areaSe: '',
                   smoothnessSe: '',
                   compactnessSe: '', 
                   concavitySe: '', 
                   concavePointsSe: '',
                   symmetrySe: '',
                   fractalDimensionSe: '', 
                   textureWorst: '', 
                   areaWorst: '',
                   smoothnessWorst: '',
                    compactnessWorst: '',
                    concavityWorst: '',
                    concavePointsWorst: '',
                   symmetryWorst: '',
                   fractalDimensionWorst: ''
  });

  const [errors, setErrors] = useState({});
  const [prediction,setPrediction]=useState(null);
  const[errormessage,setErrormessage]=useState("");

  // Validate Step 1
  const validateStep1 = () => {
    let valid = true;
    let newErrors = {};

    const step1Fields = [
      'textureMean', 'textureSe', 'textureWorst',
       'areaSe', 'areaWorst',
      'smoothnessMean', 'smoothnessSe', 'smoothnessWorst',
      'compactnessMean', 'compactnessSe', 'compactnessWorst'
    ];

    step1Fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // Validate Step 2
  const validateStep2 = () => {
    let valid = true;
    let newErrors = {};

    const step2Fields = [
      'concavePointsMean', 'concavePointsSe', 'concavePointsWorst',
      'symmetryMean', 'symmetrySe', 'symmetryWorst',
       'concavitySe', 'concavityWorst',
      'fractalDimensionMean', 'fractalDimensionSe', 'fractalDimensionWorst'
    ];

    step2Fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };



  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!validateStep2()) {
      return; 
    }
  
    try {
      
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });
  
      if (response.ok) {
        
        const result = await response.json();
        
        console.log("Response:", result); 
        setPrediction(result.prediction); 

        setErrormessage(""); 

        if(contract)
        {
            const id = await contract.methods.getPatientIdByAddress(account).call();
            
            if (id) {
                const tx = await contract.methods.addPrediction(id, result.prediction).send({ from: account });
                console.log("Prediction stored in the contract:", tx);
              } else {
                setErrormessage("Patient not found!");
              }
        }
        
        
      } else {
        
        const errorResult = await response.json();
        setErrormessage(errorResult.error || "Something went wrong."); 
        setPrediction(null); 
      }
  
    } catch (error) {
      
      console.error("Error:", error);
      
    }
  };

  









  return (
    <div className="container">
      {/* Main Form */}
      <div className="form">
        <h1>Breast Cancer Prediction</h1> {/* Main Heading */}
        
       
        <ul className="stepIndicator">
          <li className={step === 1 ? 'active' : (step > 1 ? 'completed' : '')}>Step 1</li>
          <li className={step === 2 ? 'active' : (step > 2 ? 'completed' : '')}>Step 2</li>
        </ul>

       
        {step === 1 && (
          <Step1Form formData={formData} setFormData={setFormData} errors={errors} />
        )}
        {step === 2 && (
          <Step2Form formData={formData} setFormData={setFormData} errors={errors} />
        )}

       
        <FormNavigation
          step={step}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleSubmit={handleSubmit} 
        />


      
       <div className="result">
          {prediction && <h2>Prediction: {prediction}</h2>}
          {errormessage && <p className="error">{errormessage}</p>}
        </div>


      </div>
    </div>
  );
};

export default MultiStepForm;

