import React from 'react'
import { Routes, Route } from 'react-router-dom'

function AdminHome() {
  return (
    <div className="admin-home">
      <h2>Admin App</h2>
      <p>Welcome to the Administration application.</p>
      <ul>
        <li>User Management</li>
        <li>Organization Management</li>
        <li>Permission Control</li>
        <li>Audit Logs</li>
        <li>System Settings</li>
        <li>Reports</li>
        <li>Integrations</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="admin-app">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="*" element={<AdminHome />} />
      </Routes>
    </div>
  )
}

export default App
