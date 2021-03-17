const assert = require("chai").assert;

describe("Wheel Slider general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/WheelSlider_Test_Page.html");
	});

	before(() => {
		browser.$("#wheelslider").setProperty("_items",["1","2","3","4","5","6","7"]);
		browser.$("#wheelslider").setProperty("value","1");
		browser.$("#wheelslider").setProperty("expanded",true);
		browser.$("body").setAttribute("class", "sapUiSizeCompact");
	});

	it("tests slider's label rendering", () => {
		const textValue = browser.$("#wheelslider").shadow$$(".ui5-wheelslider-label")[0].getText();

		assert.strictEqual(textValue, "Test", "Slider text is rendered");
	});

	it("Arrow down button is working", () => {
		const slider = browser.$("#wheelslider");
		const button = slider.shadow$$(".ui5-wheelslider-arrow")[1];
		button.click();

		assert.strictEqual(slider.getValue(), "2", "Wheel Slider button arrow down is working");
	});

	it("Arrow up button is working", () => {
		const slider = browser.$("#wheelslider");

		const button = slider.shadow$$(".ui5-wheelslider-arrow")[0];

		button.click();

		assert.strictEqual(slider.getValue(), "1", "Wheel Slider button arrow up is working");
	});

	it("Keyboard arrow down is working", () => {
		const slider = browser.$("#wheelslider");

		slider.keys("ArrowDown");

		assert.strictEqual(slider.getValue(), "2", "Wheel Slider keyboard handling for arrow down is working");
	});

	it("Keyboard Arrow up is working", () => {
		const slider = browser.$("#wheelslider");

		slider.keys("ArrowUp");

		assert.strictEqual(slider.getValue(), "1", "Wheel Slider keyboard handling for arrow up is working");
	});

	it("Click on element selects element", () => {
		const slider = browser.$("#wheelslider");
		const sliderElements = slider.shadow$$(".ui5-wheelslider-item");

		sliderElements[3].click();

		assert.strictEqual(slider.getValue(), "4", "Wheel Slider pick elements with click works");
	});
});
