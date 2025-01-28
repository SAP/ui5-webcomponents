import { html } from "lit";
import "../../src/MessageStrip.js";
import "../../src/ResponsivePopover.js";
import {
	MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION,
	MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM,
	MESSAGE_STRIP_INFORMATION,
	MESSAGE_STRIP_CLOSABLE,
	MESSAGE_STRIP_CUSTOM,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("API", () => {
	it("tests close event", () => {
		cy.mount(html`<ui5-message-strip>MessageStrip</ui5-message-strip>`);

		cy.get("[ui5-message-strip]").then($strip => {
			$strip.get(0).addEventListener("close", cy.stub().as("close"));
		});

		cy.get("[ui5-message-strip]")
			.shadow()
			.find(".ui5-message-strip-close-button")
			.as("closeButton");

		cy.get("@closeButton")
			.realClick();

		cy.get("@closeButton")
			.realPress("Space");

		cy.get("@closeButton")
			.realPress("Enter");

		cy.get("@close").should("have.callCount", 3);
	});

	it("Message strip is rendered without icon when design changes from default to a specific color set and scheme", () => {
		cy.mount(html`<ui5-message-strip >MessageStrip w/ default properties</ui5-message-strip>`);

		cy.get("[ui5-message-strip]")
			.invoke("prop", "design", "ColorSet1")
			.invoke("prop", "colorScheme", "1");

		cy.get("[ui5-message-strip]")
			.shadow()
			.find("ui5-icon")
			.should("not.exist");
	});

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

	it("should not close the popover when close button is clicked", () => {
		cy.mount(`<ui5-button id="btnopen">Open ResponsivePopover</ui5-button>
			<ui5-responsive-popover
	opener="btnopen"
	header-text="Newsletter subscription"
	id="resppopover"
  >
	<div class="popover-content">
	  <ui5-message-strip design="Information"
		>Information Message</ui5-message-strip
	  >
	</div>

	<div slot="footer" class="popover-footer">
	  <ui5-button id="closePopoverButton" design="Emphasized"
		>Subscribe</ui5-button
	  >
	</div>
  </ui5-responsive-popover>`);

		cy.get("ui5-button")
			.as("button");

		cy.get("ui5-responsive-popover")
			.as("popover");

		cy.get("@button")
			.then($btn => {
				$btn[0].addEventListener("click", () => {
					cy.get("@popover").then($popover => {
						$popover[0].setAttribute("open", "");
					});
				});
			});

		cy.get("@popover")
			.then($popover => {
				$popover[0].addEventListener("close", () => {
					$popover[0].removeAttribute("open");
				});
			});

		cy.get("@button")
			.realClick();

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("ui5-message-strip")
			.shadow()
			.find("ui5-button")
			.as("buttonMS");

		cy.get("@buttonMS")
			.realClick();

		cy.get("@popover")
			.should("have.attr", "open");
	});
});

describe("Accessibility", () => {
	it("Test hidden text element content", () => {
		cy.mount(html`
			<ui5-message-strip id="messageStrip">Hello World!</ui5-message-strip>
			<ui5-message-strip id="colorSet1ColorScheme1" design="ColorSet1" color-scheme="1" class="top"><ui5-icon name="palette" slot="icon"></ui5-icon>Color Set 1 - color-scheme 1</ui5-message-strip>
		`);

		cy.get("#messageStrip")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", `${MESSAGE_STRIP_INFORMATION.defaultText} ${MESSAGE_STRIP_CLOSABLE.defaultText}`);

		cy.get("#colorSet1ColorScheme1")
			.shadow()
			.find(".ui5-hidden-text")
			.should("have.text", `${MESSAGE_STRIP_CUSTOM.defaultText} ${MESSAGE_STRIP_CLOSABLE.defaultText}`);
	});
});
