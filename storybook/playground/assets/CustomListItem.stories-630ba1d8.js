import{x as l}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o}from"./unsafe-html-0ddd83da.js";const r={type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Success","Warning","Error","Information"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},f={package:"@ui5/webcomponents",tagName:"ui5-li-custom",showDefaultStoryOnly:!0},u={title:"Main/List/Custom List Item",component:"CustomListItem",argTypes:r},c=t=>l` <ui5-list>
    <ui5-li-custom
      accessible-name="${i(t.accessibleName)}"
      accessibility-attributes="${i(t.accessibilityAttributes)}"
      ?navigated="${i(t.navigated)}"
      type="${i(t.type)}"
      ?selected="${i(t.selected)}"
      tooltip="${i(t.tooltip)}"
    >
      ${o(t.default)}
      ${o(t.deleteButton)}
    </ui5-li-custom>
  </ui5-list>`,e=c.bind({});e.tags=["_hidden_"];e.args={default:`<ui5-button>Click me</ui5-button>
  <ui5-link href="https://www.google.bg" target="_blank">UI5 link</ui5-link>
  <ui5-radio-button text="Option B" disabled="disabled"></ui5-radio-button>
  <ui5-button>Click me</ui5-button>`};var s,n,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  return html\` <ui5-list>
    <ui5-li-custom
      accessible-name="\${ifDefined(args.accessibleName)}"
      accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
      ?navigated="\${ifDefined(args.navigated)}"
      type="\${ifDefined(args.type)}"
      ?selected="\${ifDefined(args.selected)}"
      tooltip="\${ifDefined(args.tooltip)}"
    >
      \${unsafeHTML(args.default)}
      \${unsafeHTML(args.deleteButton)}
    </ui5-li-custom>
  </ui5-list>\`;
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const m=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:m,default:u},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
