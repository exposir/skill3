import React from 'react'
import { Routes, Route } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to your project dashboard. This is the Portal remote app.</p>
      <div className="stats">
        <div className="stat-card">
          <h3>12</h3>
          <p>Active Projects</p>
        </div>
        <div className="stat-card">
          <h3>48</h3>
          <p>Tasks</p>
        </div>
        <div className="stat-card">
          <h3>5</h3>
          <p>Team Members</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="portal-app">
      <style>{`
        .portal-app {
          padding: 1rem;
        }
        .dashboard h2 {
          margin-bottom: 1rem;
          color: #1a1a2e;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }
        .stat-card h3 {
          font-size: 2rem;
          color: #4a69bd;
          margin-bottom: 0.5rem;
        }
        .stat-card p {
          color: #666;
          font-size: 0.875rem;
        }
      `}</style>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
