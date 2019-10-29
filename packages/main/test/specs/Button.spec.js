const assert = require("chai").assert;


describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Button.html");

	it("tests click event", () => {
		const button = browser.$("#button1");
		const field = browser.$("#click-counter");

		button.click();
		button.keys("Space");
		button.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "Click should be called 3 times");
	});

	it("tests clicking on disabled button", () => {
		const button = browser.$("#button-disabled").shadow$("button");

		assert.throws(() => {
			button.click();
		});

		// don't test space and enter, as wdio always fires a click but the browser not.
		// button.keys("Space");
		// button.keys("Enter");
		const field = browser.$("#click-counter");
		assert.strictEqual(field.getProperty("value"), "3", "Click should be called 3 times");
	});

	it("click should call handler", () => {

		const button = browser.$("#button1");
		const field = browser.$("#click-counter");

		button.click();
		button.keys("Space");
		button.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "6", "click should be called 3 times");
	});

	it("click on disabled button should not call handler", () => {
		const button = browser.$("#button-disabled").shadow$("button");
		const field = browser.$("#click-counter");

		assert.throws(() => {
			button.click();
			// the button click should throw a protocol error
			// ERROR webdriver: Request failed due to Error: unknown error: Element <button type="button" data-sap-focus-ref="" class="sapMBtn sapMBtnDisabled sapMBtnDefault" disabled="">...</button> is not clickable at point (395, 26). Other element would receive the click: <body>...</body>
		});
		// don't test space and enter, as wdio always fires a click but the browser not.
		// button.keys("Space");
		// button.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "6", "click should be called 6 times");
	});
});
