import ViewSettingsDialog from "../../src/ViewSettingsDialog.js";
import SortItem from "../../src/SortItem.js";
import FilterItem from "../../src/FilterItem.js";
import FilterItemOption from "../../src/FilterItemOption.js";

describe("View settings dialog - selection", () => {
	it("tests clicking on sort items (both on the text and radio button)", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" onConfirm={cy.stub().as("confirm")}>
				<SortItem slot="sortItems" text="Name" selected={true}></SortItem>
				<SortItem slot="sortItems" text="Position"></SortItem>
			</ViewSettingsDialog>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100); // Wait after mounting the component temporarily, until the component is fully rendered TODO: remove this after the issue is fixed

		// Open the dialog and wait until it's visible
		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
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
			.find("[ui5-dialog]")
			.should("not.be.visible");

		// Open the dialog again and wait until it's visible
		cy.get("@vsd")
			.invoke("prop", "open", true);

		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
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

	it("tests clicking on filter items, and filter item options (both on the text and checkbox)", () => {
		cy.mount(
			<ViewSettingsDialog id="vsd" onConfirm={cy.stub().as("confirm")}>
				<FilterItem slot="filterItems" text="Filter 1">
					<FilterItemOption slot="values" text="Some filter 1"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 2"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 3"></FilterItemOption>
				</FilterItem>
				<FilterItem slot="filterItems" text="Filter 2">
					<FilterItemOption slot="values" text="Some filter 4"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 5"></FilterItemOption>
					<FilterItemOption slot="values" text="Some filter 6"></FilterItemOption>
				</FilterItem>
			</ViewSettingsDialog>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100); // Wait after mounting the component temporarily, until the component is fully rendered TODO: remove this after the issue is fixed

		// Open the dialog and wait until it's visible
		cy.get("[ui5-view-settings-dialog]")
			.as("vsd")
			.invoke("prop", "open", true)
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		// There should be 2 list items in the dialog - Filter 1 and Filter 2
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 2);

		// Click the "Filter 1" item
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(0)
			.shadow()
			.find("span[part=title]")
			.realClick();

		// There should be 3 list items in the dialog - Some filter 1, Some filter 2, Some filter 3
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.should("have.length", 3);

		// Click on the text of the first list item (Some filter 1)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(0)
			.shadow()
			.find("span[part=title]")
			.realClick();

		// Click on the checkbox of the third list item (Some filter 3)
		cy.get("@vsd")
			.shadow()
			.find("[ui5-li]")
			.eq(2)
			.shadow()
			.find("[ui5-checkbox]")
			.realClick();

		// Click the OK button of the dialog
		cy.get("@vsd")
			.shadow()
			.find("ui5-button[design=Emphasized]")
			.realClick();

		// Check if the confirm event was fired with: filters = [{"Filter 1":["Some filter 1","Some filter 3"]}]
		cy.get("@confirm")
			.should("be.called")
			.its("firstCall.args.0.detail.filters")
			.should("deep.equal", [{ "Filter 1": ["Some filter 1", "Some filter 3"] }]);

		// Wait until the dialog is closed
		cy.get("@vsd")
			.shadow()
			.find("[ui5-dialog]")
			.should("not.be.visible");
	});
});
