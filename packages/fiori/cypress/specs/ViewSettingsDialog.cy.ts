import { html } from "lit";
import "../../src/ViewSettingsDialog.js";
import "../../src/SortItem.js";

describe("View settings dialog - selection", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-view-settings-dialog id="vsd" sort-ascending>
        		<ui5-sort-item slot="sortItems" text="Name" selected></ui5-sort-item>
       			<ui5-sort-item slot="sortItems" text="Position"></ui5-sort-item>
    		</ui5-view-settings-dialog>
		`);
	});

	it("tests clicking on the text itself", () => {
		cy.get("[ui5-view-settings-dialog]").as("vsd");

		// Bind the "confirm" event - it will be called twice (first with Position, then with Name)
		cy.get("@vsd")
			.then(vsd => {
				vsd.get(0).addEventListener("ui5-confirm", cy.stub().as("confirm"));
			});

		// Open the dialog and wait until it's visible
		cy.get("@vsd")
			.invoke("prop", "open", true)
			.shadow()
			.find("div")
			.should("be.visible");

		// There should be 4 list items in the dialog - Ascending, Descending, Name, Position
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 4);

		// Click the TEXT of the 4th item (Position)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(3)
			.shadow()
			.find("span[part=title]") // we click the text itself first
			.realClick();

		// Click the OK button of the dialog
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired with sortBy = "Position"
		cy.get("@confirm")
			.should("be.called")
			.its("firstCall.args.0.detail.sortBy")
			.should("equal", "Position");

		// Wait until the dialog is closed
		cy.get("@vsd")
			.shadow()
			.find("div")
			.should("not.be.visible");

		// Open the dialog again and wait until it's visible
		cy.get("@vsd")
			.invoke("prop", "open", true)
			.shadow()
			.find("div")
			.should("be.visible");

		// Click the RADIO BUTTON of the 3th item (Name) instead of the text this time
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(2)
			.shadow()
			.find("[ui5-radio-button]")
			.realClick();

		// Click the OK button of the dialog again
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired for a second time, now with sortBy = "Name"
		cy.get("@confirm")
			.should("be.called")
			.its("secondCall.args.0.detail.sortBy")
			.should("equal", "Name");
	});
});
