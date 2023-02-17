import{y as s}from"./lit-html.9e2e9691.js";import{D as v}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const A={design:{control:"select",options:["Attention","Default","Emphasized","Negative","Positive","Transparent"]},default:{control:{type:"text"}}},f={package:"@ui5/webcomponents"},t="ui5-button",I={title:"Main/Button",component:t,parameters:{docs:{page:v({...f,component:t})}},argTypes:A},e=()=>s`
<h3>Basic Button</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" design="Default">Default</ui5-button>
        <ui5-button class="samples-margin" disabled="">Disabled</ui5-button>
        <ui5-button class="samples-margin" design="Transparent">Cancel</ui5-button>
        <ui5-button class="samples-margin" design="Positive">Approve</ui5-button>
        <ui5-button class="samples-margin" design="Negative">Decline</ui5-button>
        <ui5-button class="samples-margin" design="Attention">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Emphasized">Subscribe</ui5-button>
    </div>
`,i=()=>s`
<h3>Button with Icon</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" icon="employee">Add</ui5-button>
        <ui5-button class="samples-margin" icon="download" icon-end="">Download</ui5-button>
        <ui5-button class="samples-margin" design="Positive" icon="add">Add</ui5-button>
        <ui5-button class="samples-margin" design="Negative" icon="delete">Remove</ui5-button>
        <ui5-button class="samples-margin" design="Attention" icon="message-warning">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Transparent" icon="accept">Accept</ui5-button>
    </div>
`,n=()=>s`
<h3>Icon Only Button</h3>
    <div class="snippet">
            <ui5-label style="display:none;" id="lblAdd" aria-hidden="true">Add</ui5-label>
            <ui5-label style="display:none;" id="lblAlert" aria-hidden="true">Alert</ui5-label>
            <ui5-label style="display:none;" id="lblAway" aria-hidden="true">Away</ui5-label>
            <ui5-label style="display:none;" id="lblAccept" aria-hidden="true">Accept</ui5-label>
            <ui5-label style="display:none;" id="lblBookmark" aria-hidden="true">Bookmark</ui5-label>
            <ui5-label style="display:none;" id="lblCamera" aria-hidden="true">Camera</ui5-label>
            <ui5-label style="display:none;" id="lblCall" aria-hidden="true">Call</ui5-label>
            <ui5-label style="display:none;" id="lblCart" aria-hidden="true">Cart</ui5-label>
            <ui5-label style="display:none;" id="lblCancel" aria-hidden="true">Cancel</ui5-label>
            <ui5-label style="display:none;" id="lblSettings" aria-hidden="true">Settings</ui5-label>
            <ui5-button class="samples-margin" icon="away" accessible-name-ref="lblAway"></ui5-button>
            <ui5-button class="samples-margin" icon="action-settings" accessible-name-ref="lblSettings"></ui5-button>
            <ui5-button class="samples-margin" icon="add" accessible-name-ref="lblAdd"></ui5-button>
            <ui5-button class="samples-margin" icon="alert" accessible-name-ref="lblAlert"></ui5-button>
            <ui5-button class="samples-margin" icon="accept" design="Positive" accessible-name-ref="lblAccept"></ui5-button>
            <ui5-button class="samples-margin" icon="bookmark" design="Positive" accessible-name-ref="lblBookmark"></ui5-button>
            <ui5-button class="samples-margin" icon="cancel" design="Negative" accessible-name-ref="lblCancel"></ui5-button>
            <ui5-button class="samples-margin" icon="call" design="Negative" accessible-name-ref="lblCall"></ui5-button>
            <ui5-button class="samples-margin" icon="camera" design="Transparent" accessible-name-ref="lblCamera"></ui5-button>
            <ui5-button class="samples-margin" icon="cart" design="Transparent" accessible-name-ref="lblCart"></ui5-button>
    </div>
`,a=()=>s`
<h3>Button with Design</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" design="Emphasized">Submit</ui5-button>
        <ui5-button class="samples-margin" design="Positive">Agree</ui5-button>
        <ui5-button class="samples-margin" design="Negative">Decline</ui5-button>
        <ui5-button class="samples-margin" design="Default">Default</ui5-button>
        <ui5-button class="samples-margin" design="Attention">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Transparent">Transparent</ui5-button>
    </div>
`;var l,u,o;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`() => html\`
<h3>Basic Button</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" design="Default">Default</ui5-button>
        <ui5-button class="samples-margin" disabled="">Disabled</ui5-button>
        <ui5-button class="samples-margin" design="Transparent">Cancel</ui5-button>
        <ui5-button class="samples-margin" design="Positive">Approve</ui5-button>
        <ui5-button class="samples-margin" design="Negative">Decline</ui5-button>
        <ui5-button class="samples-margin" design="Attention">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Emphasized">Subscribe</ui5-button>
    </div>
\``,...(o=(u=e.parameters)==null?void 0:u.docs)==null?void 0:o.source}}};var r,c,b;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Button with Icon</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" icon="employee">Add</ui5-button>
        <ui5-button class="samples-margin" icon="download" icon-end="">Download</ui5-button>
        <ui5-button class="samples-margin" design="Positive" icon="add">Add</ui5-button>
        <ui5-button class="samples-margin" design="Negative" icon="delete">Remove</ui5-button>
        <ui5-button class="samples-margin" design="Attention" icon="message-warning">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Transparent" icon="accept">Accept</ui5-button>
    </div>
\``,...(b=(c=i.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var m,d,p;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => html\`
<h3>Icon Only Button</h3>
    <div class="snippet">
            <ui5-label style="display:none;" id="lblAdd" aria-hidden="true">Add</ui5-label>
            <ui5-label style="display:none;" id="lblAlert" aria-hidden="true">Alert</ui5-label>
            <ui5-label style="display:none;" id="lblAway" aria-hidden="true">Away</ui5-label>
            <ui5-label style="display:none;" id="lblAccept" aria-hidden="true">Accept</ui5-label>
            <ui5-label style="display:none;" id="lblBookmark" aria-hidden="true">Bookmark</ui5-label>
            <ui5-label style="display:none;" id="lblCamera" aria-hidden="true">Camera</ui5-label>
            <ui5-label style="display:none;" id="lblCall" aria-hidden="true">Call</ui5-label>
            <ui5-label style="display:none;" id="lblCart" aria-hidden="true">Cart</ui5-label>
            <ui5-label style="display:none;" id="lblCancel" aria-hidden="true">Cancel</ui5-label>
            <ui5-label style="display:none;" id="lblSettings" aria-hidden="true">Settings</ui5-label>
            <ui5-button class="samples-margin" icon="away" accessible-name-ref="lblAway"></ui5-button>
            <ui5-button class="samples-margin" icon="action-settings" accessible-name-ref="lblSettings"></ui5-button>
            <ui5-button class="samples-margin" icon="add" accessible-name-ref="lblAdd"></ui5-button>
            <ui5-button class="samples-margin" icon="alert" accessible-name-ref="lblAlert"></ui5-button>
            <ui5-button class="samples-margin" icon="accept" design="Positive" accessible-name-ref="lblAccept"></ui5-button>
            <ui5-button class="samples-margin" icon="bookmark" design="Positive" accessible-name-ref="lblBookmark"></ui5-button>
            <ui5-button class="samples-margin" icon="cancel" design="Negative" accessible-name-ref="lblCancel"></ui5-button>
            <ui5-button class="samples-margin" icon="call" design="Negative" accessible-name-ref="lblCall"></ui5-button>
            <ui5-button class="samples-margin" icon="camera" design="Transparent" accessible-name-ref="lblCamera"></ui5-button>
            <ui5-button class="samples-margin" icon="cart" design="Transparent" accessible-name-ref="lblCart"></ui5-button>
    </div>
\``,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,y,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>Button with Design</h3>
    <div class="snippet">
        <ui5-button class="samples-margin" design="Emphasized">Submit</ui5-button>
        <ui5-button class="samples-margin" design="Positive">Agree</ui5-button>
        <ui5-button class="samples-margin" design="Negative">Decline</ui5-button>
        <ui5-button class="samples-margin" design="Default">Default</ui5-button>
        <ui5-button class="samples-margin" design="Attention">Warning</ui5-button>
        <ui5-button class="samples-margin" design="Transparent">Transparent</ui5-button>
    </div>
\``,...(h=(y=a.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const x=["Template0","Template1","Template2","Template3"];export{e as Template0,i as Template1,n as Template2,a as Template3,x as __namedExportsOrder,I as default};
//# sourceMappingURL=Button.stories.b26d2aa2.js.map
