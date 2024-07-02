import{x as p}from"./lit-element-c5a2b594.js";import{o as f}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";import{B as s}from"./ButtonDesign-57d82709.js";const m={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]},type:{control:"select",options:["Button","Submit","Reset"]},accessibleRole:{control:"select",options:["Button","Link"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},S={package:"@ui5/webcomponents",tagName:"ui5-toggle-button"},b={title:"Main/ToggleButton",component:"ToggleButton",argTypes:m},g=t=>p`<ui5-toggle-button
    ?pressed="${i(t.pressed)}"
    ?disabled="${i(t.disabled)}"
    design="${i(t.design)}"
    icon="${i(t.icon)}"
>
    ${f(t.default)}
</ui5-toggle-button>`,o=g.bind({});o.args={default:"Default"};const n=g.bind({});n.decorators=[(t,{args:e})=>p`
${t({args:{...e,design:e.design||s.Default,icon:e.icon||"paper-plane",default:e.default||"Sent"}})}
${t({args:{...e,design:e.design||s.Default,icon:e.icon||"email-read",default:e.default||"Received"}})}
${t({args:{...e,design:e.design||s.Transparent,icon:e.icon||"italic-text",tooltip:e.tooltip||"Italic"}})}
${t({args:{...e,design:e.design||s.Transparent,icon:e.icon||"bold-text",tooltip:e.tooltip||"Bold"}})}`];var a,d,l;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:'args => html`<ui5-toggle-button\n    ?pressed="${ifDefined(args.pressed)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    design="${ifDefined(args.design)}"\n    icon="${ifDefined(args.icon)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-toggle-button>`',...(l=(d=o.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var r,c,u;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:'args => html`<ui5-toggle-button\n    ?pressed="${ifDefined(args.pressed)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    design="${ifDefined(args.design)}"\n    icon="${ifDefined(args.icon)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-toggle-button>`',...(u=(c=n.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const $=["Basic","Examples"],_=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,Examples:n,__namedExportsOrder:$,default:b},Symbol.toStringTag,{value:"Module"}));export{_ as C,S as c};
