const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Card general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Card.html`);
	});

	it("tests initial rendering", () => {
		const card = browser.$("#card");

		assert.ok(card.isExisting(), "The component has shadow root.");
	});

	it("tests status not rendered, when action is set", () => {
		const status = browser.$("#actionCardHeader").shadow$(".ui5-card-header-status");

		assert.notOk(status.isExisting(), "The status DOM is not rendered.");
	});

	it("tests headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.$("#cardHeader").shadow$(".ui5-card-header");
		const cardHeader2 = browser.$("#cardHeader2").shadow$(".ui5-card-header");
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

	it("tests aria-labelledby", () => {
		const card = $("#textAreaAriaLabel").shadow$(".ui5-card-root");
		const cardId = $("#textAreaAriaLabel").getProperty("_id");
		const EXPECTED_ARIA_LABELLEDBY_CARD = `${cardId}-desc`;

		assert.strictEqual(card.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD,
			"The aria-labelledby of card is correctly set.");
	})

	it("tests ARIA attributes of the content", () => {
		const card = $("#card");
		const content = card.shadow$(".ui5-card-root div:nth-child(2)");

		assert.strictEqual(content.getAttribute("aria-label"), card.getProperty("_ariaCardContentLabel"));
		assert.strictEqual(content.getAttribute("role"), "group");
	});
});

describe("CardHeader", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Card.html`);
	});

	it("tests header aria-labelledby", () => {
		const header = $("#header").shadow$(".ui5-card-header");
		const header2 = $("#header2").shadow$(".ui5-card-header");
		const headerId = $("#header").getProperty("_id");
		const headerId2 = $("#header2").getProperty("_id");
		const EXPECTED_ARIA_LABELLEDBY_HEADER = `${headerId}-title ${headerId}-subtitle ${headerId}-status`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER2 = `${headerId2}-title ${headerId2}-subtitle`;

		assert.strictEqual(header.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER,
			"The aria-labelledby is correctly set.");
		assert.strictEqual(header2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER2,
			"The aria-labelledby is correctly set.");
	})

});
