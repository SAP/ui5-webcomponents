import { mount } from '@ui5/cypress-ct-ui5-webc'
import "cypress-real-events";
import '@cypress/code-coverage/support';
import "./acc_report/support.js";
import "./helpers.js"
// @ts-ignore
import { renderFinished } from "@ui5/webcomponents-base";

const realEventCmdCallback = (originalFn: any, element: any, ...args: any) => {
	cy.get(element)
		.should($el => {
			if ($el[0].tagName.includes("-") && "getFocusDomRef" in $el[0]) {
				expect($el[0].getFocusDomRef(), "Custom elements with shadow DOM have content in their shadow DOM").to.exist;
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

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount);

Cypress.on('command:start:async', async (command) => {
	const name = command.attributes.name;
	// @ts-ignore
	if (!['log', 'screenshot', 'task'].includes(name)) {
		await renderFinished();
	}
});