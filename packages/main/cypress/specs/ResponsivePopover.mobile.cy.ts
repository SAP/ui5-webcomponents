import { internals, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import "../../src/ResponsivePopover.js";
import "../../src/Button.js";
import "../../src/Input.js";

describe("ResponsivePopover mobile general interaction", () => {
	before(() => {
		cy.stub(internals, "_isPhone", () => {
			return true;
		});

		cy.wrap({ isPhone })
			.invoke("isPhone")
			.should("be.true");
	});

	it("tests opening a popover from a responsive popover", () => {
		cy.mount(`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen"></ui5-responsive-popover>`);

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.stub(internals, "isForcedMobile", () => {
			return true;
		});
	});

	it("tests accessible-role - Default", () => {
		cy.mount(`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen"></ui5-responsive-popover>`);

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
		cy.mount(`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" accessible-role="AlertDialog"></ui5-responsive-popover>`);

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
		cy.mount(`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" accessible-role="None"></ui5-responsive-popover>`);

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
		cy.mount(`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" initial-focus="emailInput">
			<ui5-input id="emailInput"></ui5-input>
		</ui5-responsive-popover>`);

		cy.get("#emailInput")
			.should("be.focused");
	});
});
