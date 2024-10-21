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

import "cypress-real-events";
import { setupHooks } from '@cypress/mount-utils';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { mount } from 'cypress-ct-lit'

let dispose;

function cleanup() {
	dispose?.();
}

function ui5Mount(component, options = {}) {
	const configurationScript = document.head.querySelector("script[data-ui5-config]")
	cleanup();

	if (options.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);

	}

	dispose = () => {
		configurationScript.innerHTML = "{}";
	}

	if (typeof component === "string") {
		return mount(unsafeHTML(component), options)
	}

	return mount(component, options)
}

setupHooks(cleanup);

Cypress.Commands.add('mount', ui5Mount)