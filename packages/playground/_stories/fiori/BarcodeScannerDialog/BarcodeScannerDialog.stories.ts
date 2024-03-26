import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
// @ts-ignore
import type BarcodeScannerDialog from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";

export default {
	title: "Fiori/Barcode Scanner Dialog",
	component: "BarcodeScannerDialog",
	argTypes,
} as Meta<BarcodeScannerDialog>;

const Template: UI5StoryArgs<BarcodeScannerDialog, StoryArgsSlots> = (
	args
) => html`
	<ui5-barcode-scanner-dialog id="dlgScan" ?open="${args.open}"> </ui5-barcode-scanner-dialog>
`;

export const Basic = Template.bind({});
Basic.decorators = [
	(story) => html` ${story()}
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
