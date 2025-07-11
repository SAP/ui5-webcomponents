import ColorPalettePopover from "../../../src/ColorPalettePopover.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

Cypress.Commands.add("ui5ColorPalettePopoverOpen", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	cy.get("@cpp")
		.invoke("prop", "open", true);

	cy.get<ColorPalettePopover>("@cpp")
		.ui5ColorPalettePopoverOpened()
});

Cypress.Commands.add("ui5ColorPalettePopoverOpened", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	cy.get("@cpp")
		.should("have.attr", "open")

	cy.get("@cpp")
		.then($el => {
			console.log($el)
		})
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
});

Cypress.Commands.add("ui5ColorPalettePopoverClosed", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	cy.get("@cpp")
		.should("not.have.attr", "open");

	cy.get("@cpp")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverClosed();
});

Cypress.Commands.add("ui5ColorPalettePopoverGetDefaultButton", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	return cy.get<ColorPalettePopover>("@cpp")
		.ui5ColorPalettePopoverGetColorPalette()
		.shadow()
		.find(".ui5-cp-default-color-button")
});

Cypress.Commands.add("ui5ColorPalettePopoverGetMoreColors", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	return cy.get<ColorPalettePopover>("@cpp")
		.ui5ColorPalettePopoverGetColorPalette()
		.shadow()
		.find(".ui5-cp-more-colors")
});

Cypress.Commands.add("ui5ColorPalettePopoverGetColorPalette", { prevSubject: true }, (subject: JQuery<ColorPalettePopover>) => {
	cy.wrap(subject)
		.as("cpp")

	return cy.get("@cpp")
		.shadow()
		.find("[ui5-color-palette]")
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5ColorPalettePopoverOpen(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<void>;
			ui5ColorPalettePopoverOpened(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<void>;
			ui5ColorPalettePopoverClosed(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<void>;
			ui5ColorPalettePopoverGetMoreColors(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<JQuery<HTMLElement>>;
			ui5ColorPalettePopoverGetDefaultButton(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<JQuery<HTMLElement>>;
			ui5ColorPalettePopoverGetColorPalette(
				this: Chainable<JQuery<ColorPalettePopover>>,
			): Chainable<JQuery<HTMLElement>>;
		}
	}
}