import ToggleButton from "../../../src/ToggleButton.js";
import { ModifierKey } from "./common/types.js";

Cypress.Commands.add("ui5ToggleButtonRealClick", { prevSubject: true }, (subject: JQuery<ToggleButton>, isClickPrevented: boolean, pressedKey?: ModifierKey) => {
	cy.wrap(subject).as("toggleButton");
	if (pressedKey) {
		cy.get("@toggleButton").realClick({ [pressedKey]: true });
	} else {
		cy.get("@toggleButton").realClick();
	}

	const assertion = isClickPrevented ? "not.have.attr" : "have.attr";

	cy.get("@toggleButton")
		.should(assertion, "pressed");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5ToggleButtonRealClick(this: Chainable<JQuery<ToggleButton>>, isClickPrevented: boolean, pressedKey?: ModifierKey): Chainable<JQuery<ToggleButton>>;
		}
	}
}