import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as s}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function b(n={}){const{wrapper:o}=Object.assign({},s(),n.components);return o?e.exports.jsx(o,Object.assign({},n,{children:e.exports.jsx(r,{})})):r();function r(){const t=Object.assign({h1:"h1",p:"p",em:"em",strong:"strong",h2:"h2",h3:"h3",code:"code",pre:"pre",ul:"ul",li:"li",a:"a"},s(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/RTL and compact mode"}),`
`,e.exports.jsx(t.h1,{children:"Right-To-Left (RTL) and Compact Mode"}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.em,{children:["This section explains how to make UI5 Web Components render in ",e.exports.jsx(t.strong,{children:"RTL"})," and ",e.exports.jsx(t.strong,{children:"compact mode"}),"."]})}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Note:"})," Both of these settings are not properties of the components per se, but rather markers you set on some part of the HTML page that affect all components inside."]}),`
`,e.exports.jsx(t.h2,{children:"RTL Support"}),`
`,e.exports.jsx(t.p,{children:"Some UI5 Web Components are RTL-aware, meaning they render differently when placed in an RTL-designated part of the DOM tree."}),`
`,e.exports.jsx(t.h3,{children:"Setting RTL"}),`
`,e.exports.jsxs(t.p,{children:["To have the components render in RTL mode, just set the HTML attribute ",e.exports.jsx(t.code,{children:"dir"})," to ",e.exports.jsx(t.code,{children:"rtl"})," on the component itself, the ",e.exports.jsx(t.code,{children:"body"}),", ",e.exports.jsx(t.code,{children:"html"})," or any other relevant region of your application."]}),`
`,e.exports.jsx(t.p,{children:"Example 1:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body dir="rtl">
    ...
</body>
`})}),`
`,e.exports.jsx(t.p,{children:"(RTL will be set for all UI5 Web Components on the page.)"}),`
`,e.exports.jsx(t.p,{children:"Example 2:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
    <ui5-button>Button 1</ui5-button>
    <div dir="rtl">
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button dir="rtl">Button 3</ui5-button>
</body>
`})}),`
`,e.exports.jsx(t.p,{children:"(RTL will be set for Button 2 and Button 3.)"}),`
`,e.exports.jsx(t.h3,{children:"Changing RTL Dynamically"}),`
`,e.exports.jsxs(t.p,{children:["The first time UI5 Web Components are rendered, they will take into account the ",e.exports.jsx(t.code,{children:"dir"})," attribute  of the respective part of the DOM tree they are placed in."]}),`
`,e.exports.jsxs(t.p,{children:["However, if you change ",e.exports.jsx(t.code,{children:"dir"})," dynamically afterwards, you must call the ",e.exports.jsx(t.code,{children:"applyDirection"})," method to re-render all RTL-aware components."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

document.body.dir = "rtl";
applyDirection();
`})}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.em,{children:"Technical Note:"})," Whenever you change the ",e.exports.jsx(t.code,{children:"dir"}),` attribute, the browser will automatically re-render that part of the DOM tree (including any Web Components) by default.
The `,e.exports.jsx(t.code,{children:"applyDirection"})," call is only needed to adjust paddings, margins and other CSS selectors that are not affected by ",e.exports.jsx(t.code,{children:"dir"}),`. As more advanced CSS
features become available in the near future, `,e.exports.jsx(t.code,{children:"applyDirection"})," will not be needed and will eventually be deprecated."]}),`
`,e.exports.jsx(t.h2,{children:"Compact Mode"}),`
`,e.exports.jsx(t.p,{children:"Some UI5 Web Components support compact mode, meaning they can be rendered with smaller sizes, margins and paddings in order to preserve as much space as possible."}),`
`,e.exports.jsxs(t.p,{children:["To enable compact mode, use any of the following markers on the component itself, the ",e.exports.jsx(t.code,{children:"body"}),", ",e.exports.jsx(t.code,{children:"html"})," or any other relevant region of your application:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"data-ui5-compact-size"})," ",e.exports.jsx(t.strong,{children:"attribute"})]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"ui5-content-density-compact"})," ",e.exports.jsx(t.strong,{children:"class"})]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Example 1:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body data-ui5-compact-size>
...
</body>
`})}),`
`,e.exports.jsx(t.p,{children:"(Compact mode is set for all UI5 Web Components on the page.)"}),`
`,e.exports.jsx(t.p,{children:"Example 2:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
    <ui5-button>Button 1</ui5-button>
    <div data-ui5-compact-size>
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button class="ui5-content-density-compact">Button 3</ui5-button>
</body>
`})}),`
`,e.exports.jsx(t.p,{children:"(Compact mode will be set for Button 2 and Button 3.)"}),`
`,e.exports.jsx(t.p,{children:"Unlike RTL, compact mode does not require additional APIs when its markers are changed dynamically."}),`
`,e.exports.jsxs(t.p,{children:["Next: ",e.exports.jsx(t.a,{href:"../scoping",children:"Micro-Frontends and Custom Elements Scoping"})]})]})}}export{b as default};
//# sourceMappingURL=02-RTL-and-compact-mode.53fbec1d.js.map
