import { assert } from "chai";

describe("Badge rendering", async () => {
	before(async () => {
		await browser.url(`test/pages/Badge.html`);
	});

	it ("Checks for missing dependencies", async() => {
		const { checkMissingDependencies } = await import("@ui5/webcomponents-tools/util/wdio.mjs");
		await checkMissingDependencies("ui5-badge");
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

		let descriptionSuccess = await browser.executeAsync(done => {
			const sn = document.getElementById("badgeWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.BADGE_SUCCESS));
		});

		assert.strictEqual(await badgeRoot.getAttribute("aria-description"), descriptionSuccess, "aria-description is set correctly");

		let badgeHiddenText = await browser.$("#noninteractiveBadge").shadow$(".ui5-hidden-text");

		let descriptionTag = await browser.executeAsync(done => {
			const sn = document.getElementById("badgeWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.BADGE_DESCRIPTION_TAG));
		});

		assert.strictEqual(await badgeHiddenText.getText(), `${descriptionTag} ${descriptionSuccess}`, "hidden text is correct");

		badgeHiddenText = await browser.$("#badgeWithTextAndIcon").shadow$(".ui5-hidden-text");

		let descriptionBadge = await browser.executeAsync(done => {
			const sn = document.getElementById("badgeWithTextAndIcon");
			done(sn.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.BADGE_DESCRIPTION_BADGE));
		});

		assert.strictEqual(await badgeHiddenText.getText(), descriptionBadge, "hidden text is correct");
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
