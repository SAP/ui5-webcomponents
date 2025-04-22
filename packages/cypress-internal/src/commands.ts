import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"

function deepElementFromPoint(x: number, y: number, target: HTMLElement) {
	let el = document.elementFromPoint(x, y);

	while (el) {
		if (el === target) return true;

		if (el.shadowRoot && typeof el.shadowRoot.elementFromPoint === 'function') {
			const nested = el.shadowRoot.elementFromPoint(x, y);
			if (!nested || nested === el) break;
			el = nested;
		} else {
			break;
		}
	}

	return false;
}

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && $el[0].shadowRoot) {
				const isShadowDomPopulated = $el[0].shadowRoot.hasChildNodes();
				expect(isShadowDomPopulated, "Custom element's shadow DOM should have content before interaction").to.be.true;

				const rect = $el[0].getBoundingClientRect();

				expect(deepElementFromPoint(rect.left + (rect.width / 2), rect.top + (rect.height / 2), $el[0])).to.be.true;
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