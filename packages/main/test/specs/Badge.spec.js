const assert = require("assert");

describe("Badge rendering", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Badge.html");

	it("tests label not rendered if not text content", () => {

		const badgeLabel = browser.$("#badgeIconOnly").shadow$(".ui5-badge-text");

		assert.ok(badgeLabel, "bagde label tag not rendered.");
	});
});