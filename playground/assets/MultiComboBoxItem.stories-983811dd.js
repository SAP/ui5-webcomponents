import{x as a}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";const c={},b={package:"@ui5/webcomponents",tagName:"ui5-mcb-item",showDefaultStoryOnly:!0},s={title:"Main/Multi-Combo Box/Multi-Combo Box Item",component:"MultiComboBoxItem",argTypes:c},r=t=>a`
<ui5-multi-combobox>
    <ui5-mcb-item
        text="${o(t.text)}"
        additional-text="${o(t.additionalText)}"
        ?selected="${o(t.selected)}"
    ></ui5-mcb-item>
</ui5-multi-combobox>`,e=r.bind({});e.tags=["_hidden_"];e.args={text:"Argentina",selected:!0};var i,m,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox>
    <ui5-mcb-item
        text="\${ifDefined(args.text)}"
        additional-text="\${ifDefined(args.additionalText)}"
        ?selected="\${ifDefined(args.selected)}"
    ></ui5-mcb-item>
</ui5-multi-combobox>\``,...(n=(m=e.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};const l=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:l,default:s},Symbol.toStringTag,{value:"Module"}));export{x as C,b as c};
