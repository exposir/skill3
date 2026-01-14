import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
function Dashboard() {
    return (_jsxs("div", { className: "dashboard", children: [_jsx("h2", { children: "Dashboard" }), _jsx("p", { children: "Welcome to your project dashboard. This is the Portal remote app." }), _jsxs("div", { className: "stats", children: [_jsxs("div", { className: "stat-card", children: [_jsx("h3", { children: "12" }), _jsx("p", { children: "Active Projects" })] }), _jsxs("div", { className: "stat-card", children: [_jsx("h3", { children: "48" }), _jsx("p", { children: "Tasks" })] }), _jsxs("div", { className: "stat-card", children: [_jsx("h3", { children: "5" }), _jsx("p", { children: "Team Members" })] })] })] }));
}
function App() {
    return (_jsxs("div", { className: "portal-app", children: [_jsx("style", { children: `
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
      ` }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(Dashboard, {}) })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map