import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
function WorkspaceHome() {
    return (_jsxs("div", { className: "workspace-home", children: [_jsx("h2", { children: "Workspace App" }), _jsx("p", { children: "Welcome to the Workspace application." }), _jsxs("ul", { children: [_jsx("li", { children: "Project Management" }), _jsx("li", { children: "Task Tracking" }), _jsx("li", { children: "Kanban Board" }), _jsx("li", { children: "Calendar" }), _jsx("li", { children: "Comments" }), _jsx("li", { children: "File Management" }), _jsx("li", { children: "Workflow" })] })] }));
}
function App() {
    return (_jsx("div", { className: "workspace-app", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WorkspaceHome, {}) }), _jsx(Route, { path: "*", element: _jsx(WorkspaceHome, {}) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map