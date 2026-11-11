import React from 'react';

const FormNavigation = ({ step, handleNext, handlePrev, handleSubmit }) => {
  return (
    <div className="formnavigation">
      
      <button className="prev" type="button" onClick={handlePrev} disabled={step === 1}>Previous</button>
      
      
      {step === 1 && <button className="next" type="button" onClick={handleNext}>Next</button>}
      
      
      {step === 2 && <button className="submit" type="button" onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

export default FormNavigation;
