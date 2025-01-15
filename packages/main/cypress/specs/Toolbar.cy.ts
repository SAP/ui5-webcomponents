import { html } from "lit";
import "../../src/Toolbar.js";
import "../../src/ToolbarButton.js";
import "../../src/ToolbarSelect.js";
import "../../src/ToolbarSelectOption.js";
import "../../src/ToolbarSeparator.js";
import "../../src/ToolbarSpacer.js";
import "../../src/Popover.js";
import type ToolbarItem from "../../src/ToolbarItem.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/employee.js";

describe("Toolbar general interaction", () => {
	it.skip("Should not return null upon calling getDomRef for all direct child items", () => {
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

	it("shouldn't have toolbar button as popover opener when there is spacer before last toolbar item", () => {
		cy.mount(html`
			<ui5-toolbar id="otb_spacer">
				<ui5-toolbar-button icon="add" text="Plus" design="Default"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Hire"></ui5-toolbar-button>
				<ui5-toolbar-separator></ui5-toolbar-separator>
				<ui5-toolbar-button icon="add" text="Add"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Decline"></ui5-toolbar-button>
				<ui5-toolbar-spacer></ui5-toolbar-spacer>
				<ui5-toolbar-button icon="add" text="Append"></ui5-toolbar-button>
			</ui5-toolbar>
		`);

		cy.get("#otb_spacer")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("shouldn't show overflow button if there is enough space", () => {
		cy.mount(html`
			<ui5-toolbar style="width:fit-content;max-width:100%;">
				<ui5-toolbar-button icon="decline">
				</ui5-toolbar-button>

				<ui5-toolbar-button icon="add">
				</ui5-toolbar-button>

				<ui5-toolbar-button icon="employee">
				</ui5-toolbar-button>
			</ui5-toolbar>
		`);

		cy.get("[ui5-toolbar]")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("shouldn't display the overflow button when initially rendered in a hidden container and later made visible", () => {
		cy.mount(html`
			<div id="otb_hidden_container" style="display:none;">
				<ui5-toolbar id="otb_hidden">
					<ui5-toolbar-button icon="add" text="Append"></ui5-toolbar-button>
				</ui5-toolbar>
			</div>
		`);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("#otb_hidden_container")
			.as("hiddenContainer");

		// show the hidden container
		cy.get("@hiddenContainer")
			.invoke("show");

		// overflowbutton should not be rendered
		cy.get("#otb_hidden")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});
});
