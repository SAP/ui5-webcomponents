import{x as l}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";import{o as s}from"./unsafe-html-0ddd83da.js";const c={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},f={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-toolbar-select-option",showDefaultStoryOnly:!0},i={title:"Main/Toolbar/Toolbar Select Option",component:"ToolbarSelectOption",argTypes:c},u=t=>l`
    <ui5-toolbar align-content="Start">
    <ui5-toolbar-select>
        <ui5-toolbar-select-option ?selected=${n(t.selected)}>${s(t.default)}</ui5-toolbar-select-option>
    </ui5-toolbar-select>
</ui5-toolbar>`,o=u.bind({});o.tags=["_hidden_"];o.args={default:"Toolbar select option 1"};var e,r,a;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`args => {
  return html\`
    <ui5-toolbar align-content="Start">
    <ui5-toolbar-select>
        <ui5-toolbar-select-option ?selected=\${ifDefined(args.selected)}>\${unsafeHTML(args.default)}</ui5-toolbar-select-option>
    </ui5-toolbar-select>
</ui5-toolbar>\`;
}`,...(a=(r=o.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const p=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,__namedExportsOrder:p,default:i},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
