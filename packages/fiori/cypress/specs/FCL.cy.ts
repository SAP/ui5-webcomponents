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
			.as("separator");

		cy.get("@separator")
			.realMouseDown();

		cy.get("@fcl")
			.invoke("prop", "_resizing")
			.should("be.equal", true);

		cy.get("@separator")
			.realMouseUp()
			.then(() => {
				cy.get("@fcl")
					.invoke("prop", "_resizing")
					.should("be.equal", false);
			});
	});
});
