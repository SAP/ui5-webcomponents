import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as r}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function b(s={}){const{wrapper:o}=Object.assign({},r(),s.components);return o?e.exports.jsx(o,Object.assign({},s,{children:e.exports.jsx(n,{})})):n();function n(){const t=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",a:"a",ol:"ol",li:"li",pre:"pre",strong:"strong"},r(),s.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Getting started/Importing components"}),`
`,e.exports.jsx(t.h1,{children:"Importing UI5 Web Components"}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.em,{children:"This section explains how to import UI5 Web Components to your projects."})}),`
`,e.exports.jsx(t.h2,{children:"Components Packages"}),`
`,e.exports.jsx(t.p,{children:"The UI5 Web Components project currently offers 2 NPM packages with Web Components."}),`
`,e.exports.jsx(t.p,{children:"This separation is purely logical, as you can, and should, only import the components you are going to need from both packages."}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Project"}),e.exports.jsx(t.th,{children:"NPM Package"}),e.exports.jsx(t.th,{children:"Description"}),e.exports.jsx(t.th,{children:"Application"}),e.exports.jsx(t.th,{children:"Components List"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"main"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",children:"@ui5/webcomponents"})}),e.exports.jsx(t.td,{children:'"Bread-and-butter" components, such as buttons, pickers, inputs, list, table, etc.'}),e.exports.jsx(t.td,{children:"General web apps"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",children:"Explore"})})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"fiori"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",children:"@ui5/webcomponents-fiori"})}),e.exports.jsx(t.td,{children:"More semantic, higher-order components that implement Fiori patterns"}),e.exports.jsx(t.td,{children:"Mostly SAP Fiori apps"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",children:"Explore"})})]})]})]}),`
`,e.exports.jsx(t.h2,{children:"Usage"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsx(t.li,{children:"Add one or both of the above packages as dependencies to your project."}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{children:`npm i @ui5/webcomponents
npm i @ui5/webcomponents-fiori
`})}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsx(t.li,{children:"Import the components your app is going to use."}),`
`]}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/<COMPONENT-NAME>.js";'})}),`
`,e.exports.jsx(t.p,{children:"For example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li

import "@ui5/webcomponents-fiori/dist/Wizard.js"; // ui5-wizard
`})}),`
`,e.exports.jsxs(t.ol,{start:"3",children:[`
`,e.exports.jsx(t.li,{children:"Use the components in your app."}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["Once a component is imported, it is ",e.exports.jsx(t.strong,{children:"automatically"})," registered and ready to use."]}),`
`,e.exports.jsx(t.p,{children:"For example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="btn">This is a button</ui5-button>
<ui5-input value="This is an input"></ui5-input>
<script>
    btn.addEventListener("click", () => {});
<\/script>
`})}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Note:"})," For most components the name of the module (f.e. ",e.exports.jsx(t.code,{children:"Button.js"}),", ",e.exports.jsx(t.code,{children:"Icon.js"}),") coincides with the name of the tag (",e.exports.jsx(t.code,{children:"ui5-button"}),", ",e.exports.jsx(t.code,{children:"ui5-icon"}),`),
whereas for others this is not the case (f.e. `,e.exports.jsx(t.code,{children:"StandardListItem.js"})," and ",e.exports.jsx(t.code,{children:"ui5-li"}),"). Always consult the documentation when in doubt."]}),`
`,e.exports.jsxs(t.p,{children:["Next: ",e.exports.jsx(t.a,{href:"../understanding-components-apis",children:"Understanding UI5 Web Components APIs"})]})]})}}export{b as default};
//# sourceMappingURL=02-importing-components.b0218382.js.map
