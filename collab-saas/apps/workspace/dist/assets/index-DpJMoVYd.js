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

function WorkspaceHome() {
    return (jsxRuntimeExports.jsxs("div", { className: "workspace-home", children: [jsxRuntimeExports.jsx("h2", { children: "Workspace App" }), jsxRuntimeExports.jsx("p", { children: "Welcome to the Workspace application." }), jsxRuntimeExports.jsxs("ul", { children: [jsxRuntimeExports.jsx("li", { children: "Project Management" }), jsxRuntimeExports.jsx("li", { children: "Task Tracking" }), jsxRuntimeExports.jsx("li", { children: "Kanban Board" }), jsxRuntimeExports.jsx("li", { children: "Calendar" }), jsxRuntimeExports.jsx("li", { children: "Comments" }), jsxRuntimeExports.jsx("li", { children: "File Management" }), jsxRuntimeExports.jsx("li", { children: "Workflow" })] })] }));
}
function App() {
    return (jsxRuntimeExports.jsx("div", { className: "workspace-app", children: jsxRuntimeExports.jsxs(Routes, { children: [jsxRuntimeExports.jsx(Route, { path: "/", element: jsxRuntimeExports.jsx(WorkspaceHome, {}) }), jsxRuntimeExports.jsx(Route, { path: "*", element: jsxRuntimeExports.jsx(WorkspaceHome, {}) })] }) }));
}

const React = await importShared('react');
const {BrowserRouter} = await importShared('react-router-dom');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { basename: "/workspace", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
