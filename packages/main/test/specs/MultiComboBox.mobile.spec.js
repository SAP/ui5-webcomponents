import { assert } from "chai";

describe("Basic interaction", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should render properly the mobile picker", async () => {
		const multiCombo = await browser.$("#multi1");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('input').click();

		const dialogInput = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-input");
		assert.ok(await dialogInput.isDisplayed(), "Input is displayed");

		const toggleSelectedButton =  await multiCombo.shadow$("ui5-responsive-popover").$("ui5-toggle-button");
		assert.ok(await toggleSelectedButton.isDisplayed(), "Toggle selected items button is displayed");

		const dialogCloseButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		assert.ok(await dialogCloseButton.isDisplayed(), "Close icon is displayed");

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		assert.ok(await dialogOkButton.isDisplayed(), "Ok button is displayed");
	});

	it("Should close the mobile picker dialog when pressing the close button", async () => {
		const picker =  await browser.$("#multi1").shadow$("ui5-responsive-popover");
		const dialogCloseButton = await picker.$(".ui5-responsive-popover-close-btn");

		assert.ok(await picker.isDisplayed(), "Picker is still opened");

		await dialogCloseButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should close the mobile picker dialog when pressing the OK button", async () => {
		const multiCombo = await browser.$("#multi1");
		const picker =  await multiCombo.shadow$("ui5-responsive-popover");
		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('input').click();

		assert.ok(await picker.isDisplayed(), "Picker is opened");

		await dialogOkButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should propagate the placeholder to the internal input", async () => {
		const multiCombo = await browser.$("#mcb");

		await multiCombo.scrollIntoView();
		await multiCombo.click();

		const dialogInput = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-input");
		assert.strictEqual(await dialogInput.getAttribute("placeholder"), await multiCombo.getAttribute("placeholder"), "Correct placeholder shown");

		const dialogCloseButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		await dialogCloseButton.click();
	});

	it("Should open the picker with preselected items only when n-more is clicked", async () => {
		const multiCombo = await browser.$("#multi1");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('ui5-tokenizer').shadow$(".ui5-tokenizer-more-text").click();

		const toggleSelectedButton =  await multiCombo.shadow$("ui5-responsive-popover").$("ui5-toggle-button");
		assert.strictEqual(await toggleSelectedButton.getAttribute("pressed"), "", "Toggle selected items button is pressed");

		const itemsCount = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-list").$$("ui5-li")
		assert.strictEqual(itemsCount.length, 3, "Only the selected items are shown");
	});

	it("Should show all items again when the toggle selected items is unpressed", async () => {
		const multiCombo = await browser.$("#multi1");

		const toggleSelectedButton =  await multiCombo.shadow$("ui5-responsive-popover").$("ui5-toggle-button");

		toggleSelectedButton.click();

		const itemsCount = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-list").$$("ui5-li")
		assert.strictEqual(itemsCount.length, 4, "All items are shown");

		const dialogCloseButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		await dialogCloseButton.click();
	});

	it("Should set clear icon to dialog's input", async () => {
		const cb = await $("#clear-icon-cb");

		await cb.shadow$("input").click();

		const resPopover = await cb.shadow$("ui5-responsive-popover");
		const dialogInput = await resPopover.$("[ui5-input]");

		assert.ok(await dialogInput.getProperty("showClearIcon"), "Clear icon should be propagated to internal ui5-input")
	});
});

describe("Typeahead", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const mcb = await browser.$("#mcb");
		const mcbInput = await mcb.shadow$("#ui5-multi-combobox-input");
		const sExpected = "Cosy";

		await mcbInput.click();

		const dialogInput = await mcb.shadow$("ui5-responsive-popover").$("ui5-input").shadow$("input");

		await dialogInput.click();
		await dialogInput.keys("c");

		assert.strictEqual(await dialogInput.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-no-typeahead");
		const mcbInput = await mcb.shadow$("#ui5-multi-combobox-input");

		await mcbInput.click();

		const dialogInput = await mcb.shadow$("ui5-responsive-popover").$("ui5-input").shadow$("input");

		await dialogInput.click();
		await dialogInput.keys("c");

		assert.strictEqual(await mcb.getProperty("value"), "c", "Value is not autocompleted");
	});

	it("Should make a selection on ENTER and discard on ESC", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		let tokens;

		const mcb = await browser.$("#mcb");
		const mcbInput = await mcb.shadow$("#ui5-multi-combobox-input");

		await mcbInput.click();

		const dialogInput = await mcb.shadow$("ui5-responsive-popover").$("ui5-input").shadow$("input");

		await dialogInput.click();
		await dialogInput.keys("c");
		await dialogInput.keys("Enter");

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.strictEqual(await mcb.getProperty("value"), "", "Value is autocompleted");
		assert.strictEqual(tokens.length, 1, "should have one token");

		await mcb.click();
		await dialogInput.click();
		await dialogInput.keys("c");
		await dialogInput.keys("Escape");

		assert.strictEqual(await mcb.getProperty("value"), "c", "Value is autocompleted");
	});
});

describe("Items selection", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should close the picker and create token when item is pressed in the picker", async () => {
		const multiCombo = await browser.$("#mcb");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		const listItem = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[0];
		await listItem.click();

		const token = await multiCombo.shadow$("ui5-tokenizer").$("ui5-token");
		assert.strictEqual(await token.getText(), "Cosy", "One token with correct text was added");
	});

	it("Should create token when item is selected in the picker and ok button is pressed", async () => {
		const multiCombo = await browser.$("#mcb");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[1].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		await dialogOkButton.click();

		const tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 2, "There are now two tokens");
	});

	it("Should not create token when item is selected in the picker and the 'Close' button is pressed", async () => {
		const multiCombo = await browser.$("#mcb");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[2].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const dialogCloseButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		await dialogCloseButton.click();

		const tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 2, "No new tokens were created");
	});

	it("Should not allow deselection when readonly", async () => {
		const multiCombo = await browser.$("#mcb-ro");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('ui5-tokenizer').shadow$(".ui5-tokenizer-more-text").click();

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[0].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const listItem = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[1];
		await listItem.click();

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		await dialogOkButton.click();

		const tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 3, "No deselection was performed");
	});

	it("Should not allow additional selection when readonly", async () => {
		const multiCombo = await browser.$("#mcb-ro");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('ui5-tokenizer').shadow$(".ui5-tokenizer-more-text").click();

		const toggleSelectedButton =  await multiCombo.shadow$("ui5-responsive-popover").$("ui5-toggle-button");
		await toggleSelectedButton.click();

		const listItem = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[1];
		await listItem.click();

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		await dialogOkButton.click();

		const tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 3, "No deselection was performed");
	});

	it ("should select all items when clicking select all", async () => {
		const cb = await $("#mcb-select-all-vs");
		const popover = await cb.shadow$("ui5-responsive-popover");
		const spanRef = await $("#select-all-event");

		await cb.click();

		await popover.$(".ui5-mcb-select-all-checkbox").click();
		// ok button
		await popover.$(".ui5-responsive-popover-footer").$("ui5-button").click();
		assert.strictEqual(await spanRef.getText(), "Selected items count: 27");

		await cb.click();
		await popover.$(".ui5-mcb-select-all-checkbox").click();
		// ok button
		await popover.$(".ui5-responsive-popover-footer").$("ui5-button").click();
		assert.strictEqual(await spanRef.getText(), "Selected items count: 0");
	});
});

describe("Value state header", () => {
	before(async () => {
		await browser.url("test/pages/MultiComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should show value state header inside mobile dialog", async () => {
		const multiCombo = await browser.$("#mcb-error");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$("ui5-icon").click();

		const dialogStateHeader = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-valuestatemessage-header");
		assert.strictEqual(await dialogStateHeader.isDisplayed(), true, "The value state header is shown");

		const dialogInput = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-input");
		assert.strictEqual(await dialogInput.getAttribute("value-state"), "Error", "Inner input's value state is correct");
	});
});

describe("Eventing", () => {
	before(async () => {
		await browser.url("test/pages/MultiComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should fire selection change event when the item inside the picker (not the checkbox) is pressed", async () => {
		const multiCombo = await browser.$("#mcb");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		const listItem = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[0];
		await listItem.click();

		assert.strictEqual(await browser.$("#events-input").getValue(), "selectionChange", "The correct event was fired");
		assert.strictEqual(await browser.$("#events-parameters").getValue(), "1", "With one parameter");
		assert.strictEqual(await browser.$("#events-call-count").getValue(), "1", "The event was fired once");
	});

	it("Should fire selection change event when items are selected and the 'OK' button is pressed", async () => {
		const multiCombo = await browser.$("#mcb");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[1].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		await dialogOkButton.click();

		assert.strictEqual(await browser.$("#events-input").getValue(), "selectionChange", "The correct event was fired");
		assert.strictEqual(await browser.$("#events-parameters").getValue(), "2", "With two parameters");
		assert.strictEqual(await browser.$("#events-call-count").getValue(), "2", "The event was fired once more");
	});

	it("Should not fire selection change event when items are selected and the 'Close' button is pressed", async () => {
		const multiCombo = await browser.$("#mcb");

		await browser.$("#reset-btn").scrollIntoView();
		await browser.$("#reset-btn").click();

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$("ui5-icon").click();

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[2].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const dialogCloseButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		await dialogCloseButton.click();

		assert.strictEqual(await browser.$("#events-input").getValue(), "", "No event was fired");
		assert.strictEqual(await browser.$("#events-parameters").getValue(), "", "There are no parameters");
		assert.strictEqual(await browser.$("#events-call-count").getValue(), "", "The called event count is empty");
	});

	it("Should prevent selection-change when item is selected in the picker and ok button is pressed", async () => {
		const multiCombo = await browser.$("#mcb-prevent");
		const mcbInput = await multiCombo.shadow$("#ui5-multi-combobox-input");

		await multiCombo.scrollIntoView();
		await mcbInput.click();

		let tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 1, "There should be only one token.");

		const listItemCheckbox = await multiCombo.shadow$("ui5-responsive-popover").$$("ui5-li")[0].shadow$("ui5-checkbox");
		await listItemCheckbox.click();

		const dialogOkButton = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		await dialogOkButton.click();

		tokens = await multiCombo.shadow$("ui5-tokenizer").$$("ui5-token");
		assert.strictEqual(tokens.length, 1, "There should be only one token.");
	});
});

describe("Validation", () => {
	before(async () => {
		await browser.url("test/pages/MultiComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should set the error state to error if input not corresponding to item", async () => {
		const multiCombo = await browser.$("#mcb-predefined-value");

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$("ui5-icon").click();

		const dialogInput = await multiCombo.shadow$("ui5-responsive-popover").$("ui5-input")
		await dialogInput.shadow$("input").click();
		await dialogInput.shadow$("input").keys("m");

		const dialogStateHeader = await multiCombo.shadow$("ui5-responsive-popover").$(".ui5-valuestatemessage-header");
		assert.strictEqual(await dialogStateHeader.isDisplayed(), true, "The value state header is shown");
		assert.strictEqual(await dialogInput.getAttribute("value-state"), "Error", "Inner input's value state is correct");
		assert.strictEqual(await dialogInput.getValue(), "comm", "Additional input is allowed, but value state is error");
	});

});

describe("Accessibility", () => {
	before(async () => {
		await browser.url("test/pages/MultiComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Show selected toggle button should has accessibleName attribute", async () => {
		const multiCombo = await browser.$("#multi1");
		let resourceBundleText = null;

		await multiCombo.scrollIntoView();
		await multiCombo.shadow$('input').click();

		const toggleSelectedButton =  await multiCombo.shadow$("ui5-responsive-popover").$("ui5-toggle-button");

		resourceBundleText = await browser.executeAsync(done => {
			const mcb = document.getElementById("multi1");
			done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.SHOW_SELECTED_BUTTON));
		});

		assert.ok(await toggleSelectedButton.isDisplayed(), "Toggle selected items button is displayed");
		assert.strictEqual(await toggleSelectedButton.getAttribute("accessible-name"), "Show Selected Items Only", "Correct value is applied")

	});

});