import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/BarcodeScannerDialog",
    component: "ui5-barcode-scanner-dialog",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
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
		</script>
	</div>
`;