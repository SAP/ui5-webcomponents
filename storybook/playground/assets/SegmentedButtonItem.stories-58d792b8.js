import{x as s}from"./lit-element-c5a2b594.js";import{o as u}from"./unsafe-html-0ddd83da.js";import{l as n}from"./if-defined-c29cffe1.js";const d={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},p={package:"@ui5/webcomponents",tagName:"ui5-segmented-button-item",showDefaultStoryOnly:!0},r={title:"Main/Segmented Button/Segmented Button Item",component:"SegmentedButtonItem",argTypes:d},a=t=>s`
<ui5-segmented-button>
    <ui5-segmented-button-item>Map</ui5-segmented-button-item>
    <ui5-segmented-button-item
        ?selected="${n(t.selected)}"
        ?disabled="${n(t.disabled)}"
        icon="${n(t.icon)}"
        tooltip="${n(t.tooltip)}"
    >${u(t.default)}</ui5-segmented-button-item>
    <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
</ui5-segmented-button>`,e=a.bind({});e.tags=["_hidden_"];e.args={default:"Current item",selected:!0};var o,i,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`
<ui5-segmented-button>
    <ui5-segmented-button-item>Map</ui5-segmented-button-item>
    <ui5-segmented-button-item
        ?selected="\${ifDefined(args.selected)}"
        ?disabled="\${ifDefined(args.disabled)}"
        icon="\${ifDefined(args.icon)}"
        tooltip="\${ifDefined(args.tooltip)}"
    >\${unsafeHTML(args.default)}</ui5-segmented-button-item>
    <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
</ui5-segmented-button>\``,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const c=["Basic"],f=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:c,default:r},Symbol.toStringTag,{value:"Module"}));export{f as C,p as c};
