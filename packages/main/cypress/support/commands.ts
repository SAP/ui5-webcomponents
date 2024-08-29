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

type SimulationDevices = "phone"

declare global {
	namespace Cypress {
		interface Chainable {
			ui5SimulateDevice(device?: SimulationDevices): Chainable<void>
			ui5MenuOpen(options?: { opener?: string }): Chainable<void>
			ui5MenuOpened(): Chainable<void>
			ui5MenuItemClick(): Chainable<void>
			ui5MenuItemPress(key: any): Chainable<void>
			ui5IsWithinViewport(): Chainable<void>
		}
	}
}

const deviceFuncForStub: Record<string, keyof typeof internals> = {
	phone: "_isPhone",
};

Cypress.Commands.add("ui5SimulateDevice", (device: string = "phone") => {
	cy.stub(internals, deviceFuncForStub[device])
		.callsFake(() => {
			return true;
		});

	cy.wrap({ isPhone })
		.invoke("isPhone")
		.should("be.true");
});

Cypress.Commands.add("ui5IsWithinViewport", { prevSubject: true }, subject => {
	const windowInnerWidth = Cypress.config(`viewportWidth`);
	const windowInnerHeight = Cypress.config(`viewportHeight`);
  
	const bounding = subject[0].getBoundingClientRect();
  
	const rightBoundOfWindow = windowInnerWidth;
	const bottomBoundOfWindow = windowInnerHeight;
 
	const message = `Element is within the viewport. Bounding rect: ${JSON.stringify(bounding)}`;

	expect(subject).to.be.visible;
	expect(bounding.top, message).to.be.at.least(0);
	expect(bounding.left, message).to.be.at.least(0);
	expect(bounding.right, message).to.be.lessThan(rightBoundOfWindow);
	expect(bounding.bottom, message).to.be.lessThan(bottomBoundOfWindow);
  
	return subject;
  })