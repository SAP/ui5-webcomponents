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
			const isVisible = Cypress.dom.isVisible(el)
			const hasFocusDomRef = typeof el.getFocusDomRef === "function" && el.getFocusDomRef();

			if (isCustom && el.isUI5Element && "getFocusDomRef" in el) {
				return !!hasFocusDomRef && isVisible;
			}

			return true;
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