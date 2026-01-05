import React, { useState, useEffect } from 'react';
import { getEmployees, saveEmployees } from '../../services/employeeService';
import EmployeeForm from './EmployeeForm';

export default function EmployeeTable({ onEmployeeChange }) {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const data = getEmployees();
    setEmployees(data);
    if (onEmployeeChange) onEmployeeChange(data);
  }, [onEmployeeChange]);

  const filtered = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !genderFilter || emp.gender === genderFilter;
    const matchesStatus = statusFilter === '' ? true : emp.status === (statusFilter === 'active');
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter(e => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
      if (onEmployeeChange) onEmployeeChange(updated);
    }
  };

  const handleToggleStatus = (id) => {
    const updated = employees.map(e =>
      e.id === id ? { ...e, status: !e.status } : e
    );
    setEmployees(updated);
    saveEmployees(updated);
    if (onEmployeeChange) onEmployeeChange(updated); // 🔥 Critical for live count update
  };

  const handlePrint = () => {
    window.print();
  };

  const getAvatarUrl = (name, size = 40) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  return `https://ui-avatars.com/api/?name=${initials}&size=${size}&background=4f46e5&color=fff`;
};


  const handleSave = (updatedEmp) => {
    let updatedList;
    if (editingId === 'new') {
      const lastId = employees.length > 0
        ? Math.max(...employees.map(e => e.id))
        : 0;
      const newId = lastId + 1;
      updatedList = [...employees, { ...updatedEmp, id: newId }];
    } else {
      updatedList = employees.map(e => (e.id === editingId ? updatedEmp : e));
    }
    setEmployees(updatedList);
    saveEmployees(updatedList);
    if (onEmployeeChange) onEmployeeChange(updatedList);
    setEditingId(null);
  };

  return (
    <div className="employee-section">
      {/* Controls */}
      <div className="controls">
        <input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-primary" onClick={() => setEditingId('new')}>
          Add Employee
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          Print List
        </button>
      </div>

      {/* Form Modal */}
      {editingId !== null && (
        <div className="modal-overlay">
          <EmployeeForm
            employee={editingId === 'new' ? null : employees.find(e => e.id === editingId)}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="empty-state">No employees found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="print-col">ID</th>
                <th className="print-col">Image</th>
                <th className="print-col">Name</th>
                <th className="print-col">Gender</th>
                <th className="print-col">DOB</th>
                <th className="print-col">State</th>
                <th className="print-col">Status</th>
                <th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td className="print-col">{emp.id}</td>
                  <td className="print-col">
  <img
    src={emp.imageUrl || getAvatarUrl(emp.fullName)}
    alt={`${emp.fullName} profile`}
    className="employee-avatar"
    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
  />
</td>
                  <td className="print-col">{emp.fullName}</td>
                  <td className="print-col">{emp.gender}</td>
                  <td className="print-col">{emp.dob}</td>
                  <td className="print-col">{emp.state}</td>
                  <td className="print-col">
                    <button
                      className={`toggle-btn ${emp.status ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleStatus(emp.id)}
                    >
                      {emp.status ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="no-print">
                    <button className="btn btn-sm btn-edit" onClick={() => setEditingId(emp.id)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

