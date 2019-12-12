const assert = require('chai').assert;

describe("General API", () => {
	browser.url('http://localhost:8080/test-resources/pages/Link.html');

	it("render initially", () => {
		const linkRoot = browser.$("ui5-link").shadow$("ui5-link-root");

		assert.ok(linkRoot, "Link is rendered");
	});

	it("tests href attributes", () => {
		const link = browser.$("#empty-link-1");
		const HREF_ATTRIBUTE = "https://www.sap.com/index.html";

		assert.notOk(link.getAttribute("href"), "Render without 'href' by default");

		link.setAttribute("href", HREF_ATTRIBUTE);
		assert.strictEqual(link.getAttribute("href"), HREF_ATTRIBUTE, "href attribute is changed");
	});

	it("tests target attributes", () => {
		const link = browser.$("#empty-link-2");
		const TARGET_ATTRIBUTE = "_blank";

		assert.notOk(link.getAttribute("target"), "Render without 'target' by default");

		link.setAttribute("target", TARGET_ATTRIBUTE);
		assert.strictEqual(link.getAttribute("target"), TARGET_ATTRIBUTE, "target attribute is changed");
	});

	it("should wrap the text of the link", () => {
		const wrappingLabel = browser.$("#wrapping-link");
		const truncatingLabel = browser.$("#non-wrapping-link");

		assert.ok(wrappingLabel.getSize().height > truncatingLabel.getSize().height);
		assert.strictEqual(truncatingLabel.getSize().height, 16, "truncated label should be single line");
	});

	it("should prevent clicking on disabled link", () => {
		const disLink = browser.$("#disabled-link");
		const input = browser.$("#helper-input");

		assert.throws(() => {
			disLink.click();
		});

		assert.strictEqual(input.getValue(), "0", "Click should not be fired and value of input should not be changed");

	});

	it("disabled link should not be enabled", () => {
		const link = browser.$("#disabled-link").shadow$("a").getAttribute("disabled");

		assert.ok(link, "Disabled link should not be enabled");
	});

	it("tests prevent default", () => {
		const link = browser.$("#link-click-prevent-default");

		link.click();
		assert.ok(browser.getUrl().indexOf("https://www.google.com") === -1);
	});
});
