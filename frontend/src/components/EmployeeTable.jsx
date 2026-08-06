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

export const EmployeeTable = ({ employees, onView, onEdit, onDelete }) => {
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
    <div className="table-wrapper glass-panel">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Salary</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)' }}>
                #{emp.id}
              </td>
              <td>
                <div className="user-identity">
                  <div className="user-avatar" style={getAvatarStyle(emp.name)}>
                    {getInitials(emp.name)}
                  </div>
                  <div>
                    <div className="user-name">{emp.name}</div>
                    <div className="user-id-badge">EMP-{String(emp.id).padStart(4, '0')}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`gender-badge ${(emp.gender || '').toLowerCase()}`}>
                  {emp.gender || 'Not specified'}
                </span>
              </td>
              <td>{emp.age} yrs</td>
              <td className="salary-tag">
                {formatSalary(emp.salary)}
              </td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button
                    className="btn-icon"
                    onClick={() => onView(emp)}
                    title="View Employee Profile"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onEdit(emp)}
                    title="Edit Details"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => onDelete(emp)}
                    title="Delete Record"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
