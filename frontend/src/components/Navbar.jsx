import React from 'react';
import { Briefcase, Sun, Moon, RefreshCw, Server, AlertCircle } from 'lucide-react';

export const Navbar = ({ isBackendLive, employeeCount, theme, onToggleTheme, onRefresh, loading }) => {
  return (
    <header className="navbar">
      <div className="brand-container">
        <div className="logo-box">
          <Briefcase size={22} />
        </div>
        <div>
          <h1 className="brand-title">EmployeeHub <span style={{ fontSize: '0.7em', opacity: 0.6, fontWeight: 500 }}>PRO</span></h1>
        </div>
      </div>

      <div className="nav-actions">
        {/* Status Pill */}
        <div className="status-pill" title={isBackendLive ? "Connected to Spring Boot API (Port 9090)" : "Using Local Preview Mode"}>
          <span className={`status-dot ${isBackendLive ? 'online' : 'offline'}`}></span>
          <span>{isBackendLive ? 'Spring Boot Connected' : 'Preview Mode'}</span>
          {!isBackendLive && <AlertCircle size={14} style={{ color: 'var(--warning)', marginLeft: '2px' }} />}
        </div>

        {/* Refresh Button */}
        <button className="btn-icon" onClick={onRefresh} title="Sync Data" disabled={loading}>
          <RefreshCw size={18} className={loading ? 'spin' : ''} />
        </button>

        {/* Theme Toggle */}
        <button className="btn-icon" onClick={onToggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
