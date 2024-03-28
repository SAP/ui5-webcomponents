import{x as i}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as a}from"./unsafe-html-0ddd83da.js";const c={closeIcon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}}},y={package:"@ui5/webcomponents",since:"1.0.0-rc.9",tagName:"ui5-token",showDefaultStoryOnly:!0},l={title:"Main/Multi Input/Token",component:"Token",argTypes:c},u=t=>i`
<ui5-multi-input>
    <ui5-token
        slot="tokens"
        text="${o(t.text)}"
        ?selected="${o(t.selected)}"
        ?readonly="${o(t.readonly)}"
    >
    ${a(t.closeIcon)}
    </ui5-token>
</ui5-multi-input>`,e=u.bind({});e.tags=["_hidden_"];e.args={text:"Argentina"};var n,r,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => html\`
<ui5-multi-input>
    <ui5-token
        slot="tokens"
        text="\${ifDefined(args.text)}"
        ?selected="\${ifDefined(args.selected)}"
        ?readonly="\${ifDefined(args.readonly)}"
    >
    \${unsafeHTML(args.closeIcon)}
    </ui5-token>
</ui5-multi-input>\``,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const m=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{g as C,y as c};
