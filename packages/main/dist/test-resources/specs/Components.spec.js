const assert = require("chai").assert;
const PORT = require("./_port.js");

const assertBooleanProperty = async (el, prop) => {
	assert.notOk(await el.getProperty(prop),  "the value should be false by default.");
}

const assertHidden = async component => {
	assert.notOk(await component.isDisplayedInViewport(), "the component is hidden.");
}

describe("General assertions", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Components.html`);
	});

	it("tests boolean props default", async () => {
		const button = await browser.$("#btn");
		const cb = await browser.$("#cb");
		const dialog = await browser.$("#dg");
		const datepicker = await browser.$("#dp");
		const input = await browser.$("#inp");
		const link = await browser.$("#ln");
		const label = await browser.$("#lbl");
		const panel = await browser.$("#panel");
		const radiobutton = await browser.$("#radioBtn");
		const sw = await browser.$("#sw");
		const toggleBtn = await browser.$("#toggleBtn");

		// Button
		await assertBooleanProperty(button, "submits");

		// CheckBox
		await assertBooleanProperty(cb, "readonly");
		await assertBooleanProperty(cb, "checked");
		await assertBooleanProperty(cb, "disabled");

		// DatePicker
		await assertBooleanProperty(datepicker, "readonly");
		await assertBooleanProperty(datepicker, "disabled");

		//  Dialog
		await assertBooleanProperty(dialog, "stretch");

		//  Label
		await assertBooleanProperty(label, "required");

		//Link
		await assertBooleanProperty(link, "disabled");

		// Input
		await assertBooleanProperty(input, "readonly");
		await assertBooleanProperty(input, "showSuggestions");
		await assertBooleanProperty(input, "disabled");

		// Panel
		await assertBooleanProperty(panel, "collapsed");
		await assertBooleanProperty(panel, "fixed");

		// RadioButton
		await assertBooleanProperty(radiobutton, "readonly");
		await assertBooleanProperty(radiobutton, "checked");
		await assertBooleanProperty(radiobutton, "disabled");

		// Switch
		await assertBooleanProperty(sw, "checked");
		await assertBooleanProperty(sw, "disabled");

		// ToggleButton
		await assertBooleanProperty(toggleBtn, "pressed");
	});

	it("tests components with 'hidden' property are not visible", async () => {
		[
			await browser.$("#badge2"),
			await browser.$("#busyIndicator2"),
			await browser.$("#btn2"),
			await browser.$("#card2"),
			await browser.$("#cb2"),
			await browser.$("#dp2"),
			await browser.$("#icon2"),
			await browser.$("#inp2"),
			await browser.$("#ln2"),
			await browser.$("#lbl2"),
			await browser.$("#list2"),
			await browser.$("#ms2"),
			await browser.$("#mcbx2"),
			await browser.$("#p2"),
			await browser.$("#radioBtn2"),
			await browser.$("#select2"),
			await browser.$("#sw2"),
			await browser.$("#txtarea2"),
			await browser.$("#timeline2"),
			await browser.$("#toggleBtn2"),
			await browser.$("#title2"),
			await browser.$("#tbl2"),
			await browser.$("#tc2")
		].forEach(assertHidden);
	});
});
