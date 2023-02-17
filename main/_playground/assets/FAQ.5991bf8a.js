import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as r}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(n={}){const{wrapper:t}=Object.assign({},r(),n.components);return t?e.exports.jsx(t,Object.assign({},n,{children:e.exports.jsx(o,{})})):o();function o(){const s=Object.assign({h1:"h1",p:"p",strong:"strong",a:"a",ul:"ul",li:"li",code:"code",pre:"pre"},r(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/FAQ"}),`
`,e.exports.jsx(s.h1,{children:"Frequently Asked Questions"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: How can I play with UI5 Web Components easily?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," Use this ",e.exports.jsx(s.a,{href:"https://codesandbox.io/s/71r1x5o51q?fontsize=14&module=%2Findex.html",children:"CodeSandBox"}),"."]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: Where is the documentation?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," There are several resources:"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components",children:"Web Components APIs"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"https://blogs.sap.com/2019/04/01/the-fastest-way-to-get-started-with-ui5-web-components/",children:"How to get started?"})}),`
`]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: Is there a CDN to load UI5 Web Components from?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," No. The best practice is to build your own bundle. See ",e.exports.jsx(s.a,{href:"https://blogs.sap.com/2021/05/28/getting-started-with-ui5-web-components-in-2021/",children:"this article"})," for details."]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: Are UI5 Web Components APIs stable?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," Mostly yes since the project is in Release Candidate state, but minor changes may still be expected until the official release."]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: Can I create my own UI5 Web Components?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," Yes, for more information see ",e.exports.jsx(s.a,{href:"https://github.com/SAP/ui5-webcomponents/blob/main/docs/5-development/01-custom-UI5-Web-Components-Packages.md",children:"Creating a Custom UI5 Web Components Package"})]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:"Q: How big is the runtime?"})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"A:"})," Currently on main, a simple working Web Component (",e.exports.jsx(s.code,{children:"ui5-label"}),`) and its dependencies equals to around 22K gzipped.
Two simple web components (`,e.exports.jsx(s.code,{children:"ui5-label"})," and ",e.exports.jsx(s.code,{children:"ui5-icon"}),") and their dependencies equal to around 25K gzipped."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," The quoted numbers include only a ",e.exports.jsx(s.code,{children:"<ui5-label>"})," (respectively ",e.exports.jsx(s.code,{children:"ui5-label"})," and ",e.exports.jsx(s.code,{children:"ui5-icon"}),`) working on Chrome/FF/Safari with the default settings (theme/language).
Additional features, settings and old browser support will increase bundle size accordingly.`]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Q: What is the difference between UI5 Web Components and OpenUI5?"}),`
`,e.exports.jsx(s.strong,{children:"A:"})," See the project's ",e.exports.jsx(s.a,{href:"https://github.com/SAP/ui5-webcomponents",children:"readme.md"})," for more on this."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Q: Can I use UI5 Web Components in an OpenUI5 application?"}),`
`,e.exports.jsx(s.strong,{children:"A:"})," This is not necessary as OpenUI5 already provides equivalents in the form of UI5 Controls."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Q: How can I hide not yet upgraded Web Components so that users don't see them until styled?"}),`
`,e.exports.jsx(s.strong,{children:"A:"})," You can place a CSS rule such as:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-CSS",children:`*:not(:defined) {
	display: none;
}
`})}),`
`,e.exports.jsx(s.p,{children:"or:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-CSS",children:`*:not(:defined) {
	visibility: hidden;
}
`})}),`
`,e.exports.jsx(s.p,{children:"in your application, depending on your preference."}),`
`,e.exports.jsxs(s.p,{children:["The selector ",e.exports.jsx(s.code,{children:"*:not(:defined)"})," will match all web components that haven't been defined yet."]}),`
`,e.exports.jsx(s.p,{children:"Alternatively, you could only apply this rule for selected web components:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-CSS",children:`ui5-button:not(:defined), ui5-label:not(:defined) {
	display: none;
}
`})}),`
`,e.exports.jsxs(s.p,{children:["Please note that the ",e.exports.jsx(s.code,{children:":defined"})," CSS pseudo-selector is not supported by the Edge and Internet Explorer 11 browsers."]})]})}}export{g as default};
//# sourceMappingURL=FAQ.5991bf8a.js.map
