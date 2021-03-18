const assert = require("chai").assert;

const assertBooleanProperty = (el, prop) => {
	assert.strictEqual(el.getProperty(prop), false, "the value should be false by default.");
}

const assertHidden = component => {
	assert.strictEqual(component.isDisplayedInViewport(), false, "the component is hidden.");
}

describe("General assertions", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Components.html");
	});

	it("tests boolean props default", () => {
		const button = browser.$("#btn");
		const cb = browser.$("#cb");
		const dialog = browser.$("#dg");
		const datepicker = browser.$("#dp");
		const input = browser.$("#inp");
		const link = browser.$("#ln");
		const label = browser.$("#lbl");
		const panel = browser.$("#panel");
		const radiobutton = browser.$("#radioBtn");
		const sw = browser.$("#sw");
		const toggleBtn = browser.$("#toggleBtn");
		const title = browser.$("#title");

		// Button
		assertBooleanProperty(button, "submits");

		// CheckBox
		assertBooleanProperty(cb, "readonly");
		assertBooleanProperty(cb, "checked");
		assertBooleanProperty(cb, "disabled");

		// DatePicker
		assertBooleanProperty(datepicker, "readonly");
		assertBooleanProperty(datepicker, "disabled");

		//  Dialog
		assertBooleanProperty(dialog, "stretch");

		//  Label
		assertBooleanProperty(label, "wrap");
		assertBooleanProperty(label, "required");

		//Link
		assertBooleanProperty(link, "wrap");
		assertBooleanProperty(link, "disabled");

		// Input
		assertBooleanProperty(input, "readonly");
		assertBooleanProperty(input, "showSuggestions");
		assertBooleanProperty(input, "disabled");

		// Panel
		assertBooleanProperty(panel, "collapsed");
		assertBooleanProperty(panel, "fixed");

		// RadioButton
		assertBooleanProperty(radiobutton, "readonly");
		assertBooleanProperty(radiobutton, "selected");
		assertBooleanProperty(radiobutton, "disabled");

		// Switch
		assertBooleanProperty(sw, "checked");
		assertBooleanProperty(sw, "disabled");

		// Title
		assertBooleanProperty(title, "wrap");

		// ToggleButton
		assertBooleanProperty(toggleBtn, "pressed");
	});

	it("tests components with 'hidden' property are not visible", () => {
		[
			browser.$("#badge2"),
			browser.$("#busyIndicator2"),
			browser.$("#btn2"),
			browser.$("#card2"),
			browser.$("#cb2"),
			browser.$("#dp2"),
			browser.$("#icon2"),
			browser.$("#inp2"),
			browser.$("#ln2"),
			browser.$("#lbl2"),
			browser.$("#list2"),
			browser.$("#ms2"),
			browser.$("#mcbx2"),
			browser.$("#p2"),
			browser.$("#radioBtn2"),
			browser.$("#select2"),
			browser.$("#sw2"),
			browser.$("#txtarea2"),
			browser.$("#timeline2"),
			browser.$("#toggleBtn2"),
			browser.$("#title2"),
			browser.$("#tbl2"),
			browser.$("#tc2")
		].forEach(assertHidden);
	});
});
