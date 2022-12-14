import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Popover",
    component: "ui5-popover",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic Popover</h3>
	<div class="snippet">
		<ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
		<ui5-popover id="hello-popover" header-text="Newsletter subscription">
			<div class="popover-content">
				<div class="flex-column">
					<ui5-label for="emailInput" required="">Email: </ui5-label>
					<ui5-input id="emailInput" class="samples-margin-top" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
				</div>
			</div>
			<div slot="footer" class="popover-footer">
				<div style="flex: 1;"></div>
				<ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
			</div>
		</ui5-popover>
		<script>
			var popoverOpener = document.getElementById("openPopoverButton");
			var popover = document.getElementById("hello-popover");
			var popoverCloser = document.getElementById("closePopoverButton");
			popoverOpener.addEventListener("click", function() {
				popover.showAt(popoverOpener);
			});
			popoverCloser.addEventListener("click", function() {
				popover.close();
			});
		</script>
	</div>
`;