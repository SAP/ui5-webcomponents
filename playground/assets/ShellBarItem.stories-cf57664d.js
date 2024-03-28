import{x as i}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";const l={},g={package:"@ui5/webcomponents-fiori",tagName:"ui5-shellbar-item",showDefaultStoryOnly:!0},n={title:"Fiori/ShellBar/ShellBarItem",component:"ShellBarItem",argTypes:l},c=t=>i`<ui5-shellbar
    primary-title="Corporate Portal"
>
    <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
    <ui5-shellbar-item
        icon="${o(t.icon)}"
        text="${o(t.text)}"
        count="${o(t.count)}"
    ></ui5-shellbar-item>

</ui5-shellbar>`,e=c.bind({});e.tags=["_hidden_"];e.args={text:"2 notifications",icon:"bell",count:"2"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`args => html\`<ui5-shellbar
    primary-title="Corporate Portal"
>
    <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
    <ui5-shellbar-item
        icon="\${ifDefined(args.icon)}"
        text="\${ifDefined(args.text)}"
        count="\${ifDefined(args.count)}"
    ></ui5-shellbar-item>

</ui5-shellbar>\``,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const m=["Basic"],h=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:m,default:n},Symbol.toStringTag,{value:"Module"}));export{h as C,g as c};
