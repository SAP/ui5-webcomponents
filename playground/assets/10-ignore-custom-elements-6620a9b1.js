import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as i,F as a}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(n){const t=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2"},r(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Advanced/Ignore custom elements"}),`
`,e.jsx(i,{}),`
`,e.jsx(t.h1,{id:"ignore-custom-html-elements",children:"Ignore Custom HTML elements"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"ignoreCustomElements"})," feature lets you describe all custom elements to be ignored and improve the rendering performance of the UI5 Web Components, by setting a given tag prefix."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-js",children:`import { ignoreCustomElements } from "@ui5/webcomponents-base/dist/IgnoreElements.js";\r
ignoreCustomElements("app-");
`})}),`
`,e.jsxs(t.h2,{id:"when-do-i-need-to-use-the-ignorecustomelements-feature",children:["When do I need to use the ",e.jsx(t.code,{children:"ignoreCustomElements"})," feature?"]}),`
`,e.jsx(t.p,{children:"The feature is useful, when UI5 Web Components and used together with custom HTML elements with custom tags to make the application's markup more semantic."}),`
`,e.jsx(t.p,{children:"For example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<ui5-card>\r
    <app-trip-calendar></app-trip-calendar>\r
</ui5-card>
`})}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"ui5-card"})," is a UI5 Web Component, while the ",e.jsx(t.code,{children:"app-trip-calendar"})," is an app-defined custom HTML element with no JavaScript attached, with just semantic purpose. And, it is slotted in the content of the ",e.jsx(t.code,{children:"ui5-card"}),"."]}),`
`,e.jsx(t.p,{children:'When a web component of ours is about to be defined and registered in the global CustomElements registry, the framework checks if some of the slotted children are custom elements by checking the presence of a hyphen ("-") in their tag names. And, if this is true, the framework waits for the children to be defined and registered first, because the state or visual appearance of the parent may rely on the slotted elements/children.'}),`
`,e.jsxs(t.p,{children:["While this is required in many cases, for custom HTML elements with pure semantic purpose and no JavaScript class attached (f.e. ",e.jsx(t.code,{children:"app-trip-calendar"}),`) - it's not.\r
Moreover, it leads to increasing the `,e.jsx(t.code,{children:"time to render"})," parameter of the given web component (f.e.",e.jsx(t.code,{children:"ui5-card"}),`).\r
In cases like this, we recommend using `,e.jsx(t.code,{children:"ignoreCustomElements"})," to let the UI5 Web Components framework treats such custom HTML elements as if they are standard HTML elements, such as: ",e.jsx(t.code,{children:"div"}),", ",e.jsx(t.code,{children:"span"}),", etc."]}),`
`,e.jsx(a,{})]})}function b(n={}){const{wrapper:t}=Object.assign({},r(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(s,n)})):s(n)}export{b as default};
