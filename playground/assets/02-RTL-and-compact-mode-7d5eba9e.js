import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as s,F as d}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",p:"p",em:"em",strong:"strong",h2:"h2",h3:"h3",code:"code",pre:"pre",ul:"ul",li:"li"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Advanced/RTL and compact mode"}),`
`,e.jsx(s,{}),`
`,e.jsx(n.h1,{id:"right-to-left-rtl-and-compact-mode",children:"Right-To-Left (RTL) and Compact Mode"}),`
`,e.jsx(n.p,{children:e.jsxs(n.em,{children:["This section explains how to make UI5 Web Components render in ",e.jsx(n.strong,{children:"RTL"})," and ",e.jsx(n.strong,{children:"compact mode"}),"."]})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Both of these settings are not properties of the components per se, but rather markers you set on some part of the HTML page that affect all components inside."]}),`
`,e.jsx(n.h2,{id:"rtl-support",children:"RTL Support"}),`
`,e.jsx(n.p,{children:"Some UI5 Web Components are RTL-aware, meaning they render differently when placed in an RTL-designated part of the DOM tree."}),`
`,e.jsx(n.h3,{id:"setting-rtl",children:"Setting RTL"}),`
`,e.jsxs(n.p,{children:["To have the components render in RTL mode, just set the HTML attribute ",e.jsx(n.code,{children:"dir"})," to ",e.jsx(n.code,{children:"rtl"})," on the component itself, the ",e.jsx(n.code,{children:"body"}),", ",e.jsx(n.code,{children:"html"})," or any other relevant region of your application."]}),`
`,e.jsx(n.p,{children:"Example 1:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body dir="rtl">
    ...
</body>
`})}),`
`,e.jsx(n.p,{children:"(RTL will be set for all UI5 Web Components on the page.)"}),`
`,e.jsx(n.p,{children:"Example 2:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body>
    <ui5-button>Button 1</ui5-button>
    <div dir="rtl">
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button dir="rtl">Button 3</ui5-button>
</body>
`})}),`
`,e.jsx(n.p,{children:"(RTL will be set for Button 2 and Button 3.)"}),`
`,e.jsx(n.h3,{id:"changing-rtl-dynamically",children:"Changing RTL Dynamically"}),`
`,e.jsxs(n.p,{children:["The first time UI5 Web Components are rendered, they will take into account the ",e.jsx(n.code,{children:"dir"})," attribute  of the respective part of the DOM tree they are placed in."]}),`
`,e.jsxs(n.p,{children:["However, if you change ",e.jsx(n.code,{children:"dir"})," dynamically afterwards, you must call the ",e.jsx(n.code,{children:"applyDirection"})," method to re-render all RTL-aware components."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

document.body.dir = "rtl";
applyDirection();
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Technical Note:"})," Whenever you change the ",e.jsx(n.code,{children:"dir"}),` attribute, the browser will automatically re-render that part of the DOM tree (including any Web Components) by default.
The `,e.jsx(n.code,{children:"applyDirection"})," call is only needed to adjust paddings, margins and other CSS selectors that are not affected by ",e.jsx(n.code,{children:"dir"}),`. As more advanced CSS
features become available in the near future, `,e.jsx(n.code,{children:"applyDirection"})," will not be needed and will eventually be deprecated."]}),`
`,e.jsx(n.h2,{id:"compact-mode",children:"Compact Mode"}),`
`,e.jsx(n.p,{children:"Some UI5 Web Components support compact mode, meaning they can be rendered with smaller sizes, margins and paddings in order to preserve as much space as possible."}),`
`,e.jsxs(n.p,{children:["To enable compact mode, use any of the following markers on the component itself, the ",e.jsx(n.code,{children:"body"}),", ",e.jsx(n.code,{children:"html"})," or any other relevant region of your application:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-ui5-compact-size"})," ",e.jsx(n.strong,{children:"attribute"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ui5-content-density-compact"})," ",e.jsx(n.strong,{children:"class"})]}),`
`]}),`
`,e.jsx(n.p,{children:"Example 1:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body data-ui5-compact-size>
...
</body>
`})}),`
`,e.jsx(n.p,{children:"(Compact mode is set for all UI5 Web Components on the page.)"}),`
`,e.jsx(n.p,{children:"Example 2:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body>
    <ui5-button>Button 1</ui5-button>
    <div data-ui5-compact-size>
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button class="ui5-content-density-compact">Button 3</ui5-button>
</body>
`})}),`
`,e.jsx(n.p,{children:"(Compact mode will be set for Button 2 and Button 3.)"}),`
`,e.jsx(n.p,{children:"Unlike RTL, compact mode does not require additional APIs when its markers are changed dynamically."}),`
`,e.jsx(d,{})]})}function g(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{g as default};
