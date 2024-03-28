import{x as n}from"./lit-element-c5a2b594.js";import{o as s}from"./unsafe-html-0ddd83da.js";const r={default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement> | undefined"}}}},p={package:"@ui5/webcomponents",tagName:"ui5-table-cell",showDefaultStoryOnly:!0},u={title:"Main/Table/Table Cell",component:"TableCell",argTypes:r},c=o=>n`
<ui5-table>
    <ui5-table-column slot="columns">
        <span>Product</span>
    </ui5-table-column>
    <ui5-table-row>
        <ui5-table-cell>
            ${s(o.default)}
        </ui5-table-cell>
    </ui5-table-row>
</ui5-table>
`,e=c.bind({});e.tags=["_hidden_"];e.args={default:"<span>Notebook Basic 15</span>"};var t,a,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`args => html\`
<ui5-table>
    <ui5-table-column slot="columns">
        <span>Product</span>
    </ui5-table-column>
    <ui5-table-row>
        <ui5-table-cell>
            \${unsafeHTML(args.default)}
        </ui5-table-cell>
    </ui5-table-row>
</ui5-table>
\``,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const i=["Basic"],d=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:i,default:u},Symbol.toStringTag,{value:"Module"}));export{d as C,p as c};
