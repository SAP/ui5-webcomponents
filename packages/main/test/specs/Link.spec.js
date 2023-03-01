import { assert } from "chai";
const KEYS = {
	SHIFT: '\uE008',
	ALT: '\uE00A',
	META: '\uE03D',
}

describe("General API", () => {
	before(async () => {
		await browser.url(`test/pages/Link.html`);
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

	it("tests rel attribute", async () => {
		const anchor = await browser.$("#target-blank-link");

		assert.strictEqual(await anchor.shadow$("a").getAttribute("rel"), "noreferrer noopener", "The rel attribute is properly set.");
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

	it("Collabsible element has aria-expanded attribute", async () => {
		const link = await browser.$("#collapseExpandLink");

		assert.strictEqual(await link.shadow$("a").getAttribute("aria-expanded"), "true", "The text is expanded");
		await link.click();
		assert.strictEqual(await link.shadow$("a").getAttribute("aria-expanded"), "false", "The text is collapsed");
	});

	it("Open dialog link has propper aria-haspopup attribute", async () => {
		const link = await browser.$("#signInLink");

		assert.strictEqual(await link.shadow$("a").getAttribute("aria-haspopup"), "Dialog", "Proper aria-haspopup attribute is set");
	});

	it("setting accessible-name applied on the host element is reflected on the anchor tag", async () => {
		const link = await browser.$("#linkAccName");

		assert.strictEqual(await link.shadow$("a").getAttribute("aria-label"), "more info", "Attribute is reflected");
	});


	it("passes special keys pressed while item clicked", async () => {
		// CTRL key is skipped since there is default browser behavior where popover is opened.
		const link = await browser.$("#modifierLink");
		let result;

		// Setup for META Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard1',
			actions: [{ type: 'keyDown', value: KEYS.META }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		result = await browser.$("#modifierResult");
		assert.strictEqual(await result.getText(), 'META:' + await link.getText(), "label for pressed link is correct");

		// Setup for ALT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard2',
			actions: [{ type: 'keyDown', value: KEYS.ALT }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		result = await browser.$("#modifierResult");
		assert.strictEqual(await result.getText(), 'ALT:' + await link.getText(), "label for pressed link is correct");

		// Setup for SHIFT Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [{ type: 'keyDown', value: KEYS.SHIFT }],
		  }]);
		// Action
		await link.click();
		await browser.releaseActions();
		// Check
		result = await browser.$("#modifierResult");
		assert.strictEqual(await result.getText(), 'SHIFT:' + await link.getText(), "label for pressed link is correct");
	});

});
