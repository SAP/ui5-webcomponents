/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { internals, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import "./commands/Menu.commands.js";
import "./commands/ColorPicker.commands.js";
import "./commands/ColorPalette.commands.js";

type SimulationDevices = "phone"

declare global {
	namespace Cypress {
		interface Chainable {
			ui5SimulateDevice(device?: SimulationDevices): Chainable<void>
			ui5MenuOpen(options?: { opener?: string }): Chainable<void>
			ui5MenuOpened(): Chainable<void>
			ui5MenuItemClick(): Chainable<void>
			ui5DOMRef(): Chainable<void>
			ui5MenuItemPress(key: any): Chainable<void>
			ui5ColorPickerToggleColorMode(): Chainable<void>
			ui5ColorPickerUpdateInput(name: string, value: string): Chainable<void>
			ui5ColorPaletteCheckSelectedColor(colorPaletteItem: string, values: {r: string, g: string, b: string, a: string}): Chainable<void>
			ui5ColorPaletteNavigateAndCheckSelectedColor(colorPalette: string, startIndex: number, key: string, expectedValue: string): Chainable<void>
		}
	}
}

const deviceFuncForStub: Record<SimulationDevices, keyof typeof internals> = {
	phone: "_isPhone",
};

const deviceName: Record<SimulationDevices, Cypress.ViewportPreset> = {
	phone: "iphone-x",
};

Cypress.Commands.add("ui5SimulateDevice", (device: SimulationDevices = "phone") => {
	cy.stub(internals, deviceFuncForStub[device])
		.callsFake(() => {
			return true;
		});

	cy.viewport(deviceName[device]);

	cy.wrap({ isPhone })
		.invoke("isPhone")
		.should("be.true");
});
