import { html } from "lit";
import "../../src/Button.js";
import "../../src/Toolbar.js";
import "../../src/ToolbarButton.js";
import "../../src/Popover.js";

describe("Popover opener", () => {
	it("tests 'opener' set as string of abstract element's ID ", () => {
		cy.mount(html`
			<ui5-toolbar id="tb">
				<ui5-toolbar-button text="Add"></ui5-toolbar-button>
				<ui5-toolbar-button text="Delete" id="clearCounter"></ui5-toolbar-button>
				<ui5-toolbar-button id="btnOpenMenu" text="Open Menu" prevent-overflow-closing></ui5-toolbar-button>
			</ui5-toolbar>
			<ui5-popover id="popup" opener="btnOpenMenu">
				<ui5-button id="btnClosePopover">Close</ui5-button>
			</ui5-popover>
		`);

		// act
		cy.get("#popup").invoke("prop", "open", "true");

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});

	it("tests 'opener' set as DOM ref of abstract element's DOM reference", () => {
		cy.mount(html`
			<ui5-toolbar id="tb">
				<ui5-toolbar-button text="Add"></ui5-toolbar-button>
				<ui5-toolbar-button text="Delete"></ui5-toolbar-button>
				<ui5-toolbar-button id="btnOpenPopover" text="Open Menu" prevent-overflow-closing></ui5-toolbar-button>
			</ui5-toolbar>
			<ui5-popover id="popup">
				<ui5-button id="btnClosePopover">Close</ui5-button>
			</ui5-popover>
		`);

		cy.get("#btnOpenPopover").then($toolbarBtn => {
			cy.wrap($toolbarBtn.get(0)).as("toolbarBtn");
		});

		// act
		cy.get("@toolbarBtn").then($toolbarBtn => {
			cy.get("#popup").invoke("prop", "opener", $toolbarBtn.get(0));
		});
		cy.get("#popup").invoke("prop", "open", true);

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});
});
