const assert = require("assert");

const assertBooleanProperty = (el, prop) => {
	assert.strictEqual(el.getProperty(prop), false, "the value should be false by default.");
}

describe("Default values", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DefaultValues.html");

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
});