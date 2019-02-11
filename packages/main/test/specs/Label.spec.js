const assert = require('assert');

describe("General API", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Label.html');
	
	it("should show required star", () => {
		const requiredLabelContent = browser.execute(`
			return window.getComputedStyle(document.querySelector('#required-label').shadowRoot.querySelector(".sapMLabel"), ':before').content;
		`);

		assert.strictEqual(requiredLabelContent, '"*"', "before's content should be *");
	});

	it("should wrap the text of the label", () => {
		const wrappingLabel = browser.findElementDeep("#wrapping-label");
		const truncatingLabel = browser.findElementDeep("#truncated-label");

		assert.ok(wrappingLabel.getSize().height > truncatingLabel.getSize().height);
		assert.strictEqual(truncatingLabel.getSize().height, 16, "truncated label should be single line");
	});

	describe("linked element with 'for' property", () => {
		it("should focus ui5-input on click", () => {
			const label = browser.findElementDeep("#label-for-ui5-input");
			const field = browser.findElementDeep("#form-ui5-input");

			label.click();

			assert.ok(field.isFocused(), "ui5-input should be focussed");
		});

		it("should focus native input on click", () => {
			const label = browser.findElementDeep("#label-for-native-input");
			const field = browser.findElementDeep("#native-input");

			label.click();

			assert.ok(field.isFocused(), "native input should be focussed");
		});

		it("should focus ui5-textarea on click", () => {
			const label = browser.findElementDeep("#label-for-ui5-textarea");
			const field = browser.findElementDeep("#ui5-textarea");

			label.click();

			assert.ok(field.isFocused(), "ui5-textarea should be focussed");
		});

		it("should focus native textarea on click", () => {
			const label = browser.findElementDeep("#label-for-native-textarea");
			const field = browser.findElementDeep("#native-textarea");

			label.click();

			assert.ok(field.isFocused(), "native-textarea should be focussed");
		});

		it("should focus ui5-datepicker on click", () => {
			const label = browser.findElementDeep("#label-for-ui5-datepicker");
			const field = browser.findElementDeep("#ui5-datepicker");

			label.click();

			assert.ok(field.isFocused(), "ui5-datepicker should be focussed");
		});
	});
});