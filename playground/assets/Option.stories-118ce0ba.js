import{x as s}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as r}from"./unsafe-html-0ddd83da.js";const d={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},$={package:"@ui5/webcomponents",tagName:"ui5-option",showDefaultStoryOnly:!0},l={title:"Main/Select/Option",component:"Option",argTypes:d},c=t=>s`<ui5-select>
   <ui5-option
   additional-text="${o(t.additionalText)}"
   ?disabled="${o(t.disabled)}"
   icon="${o(t.icon)}"
   ?selected="${o(t.selected)}"
   value="${o(t.value)}"
   >${r(t.default)}</ui5-option>
</ui5-select> `,e=c.bind({});e.tags=["_hidden_"];e.args={icon:"laptop",default:"Desktop",selected:!0};var n,i,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`<ui5-select>
   <ui5-option
   additional-text="\${ifDefined(args.additionalText)}"
   ?disabled="\${ifDefined(args.disabled)}"
   icon="\${ifDefined(args.icon)}"
   ?selected="\${ifDefined(args.selected)}"
   value="\${ifDefined(args.value)}"
   >\${unsafeHTML(args.default)}</ui5-option>
</ui5-select> \`;
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const u=["Basic"],b=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:u,default:l},Symbol.toStringTag,{value:"Module"}));export{b as C,$ as c};
