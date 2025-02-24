import "cypress-real-events";
import '@cypress/code-coverage/support'

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