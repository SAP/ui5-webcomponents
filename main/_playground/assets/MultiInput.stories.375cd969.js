import{y as i}from"./lit-html.9e2e9691.js";import{D as h}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const y={tokens:{control:{type:"text"}},previewItem:{control:{type:!1}},type:{control:"select",options:["Email","Number","Password","Tel","Text","URL"]},valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},default:{control:{type:"text"}},icon:{control:{type:"text"}},valueStateMessage:{control:{type:"text"}},openPicker:{table:{category:"Methods"}}},f={package:"@ui5/webcomponents",since:"1.0.0-rc.9"};var u=Object.freeze,T=Object.defineProperty,b=(o,x)=>u(T(o,"raw",{value:u(x||o.slice())})),s;const a="ui5-multi-input",D={title:"Main/MultiInput",component:a,subcomponents:{Token:"ui5-token"},parameters:{docs:{page:h({...f,component:a})}},argTypes:y},e=()=>i`
<h3>Basic Multi Input</h3>
    <div class="snippet">
        <ui5-multi-input class="samples-margin samples-responsive-margin-bottom" value="basic input"></ui5-multi-input>
        <ui5-multi-input class="samples-margin samples-responsive-margin-bottom" show-value-help-icon="" value="value help icon"></ui5-multi-input>
    </div>
`,n=()=>i`
<h3>Multi Input with tokens</h3>
    <div class="snippet">
        <ui5-multi-input style="width: 30%">
            <ui5-token slot="tokens" text="Bulgaria"></ui5-token>
        </ui5-multi-input>
        <ui5-multi-input style="width: 30%">
            <ui5-token slot="tokens" text="Argentina"></ui5-token>
            <ui5-token slot="tokens" text="Bulgaria"></ui5-token>
            <ui5-token slot="tokens" text="England"></ui5-token>
            <ui5-token slot="tokens" text="Finland"></ui5-token>
            <ui5-token slot="tokens" text="Germany"></ui5-token>
            <ui5-token slot="tokens" text="Hungary"></ui5-token>
            <ui5-token slot="tokens" text="Italy"></ui5-token>
            <ui5-token slot="tokens" text="Luxembourg"></ui5-token>
            <ui5-token slot="tokens" text="Mexico"></ui5-token>
            <ui5-token slot="tokens" text="Philippines"></ui5-token>
            <ui5-token slot="tokens" text="Sweden"></ui5-token>
            <ui5-token slot="tokens" text="USA"></ui5-token>
        </ui5-multi-input>
    </div>
`,t=()=>i(s||(s=b([`
<h3>Multi Input and token creation onChange</h3>
    <div class="snippet">
        <ui5-multi-input show-suggestions="" id="token-unique" style="width: 50%">
            <div slot="valueStateMessage">Token is already in the list</div>
            <ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
            <ui5-suggestion-item text="Bulgaria"></ui5-suggestion-item>
            <ui5-suggestion-item text="England"></ui5-suggestion-item>
            <ui5-suggestion-item text="Finland"></ui5-suggestion-item>
            <ui5-suggestion-item text="Germany"></ui5-suggestion-item>
            <ui5-suggestion-item text="Hungary"></ui5-suggestion-item>
            <ui5-suggestion-item text="Italy"></ui5-suggestion-item>
            <ui5-suggestion-item text="Luxembourg"></ui5-suggestion-item>
            <ui5-suggestion-item text="Mexico"></ui5-suggestion-item>
            <ui5-suggestion-item text="Philippines"></ui5-suggestion-item>
            <ui5-suggestion-item text="Sweden"></ui5-suggestion-item>
            <ui5-suggestion-item text="USA"></ui5-suggestion-item>
        </ui5-multi-input>
        <script>
            var createTokenFromText = function (text) {
                var token = document.createElement("ui5-token");
                token.setAttribute("text", text);
                token.setAttribute("slot", "tokens");
                return token;
            };
            document.getElementById("token-unique").addEventListener("token-delete", function (event) {
                const token = event.detail?.token;
                token && token.remove();
            });
            document.getElementById("token-unique").addEventListener("change", function (event) {
                if (!event.target.value) {
                    return;
                }
                var isDuplicate = event.target.tokens.some(function(token) {
                    return token.text === event.target.value
                });
                if (isDuplicate) {
                    event.target.valueState = "Error";
                    setTimeout(function () {
                        event.target.valueState = "Normal";
                    }, 2000);
                    return;
                }
                event.target.appendChild(createTokenFromText(event.target.value));
                event.target.value = "";
            });
        <\/script>
    </div>
`])));t.parameters={docs:{story:{inline:!1}}};var r,l,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Basic Multi Input</h3>
    <div class="snippet">
        <ui5-multi-input class="samples-margin samples-responsive-margin-bottom" value="basic input"></ui5-multi-input>
        <ui5-multi-input class="samples-margin samples-responsive-margin-bottom" show-value-help-icon="" value="value help icon"></ui5-multi-input>
    </div>
\``,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,p,k;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>Multi Input with tokens</h3>
    <div class="snippet">
        <ui5-multi-input style="width: 30%">
            <ui5-token slot="tokens" text="Bulgaria"></ui5-token>
        </ui5-multi-input>
        <ui5-multi-input style="width: 30%">
            <ui5-token slot="tokens" text="Argentina"></ui5-token>
            <ui5-token slot="tokens" text="Bulgaria"></ui5-token>
            <ui5-token slot="tokens" text="England"></ui5-token>
            <ui5-token slot="tokens" text="Finland"></ui5-token>
            <ui5-token slot="tokens" text="Germany"></ui5-token>
            <ui5-token slot="tokens" text="Hungary"></ui5-token>
            <ui5-token slot="tokens" text="Italy"></ui5-token>
            <ui5-token slot="tokens" text="Luxembourg"></ui5-token>
            <ui5-token slot="tokens" text="Mexico"></ui5-token>
            <ui5-token slot="tokens" text="Philippines"></ui5-token>
            <ui5-token slot="tokens" text="Sweden"></ui5-token>
            <ui5-token slot="tokens" text="USA"></ui5-token>
        </ui5-multi-input>
    </div>
\``,...(k=(p=n.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};var c,d,v;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<h3>Multi Input and token creation onChange</h3>
    <div class="snippet">
        <ui5-multi-input show-suggestions="" id="token-unique" style="width: 50%">
            <div slot="valueStateMessage">Token is already in the list</div>
            <ui5-suggestion-item text="Argentina"></ui5-suggestion-item>
            <ui5-suggestion-item text="Bulgaria"></ui5-suggestion-item>
            <ui5-suggestion-item text="England"></ui5-suggestion-item>
            <ui5-suggestion-item text="Finland"></ui5-suggestion-item>
            <ui5-suggestion-item text="Germany"></ui5-suggestion-item>
            <ui5-suggestion-item text="Hungary"></ui5-suggestion-item>
            <ui5-suggestion-item text="Italy"></ui5-suggestion-item>
            <ui5-suggestion-item text="Luxembourg"></ui5-suggestion-item>
            <ui5-suggestion-item text="Mexico"></ui5-suggestion-item>
            <ui5-suggestion-item text="Philippines"></ui5-suggestion-item>
            <ui5-suggestion-item text="Sweden"></ui5-suggestion-item>
            <ui5-suggestion-item text="USA"></ui5-suggestion-item>
        </ui5-multi-input>
        <script>
            var createTokenFromText = function (text) {
                var token = document.createElement("ui5-token");
                token.setAttribute("text", text);
                token.setAttribute("slot", "tokens");
                return token;
            };
            document.getElementById("token-unique").addEventListener("token-delete", function (event) {
                const token = event.detail?.token;
                token && token.remove();
            });
            document.getElementById("token-unique").addEventListener("change", function (event) {
                if (!event.target.value) {
                    return;
                }
                var isDuplicate = event.target.tokens.some(function(token) {
                    return token.text === event.target.value
                });
                if (isDuplicate) {
                    event.target.valueState = "Error";
                    setTimeout(function () {
                        event.target.valueState = "Normal";
                    }, 2000);
                    return;
                }
                event.target.appendChild(createTokenFromText(event.target.value));
                event.target.value = "";
            });
        <\/script>
    </div>
\``,...(v=(d=t.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};const U=["Template0","Template1","Template2"];export{e as Template0,n as Template1,t as Template2,U as __namedExportsOrder,D as default};
//# sourceMappingURL=MultiInput.stories.375cd969.js.map
