import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 动态加载远程模块
const PortalApp = lazy(() => import('portal/App'));
const WorkspaceApp = lazy(() => import('workspace/App'));
const DocsApp = lazy(() => import('docs/App'));
const AdminApp = lazy(() => import('admin/App'));
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "app-shell", children: [_jsxs("header", { className: "app-header", children: [_jsx("h1", { children: "Collab SaaS" }), _jsxs("nav", { children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/portal", children: "Portal" }), _jsx(Link, { to: "/workspace", children: "Workspace" }), _jsx(Link, { to: "/docs", children: "Docs" }), _jsx(Link, { to: "/admin", children: "Admin" })] })] }), _jsx("main", { className: "app-main", children: _jsx(Suspense, { fallback: _jsx("div", { className: "loading", children: "Loading..." }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { className: "home", children: "Host App Home - Welcome to Collab SaaS" }) }), _jsx(Route, { path: "/portal/*", element: _jsx(PortalApp, {}) }), _jsx(Route, { path: "/workspace/*", element: _jsx(WorkspaceApp, {}) }), _jsx(Route, { path: "/docs/*", element: _jsx(DocsApp, {}) }), _jsx(Route, { path: "/admin/*", element: _jsx(AdminApp, {}) })] }) }) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map