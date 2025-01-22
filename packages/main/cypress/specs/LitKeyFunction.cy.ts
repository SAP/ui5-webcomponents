import { html } from "lit-html";
import "../../src/MultiComboBox.js";
import "../../src/MultiComboBoxItem.js";
import type List from "../../src/List.js";

describe("Lit HTML key function for #each", () => {
	it("LIT HTML does not mess up keys when looping over lists", () => {
		cy.mount(html`<ui5-multi-combobox id="mcb">
			<ui5-mcb-item text="<empty>"></ui5-mcb-item>
			<ui5-mcb-item text="Algeria"></ui5-mcb-item>
			<ui5-mcb-item text="China"></ui5-mcb-item>
			<ui5-mcb-item text="USA"></ui5-mcb-item>
</ui5-multi-combobox>`);

		cy.get("#mcb")
			.as("mcb")
			.realClick();

		cy.realPress("u");
		cy.realPress("s");
		cy.realPress("a");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("rpo");

		cy.get("@rpo")
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items");
			})
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.realClick();

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items")[0];
			})
			.invoke("attr", "text", "<empty>")
			.should("not.have.attr", "selected");

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items")[3];
			})
			.invoke("attr", "text", "USA")
			.should("have.attr", "selected");
	});
});
