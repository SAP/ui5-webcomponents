import{x as r}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as s}from"./unsafe-html-0ddd83da.js";const l={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},$={package:"@ui5/webcomponents",tagName:"ui5-option",showDefaultStoryOnly:!0},c={title:"Main/Select/Option",component:"Option",argTypes:l},p=t=>r`<ui5-select>
   <ui5-option
   additional-text="${o(t.additionalText)}"
   icon="${o(t.icon)}"
   ?selected="${o(t.selected)}"
   value="${o(t.value)}"
   tooltip="${o(t.tooltip)}"
   >${s(t.default)}</ui5-option>
</ui5-select> `,e=p.bind({});e.tags=["_hidden_"];e.args={icon:"laptop",default:"Desktop",selected:!0};var n,i,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`<ui5-select>
   <ui5-option
   additional-text="\${ifDefined(args.additionalText)}"
   icon="\${ifDefined(args.icon)}"
   ?selected="\${ifDefined(args.selected)}"
   value="\${ifDefined(args.value)}"
   tooltip="\${ifDefined(args.tooltip)}"
   >\${unsafeHTML(args.default)}</ui5-option>
</ui5-select> \`;
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const d=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:d,default:c},Symbol.toStringTag,{value:"Module"}));export{g as C,$ as c};
