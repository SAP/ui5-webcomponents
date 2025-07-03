import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element, { log: false }) // suppress cy.get logging
		.should(($el) => {
			const el = $el[0];

			const isCustom = el.tagName.includes("-");
			const isUI5Element = el.isUI5Element;
			const focusRef = typeof el.getFocusDomRef === "function" && el.getFocusDomRef();
			const isVisible = Cypress.dom.isVisible(focusRef)

			if (isCustom && isUI5Element) {
				expect(!!focusRef && isVisible , "Custom elements with shadow DOM have content in their shadow DOM and to be visible").to.be.true;
			}
		})
		.then(() => originalFn(element, ...args));
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