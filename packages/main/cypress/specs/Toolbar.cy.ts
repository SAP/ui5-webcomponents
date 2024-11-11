import { html } from "lit";
import "../../src/Toolbar.js";
import "../../src/ToolbarButton.js";
import "../../src/ToolbarSelect.js";
import "../../src/ToolbarSelectOption.js";
import "../../src/ToolbarSeparator.js";
import type ToolbarItem from "../../src/ToolbarItem.js";

describe("Toolbar general interaction", () => {
	it("Should not return null upon calling getDomRef for all direct child items", () => {
		cy.mount(html`
			<ui5-toolbar id="otb_standard">
				<ui5-toolbar-button text="Button 1"></ui5-toolbar-button>
				<ui5-toolbar-button text="Button 2"></ui5-toolbar-button>
				<ui5-toolbar-button text="Button 3"></ui5-toolbar-button>
				<ui5-toolbar-select>
					<ui5-toolbar-select-option>1</ui5-toolbar-select-option>
					<ui5-toolbar-select-option>2</ui5-toolbar-select-option>
					<ui5-toolbar-select-option>3</ui5-toolbar-select-option>
				</ui5-toolbar-select>
				<ui5-toolbar-separator></ui5-toolbar-separator>
				<ui5-toolbar-button text="Button 4"></ui5-toolbar-button>
				<ui5-toolbar-button text="Button 5"></ui5-toolbar-button>
				<ui5-toolbar-button text="Button 6"></ui5-toolbar-button>
			</ui5-toolbar>
		`);

		cy.get("#otb_standard")
			.as("toolbar");

		cy.get("@toolbar")
			.should("exist");

		cy.get("@toolbar")
			.children()
			.each($el => {
				const toolbarItem = $el[0] as ToolbarItem;
				cy.wrap(toolbarItem.getDomRef())
					.should("not.be.null")
					.should("not.be.undefined");
			});
	});
});
