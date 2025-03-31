import AINoticeIndicator from "../../src/AINoticeIndicator.js";
import {
	AI_NOTICE_INDICATOR_CLOSE_BUTTON_TEXT,
	AI_NOTICE_INDICATOR_POPOVER_CONTENT,
	AI_NOTICE_INDICATOR_ATTRIBUTIONTEXT,
	AI_NOTICE_INDICATOR_VERIFICATIONTEXT
} from "../../src/generated/i18n/i18n-defaults.js";

describe("AI Notice Indicator", () => {
	describe("Rendering and Interaction", () => {
		beforeEach(() => {
			cy.mount(<AINoticeIndicator></AINoticeIndicator>);
		});

		it('Should render the component', () => {
			cy.get('ui5-ai-notice-indicator').should('exist');
		});

		it("Should display closed responsive popover", () => {
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("exist");
		});

		it("Should display correct elements for Default mode", () => {

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('not.have.attr', 'icon');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.should("exist");
		});

		it("Should display correct elements for Emphasized mode", () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'Emphasized');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('have.attr', 'icon', 'ai')
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.should("exist");
		});

		it("Should display correct elements for Shortened mode", () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'Shortened');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('not.have.attr', 'icon');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.should("exist");
		});

		it('Should display only the AI icon in IconOnly mode', () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'IconOnly');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-button]")
				.should('have.attr', 'icon', 'sap-icon://ai')
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should("not.exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.should("be.empty");
		});
	});

	describe("Values of the texts", () => {
		it("Should display correct values of the properties for Default mode", () => {
			cy.mount(<AINoticeIndicator></AINoticeIndicator>);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains(AI_NOTICE_INDICATOR_ATTRIBUTIONTEXT.defaultText);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-text]")
				.contains(AI_NOTICE_INDICATOR_VERIFICATIONTEXT.defaultText);
		});

		it("Should display correct values of the properties for Emphasized mode", () => {
			cy.mount(<AINoticeIndicator mode="Emphasized" attributionText="Made with ai" verificationText="Check the results"></AINoticeIndicator>);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains("Made with ai");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.contains("Check the results");
		});

		it("Should display correct values of the properties for Shortened mode", () => {
			cy.mount(<AINoticeIndicator mode="Shortened" attributionText="Made with ai"></AINoticeIndicator>);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains("Made with ai");
		});

		it("Should display correct default values of the popover properties", () => {
			cy.mount(<AINoticeIndicator></AINoticeIndicator>);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.contains(AI_NOTICE_INDICATOR_CLOSE_BUTTON_TEXT.defaultText);
				
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.contains(AI_NOTICE_INDICATOR_POPOVER_CONTENT.defaultText);
		});

		it("Should display correct values of the popover properties", () => {
			cy.mount(<AINoticeIndicator closeButtonText="ok" popover-text="The Al-generated content may contain inaccuracies due to using multiple information sources. Verify results before use."></AINoticeIndicator>);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.contains("ok");
				
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.contains("The Al-generated content may contain inaccuracies due to using multiple information sources. Verify results before use.");
		});

	});

	describe("Popover open and close events", () => {
		beforeEach(() => {
			cy.mount(<AINoticeIndicator></AINoticeIndicator>);
		});

		it('Should open and close the popover when clicking on the link', () => {
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.realClick();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", true);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.realClick();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", false);
		});

		it('Should close the popover when clicking on the close button', () => {
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.realClick();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-button]")
				.realClick();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", false);
		});

		it('Should open the popover from the icon button', () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'IconOnly');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("#created-by-ai-button-link")
				.realClick();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", true);
		});
	});
});
