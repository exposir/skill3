import { importShared } from './__federation_fn_import-CNn9gKzu.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';

const {Routes,Route} = await importShared('react-router-dom');

function AdminHome() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Admin App" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Welcome to the Administration application." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "User Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Organization Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Permission Control" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Audit Logs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "System Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Integrations" })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-app", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminHome, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminHome, {}) })
  ] }) });
}

export { App as default };
