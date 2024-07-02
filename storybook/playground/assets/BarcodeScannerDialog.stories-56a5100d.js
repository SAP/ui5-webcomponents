import{x as o}from"./lit-element-c5a2b594.js";const l={"scan-success":{description:"Fires when the scan is completed successfuuly.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"text",_ui5privacy:"public",description:"the scan result as string"},{type:{text:"Object"},name:"rawBytes",_ui5privacy:"public",description:"the scan result as a Uint8Array"}]}},"scan-error":{description:"Fires when the scan fails with error.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"message",_ui5privacy:"public",description:"the error message"}]}}},S={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.15",tagName:"ui5-barcode-scanner-dialog"};var t=Object.freeze,d=Object.defineProperty,p=(e,i)=>t(d(e,"raw",{value:t(i||e.slice())})),a;const u={title:"Fiori/Barcode Scanner Dialog",component:"BarcodeScannerDialog",argTypes:l},g=e=>o`
    <ui5-barcode-scanner-dialog id="dlgScan" ?open="${e.open}"> </ui5-barcode-scanner-dialog>
`,n=g.bind({});n.decorators=[e=>o(a||(a=p([" ",`
<ui5-button id="btnScan" icon="camera" tooltip="Start Camera">Scan</ui5-button>
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
		dlgScan.open = true;
	});

	dlgScan.addEventListener("scan-success", (event) => {
		scanResult.innerHTML = event.detail.text;
		dlgScan.open = false;
	});

	dlgScan.addEventListener("scan-error", (event) => {
		scanError.innerHTML = event.detail.message;
		dlgScan.open = false;
	});
<\/script>`])),e())];var r,c,s;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:'args => html`\n    <ui5-barcode-scanner-dialog id="dlgScan" ?open="${args.open}"> </ui5-barcode-scanner-dialog>\n`',...(s=(c=n.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};const m=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,__namedExportsOrder:m,default:u},Symbol.toStringTag,{value:"Module"}));export{v as C,S as c};
