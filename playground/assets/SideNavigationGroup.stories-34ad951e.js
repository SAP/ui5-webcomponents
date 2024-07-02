import{x as r}from"./lit-element-c5a2b594.js";import{o as d}from"./unsafe-html-0ddd83da.js";import{l as t}from"./if-defined-c29cffe1.js";const s={default:{control:{type:"text"},table:{type:{summary:"Array<SideNavigationItem>"}}}},f={package:"@ui5/webcomponents-fiori",since:"1.24.0",tagName:"ui5-side-navigation-group",showDefaultStoryOnly:!0},u={title:"Fiori/Side Navigation/Side Navigation Group",component:"SideNavigationGroup",argTypes:s},p=i=>r`
<ui5-side-navigation>
    <ui5-side-navigation-group
        text="${t(i.text)}"
        ?expanded="${t(i.expanded)}"
        ?disabled="${t(i.disabled)}"
    >
        ${d(i.default)}
    </ui5-side-navigation-group>
</ui5-side-navigation>`,e=p.bind({});e.tags=["_hidden_"];e.args={text:"Group",expanded:!0,disabled:!1,default:'<ui5-side-navigation-item text="Item"></ui5-side-navigation-item>'};var a,n,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`
<ui5-side-navigation>
    <ui5-side-navigation-group
        text="\${ifDefined(args.text)}"
        ?expanded="\${ifDefined(args.expanded)}"
        ?disabled="\${ifDefined(args.disabled)}"
    >
        \${unsafeHTML(args.default)}
    </ui5-side-navigation-group>
</ui5-side-navigation>\`;
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const g=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:g,default:u},Symbol.toStringTag,{value:"Module"}));export{v as C,f as c};
