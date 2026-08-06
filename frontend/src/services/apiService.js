// EmployeeHub API Service Layer - Integration with Spring Boot Backend (Port 9090)

const API_BASE_URL = 'http://localhost:9090/api';

// Initial fallback mock data for testing UI when local backend/database is offline
let mockEmployees = [
  { id: 101, name: 'Aarav Sharma', password: '••••••••', salary: 92000, gender: 'Male', age: 29 },
  { id: 102, name: 'Priya Patel', password: '••••••••', salary: 115000, gender: 'Female', age: 32 },
  { id: 103, name: 'Vikram Singh', password: '••••••••', salary: 84000, gender: 'Male', age: 26 },
  { id: 104, name: 'Ananya Iyer', password: '••••••••', salary: 135000, gender: 'Female', age: 36 },
  { id: 105, name: 'Rohan Mehta', password: '••••••••', salary: 98000, gender: 'Male', age: 31 }
];

export const apiService = {
  // Check backend server availability
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${API_BASE_URL}/employees`, { signal: controller.signal });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch all employees
  async getAllEmployees() {
    try {
      const res = await fetch(`${API_BASE_URL}/employees`);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      return { data, isLive: true };
    } catch (err) {
      console.warn('Backend API unavailable. Utilizing local mode:', err.message);
      return { data: mockEmployees, isLive: false };
    }
  },

  // Fetch single employee by ID
  async getEmployeeById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/employee/${id}`);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      return { data, isLive: true };
    } catch (err) {
      const found = mockEmployees.find(e => e.id === Number(id));
      return { data: found || null, isLive: false };
    }
  },

  // Create new employee
  async createEmployee(employeeData) {
    const payload = {
      name: employeeData.name,
      password: employeeData.password || 'default123',
      salary: Number(employeeData.salary),
      gender: employeeData.gender,
      age: Number(employeeData.age)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const created = await res.json();
      return { data: created, isLive: true };
    } catch (err) {
      const newId = mockEmployees.length ? Math.max(...mockEmployees.map(e => e.id)) + 1 : 101;
      const newEmp = { ...payload, id: newId };
      mockEmployees = [newEmp, ...mockEmployees];
      return { data: newEmp, isLive: false };
    }
  },

  // Update employee
  async updateEmployee(employeeData) {
    const payload = {
      id: Number(employeeData.id),
      name: employeeData.name,
      password: employeeData.password,
      salary: Number(employeeData.salary),
      gender: employeeData.gender,
      age: Number(employeeData.age)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/employee`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const updated = await res.json();
      return { data: updated, isLive: true };
    } catch (err) {
      mockEmployees = mockEmployees.map(e => e.id === payload.id ? { ...e, ...payload } : e);
      return { data: payload, isLive: false };
    }
  },

  // Delete employee
  async deleteEmployee(id) {
    const numId = Number(id);
    try {
      const res = await fetch(`${API_BASE_URL}/employee/${numId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const text = await res.text();
      return { success: true, message: text, isLive: true };
    } catch (err) {
      mockEmployees = mockEmployees.filter(e => e.id !== numId);
      return { success: true, message: 'Employee deleted locally', isLive: false };
    }
  }
};
