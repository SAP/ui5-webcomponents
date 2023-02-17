import{y as n}from"./lit-html.9e2e9691.js";import{D as B}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const h={design:{control:"select",options:["Attention","Default","Emphasized","Negative","Positive","Transparent"]},default:{control:{type:"text"}}},P={package:"@ui5/webcomponents"},o="ui5-toggle-button",E={title:"Main/ToggleButton",component:o,parameters:{docs:{page:B({...P,component:o})}},argTypes:h},t=()=>n`
<h3>ToggleButton States</h3>
    <div class="snippet">
        <ui5-toggle-button class="samples-margin">ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" pressed="">Pressed ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" disabled="">Disabled ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" disabled="" pressed="">Disabled and Pressed ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive">Accept ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive" pressed="">Pressed Accept ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative">Reject ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative" pressed="">Pressed Reject ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Transparent">Transparent ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Pressed Transparent ToggleButton</ui5-toggle-button>
    </div>
`,e=()=>n`
<h3>ToggleButton with Icon</h3>
    <div class="snippet">
        <ui5-toggle-button class="samples-margin" icon="menu">Menu</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Emphasized" icon="add">Add</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Default" icon="nav-back">Back</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive" icon="accept">Accept</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative" icon="sys-cancel">Deny</ui5-toggle-button>
    </div>
`,s=()=>n`
<h3>ToggleButton with Icon Only</h3>
    <div class="snippet">
            <ui5-toggle-button class="samples-margin" icon="away"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="action-settings" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="add"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="alert" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="accept" design="Positive"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="bookmark" design="Positive" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="cancel" design="Negative"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="call" design="Negative" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="camera" design="Transparent"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="cart" design="Transparent" pressed=""></ui5-toggle-button>
    </div>
`,g=()=>n`
<h3>ToggleButton</h3>
    <div class="snippet">
            <ui5-toggle-button class="samples-margin">Yes/No</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" pressed="">Yes/No</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin">Toggle Button</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" pressed="">Toggle Button pressed</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Positive">On/Off</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Positive" pressed="">On/Off</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Negative">Menu</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Negative" pressed="">Menu</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Transparent">Transparent</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Transparent</ui5-toggle-button>
    </div>
`;var i,a,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`() => html\`
<h3>ToggleButton States</h3>
    <div class="snippet">
        <ui5-toggle-button class="samples-margin">ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" pressed="">Pressed ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" disabled="">Disabled ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" disabled="" pressed="">Disabled and Pressed ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive">Accept ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive" pressed="">Pressed Accept ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative">Reject ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative" pressed="">Pressed Reject ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Transparent">Transparent ToggleButton</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Pressed Transparent ToggleButton</ui5-toggle-button>
    </div>
\``,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};var u,r,p;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<h3>ToggleButton with Icon</h3>
    <div class="snippet">
        <ui5-toggle-button class="samples-margin" icon="menu">Menu</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Emphasized" icon="add">Add</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Default" icon="nav-back">Back</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Positive" icon="accept">Accept</ui5-toggle-button>
        <ui5-toggle-button class="samples-margin" design="Negative" icon="sys-cancel">Deny</ui5-toggle-button>
    </div>
\``,...(p=(r=e.parameters)==null?void 0:r.docs)==null?void 0:p.source}}};var c,m,b;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<h3>ToggleButton with Icon Only</h3>
    <div class="snippet">
            <ui5-toggle-button class="samples-margin" icon="away"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="action-settings" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="add"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="alert" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="accept" design="Positive"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="bookmark" design="Positive" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="cancel" design="Negative"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="call" design="Negative" pressed=""></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="camera" design="Transparent"></ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" icon="cart" design="Transparent" pressed=""></ui5-toggle-button>
    </div>
\``,...(b=(m=s.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var d,T,v;g.parameters={...g.parameters,docs:{...(d=g.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>ToggleButton</h3>
    <div class="snippet">
            <ui5-toggle-button class="samples-margin">Yes/No</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" pressed="">Yes/No</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin">Toggle Button</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" pressed="">Toggle Button pressed</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Positive">On/Off</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Positive" pressed="">On/Off</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Negative">Menu</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Negative" pressed="">Menu</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Transparent">Transparent</ui5-toggle-button>
            <ui5-toggle-button class="samples-margin" design="Transparent" pressed="">Transparent</ui5-toggle-button>
    </div>
\``,...(v=(T=g.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};const R=["Template0","Template1","Template2","Template3"];export{t as Template0,e as Template1,s as Template2,g as Template3,R as __namedExportsOrder,E as default};
//# sourceMappingURL=ToggleButton.stories.80c77366.js.map
