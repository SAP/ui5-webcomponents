import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as o,F as a}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function r(t){const n=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",pre:"pre",h3:"h3",a:"a"},s(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Getting started/Typescript support"}),`
`,e.jsx(o,{}),`
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
`,e.jsx(n.h3,{id:"component-properties",children:"Component properties"}),`
`,e.jsx(n.p,{children:"In TypeScript, when a property is declared optional using the ? syntax in an interface, it means that the property can either have a defined value of a certain type or be absent altogether. This doesn't imply that the property can be explicitly set to null or undefined unless explicitly stated."}),`
`,e.jsxs(n.p,{children:["For instance, if the ",e.jsx(n.code,{children:"value"})," property of the ",e.jsx(n.code,{children:"ui5-combobox"})," component is defined as optional with the type string (value?: string). This indicates that the property can be set with a string value or be absent/omitted."]}),`
`,e.jsxs(n.p,{children:["However, setting it explicitly to null might lead to runtime errors because the component might not handle null values correctly. To ensure proper handling of optional properties, ",e.jsx(n.strong,{children:'TypeScript offers a feature we suggest enabling called "Exact Optional Property Types"'}),". See ",e.jsx(n.a,{href:"https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes"}),` .
When enabled, TypeScript enforces stricter rules regarding optional properties, ensuring that they can only be assigned values that are explicitly allowed by the type definition.`]}),`
`,e.jsx(n.p,{children:"For instance, consider the following interface:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface UserDefaults { 
    colorThemeOverride?: "dark" | "light"; 
}
`})}),`
`,e.jsxs(n.p,{children:['Without "Exact Optional Property Types" enabled, TypeScript allows setting ',e.jsx(n.code,{children:"colorThemeOverride"})," to ",e.jsx(n.code,{children:"dark"}),", ",e.jsx(n.code,{children:"light"}),", or ",e.jsx(n.code,{children:"undefined"}),'. However, enabling "Exact Optional Property Types" ensures that only these values are permitted, disallowing null or other unexpected values.']}),`
`,e.jsxs(n.p,{children:["In summary, it's essential to ensure that the a property of type string is handled according to its type definition (for example, by setting empty string, instead of ",e.jsx(n.code,{children:"null"}),", where type is ",e.jsx(n.code,{children:"string"}),'), and if necessary, enable "Exact Optional Property Types" in TypeScript to enforce stricter rules regarding optional properties.']}),`
`,e.jsx(a,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},s(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(r,t)})):r(t)}export{f as default};
