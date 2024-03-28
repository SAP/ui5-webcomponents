import{x as s}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as r}from"./unsafe-html-0ddd83da.js";const i={type:{control:"select",options:["Inactive","Active"]},default:{control:{type:"text"},table:{type:{summary:"Array<TableCell>"}}}},f={package:"@ui5/webcomponents",tagName:"ui5-table-row",showDefaultStoryOnly:!0},c={title:"Main/Table/Table Row",component:"TableRow",argTypes:i},u=t=>s`
<ui5-table>
    <ui5-table-column slot="columns">
        <span>Product</span>
    </ui5-table-column>
    <ui5-table-row
        ?navigated=${a(t.navigated)}
        ?selected=${a(t.selected)}
        type=${a(t.type)}
    >${r(t.default)}</ui5-table-row>
</ui5-table>
`,e=u.bind({});e.tags=["_hidden_"];e.args={default:`<ui5-table-cell>
    Notebook Basic 15
</ui5-table-cell>`};var o,l,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`
<ui5-table>
    <ui5-table-column slot="columns">
        <span>Product</span>
    </ui5-table-column>
    <ui5-table-row
        ?navigated=\${ifDefined(args.navigated)}
        ?selected=\${ifDefined(args.selected)}
        type=\${ifDefined(args.type)}
    >\${unsafeHTML(args.default)}</ui5-table-row>
</ui5-table>
\``,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const p=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
