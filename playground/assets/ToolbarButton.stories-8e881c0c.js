import{x as s}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";const r={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]},overflowPriority:{control:"select",options:["Default","NeverOverflow","AlwaysOverflow"]}},u={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-toolbar-button",showDefaultStoryOnly:!0},c={title:"Main/Toolbar/Toolbar Button",component:"ToolbarButton",argTypes:r},l=e=>s`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-button
        text="${t(e.text)}"
        accessibility-attributes="${t(e.accessibilityAttributes)}"
        accessible-name="${t(e.accessibleName)}"
        accessible-name-ref="${t(e.accessibleNameRef)}"
        design="${t(e.design)}"
        ?disabled="${t(e.disabled)}"
        icon="${t(e.icon)}"
        ?icon-end="${t(e.iconEnd)}"
        tooltip="${t(e.tooltip)}"
        width="${t(e.width)}"
    ></ui5-toolbar-button>
</ui5-toolbar>`,o=l.bind({});o.tags=["_hidden_"];o.args={text:"Simple toolbar button"};var i,n,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  return html\`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-button
        text="\${ifDefined(args.text)}"
        accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        design="\${ifDefined(args.design)}"
        ?disabled="\${ifDefined(args.disabled)}"
        icon="\${ifDefined(args.icon)}"
        ?icon-end="\${ifDefined(args.iconEnd)}"
        tooltip="\${ifDefined(args.tooltip)}"
        width="\${ifDefined(args.width)}"
    ></ui5-toolbar-button>
</ui5-toolbar>\`;
}`,...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const b=["Basic"],m=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,__namedExportsOrder:b,default:c},Symbol.toStringTag,{value:"Module"}));export{m as C,u as c};
