import { i as importShared } from './_virtual___federation_fn_import-BJRQcQjZ.js';
import { r as reactExports } from './index-Dm_EQZZA.js';
import { r as reactDomExports } from './index-COvqqES_.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const remotesMap = {
'portal':{url:'http://localhost:3001/assets/remoteEntry.js',format:'esm',from:'vite'},
  'workspace':{url:'http://localhost:3002/assets/remoteEntry.js',format:'esm',from:'vite'},
  'docs':{url:'http://localhost:3003/assets/remoteEntry.js',format:'esm',from:'vite'},
  'admin':{url:'http://localhost:3004/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href, remoteFrom), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BN8Au471.js', import.meta.url).href, remoteFrom), loaded:1}},'react-router-dom':{'6.30.3':{get:()=>get(new URL('__federation_shared_react-router-dom-BQUuYL98.js', import.meta.url).href, remoteFrom), loaded:1}},'zustand':{'4.5.7':{get:()=>get(new URL('__federation_shared_zustand-4y_OS_Q7.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {Suspense,lazy} = await importShared('react');

const {BrowserRouter,Routes,Route,Link} = await importShared('react-router-dom');

// 动态加载远程模块
const PortalApp = lazy(() => __federation_method_getRemote("portal" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
const WorkspaceApp = lazy(() => __federation_method_getRemote("workspace" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
const DocsApp = lazy(() => __federation_method_getRemote("docs" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
const AdminApp = lazy(() => __federation_method_getRemote("admin" , "./App").then(module=>__federation_method_wrapDefault(module, true)));
function App() {
    return (jsxRuntimeExports.jsx(BrowserRouter, { children: jsxRuntimeExports.jsxs("div", { className: "app-shell", children: [jsxRuntimeExports.jsxs("header", { className: "app-header", children: [jsxRuntimeExports.jsx("h1", { children: "Collab SaaS" }), jsxRuntimeExports.jsxs("nav", { children: [jsxRuntimeExports.jsx(Link, { to: "/", children: "Home" }), jsxRuntimeExports.jsx(Link, { to: "/portal", children: "Portal" }), jsxRuntimeExports.jsx(Link, { to: "/workspace", children: "Workspace" }), jsxRuntimeExports.jsx(Link, { to: "/docs", children: "Docs" }), jsxRuntimeExports.jsx(Link, { to: "/admin", children: "Admin" })] })] }), jsxRuntimeExports.jsx("main", { className: "app-main", children: jsxRuntimeExports.jsx(Suspense, { fallback: jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading..." }), children: jsxRuntimeExports.jsxs(Routes, { children: [jsxRuntimeExports.jsx(Route, { path: "/", element: jsxRuntimeExports.jsx("div", { className: "home", children: "Host App Home - Welcome to Collab SaaS" }) }), jsxRuntimeExports.jsx(Route, { path: "/portal/*", element: jsxRuntimeExports.jsx(PortalApp, {}) }), jsxRuntimeExports.jsx(Route, { path: "/workspace/*", element: jsxRuntimeExports.jsx(WorkspaceApp, {}) }), jsxRuntimeExports.jsx(Route, { path: "/docs/*", element: jsxRuntimeExports.jsx(DocsApp, {}) }), jsxRuntimeExports.jsx(Route, { path: "/admin/*", element: jsxRuntimeExports.jsx(AdminApp, {}) })] }) }) })] }) }));
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
