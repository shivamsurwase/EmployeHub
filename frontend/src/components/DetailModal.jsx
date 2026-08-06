import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, DollarSign, Calendar, User, Key } from 'lucide-react';

export const DetailModal = ({ isOpen, onClose, employee }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen || !employee) return null;

  const formatSalary = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Employee Profile Overview</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                margin: '0 auto 1rem auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#FFF',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              {(employee.name || 'E').charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{employee.name}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              SYSTEM ID: #{employee.id}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <User size={16} /> Gender
              </span>
              <span className={`gender-badge ${(employee.gender || '').toLowerCase()}`}>
                {employee.gender}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Calendar size={16} /> Age
              </span>
              <span style={{ fontWeight: 600 }}>{employee.age} Years Old</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <DollarSign size={16} /> Annual Salary
              </span>
              <span className="salary-tag">{formatSalary(employee.salary)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Key size={16} /> Account Password
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: showPassword ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {showPassword ? (employee.password || '••••••••') : '••••••••'}
                </span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
