import React from 'react';

const Step2Form = ({ formData, setFormData, errors }) => {
  return (
    <div className="form-content">
      {/* Concave Points */}
      <div className="form-row">
        <div>
          <label htmlFor="concavePointsMean">Concave Points - Mean</label>
          <input
            type="number"
            id="concavePointsMean"
            value={formData.concavePointsMean}
            onChange={(e) => setFormData({ ...formData, concavePointsMean: e.target.value })}
          />
          {errors.concavePointsMean && <span className="error">{errors.concavePointsMean}</span>}
        </div>
        <div>
          <label htmlFor="concavePointsSe">Concave Points - SE</label>
          <input
            type="number"
            id="concavePointsSe"
            value={formData.concavePointsSe}
            onChange={(e) => setFormData({ ...formData, concavePointsSe: e.target.value })}
          />
          {errors.concavePointsSe && <span className="error">{errors.concavePointsSe}</span>}
        </div>
        <div>
          <label htmlFor="concavePointsWorst">Concave Points - Worst</label>
          <input
            type="number"
            id="concavePointsWorst"
            value={formData.concavePointsWorst}
            onChange={(e) => setFormData({ ...formData, concavePointsWorst: e.target.value })}
          />
          {errors.concavePointsWorst && <span className="error">{errors.concavePointsWorst}</span>}
        </div>
      </div>

      {/* Symmetry */}
      <div className="form-row">
        <div>
          <label htmlFor="symmetryMean">Symmetry - Mean</label>
          <input
            type="number"
            id="symmetryMean"
            value={formData.symmetryMean}
            onChange={(e) => setFormData({ ...formData, symmetryMean: e.target.value })}
          />
          {errors.symmetryMean && <span className="error">{errors.symmetryMean}</span>}
        </div>
        <div>
          <label htmlFor="symmetrySe">Symmetry - SE</label>
          <input
            type="number"
            id="symmetrySe"
            value={formData.symmetrySe}
            onChange={(e) => setFormData({ ...formData, symmetrySe: e.target.value })}
          />
          {errors.symmetrySe && <span className="error">{errors.symmetrySe}</span>}
        </div>
        <div>
          <label htmlFor="symmetryWorst">Symmetry - Worst</label>
          <input
            type="number"
            id="symmetryWorst"
            value={formData.symmetryWorst}
            onChange={(e) => setFormData({ ...formData, symmetryWorst: e.target.value })}
          />
          {errors.symmetryWorst && <span className="error">{errors.symmetryWorst}</span>}
        </div>
      </div>

      {/* Concavity */}
      <div className="form-row">
        {/*<div>
          <label htmlFor="concavityMean">Concavity - Mean</label>
          <input
            type="text"
            id="concavityMean"
            value={formData.concavityMean}
            onChange={(e) => setFormData({ ...formData, concavityMean: e.target.value })}
          />
          {errors.concavityMean && <span className="error">{errors.concavityMean}</span>}
        </div>*/}
        <div>
          <label htmlFor="concavitySe">Concavity - SE</label>
          <input
            type="number"
            id="concavitySe"
            value={formData.concavitySe}
            onChange={(e) => setFormData({ ...formData, concavitySe: e.target.value })}
          />
          {errors.concavitySe && <span className="error">{errors.concavitySe}</span>}
        </div>
        <div>
          <label htmlFor="concavityWorst">Concavity - Worst</label>
          <input
            type="number"
            id="concavityWorst"
            value={formData.concavityWorst}
            onChange={(e) => setFormData({ ...formData, concavityWorst: e.target.value })}
          />
          {errors.concavityWorst && <span className="error">{errors.concavityWorst}</span>}
        </div>
      </div>

      {/* Fractal Dimension */}
      <div className="form-row">
        <div>
          <label htmlFor="fractalDimensionMean">Fractal Dimension - Mean</label> 
          <input
            type="number"
            id="fractalDimensionMean"
            value={formData.fractalDimensionMean}
            onChange={(e) => setFormData({ ...formData, fractalDimensionMean: e.target.value })}
          />
          {errors.fractalDimensionMean && <span className="error">{errors.fractalDimensionMean}</span>}
        </div>
        <div>
          <label htmlFor="fractalDimensionSe">Fractal Dimension - E</label>
          <input
            type="number"
            id="fractalDimensionSe"
            value={formData.fractalDimensionSe}
            onChange={(e) => setFormData({ ...formData, fractalDimensionSe: e.target.value })}
          />
          {errors.fractalDimensionSe && <span className="error">{errors.fractalDimensionSe}</span>}
        </div>
        <div>
          <label htmlFor="fractalDimensionWorst">Fractal Dimension - Worst</label>
          <input
            type="number"
            id="fractalDimensionWorst"
            value={formData.fractalDimensionWorst}
            onChange={(e) => setFormData({ ...formData, fractalDimensionWorst: e.target.value })}
          />
          {errors.fractalDimensionWorst && <span className="error">{errors.fractalDimensionWorst}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
