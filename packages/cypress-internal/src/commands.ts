import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"
// @ts-ignore
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && $el[0].shadowRoot) {
				expect($el[0].shadowRoot.hasChildNodes(), "Custom elements with shadow DOM have content in their shadow DOM").to.be.true;
			}
		})
		.and("be.visible")
		.then(() => {
			return originalFn(element, ...args)
		});
};

const commands = [
	"realClick",
	"realHover",
	"realTouch",
	"realSwipe",
	"realMouseDown",
	"realMouseUp",
	"realMouseMove"
];

commands.forEach(cmd => {
	Cypress.Commands.overwrite(cmd as any, realEventCmdCallback)
});


Cypress.Commands.overwrite(
	'focus',
	(originalFn, subject, ...args) => {
		// You can log for debugging
		Cypress.log({
			// @ts-ignore
			name: `focus`,
			// @ts-ignore
			message: `${subject?.selector}`
		});

		// Check if the element is a custom element or has a shadowRoot
		if ((subject as any)[0]?.shadowRoot || (subject as any)[0]?.tagName?.includes('-')) {
			// Focus via native DOM API, might be more reliable for custom elements
			(subject as any)[0]?.focus?.();

			cy.wrap(subject, { log: false }).should("be.focused")

			return cy.wrap(subject, { log: false }).should("be.focused");
		}

		// Otherwise, fallback to default Cypress behavior
		return originalFn(subject, ...args);
	}
);

Cypress.on("command:start:async", (e) => {
	if (["realClick",
		"realHover",
		"realTouch",
		"realSwipe",
		"realMouseDown",
		"realMouseUp",
		"realMouseMove",
		// @ts-ignore
	].includes(e.attributes.name)) {
		return new Cypress.Promise<boolean>(resolve => {
			renderFinished().then(() => {
				resolve(false);
			});
		});
	}

	return new Cypress.Promise<boolean>(resolve => {
		resolve();
	});
});

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount)