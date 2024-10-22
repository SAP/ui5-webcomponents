import { html } from "lit";
import "../../src/MultiComboBox.js";
import "../../src/MultiComboBoxItem.js";

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
			.find(".ui5-multi-combobox-all-items-responsive-popover")
			.as("popover");

		cy.get("@popover")
			.find(".ui5-multi-combobox-all-items-list > ui5-li")
			.as("items");

		cy.get("@items")
			.eq(0)
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.realClick();

		cy.get("@items")
			.eq(0)
			.should("contain.text", "<empty>")
			.should("not.have.attr", "selected");

		cy.get("@items")
			.eq(3)
			.should("contain.text", "USA")
			.should("have.attr", "selected");
	});
});
