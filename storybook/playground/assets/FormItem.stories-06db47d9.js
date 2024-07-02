import{x as r}from"./lit-element-c5a2b594.js";import{o as n}from"./unsafe-html-0ddd83da.js";const i={labelContent:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},b={package:"@ui5/webcomponents",since:"2.0.0",tagName:"ui5-form-item",showDefaultStoryOnly:!0},m={title:"Main/Form/FormItem",component:"FormItem",argTypes:i},s=t=>r`<ui5-form>
    <ui5-form-item>
      ${n(t.labelContent)}
      ${n(t.default)}
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
      <span>411 Maintown</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Street:</ui5-label>
      <span>Main St 1618</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Country:</ui5-label>
      <span>Germany</span>
    </ui5-form-item>
  </ui5-form>`,e=s.bind({});e.args={labelContent:'<ui5-label slot="labelContent">Name:</ui5-label>',default:"<span>Red Point Stores</span>"};var o,a,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  return html\`<ui5-form>
    <ui5-form-item>
      \${unsafeHTML(args.labelContent)}
      \${unsafeHTML(args.default)}
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
      <span>411 Maintown</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Street:</ui5-label>
      <span>Main St 1618</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Country:</ui5-label>
      <span>Germany</span>
    </ui5-form-item>
  </ui5-form>\`;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const u=["Basic"],c=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:u,default:m},Symbol.toStringTag,{value:"Module"}));export{c as C,b as c};
