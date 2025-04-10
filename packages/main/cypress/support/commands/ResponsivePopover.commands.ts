import type ResponsivePopover from "../../../src/ResponsivePopover.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { isPopupOpen } from "./utils/popup-open.js";

Cypress.Commands.add("ui5ResponsivePopoverOpened", { prevSubject: true }, (subject: JQuery<ResponsivePopover>) => {
	if (isPhone()) {
		cy.wrap(subject)
			.shadow()
			.find("[ui5-dialog]")
			.then($dialog => {
				isPopupOpen($dialog);
			});
	} else {
		isPopupOpen(subject);
	}
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5ResponsivePopoverOpened(
				this: Chainable<JQuery<ResponsivePopover>>
			): Chainable<void>;
		}
	}
}