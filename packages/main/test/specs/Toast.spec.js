import { assert } from "chai";


describe("Toast general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Toast.html`);
	});

	it("tests open attribute before show", async () => {
		const toast = await browser.$("#wcToastME");

		assert.strictEqual(await toast.getAttribute("open"), null,
			"Open attribute shouldn't be present before Toast is shown");
	});

	it("tests open attribute after show", async () => {
		const button = await browser.$("#wcBtnShowToastMC");
		const toast = await browser.$("#wcToastMC");
		const toastShadowContent = await toast.shadow$(".ui5-toast-root");

		await button.click();

		assert.strictEqual(await toast.getAttribute("open"), "true",
			"Open attribute should be present after Toast is shown");
		assert.ok(await toastShadowContent.isDisplayedInViewport(),
			"Toast's content div should be displayed in the viewport after its opening.")
	});

	it("tests domRendered property", async () => {
		const button = await browser.$("#wcBtnShowToastBS");
		const toast = await browser.$("#wcToastBS");
		const toastShadowContent = await toast.shadow$(".ui5-toast-root");

		assert.notOk(await toastShadowContent.isDisplayedInViewport(),
			"Toast's content div should be displayed in the viewport after its opening.");
		assert.notOk(await toast.getProperty("domRendered"),
			"domRendered property value should be false before Toast is shown");

		await button.click();

		assert.strictEqual(await toast.getProperty("domRendered"), true,
			"domRendered property value should be true when Toast is shown");

		assert.ok(await toastShadowContent.isDisplayedInViewport(),
			"Toast's content div should be displayed in the viewport after its opening.")
	});

	it("tests duration property", async () => {
		const button = await browser.$("#wcBtnShowToastTC");
		const toast = await browser.$("#wcToastTC");

		await button.click();

		assert.strictEqual(await toast.getProperty("duration"), 3000,
			"Duration property should be the default 3000ms");
	});

	it("tests placement property", async () => {
		const button = await browser.$("#wcBtnShowToastBC");
		const toast = await browser.$("#wcToastBC");

		await button.click();

		assert.strictEqual(await toast.getProperty("placement"), "BottomCenter",
			"Placement should be the default BottomCenter");
	});

	it("tests shadow content div role", async () => {
		const button = await browser.$("#wcBtnShowToastBE");
		const toastShadowContent = await browser.$("#wcToastBE").shadow$(".ui5-toast-root");

		await button.click();

		assert.strictEqual(await toastShadowContent.getAttribute("role"), "alert",
			"The role of the shadow ui5-toast-root div should be alert");
	});

	it("tests shadow content div inline styles with default duration", async () => {
		const button = await browser.$("#wcBtnShowToastBE");
		const toastShadowContent = await browser.$("#wcToastBE").shadow$(".ui5-toast-root");
		const EXPECTED_STYLES = "transition-duration: 1000ms; transition-delay: 2000ms; opacity: 0;";

		await button.click();

		const styleValue = await toastShadowContent.getAttribute("style");
		assert.include(styleValue, EXPECTED_STYLES,
			"The correct default inline styles are applied to the shadow ui5-toast-root");
	});

	it("tests shadow content div inline styles with long duration", async () => {
		const button = await browser.$("#wcBtnShowToastBS");
		const toast = await browser.$("#wcToastBS");
		const toastShadowContent = await toast.shadow$(".ui5-toast-root");
		const maximumAllowedTransition = 1000;
		const durationProperty = await toast.getProperty("duration");
		let calculatedDelay;

		await button.click();

		calculatedDelay = `${durationProperty - maximumAllowedTransition}ms`;

		const EXPECTED_STYLES = `transition-duration: ${maximumAllowedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

		const styleValue = await toastShadowContent.getAttribute("style");
		assert.include(styleValue, EXPECTED_STYLES,
				"The correct custom inline styles are applied to the shadow ui5-toast-root," +
				"when the duration is longer than default. Transition is not longer than allowed (1000ms).");
	});

	it("tests shadow content div inline styles with short duration", async () => {
		const button = await browser.$("#wcBtnShowToastME");
		const toast = await browser.$("#wcToastME");
		const toastShadowContent = await toast.shadow$(".ui5-toast-root");
		const durationProperty = await toast.getProperty("duration");
		let calculatedTransition, calculatedDelay;

		await button.click();

		calculatedTransition = durationProperty / 3;
		calculatedDelay = `${durationProperty - calculatedTransition}ms`;

		const EXPECTED_STYLES = `transition-duration: ${calculatedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

		const styleValue = await toastShadowContent.getAttribute("style");
		assert.include(styleValue, EXPECTED_STYLES,
				"The correct custom inline styles are applied to the shadow ui5-toast-root," +
				"when the duration is shorter than default. Transition is a third of the duration.");
	});

	it("tests closing of toast", async () => {
		const button = await browser.$("#wcBtnShowToastMS");
		const toast = await browser.$("#wcToastMS");

		await button.click();

		await browser.waitUntil(async () => {
			const open = await toast.getProperty("open");
			const domRendered = await toast.getProperty("domRendered");
			return !open && !domRendered;
		}, {
			timeout: 2000,
			timeoutMsg: "After 2000ms the toast should be closed and domRendered should be false"
		});
	});

	it("tests minimum allowed duration", async () => {
		const toast = await browser.$("#wcToastTE");

		assert.strictEqual(await toast.getProperty("effectiveDuration"), 500,
				"Duration property is forced to be 500, when -1 is passed for duration attribute.");
	});
});
