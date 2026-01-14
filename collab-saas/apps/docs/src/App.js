import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
function DocsHome() {
    return (_jsxs("div", { className: "docs-home", children: [_jsx("h2", { children: "Docs App" }), _jsx("p", { children: "Welcome to the Documentation application." }), _jsxs("ul", { children: [_jsx("li", { children: "Document Editor" }), _jsx("li", { children: "Template Management" }), _jsx("li", { children: "Version History" })] })] }));
}
function App() {
    return (_jsx("div", { className: "docs-app", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(DocsHome, {}) }), _jsx(Route, { path: "*", element: _jsx(DocsHome, {}) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map