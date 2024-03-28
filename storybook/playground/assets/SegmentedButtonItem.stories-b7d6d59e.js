import{x as a}from"./lit-element-c5a2b594.js";import{o as m}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const d={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]},type:{control:"select",options:["Button","Submit","Reset"]},accessibleRole:{control:"select",options:["Button","Link"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},f={package:"@ui5/webcomponents",tagName:"ui5-segmented-button-item",showDefaultStoryOnly:!0},u={title:"Main/Segmented Button/Segmented Button Item",component:"SegmentedButtonItem",argTypes:d},c=e=>a`
<ui5-segmented-button>
    <ui5-segmented-button-item>Map</ui5-segmented-button-item>
    <ui5-segmented-button-item
        design="${t(e.design)}"
        ?icon-end="${t(e.iconEnd)}"
        ?submits="${t(e.submits)}"
        ?pressed="${t(e.pressed)}"
        accessibility-attributes="${t(e.accessibilityAttributes)}"
        accessible-name="${t(e.accessibleName)}"
        accessible-name-ref="${t(e.accessibleNameRef)}"
        ?disabled="${t(e.disabled)}"
        icon="${t(e.icon)}"
        tooltip="${t(e.tooltip)}"
        type="${t(e.type)}"
    >${m(e.default)}</ui5-segmented-button-item>
    <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
</ui5-segmented-button>`,n=c.bind({});n.tags=["_hidden_"];n.args={default:"Current item",pressed:!0};var i,s,o;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => html\`
<ui5-segmented-button>
    <ui5-segmented-button-item>Map</ui5-segmented-button-item>
    <ui5-segmented-button-item
        design="\${ifDefined(args.design)}"
        ?icon-end="\${ifDefined(args.iconEnd)}"
        ?submits="\${ifDefined(args.submits)}"
        ?pressed="\${ifDefined(args.pressed)}"
        accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        ?disabled="\${ifDefined(args.disabled)}"
        icon="\${ifDefined(args.icon)}"
        tooltip="\${ifDefined(args.tooltip)}"
        type="\${ifDefined(args.type)}"
    >\${unsafeHTML(args.default)}</ui5-segmented-button-item>
    <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
</ui5-segmented-button>\``,...(o=(s=n.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const r=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,__namedExportsOrder:r,default:u},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
