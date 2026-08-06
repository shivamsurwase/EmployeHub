import React from 'react';
import { Users, DollarSign, TrendingUp, PieChart } from 'lucide-react';

export const StatsOverview = ({ employees }) => {
  const totalEmployees = employees.length;
  
  const totalPayroll = employees.reduce((acc, curr) => acc + (Number(curr.salary) || 0), 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalPayroll / totalEmployees) : 0;
  
  const maleCount = employees.filter(e => (e.gender || '').toLowerCase() === 'male').length;
  const femaleCount = employees.filter(e => (e.gender || '').toLowerCase() === 'female').length;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="stats-grid">
      <div className="glass-panel stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
          <Users size={26} />
        </div>
        <div>
          <div className="stat-label">Total Workforce</div>
          <div className="stat-value">{totalEmployees}</div>
        </div>
      </div>

      <div className="glass-panel stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
          <DollarSign size={26} />
        </div>
        <div>
          <div className="stat-label">Total Payroll</div>
          <div className="stat-value">{formatCurrency(totalPayroll)}</div>
        </div>
      </div>

      <div className="glass-panel stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--secondary)' }}>
          <TrendingUp size={26} />
        </div>
        <div>
          <div className="stat-label">Avg Compensation</div>
          <div className="stat-value">{formatCurrency(avgSalary)}</div>
        </div>
      </div>

      <div className="glass-panel stat-card">
        <div className="stat-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-pink)' }}>
          <PieChart size={26} />
        </div>
        <div>
          <div className="stat-label">Gender Diversity</div>
          <div className="stat-value" style={{ fontSize: '1.2rem', marginTop: '0.3rem' }}>
            <span style={{ color: 'var(--secondary)' }}>{maleCount} M</span> / <span style={{ color: 'var(--accent-pink)' }}>{femaleCount} F</span>
          </div>
        </div>
      </div>
    </div>
  );
};
