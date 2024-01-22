import { assert } from "chai";

const getTokenizerPopoverId = async (inputId) => {
	return await browser.executeAsync(async (inputId, done) => {
		const input = document.querySelector(`[id="${inputId}"]`);
		const staticAreaItem = await (input.shadowRoot.querySelector("ui5-tokenizer").getStaticAreaItemDomRef());

		done(staticAreaItem.host.classList[0]);
	}, inputId);
}

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

	it ("tests opening of tokenizer Popover", async () => {
		const tokenizer = await browser.$("#basic-overflow").shadow$("ui5-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const rpoClassName = await getTokenizerPopoverId("basic-overflow");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await rpo.getProperty("opened"), "More Popover should be open");
	});

	it ("fires value-help-trigger on icon press", async () => {
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

	it ("fires value-help-trigger with F4 and Alt/Option + ArrowUp/Down", async () => {
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

	it ("adds a token to multi input", async () => {
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

	it ("adds multiple tokens to multi input", async () => {
		const mi = await browser.$("#no-tokens2");
		const btn = await browser.$("#add-multiple-tokens");

		await btn.click();

		assert.strictEqual((await mi.$$("ui5-token")).length, 2, "should have 2 tokens");

		let allTokens = await mi.$$("ui5-token");

		assert.notOk(await allTokens[0].getProperty("overflows"), "Token 1 should not overflow");
		assert.notOk(await allTokens[1].getProperty("overflows"), "Token 2 should not overflow");
	});

	it ("adds an overflowing token to multi input", async () => {
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

	it ("adds a token after selection change", async () => {
		const mi = await browser.$("#suggestion-token");
		const input = await mi.shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#suggestion-token");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("c");

		assert.ok(await popover.getProperty("opened"), "Suggestion Popovoer is open");
		let allTokens = await mi.$$("ui5-token");
		assert.strictEqual(allTokens.length, 0, "0 tokens");

		await popover.$("ui5-li-suggestion-item").click();

		allTokens = await mi.$$("ui5-token");
		assert.notOk(await popover.getProperty("opened"), "Suggestion Popovoer is closed");
		assert.strictEqual(allTokens.length, 1, "a token is added after selection");
	});

	it ("Placeholder", async () => {
		const mi1 = await browser.$("#empty-mi").shadow$(".ui5-input-inner");
		const mi2 = await browser.$("#mi-with-tokens-customicon").shadow$(".ui5-input-inner");

		assert.strictEqual(await mi1.getAttribute("placeholder"), "Placeholder", "a token is added after selection");
		assert.strictEqual(await mi2.getAttribute("placeholder"), "", "a token is added after selection");
	});

	it("tests if tokenizer is scrolled to the end when expanded and to start when narrowed", async () => {
		await browser.url(`test/pages/MultiInput.html`);

		const minput = await $("#basic-overflow");
		const input = minput.shadow$("input");

		await minput.scrollIntoView();
		await input.click();

		let tokenizerScrollContainerScrollLeft = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
		let tokenizerScrollContainerScrollWidth = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollWidth);
		let tokenizerScrollContainerClientWidth = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").getBoundingClientRect().width);


		assert.strictEqual(Math.floor(tokenizerScrollContainerScrollLeft), Math.floor(tokenizerScrollContainerScrollWidth - tokenizerScrollContainerClientWidth), "tokenizer is scrolled to end");

		await input.keys('Tab');
		tokenizerScrollContainerScrollLeft = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.strictEqual(tokenizerScrollContainerScrollLeft, 0, "tokenizer is scrolled to start");
	});

	it("should NOT fire token-delete when MI is readonly", async () => {
		const input = await browser.$("#readonly-mi");
		const innerInput = await input.shadow$("input");
		const deleteIcon = input.$$("ui5-token")[0].shadow$("ui5-icon");

		// Act
		await deleteIcon.click();
		await browser.keys("Backspace");
		await browser.keys("Backspace");
		await browser.keys("Delete");
		const tokens = await input.$$("ui5-token");

		// Assert
		assert.strictEqual(tokens.length, 4, "The tokenizer has 4 tokens");
	});

	it("should empty the field when value is cleared in the change handler", async () => {
		const mi = await $("#token-unique");
		const valueHelpIcon = mi.shadow$("ui5-icon");
		const innerInput = mi.shadow$("input");

		mi.scrollIntoView();
		await valueHelpIcon.click();
		
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#token-unique");
		const listItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("ui5-li-suggestion-item");

		await listItem.click();

		assert.strictEqual(await innerInput.getProperty("value"), "", "Input's value should be empty");
	});

	it("Should apply correct text to the tokens overflow indicator", async () => {
		const miNItems = await $("#mi-items");
		const miNMore = await $("#mi-more");
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
});

describe("MultiInput Truncated Token", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiInput.html`);
	});

	it("should truncate token when single token is in the multinput and open popover on click", async () => {
		const mi = await $("#truncated-token");
		const token = await mi.$("ui5-token");
		const rpoClassName = await getTokenizerPopoverId("truncated-token");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");
		
		await token.click();

		assert.ok(await rpo.getProperty("opened"), "More Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
		assert.ok(await rpo.$("ui5-li").getProperty("focused"), "Token's list item is focused");

		await token.click();

		assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		assert.ok(await token.getProperty("focused"), "Token should be focused");
	});

	it("should close truncation popover and deselect selected tokens when clicked outside the component", async () => {
		const mi = await $("#truncated-token");
		const token = await mi.$("ui5-token");
		const rpoClassName = await getTokenizerPopoverId("truncated-token");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");
		
		await token.click();

		await $("#dummy-btn").click();

		assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
	});

	it("should close truncation popover and deselect selected tokens when clicked in input field", async () => {
		const mi = await $("#truncated-token");
		const token = await mi.$("ui5-token");
		const rpoClassName = await getTokenizerPopoverId("truncated-token");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");
		const inner = await mi.shadow$("input");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");
		
		await inner.click();

		assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
	});

	it("should truncate token when a long token is added", async () => {
		const mi = await $("#token-unique");
		const inner = await mi.shadow$("input");

		await mi.scrollIntoView();

		// populate new token
		await inner.click();
		await inner.setValue("Officia enim ullamco sunt sunt nisi ullamco cillum velit.");
		await inner.keys("Enter");

		const rpoClassName = await getTokenizerPopoverId("token-unique");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		const token = await mi.$("ui5-token");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		assert.ok(await rpo.getProperty("opened"), "More Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await rpo.$("ui5-li").getProperty("focused"), "Token's list item is focused");

		const deleteIcon = await token.shadow$("ui5-icon");

		await deleteIcon.click();

		const tokensCount = (await mi.$$("ui5-token")).length;

		assert.strictEqual(tokensCount, 0, "No Tokens should be available");
		assert.ok(await inner.isFocusedDeep(), "Inner input should be focused");
	});

	it("should not throw exception when MI with 1 token is added to the page", async () => {
		const btn = await $("#add-single-token");

		await btn.click();

		const innerInput = await $("#added-mi").shadow$("input");
		const html = await innerInput.getHTML();

		assert.ok(await innerInput.getHTML(), "new MI should be displayed");
	});
});

describe("ARIA attributes", () => {
	it ("aria-describedby value according to the tokens count", async () => {
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

	it ("aria-describedby value according to the tokens and suggestions count", async () => {
		const mi = await browser.$("#suggestion-token");
		const innerInput = await mi.shadow$("input");
		const tokensCountITextId = `${await mi.getProperty("_id")}-hiddenText-nMore`;
		const suggestionsITextId = `${await mi.getProperty("_id")}-suggestionsText`;
		const ariaDescribedBy = `${tokensCountITextId} ${suggestionsITextId}`;

		await browser.$("#suggestion-token").scrollIntoView();
		await innerInput.click();
		await innerInput.keys("a");
		await innerInput.keys("ArrowDown");
		await innerInput.keys("Enter");

		assert.strictEqual(await innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby attribute contains multiple references");
	});

	it ("aria-roledescription is set properly", async () => {
		const mi = await browser.$("#no-tokens");
		const innerInput = await mi.shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-roledescription"), "Multi Value Input", "aria-roledescription value is correct");
	});
});

describe("Keyboard handling", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiInput.html`);
	});

	it("left/right arrow navigation", async () => {
		const input =  await browser.$("#basic-overflow");
		const innerInput =  await input.shadow$("input");
		const firstToken = await browser.$("#basic-overflow ui5-token:first-child");
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

	it ("Clicking delete icon should delete token and place the focus on the previous one", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const secondToken = await browser.$("#two-tokens ui5-token#secondToken");
		const deleteIcon = input.$$("ui5-token")[0].shadow$("ui5-icon");
		let tokens;

		await input.setProperty("value", "");
		await innerInput.click();
		await innerInput.keys("ArrowLeft");
		await innerInput.keys("Space");

		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");

		await deleteIcon.click();

		tokens = await input.$$("ui5-token");

		assert.equal(tokens.length, 1, "should have one tokens");
		assert.equal(await secondToken.getProperty("focused"), true, "Previous token is focused");
		assert.equal(await secondToken.getProperty("text"), "bb", "The selected token should not be deleted.");
	});

	it ("Should focus the input when all tokens are deleted", async () => {
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

	it("should delete token on backspace", async () => {
		const input = await browser.$("#two-tokens");
		const innerInput = await input.shadow$("input");
		const firstToken = await browser.$("#two-tokens ui5-token#firstToken");
		const lastToken = await browser.$("#two-tokens ui5-token#secondToken");
		let tokens;

		// Act
		await input.setProperty("value", "");
		await innerInput.click();
		await browser.keys("Backspace");
		tokens = await input.$$("ui5-token");

		// Assert
		assert.ok(await lastToken.getProperty("focused"), "The last token is focused on Backspace");
		assert.notOk(await input.getProperty("focused"), "The input loses focus on Backspace");
		assert.strictEqual(tokens.length, 2, "The tokenizer has two tokens");

		// Act
		await browser.keys("Backspace");
		tokens = await input.$$("ui5-token");

		// Assert
		assert.ok(await firstToken.getProperty("focused"), "The first token is focused on Backspace, as the second was deleted");
		assert.notOk(await input.getProperty("focused"), "The input is not focused");

		assert.strictEqual(tokens.length, 1, "The tokenizer has one token");
	});

	it("tests if tokenizer is scrolled on keyboard navigation through the tokens", async () => {
		await browser.url(`test/pages/MultiInput.html`);
		const minput = await $("#basic-overflow");
		const input = minput.shadow$("input");

		await minput.scrollIntoView();
		await input.click();
		await input.keys('ArrowLeft');

		let scrollLeftFirstToken = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		await input.keys('ArrowLeft');
		await input.keys('ArrowLeft');
		await input.keys('ArrowLeft');

		let scrollLeftForthToken = await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.notEqual(scrollLeftFirstToken, scrollLeftForthToken, "tokenizer is scrolled when navigating through the tokens");

		await input.keys('ArrowRight');
		await input.keys('ArrowRight');
		await input.keys('ArrowRight');

		let newScrollLeft =  await browser.execute(() => document.querySelector("#basic-overflow").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.notEqual(newScrollLeft, scrollLeftForthToken, "tokenizer is scrolled again when navigating through the tokens");
	})

	it("should change input's value when set in selection change event", async () => {
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
		const valueState = await $("#value-state-wrapper");

		await mi.scrollIntoView();

		// populate new token
		await inner.click();
		await inner.keys("a");
		await inner.keys("Enter");

		await inner.click();
		await inner.keys("a");
		await inner.keys("Enter");

		assert.strictEqual(await mi.getProperty("valueState"), "Error", "Value state is Error");

		await browser.pause(2500);
		assert.strictEqual(await mi.getProperty("valueState"), "None", "Value state is None");
	});

	it("should open popover on keyboard combination ctrl + i", async () => {
		const mi = await $("#truncated-token");
		const rpoClassName = await getTokenizerPopoverId("truncated-token");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		await mi.click();
		await mi.keys(["Control", "i"]);
		assert.ok(await rpo.getProperty("opened"), "Focused MI - n-more popover should be opened");

		await mi.click();
		await mi.keys("ArrowLeft");
		await mi.keys(["Control", "i"]);
		assert.ok(await rpo.getProperty("opened"), "Focused Token - n-more popover should be opened");
	});

	it("shouldn't open popover on keyboard combination ctrl + i when there a no tokens", async () => {
		const mi = await browser.$("#no-tokens");
		const rpoClassName = await getTokenizerPopoverId("no-tokens");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		await mi.click();
		await mi.keys(["Control", "i"]);
		assert.notOk(await rpo.getProperty("opened"), "n-more popover shouldn't be opened since no tokens");
	});

	it("should open popover with all tokens on keyboard combination ctrl + i", async () => {
		const mi = await browser.$("#two-tokens");
		const rpoClassName = await getTokenizerPopoverId("two-tokens");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		await mi.click();
		await mi.keys(["Control", "i"]);
		assert.ok(await rpo.getProperty("opened"), "Focused MI - n-more popover should be opened");
		const listItems = await rpo.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 2, "All items are shown");
	});
});
