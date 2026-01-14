import { importShared } from './__federation_fn_import-CNn9gKzu.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';

const {Routes,Route} = await importShared('react-router-dom');

function DocsHome() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Docs App" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Welcome to the Documentation application." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Document Editor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Template Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Version History" })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "docs-app", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocsHome, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocsHome, {}) })
  ] }) });
}

export { App as default };
