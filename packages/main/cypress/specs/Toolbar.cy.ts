import { html } from "lit";
import "../../src/Toolbar.js";
import "../../src/ToolbarButton.js";
import "../../src/ToolbarSelect.js";
import "../../src/ToolbarSelectOption.js";
import "../../src/ToolbarSeparator.js";
import "../../src/Popover.js";
import type Popover from "../../src/Popover.js";
import type ToolbarItem from "../../src/ToolbarItem.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/employee.js";


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

	it("should be able to use toolbar button as popover opener", () => {
		cy.mount(html`
			<ui5-toolbar id="tb">
				<ui5-toolbar-button icon="add" text="Left 1 (long)" id="clickCounter"></ui5-toolbar-button>
				<ui5-toolbar-button icon="decline" text="Left 2" id="clearCounter"></ui5-toolbar-button>
				<ui5-toolbar-button icon="employee" text="Left 3"></ui5-toolbar-button>
				<ui5-toolbar-separator></ui5-toolbar-separator>
				<ui5-toolbar-button icon="decline" text="Left 4"></ui5-toolbar-button>
				<ui5-toolbar-button id="btnOpenMenu" text="Open Menu" prevent-overflow-closing></ui5-toolbar-button>
			</ui5-toolbar>
			<ui5-popover id="popup" opener="btnOpenMenu">
				Hello World
			</ui5-popover>
		`);

		cy.get("#popup")
			.as("popover");

		cy.get("#btnOpenMenu")
			.as("toolbarBtn");

		cy.get("@toolbarBtn")
			.ui5DOMRef()
			.as("toolbarBtnDomRef");

		cy.get("@toolbarBtn")
			.then(toolbarBtn => {
				toolbarBtn.get(0).addEventListener("click", () => {
					const popover = document.querySelector<Popover>("#popup")!;
					popover.open = !popover.open;
				});
			});

		cy.get("@toolbarBtnDomRef")
			.realClick();

		cy.get("@popover")
			.should("be.visible");
	});
});
