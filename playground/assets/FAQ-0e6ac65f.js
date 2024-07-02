import{j as e}from"./jsx-runtime-670e1be8.js";import{M as t}from"./index-6087c063.js";import{B as i,F as l}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(s){const n=Object.assign({h1:"h1",p:"p",strong:"strong",a:"a",ul:"ul",li:"li",code:"code",pre:"pre"},r(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Docs/FAQ"}),`
`,e.jsx(i,{}),`
`,e.jsx(n.h1,{id:"frequently-asked-questions",children:"Frequently Asked Questions"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: How can I play with UI5 Web Components easily?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," Use this ",e.jsx(n.a,{href:"https://stackblitz.com/edit/js-vsrpnb?file=index.js,index.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"Stackblitz"}),"."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: Where is the documentation?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," There are several resources:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/playground/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Web Components APIs"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://blogs.sap.com/2019/04/01/the-fastest-way-to-get-started-with-ui5-web-components/",target:"_blank",rel:"nofollow noopener noreferrer",children:"How to get started?"})}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: Is there a CDN to load UI5 Web Components from?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," No. The best practice is to build your own bundle. See ",e.jsx(n.a,{href:"https://blogs.sap.com/2021/05/28/getting-started-with-ui5-web-components-in-2021/",target:"_blank",rel:"nofollow noopener noreferrer",children:"this article"})," for details."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: Are UI5 Web Components APIs stable?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," Mostly yes since the project is in Release Candidate state, but minor changes may still be expected until the official release."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: Can I create my own UI5 Web Components?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," Yes, for more information see ",e.jsx(n.a,{href:"./?path=/docs/docs-development-custom-ui5-web-components-packages--docs",children:"Creating a Custom UI5 Web Components Package"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: How can I customize UI5 Web Components' styles?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," Read the ",e.jsx(n.a,{href:"./?path=/docs/docs-customizing-styles--docs",children:"Styling UI5 Web Components"})," article."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: How big is the runtime?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," Currently on main, a simple working Web Component (",e.jsx(n.code,{children:"ui5-label"}),`) and its dependencies equals to around 22K gzipped.
Two simple web components (`,e.jsx(n.code,{children:"ui5-label"})," and ",e.jsx(n.code,{children:"ui5-icon"}),") and their dependencies equal to around 25K gzipped."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The quoted numbers include only a ",e.jsx(n.code,{children:"<ui5-label>"})," (respectively ",e.jsx(n.code,{children:"ui5-label"})," and ",e.jsx(n.code,{children:"ui5-icon"}),`) working on Chrome/FF/Safari with the default settings (theme/language).
Additional features, settings and old browser support will increase bundle size accordingly.`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: What is the difference between UI5 Web Components and OpenUI5?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," See the project's ",e.jsx(n.a,{href:"https://github.com/SAP/ui5-webcomponents",target:"_blank",rel:"nofollow noopener noreferrer",children:"readme.md"})," for more on this."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: Can I use UI5 Web Components in an OpenUI5 application?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," This is not necessary as OpenUI5 already provides equivalents in the form of UI5 Controls."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Q: How can I hide not yet upgraded Web Components so that users don't see them until styled?"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"A:"})," You can place a CSS rule such as:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-CSS",children:`*:not(:defined) {
	display: none;
}
`})}),`
`,e.jsx(n.p,{children:"or:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-CSS",children:`*:not(:defined) {
	visibility: hidden;
}
`})}),`
`,e.jsx(n.p,{children:"in your application, depending on your preference."}),`
`,e.jsxs(n.p,{children:["The selector ",e.jsx(n.code,{children:"*:not(:defined)"})," will match all web components that haven't been defined yet."]}),`
`,e.jsx(n.p,{children:"Alternatively, you could only apply this rule for selected web components:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-CSS",children:`ui5-button:not(:defined), ui5-label:not(:defined) {
	display: none;
}
`})}),`
`,e.jsxs(n.p,{children:["Please note that the ",e.jsx(n.code,{children:":defined"})," CSS pseudo-selector is not supported by the Edge and Internet Explorer 11 browsers."]}),`
`,e.jsx(l,{})]})}function f(s={}){const{wrapper:n}=Object.assign({},r(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(o,s)})):o(s)}export{f as default};
