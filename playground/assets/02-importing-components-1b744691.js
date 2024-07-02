import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as r,F as c}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",a:"a",ol:"ol",li:"li",pre:"pre",strong:"strong"},s(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Getting started/Importing components"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"importing-ui5-web-components",children:"Importing UI5 Web Components"}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"This section explains how to import UI5 Web Components to your projects."})}),`
`,e.jsx(n.h2,{id:"components-packages",children:"Components Packages"}),`
`,e.jsx(n.p,{children:"The UI5 Web Components project currently offers 2 NPM packages with Web Components."}),`
`,e.jsx(n.p,{children:"This separation is purely logical, as you can, and should, only import the components you are going to need from both packages."}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Project"}),e.jsx(n.th,{children:"NPM Package"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Application"}),e.jsx(n.th,{children:"Components List"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"main"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",target:"_blank",rel:"nofollow noopener noreferrer",children:"@ui5/webcomponents"})}),e.jsx(n.td,{children:'"Bread-and-butter" components, such as buttons, pickers, inputs, list, table, etc.'}),e.jsx(n.td,{children:"General web apps"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",target:"_blank",rel:"nofollow noopener noreferrer",children:"Explore"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"fiori"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",target:"_blank",rel:"nofollow noopener noreferrer",children:"@ui5/webcomponents-fiori"})}),e.jsx(n.td,{children:"More semantic, higher-order components that implement Fiori patterns"}),e.jsx(n.td,{children:"Mostly SAP Fiori apps"}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",target:"_blank",rel:"nofollow noopener noreferrer",children:"Explore"})})]})]})]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Add one or both of the above packages as dependencies to your project."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`npm i @ui5/webcomponents
npm i @ui5/webcomponents-fiori
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Import the components your app is going to use."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/<COMPONENT-NAME>.js";'})}),`
`,e.jsx(n.p,{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li

import "@ui5/webcomponents-fiori/dist/Wizard.js"; // ui5-wizard
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Use the components in your app."}),`
`]}),`
`,e.jsxs(n.p,{children:["Once a component is imported, it is ",e.jsx(n.strong,{children:"automatically"})," registered and ready to use."]}),`
`,e.jsx(n.p,{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button id="btn">This is a button</ui5-button>
<ui5-input value="This is an input"></ui5-input>
<script>
    btn.addEventListener("click", () => {});
<\/script>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," For most components the name of the module (f.e. ",e.jsx(n.code,{children:"Button.js"}),", ",e.jsx(n.code,{children:"Icon.js"}),") coincides with the name of the tag (",e.jsx(n.code,{children:"ui5-button"}),", ",e.jsx(n.code,{children:"ui5-icon"}),`),
whereas for others this is not the case (f.e. `,e.jsx(n.code,{children:"StandardListItem.js"})," and ",e.jsx(n.code,{children:"ui5-li"}),"). Always consult the documentation when in doubt."]}),`
`,e.jsx(c,{})]})}function w(t={}){const{wrapper:n}=Object.assign({},s(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{w as default};
