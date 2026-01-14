import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
function AdminHome() {
    return (_jsxs("div", { className: "admin-home", children: [_jsx("h2", { children: "Admin App" }), _jsx("p", { children: "Welcome to the Administration application." }), _jsxs("ul", { children: [_jsx("li", { children: "User Management" }), _jsx("li", { children: "Organization Management" }), _jsx("li", { children: "Permission Control" }), _jsx("li", { children: "Audit Logs" }), _jsx("li", { children: "System Settings" }), _jsx("li", { children: "Reports" }), _jsx("li", { children: "Integrations" })] })] }));
}
function App() {
    return (_jsx("div", { className: "admin-app", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AdminHome, {}) }), _jsx(Route, { path: "*", element: _jsx(AdminHome, {}) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map