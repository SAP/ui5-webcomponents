import{y as d}from"./lit-html.9e2e9691.js";import{D as l}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const p={close:{table:{category:"Methods"}},show:{table:{category:"Methods"}}},u={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15"};var a=Object.freeze,m=Object.defineProperty,g=(e,s)=>a(m(e,"raw",{value:a(s||e.slice())})),t;const r="ui5-barcode-scanner-dialog",x={title:"Fiori/BarcodeScannerDialog",component:r,parameters:{docs:{page:l({...u,component:r})}},argTypes:p},n=()=>d(t||(t=g([`
<h3>Usage</h3>
    <div class="snippet">
        <ui5-barcode-scanner-dialog id="dlgScan"></ui5-barcode-scanner-dialog>
        <ui5-button id="btnScan" icon="camera" tooltip="Start Camera">Scan</ui5-button>
        <div>
            <ui5-label id="scanResult"></ui5-label>
            <ui5-label id="scanError"></ui5-label>
        </div>
        <script>
            btnScan.addEventListener("click", function(event) {
                dlgScan.show();
            });
            dlgScan.addEventListener("scan-success", function(event) {
                scanResult.innerHTML = event.detail.text;
                dlgScan.close();
            });
            dlgScan.addEventListener("scan-error", function(event) {
                scanError.innerHTML = event.detail.message;
                dlgScan.close();
            });
        <\/script>
    </div>
`])));n.parameters={docs:{story:{inline:!1}}};var c,i,o;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<h3>Usage</h3>
    <div class="snippet">
        <ui5-barcode-scanner-dialog id="dlgScan"></ui5-barcode-scanner-dialog>
        <ui5-button id="btnScan" icon="camera" tooltip="Start Camera">Scan</ui5-button>
        <div>
            <ui5-label id="scanResult"></ui5-label>
            <ui5-label id="scanError"></ui5-label>
        </div>
        <script>
            btnScan.addEventListener("click", function(event) {
                dlgScan.show();
            });
            dlgScan.addEventListener("scan-success", function(event) {
                scanResult.innerHTML = event.detail.text;
                dlgScan.close();
            });
            dlgScan.addEventListener("scan-error", function(event) {
                scanError.innerHTML = event.detail.message;
                dlgScan.close();
            });
        <\/script>
    </div>
\``,...(o=(i=n.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const D=["Template0"];export{n as Template0,D as __namedExportsOrder,x as default};
//# sourceMappingURL=BarcodeScannerDialog.stories.fc56e1d4.js.map
