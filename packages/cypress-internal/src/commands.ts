import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && $el[0].shadowRoot) {
				const isShadowDomPopulated = $el[0].shadowRoot.hasChildNodes();
                const allVisible = [$el, ...$el.parentsUntil("body")].every(parent => Cypress.$(parent).is(":visible"));
 
                expect(isShadowDomPopulated, "Custom element's shadow DOM should have content before interaction").to.be.true;
                expect(allVisible, "Custom element and its parents should be visible before interaction").to.be.true;
			}
		})
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

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount)