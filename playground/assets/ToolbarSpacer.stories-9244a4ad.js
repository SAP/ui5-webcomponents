import{x as n}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";const l={overflowPriority:{control:"select",options:["Default","NeverOverflow","AlwaysOverflow"]}},m={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-toolbar-spacer",showDefaultStoryOnly:!0},u={title:"Main/Toolbar/Toolbar Spacer",component:"ToolbarSpacer",argTypes:l},s=a=>n`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
    <ui5-toolbar-spacer width="${i(a.width)}"></ui5-toolbar-spacer>
    <ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>`,t=s.bind({});t.tags=["_hidden_"];t.args={width:"300px"};var o,r,e;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  return html\`
<ui5-toolbar align-content="Start">
    <ui5-toolbar-button text="Simple button 1"></ui5-toolbar-button>
    <ui5-toolbar-spacer width="\${ifDefined(args.width)}"></ui5-toolbar-spacer>
    <ui5-toolbar-button text="Simple button 2"></ui5-toolbar-button>
</ui5-toolbar>\`;
}`,...(e=(r=t.parameters)==null?void 0:r.docs)==null?void 0:e.source}}};const b=["Basic"],d=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:b,default:u},Symbol.toStringTag,{value:"Module"}));export{d as C,m as c};
