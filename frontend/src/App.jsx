import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCards } from './components/EmployeeCards';
import { EmployeeModal } from './components/EmployeeModal';
import { DetailModal } from './components/DetailModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Toast } from './components/Toast';
import { apiService } from './services/apiService';

export function App() {
  const [employees, setEmployees] = useState([]);
  const [isBackendLive, setIsBackendLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  // Filters & Views
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('table');

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast Alerts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Employees & Check Health
  const loadData = async () => {
    setLoading(true);
    try {
      const health = await apiService.checkHealth();
      setIsBackendLive(health);
      const res = await apiService.getAllEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      addToast('Failed to load employee records', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Poll API connection status periodically
    const interval = setInterval(async () => {
      const health = await apiService.checkHealth();
      setIsBackendLive(health);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Theme Toggle Effect
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Filter & Sort Logic
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch =
          (emp.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(emp.id).includes(searchTerm);
        const matchesGender =
          genderFilter === 'all' ||
          (emp.gender || '').toLowerCase() === genderFilter.toLowerCase();
        return matchesSearch && matchesGender;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
        if (sortBy === 'salary-desc') return (b.salary || 0) - (a.salary || 0);
        if (sortBy === 'salary-asc') return (a.salary || 0) - (b.salary || 0);
        if (sortBy === 'age-asc') return (a.age || 0) - (b.age || 0);
        if (sortBy === 'age-desc') return (b.age || 0) - (a.age || 0);
        return 0;
      });
  }, [employees, searchTerm, genderFilter, sortBy]);

  // Handlers
  const handleOpenAddModal = () => {
    setSelectedEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setSelectedEmployee(emp);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailModal = (emp) => {
    setDetailEmployee(emp);
    setIsDetailModalOpen(true);
  };

  const handleOpenDeleteModal = (emp) => {
    setDeletingEmployee(emp);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEmployee = async (formData) => {
    if (formData.id) {
      // Update
      const res = await apiService.updateEmployee(formData);
      addToast(`Employee "${formData.name}" updated successfully`, 'success');
    } else {
      // Create
      const res = await apiService.createEmployee(formData);
      addToast(`New employee "${formData.name}" created successfully`, 'success');
    }
    await loadData();
  };

  const handleConfirmDelete = async () => {
    if (!deletingEmployee) return;
    setDeleteLoading(true);
    try {
      await apiService.deleteEmployee(deletingEmployee.id);
      addToast(`Employee #${deletingEmployee.id} deleted`, 'success');
      setIsDeleteModalOpen(false);
      setDeletingEmployee(null);
      await loadData();
    } catch (err) {
      addToast('Failed to delete employee record', 'danger');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Top Navbar */}
      <Navbar
        isBackendLive={isBackendLive}
        employeeCount={employees.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onRefresh={loadData}
        loading={loading}
      />

      {/* Main Content Area */}
      <main className="app-container">
        {/* Metrics Cards */}
        <StatsOverview employees={employees} />

        {/* Filter Controls & Views */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddClick={handleOpenAddModal}
        />

        {/* Content Render (Table or Cards) */}
        {loading ? (
          <div className="glass-panel empty-state">
            <div className="spinner" style={{ margin: '0 auto 1rem auto', width: '32px', height: '32px' }}></div>
            <p>Fetching workforce records from REST API...</p>
          </div>
        ) : viewMode === 'table' ? (
          <EmployeeTable
            employees={filteredEmployees}
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        ) : (
          <EmployeeCards
            employees={filteredEmployees}
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </main>

      {/* Modal Dialogs */}
      <EmployeeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        employee={detailEmployee}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee Record?"
        message={deletingEmployee ? `Are you sure you want to delete ${deletingEmployee.name}? This action cannot be undone.` : ''}
        loading={deleteLoading}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
