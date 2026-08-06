import React, { useState, useEffect } from 'react';
import { X, Save, Eye, EyeOff, User, Lock, DollarSign, Calendar, Users } from 'lucide-react';

export const EmployeeModal = ({ isOpen, onClose, onSave, employee, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    salary: '',
    gender: 'Male',
    age: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        name: employee.name || '',
        password: employee.password || '',
        salary: employee.salary !== undefined ? String(employee.salary) : '',
        gender: employee.gender || 'Male',
        age: employee.age !== undefined ? String(employee.age) : ''
      });
    } else {
      setFormData({
        name: '',
        password: '',
        salary: '',
        gender: 'Male',
        age: ''
      });
    }
    setErrors({});
    setShowPassword(false);
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!employee && !formData.password) errs.password = 'Password is required';
    if (!formData.salary || isNaN(formData.salary) || Number(formData.salary) < 0) errs.salary = 'Valid salary required';
    if (!formData.age || isNaN(formData.age) || Number(formData.age) < 18 || Number(formData.age) > 100) errs.age = 'Age must be 18 - 100';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title || (employee ? 'Edit Employee Record' : 'Add New Employee')}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rahul Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {errors.name && <small style={{ color: 'var(--danger)', marginTop: '0.25rem', display: 'block' }}>{errors.name}</small>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Account Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder={employee ? 'Leave blank to keep existing' : 'Secure password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <small style={{ color: 'var(--danger)', marginTop: '0.25rem', display: 'block' }}>{errors.password}</small>}
            </div>

            {/* Salary & Age */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Salary ($/year)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 85000"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
                {errors.salary && <small style={{ color: 'var(--danger)', marginTop: '0.25rem', display: 'block' }}>{errors.salary}</small>}
              </div>

              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                {errors.age && <small style={{ color: 'var(--danger)', marginTop: '0.25rem', display: 'block' }}>{errors.age}</small>}
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="select-control"
                style={{ width: '100%' }}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? <div className="spinner"></div> : <Save size={16} />}
              <span>{employee ? 'Save Changes' : 'Create Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
