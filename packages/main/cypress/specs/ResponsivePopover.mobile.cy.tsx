import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";
import Input from "../../src/Input.js";

describe("ResponsivePopover mobile general interaction", () => {
	before(() => {
		cy.ui5SimulateDevice();
	});

	it("tests opening a popover from a responsive popover", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("tests accessible-role - Default", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true");
	});

	it("tests accessible-role - AlertDialog", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" accessibleRole="AlertDialog"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true");
	});

	it("tests accessible-role - None", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" accessibleRole="None"></ResponsivePopover>
			</>
		);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role", "alertdialog");

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal", "true");
	});

	it("tests initial focus", () => {
		cy.mount(
			<>
				<Button id="btnOpen">open me</Button>
				<ResponsivePopover open={true} opener="btnOpen" initialFocus="emailInput">
					<Input id="emailInput"></Input>
				</ResponsivePopover>
			</>
		);

		cy.get("#emailInput")
			.should("be.focused");
	});
});
