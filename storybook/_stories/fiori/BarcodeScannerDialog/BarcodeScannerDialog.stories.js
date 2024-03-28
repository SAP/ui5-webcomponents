import { html } from "lit";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Barcode Scanner Dialog",
    component: "BarcodeScannerDialog",
    argTypes,
};
const Template = (args) => html `
	<ui5-barcode-scanner-dialog id="dlgScan" ?open="${args.open}"> </ui5-barcode-scanner-dialog>
`;
export const Basic = Template.bind({});
Basic.decorators = [
    (story) => html ` ${story()}
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
</script>`,
];
//# sourceMappingURL=BarcodeScannerDialog.stories.js.map