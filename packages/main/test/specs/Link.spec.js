const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("General API", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Link.html`);
	});

	it("render initially", async () => {
		const linkRoot = await browser.$("ui5-link").shadow$("ui5-link-root");

		assert.ok(linkRoot, "Link is rendered.");
	});

	it("tests href attributes", async () => {
		const link = await browser.$("#empty-link-1");
		const HREF_ATTRIBUTE = "https://www.sap.com/index.html";

		assert.notOk(await link.getAttribute("href"), "Render without 'href' by default");

		await link.setAttribute("href", HREF_ATTRIBUTE);
		assert.strictEqual(await link.getAttribute("href"), HREF_ATTRIBUTE, "The href attribute is changed.");
	});

	it("tests target attributes", async () => {
		const link = await browser.$("#empty-link-2");
		const TARGET_ATTRIBUTE = "_blank";

		assert.notOk(await link.getAttribute("target"), "Render without 'target' by default.");

		await link.setAttribute("target", TARGET_ATTRIBUTE);
		assert.strictEqual(await link.getAttribute("target"), TARGET_ATTRIBUTE, "The target attribute is changed.");
	});

	it("should wrap the text of the link", async () => {
		const wrappingLabel = await browser.$("#wrapping-link");
		const truncatingLabel = await browser.$("#non-wrapping-link");

		assert.isAbove((await wrappingLabel.getSize()).height, (await truncatingLabel.getSize()).height);
		assert.strictEqual((await truncatingLabel.getSize()).height, 18, "The truncated label should be single line.");
	});

	it("should prevent clicking on disabled link", async () => {
		const disLink = await browser.$("#disabled-link");
		const input = await browser.$("#helper-input");

		assert.strictEqual(await input.getValue(), "0", "Click should not be fired and value of input should not be changed.");

	});

	it("disabled link should not be enabled", async () => {
		const link = await browser.$("#disabled-link").shadow$("a").getAttribute("disabled");

		assert.ok(link, "Disabled link should not be enabled.");
	});

	it("tests prevent default", async () => {
		const link = await browser.$("#link-click-prevent-default");

		await link.click();
		const url = await browser.getUrl();
		assert.notInclude(url, "https://www.google.com", "URL is not google");
	});
});
