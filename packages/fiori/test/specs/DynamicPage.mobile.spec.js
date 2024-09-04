import { assert } from "chai";

describe("DynamicPage Mobile Behaviour", () => {
	before(async () => {
		await browser.url(`test/pages/DynamicPage_test.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("should display snapped title on mobile when snappedTitleOnMobile is true and header is snapped", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Set snappedTitleOnMobile to true and snap the header
		await title.setProperty("snappedTitleOnMobile", true);
		await title.setProperty("snappedTitleOnMobileText", "Snapped Title");
		await dynamicPage.setProperty("headerSnapped", true);

		// Check if the snapped title on mobile is visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		assert.ok(
			await snappedTitleOnMobile.isExisting(),
			"Snapped title on mobile should be displayed when header is snapped and snappedTitleOnMobile is true."
		);
		assert.strictEqual(
			await snappedTitleOnMobile.getText(),
			"Snapped Title",
			"The snapped title on mobile should display the correct text."
		);
	});

	it("should not display snapped title on mobile when snappedTitleOnMobile is false", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Set snappedTitleOnMobile to false and snap the header
		await title.setProperty("snappedTitleOnMobile", false);
		await dynamicPage.setProperty("headerSnapped", true);

		// Check if the snapped title on mobile is not visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		assert.strictEqual(
			await snappedTitleOnMobile.isExisting(),
			false,
			"Snapped title on mobile should not be displayed when snappedTitleOnMobile is false."
		);
	});

	it("should expand the header when clicked on the snapped title on mobile", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Set snappedTitleOnMobile to true and snap the header
		await title.setProperty("snappedTitleOnMobile", true);
		await dynamicPage.setProperty("headerSnapped", true);

		// Click on the snapped title on mobile
		const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
		await titleFocusArea.click();

		// Check if the header is expanded
		assert.strictEqual(
			await dynamicPage.getProperty("headerSnapped"),
			false,
			"Header should expand when snapped title on mobile is clicked."
		);
	});

	it("should not display snapped title on mobile when header is not snapped", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Set snappedTitleOnMobile to true but keep the header expanded
		await title.setProperty("snappedTitleOnMobile", true);
		await dynamicPage.setProperty("headerSnapped", false);

		// Check if the snapped title on mobile is not visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		assert.strictEqual(
			await snappedTitleOnMobile.isExisting(),
			false,
			"Snapped title on mobile should not be displayed when the header is not snapped."
		);
	});

	it("should focus the title focus area when header action is clicked to snap the header", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Set snappedTitleOnMobile to true but keep the header expanded
		await title.setProperty("snappedTitleOnMobile", true);
		await dynamicPage.setProperty("headerSnapped", false);

		// Click on the header action to snap the header
		const snapButton = await dynamicPage.shadow$("ui5-dynamic-page-header-actions")
			.shadow$(".ui5-dynamic-page-header-action");
		await snapButton.click();

		// Check if the title focus area is focused
		const isFocused = await title.isFocused();
		assert.ok(
			isFocused,
			"Focus should be applied to the title focus area after snapping the header via header action."
		);
	});
});