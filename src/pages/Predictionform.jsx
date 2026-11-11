
import MultiStepForm from "./MultiStepForm";
import { useNavigate } from "react-router-dom";

const Predictionform = ({ state }) => {


    const navigate=useNavigate();

  return (
    <div>
      <h1> Prediction Form</h1>
      <MultiStepForm state={state} /> 
      
    </div>
  );
};

export default Predictionform;
