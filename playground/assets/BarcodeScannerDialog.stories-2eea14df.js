import{x as o}from"./lit-element-c5a2b594.js";const l={show:{description:"Shows a dialog with the camera videostream. Starts a scan session.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},close:{description:"Closes the dialog and the scan session.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"scan-success":{description:"Fires when the scan is completed successfuuly.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"text",_ui5privacy:"public",description:"the scan result as string"},{type:{text:"Object"},name:"rawBytes",_ui5privacy:"public",description:"the scan result as a Uint8Array"}]}},"scan-error":{description:"Fires when the scan fails with error.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"message",_ui5privacy:"public",description:"the error message"}]}}},y={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15",tagName:"ui5-barcode-scanner-dialog"};var n=Object.freeze,d=Object.defineProperty,u=(t,i)=>n(d(t,"raw",{value:n(i||t.slice())})),a;const p={title:"Fiori/Barcode Scanner Dialog",component:"BarcodeScannerDialog",argTypes:l},m=t=>o`
    <ui5-barcode-scanner-dialog id="dlgScan"> </ui5-barcode-scanner-dialog>
`,e=m.bind({});e.decorators=[t=>o(a||(a=u([" ",`
        <ui5-button id="btnScan" icon="camera" tooltip="Start Camera"
            >Scan</ui5-button
        >
        <div>
            <ui5-label id="scanResult"></ui5-label>
            <ui5-label id="scanError"></ui5-label>
        </div>
        <script>
            const btnScan = document.getElementById("btnScan");
            const dlgScan = document.getElementById("dlgScan");
            const scanResult = document.getElementById("scanResult");
            const scanError = document.getElementById("scanError");

            btnScan.addEventListener("click", (event) => {
                dlgScan.show();
            });

            dlgScan.addEventListener("scan-success", (event) => {
                scanResult.innerHTML = event.detail.text;
                dlgScan.close();
            });

            dlgScan.addEventListener("scan-error", (event) => {
                scanError.innerHTML = event.detail.message;
                dlgScan.close();
            });
        <\/script>`])),t())];var r,s,c;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:'args => html`\n    <ui5-barcode-scanner-dialog id="dlgScan"> </ui5-barcode-scanner-dialog>\n`',...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const g=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:g,default:p},Symbol.toStringTag,{value:"Module"}));export{v as C,y as c};
