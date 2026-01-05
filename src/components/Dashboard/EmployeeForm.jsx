import React, { useState, useEffect } from 'react';
import { validateEmployee } from '../../utils/validation';

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: employee?.id||'',
    fullName: employee?.fullName || '',
    gender: employee?.gender || 'Male',
    dob: employee?.dob || '',
    state: employee?.state || '',
    status: employee?.status ?? true,
    imageUrl: employee?.imageUrl || ''
  });
  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setImagePreview(formData.imageUrl);
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData({ ...formData, imageUrl: base64String });
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
     e.target.value = '';
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEmployee(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <div className="form-modal">
    <h3 style={{ marginBottom: '16px' }}>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
        </div>

        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            style={inputStyle}
          />
          {errors.dob && <div style={errorStyle}>{errors.dob}</div>}
        </div>

        <div>
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.state && <div style={errorStyle}>{errors.state}</div>}
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Save
          </button>
        </div>
      </form>
  </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const errorStyle = {
  color: 'red',
  fontSize: '14px'
};