import { assert } from "chai";

describe("DynamicPage Mobile Behaviour", () => {
	beforeEach(async () => {
		await browser.url("test/pages/DynamicPageWithSnappedTitleOnMobile.html");
		await browser.emulateDevice("iPhone X");
	});

	it("should display snapped title on mobile when snappedTitleOnMobile slot has content and header is snapped", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Ensure the header is snapped
		await dynamicPage.setProperty("headerSnapped", true);

		// Check if the snapped title on mobile is visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		const isDisplayed = await snappedTitleOnMobile.isDisplayed();

		assert.ok(
			isDisplayed,
			"Snapped title on mobile should be displayed when header is snapped and snappedTitleOnMobile slot has content."
		);
	});

	it("should not display snapped title on mobile when snappedTitleOnMobile slot is empty", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Remove content from the snappedTitleOnMobile slot
		await browser.execute(() => {
			const titleElement = document.querySelector("#page ui5-dynamic-page-title");
			const snappedTitleContent = titleElement.querySelector("[slot='snappedTitleOnMobile']");
			if (snappedTitleContent) {
				titleElement.removeChild(snappedTitleContent);
			}
		});

		// Snap the header
		await dynamicPage.setProperty("headerSnapped", true);

		// Check if the snapped title on mobile is not visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		const isDisplayed = await snappedTitleOnMobile.isDisplayed();

		assert.strictEqual(
			isDisplayed,
			false,
			"Snapped title on mobile should not be displayed when the snappedTitleOnMobile slot is empty."
		);
	});

	it("should expand the header when clicked on the snapped title on mobile", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Ensure the header is snapped
		await dynamicPage.setProperty("headerSnapped", true);

		// Click on the title focus area to expand the header
		const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
		await titleFocusArea.click();

		// Check if the header is expanded
		const headerSnapped = await dynamicPage.getProperty("headerSnapped");

		assert.strictEqual(
			headerSnapped,
			false,
			"Header should expand when snapped title on mobile is clicked."
		);
	});

	it("should not display snapped title on mobile when header is not snapped", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Ensure the header is not snapped
		await dynamicPage.setProperty("headerSnapped", false);

		// Check if the snapped title on mobile is not visible
		const snappedTitleOnMobile = await title.shadow$(".ui5-dynamic-page--snapped-title-on-mobile");
		const isDisplayed = await snappedTitleOnMobile.isDisplayed();

		assert.strictEqual(
			isDisplayed,
			false,
			"Snapped title on mobile should not be displayed when the header is not snapped."
		);
	});

	it("should focus the title focus area when header action is clicked to snap the header", async () => {
		const dynamicPage = await browser.$("#page");
		const title = await browser.$("#page ui5-dynamic-page-title");

		// Ensure the header is expanded
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