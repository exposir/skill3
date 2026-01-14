import { importShared } from './__federation_fn_import-CNn9gKzu.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';
import { r as reactDomExports } from './index-COvqqES_.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {Routes,Route} = await importShared('react-router-dom');

function Dashboard() {
    return (jsxRuntimeExports.jsxs("div", { className: "dashboard", children: [jsxRuntimeExports.jsx("h2", { children: "Dashboard" }), jsxRuntimeExports.jsx("p", { children: "Welcome to your project dashboard. This is the Portal remote app." }), jsxRuntimeExports.jsxs("div", { className: "stats", children: [jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [jsxRuntimeExports.jsx("h3", { children: "12" }), jsxRuntimeExports.jsx("p", { children: "Active Projects" })] }), jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [jsxRuntimeExports.jsx("h3", { children: "48" }), jsxRuntimeExports.jsx("p", { children: "Tasks" })] }), jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [jsxRuntimeExports.jsx("h3", { children: "5" }), jsxRuntimeExports.jsx("p", { children: "Team Members" })] })] })] }));
}
function App() {
    return (jsxRuntimeExports.jsxs("div", { className: "portal-app", children: [jsxRuntimeExports.jsx("style", { children: `
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
      ` }), jsxRuntimeExports.jsxs(Routes, { children: [jsxRuntimeExports.jsx(Route, { path: "/", element: jsxRuntimeExports.jsx(Dashboard, {}) }), jsxRuntimeExports.jsx(Route, { path: "*", element: jsxRuntimeExports.jsx(Dashboard, {}) })] })] }));
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
