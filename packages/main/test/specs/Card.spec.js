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

	it("Tests internal aria-labelledby labeling", () => {
		const card1 = $("#textAreaAriaLabel").shadow$(".ui5-card-root");
		const card1Id = $("#textAreaAriaLabel").getProperty("_id");
		const header = $("#header").shadow$(".ui5-card-header");
		const headerId = $("#header").getProperty("_id");
		const card2 = $("#textAreaAriaLabelledBy").shadow$(".ui5-card-root");
		const card2Id = $("#textAreaAriaLabelledBy").getProperty("_id");
		const header2 = $("#header2").shadow$(".ui5-card-header");
		const headerId2 = $("#header2").getProperty("_id");
		const EXPECTED_ARIA_LABELLEDBY_CARD = `${card1Id}--header-title ${card1Id}-desc`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER = `${headerId}-subtitle ${headerId}-status`;
		const EXPECTED_ARIA_LABELLEDBY_CARD2 = `${card2Id}--header-title ${card2Id}-desc`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER2 = `${headerId2}-subtitle`;

		assert.strictEqual(card1.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD,
			"The aria-labelledby of card is correctly set internally.");
		assert.strictEqual(header.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER,
			"The aria-labelledby is correctly set internally.");
		assert.strictEqual(card2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD2,
			"The aria-labelledby of card is correctly set internally.3");
		assert.strictEqual(header2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER2,
			"The aria-labelledby is correctly set internally.");
	});
});
