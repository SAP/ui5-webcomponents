import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

Cypress.Commands.add("ui5DOMRef", { prevSubject: true }, subject => {
	cy.get(subject)
		.then(async $ui5Element => {
			await renderFinished();
			return ($ui5Element.get(0) as UI5Element).getFocusDomRef();
		});
});
