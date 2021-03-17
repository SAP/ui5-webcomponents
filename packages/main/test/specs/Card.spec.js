const assert = require('chai').assert;

describe("Card general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Card.html");
	});

	it("tests initial rendering", () => {
		const card = browser.$("#card");

		assert.ok(card.isExisting(), "The component has shadow root.");
	});

	it("tests status not rendered, when action is set", () => {
		const status = browser.$("#actionCard").shadow$(".ui5-card-status");

		assert.notOk(status.isExisting(), "The status DOM is not rendered.");
	});

	it("tests headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.$("#card").shadow$(".ui5-card-header");
		const cardHeader2 = browser.$("#card2").shadow$(".ui5-card-header");
		const field = browser.$("#field");

		cardHeader.click();
		cardHeader.keys("Space");
		cardHeader.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "The headerPress event should be called 3 times.");

		cardHeader2.click();
		cardHeader2.keys("Space");
		cardHeader2.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "The events count should remain 3 as the header is not interactive.");
	});

	it("Tests aria-label", () => {
		const card1 = browser.$("#textAreaAriaLabel").shadow$(".ui5-card-root");
		const card2 = browser.$("#textAreaAriaLabelledBy").shadow$(".ui5-card-root");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";

		assert.strictEqual(card1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(card2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
	});

	it("Tests internal aria-labelledby labeling", () => {
		const card1 = $("#card2").shadow$(".ui5-card-root");
		const card1Id = $("#card2").getProperty("_id");
		const header = $("#card2").shadow$(".ui5-card-header");
		const card2 = $("#card3").shadow$(".ui5-card-root");
		const card2Id = $("#card3").getProperty("_id");
		const header2 = $("#card3").shadow$(".ui5-card-header");
		const EXPECTED_ARIA_LABELLEDBY_CARD = `${card1Id}-heading ${card1Id}-desc`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER = `${card1Id}-subheading ${card1Id}-status ${card1Id}-avatar`;
		const EXPECTED_ARIA_LABELLEDBY_CARD2 = `${card2Id}-heading ${card2Id}-desc`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER2 = `${card2Id}-subheading`;

		assert.strictEqual(card1.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD,
			"The aria-labelledby of card is correctly set internally.");
		assert.strictEqual(header.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER,
			"The aria-labelledby is correctly set internally.");
		assert.strictEqual(card2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD2,
			"The aria-labelledby of card is correctly set internally.");
		assert.strictEqual(header2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER2,
			"The aria-labelledby is correctly set internally.");
	});
});
