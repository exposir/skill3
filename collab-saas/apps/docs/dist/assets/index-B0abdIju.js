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

function DocsHome() {
    return (jsxRuntimeExports.jsxs("div", { className: "docs-home", children: [jsxRuntimeExports.jsx("h2", { children: "Docs App" }), jsxRuntimeExports.jsx("p", { children: "Welcome to the Documentation application." }), jsxRuntimeExports.jsxs("ul", { children: [jsxRuntimeExports.jsx("li", { children: "Document Editor" }), jsxRuntimeExports.jsx("li", { children: "Template Management" }), jsxRuntimeExports.jsx("li", { children: "Version History" })] })] }));
}
function App() {
    return (jsxRuntimeExports.jsx("div", { className: "docs-app", children: jsxRuntimeExports.jsxs(Routes, { children: [jsxRuntimeExports.jsx(Route, { path: "/", element: jsxRuntimeExports.jsx(DocsHome, {}) }), jsxRuntimeExports.jsx(Route, { path: "*", element: jsxRuntimeExports.jsx(DocsHome, {}) })] }) }));
}

const React = await importShared('react');
const {BrowserRouter} = await importShared('react-router-dom');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { basename: "/docs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
