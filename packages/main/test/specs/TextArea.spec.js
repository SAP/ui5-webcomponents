const assert = require("chai").assert;

describe("Attributes propagation", () => {
	before(async () => {
		await browser.url(`test/pages/TextArea.html`);
	});

	it("Should change the placeholder of the inner textarea", async () => {
		const textarea = await browser.$("#basic-textarea");
		const sExpected = "New placeholder text";

		await browser.$("#basic-textarea").setAttribute("placeholder", "New placeholder text");

		assert.strictEqual(await textarea.shadow$("textarea").getProperty("placeholder"), sExpected, "The placeholder was set correctly");
	});

	it("Disabled attribute is propagated properly", async () => {
		assert.ok(await browser.$("#disabled-textarea").shadow$("textarea").getAttribute("disabled"), "Disabled property was propagated");
	});

	it("Redonly attribute is propagated properly", async () => {
		assert.ok(await browser.$("#readonly-textarea").shadow$("textarea").getAttribute("readonly"), "Readonly property was propagated");
	});

	it("Required attribute is propagated properly", async () => {
		assert.strictEqual(await browser.$("#required-textarea").shadow$("textarea").getAttribute("aria-required"), "true", "Aria-required attribute is set correctly");
		assert.strictEqual(await browser.$("#basic-textarea").shadow$("textarea").getAttribute("aria-required"), "false", "Aria-required attribute is set correctly");
	});

	it("Value attribute is propagated properly", async () => {
		const sExpectedValue = "Test";

		await browser.$("#basic-textarea").setProperty("value", "Test");

		assert.strictEqual(await browser.$("#basic-textarea").shadow$("textarea").getValue(), sExpectedValue, "Value property was set correctly");
	});

	it("Tests aria-label and aria-labelledby", async () => {
		const textArea1 = await browser.$("#textAreaAriaLabel").shadow$("textarea");
		const textArea2 = await browser.$("#textAreaAriaLabelledBy").shadow$("textarea");
		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text 20 characters remaining";

		assert.strictEqual(await textArea1.getAttribute("aria-label"), EXPECTED_ARIA_LABEL1,
			"The aria-label is correctly set internally.");
		assert.strictEqual(await textArea2.getAttribute("aria-label"), EXPECTED_ARIA_LABEL2,
			"The aria-label is correctly set internally.");
	});

	it("Checks if aria-invalid is set correctly", async () => {
		const textAreaError = await browser.$("#basic-textarea-error");
		const textAreaWarning = await browser.$("#basic-textarea-warning");
		const innertextAreaError = await textAreaError.shadow$("textarea");
		const innertextAreaWarning = await textAreaWarning.shadow$("textarea");

		assert.notOk(await innertextAreaWarning.getAttribute("aria-invalid"), "aria-invalid is not rendered");
		assert.strictEqual(await innertextAreaError.getAttribute("aria-invalid"), "true", "aria-invalid is set to true");
	});
});

describe("disabled and readonly textarea", () => {
	before(async () => {
		await browser.url(`test/pages/TextArea.html`);
	});

	it("can not be edited when disabled", async () => {
		const textAreaInnerDisabled = await browser.$("#disabled-textarea").shadow$("textarea");

		assert.notOk(await textAreaInnerDisabled.isEnabled(), "Should not be enabled");
	});

	it("can not be edited when readonly", async () => {
		const textAreaInnerReadonly = await browser.$("#readonly-textarea");

		await textAreaInnerReadonly.click();
		await textAreaInnerReadonly.keys("a");
		await textAreaInnerReadonly.keys("b");
		await textAreaInnerReadonly.keys("c");

		assert.strictEqual(await textAreaInnerReadonly.getValue(), "", "Value should be empty string");
	});
});

describe("when enabled", () => {
	before(async () => {
		await browser.url(`test/pages/TextArea.html`);
	});

	it("shows value state message", async () => {
		const textarea = await browser.$("#textarea-value-state-msg")
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#textarea-value-state-msg");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")

		// act
		await textarea.click();

		// assert
		assert.ok(await popover.isDisplayedInViewport(), "The value state message popover is displayed");
	});

	it("does not show value state msg when valueState='None'", async () => {
		const textarea = await browser.$("#basic-textarea");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#basic-textarea");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")

		// act
		await textarea.click();

		// assert
		assert.notOk(await popover.isDisplayedInViewport(), "The value state message popover is not displayed");
	});

	it("Should not open value state message when textarea is in readonly state", async () => {
		const textarea = await browser.$("#readonly-value-state-textarea");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#readonly-value-state-textarea");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")

		// act
		await textarea.click();

		// assert
		assert.notOk(await popover.isDisplayedInViewport(), "Popover with valueStateMessage should not be opened.");
	});

	it("can type inside", async () => {
		const textarea = await browser.$("#basic-textarea");
		const textareaInner = await browser.$("#basic-textarea").shadow$("textarea");

		await browser.$("#basic-textarea").setProperty("value", "Test");
		assert.strictEqual(await textarea.getProperty("value"), "Test", "Initial value is correct");

		await textareaInner.addValue("a");
		assert.strictEqual(await textarea.getProperty("value"), "Testa", "Value is changed");
	});

	it("fires change", async () => {
		const textarea = await browser.$("#textarea-change");
		const changeResult = await browser.$("#changeResult");

		// Start typing.
		await textarea.click();
		await textarea.keys("a");
		await textarea.keys("b");
		await textarea.keys("c");

		// Click somewhere else to focus out - should fire change event.
		await changeResult.click();

		// Get back and continue typing.
		await textarea.click();
		await textarea.keys("d");
		await textarea.keys("e");
		await textarea.keys("f");

		// Click somewhere else to force focus out - should fire change event.
		await changeResult.click();

		assert.strictEqual(await changeResult.getValue(), "2", "change is called twice");
	});

	it("fires input", async () => {
		const textarea = await browser.$("#textarea-input");
		const inputResult = await browser.$("#inputResult");

		await textarea.click();
		await textarea.keys("a");
		await textarea.keys("b");
		await textarea.keys("c");

		assert.strictEqual(await inputResult.getValue(), "3", "input is fired 3 times");
	});

	describe("when growing", () => {
		it("Should have 8 rows and grow", async () => {
			const textArea = await browser.$("#eight-rows-textarea");
			const textAreaInner = await browser.$("#eight-rows-textarea").shadow$("textarea");

			const initialSize = await textArea.getSize();
			await textAreaInner.setValue(`1\n`);
			await textAreaInner.addValue(`2\n`);
			await textAreaInner.addValue(`3\n`);
			await textAreaInner.addValue(`4\n`);
			await textAreaInner.addValue(`5\n`);
			await textAreaInner.addValue(`6\n`);
			await textAreaInner.addValue(`7\n`);
			await textAreaInner.addValue(`8`);

			const sizeBeforeGrow = await textArea.getSize();
			assert.strictEqual(initialSize.height, sizeBeforeGrow.height, "TextArea should not grow before it reaches its 8th line");

			await textAreaInner.addValue(`\n9`);
			const sizeAfterGrow = await textArea.getSize();

			assert.isBelow(sizeBeforeGrow.height, sizeAfterGrow.height, "TextArea should grow");
		});

		it("Should grow up to 4 lines", async () => {
			const textArea = await browser.$("#growing-ta-to-four");
			const textAreaInner = await browser.$("#growing-ta-to-four").shadow$("textarea");

			const initialSize = await textArea.getSize();

			await textAreaInner.setValue(`1\n2`);
			const size2lines = await textArea.getSize();

			await textAreaInner.addValue(`\n3\n4`);
			const size4lines = await textArea.getSize();

			await textAreaInner.addValue(`\n5\n6`);
			const size6lines = await textArea.getSize();

			assert.isBelow(initialSize.height, size2lines.height, "TA should grow when having 2 lines of text");
			assert.isBelow(size2lines.height, size4lines.height, "TA should grow up to 4 lines");
			assert.strictEqual(size6lines.height, size4lines.height, "TA should not grow more than 4 lines");
		});
	});

	describe("When having max length set", () => {

		it("prevents input when max is reached", async () => {
			const textAreaInner = await browser.$("#ta-max-length").shadow$("textarea");

			await textAreaInner.setValue(`123456789123456789121111`);

			assert.strictEqual(await textAreaInner.getValue(), "12345678912345678912", "Value has 20 symbols length");
		});

		describe("Show exceeded text", () => {

			it("Shows counter", async () => {
				const textAreaInner = await browser.$("#show-max-length").shadow$("textarea");
				const counter = await browser.$("#show-max-length").shadow$(".ui5-textarea-exceeded-text");

				await textAreaInner.setValue(`123456789123456789121111`);

				const count = parseInt(await counter.getText());

				assert.strictEqual(count, 4, "4 symbols should exceed");
			});

			it("Shows exceeded text when maxLength is 0", async () => {
				const textAreaInner = await browser.$("#show-max-length-0").shadow$("textarea");
				const counter = await browser.$("#show-max-length-0").shadow$(".ui5-textarea-exceeded-text");

				let count = parseInt(await counter.getText());
				assert.strictEqual(count, 0, "0 characters remaining");

				await textAreaInner.setValue(`1234`);
				count = parseInt(await counter.getText());

				assert.strictEqual(count, 4, "4 symbols should exceed");
			});
		});
	});
});

describe("Value update", () => {
	before(async () => {
		await browser.url(`test/pages/TextArea.html`);
	});

	it("Should revert the DOM value, when escape is pressed", async () => {
		const textarea = await browser.$("#basic-textarea");

		// act
		await textarea.click();
		await textarea.keys("1");
		await textarea.keys("2");

		// assert
		assert.strictEqual(await textarea.getProperty("value"), "12", "Value is updated");

		// act
		await textarea.keys("Escape");

		// assert
		assert.strictEqual(await textarea.getProperty("value"), "", "Value is reverted");
	});

	it("Value state type should be added to the screen readers default value states announcement", async () => {
		const tAreaError = await browser.$("#basic-textarea-error");
		const tAreaWarning = await browser.$("#basic-textarea-warning");
		const tAreaSuccess = await browser.$("#basic-textarea-success");
		const tAreaInformation = await browser.$("#basic-textarea-info");

		await tAreaError.click();

		let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#basic-textarea-error");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		let ariaHiddenText = await tAreaError.shadow$(".ui5-hidden-text").getText();
		let valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Error Invalid entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Invalid entry", "Displayed value state message text is correct");

		await tAreaWarning.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#basic-textarea-warning");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await tAreaWarning.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Warning Warning issued", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Warning issued", "Displayed value state message text is correct");

		await tAreaInformation.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#basic-textarea-info");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await tAreaInformation.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Information Informative entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Informative entry", "Displayed value state message text is correct");

		// With custom value state message
		const tAreaCustomError = await browser.$("#textarea-value-state-msg");
		await tAreaCustomError.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#textarea-value-state-msg");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await tAreaCustomError.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText.includes("Value State Error"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Extra long text"), true, "Displayed value state message text is correct");
	});
});
