import{x as i}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as l}from"./unsafe-html-0ddd83da.js";const u={default:{control:{type:"text"},table:{type:{summary:"Array<FormItem>"}}}},d={package:"@ui5/webcomponents",since:"2.0.0",tagName:"ui5-form-group",showDefaultStoryOnly:!0},m={title:"Main/Form/FormGroup",component:"FormGroup",argTypes:u},s=t=>i`
  <ui5-form header-text="Address" layout="S1 M1 L4 XL6">
    <ui5-form-group header-text="${o(t.headerText)}" column-span="${o(t.columnSpan)}">
      ${l(t.default)}
    </ui5-form-group>

    <ui5-form-group header-text="Detail">
        <ui5-form-item>
          <ui5-label slot="labelContent">Street:</ui5-label>
          <span>Main St 1618</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">Country:</ui5-label>
          <span>Germany</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">WebSite:</ui5-label>
          <ui5-link href="sap.com">sap.com</ui5-link>
          </ui5-form-item>
    </ui5-form-group>
  </ui5-form>`,e=s.bind({});e.args={headerText:"Contact",columnSpan:2,default:`
  <ui5-form-item>
    <ui5-label slot="labelContent">Name:</ui5-label>
    <span>Red Point Stores</span>
  </ui5-form-item>

  <ui5-form-item>
        <ui5-label slot="labelContent">Street:</ui5-label>
        <span>Main St 1618</span>
    </ui5-form-item>

  <ui5-form-item>
    <ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
    <span>411 Maintown</span>
  </ui5-form-item>
  `};var n,r,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
  <ui5-form header-text="Address" layout="S1 M1 L4 XL6">
    <ui5-form-group header-text="\${ifDefined(args.headerText)}" column-span="\${ifDefined(args.columnSpan)}">
      \${unsafeHTML(args.default)}
    </ui5-form-group>

    <ui5-form-group header-text="Detail">
        <ui5-form-item>
          <ui5-label slot="labelContent">Street:</ui5-label>
          <span>Main St 1618</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">Country:</ui5-label>
          <span>Germany</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">WebSite:</ui5-label>
          <ui5-link href="sap.com">sap.com</ui5-link>
          </ui5-form-item>
    </ui5-form-group>
  </ui5-form>\`;
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const p=["Basic"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{S as C,d as c};
