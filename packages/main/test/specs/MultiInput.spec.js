import { assert } from "chai";

const isMacOS = process.platform === 'darwin';
const keyCtrlToPress = isMacOS ? 'Command' : 'Control';

describe("MultiInput general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/MultiInput.html`);
	});

	it("tests expanding of tokenizer", async () => {
		const basic = await browser.$("#basic-overflow");
		const basicInner = await basic.shadow$("input");
		const basicTokenizer = await basic.shadow$("ui5-tokenizer");

		await basicInner.click();
		await basicInner.keys("Tab");

		assert.notOk(await basicTokenizer.getProperty("expanded"), "Tokenizer should not be expanded");
	});

	it("tests opening of tokenizer Popover", async () => {
		const tokenizer = await browser.$("#basic-overflow").shadow$("ui5-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const rpo = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await rpo.getProperty("open"), "More Popover should be open");
	});

	it("fires value-help-trigger on icon press", async () => {
		await browser.url(`test/pages/MultiInput.html`);

		const label = await browser.$("#basic-event-listener");
		const icon = await browser.$("#basic-overflow-and-icon").shadow$("ui5-icon");
		const EXPECTED_TEXT = "value help icon press"

		assert.strictEqual(await label.getText(), "", "event is not fired");

		// act
		await icon.click();

		// assert
		assert.strictEqual(await label.getText(), EXPECTED_TEXT, "value help press event is fired");

	});

	it("fires value-help-trigger with F4 and Alt/Option + ArrowUp/Down", async () => {
		const eventCounter = await browser.$("#value-help-trigger-counter");
		const multiInputInner = await browser.$("#multi-with-value-help-icon").shadow$(".ui5-input-inner");

		// act
		await multiInputInner.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);

		// assert
		assert.strictEqual(await eventCounter.getProperty("value"), "1", "value help press event is fired");

		// act
		await browser.keys("F4");

		// assert
		assert.strictEqual(await eventCounter.getProperty("value"), "2", "value help press event is fired");
	});

	it("adds a token to multi input", async () => {
		const mi = await browser.$("#single-token");
		const btn = await browser.$("#add-to-single");

		assert.strictEqual((await mi.$$("ui5-token")).length, 1, "should have 1 token");
		await browser.$("#suggestion-token").scrollIntoView();

		let allTokens = await mi.$$("ui5-token");
		assert.notOk(await allTokens[0].getProperty("overflows"), "Token should not overflow");

		await btn.click();

		allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 2, "should have 2 tokens");
		assert.notOk(await allTokens[0].getProperty("overflows"), "Token should not overflow");
		assert.notOk(await allTokens[1].getProperty("overflows"), "Token should not overflow");
	});

	it("adds multiple tokens to multi input", async () => {
		const mi = await browser.$("#no-tokens2");
		const btn = await browser.$("#add-multiple-tokens");

		await btn.click();

		assert.strictEqual((await mi.$$("ui5-token")).length, 2, "should have 2 tokens");

		let allTokens = await mi.$$("ui5-token");

		assert.notOk(await allTokens[0].getProperty("overflows"), "Token 1 should not overflow");
		assert.notOk(await allTokens[1].getProperty("overflows"), "Token 2 should not overflow");
	});

	it("adds an overflowing token to multi input", async () => {
		const mi = await browser.$("#multiple-token");
		const btn = await browser.$("#add-to-multiple");

		assert.strictEqual(await mi.$$("ui5-token").length, 5, "should have 5 token");
		$("#suggestion-token").scrollIntoView();

		let allTokens = await mi.$$("ui5-token");

		assert.notOk(await allTokens[0].getProperty("overflows"), `Token 0 should not overflow`);
		assert.notOk(await allTokens[1].getProperty("overflows"), `Token 1 should not overflow`);
		assert.ok(await allTokens[2].getProperty("overflows"), `Token 2 should not overflow`);
		assert.ok(await allTokens[3].getProperty("overflows"), `Token 3 should not overflow`);
		assert.ok(await allTokens[4].getProperty("overflows"), `Token 4 should not overflow`);

		await btn.click();

		allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 6, "should have 6 tokens");

		assert.notOk(await allTokens[0].getProperty("overflows"), `Token 0 should not overflow`);
		assert.notOk(await allTokens[1].getProperty("overflows"), `Token 1 should not overflow`);
		assert.ok(await allTokens[2].getProperty("overflows"), `Token 2 should not overflow`);
		assert.ok(await allTokens[3].getProperty("overflows"), `Token 3 should not overflow`);
		assert.ok(await allTokens[4].getProperty("overflows"), `Token 4 should not overflow`);
		assert.ok(await allTokens[5].getProperty("overflows"), `Token 5 should not overflow`);
	});

	it("Should create a token on change event", async () => {
		await browser.url(`test/pages/MultiInput.html`);

		const mi = await browser.$("#suggestion-token");
		const input = await mi.shadow$("input");
		const popover = await mi.shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("c");

		assert.ok(await popover.getProperty("open"), "Suggestion popover is open");
		let allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 0, "0 tokens");

		await mi.$("ui5-suggestion-item").click();

		allTokens = await mi.$$("ui5-token");
		assert.notOk(await popover.getProperty("open"), "Suggestion popover is closed");
		assert.strictEqual(allTokens.length, 1, "a token is added after change");
	});

	it ("Placeholder", async () => {
		const mi1 = await browser.$("#empty-mi").shadow$(".ui5-input-inner");
		const mi2 = await browser.$("#mi-with-tokens-customicon").shadow$(".ui5-input-inner");

		assert.strictEqual(await mi1.getAttribute("placeholder"), "Placeholder", "a token is added after selection");
		assert.strictEqual(await mi2.getAttribute("placeholder"), "", "a token is added after selection");
	});

	it("Tokens should not have delete icon when MI is readonly", async () => {
		const input = await browser.$("#readonly-mi");

		const tokens = await input.$$("ui5-token");
		const length = tokens.length;
		let numTokensWithDeleteIcon = 0;

		for (const token of tokens) {
			const icon = await token.shadow$("ui5-icon");
			if (await icon.isExisting()){
				numTokensWithDeleteIcon++;
			}
		};

		// Assert
		assert.strictEqual(length, 4, "The tokenizer has 4 tokens");
		assert.strictEqual(numTokensWithDeleteIcon, 0, "Tokens should not have delete icon");
	});

	it("Tokens should not have delete icon when MI is readonly and displayed in n-more popover", async () => {
		const input = await browser.$("#readonly-mi");
		const tokenizer = await input.shadow$("ui5-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const tokens = await tokenizer.shadow$("ui5-responsive-popover").$$("ui5-li");
		let numTokensWithDeleteIcon = 0;

		for (const listItem of tokens) {
			const closeBtn = await listItem.shadow$("ui5-button");
			if (await closeBtn.isExisting()){
				numTokensWithDeleteIcon++;
			}
		};

		// Assert
		assert.strictEqual(tokens.length, 4, "The tokenizer popover has 4 tokens");
		assert.strictEqual(numTokensWithDeleteIcon, 0, "Tokens in list should not have delete icon");
	});

	it("should empty the field when value is cleared in the change handler", async () => {
		const mi = await browser.$("#token-unique");
		const valueHelpIcon = mi.shadow$("ui5-icon");
		const innerInput = mi.shadow$("input");

		mi.scrollIntoView();
		await valueHelpIcon.click();

		const listItem = await mi.$("ui5-suggestion-item");

		await listItem.click();

		assert.strictEqual(await innerInput.getProperty("value"), "", "Input's value should be empty");
	});

	it("Should apply correct text to the tokens overflow indicator", async () => {
		const miNItems = await browser.$("#mi-items");
		const miNMore = await browser.$("#mi-more");
		const tokenizerNItems = await miNItems.shadow$("ui5-tokenizer");
		const tokenizerNMore = await miNMore.shadow$("ui5-tokenizer");
		const nItemsLabel = await tokenizerNItems.shadow$(".ui5-tokenizer-more-text");
		const nMoreLabel = await tokenizerNMore.shadow$(".ui5-tokenizer-more-text");
		let resourceBundleText = null;

		resourceBundleText = await browser.executeAsync(done => {
			const mi = document.getElementById("mi-items");
			done({
				miItemsLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_SHOW_ALL_ITEMS, 2),
				miNMoreLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MULTIINPUT_SHOW_MORE_TOKENS, 1)
			});
		});

		assert.strictEqual(await nItemsLabel.getText(), resourceBundleText.miItemsLabelText, "Text should be 2 Items");
		assert.strictEqual(await nMoreLabel.getText(), resourceBundleText.miNMoreLabelText, "Text should be 1 More");
	});

	it("Tests autocomplete(type-ahead) of custom suggestions", async () => {
		let hasSelection;

		const input = await $("#mi-custom-suggestions").shadow$("input");
		const EXPTECTED_VALUE = "Bulgaria";

		await input.click();
		await input.keys("b");

		hasSelection = await browser.execute(() => {
			const input = document.getElementById("mi-custom-suggestions").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart > 0;
		});

		assert.strictEqual(await input.getProperty("value"), EXPTECTED_VALUE, "Value is autocompleted");
		assert.ok(hasSelection, "Autocompleted text is selected");
	});
});

describe("MultiInput Truncated Token", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiInput.html`);
	});

	it("should truncate token when single token is in the multinput and open popover on click", async () => {
		const mi = await browser.$("#truncated-token");
		const tokenizer = await mi.shadow$("ui5-tokenizer");
		const token = await mi.$("ui5-token");
		const rpo = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		assert.ok(await rpo.getProperty("open"), "More Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
		assert.ok(await rpo.$("ui5-li").matches(":focus"), "Token's list item is focused");

		await token.click();

		assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		assert.ok(await token.getProperty("focused"), "Token should be focused");
	});

	it("should close truncation popover and deselect selected tokens when clicked outside the component", async () => {
		const mi = await browser.$("#truncated-token");
		const tokenizer = await mi.shadow$("ui5-tokenizer");
		const token = await mi.$("ui5-token");

		const rpo = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		await browser.$("#dummy-btn").click();

		assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
	});

	it("should close truncation popover and deselect selected tokens when clicked in input field", async () => {
		const mi = await browser.$("#truncated-token");
		const tokenizer = await mi.shadow$("ui5-tokenizer");
		const token = await mi.$("ui5-token");
		const rpo = await tokenizer.shadow$("ui5-responsive-popover");
		const inner = await mi.shadow$("input");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await inner.click();

		assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
	});

	it("should truncate token when a long token is added", async () => {
		const mi = await browser.$("#token-unique");
		const tokenizer = await mi.shadow$("ui5-tokenizer");
		const inner = await mi.shadow$("input");

		await mi.scrollIntoView();

		// populate new token
		await inner.click();
		await inner.setValue("Officia enim ullamco sunt sunt nisi ullamco cillum velit ullamco cillum velit ullamco cillum velit enim ullamco sunt sunt nisi ullamco cillum velit ullamco cillum velit ullamco cillum velit enim ullamco sunt sunt nisi ullamco cillum velit ullamco cillum velit ullamco cillum velit.");
		await inner.keys("Enter");

		const rpo = await tokenizer.shadow$("ui5-responsive-popover");
		const listItem = await rpo.$("ui5-li");
		const token = await mi.$("ui5-token");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		assert.ok(await rpo.getProperty("open"), "More Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await listItem.matches(":focus"), "Token's list item is focused");

		const deleteIcon = await token.shadow$("ui5-icon");

		await deleteIcon.click();

		const tokensCount = (await mi.$$("ui5-token")).length;

		assert.strictEqual(tokensCount, 0, "No Tokens should be available");
		assert.ok(await inner.isFocusedDeep(), "Inner input should be focused");
	});

	it("should not throw exception when MI with 1 token is added to the page", async () => {
		const btn = await browser.$("#add-single-token");

		await btn.click();

		const innerInput = await browser.$("#added-mi").shadow$("input");

		assert.ok(await innerInput.getHTML(), "new MI should be displayed");
	});
});

describe("ARIA attributes", () => {
	it("aria-describedby value according to the tokens count", async () => {
		const mi = await browser.$("#no-tokens");
		const innerInput = await mi.shadow$("input");
		const btn = await browser.$("#add-tokens");
		const invisibleText = await mi.shadow$(".ui5-hidden-text");
		const inivisbleTextId = await invisibleText.getProperty("id");
		let resourceBundleText = null;

		resourceBundleText = await browser.executeAsync(done => {
			const mi = document.getElementById("no-tokens");
			done(mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN));
		});

		let allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 0, "should not have tokens");
		assert.strictEqual(await innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
		assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

		await browser.$("#add-tokens").scrollIntoView();
		await btn.click();

		resourceBundleText = await browser.executeAsync(done => {
			const mi = document.getElementById("no-tokens");
			done(mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN));
		});

		allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 1, "should have one token");
		assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

		await btn.click();
		allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 2, "should have two tokens");
		assert.strictEqual(await invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");
	});

	it("aria-describedby value according to the tokens and suggestions count", async () => {
		const mi = await browser.$("#suggestion-token");
		const innerInput = await mi.shadow$("input");
		const tokensCountITextId = `hiddenText-nMore`;
		const suggestionsITextId = `suggestionsText`;
		const valueHelpTextId = "hiddenText-value-help";

		await browser.$("#suggestion-token").scrollIntoView();
		await innerInput.click();
		await innerInput.keys("a");
		await innerInput.keys("ArrowDown");
		await innerInput.keys("Enter");

		const ariaDescribedBy = await innerInput.getAttribute("aria-describedby");

		assert.ok(ariaDescribedBy.includes(tokensCountITextId), "aria-describedby should contain tokens count");
		assert.ok(ariaDescribedBy.includes(suggestionsITextId), "aria-describedby should contain suggestions announcement when suggestions are enabled");
		assert.ok(ariaDescribedBy.includes(valueHelpTextId), "aria-describedby should contain value help announcement when value help is enabled");
	});

	it("aria-roledescription is set properly", async () => {
		const mi = await browser.$("#no-tokens");
		const innerInput = await mi.shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-roledescription"), "Multi Value Input", "aria-roledescription value is correct");
	});

	it("aria-haspopup attribute with value 'dialog'", async () => {
		const mi = await browser.$("#suggestion-token");
		const innerInput = await mi.shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-haspopup"), "dialog", "Should render aria-haspopup attribute with value 'dialog'");
	});
});

describe("Keyboard handling", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiInput.html`);
	});

	it("left/right arrow navigation", async () => {
		const input =  await browser.$("#basic-overflow");
		const innerInput =  await input.shadow$("input");
		const lastToken = await browser.$("#basic-overflow ui5-token:last-child");

		await innerInput.click();
		await innerInput.keys("ArrowLeft");
		assert.ok(await lastToken.getProperty("focused"), "The last token is focused");
		assert.notOk(await input.getProperty("focused"), "The input loses focus");

		await innerInput.keys("ArrowRight");
		assert.notOk(await lastToken.getProperty("focused"), "The last token is not focused anymore");
	});

	it("home/end navigation", async () => {
		const input =  await browser.$("#basic-overflow");
		const innerInput =  await input.shadow$("input");
		const firstToken = await browser.$("#basic-overflow ui5-token:first-child");
		const lastToken = await browser.$("#basic-overflow ui5-token:last-child");
		let caretPosition;

		await innerInput.click();
		await innerInput.keys("Home");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token is focused");

		await innerInput.keys("End");
		assert.strictEqual(await lastToken.getProperty("focused"), true, "The last token is focused");

		await innerInput.keys("End");
		assert.strictEqual(await lastToken.getProperty("focused"), false, "The last token is not focused anymore");

		caretPosition = await browser.execute(() =>{
			const multiInputShadowRoot = document.getElementById("basic-overflow").shadowRoot;
			return multiInputShadowRoot.querySelector("input").selectionStart;
		});

		assert.strictEqual(caretPosition, 0, "The inner input's cursor is at 0 index");

		await innerInput.keys("Home");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token is focused on Home press, if the cursor is at 0 index");
	});

	it("should select tokens with key modifiers (Shift + [Ctrl])", async () => {
		const input = await browser.$("#basic-overflow");
		const innerInput = await input.shadow$("input");
		const firstToken = await browser.$("#basic-overflow ui5-token:last-child");
		const secondToken = await browser.$("#basic-overflow ui5-token:nth-child(10)");
		const thirdToken = await browser.$("#basic-overflow ui5-token:nth-child(9)");

		await innerInput.click();
		await innerInput.keys("ArrowLeft");
		await browser.keys(["Shift", "ArrowLeft"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await thirdToken.getProperty("selected"), false, "The third token should NOT be selected");

		await browser.keys(["Control", "Shift", "ArrowLeft"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await thirdToken.getProperty("selected"), true, "The third token should be selected");

		await secondToken.click();

		assert.strictEqual(await firstToken.getProperty("selected"), false, "The first token should NOT be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), false, "The second token should NOT be selected");
		assert.strictEqual(await thirdToken.getProperty("selected"), false, "The third token should NOT be selected");
	});

	it("should move caret to start of input, when a value is present and home is pressed", async () => {
		const input =  await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const firstToken = await browser.$("#two-tokens ui5-token:first-child");
		let caretPosition;

		await browser.$("#two-tokens").scrollIntoView();

		await innerInput.click();
		await innerInput.keys("End");

		caretPosition = await browser.execute(() => {
			const multiInputShadowRoot = document.getElementById("two-tokens").shadowRoot;
			return multiInputShadowRoot.querySelector("input").selectionStart;
		});

		assert.strictEqual(caretPosition, 3, "The inner input's cursor is at the end");

		await innerInput.keys("Home");

		caretPosition = await browser.execute(() => {
			const multiInputShadowRoot = document.getElementById("two-tokens").shadowRoot;
			return multiInputShadowRoot.querySelector("input").selectionStart;
		});

		assert.strictEqual(caretPosition, 0, "The inner input's cursor is at the beginning");
		assert.strictEqual(await firstToken.getProperty("focused"), false, "The first token is not focused, as text was present");

		await innerInput.keys("Home");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token is focused");
	});

	it("Should focus the input when all tokens are deleted", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");

		await input.setProperty("value", "");
		await innerInput.click();
		await browser.keys("ArrowLeft");
		await browser.keys(["Shift", "ArrowLeft"]);
		await browser.keys("Backspace");

		let tokens = await input.$$("ui5-token");

		assert.equal(tokens.length, 0, "should have no tokens");
		assert.equal(await input.getProperty("focused"), true, "The input is focused");
	});

	it("should focus token on backspace for inputs of type 'Number' and 'Email'", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const lastToken = await browser.$("#two-tokens ui5-token#secondToken");

		// Act
		await input.setProperty("value", "");
		await input.setProperty("type", "Number");

		await innerInput.click();
		await browser.keys("Backspace");

		assert.ok(await lastToken.getProperty("focused"), "The last token is focused on Backspace");
	});

	it("should focus token last token when caret is at the beginning of the value", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const lastToken = await browser.$("#two-tokens ui5-token#secondToken");

		// Act
		await innerInput.click();
		await browser.keys("ArrowLeft");
		await browser.keys("ArrowLeft");
		await browser.keys("ArrowLeft");
		await browser.keys("Backspace");

		assert.ok(await lastToken.getProperty("focused"), "The last token is focused on Backspace");
	});

	it("should delete value on backspace", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const lastToken = await browser.$("#two-tokens ui5-token#secondToken");

		// Act
		await innerInput.click();
		await browser.keys([keyCtrlToPress, "a"]);
		await browser.keys("Backspace");

		// Assert
		assert.strictEqual(await input.getProperty("value"), "", "Value is deleted on Backspace");

		await browser.keys("Backspace");

		assert.notOk(await input.getProperty("focused"), "The input loses focus on Backspace");
		assert.ok(await lastToken.getProperty("focused"), "The last token is focused on Backspace");
	});

	it("should delete token on backspace", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const lastToken = await browser.$("#two-tokens ui5-token#secondToken");

		// Act
		await input.setProperty("value", "");
		await innerInput.click();
		await browser.keys("Backspace");

		// Assert
		assert.ok(await lastToken.getProperty("focused"), "The last token is focused on Backspace");
		assert.notOk(await input.getProperty("focused"), "The input loses focus on Backspace");
	});

	it("should change input's value when set in selection change event", async () => {
		await browser.url(`test/pages/MultiInput.html`);
		const input = $("#suggestion-token");
		const innerInput = input.shadow$("input");

		await input.scrollIntoView();
		await innerInput.click();
		await innerInput.keys('a');
		await innerInput.keys("Enter");

		assert.strictEqual(await input.getProperty("value"), "", "value should be cleared in event handler");
		assert.strictEqual(await innerInput.getProperty("value"), "", "inner value should be cleared in event handler");

		await innerInput.keys("ArrowLeft");

		assert.isNotOk(await input.getProperty("focused"), "focused property has been removed from input");

		await innerInput.keys("ArrowRight");

		assert.isOk(await input.getProperty("focused"), "focused property has been set to the input");
	});

	it("should text field always when focus in" , async () => {
		const mi = $("#one-token");
		const inner = mi.shadow$("input");

		await mi.scrollIntoView();
		await inner.click();
		await inner.keys("ArrowLeft");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("Tab");

		assert.ok(await mi.getProperty("focused"), "input field should be focused");
	});

	it("should trigger change event on enter", async () => {
		const mi = await $("#token-unique");
		const inner = await mi.shadow$("input");

		await mi.scrollIntoView();

		// populate new token
		await inner.click();
		await inner.keys("a");
		await inner.keys("Enter");

		await inner.click();
		await inner.keys("a");
		await inner.keys("Enter");

		assert.strictEqual(await mi.getProperty("valueState"), "Negative", "Value state is Negative");

		await browser.pause(2500);
		assert.strictEqual(await mi.getProperty("valueState"), "None", "Value state is None");
	});
});
