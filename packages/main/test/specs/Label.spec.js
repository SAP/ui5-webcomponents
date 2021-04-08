const assert = require("chai").assert;

describe("General API", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Label.html");
	});

	it("tests initial rendering", () => {
		const labelRoot = browser.$("#basic-label").shadow$(".ui5-label-root");

		assert.ok(labelRoot, "Label is rendered");
	})

	it("changes text of ui5-label", () => {
		const INITIAL_TEXT = "Basic Label";
		const NEW_TEXT = "Advanced Label";
		assert.strictEqual(browser.execute("return document.querySelector('#basic-label').shadowRoot.querySelector('slot').assignedNodes()[0].textContent"), INITIAL_TEXT, "Initial text is correct");

		//change label's text
		browser.execute(`document.querySelector('#basic-label').innerHTML = '${NEW_TEXT}'`);
		assert.strictEqual(browser.execute("return document.querySelector('#basic-label').shadowRoot.querySelector('slot').assignedNodes()[0].textContent"), NEW_TEXT, "Text of label should be changed");
	});

	it("should show required star", () => {
		const requiredLabelContent = browser.execute(`
			return window.getComputedStyle(document.querySelector('#required-label').shadowRoot.querySelector(".ui5-label-required-colon"), ':after').content;
		`);

		assert.strictEqual(requiredLabelContent, '"*"', "after's content should be *");
	});

	it("tests show-colon does not force truncation", () => {
		const labelWithNoColon = browser.$("#showColon-false").shadow$(".ui5-label-text-wrapper");
		const labelWithShowColon = browser.$("#showColon-true").shadow$(".ui5-label-text-wrapper");

		const labelWithNoColonSize = labelWithNoColon.getSize();
		const labelWithShowColonSize = labelWithShowColon.getSize();

		// Comparing ui5-label(s) "Basic Label" and "Basic Label:", but just the "Basic Label" part,
		// that should be equal if no trunctation and not equal if truncated.
		assert.strictEqual(labelWithNoColonSize.width, labelWithShowColonSize.width, "Both texts are equal in width");
	});

	it("should wrap the text of the label", () => {
		const wrappingLabel = browser.$("#wrapping-label");
		const truncatingLabel = browser.$("#truncated-label");

		assert.ok(wrappingLabel.getSize().height > truncatingLabel.getSize().height);
		assert.strictEqual(truncatingLabel.getSize().height, 16, "truncated label should be single line");
	});

	describe("linked element with 'for' property", () => {
		it("should focus ui5-input on click", () => {
			const label = browser.$("#label-for-ui5-input");
			const field = browser.$("#form-ui5-input");

			label.click();

			assert.ok(field.isFocused(), "ui5-input should be focussed");
		});

		it("should focus native input on click", () => {
			const label = browser.$("#label-for-native-input");
			const field = browser.$("#native-input");

			label.click();

			assert.ok(field.isFocused(), "native input should be focussed");
		});

		it("should focus ui5-textarea on click", () => {
			const label = browser.$("#label-for-ui5-textarea");
			const field = browser.$("#ui5-textarea");

			label.click();

			assert.ok(field.isFocused(), "ui5-textarea should be focussed");
		});

		it("should focus native textarea on click", () => {
			const label = browser.$("#label-for-native-textarea");
			const field = browser.$("#native-textarea");

			label.click();

			assert.ok(field.isFocused(), "native-textarea should be focussed");
		});

		it("should focus ui5-date-picker on click", () => {
			const label = browser.$("#label-for-ui5-datepicker");
			const field = browser.$("#ui5-datepicker");

			label.click();

			assert.ok(field.isFocused(), "ui5-datepicker should be focussed");
		});
	});
});
