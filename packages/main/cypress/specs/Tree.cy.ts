import { html } from "lit";
import "../../src/Tree.js";
import "../../src/TreeItem.js";

describe("Tree Tests", () => {
	it("tests accessibility properties forwarded to the list", () => {
		cy.mount(html`
		<ui5-tree
			accessible-name="Tree"
			accessible-name-ref="lblDesc1"
			accessible-description="Description"
			accessible-description-ref="lblDesc2"
		></ui5-tree>
		<div id="lblDesc1">Tree</div>
		<div id="lblDesc2">Description</div>
		`);

		cy.get("[ui5-tree]")
			.as("tree");

		cy.get("@tree")
			.shadow()
			.find(".ui5-tree-root")
			.should("have.attr", "accessible-name", "Tree")
			.and("have.attr", "accessible-name-ref", "lblDesc1")
			.and("have.attr", "accessible-description", "Description")
			.and("have.attr", "accessible-description-ref", "lblDesc2");
	});
});
