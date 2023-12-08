import { assert } from "chai";

describe("Badge rendering", async () => {
	before(async () => {
		await browser.url(`test/pages/Badge.html`);
	});

	it("rendering", async () => {
		let badgeRoot = await browser.$("#badgeWithTextAndIcon").shadow$(".ui5-badge-root");
		assert.strictEqual(await badgeRoot.getTagName(), "div", "badge root tag is 'div'.");

		badgeRoot = await browser.$("#interactiveBadge").shadow$(".ui5-badge-root");
		assert.strictEqual(await badgeRoot.getTagName(), "button", "badge root tag is 'button'.");

		let roleDescription = await browser.executeAsync(done => {
			const sn = document.getElementById("badgeWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.BADGE_ROLE_DESCRIPTION));
		});

		assert.strictEqual(await badgeRoot.getAttribute("aria-roledescription"), roleDescription, "aria-roledescription is set correctly");

		let description = await browser.executeAsync(done => {
			const sn = document.getElementById("badgeWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.BADGE_SUCCESS));
		});

		assert.strictEqual(await badgeRoot.getAttribute("aria-description"), description, "aria-description is set correctly");
	});

	it("tests that label is rendered if there is text content", async () => {
		const badgeLabel = await browser.$("#badgeWithTextAndIcon").shadow$(".ui5-badge-text");

		assert.ok(await badgeLabel.isExisting(), "badge label tag should be rendered.");
	});

	it("tests that label is NOT rendered if there is only icon", async () => {
		const badgeLabel = await browser.$("#badgeIconOnly").shadow$(".ui5-badge-text");

		assert.notOk(await badgeLabel.isExisting(), "badge label tag shouldn't be rendered.");
	});
});
