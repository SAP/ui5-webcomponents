import{x as n}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";const s={},l={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.5",tagName:"ui5-product-switch-item",showDefaultStoryOnly:!0},a={title:"Fiori/Product Switch/Product Switch Item",component:"ProductSwitchItem",argTypes:s},u=e=>n`
<ui5-product-switch>
    <ui5-product-switch-item
        title-text="${i(e.titleText)}"
        subtitle-text="${i(e.subtitleText)}"
        icon="${i(e.icon)}"
        target="${i(e.target)}"
        targetSrc="${i(e.targetSrc)}"
    ></ui5-product-switch-item>
</ui5-product-switch>
`,t=u.bind({});t.tags=["_hidden_"];t.args={titleText:"Home",subtitleText:"Central Home",icon:"home"};var o,r,c;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`args => html\`
<ui5-product-switch>
    <ui5-product-switch-item
        title-text="\${ifDefined(args.titleText)}"
        subtitle-text="\${ifDefined(args.subtitleText)}"
        icon="\${ifDefined(args.icon)}"
        target="\${ifDefined(args.target)}"
        targetSrc="\${ifDefined(args.targetSrc)}"
    ></ui5-product-switch-item>
</ui5-product-switch>
\``,...(c=(r=t.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};const d=["Basic"],f=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:d,default:a},Symbol.toStringTag,{value:"Module"}));export{f as C,l as c};
