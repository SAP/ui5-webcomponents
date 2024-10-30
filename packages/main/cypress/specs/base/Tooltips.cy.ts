import { setEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import { html } from "lit-html";
import "../../../src/Icon.js";
import "../../../src/Button.js";
import "../../../src/ToggleButton.js";
import "../../../src/SegmentedButton.js";
import "../../../src/SegmentedButtonItem.js";
import "../../../src/RatingIndicator.js";

setEnableDefaultTooltips(false);

describe("Default Tooltips", () => {
	it("tests navigation", () => {
		cy.mount(html`
	<ui5-icon id="ic" name="settings"></ui5-icon>
	<ui5-button id="btn" icon="settings"></ui5-button>
	<ui5-rating-indicator id="rt" icon="settings"></ui5-rating-indicator>
	<ui5-toggle-button id="togglebtn" icon="settings"></ui5-toggle-button>
	<ui5-segmented-button id="segBtn">
		<ui5-segmented-button-item id="segBtnItem" icon="add"></ui5-segmented-button-item>
		<ui5-segmented-button-item id="segBtnItem2" icon="settings"></ui5-segmented-button-item>
		<ui5-segmented-button-item id="segBtnItem3" icon="activate"></ui5-segmented-button-item>
	</ui5-segmented-button>`);

		cy.get("#ic")
			.shadow()
			.find("title")
			.should("not.exist");

		cy.get("#btn")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.have.attr", "title");

		cy.get("#togglebtn")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.have.attr", "title");

		cy.get("#rt")
			.shadow()
			.find(".ui5-rating-indicator-root")
			.should("not.have.attr", "title");

		cy.get("#segBtnItem")
			.shadow()
			.find(".ui5-segmented-button-item-root")
			.should("not.have.attr", "title");

		cy.get("#segBtnItem")
			.shadow()
			.find(".ui5-segmented-button-item-icon")
			.should("not.have.attr", "title");
	});
});
