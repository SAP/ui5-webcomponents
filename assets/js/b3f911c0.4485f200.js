"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[1750],{76894:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>l,frontMatter:()=>i,metadata:()=>r,toc:()=>a});var s=t(31085),o=t(71184);const i={},c="Components Packages",r={id:"docs/getting-started/components-packages",title:"Components Packages",description:"This section gives overview on the available components packages of web components and how to make use of them in your projects.",source:"@site/docs/docs/1-getting-started/02-components-packages.md",sourceDirName:"docs/1-getting-started",slug:"/docs/getting-started/components-packages",permalink:"/ui5-webcomponents/docs/getting-started/components-packages",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"First Steps",permalink:"/ui5-webcomponents/docs/getting-started/first-steps"},next:{title:"Components APIs",permalink:"/ui5-webcomponents/docs/getting-started/components-APIs"}},d={},a=[{value:"Usage",id:"usage",level:2}];function p(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"components-packages",children:"Components Packages"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"This section gives overview on the available components packages of web components and how to make use of them in your projects."})}),"\n",(0,s.jsx)(n.p,{children:"The UI5 Web Components project currently offers 3 NPM packages with Web Components.\nThis separation is purely logical, as you can, and should, only import the components you are going to use."}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Project"}),(0,s.jsx)(n.th,{children:"NPM Package"}),(0,s.jsx)(n.th,{children:"Description"}),(0,s.jsx)(n.th,{children:"Application"}),(0,s.jsx)(n.th,{children:"Components List"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"main"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",children:"@ui5/webcomponents"})}),(0,s.jsx)(n.td,{children:'"Bread-and-butter" components, such as buttons, pickers, inputs, list, table, etc.'}),(0,s.jsx)(n.td,{children:"General web apps"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents",children:"Explore"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"fiori"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",children:"@ui5/webcomponents-fiori"})}),(0,s.jsx)(n.td,{children:"More semantic, higher-order components that implement Fiori patterns"}),(0,s.jsx)(n.td,{children:"Mostly SAP Fiori apps"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",children:"Explore"})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"ai"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-fiori",children:"@ui5/webcomponents-ai"})}),(0,s.jsx)(n.td,{children:"Provides web components implementing AI-related visual and interaction."}),(0,s.jsx)(n.td,{children:"Mostly SAP Fiori apps"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@ui5/webcomponents-ai",children:"Explore"})})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Install one or all of the above packages as dependencies to your project."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm i @ui5/webcomponents\nnpm i @ui5/webcomponents-fiori\nnpm i @ui5/webcomponents-ai\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsx)(n.li,{children:"Import the components your app is going to use."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'import "@ui5/<PACKAGE-NAME>/dist/<COMPONENT-NAME>.js";'})}),"\n",(0,s.jsx)(n.p,{children:"For example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import "@ui5/webcomponents/dist/Button.js"; // ui5-button\nimport "@ui5/webcomponents/dist/Input.js"; // ui5-input\nimport "@ui5/webcomponents/dist/List.js"; // ui5-list\nimport "@ui5/webcomponents/dist/ListItemStandard.js"; // ui5-li\n\nimport "@ui5/webcomponents-fiori/dist/Wizard.js"; // ui5-wizard\n\nimport "@ui5/webcomponents-fiori/dist/PromtInput.js"; // ui5-prompt-input\n'})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsx)(n.li,{children:"Use the components in your app."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Once a component is imported, it is ",(0,s.jsx)(n.strong,{children:"automatically"})," registered and ready to use."]}),"\n",(0,s.jsx)(n.p,{children:"For example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<ui5-button id="btn">This is a button</ui5-button>\n<ui5-input value="This is an input"></ui5-input>\n<script>\n    btn.addEventListener("click", () => {});\n<\/script>\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," For most components the name of the module (f.e. ",(0,s.jsx)(n.code,{children:"Button.js"}),", ",(0,s.jsx)(n.code,{children:"Icon.js"}),") coincides with the name of the tag (",(0,s.jsx)(n.code,{children:"ui5-button"}),", ",(0,s.jsx)(n.code,{children:"ui5-icon"}),"),\nwhereas for others this is not the case (f.e. ",(0,s.jsx)(n.code,{children:"ListItemStandard.js"})," and ",(0,s.jsx)(n.code,{children:"ui5-li"}),"). Always consult the documentation when in doubt."]})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},71184:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>r});var s=t(14041);const o={},i=s.createContext(o);function c(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);