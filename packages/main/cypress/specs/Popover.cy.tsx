import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";

describe("Popover opener", () => {
	it("tests 'opener' set as string of abstract element's ID ", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete" id="clearCounter"></ToolbarButton>
					<ToolbarButton id="btnOpenMenu" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup" opener="btnOpenMenu">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

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
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete"></ToolbarButton>
					<ToolbarButton id="btnOpenPopover" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

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
