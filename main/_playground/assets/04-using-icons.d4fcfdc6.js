import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as r}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(n={}){const{wrapper:o}=Object.assign({},r(),n.components);return o?e.exports.jsx(o,Object.assign({},n,{children:e.exports.jsx(t,{})})):t();function t(){const s=Object.assign({h1:"h1",p:"p",em:"em",code:"code",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",ol:"ol",li:"li",pre:"pre",strong:"strong",ul:"ul"},r(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Getting started/Using icons"}),`
`,e.exports.jsx(s.h1,{children:"Using Icons"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.em,{children:"This section explains how to load and use icons in your UI5 Web Components projects."})}),`
`,e.exports.jsxs(s.p,{children:["One of the most commonly used UI5 Web Components is ",e.exports.jsx(s.code,{children:"ui5-icon"}),". Additionally, several UI5 Web Components have an ",e.exports.jsx(s.code,{children:"icon"})," property that expects an icon name as a value."]}),`
`,e.exports.jsx(s.h2,{children:"Icon Collections"}),`
`,e.exports.jsx(s.p,{children:"The UI5 Web Components project currently offers 3 icon collections, provided as NPM packages:"}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Project"}),e.exports.jsx(s.th,{children:"NPM Package"}),e.exports.jsx(s.th,{children:"Description"}),e.exports.jsx(s.th,{children:"Icons list"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"icons"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons",children:"UI5 Web Components - Icons"})}),e.exports.jsxs(s.td,{children:["A rich icon collection (",e.exports.jsx(s.code,{children:"SAP-icons"}),"), suitable for enterprise-grade apps"]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons",children:"Explore"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"icons-tnt"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt",children:"UI5 Web Components - Icons TNT"})}),e.exports.jsxs(s.td,{children:["A rich icon collection (",e.exports.jsx(s.code,{children:"SAP-icons-TNT"}),"), suitable for more technical apps"]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT",children:"Explore"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"icons-business-suite"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite",children:"UI5 Web Components - Icons Business Suite"})}),e.exports.jsxs(s.td,{children:["A rich icon collection (",e.exports.jsx(s.code,{children:"BusinessSuiteInAppSymbols"}),"), suitable for SAP Fiori apps"]}),e.exports.jsx(s.td,{children:e.exports.jsx(s.a,{href:"https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols",children:"Explore"})})]})]})]}),`
`,e.exports.jsx(s.h2,{children:"Usage"}),`
`,e.exports.jsxs(s.ol,{children:[`
`,e.exports.jsx(s.li,{children:"Add one or more of the above packages as dependencies to your project."}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`npm i @ui5/webcomponents-icons
npm i @ui5/webcomponents-icons-tnt
npm i @ui5/webcomponents-icons-business-suite
`})}),`
`,e.exports.jsxs(s.ol,{start:"2",children:[`
`,e.exports.jsx(s.li,{children:"Import either all icons from a package, or better - only the ones your app is going to use."}),`
`]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.strong,{children:`Important: It is strongly recommended that you only import the icons that your app is going to use. This will keep your bundle small.
Generally, importing all icons is required only if you do not know in advance which icons you are going to need.`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["To import all icons from a package, use the ",e.exports.jsx(s.code,{children:"dist/AllIcons.js"})," module of that package:"]}),`
`]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/AllIcons.js";'})}),`
`,e.exports.jsx(s.p,{children:"For example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
`})}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"To import individual icons, use the individual modules for the required icons:"}),`
`]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/<ICON-NAME>.js";'})}),`
`,e.exports.jsx(s.p,{children:"For example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/bookmark.js";
import "@ui5/webcomponents-icons/dist/cart.js";

import "@ui5/webcomponents-icons-tnt/dist/actor.js";

import "@ui5/webcomponents-icons-business-suite/dist/add-point.js";
`})}),`
`,e.exports.jsxs(s.ol,{start:"3",children:[`
`,e.exports.jsx(s.li,{children:"Once an icon has been imported, it can be used."}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["All collections but ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-icons"})," require a prefix before the icon name. The prefix and icon name are separated by a ",e.exports.jsx(s.code,{children:"/"}),"."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Package"}),e.exports.jsx(s.th,{children:"Prefix"}),e.exports.jsx(s.th,{children:"Example"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-icons"})}),e.exports.jsx(s.td,{children:"N/A"}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"alert"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-icons-tnt"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"tnt"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"tnt/actor"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-icons-business-suite"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"business-suite"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"business-suite/coins"})})]})]})]}),`
`,e.exports.jsx(s.p,{children:"For example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<ui5-icon name="alert"></ui5-icon>
<ui5-button icon="tnt/actor"></ui5-button>
<ui5-avatar icon="business-suite/coins"></ui5-avatar>
`})}),`
`,e.exports.jsx(s.h2,{children:"Custom Icon Collections"}),`
`,e.exports.jsxs(s.p,{children:[`Currently we use SVGs to display all standard icons.
In addition, we provide an API to register custom SVG icon collections via the `,e.exports.jsx(s.code,{children:"registerIconLoader"})," method as follows:"]}),`
`,e.exports.jsxs(s.ol,{children:[`
`,e.exports.jsx(s.li,{children:"Register custom icon collection loader"}),`
`]}),`
`,e.exports.jsx(s.p,{children:"The loader must return an object with the following fields:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"collection"})," name"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"data"})," object that describes the icons: names and SVG paths"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import {registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
registerIconLoader("my-custom-icons", () => {
    return {
            "collection": "my-custom-icons",
            "data": {
                "mark": {
                    paths: [ 
                        // SVG path1, SVG path2, SVG path3...
                    ],
    }
});
`})}),`
`,e.exports.jsxs(s.ol,{start:"2",children:[`
`,e.exports.jsx(s.li,{children:"Use the custom icons"}),`
`]}),`
`,e.exports.jsx(s.p,{children:"After the SVG icons collection is registered, you can use the custom icons everywhere you usually use the standard icons in UI5 Web Components (e.g. ui5-icon, ui5-button, etc):"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<ui5-icon name="my-custom-icons/mark"></ui5-icon>
<ui5-button icon="my-custom-icons/mark"></ui5-button>
<ui5-avatar icon="my-custom-icons/mark"></ui5-avatar>
<ui5-li icon="my-custom-icons/mark"></ui5-li>
`})}),`
`,e.exports.jsx(s.h2,{children:"Custom SVG icons"}),`
`,e.exports.jsxs(s.p,{children:["In case you need to use a fully custom SVG with multiple SVG elements like ",e.exports.jsx(s.code,{children:"circle"})," and ",e.exports.jsx(s.code,{children:"rect"})," instead of only a custom ",e.exports.jsx(s.code,{children:"path"}),", you can provide a custom renderer and register it for usage in ",e.exports.jsx(s.code,{children:"<ui5-icon>"}),"."]}),`
`,e.exports.jsx(s.p,{children:"First, create a template for the icon you need:"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"BakeryDining.hbs"})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<g>
    <rect fill="none" height="24" width="24" y="0" />
</g>
<g>
    <g>
        <path
            d="M7.6,8.67l-2.01,0.8c-0.22,0.09-0.34,0.31-0.31,0.54l2.4,5.98h1.23l-0.62-6.9C8.25,8.75,7.91,8.54,7.6,8.67 z"
            opacity=".3" />
        <path d="M3.07,16.1c-0.27,0.53,0.29,1.09,0.82,0.83l1.68-0.84l-1.08-2.71L3.07,16.1z" opacity=".3" />
        <path
            d="M13.36,6.99h-2.71c-0.27,0-0.53,0.23-0.5,0.54l0.77,8.45h2.17l0.77-8.45C13.88,7.22,13.63,6.99,13.36,6.99z"
            opacity=".3" />
        <path
            d="M18.41,9.47l-2.01-0.8c-0.31-0.12-0.65,0.09-0.68,0.42l-0.62,6.9h1.23l2.4-5.98 C18.75,9.78,18.63,9.56,18.41,9.47z"
            opacity=".3" />
        <path d="M19.52,13.39l-1.08,2.7l1.68,0.84c0.52,0.26,1.09-0.3,0.82-0.83L19.52,13.39z" opacity=".3" />
        <path
            d="M20.5,10.94c0.13-0.32,0.1-0.23,0.15-0.39c0.3-1.21-0.34-2.47-1.5-2.93l-2.01-0.8c-0.46-0.18-0.95-0.21-1.41-0.12 c-0.11-0.33-0.29-0.63-0.52-0.89C14.73,5.29,14.06,5,13.36,5h-2.71C9.94,5,9.27,5.29,8.8,5.81C8.56,6.07,8.38,6.37,8.27,6.69 C7.81,6.6,7.32,6.63,6.86,6.81l-2.01,0.8c-1.16,0.46-1.8,1.72-1.5,2.93l0.15,0.38C1.1,15.55,1,15.55,1,16.38 c0,0.91,0.46,1.74,1.24,2.22c1.42,0.88,2.49,0.14,4-0.61h11.53c1.52,0.76,1.86,1.01,2.63,1.01c1,0,2.61-0.77,2.61-2.61 C23,15.54,22.88,15.51,20.5,10.94z M3.88,16.93c-0.53,0.26-1.09-0.3-0.82-0.83l1.41-2.72l1.08,2.71L3.88,16.93z M7.68,15.99 l-2.4-5.98C5.25,9.78,5.37,9.56,5.59,9.47l2.01-0.8c0.31-0.12,0.65,0.08,0.68,0.42l0.62,6.9H7.68z M13.09,15.99h-2.17l-0.77-8.45 c-0.03-0.31,0.23-0.54,0.5-0.54h2.71c0.27,0,0.53,0.23,0.5,0.54L13.09,15.99z M16.32,15.99h-1.23l0.62-6.9 c0.03-0.33,0.37-0.54,0.68-0.42l2.01,0.8c0.22,0.09,0.34,0.31,0.31,0.54L16.32,15.99z M20.12,16.93l-1.68-0.84l1.08-2.7l1.41,2.71 C21.21,16.63,20.64,17.19,20.12,16.93z" />
    </g>
</g>
`})}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:".hbs"})," file must start exactly with the content ",e.exports.jsx(s.code,{children:'"<g>"'})," or ",e.exports.jsx(s.code,{children:'"<g "'})," for correct compilation. The HBS compiler will generate a template that you can then import and register with the icon regsitry."]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"bundle.esm.js"})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import iconBakeryDiningTemplate from "./dist/generated/templates/BakeryDiningTemplate.lit.js";

// create the icon data for registration
const iconBakeryDining = {
    customTemplate: iconBakeryDiningTemplate,
    viewBox: "0 0 24 24",
    collection: "custom",
}

// register the icon
registerIcon("bakery-dining", iconBakeryDining);
`})}),`
`,e.exports.jsxs(s.p,{children:["The icon data object should fill the ",e.exports.jsx(s.code,{children:"customTemplate"})," property with a template that will be included inside the SVG of the ",e.exports.jsx(s.code,{children:"<ui5-icon>"}),". In that case, a ",e.exports.jsx(s.code,{children:"path"})," won't be rendered. You can also specify a custom ",e.exports.jsx(s.code,{children:"viewBox"})," size, as the default one is ",e.exports.jsx(s.code,{children:"0 0 512 512"}),"."]}),`
`,e.exports.jsx(s.p,{children:"Finally, the icon can be used anywhere."}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<ui5-icon name="custom/backery-dining"></ui5-icon>
<ui5-avatar icon="custom/backery-dining" size="XS"></ui5-avatar>
`})}),`
`,e.exports.jsx(s.p,{children:"Tip: for multi-colored icons, you can specify multiple SVG elements and put a fill/color attribute with a specific value on each element."}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<g fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" fill="aqua"/>
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
</g>
`})}),`
`,e.exports.jsxs(s.p,{children:["Next: ",e.exports.jsx(s.a,{href:"../using-assets",children:"Using Additional Assets"})]})]})}}export{g as default};
//# sourceMappingURL=04-using-icons.d4fcfdc6.js.map
