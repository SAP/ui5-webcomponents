const assert = require("chai").assert;

describe("Wheel Slider general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/WheelSlider_Test_Page.html`);
	});

	before(async () => {
		await browser.$("#wheelslider").setProperty("_items",["1","2","3","4","5","6","7"]);
		await browser.$("#wheelslider").setProperty("value","1");
		await browser.$("#wheelslider").setProperty("expanded",true);
		await browser.$("body").setAttribute("class", "sapUiSizeCompact");
	});

	it("tests slider's label rendering", async () => {
		const textValue = await (await browser.$("#wheelslider").shadow$$(".ui5-wheelslider-label"))[0].getText();

		assert.strictEqual(textValue, "Test", "Slider text is rendered");
	});

	it("Arrow down button is working", async () => {
		const slider = await browser.$("#wheelslider");
		const button = (await slider.shadow$$(".ui5-wheelslider-arrow"))[1];
		await button.click();

		assert.strictEqual(await slider.getValue(), "2", "Wheel Slider button arrow down is working");
	});

	it("Arrow up button is working", async () => {
		const slider = await browser.$("#wheelslider");

		const button = await slider.shadow$$(".ui5-wheelslider-arrow")[0];

		await button.click();

		assert.strictEqual(await slider.getValue(), "1", "Wheel Slider button arrow up is working");
	});

	it("Keyboard arrow down is working", async () => {
		const slider = await browser.$("#wheelslider");

		await slider.keys("ArrowDown");

		assert.strictEqual(await slider.getValue(), "2", "Wheel Slider keyboard handling for arrow down is working");
	});

	it("Keyboard Arrow up is working", async () => {
		const slider = await browser.$("#wheelslider");

		await slider.keys("ArrowUp");

		assert.strictEqual(await slider.getValue(), "1", "Wheel Slider keyboard handling for arrow up is working");
	});

	it("Click on element selects element", async () => {
		const slider = await browser.$("#wheelslider");
		const sliderElements = await slider.shadow$$(".ui5-wheelslider-item");

		await sliderElements[3].click();

		assert.strictEqual(await slider.getValue(), "4", "Wheel Slider pick elements with click works");
	});
});
