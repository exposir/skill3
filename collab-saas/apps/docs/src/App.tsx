import React from 'react'
import { Routes, Route } from 'react-router-dom'

function DocsHome() {
  return (
    <div className="docs-home">
      <h2>Docs App</h2>
      <p>Welcome to the Documentation application.</p>
      <ul>
        <li>Document Editor</li>
        <li>Template Management</li>
        <li>Version History</li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="docs-app">
      <Routes>
        <Route path="/" element={<DocsHome />} />
        <Route path="*" element={<DocsHome />} />
      </Routes>
    </div>
  )
}

export default App
