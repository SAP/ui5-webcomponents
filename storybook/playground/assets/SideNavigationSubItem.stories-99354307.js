import{x as s}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";const d={},l={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-side-navigation-sub-item",showDefaultStoryOnly:!0},r={title:"Fiori/Side Navigation/Side Navigation Sub Item",component:"SideNavigationSubItem",argTypes:d},c=i=>s`
    <ui5-side-navigation>
    <ui5-side-navigation-item text="Events" icon="calendar" expanded>
        <ui5-side-navigation-sub-item
            text="${t(i.text)}"
            href="${t(i.href)}"
            ?selected="${t(i.selected)}"
            ?disabled="${t(i.disabled)}"
            target="${t(i.target)}"
        ></ui5-side-navigation-sub-item>
    </ui5-side-navigation-item>
</ui5-side-navigation>`,e=c.bind({});e.tags=["_hidden_"];e.args={text:"Local",selected:!0};var n,a,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
    <ui5-side-navigation>
    <ui5-side-navigation-item text="Events" icon="calendar" expanded>
        <ui5-side-navigation-sub-item
            text="\${ifDefined(args.text)}"
            href="\${ifDefined(args.href)}"
            ?selected="\${ifDefined(args.selected)}"
            ?disabled="\${ifDefined(args.disabled)}"
            target="\${ifDefined(args.target)}"
        ></ui5-side-navigation-sub-item>
    </ui5-side-navigation-item>
</ui5-side-navigation>\`;
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const u=["Basic"],f=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:u,default:r},Symbol.toStringTag,{value:"Module"}));export{f as C,l as c};
