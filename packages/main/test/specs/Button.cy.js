describe("Button general interaction", () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit("/test/pages/Button.html")
	})

	it("tests button's text rendering", () => {
		cy.get("#button1")
			.shadow(".ui5-button-text>bdi>slot")
			.should("not.exist", "Button text is not rendered");
	})

	it("tests button's icon rendering", () => {
		cy.get("#button1")
			.then(e => {
				e[0].setAttribute("icon", "add");
			});

		cy.get("#button1")
			.shadow()
			.find("[ui5-icon]")
			.should("exist", "icon is present");

		cy.get("#button1")
			.then(e => {
				e[0].setAttribute("icon", "");
			});

		cy.get("#button1")
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist", "icon is not present");
	});

	it("tests button's slot rendering", () => {
		cy.get("#btnImage")
			.should("be.visible", "Btn image is rendered");
	});

	it("tests button's icon only rendering", () => {
		cy.get("#icon-only-comment")
			.should("have.attr", "icon-only", "", "Button comment has attribute icon-only");

		cy.get("#icon-only-blank-text")
			.should("have.attr", "icon-only", "", "Button comment has attribute icon-only")
	});

	it("tests clicking on disabled button", () => {
		cy.get("#button-disabled")
			.shadow()
			.find("button")
			.should("have.attr", "disabled")

		cy.get("#button-disabled")
			.click();

		cy.get("#click-counter")
			.should("have.value", "1", "Click should be called 3 times");
	});

	it("aria-expanded is properly applied on the button tag", () => {
		cy.get("#button1")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "true", "Attribute is reflected")

		cy.get("#button1")
			.click()

		cy.get("#button1")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "true", "Attribute is reflected")
	});

	it.only("aria-haspopup and aira-controls are properly applied on the button tag", () => {
		cy.get("#openDialogButton")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "dialog", "Attribute is reflected")
			.and("have.attr", "aria-controls", "registration-dialog", "Attribute is reflected")
	});

	it.only("tests button with text icon role", () => {
		cy.get("#attentionIconButton")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "accessible-role", "presentation", "icon has proper role")
	});

	it.only("setting accessible-name-ref on the host is reflected on the button tag", () => {
		cy.get("#buttonAccNameRef")
		.shadow()
		.find("button")
		.should("have.attr", "aria-label", "Download Application", "Attribute is reflected")
	});

	it.only("setting tooltip on the host is reflected on the button tag", () => {
		cy.get("#customTooltip")
		.shadow()
		.find("button")
		.should("have.attr", "title", "Go home", "Attribute is reflected")
	});

	it.only("tooltip from inner icon is propagated", () => {
		cy.get("#download")
		.shadow()
		.find("button")
		.should("have.attr", "title", "Download", "Icon tooltip is shown")
	});
})
