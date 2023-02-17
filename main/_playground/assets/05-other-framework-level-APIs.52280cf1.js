import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as r}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function f(t={}){const{wrapper:s}=Object.assign({},r(),t.components);return s?e.exports.jsx(s,Object.assign({},t,{children:e.exports.jsx(n,{})})):n();function n(){const o=Object.assign({h1:"h1",p:"p",em:"em",pre:"pre",code:"code",a:"a"},r(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/Other framework level APIs"}),`
`,e.exports.jsx(o.h1,{children:"Using the Framework"}),`
`,e.exports.jsx(o.p,{children:e.exports.jsx(o.em,{children:"This section mentions framework-level APIs that do not have a dedicated section."})}),`
`,e.exports.jsx(o.p,{children:`Most of the time you'll be using the UI5 Web Components' APIs to do your job. However, there are also certain framework-level
APIs you should be aware of.`}),`
`,e.exports.jsx(o.h1,{children:"Executing Code on Boot"}),`
`,e.exports.jsx(o.pre,{children:e.exports.jsx(o.code,{className:"language-js",children:`import { attachBoot } from "@ui5/webcomponents-base/dist/Boot.js";
`})}),`
`,e.exports.jsxs(o.p,{children:["The ",e.exports.jsx(o.code,{children:"attachBoot"})," function allows you to execute custom code when the framework has finished booting."]}),`
`,e.exports.jsx(o.p,{children:"Example:"}),`
`,e.exports.jsx(o.pre,{children:e.exports.jsx(o.code,{className:"language-js",children:`attachBoot(() => {
	console.log("Framework booted");
});
`})}),`
`,e.exports.jsxs(o.p,{children:["Next: ",e.exports.jsx(o.a,{href:"../using-i18n-for-apps",children:"UI5 Web Components i18n for Apps"})]})]})}}export{f as default};
//# sourceMappingURL=05-other-framework-level-APIs.52280cf1.js.map
