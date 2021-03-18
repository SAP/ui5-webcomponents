const assert = require("chai").assert;


describe("Toast general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Toast.html");
	});

	it("tests open attribute before show", () => {
		const toast = browser.$("#wcToastME");

		assert.strictEqual(toast.getAttribute("open"), null,
			"Open attribute shouldn't be present before Toast is shown");
	});

	it("tests open attribute after show", () => {
		const button = browser.$("#wcBtnShowToastMC");
		const toast = browser.$("#wcToastMC");
		const toastShadowContent = toast.shadow$(".ui5-toast-root");

		button.click();

		assert.strictEqual(toast.getAttribute("open"), "true",
			"Open attribute should be present after Toast is shown");
		assert.ok(toastShadowContent.isDisplayedInViewport(),
			"Toast's content div should be displayed in the viewport after its opening.")
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

	it("tests shadow content div role", () => {
		const toastShadowContent = browser.$("#wcToastBE").shadow$(".ui5-toast-root");

		assert.strictEqual(toastShadowContent.getAttribute("role"), "alert",
			"The role of the shadow ui5-toast-root div should be alert");
	});

	it("tests shadow content div inline styles with default duration", () => {
		const button = browser.$("#wcBtnShowToastBE");
		const toastShadowContent = browser.$("#wcToastBE").shadow$(".ui5-toast-root");
		const EXPECTED_STYLES = "transition-duration: 1000ms; transition-delay: 2000ms; opacity: 0;";

		button.click();

		assert.ok(toastShadowContent.getAttribute("style").indexOf(EXPECTED_STYLES) !== -1,
			"The correct default inline styles are applied to the shadow ui5-toast-root");
	});

	it("tests shadow content div inline styles with long duration", () => {
		const button = browser.$("#wcBtnShowToastBS");
		const toast = browser.$("#wcToastBS");
		const toastShadowContent = toast.shadow$(".ui5-toast-root");
		const maximumAllowedTransition = 1000;
		const durationProperty = toast.getProperty("duration");
		let calculatedDelay;

		button.click();

		calculatedDelay = `${durationProperty - maximumAllowedTransition}ms`;

		const EXPECTED_STYLES = `transition-duration: ${maximumAllowedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

		assert.ok(toastShadowContent.getAttribute("style").indexOf(EXPECTED_STYLES) !== -1,
				"The correct custom inline styles are applied to the shadow ui5-toast-root," +
				"when the duration is longer than default. Transition is not longer than allowed (1000ms).");
	});

	it("tests shadow content div inline styles with short duration", () => {
		const button = browser.$("#wcBtnShowToastME");
		const toast = browser.$("#wcToastME");
		const toastShadowContent = toast.shadow$(".ui5-toast-root");
		const durationProperty = toast.getProperty("duration");
		let calculatedTransition, calculatedDelay;

		button.click();

		calculatedTransition = durationProperty / 3;
		calculatedDelay = `${durationProperty - calculatedTransition}ms`;

		const EXPECTED_STYLES = `transition-duration: ${calculatedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

		assert.ok(toastShadowContent.getAttribute("style").indexOf(EXPECTED_STYLES) !== -1,
				"The correct custom inline styles are applied to the shadow ui5-toast-root," +
				"when the duration is shorter than default. Transition is a third of the duration.");
	});

	it("tests closing of toast", () => {
		const button = browser.$("#wcBtnShowToastMS");
		const toast = browser.$("#wcToastMS");

		button.click();

		// Give time for the animation to end and _ontransitionend to be called
		browser.pause(1000);

		assert.notOk(toast.getProperty("open"),
		"Open property should be false after Toast is closed");
	});

	it("tests minimum allowed duration", () => {
		const toast = browser.$("#wcToastTE");

		assert.strictEqual(toast.getProperty("effectiveDuration"), 500,
				"Duration property is forced to be 500, when -1 is passed for duration attribute.");
	});
});
