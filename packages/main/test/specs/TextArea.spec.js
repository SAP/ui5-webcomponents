const assert = require('assert');

describe("when enabled", () => {
	browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/TextArea.html');

	it("can type inside", () => {
		const textarea = browser.findElementDeep("#basic-textarea");
		const textareaInner = browser.findElementDeep("#basic-textarea >>> textarea");

		assert.strictEqual(textarea.getProperty("value"), "Test", "Initial value is correct");

		textareaInner.addValue("a");
		assert.strictEqual(textarea.getProperty("value"), "Testa", "Value is changed");
	});

	it("can not be edittable when disabled", () => {
		const textAreaInnerDisabled = browser.findElementDeep("#disabled-textarea >>> textarea");

		assert.strictEqual(textAreaInnerDisabled.isEnabled(), false, "Should not be enabled");
	});

	describe("when growing", () => {
		it("Should have 8 rows and grow", () => {
			const textArea = browser.findElementDeep("#eight-rows-textarea");
			const textAreaInner = browser.findElementDeep("#eight-rows-textarea >>> textarea");
	
			const initialSize = textArea.getSize();
			textAreaInner.setValue(`1\n2\n3\n4\n5\n6\n7\n8`);

			const sizeBeforeGrow = textArea.getSize();
			assert.strictEqual(initialSize.height, sizeBeforeGrow.height, "TextArea should not grow before it reaches its 8th line");

			textAreaInner.addValue(`\n9`);
			const sizeAfterGrow = textArea.getSize();

			assert.ok(sizeBeforeGrow.height < sizeAfterGrow.height, "TextArea should grow");
		});

		it("Should grow up to 4 lines", () => {
			const textArea = browser.findElementDeep("#growing-ta-to-four");
			const textAreaInner = browser.findElementDeep("#growing-ta-to-four >>> textarea");

			const initialSize = textArea.getSize();

			textAreaInner.setValue(`1\n2`);
			const size2lines = textArea.getSize();

			textAreaInner.addValue(`\n3\n4`);
			const size4lines = textArea.getSize();

			textAreaInner.addValue(`\n5\n6`);
			const size6lines = textArea.getSize();

			assert.ok(initialSize.height < size2lines.height, "TA should grow when having 2 lines of text")
			assert.ok(size2lines.height < size4lines.height, "TA should grow up to 4 lines");
			assert.strictEqual(size6lines.height, size4lines.height, "TA should not grow more than 4 lines");
		});
	});

	describe("When having max length set", () => {

		it("prevents input when max is reached", () => {
			const textAreaInner = browser.findElementDeep("#ta-max-length >>> textarea");

			textAreaInner.setValue(`123456789123456789121111`);

			assert.strictEqual(textAreaInner.getValue(), "12345678912345678912", "Value has 20 symbols length");
		});

		describe("Show exceeded text", () => {

			it("Shows counter", () => {
				const textAreaInner = browser.findElementDeep("#show-max-length >>> textarea");
				const counter = browser.findElementDeep("#show-max-length >>> .sapWCTextAreaExceededText");

				textAreaInner.setValue(`123456789123456789121111`);

				const count = parseInt(counter.getText());

				assert.strictEqual(count, 4, "4 symbols should exceed");
			});
		});
	});
});