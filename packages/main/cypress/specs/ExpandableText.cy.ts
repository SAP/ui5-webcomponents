import { html } from "lit";
import "../../src/ExpandableText.js";
import {
	EXPANDABLE_TEXT_SHOW_MORE,
	EXPANDABLE_TEXT_SHOW_LESS,
	EXPANDABLE_TEXT_CLOSE,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("ExpandableText", () => {
	describe("Rendering and Interaction", () => {
		it("Should display only 100 characters by default", () => {
			const text = "This is a very long text that should be displayed. This is a very long text that should be displayed. This is a very long text that should be displayed.";

			cy.mount(html`<ui5-expandable-text text=${text}></ui5-expandable-text>`);

			expect(text.length).to.be.greaterThan(100);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text.substring(0, 100))
				.should("exist");
		});

		it("Should display full text if maxCharacters are set, but not exceeded", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="9999"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text)
				.should("exist");
		});

		it("Should display 'Show More' if maxCharacters are set and exceeded", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist")
				.should("have.attr", "ui5-link");
		});

		it("Should display 'Show More' if maxCharacters are exceeded, set to 0", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="0"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Should NOT display 'Show More' if maxCharacters are 0, but text is empty", () => {
			cy.mount(html`<ui5-expandable-text max-characters="0"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("not.exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.should("not.exist");
		});

		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Toggling 'Show More' and 'Show Less' with keyboard", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`
				<button id="before">before</button>
				<ui5-expandable-text text=${text} max-characters="${maxCharacters}"></ui5-expandable-text>
			`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("#before")
				.focus();

			cy.get("#before")
				.realPress("Tab");

			cy.get("@toggle")
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("ARIA attributes", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="5"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.should("have.attr", "accessible-role", "Button");

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: false,
				});

			cy.get("@toggle")
				.realClick();

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: true,
				});
		});
	});

	describe("Empty Indicator", () => {
		it("Should display empty indicator if text is empty and emptyIndicatorMode=On", () => {
			cy.mount(html`<ui5-expandable-text text="" empty-indicator-mode="On"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.should("have.attr", "empty-indicator-mode", "On");
		});

		it("Should NOT display empty indicator if text is empty and emptyIndicatorMode=Off", () => {
			cy.mount(html`<ui5-expandable-text text="" empty-indicator-mode="Off"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.should("have.attr", "empty-indicator-mode", "Off");
		});
	});

	describe("Rendering and Interaction with overflowMode=Popover", () => {
		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}" overflow-mode="Popover"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@toggle")
				.invoke("attr", "id")
				.as("expectedOpenerId");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@rpo")
				.should("have.attr", "content-only-on-desktop");

			cy.get("@rpo")
				.invoke("attr", "opener")
				.then(function testOpenerId(opener) {
					expect(opener).to.equal(this.expectedOpenerId);
				});

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.should("not.have.attr", "open");
		});

		it("ARIA attributes", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="5" overflow-mode="Popover"></ui5-expandable-text>`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.should("have.attr", "accessible-name");

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: false,
					hasPopup: "dialog",
				});

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name-ref", "popover-text");

			cy.get("@toggle")
				.realClick();

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: true,
					hasPopup: "dialog",
				});
		});

		it("Toggling 'Show More' and 'Show Less' with keyboard", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`
				<button id="before">before</button>
				<ui5-expandable-text text=${text} max-characters="${maxCharacters}" overflow-mode="Popover"></ui5-expandable-text>
			`);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("#before")
				.focus();

			cy.get("#before")
				.realPress("Tab");

			cy.get("@toggle")
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.should("exist");

			cy.realPress("Escape");

			cy.get("@rpo")
				.should("not.have.attr", "open");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Toggling 'Show More' and 'Show Less' on Mobile Device", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(html`<ui5-expandable-text text=${text} max-characters="${maxCharacters}" overflow-mode="Popover"></ui5-expandable-text>`);
			cy.ui5SimulateDevice("phone");

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]").as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@rpo")
				.should("have.attr", "_hide-header");

			cy.get("@rpo")
				.contains("[slot=footer] [ui5-button]", EXPANDABLE_TEXT_CLOSE.defaultText)
				.should("exist")
				.and("be.visible");

			cy.get("@rpo")
				.contains("[slot=footer] [ui5-button]", EXPANDABLE_TEXT_CLOSE.defaultText)
				.realClick();

			cy.get("@rpo")
				.should("not.have.attr", "open");
		});
	});
});
