import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element)
		.should($el => {
			const el = $el[0];

			const isCustom = el.tagName.includes("-");
			const isUI5Element = el.isUI5Element;
			const isVisible = !Cypress.dom.isHidden(el);
			const domRef = typeof el.getDomRef === "function" && el.getDomRef();

			if (isCustom && isUI5Element) {
				expect(domRef, "DOM Reference exists").to.exist;
				expect(isVisible, "Be visible").to.be.true;
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