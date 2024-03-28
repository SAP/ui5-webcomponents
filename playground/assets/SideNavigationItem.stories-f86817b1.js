import{x as r}from"./lit-element-c5a2b594.js";import{o as d}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const s={default:{control:{type:"text"},table:{type:{summary:"Array<SideNavigationSubItem>"}}}},p={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-side-navigation-item",showDefaultStoryOnly:!0},g={title:"Fiori/Side Navigation/Side Navigation Item",component:"SideNavigationItem",argTypes:s},l=e=>r`
<ui5-side-navigation>
    <ui5-side-navigation-item
        text="${t(e.text)}"
        icon="${t(e.icon)}"
        ?expanded="${t(e.expanded)}"
        ?whole-item-toggleable="${t(e.wholeItemToggleable)}"
        href="${t(e.href)}"
        ?selected="${t(e.selected)}"
        target="${t(e.target)}"
    >
        ${d(e.default)}
    </ui5-side-navigation-item>
</ui5-side-navigation>`,i=l.bind({});i.tags=["_hidden_"];i.args={text:"Events",icon:"calendar",expanded:!0,default:'<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>',selected:!0};var n,a,o;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
<ui5-side-navigation>
    <ui5-side-navigation-item
        text="\${ifDefined(args.text)}"
        icon="\${ifDefined(args.icon)}"
        ?expanded="\${ifDefined(args.expanded)}"
        ?whole-item-toggleable="\${ifDefined(args.wholeItemToggleable)}"
        href="\${ifDefined(args.href)}"
        ?selected="\${ifDefined(args.selected)}"
        target="\${ifDefined(args.target)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-side-navigation-item>
</ui5-side-navigation>\`;
}`,...(o=(a=i.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const c=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:c,default:g},Symbol.toStringTag,{value:"Module"}));export{v as C,p as c};
