import { importShared } from './__federation_fn_import-CNn9gKzu.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';

const {Routes,Route} = await importShared('react-router-dom');

function Dashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Welcome to your project dashboard. This is the Portal remote app." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Active Projects" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tasks" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Team Members" })
      ] })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) })
    ] })
  ] });
}

export { App as default };
