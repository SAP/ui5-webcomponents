import { assert } from "chai";

describe("Page general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Page.html`);
	});

	it("tests initial rendering", async () => {
				const page = await browser.$("#page");
				const header = await page.shadow$(".ui5-page-header-root");
				const content = await page.shadow$(".ui5-page-content-root");
				const footer = await page.shadow$(".ui5-page-footer-root");

				assert.ok(await page.isExisting(), "The component should have a shadow root.");
				assert.ok(await header.isExisting(), "Header should be rendered.");
				assert.ok(await content.isExisting(), "Content should be rendered.");
				assert.ok(await footer.isExisting(), "Footer should be rendered.");
		});

	it("tests footer visibility", async () => {
				const footer = await browser.$("#page").shadow$(".ui5-page-footer-root");
				const button = await browser.$("#toggleVisibility");

				assert.ok(await footer.isDisplayedInViewport(), "Footer should be visible.");

				await button.click();

		await browser.waitUntil(async () => !(await footer.isDisplayedInViewport()), {
			timeout: 600,
			timeoutMsg: "expected footer to not be visible after 500ms"
		});
	});

	it("tests animation off footer toggling" , async () => {
		await browser.url(`test/pages/Page.html?sap-ui-animationMode=none`);

		const footer = await $("#page").shadow$(".ui5-page-footer-root");
		const button = await $("#toggleVisibility");

		assert.ok(await footer.isDisplayedInViewport(), "Footer should be visible.");

		await button.click();

		assert.ok(!(await footer.isDisplayedInViewport()), "Footer should not be visible.");
	});

	it("createElement does not throw exception", async () => {
		let result;

		result = await browser.executeAsync(async (done) => {
			const p = document.createElement("ui5-page");
			// createElement throws exception during attachInternals() call but the exception can not be caught
			// so we check if the _internals property is added to the page object
			done(p._internals !== undefined);
		});

		assert.ok( result, "No exception should be thrown");
	});
});
