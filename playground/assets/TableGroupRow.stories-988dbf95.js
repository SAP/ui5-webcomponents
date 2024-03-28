import{x as o}from"./lit-element-c5a2b594.js";import{o as n}from"./unsafe-html-0ddd83da.js";const i={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},m={package:"@ui5/webcomponents",since:"1.0.0-rc.15",tagName:"ui5-table-group-row",showDefaultStoryOnly:!0},s={title:"Main/Table/Table Group Row",component:"TableGroupRow",argTypes:i},r=u=>o`
<ui5-table>
<ui5-table-column slot="columns">City</ui5-table-column>
<ui5-table-column slot="columns">Supplier</ui5-table-column>
<ui5-table-column slot="columns">Country</ui5-table-column>
    <ui5-table-group-row>${n(u.default)}</ui5-table-group-row>
    <ui5-table-row>
        <ui5-table-cell><span>Sofia</span></ui5-table-cell>
        <ui5-table-cell><span>Company 1</span></ui5-table-cell>
        <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
    </ui5-table-row>
    <ui5-table-row>
        <ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
        <ui5-table-cell><span>Company 2</span></ui5-table-cell>
        <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
    </ui5-table-row>
</ui5-table>
`,l=r.bind({});l.tags=["_hidden_"];l.args={default:"Country: Bulgaria"};var e,a,t;l.parameters={...l.parameters,docs:{...(e=l.parameters)==null?void 0:e.docs,source:{originalSource:`args => html\`
<ui5-table>
<ui5-table-column slot="columns">City</ui5-table-column>
<ui5-table-column slot="columns">Supplier</ui5-table-column>
<ui5-table-column slot="columns">Country</ui5-table-column>
    <ui5-table-group-row>\${unsafeHTML(args.default)}</ui5-table-group-row>
    <ui5-table-row>
        <ui5-table-cell><span>Sofia</span></ui5-table-cell>
        <ui5-table-cell><span>Company 1</span></ui5-table-cell>
        <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
    </ui5-table-row>
    <ui5-table-row>
        <ui5-table-cell><span>Plovdiv</span></ui5-table-cell>
        <ui5-table-cell><span>Company 2</span></ui5-table-cell>
        <ui5-table-cell><span>Bulgaria</span></ui5-table-cell>
    </ui5-table-row>
</ui5-table>
\``,...(t=(a=l.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};const c=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:l,__namedExportsOrder:c,default:s},Symbol.toStringTag,{value:"Module"}));export{g as C,m as c};
