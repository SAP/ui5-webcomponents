import "../../src/ComboBox.js";
import { html } from "lit";
import type ComboBox from "../../src/ComboBox.js";

describe("Combobox no selecting when there is no typeahead", () => {
	it("should not select the item that is an exact match before clicking it, when there is no typeahead", () => {
		cy.mount(html`
			<ui5-combobox id="comboo" placeholder="Enter value" no-typeahead>
			  <ui5-cb-item text="Austria"></ui5-cb-item>
			  <ui5-cb-item text="Bulgaria"></ui5-cb-item>
			  <ui5-cb-item text="Germany"></ui5-cb-item>
			  <ui5-cb-item text="Italy"></ui5-cb-item>
			  <ui5-cb-item text="Spain"></ui5-cb-item>
			</ui5-combobox>`);

		cy.get("ui5-combobox")
			.as("combobox");

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.type("Bulgaria");

		cy.get<ComboBox>("@combobox").then($combobox => {
			const combobox = $combobox[0];
			const changeSpy = cy.spy().as("changeEvent");
			combobox.addEventListener("change", changeSpy);

			cy.get<ComboBox>("@combobox")
				.find("ui5-cb-item[text='Bulgaria']")
				.click();

			cy.get("ui5-cb-item[text='Bulgaria']").should("have.prop", "selected");
			cy.get("@changeEvent").should("have.been.calledOnce");
		});

		cy.get<ComboBox>("@combobox")
			.shadow()
			.find("input")
			.should("have.value", "Bulgaria");
	});
});
