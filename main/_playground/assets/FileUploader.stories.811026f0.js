import{y as i}from"./lit-html.9e2e9691.js";import{D as _}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const I={files:{control:{type:!1}},valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},default:{control:{type:"text"}},valueStateMessage:{control:{type:"text"}}},R={package:"@ui5/webcomponents",since:"1.0.0-rc.6"};var r=Object.freeze,O=Object.defineProperty,j=(a,D)=>r(O(a,"raw",{value:r(D||a.slice())})),u;const p="ui5-file-uploader",B={title:"Main/FileUploader",component:p,parameters:{docs:{page:_({...R,component:p})}},argTypes:I},e=()=>i(u||(u=j([`
<h3>Upload multiple images</h3>
    <div class="snippet">
        <ui5-file-uploader id="fileuploader1" accept="image/*" multiple="true">
            <ui5-button icon="upload">Upload Images</ui5-button>
        </ui5-file-uploader>
        <div id="result"></div>
        <script>
            var fileUploader = document.querySelector("#fileuploader1"),
                resultDiv = document.querySelector("#result");
            fileUploader.addEventListener("change", function(event) {
                var files = event.target.files;
                if (!files.length) {
                    resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
                } else {
                    resultDiv.innerHTML = "";
                    resultDiv.style.marginTop = "1rem";
                    for (var i = 0; i < files.length; i++) {
                        var img = document.createElement("img");
                        img.src = URL.createObjectURL(files[i]);
                        img.width = 100;
                        img.height = 100;
                        img.onload = function() {
                            URL.revokeObjectURL(img.src);
                        }
                        resultDiv.appendChild(img);
                    }
                }
            })
        <\/script>
    </div>
`])));e.parameters={docs:{story:{inline:!1}}};const n=()=>i`
<h3>Upload Single File</h3>
    <div class="snippet">
        <ui5-file-uploader>
            <ui5-button>Upload Single File</ui5-button>
        </ui5-file-uploader>
    </div>
`,l=()=>i`
<h3>File Uploader With No Input</h3>
    <div class="snippet">
        <ui5-file-uploader hide-input="">
            <ui5-button>Upload File</ui5-button>
        </ui5-file-uploader>
    </div>
`,t=()=>i`
<h3>Custom File Uploaders</h3>
    <div class="snippet">
        <ui5-file-uploader hide-input="">
            <ui5-avatar icon="upload"></ui5-avatar>
        </ui5-file-uploader>
        <ui5-file-uploader hide-input="">
            <ui5-badge>Upload File</ui5-badge>
        </ui5-file-uploader>
    </div>
`,o=()=>i`
<h3>Button With Icon File Uploader</h3>
    <div class="snippet">
        <ui5-file-uploader>
            <ui5-button icon="upload">Upload</ui5-button>
        </ui5-file-uploader>
        <ui5-file-uploader>
            <ui5-button icon="upload" icon-end="">Upload</ui5-button>
        </ui5-file-uploader>
        <ui5-file-uploader>
            <ui5-button icon="upload" icon-only=""></ui5-button>
        </ui5-file-uploader>
    </div>
`;var d,s,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>Upload multiple images</h3>
    <div class="snippet">
        <ui5-file-uploader id="fileuploader1" accept="image/*" multiple="true">
            <ui5-button icon="upload">Upload Images</ui5-button>
        </ui5-file-uploader>
        <div id="result"></div>
        <script>
            var fileUploader = document.querySelector("#fileuploader1"),
                resultDiv = document.querySelector("#result");
            fileUploader.addEventListener("change", function(event) {
                var files = event.target.files;
                if (!files.length) {
                    resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
                } else {
                    resultDiv.innerHTML = "";
                    resultDiv.style.marginTop = "1rem";
                    for (var i = 0; i < files.length; i++) {
                        var img = document.createElement("img");
                        img.src = URL.createObjectURL(files[i]);
                        img.width = 100;
                        img.height = 100;
                        img.onload = function() {
                            URL.revokeObjectURL(img.src);
                        }
                        resultDiv.appendChild(img);
                    }
                }
            })
        <\/script>
    </div>
\``,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var m,f,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => html\`
<h3>Upload Single File</h3>
    <div class="snippet">
        <ui5-file-uploader>
            <ui5-button>Upload Single File</ui5-button>
        </ui5-file-uploader>
    </div>
\``,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var g,h,b;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>File Uploader With No Input</h3>
    <div class="snippet">
        <ui5-file-uploader hide-input="">
            <ui5-button>Upload File</ui5-button>
        </ui5-file-uploader>
    </div>
\``,...(b=(h=l.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var U,F,S;t.parameters={...t.parameters,docs:{...(U=t.parameters)==null?void 0:U.docs,source:{originalSource:`() => html\`
<h3>Custom File Uploaders</h3>
    <div class="snippet">
        <ui5-file-uploader hide-input="">
            <ui5-avatar icon="upload"></ui5-avatar>
        </ui5-file-uploader>
        <ui5-file-uploader hide-input="">
            <ui5-badge>Upload File</ui5-badge>
        </ui5-file-uploader>
    </div>
\``,...(S=(F=t.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var T,y,L;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`() => html\`
<h3>Button With Icon File Uploader</h3>
    <div class="snippet">
        <ui5-file-uploader>
            <ui5-button icon="upload">Upload</ui5-button>
        </ui5-file-uploader>
        <ui5-file-uploader>
            <ui5-button icon="upload" icon-end="">Upload</ui5-button>
        </ui5-file-uploader>
        <ui5-file-uploader>
            <ui5-button icon="upload" icon-only=""></ui5-button>
        </ui5-file-uploader>
    </div>
\``,...(L=(y=o.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};const A=["Template0","Template1","Template2","Template3","Template4"];export{e as Template0,n as Template1,l as Template2,t as Template3,o as Template4,A as __namedExportsOrder,B as default};
//# sourceMappingURL=FileUploader.stories.811026f0.js.map
