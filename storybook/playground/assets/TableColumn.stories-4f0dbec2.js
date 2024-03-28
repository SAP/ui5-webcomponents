import{x as l}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as p}from"./unsafe-html-0ddd83da.js";const s={popinDisplay:{control:"select",options:["Block","Inline"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},f={package:"@ui5/webcomponents",tagName:"ui5-table-column",showDefaultStoryOnly:!0},r={title:"Main/Table/Table Column",component:"TableColumn",argTypes:s},u=n=>l`
<ui5-table>
    <ui5-table-column
        slot="columns"
        ?demand-popin="${o(n.demandPopin)}"
        min-width="${o(n.minWidth)}"
        popin-display="${o(n.popinDisplay)}"
        popin-text="${o(n.popinText)}"
    >
        ${p(n.default)}
    </ui5-table-column>
    <ui5-table-row>
        <ui5-table-cell>
            <span>Notebook Basic 15</span>
        </ui5-table-cell>
    </ui5-table-row>
</ui5-table>
`,e=u.bind({});e.tags=["_hidden_"];e.args={default:"<span>Product</span>"};var t,a,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`args => html\`
<ui5-table>
    <ui5-table-column
        slot="columns"
        ?demand-popin="\${ifDefined(args.demandPopin)}"
        min-width="\${ifDefined(args.minWidth)}"
        popin-display="\${ifDefined(args.popinDisplay)}"
        popin-text="\${ifDefined(args.popinText)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-table-column>
    <ui5-table-row>
        <ui5-table-cell>
            <span>Notebook Basic 15</span>
        </ui5-table-cell>
    </ui5-table-row>
</ui5-table>
\``,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const c=["Basic"],y=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:c,default:r},Symbol.toStringTag,{value:"Module"}));export{y as C,f as c};
