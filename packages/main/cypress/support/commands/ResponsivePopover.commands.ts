import type ResponsivePopover from "../../../src/ResponsivePopover.js";
import { isPopupOpen } from "./utils/popup-open.js";

Cypress.Commands.add("ui5ResponsivePopoverOpened", { prevSubject: true }, (subject: JQuery<ResponsivePopover>) => {
	isPopupOpen(subject);
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