import{j as t}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-2d5b4761.js";import{F as i}from"./Footer-3006da85.js";import{u as n}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-c68ca0b6.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(o){const e=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",strong:"strong",pre:"pre"},n(),o.components);return t.jsxs(t.Fragment,{children:[t.jsx(r,{title:"Docs/Advanced/Scrollbars customization"}),`
`,t.jsx(e.h1,{id:"scrollbars-customization",children:"Scrollbars Customization"}),`
`,t.jsx(e.p,{children:"By default, some of the components provide additional CSS styles, which are applied to their scrollbars in order to achieve their target design."}),`
`,t.jsx(e.h2,{id:"setting-default-scrollbar-styles-to-components",children:"Setting Default Scrollbar Styles to Components"}),`
`,t.jsxs(e.p,{children:["To use native scrollbar styles, you have to add the CSS style class ",t.jsx(e.code,{children:".ui5-content-native-scrollbars"})," to the body element of your application."]}),`
`,t.jsx(e.p,{children:t.jsx(e.strong,{children:"Note: Because of some browser restrictions, this setting takes effect if it is applied before the initial rendering of the components, which use it."})}),`
`,t.jsx(e.p,{children:"Example:"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{children:`<body class="ui5-content-native-scrollbars">\r
    ...\r
</body>
`})}),`
`,t.jsx(i,{})]})}function b(o={}){const{wrapper:e}=Object.assign({},n(),o.components);return e?t.jsx(e,Object.assign({},o,{children:t.jsx(s,o)})):s(o)}export{b as default};
