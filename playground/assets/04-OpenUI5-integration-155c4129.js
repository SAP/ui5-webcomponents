import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as r,F as p}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(o){const n=Object.assign({h1:"h1",p:"p",em:"em",a:"a",pre:"pre",code:"code",ul:"ul",li:"li"},s(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Advanced/OpenUI5 integration"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"openui5-integration",children:"OpenUI5 Integration"}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:[e.jsx(n.a,{href:"https://openui5.org/",target:"_blank",rel:"nofollow noopener noreferrer",children:"OpenUI5"})," is an open-source framework in the same product family as UI5 Web Components."]})}),`
`,e.jsx(n.p,{children:"To enable OpenUI5 support, import the following module:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
`})}),`
`,e.jsx(n.p,{children:"Futhermore, the module must be imported before all components import, so that the feature is enabled upon framework boot."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Input.js";
`})}),`
`,e.jsx(n.p,{children:`If your app uses both OpenUI5 and UI5 Web Components, UI5 Web Components can benefit
from OpenUI5 configuration and resources.`}),`
`,e.jsx(n.p,{children:"When you import the above module:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`OpenUI5 configuration takes precedence over UI5 Web Components configuration
for all common entities (theme, language, etc.). In addition, changing the theme
in OpenUI5 will also change the theme in UI5 Web Components.`}),`
`,e.jsx(n.li,{children:"Fonts will not be loaded twice (just once by OpenUI5, and reused)."}),`
`,e.jsx(n.li,{children:"Locale data assets will not be fetched twice (just once by OpenUI5, and reused)."}),`
`]}),`
`,e.jsx(n.p,{children:`Therefore, if you intend to run both frameworks in the same browser window,
it is highly recommended to enable OpenUI5 support and benefit from these optimizations.`}),`
`,e.jsx(p,{})]})}function g(o={}){const{wrapper:n}=Object.assign({},s(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(t,o)})):t(o)}export{g as default};
