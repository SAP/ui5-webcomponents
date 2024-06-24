import { assert } from "chai";

describe("Tag rendering", async () => {
	before(async () => {
		await browser.url(`test/pages/Tag.html`);
	});

	it("rendering", async () => {
		let tagRoot = await browser.$("#tagWithTextAndIcon").shadow$(".ui5-tag-root");
		assert.strictEqual(await tagRoot.getTagName(), "div", "tag root tag is 'div'.");

		tagRoot = await browser.$("#interactiveTag").shadow$(".ui5-tag-root");
		assert.strictEqual(await tagRoot.getTagName(), "button", "tag root tag is 'button'.");

		let roleDescription = await browser.executeAsync(done => {
			const sn = document.getElementById("tagWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TAG_ROLE_DESCRIPTION));
		});

		assert.strictEqual(await tagRoot.getAttribute("aria-roledescription"), roleDescription, "aria-roledescription is set correctly");

		let descriptionSuccess = await browser.executeAsync(done => {
			const sn = document.getElementById("tagWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TAG_SUCCESS));
		});

		assert.strictEqual(await tagRoot.getAttribute("aria-description"), descriptionSuccess, "aria-description is set correctly");

		let tagHiddenText = await browser.$("#noninteractiveTag").shadow$(".ui5-hidden-text");

		let descriptionTag = await browser.executeAsync(done => {
			const sn = document.getElementById("tagWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TAG_DESCRIPTION_TAG));
		});

		assert.strictEqual(await tagHiddenText.getText(), `${descriptionTag} ${descriptionSuccess}`, "hidden text is correct");
	});

	it("tests that label is rendered if there is text content", async () => {
		const tagLabel = await browser.$("#tagWithTextAndIcon").shadow$(".ui5-tag-text");

		assert.ok(await tagLabel.isExisting(), "tag label tag should be rendered.");
	});

	it("tests that label is NOT rendered if there is only icon", async () => {
		const tagLabel = await browser.$("#tagIconOnly").shadow$(".ui5-tag-text");

		assert.notOk(await tagLabel.isExisting(), "tag label tag shouldn't be rendered.");
	});
});

describe("Wrapping", async () => {
	before(async () => {
		await browser.url(`test/pages/Tag.html`);
	});

	it("tests if tag text wraps - default wrappingType", async () => {
		const tag = await browser.$("#tagWithWrappingDefault").shadow$(".ui5-tag-root");

		assert.strictEqual((await tag.getCSSProperty("white-space")).value, "normal", "tag label is wrapped");
	});

	it("tests if tag text wraps - wrappingType Normal", async () => {
		const tag = await browser.$("#tagWithWrappingNormal").shadow$(".ui5-tag-root");

		assert.strictEqual((await tag.getCSSProperty("white-space")).value, "normal", "tag label is wrapped");
	});

	it("tests if tag text wraps - wrappingType None", async () => {
		const tag = await browser.$("#tagWithWrappingNone").shadow$(".ui5-tag-root");

		assert.strictEqual((await tag.getCSSProperty("white-space")).value, "nowrap", "tag label is truncated");
	});
});
