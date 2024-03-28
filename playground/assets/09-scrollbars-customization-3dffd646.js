import{j as e}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-23ccc92f.js";import{F as i}from"./Footer-128212f8.js";import{u as n}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-a8070aa2.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(o){const t=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",strong:"strong",pre:"pre",a:"a"},n(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Advanced/Scrollbars customization"}),`
`,e.jsx(t.h1,{id:"scrollbars-customization",children:"Scrollbars customization"}),`
`,e.jsx(t.p,{children:"By default some of the components provide additional CSS styles, which are applied to their scrollbars, in order to achieve their target design."}),`
`,e.jsx(t.h2,{id:"setting-default-scrollbar-styles-to-components",children:"Setting default scrollbar styles to components"}),`
`,e.jsxs(t.p,{children:["To use native scrollbar styles, you have to add the CSS style class ",e.jsx(t.code,{children:".ui5-content-native-scrollbars"})," on the body element of your application."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Note: Because of some browser restrictions this setting takes affect if it is applied before the initial rendering of the compontents, which are using it."})}),`
`,e.jsx(t.p,{children:"Example 1:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`<body class="ui5-content-native-scrollbars">\r
    ...\r
</body>
`})}),`
`,e.jsxs(t.p,{children:["Next: ",e.jsx(t.a,{href:"./?path=/docs/docs-advanced-ignore-custom-elements--docs",children:"Ignore Custom HTML elements"})]}),`
`,e.jsx(i,{})]})}function b(o={}){const{wrapper:t}=Object.assign({},n(),o.components);return t?e.jsx(t,Object.assign({},o,{children:e.jsx(s,o)})):s(o)}export{b as default};
