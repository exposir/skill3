import React from 'react'
import { Routes, Route } from 'react-router-dom'

function WorkspaceHome() {
  return (
    <div className="workspace-home">
      <h2>Workspace App</h2>
      <p>Welcome to the Workspace application.</p>
      <ul>
        <li>Project Management</li>
        <li>Task Tracking</li>
        <li>Kanban Board</li>
        <li>Calendar</li>
        <li>Comments</li>
        <li>File Management</li>
        <li>Workflow</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="workspace-app">
      <Routes>
        <Route path="/" element={<WorkspaceHome />} />
        <Route path="*" element={<WorkspaceHome />} />
      </Routes>
    </div>
  )
}

export default App
