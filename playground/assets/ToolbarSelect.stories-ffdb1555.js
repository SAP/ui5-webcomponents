import{x as n}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as s}from"./unsafe-html-0ddd83da.js";const i={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},overflowPriority:{control:"select",options:["Default","NeverOverflow","AlwaysOverflow"]},default:{control:{type:"text"},table:{type:{summary:"Array<ToolbarSelectOption>"}}},change:{description:"Fired when the selected option changes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"selectedOption",_ui5privacy:"public",description:"the selected option."}]}}},f={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-toolbar-select",showDefaultStoryOnly:!0},c={title:"Main/Toolbar/Toolbar Select",component:"ToolbarSelect",argTypes:i},u=t=>n`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-select
        accessible-name="${o(t.accessibleName)}"
        accessible-name-ref="${o(t.accessibleNameRef)}"
        ?disabled="${o(t.disabled)}"
        value-state="${o(t.valueState)}"
        width="${o(t.width)}"
    >
        ${s(t.default)}
    </ui5-toolbar-select>
</ui5-toolbar>`,e=u.bind({});e.tags=["_hidden_"];e.args={default:`<ui5-toolbar-select-option>Toolbar select option 1</ui5-toolbar-select-option>
<ui5-toolbar-select-option>Toolbar select option 2</ui5-toolbar-select-option>`};var a,l,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-select
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        ?disabled="\${ifDefined(args.disabled)}"
        value-state="\${ifDefined(args.valueState)}"
        width="\${ifDefined(args.width)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-toolbar-select>
</ui5-toolbar>\`;
}`,...(r=(l=e.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};const b=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:b,default:c},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
