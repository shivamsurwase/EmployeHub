import React from 'react';
import { Eye, Edit2, Trash2, ShieldAlert } from 'lucide-react';

const AVATAR_COLORS = [
  'linear-gradient(135deg, #6366F1, #8B5CF6)',
  'linear-gradient(135deg, #06B6D4, #3B82F6)',
  'linear-gradient(135deg, #EC4899, #F43F5E)',
  'linear-gradient(135deg, #10B981, #059669)',
  'linear-gradient(135deg, #F59E0B, #D97706)'
];

const getAvatarStyle = (name) => {
  const index = Math.abs((name || 'E').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % AVATAR_COLORS.length;
  return { background: AVATAR_COLORS[index] };
};

const getInitials = (name) => {
  if (!name) return 'E';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export const EmployeeCards = ({ employees, onView, onEdit, onDelete }) => {
  const formatSalary = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);
  };

  if (!employees.length) {
    return (
      <div className="glass-panel empty-state">
        <ShieldAlert size={48} className="empty-state-icon" />
        <h3>No Employees Found</h3>
        <p>No workforce records match your current filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {employees.map((emp) => (
        <div key={emp.id} className="glass-panel emp-card">
          <div className="emp-card-header">
            <div className="user-identity">
              <div className="user-avatar" style={getAvatarStyle(emp.name)}>
                {getInitials(emp.name)}
              </div>
              <div>
                <div className="user-name">{emp.name}</div>
                <div className="user-id-badge">ID: #{emp.id}</div>
              </div>
            </div>
            <span className={`gender-badge ${(emp.gender || '').toLowerCase()}`}>
              {emp.gender}
            </span>
          </div>

          <div className="emp-card-body">
            <div className="emp-card-info-row">
              <span className="emp-card-info-label">Age</span>
              <span style={{ fontWeight: 600 }}>{emp.age} Years</span>
            </div>
            <div className="emp-card-info-row">
              <span className="emp-card-info-label">Salary</span>
              <span className="salary-tag">{formatSalary(emp.salary)}</span>
            </div>
          </div>

          <div className="emp-card-actions">
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onView(emp)}>
              <Eye size={15} />
              <span>View</span>
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onEdit(emp)}>
              <Edit2 size={15} />
              <span>Edit</span>
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(emp)} title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
