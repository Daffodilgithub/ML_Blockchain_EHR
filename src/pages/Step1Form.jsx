import React from 'react';

const Step1Form = ({ formData, setFormData, errors }) => {
  return (
    <div className="form-content">
      {/* Texture */}
      <div className="form-row">
        <div>
          <label htmlFor="textureMean">Texture - Mean</label>
          <input
            type="number"
            id="textureMean"
            value={formData.textureMean}
            onChange={(e) => setFormData({ ...formData, textureMean: e.target.value })}
          />
          {errors.textureMean && <span className="error">{errors.textureMean}</span>}
        </div>
        <div>
          <label htmlFor="textureSe">Texture - SE</label>
          <input
            type="number"
            id="textureSe"
            value={formData.textureSe}
            onChange={(e) => setFormData({ ...formData, textureSe: e.target.value })}
          />
          {errors.textureSe && <span className="error">{errors.textureSe}</span>}
        </div>
        <div>
          <label htmlFor="textureWorst">Texture - Worst</label>
          <input
            type="number"
            id="textureWorst"
            value={formData.textureWorst}
            onChange={(e) => setFormData({ ...formData, textureWorst: e.target.value })}
          />
          {errors.textureWorst && <span className="error">{errors.textureWorst}</span>}
        </div>
      </div>

      {/* Area */}
      <div className="form-row">
       {/*} <div>
          <label htmlFor="areaMean">Area - Mean</label>
          <input
            type="text"
            id="areaMean"
            value={formData.areaMean}
            onChange={(e) => setFormData({ ...formData, areaMean: e.target.value })}
          />
          {errors.areaMean && <span className="error">{errors.areaMean}</span>}
        </div>*/}
        <div>
          <label htmlFor="areaSe">Area - SE</label>
          <input
            type="number"
            id="areaSe"
            value={formData.areaSe}
            onChange={(e) => setFormData({ ...formData, areaSe: e.target.value })}
          />
          {errors.areaSe && <span className="error">{errors.areaSe}</span>}
        </div>
        <div>
          <label htmlFor="areaWorst">Area - Worst</label>
          <input
            type="number"
            id="areaWorst"
            value={formData.areaWorst}
            onChange={(e) => setFormData({ ...formData, areaWorst: e.target.value })}
          />
          {errors.areaWorst && <span className="error">{errors.areaWorst}</span>}
        </div>
      </div>

      {/* Smoothness */}
      <div className="form-row">
        <div>
          <label htmlFor="smoothnessMean">Smoothness - Mean</label>
          <input
            type="number"
            id="smoothnessMean"
            value={formData.smoothnessMean}
            onChange={(e) => setFormData({ ...formData, smoothnessMean: e.target.value })}
          />
          {errors.smoothnessMean && <span className="error">{errors.smoothnessMean}</span>}
        </div>
        <div>
          <label htmlFor="smoothnessSe">Smoothness - SE</label>
          <input
            type="number"
            id="smoothnessSe"
            value={formData.smoothnessSe}
            onChange={(e) => setFormData({ ...formData, smoothnessSe: e.target.value })}
          />
          {errors.smoothnessSe && <span className="error">{errors.smoothnessSe}</span>}
        </div>
        <div>
          <label htmlFor="smoothnessWorst">Smoothness - Worst</label>
          <input
            type="number"
            id="smoothnessWorst"
            value={formData.smoothnessWorst}
            onChange={(e) => setFormData({ ...formData, smoothnessWorst: e.target.value })}
          />
          {errors.smoothnessWorst && <span className="error">{errors.smoothnessWorst}</span>}
        </div>
      </div>

      {/* Compactness */}
      <div className="form-row">
        <div>
          <label htmlFor="compactnessMean">Compactness - Mean</label>
          <input
            type="number"
            id="compactnessMean"
            value={formData.compactnessMean}
            onChange={(e) => setFormData({ ...formData, compactnessMean: e.target.value })}
          />
          {errors.compactnessMean && <span className="error">{errors.compactnessMean}</span>}
        </div>
        <div>
          <label htmlFor="compactnessSe">Compactness - SE</label>
          <input
            type="number"
            id="compactnessSe"
            value={formData.compactnessSe}
            onChange={(e) => setFormData({ ...formData, compactnessSe: e.target.value })}
          />
          {errors.compactnessSe && <span className="error">{errors.compactnessSe}</span>}
        </div>
        <div>
          <label htmlFor="compactnessWorst">Compactness - Worst</label>
          <input
            type="number"
            id="compactnessWorst"
            value={formData.compactnessWorst}
            onChange={(e) => setFormData({ ...formData, compactnessWorst: e.target.value })}
          />
          {errors.compactnessWorst && <span className="error">{errors.compactnessWorst}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
