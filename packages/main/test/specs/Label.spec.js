const assert = require("chai").assert;

describe("General API", () => {
	before(async () => {
		await browser.url(`test/pages/Label.html`);
	});

	it("tests initial rendering", async () => {
		const labelRoot = await browser.$("#basic-label").shadow$(".ui5-label-root");

		assert.ok(labelRoot, "Label is rendered");
	})

	it("changes text of ui5-label", async () => {
		const INITIAL_TEXT = "Basic Label";
		const NEW_TEXT = "Advanced Label";
		assert.strictEqual(await browser.execute("return document.querySelector('#basic-label').shadowRoot.querySelector('slot').assignedNodes()[0].textContent"), INITIAL_TEXT, "Initial text is correct");

		//change label's text
		await browser.execute(`document.querySelector('#basic-label').innerHTML = '${NEW_TEXT}'`);
		assert.strictEqual(await browser.execute("return document.querySelector('#basic-label').shadowRoot.querySelector('slot').assignedNodes()[0].textContent"), NEW_TEXT, "Text of label should be changed");
	});

	it("should show required star", async () => {
		const requiredLabelContent = await browser.execute(`
			return window.getComputedStyle(document.querySelector('#required-label').shadowRoot.querySelector(".ui5-label-required-colon"), ':after').content;
		`);

		assert.strictEqual(requiredLabelContent, '"*"', "after's content should be *");
	});

	it("tests show-colon does not force truncation", async () => {
		const labelWithNoColon = await browser.$("#showColon-false").shadow$(".ui5-label-text-wrapper");
		const labelWithShowColon = await browser.$("#showColon-true").shadow$(".ui5-label-text-wrapper");

		const labelWithNoColonSize = await labelWithNoColon.getSize();
		const labelWithShowColonSize = await labelWithShowColon.getSize();

		// Comparing ui5-label(s) "Basic Label" and "Basic Label:", but just the "Basic Label" part,
		// that should be equal if no trunctation and not equal if truncated.
		assert.strictEqual(labelWithNoColonSize.width, labelWithShowColonSize.width, "Both texts are equal in width");
	});

	it("should wrap the text of the label", async () => {
		const wrappingLabel = await browser.$("#wrapping-label");
		const truncatingLabel = await browser.$("#truncated-label");

		assert.isAbove((await wrappingLabel.getSize()).height, (await truncatingLabel.getSize()).height);
		assert.strictEqual((await truncatingLabel.getSize()).height, 16, "truncated label should be single line");
	});

	describe("linked element with 'for' property", async () => {
		it("should focus ui5-input on click", async () => {
			const label = await browser.$("#label-for-ui5-input");
			const field = await browser.$("#form-ui5-input");

			await label.click();

			assert.ok(await field.isFocused(), "ui5-input should be focussed");
		});

		it("should focus native input on click", async () => {
			const label = await browser.$("#label-for-native-input");
			const field = await browser.$("#native-input");

			await label.click();

			assert.ok(await field.isFocused(), "native input should be focussed");
		});

		it("should focus ui5-textarea on click", async () => {
			const label = await browser.$("#label-for-ui5-textarea");
			const field = await browser.$("#ui5-textarea");

			await label.click();

			assert.ok(await field.isFocused(), "ui5-textarea should be focussed");
		});

		it("should focus native textarea on click", async () => {
			const label = await browser.$("#label-for-native-textarea");
			const field = await browser.$("#native-textarea");

			await label.click();

			assert.ok(await field.isFocused(), "native-textarea should be focussed");
		});

		it("should focus ui5-date-picker on click", async () => {
			const label = await browser.$("#label-for-ui5-datepicker");
			const field = await browser.$("#ui5-datepicker");

			await label.click();

			assert.ok(await field.isFocused(), "ui5-datepicker should be focussed");
		});

		it("should focus within a shadow root", async () => {
			const customComponent = await browser.$("#custom-element-with-label");
			const label = await customComponent.shadow$('ui5-label[for="input"]');
			const input = await customComponent.shadow$("#input");

			await label.click();

			const activeElement = await browser.custom$("activeElement", "#custom-element-with-label");
			assert.strictEqual(await activeElement.getProperty("id"), await input.getProperty("id"), "the input is focused after the label was clicked");
		});

	});
});
