const assert = require("chai").assert;

describe("Attributes propagation", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/TextArea.html");
	});

	it("Should change the placeholder of the inner textarea", () => {
		const textarea = $("#basic-textarea");
		const sExpected = "New placeholder text";

		browser.execute(() => {
			document.getElementById("basic-textarea").setAttribute("placeholder", "New placeholder text");
		});

		assert.strictEqual(textarea.shadow$("textarea").getProperty("placeholder"), sExpected, "The placeholder was set correctly");
	});

	it("Disabled attribute is propagated properly", () => {
		assert.ok(browser.$("#disabled-textarea").shadow$("textarea").getAttribute("disabled"), "Disabled property was propagated");
	});

	it("Redonly attribute is propagated properly", () => {
		assert.ok(browser.$("#readonly-textarea").shadow$("textarea").getAttribute("readonly"), "Readonly property was propagated");
	});

	it("Required attribute is propagated properly", () => {
		assert.strictEqual(browser.$("#required-textarea").shadow$("textarea").getAttribute("aria-required"), "true", "Aria-required attribute is set correctly");
		assert.strictEqual(browser.$("#basic-textarea").shadow$("textarea").getAttribute("aria-required"), "false", "Aria-required attribute is set correctly");
	});

	it("Value attribute is propagated properly", () => {
		const sExpectedValue = "Test";

		browser.execute(() => {
			document.getElementById("basic-textarea").value = "Test";
		});

		assert.strictEqual(browser.$("#basic-textarea").shadow$("textarea").getValue(), sExpectedValue, "Value property was set correctly");
	});

	it("Tests aria-label and aria-labelledby", () => {
		const textArea1 = browser.$("#textAreaAriaLabel").shadow$("textarea");
		const textArea2 = browser.$("#textAreaAriaLabelledBy").shadow$("textarea");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text 20 characters remaining";

		assert.strictEqual(textArea1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(textArea2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
	});
});

describe("disabled and readonly textarea", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/TextArea.html");
	});

	it("can not be edited when disabled", () => {
		const textAreaInnerDisabled = browser.$("#disabled-textarea").shadow$("textarea");

		assert.strictEqual(textAreaInnerDisabled.isEnabled(), false, "Should not be enabled");
	});

	it("can not be edited when readonly", () => {
		const textAreaInnerReadonly = browser.$("#readonly-textarea");

		textAreaInnerReadonly.click();
		textAreaInnerReadonly.keys("a");
		textAreaInnerReadonly.keys("b");
		textAreaInnerReadonly.keys("c");

		assert.strictEqual(textAreaInnerReadonly.getValue(), "", "Value should be empty string");
	});
});

describe("when enabled", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/TextArea.html");
	});

	it("shows value state message", () => {
		const textarea = $("#textarea-value-state-msg")
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#textarea-value-state-msg");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")

		// act
		textarea.click();

		// assert
		assert.ok(popover.isDisplayedInViewport(), "The value state message popover is displayed");
	});

	it("does not show value state msg when valueState='None'", () => {
		const textarea = browser.$("#basic-textarea");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#basic-textarea");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")

		// act
		textarea.click();

		// assert
		assert.ok(!popover.isDisplayedInViewport(), "The value state message popover is not displayed");
	});

	it("can type inside", () => {
		const textarea = browser.$("#basic-textarea");
		const textareaInner = browser.$("#basic-textarea").shadow$("textarea");

		browser.execute(() => {
			document.getElementById("basic-textarea").value = "Test";
		}); // set the value again since browser.url reset the page
		assert.strictEqual(textarea.getProperty("value"), "Test", "Initial value is correct");

		textareaInner.addValue("a");
		assert.strictEqual(textarea.getProperty("value"), "Testa", "Value is changed");
	});

	it("fires change", () => {
		const textarea = $("#textarea-change");
		const changeResult = $("#changeResult");

		// Start typing.
		textarea.click();
		textarea.keys("a");
		textarea.keys("b");
		textarea.keys("c");

		// Click somewhere else to focus out - should fire change event.
		changeResult.click();

		// Get back and continue typing.
		textarea.click();
		textarea.keys("d");
		textarea.keys("e");
		textarea.keys("f");

		// Click somewhere else to force focus out - should fire change event.
		changeResult.click();

		assert.strictEqual(changeResult.getValue(), "2", "change is called twice");
	});

	it("fires input", () => {
		const textarea = $("#textarea-input");
		const inputResult = $("#inputResult");

		textarea.click();
		textarea.keys("a");
		textarea.keys("b");
		textarea.keys("c");

		assert.strictEqual(inputResult.getValue(), "3", "input is fired 3 times");
	});

	describe("when growing", () => {
		it("Should have 8 rows and grow", () => {
			const textArea = browser.$("#eight-rows-textarea");
			const textAreaInner = browser.$("#eight-rows-textarea").shadow$("textarea");

			const initialSize = textArea.getSize();
			textAreaInner.setValue(`1\n`);
			textAreaInner.setValue(`2\n`);
			textAreaInner.setValue(`3\n`);
			textAreaInner.setValue(`4\n`);
			textAreaInner.setValue(`5\n`);
			textAreaInner.setValue(`6\n`);
			textAreaInner.setValue(`7\n`);
			textAreaInner.setValue(`8`);

			const sizeBeforeGrow = textArea.getSize();
			assert.strictEqual(initialSize.height, sizeBeforeGrow.height, "TextArea should not grow before it reaches its 8th line");

			textAreaInner.addValue(`\n9`);
			const sizeAfterGrow = textArea.getSize();

			assert.ok(sizeBeforeGrow.height < sizeAfterGrow.height, "TextArea should grow");
		});

		it("Should grow up to 4 lines", () => {
			const textArea = browser.$("#growing-ta-to-four");
			const textAreaInner = browser.$("#growing-ta-to-four").shadow$("textarea");

			const initialSize = textArea.getSize();

			textAreaInner.setValue(`1\n2`);
			const size2lines = textArea.getSize();

			textAreaInner.addValue(`\n3\n4`);
			const size4lines = textArea.getSize();

			textAreaInner.addValue(`\n5\n6`);
			const size6lines = textArea.getSize();

			assert.ok(initialSize.height < size2lines.height, "TA should grow when having 2 lines of text");
			assert.ok(size2lines.height < size4lines.height, "TA should grow up to 4 lines");
			assert.strictEqual(size6lines.height, size4lines.height, "TA should not grow more than 4 lines");
		});
	});

	describe("When having max length set", () => {

		it("prevents input when max is reached", () => {
			const textAreaInner = browser.$("#ta-max-length").shadow$("textarea");

			textAreaInner.setValue(`123456789123456789121111`);

			assert.strictEqual(textAreaInner.getValue(), "12345678912345678912", "Value has 20 symbols length");
		});

		describe("Show exceeded text", () => {

			it("Shows counter", () => {
				const textAreaInner = browser.$("#show-max-length").shadow$("textarea");
				const counter = browser.$("#show-max-length").shadow$(".ui5-textarea-exceeded-text");

				textAreaInner.setValue(`123456789123456789121111`);

				const count = parseInt(counter.getText());

				assert.strictEqual(count, 4, "4 symbols should exceed");
			});
		});
	});
});
