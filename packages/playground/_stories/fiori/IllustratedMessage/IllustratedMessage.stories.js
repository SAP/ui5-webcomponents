import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/IllustratedMessage",
    component: "ui5-illustrated-message",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Illustrated message</h3>
	<div class="snippet">
		<ui5-illustrated-message name="UnableToUpload">
			<ui5-button design="Emphasized">Action 1</ui5-button>
			<ui5-button>Action 2</ui5-button>
		</ui5-illustrated-message>
	</div>
`;

export const Template1 = () => html`
<h3>Illustrated message in dialog</h3>
	<div class="snippet">
		<ui5-button id="openDialogButton">Open Dialog</ui5-button>
		<ui5-dialog id="hello-dialog" header-text="Error">
			<ui5-illustrated-message name="UnableToLoad"></ui5-illustrated-message>
			<ui5-bar design="Footer" slot="footer">
				<ui5-button id="closeDialogButton" design="Emphasized" slot="endContent">Close</ui5-button>
			</ui5-bar>
		</ui5-dialog>
		<script>
			var dialogOpener = document.getElementById("openDialogButton");
			var dialog = document.getElementById("hello-dialog");
			var dialogCloser = document.getElementById("closeDialogButton");
			dialogOpener.addEventListener("click", function () {
				dialog.show();
			});
			dialogCloser.addEventListener("click", function () {
				dialog.close();
			});
		</script>
	</div>
`;

export const Template2 = () => html`
<h3>Illustrated message with custom title and link in subtitle</h3>
	<div class="snippet">
		<ui5-illustrated-message name="UnableToUpload" "="">
			<ui5-title slot="title" level="H1">Something went wrong</ui5-title>
			<div slot="subtitle">Please try again or contact us at <ui5-link>example@example.com</ui5-link></div>
			<ui5-button icon="refresh">Try again</ui5-button>
		</ui5-illustrated-message>
	</div>
`;