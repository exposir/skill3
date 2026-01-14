import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 动态加载远程模块
const PortalApp = lazy(() => import('portal/App'))
const WorkspaceApp = lazy(() => import('workspace/App'))
const DocsApp = lazy(() => import('docs/App'))
const AdminApp = lazy(() => import('admin/App'))

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>Collab SaaS</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/portal">Portal</Link>
            <Link to="/workspace">Workspace</Link>
            <Link to="/docs">Docs</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </header>
        <main className="app-main">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<div className="home">Host App Home - Welcome to Collab SaaS</div>} />
              <Route path="/portal/*" element={<PortalApp />} />
              <Route path="/workspace/*" element={<WorkspaceApp />} />
              <Route path="/docs/*" element={<DocsApp />} />
              <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
