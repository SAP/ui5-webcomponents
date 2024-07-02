import{x as d}from"./lit-element-c5a2b594.js";import{o as r}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";const s={default:{control:{type:"text"},table:{type:{summary:"Array<SideNavigationSubItem>"}}}},p={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-side-navigation-item",showDefaultStoryOnly:!0},l={title:"Fiori/Side Navigation/Side Navigation Item",component:"SideNavigationItem",argTypes:s},g=e=>d`
<ui5-side-navigation>
    <ui5-side-navigation-item
        text="${i(e.text)}"
        icon="${i(e.icon)}"
        ?expanded="${i(e.expanded)}"
        ?disabled="${i(e.disabled)}"
        ?whole-item-toggleable="${i(e.wholeItemToggleable)}"
        href="${i(e.href)}"
        ?selected="${i(e.selected)}"
        target="${i(e.target)}"
    >
        ${r(e.default)}
    </ui5-side-navigation-item>
</ui5-side-navigation>`,t=g.bind({});t.tags=["_hidden_"];t.args={text:"Events",icon:"calendar",expanded:!0,default:'<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>',selected:!0};var n,a,o;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
<ui5-side-navigation>
    <ui5-side-navigation-item
        text="\${ifDefined(args.text)}"
        icon="\${ifDefined(args.icon)}"
        ?expanded="\${ifDefined(args.expanded)}"
        ?disabled="\${ifDefined(args.disabled)}"
        ?whole-item-toggleable="\${ifDefined(args.wholeItemToggleable)}"
        href="\${ifDefined(args.href)}"
        ?selected="\${ifDefined(args.selected)}"
        target="\${ifDefined(args.target)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-side-navigation-item>
</ui5-side-navigation>\`;
}`,...(o=(a=t.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const c=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:c,default:l},Symbol.toStringTag,{value:"Module"}));export{v as C,p as c};
