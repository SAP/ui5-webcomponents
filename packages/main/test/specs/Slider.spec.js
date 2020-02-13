const assert = require("chai").assert;

describe("Button general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Slider_Test_Page.html");

	it("tests slider's label rendering", () => {
		const textValue = browser.$("#slider").shadow$$(".ui5-slider-label")[0].getText();

		assert.strictEqual(textValue, "Test", "Slider text is rendered");
	});

	it("Arrow down button is working", () => {
		const slider = browser.$("#slider");
		console.log(slider);
		const button = slider.shadow$$(".ui5-slider-arrow")[1];
		button.click();

		assert.strictEqual(slider.getValue(), "2", "Slider button arrow down is working");
	});

	it("Arrow up button is working", () => {
		const slider = browser.$("#slider");
		const button = slider.shadow$$(".ui5-slider-arrow")[0];

		button.click();

		assert.strictEqual(slider.getValue(), "1", "Slider button arrow up is working");
	});

	it("Keyboard arrow down is working", () => {
		const slider = browser.$("#slider");

		slider.keys("ArrowDown");

		assert.strictEqual(slider.getValue(), "2", "Slider keyboard handling for arrow down is working");
	});

	it("Keyboard Arrow up is working", () => {
		const slider = browser.$("#slider");

		slider.keys("ArrowUp");

		assert.strictEqual(slider.getValue(), "1", "Slider keyboard handling for arrow up is working");
	});

	it("Click on element selects element", () => {
		const slider = browser.$("#slider");
		const sliderElements = slider.shadow$$(".ui5-slider-item");

		sliderElements[5].click();

		assert.strictEqual(slider.getValue(), "6", "Slider pick elements with click works");
	});
});