import{x as r}from"./lit-element-c5a2b594.js";import{l as e}from"./if-defined-c29cffe1.js";import{o as n}from"./unsafe-html-0ddd83da.js";const d={additionalTextState:{control:"select",options:["None","Success","Warning","Error","Information"]},type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Success","Warning","Error","Information"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},imageContent:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},$={package:"@ui5/webcomponents",tagName:"ui5-li",showDefaultStoryOnly:!0},c={title:"Main/List/Standard List Item",component:"StandardListItem",argTypes:d},l=t=>r` <ui5-list>
  <ui5-li
    icon="${e(t.icon)}"
    description="${e(t.description)}"
    additional-text="${e(t.additionalText)}"
    additional-text-state="${e(t.additionalTextState)}"
    accessible-name="${e(t.accessibleName)}"
    ?icon-end="${e(t.iconEnd)}"
    image="${e(t.image)}"
    accessibility-attributes="${e(t.accessibilityAttributes)}"
    ?navigated="${e(t.navigated)}"
    type="${e(t.type)}"
    ?selected="${e(t.selected)}"
    tooltip="${e(t.tooltip)}"
  >
    ${n(t.default)}
    ${n(t.imageContent)}
    ${n(t.deleteButton)}
  </ui5-li>
  </ui5-list>`,i=l.bind({});i.tags=["_hidden_"];i.args={default:"Pineapple",icon:"nutrition-activity",description:"Tropical plant with an edible fruit",additionalText:"In-stock",additionalTextState:"Success"};var a,o,s;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\` <ui5-list>
  <ui5-li
    icon="\${ifDefined(args.icon)}"
    description="\${ifDefined(args.description)}"
    additional-text="\${ifDefined(args.additionalText)}"
    additional-text-state="\${ifDefined(args.additionalTextState)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?icon-end="\${ifDefined(args.iconEnd)}"
    image="\${ifDefined(args.image)}"
    accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
    ?navigated="\${ifDefined(args.navigated)}"
    type="\${ifDefined(args.type)}"
    ?selected="\${ifDefined(args.selected)}"
    tooltip="\${ifDefined(args.tooltip)}"
  >
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.imageContent)}
    \${unsafeHTML(args.deleteButton)}
  </ui5-li>
  </ui5-list>\`;
}`,...(s=(o=i.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const p=["Basic"],y=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{y as C,$ as c};
