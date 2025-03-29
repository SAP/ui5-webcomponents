import AINoticeIndicator from "../../src/AINoticeIndicator.js";

describe("AI Notice Indicator", () => {
	describe("Rendering and Interaction", () => {
		beforeEach(() => {
			cy.mount(<AINoticeIndicator></AINoticeIndicator>);
		});

		const attributionText = "Created with AI.";
		const verificationText = "Verify results before use.";

		it('Should render the component', () => {
			cy.get('ui5-ai-notice-indicator').should('exist');
		});

		it("Should display closed responsive poppover", () => {
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", false);
		});

		it("Should display correct properties for Default mode", () => {

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('have.attr', 'icon', '')
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains(attributionText)
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.contains(verificationText)
				.should("exist");
		});

		it("Should display correct properties for Emphasized mode", () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'Emphasized');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('have.attr', 'icon', 'ai')
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains(attributionText)
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-label]")
				.contains(verificationText)
				.should("exist");
		});

		it("Should display correct properties for Shortened mode", () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'Shortened');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.should('have.attr', 'icon', '')
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains(attributionText)
				.should("exist");

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.contains(verificationText)
				.should("not.exist");
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
				.click();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", true);

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.click();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", false);
		});

		it('Should close the popover when clicking on the close button', () => {
			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-link]")
				.click();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-button]")
				.click();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", false);
		});

		it('Should open the popover form the icon button', () => {
			cy.get('ui5-ai-notice-indicator').invoke('attr', 'mode', 'IconOnly');

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-button]")
				.click();

			cy.get("[ui5-ai-notice-indicator]")
				.shadow()
				.find("[ui5-responsive-popover]")
				.should("have.prop", "open", true);
		});
	});
});
