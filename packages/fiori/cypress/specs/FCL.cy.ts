import { html } from "lit";
import "../../src/FlexibleColumnLayout.js";

describe("Columns resize", () => {
	beforeEach(() => {
		cy.mount(html`
<ui5-flexible-column-layout id="fcl" style="height: 300px;" layout="TwoColumnsMidExpanded">
	<div class="column" id="startColumn" slot="startColumn">some content</div>
	<div class="column" id="midColumn" slot="midColumn">some content</div>
</ui5-flexible-column-layout>
`);
	});

	it("toggles _resizing property during separator drag'n'drop", () => {
		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.as("separator")
			.should("be.visible");

		// act: mock the user starting to drag the separator
		cy.get("@separator")
			.realMouseDown();

		// assert that the property is set
		cy.get("@fcl")
			.invoke("prop", "_resizing")
			.should("be.equal", true);

		// act: mock the user releasing the mouse button; use "then" to ensure it happens after the above check has completed
		cy.get("@separator")
			.realMouseUp();
		// assert that the property is reset
		cy.get("@fcl")
			.invoke("prop", "_resizing")
			.should("be.equal", false);
	});
});
