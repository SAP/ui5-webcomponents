"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[2993],{11293:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>d});var i=s(31085),o=s(71184);const c={},t="Using Icons",r={id:"docs/advanced/using-icons",title:"Using Icons",description:"This section explains how to load and use icons in your UI5 Web Components projects.",source:"@site/docs/docs/2-advanced/03-using-icons.md",sourceDirName:"docs/2-advanced",slug:"/docs/advanced/using-icons",permalink:"/ui5-webcomponents/nightly/docs/advanced/using-icons",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"RTL & Compact Mode",permalink:"/ui5-webcomponents/nightly/docs/advanced/RTL-and-compact-mode"},next:{title:"Using Assets",permalink:"/ui5-webcomponents/nightly/docs/advanced/using-assets"}},l={},d=[{value:"Icon Collections",id:"icon-collections",level:2},{value:"Usage",id:"usage",level:2},{value:"Custom Icon Collections",id:"custom-icon-collections",level:2},{value:"Custom SVG icons",id:"custom-svg-icons",level:2}];function a(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"using-icons",children:"Using Icons"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"This section explains how to load and use icons in your UI5 Web Components projects."})}),"\n",(0,i.jsxs)(n.p,{children:["One of the most commonly used UI5 Web Components is ",(0,i.jsx)(n.code,{children:"ui5-icon"}),". Additionally, several UI5 Web Components have an ",(0,i.jsx)(n.code,{children:"icon"})," property that expects an icon name as a value."]}),"\n",(0,i.jsx)(n.h2,{id:"icon-collections",children:"Icon Collections"}),"\n",(0,i.jsx)(n.p,{children:"The UI5 Web Components project currently offers 3 icon collections, provided as NPM packages:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Project"}),(0,i.jsx)(n.th,{children:"NPM Package"}),(0,i.jsx)(n.th,{children:"Description"}),(0,i.jsx)(n.th,{children:"Icons list"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"icons"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons",children:"UI5 Web Components - Icons"})}),(0,i.jsxs)(n.td,{children:["A rich icon collection (",(0,i.jsx)(n.code,{children:"SAP-icons"}),"), suitable for enterprise-grade apps"]}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons",children:"Explore"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"icons-tnt"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt",children:"UI5 Web Components - Icons TNT"})}),(0,i.jsxs)(n.td,{children:["A rich icon collection (",(0,i.jsx)(n.code,{children:"SAP-icons-TNT"}),"), suitable for more technical apps"]}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT",children:"Explore"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"icons-business-suite"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite",children:"UI5 Web Components - Icons Business Suite"})}),(0,i.jsxs)(n.td,{children:["A rich icon collection (",(0,i.jsx)(n.code,{children:"BusinessSuiteInAppSymbols"}),"), suitable for SAP Fiori apps"]}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols",children:"Explore"})})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Add one or more of the above packages as dependencies to your project."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"npm i @ui5/webcomponents-icons\nnpm i @ui5/webcomponents-icons-tnt\nnpm i @ui5/webcomponents-icons-business-suite\n"})}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsx)(n.li,{children:"Import either all icons from a package, or better - only the ones your app is going to use."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Important: It is strongly recommended that you only import the icons that your app is going to use. This will keep your bundle small.\nGenerally, importing all icons is required only if you do not know in advance which icons you are going to need."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["To import all icons from a package, use the ",(0,i.jsx)(n.code,{children:"dist/AllIcons.js"})," module of that package:"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/AllIcons.js";'})}),"\n",(0,i.jsx)(n.p,{children:"For example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import "@ui5/webcomponents-icons/dist/AllIcons.js";\nimport "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";\nimport "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"To import individual icons, use the individual modules for the required icons:"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/<ICON-NAME>.js";'})}),"\n",(0,i.jsx)(n.p,{children:"For example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import "@ui5/webcomponents-icons/dist/alert.js";\nimport "@ui5/webcomponents-icons/dist/bookmark.js";\nimport "@ui5/webcomponents-icons/dist/cart.js";\n\nimport "@ui5/webcomponents-icons-tnt/dist/actor.js";\n\nimport "@ui5/webcomponents-icons-business-suite/dist/add-point.js";\n'})}),"\n",(0,i.jsxs)(n.ol,{start:"3",children:["\n",(0,i.jsx)(n.li,{children:"Once an icon has been imported, it can be used."}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["All collections but ",(0,i.jsx)(n.code,{children:"@ui5/webcomponents-icons"})," require a prefix before the icon name. The prefix and icon name are separated by a ",(0,i.jsx)(n.code,{children:"/"}),"."]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Package"}),(0,i.jsx)(n.th,{children:"Prefix"}),(0,i.jsx)(n.th,{children:"Example"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"@ui5/webcomponents-icons"})}),(0,i.jsx)(n.td,{children:"N/A"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"alert"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"@ui5/webcomponents-icons-tnt"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tnt"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tnt/actor"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"@ui5/webcomponents-icons-business-suite"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"business-suite"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"business-suite/coins"})})]})]})]}),"\n",(0,i.jsx)(n.p,{children:"For example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<ui5-icon name="alert"></ui5-icon>\n<ui5-button icon="tnt/actor"></ui5-button>\n<ui5-avatar icon="business-suite/coins"></ui5-avatar>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"custom-icon-collections",children:"Custom Icon Collections"}),"\n",(0,i.jsxs)(n.p,{children:["Currently we use SVGs to display all standard icons.\nIn addition, we provide an API to register custom SVG icon collections via the ",(0,i.jsx)(n.code,{children:"registerIconLoader"})," method as follows:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Register custom icon collection loader"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The loader must return an object with the following fields:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"collection"})," name"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"data"})," object that describes the icons: names and SVG paths"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import {registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";\nregisterIconLoader("my-custom-icons", () => {\n    return {\n            "collection": "my-custom-icons",\n            "data": {\n                "mark": {\n                    paths: [ \n                        // SVG path1, SVG path2, SVG path3...\n                    ],\n    }\n});\n'})}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsx)(n.li,{children:"Use the custom icons"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"After the SVG icons collection is registered, you can use the custom icons everywhere you usually use the standard icons in UI5 Web Components (e.g. ui5-icon, ui5-button, etc):"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<ui5-icon name="my-custom-icons/mark"></ui5-icon>\n<ui5-button icon="my-custom-icons/mark"></ui5-button>\n<ui5-avatar icon="my-custom-icons/mark"></ui5-avatar>\n<ui5-li icon="my-custom-icons/mark"></ui5-li>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"custom-svg-icons",children:"Custom SVG icons"}),"\n",(0,i.jsxs)(n.p,{children:["In case you need to use a fully custom SVG with multiple SVG elements like ",(0,i.jsx)(n.code,{children:"circle"})," and ",(0,i.jsx)(n.code,{children:"rect"})," instead of only a custom ",(0,i.jsx)(n.code,{children:"path"}),", you can provide a custom renderer and register it for usage in ",(0,i.jsx)(n.code,{children:"<ui5-icon>"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"First, create a template for the icon you need:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"BakeryDining.hbs"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<g>\n    <rect fill="none" height="24" width="24" y="0" />\n</g>\n<g>\n    <g>\n        <path\n            d="M7.6,8.67l-2.01,0.8c-0.22,0.09-0.34,0.31-0.31,0.54l2.4,5.98h1.23l-0.62-6.9C8.25,8.75,7.91,8.54,7.6,8.67 z"\n            opacity=".3" />\n        <path d="M3.07,16.1c-0.27,0.53,0.29,1.09,0.82,0.83l1.68-0.84l-1.08-2.71L3.07,16.1z" opacity=".3" />\n        <path\n            d="M13.36,6.99h-2.71c-0.27,0-0.53,0.23-0.5,0.54l0.77,8.45h2.17l0.77-8.45C13.88,7.22,13.63,6.99,13.36,6.99z"\n            opacity=".3" />\n        <path\n            d="M18.41,9.47l-2.01-0.8c-0.31-0.12-0.65,0.09-0.68,0.42l-0.62,6.9h1.23l2.4-5.98 C18.75,9.78,18.63,9.56,18.41,9.47z"\n            opacity=".3" />\n        <path d="M19.52,13.39l-1.08,2.7l1.68,0.84c0.52,0.26,1.09-0.3,0.82-0.83L19.52,13.39z" opacity=".3" />\n        <path\n            d="M20.5,10.94c0.13-0.32,0.1-0.23,0.15-0.39c0.3-1.21-0.34-2.47-1.5-2.93l-2.01-0.8c-0.46-0.18-0.95-0.21-1.41-0.12 c-0.11-0.33-0.29-0.63-0.52-0.89C14.73,5.29,14.06,5,13.36,5h-2.71C9.94,5,9.27,5.29,8.8,5.81C8.56,6.07,8.38,6.37,8.27,6.69 C7.81,6.6,7.32,6.63,6.86,6.81l-2.01,0.8c-1.16,0.46-1.8,1.72-1.5,2.93l0.15,0.38C1.1,15.55,1,15.55,1,16.38 c0,0.91,0.46,1.74,1.24,2.22c1.42,0.88,2.49,0.14,4-0.61h11.53c1.52,0.76,1.86,1.01,2.63,1.01c1,0,2.61-0.77,2.61-2.61 C23,15.54,22.88,15.51,20.5,10.94z M3.88,16.93c-0.53,0.26-1.09-0.3-0.82-0.83l1.41-2.72l1.08,2.71L3.88,16.93z M7.68,15.99 l-2.4-5.98C5.25,9.78,5.37,9.56,5.59,9.47l2.01-0.8c0.31-0.12,0.65,0.08,0.68,0.42l0.62,6.9H7.68z M13.09,15.99h-2.17l-0.77-8.45 c-0.03-0.31,0.23-0.54,0.5-0.54h2.71c0.27,0,0.53,0.23,0.5,0.54L13.09,15.99z M16.32,15.99h-1.23l0.62-6.9 c0.03-0.33,0.37-0.54,0.68-0.42l2.01,0.8c0.22,0.09,0.34,0.31,0.31,0.54L16.32,15.99z M20.12,16.93l-1.68-0.84l1.08-2.7l1.41,2.71 C21.21,16.63,20.64,17.19,20.12,16.93z" />\n    </g>\n</g>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:".hbs"})," file must start exactly with the content ",(0,i.jsx)(n.code,{children:'"<g>"'})," or ",(0,i.jsx)(n.code,{children:'"<g "'})," for correct compilation. The HBS compiler will generate a template that you can then import and register with the icon regsitry."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"bundle.esm.js"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";\nimport iconBakeryDiningTemplate from "./dist/generated/templates/BakeryDiningTemplate.lit.js";\n\n// create the icon data for registration\nconst iconBakeryDining = {\n    customTemplate: iconBakeryDiningTemplate,\n    viewBox: "0 0 24 24",\n    collection: "custom",\n}\n\n// register the icon\nregisterIcon("bakery-dining", iconBakeryDining);\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The icon data object should fill the ",(0,i.jsx)(n.code,{children:"customTemplate"})," property with a template that will be included inside the SVG of the ",(0,i.jsx)(n.code,{children:"<ui5-icon>"}),". In that case, a ",(0,i.jsx)(n.code,{children:"path"})," won't be rendered. You can also specify a custom ",(0,i.jsx)(n.code,{children:"viewBox"})," size, as the default one is ",(0,i.jsx)(n.code,{children:"0 0 512 512"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Finally, the icon can be used anywhere."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<ui5-icon name="custom/backery-dining"></ui5-icon>\n<ui5-avatar icon="custom/backery-dining" size="XS"></ui5-avatar>\n'})}),"\n",(0,i.jsx)(n.p,{children:"Tip: for multi-colored icons, you can specify multiple SVG elements and put a fill/color attribute with a specific value on each element."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<g fill="none" stroke="currentColor" stroke-width="2">\n    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" fill="aqua"/>\n    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />\n</g>\n'})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},71184:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>r});var i=s(14041);const o={},c=i.createContext(o);function t(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);