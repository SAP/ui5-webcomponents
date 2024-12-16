import { html } from "lit";
import "../../src/MessageStrip.js";
import { MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION, MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM } from "../../src/generated/i18n/i18n-defaults.js";

describe("MessageStrip close button tooltip", () => {
	it("should display the correct tooltip text for different designs", () => {
		const designs = [
		  {
				design: "Information",
				btnText: MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION.defaultText,
		  },
		  {
				design: "ColorSet1",
				btnText: MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM.defaultText,
		  },
		];

		designs.forEach(({ design, btnText }) => {
		  cy.mount(html`<ui5-message-strip class="top" design="${design}">${design} design with icon and close button:</ui5-message-strip>`);

		  cy.get("[ui5-message-strip]")
				.shadow()
				.find("ui5-button")
				.shadow()
				.find("button")
				.should("have.attr", "title", btnText);
		});
	  });
});
