const assert = require('assert');

describe("General API", () => {
	browser.url('http://localhost:8080/test-resources/pages/Label.html');
	
	it("should show required star", () => {
		const requiredLabelContent = browser.execute(`
			return window.getComputedStyle(document.querySelector('#required-label').shadowRoot.querySelector(".ui5-label-required-colon"), ':after').content;
		`);

		assert.strictEqual(requiredLabelContent, '"*"', "after's content should be *");
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

		it("should focus ui5-datepicker on click", () => {
			const label = browser.$("#label-for-ui5-datepicker");
			const field = browser.$("#ui5-datepicker");

			label.click();

			assert.ok(field.isFocused(), "ui5-datepicker should be focussed");
		});
	});
});
