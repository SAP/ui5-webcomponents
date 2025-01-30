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

Cypress.Commands.overwrite('realClick', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realHover', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realTouch', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realSwipe', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realMouseDown', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realMouseUp', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realMouseMove', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})

Cypress.Commands.overwrite('realMouseWheel', (originalFn, element, ...args) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && typeof $el[0].getDomRef === "function") {
				expect($el[0].getDomRef()).to.exist;
			} else {
				expect(true).to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
})