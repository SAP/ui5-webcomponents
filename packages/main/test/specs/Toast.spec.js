const assert = require("chai").assert;


describe("Toast general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Toast.html");

	it("tests open attribute before show", () => {
		const toast = browser.$("#wcToastME");

		assert.strictEqual(toast.getAttribute("open"), null,
			"Open attribute shouldn't be present before Toast is shown");
	});

	it("tests open attribute after show", () => {
		const button = browser.$("#wcBtnShowToastMC");
		const toast = browser.$("#wcToastMC");

		button.click();

		assert.strictEqual(toast.getAttribute("open"), "true",
			"Open attribute should be present after Toast is shown");
	});

	it("tests open property", () => {
		const button = browser.$("#wcBtnShowToastTS");
		const toast = browser.$("#wcToastTS");

		button.click();

		assert.strictEqual(toast.getProperty("open"), true,
			"Open property should be true when Toast is shown");
	});

	it("tests duration property", () => {
		const button = browser.$("#wcBtnShowToastTC");
		const toast = browser.$("#wcToastTC");

		button.click();

		assert.strictEqual(toast.getProperty("duration"), 3000,
			"Duration property should be the default 3000ms");
	});

	it("tests placement property", () => {
		const button = browser.$("#wcBtnShowToastBC");
		const toast = browser.$("#wcToastBC");

		button.click();

		assert.strictEqual(toast.getProperty("placement"), "BottomCenter",
			"Placement should be the default BottomCenter");
	});

	it("tests shadow root div role", () => {
		const toastShadowRoot = browser.$("#wcToastBE").shadow$(".ui5-toast-root");

		assert.strictEqual(toastShadowRoot.getAttribute("role"), "alert",
			"The role of the shadow ui5-toast-root div should be alert");
	});

	it("tests shadow root div default inline styles", () => {
		const button = browser.$("#wcBtnShowToastBE");
		const toastShadowRoot = browser.$("#wcToastBE").shadow$(".ui5-toast-root");

		button.click();

		assert.strictEqual(toastShadowRoot.getAttribute("style"),
			"transition-duration: 1000ms; transition-delay: 2000ms; opacity: 0;",
			"The correct default inline styles are applied to the shadow ui5-toast-root");
	});

	it("tests shadow root div custom inline styles", () => {
		const button = browser.$("#wcBtnShowToastBS");
		const toast = browser.$("#wcToastBS");
		const toastShadowRoot = toast.shadow$(".ui5-toast-root");
		let originalDuration, calculatedDuration, calculatedDelay;

		button.click();

		originalDuration = toast.getProperty("duration");
		calculatedDuration = `${originalDuration / 3}ms`;
		calculatedDelay = `${(originalDuration * 2) / 3}ms`;

		assert.strictEqual(toastShadowRoot.getAttribute("style"),
				`transition-duration: ${calculatedDuration}; transition-delay: ${calculatedDelay}; opacity: 0;`,
				"The correct default inline styles are applied to the shadow ui5-toast-root");
	});
});
