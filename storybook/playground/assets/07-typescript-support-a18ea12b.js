import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-b29b9894.js";import{F as a}from"./Footer-93056ea7.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-c49f6a91.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(t){const n=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",pre:"pre"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Getting started/Typescript support"}),`
`,e.jsx(n.h1,{id:"typescript-support",children:"TypeScript Support"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"TypeScript Support is enabled for both component development and component consumption."})}),`
`,e.jsxs(n.p,{children:["Since version ",e.jsx(n.code,{children:"1.11.0"}),", we have been providing TypeScript definitions under an experimental flag, and starting from version ",e.jsx(n.code,{children:"1.19.0"}),", all TypeScript definitions are considered ",e.jsx(n.code,{children:"stable"}),`.
With TypeScript definitions you will benefit from static code checks, autocompletion, and other expected features as expected in a TypeScript application.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," In exceptional cases, some of the available TypeScript types may change. In such instances, we will document all changes in a prominent manner within our release change log."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," usage of ",e.jsx(n.code,{children:"setLanguage"})," from ",e.jsx(n.code,{children:"@ui5/webcomponents-base"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import  { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";

setLanguage("de");

`})}),`
`,e.jsx(n.p,{children:"You will get a proper documentation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`setLanguage(language: string): Promise<void>

Changes the current language, re-fetches all message bundles, updates all language-aware components and returns a promise that resolves when all rendering is done.

@public
@returns
`})}),`
`,e.jsx(n.p,{children:"When you pass a wrong argument:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`setLanguage(false)
`})}),`
`,e.jsx(n.p,{children:"You will get a TypeScript error:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`Argument of type 'boolean' is not assignable to parameter of type 'string'.
`})}),`
`,e.jsx(a,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{f as default};
