import { importShared } from './__federation_fn_import-CNn9gKzu.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';

const {Routes,Route} = await importShared('react-router-dom');

function WorkspaceHome() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workspace-home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Workspace App" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Welcome to the Workspace application." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Project Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Task Tracking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Kanban Board" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Calendar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Comments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "File Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Workflow" })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workspace-app", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspaceHome, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspaceHome, {}) })
  ] }) });
}

export { App as default };
