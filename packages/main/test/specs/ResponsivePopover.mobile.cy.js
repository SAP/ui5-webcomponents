import { html } from 'lit';

describe("ResponsivePopover mobile general interaction", () => {
	before(() => {
		cy.forceMobile();
	})

	it("tests opening a popover from a responsive popover", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen"></ui5-responsive-popover>`)

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible")
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.forceMobile();
	})

	it("tests accessible-role - Default", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen"></ui5-responsive-popover>`)

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog")

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true")
	});

	it("tests accessible-role - AlertDialog", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" accessible-role="AlertDialog"></ui5-responsive-popover>`)

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog")

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-modal", "true")
	});

	it("tests accessible-role - None", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" accessible-role="None"></ui5-responsive-popover>`)

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role", "alertdialog")

		cy.get("[ui5-responsive-popover]")
			.shadow()
			.find("[ui5-dialog]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal", "true")
	});

	it("tests initial focus", () => {
		cy.mount(html`<ui5-button id="btnOpen">Open me</ui5-button>
		<ui5-responsive-popover open opener="btnOpen" initial-focus="emailInput">
			<ui5-input id="emailInput"></ui5-input>
		</ui5-responsive-popover>`)

		cy.get("#emailInput")
			.should("be.focused")
	});
});