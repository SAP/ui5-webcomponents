import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type BarcodeScannerDialog from "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";

const component = "ui5-barcode-scanner-dialog";

export default {
    title: "Fiori/BarcodeScannerDialog",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<BarcodeScannerDialog>;

const Template: UI5StoryArgs<BarcodeScannerDialog, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
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
Template0.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};