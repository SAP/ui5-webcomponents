const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Badge rendering", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Badge.html`);
	});

	it("tests label not rendered if not text content", () => {

		const badgeLabel = browser.$("#badgeIconOnly").shadow$(".ui5-badge-text");

		assert.ok(badgeLabel, "bagde label tag not rendered.");
	});
});
