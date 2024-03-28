import{x as c}from"./lit-element-c5a2b594.js";import{l as m}from"./if-defined-c29cffe1.js";const a={},x={package:"@ui5/webcomponents",since:"1.0.0-rc.15",tagName:"ui5-cb-group-item",showDefaultStoryOnly:!0},u={title:"Main/Combo Box/Combo Box Group Item",component:"ComboBoxGroupItem",argTypes:a},s=r=>c`<ui5-combobox placeholder="Group item showcase">
    <ui5-cb-group-item text="${m(r.text)}"></ui5-cb-group-item>
    <ui5-cb-item text="Canada"></ui5-cb-item>
    <ui5-cb-item text="Chile"></ui5-cb-item>
</ui5-combobox>`,e=s.bind({});e.tags=["_hidden_"];e.args={text:"My group 1"};var o,t,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`<ui5-combobox placeholder="Group item showcase">
    <ui5-cb-group-item text="\${ifDefined(args.text)}"></ui5-cb-group-item>
    <ui5-cb-item text="Canada"></ui5-cb-item>
    <ui5-cb-item text="Chile"></ui5-cb-item>
</ui5-combobox>\``,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const n=["Basic"],l=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:n,default:u},Symbol.toStringTag,{value:"Module"}));export{l as C,x as c};
