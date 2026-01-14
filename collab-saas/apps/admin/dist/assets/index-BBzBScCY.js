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

function AdminHome() {
    return (jsxRuntimeExports.jsxs("div", { className: "admin-home", children: [jsxRuntimeExports.jsx("h2", { children: "Admin App" }), jsxRuntimeExports.jsx("p", { children: "Welcome to the Administration application." }), jsxRuntimeExports.jsxs("ul", { children: [jsxRuntimeExports.jsx("li", { children: "User Management" }), jsxRuntimeExports.jsx("li", { children: "Organization Management" }), jsxRuntimeExports.jsx("li", { children: "Permission Control" }), jsxRuntimeExports.jsx("li", { children: "Audit Logs" }), jsxRuntimeExports.jsx("li", { children: "System Settings" }), jsxRuntimeExports.jsx("li", { children: "Reports" }), jsxRuntimeExports.jsx("li", { children: "Integrations" })] })] }));
}
function App() {
    return (jsxRuntimeExports.jsx("div", { className: "admin-app", children: jsxRuntimeExports.jsxs(Routes, { children: [jsxRuntimeExports.jsx(Route, { path: "/", element: jsxRuntimeExports.jsx(AdminHome, {}) }), jsxRuntimeExports.jsx(Route, { path: "*", element: jsxRuntimeExports.jsx(AdminHome, {}) })] }) }));
}

const React = await importShared('react');
const {BrowserRouter} = await importShared('react-router-dom');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { basename: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
