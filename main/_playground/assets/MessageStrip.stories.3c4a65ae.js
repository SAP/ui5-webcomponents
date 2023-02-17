import{y as s}from"./lit-html.9e2e9691.js";import{D as x}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const C={design:{control:"select",options:["Information","Negative","Positive","Warning"]},default:{control:{type:"text"}},icon:{control:{type:"text"}}},P={package:"@ui5/webcomponents",since:"0.9.0"};var r=Object.freeze,q=Object.defineProperty,B=(o,I)=>r(q(o,"raw",{value:r(I||o.slice())})),m;const p="ui5-message-strip",U={title:"Main/MessageStrip",component:p,parameters:{docs:{page:x({...P,component:p})}},argTypes:C},i=()=>s`
<h3>MessageStrip</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information">Information MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive">Positive MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative">Negative MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning">Warning MessageStrip</ui5-message-strip>
    </div>
`,t=()=>s`
<h3>MessageStrip With No Close Button</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information" hide-close-button="">Information MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive" hide-close-button="">Positive MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative" hide-close-button="">Negative MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning" hide-close-button="">Warning MessageStrip With No Close Button</ui5-message-strip>
    </div>
`,n=()=>s`
<h3>MessageStrip With No Icon</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information" hide-icon="">Information MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive" hide-icon="">Positive MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative" hide-icon="">Negative MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning" hide-icon="">Warning MessageStrip With No Icon</ui5-message-strip>
    </div>
`,e=()=>s(m||(m=B([`
<h3>Dynamic Message Strip Generator</h3>
    <div class="snippet">
        <div class="wrapper">
            <ui5-button id="button1">Generate MessageStrip</ui5-button>
        </div>
        <script>
            const container = document.querySelector(".wrapper");
            const button =  document.querySelector("#button1");
            button.addEventListener("click", function(event) {
                let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
                const messageStrip = document.querySelector("#msgStrip");
                const types = ["Information", "Warning", "Negative", "Positive"];
                const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
                let type = types[Math.round(Math.random() * 3)];
                if (messageStrip) {
                    container.removeChild(messageStrip);
                }
                let generatedMsgStrip = document.createElement("ui5-message-strip");
                generatedMsgStrip.id = "msgStrip";
                generatedMsgStrip.design = type;
                generatedMsgStrip.textContent = text;
                invisibleMessage.announce(\`New Information Bar of type \${type} \${text}\`, "Assertive");
                container.appendChild(generatedMsgStrip);
            });
        <\/script>
    </div>
`],[`
<h3>Dynamic Message Strip Generator</h3>
    <div class="snippet">
        <div class="wrapper">
            <ui5-button id="button1">Generate MessageStrip</ui5-button>
        </div>
        <script>
            const container = document.querySelector(".wrapper");
            const button =  document.querySelector("#button1");
            button.addEventListener("click", function(event) {
                let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
                const messageStrip = document.querySelector("#msgStrip");
                const types = ["Information", "Warning", "Negative", "Positive"];
                const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
                let type = types[Math.round(Math.random() * 3)];
                if (messageStrip) {
                    container.removeChild(messageStrip);
                }
                let generatedMsgStrip = document.createElement("ui5-message-strip");
                generatedMsgStrip.id = "msgStrip";
                generatedMsgStrip.design = type;
                generatedMsgStrip.textContent = text;
                invisibleMessage.announce(\\\`New Information Bar of type \\\${type} \\\${text}\\\`, "Assertive");
                container.appendChild(generatedMsgStrip);
            });
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};const a=()=>s`
<h3>Custom MessageStrip</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Information" hide-icon="" hide-close-button="">You have new message.</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive" hide-close-button="">Successfull login!</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Negative" hide-icon="">Access denied!</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning">Update is required.</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning"><ui5-icon name="palette" slot="icon"></ui5-icon>Custom icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive"><img src="../assets/images/loading.gif" width="16" height="16" slot="icon">Custom animated gif</ui5-message-strip>
    </div>
`;var g,l,c;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>MessageStrip</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information">Information MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive">Positive MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative">Negative MessageStrip</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning">Warning MessageStrip</ui5-message-strip>
    </div>
\``,...(c=(l=i.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,u,v;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>MessageStrip With No Close Button</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information" hide-close-button="">Information MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive" hide-close-button="">Positive MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative" hide-close-button="">Negative MessageStrip With No Close Button</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning" hide-close-button="">Warning MessageStrip With No Close Button</ui5-message-strip>
    </div>
\``,...(v=(u=t.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var h,b,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>MessageStrip With No Icon</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom" design="Information" hide-icon="">Information MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Positive" hide-icon="">Positive MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Negative" hide-icon="">Negative MessageStrip With No Icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom" design="Warning" hide-icon="">Warning MessageStrip With No Icon</ui5-message-strip>
    </div>
\``,...(S=(b=n.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var M,y,f;e.parameters={...e.parameters,docs:{...(M=e.parameters)==null?void 0:M.docs,source:{originalSource:`() => html\`
<h3>Dynamic Message Strip Generator</h3>
    <div class="snippet">
        <div class="wrapper">
            <ui5-button id="button1">Generate MessageStrip</ui5-button>
        </div>
        <script>
            const container = document.querySelector(".wrapper");
            const button =  document.querySelector("#button1");
            button.addEventListener("click", function(event) {
                let invisibleMessage =  window["sap-ui-webcomponents-bundle"].invisibleMessage;
                const messageStrip = document.querySelector("#msgStrip");
                const types = ["Information", "Warning", "Negative", "Positive"];
                const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.";
                let type = types[Math.round(Math.random() * 3)];
                if (messageStrip) {
                    container.removeChild(messageStrip);
                }
                let generatedMsgStrip = document.createElement("ui5-message-strip");
                generatedMsgStrip.id = "msgStrip";
                generatedMsgStrip.design = type;
                generatedMsgStrip.textContent = text;
                invisibleMessage.announce(\\\`New Information Bar of type \\\${type} \\\${text}\\\`, "Assertive");
                container.appendChild(generatedMsgStrip);
            });
        <\/script>
    </div>
\``,...(f=(y=e.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var N,W,w;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`() => html\`
<h3>Custom MessageStrip</h3>
    <div class="snippet">
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Information" hide-icon="" hide-close-button="">You have new message.</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive" hide-close-button="">Successfull login!</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Negative" hide-icon="">Access denied!</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning">Update is required.</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Warning"><ui5-icon name="palette" slot="icon"></ui5-icon>Custom icon</ui5-message-strip>
        <ui5-message-strip class="samples-margin-bottom samples-vertical-align" style="width: 200px;" design="Positive"><img src="../assets/images/loading.gif" width="16" height="16" slot="icon">Custom animated gif</ui5-message-strip>
    </div>
\``,...(w=(W=a.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};const Y=["Template0","Template1","Template2","Template3","Template4"];export{i as Template0,t as Template1,n as Template2,e as Template3,a as Template4,Y as __namedExportsOrder,U as default};
//# sourceMappingURL=MessageStrip.stories.3c4a65ae.js.map
