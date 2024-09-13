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

	it("disables column pointer events during separator drag'n'drop", () => {
		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(10, 0);

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "_resizing")
			.should("be.equal", true);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseUp()
			.then(() => {
				cy.get("[ui5-flexible-column-layout]")
					.invoke("prop", "_resizing")
					.should("be.equal", false);
			});
	});
});
