import { assert } from "chai";

async function getResourceBundleTexts(keys) {
	return browser.executeAsync((keys, done) => {
		const tokenizer = document.getElementById("nmore-tokenizer");

		const texts = keys.reduce((result, key) => {
			result[key] = tokenizer.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key], 3)
			return result;
		}, {});
		done(texts);

	}, keys);
}

const getTokenizerPopoverId = async (tokenizerId) => {
	return await browser.executeAsync(async (tokenizerId, done) => {
		const staticAreaItem = await (document.querySelector(`#${tokenizerId}`).getStaticAreaItemDomRef());

		done(staticAreaItem.host.classList[0]);
	}, tokenizerId);
}

describe("General interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("tests expanding of tokenizer + focus handling", async () => {
		const tokenizer = await browser.$("#long-tokenizer");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await secondToken.click();

		assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded");
		assert.ok(await secondToken.getProperty("selected"), "Second token should be selected.");
		assert.ok(await secondToken.getProperty("focused"), "Second token should be focused");

        await browser.keys('Tab');

		assert.ok(await secondToken.getProperty("selected"), "Second token should stay selected after focusout.");
		assert.notOk(await tokenizer.getProperty("expanded"), "Tokenizer should not be expanded");

        await browser.keys(['Shift','Tab']);

        assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded");
		assert.ok(await secondToken.getProperty("focused"), "Focus should go back to the selected token.");
	});

	it ("tests opening of nMore Popover", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");
		const lastToken = await tokenizer.$("ui5-token:last-child");
        const tokenizerScrollContainerScrollLeft = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
		const tokenizerScrollContainerScrollWidth = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollWidth);
		const tokenizerScrollContainerClientWidth = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").getBoundingClientRect().width);

		await nMoreLabel.click();

		const rpoClassName = await getTokenizerPopoverId("nmore-tokenizer");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await rpo.$("ui5-list").$$("ui5-li")[0];

        assert.strictEqual(Math.floor(tokenizerScrollContainerScrollLeft), Math.floor(tokenizerScrollContainerScrollWidth - tokenizerScrollContainerClientWidth), "tokenizer is scrolled to end");
		assert.ok(await rpo.getProperty("opened"), "nMore Popover should be open");
		assert.ok(await firstListItem.getProperty("focused"), "First list item should be focused, upon Popover open.");

        await browser.keys('Escape');

		assert.ok(await lastToken.getProperty("focused"), "Last token should be focused, after Escape key is pressed.");
	});

});

describe("Readonly", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("should NOT fire token-delete when Tokenizer is readonly", async () => {
		const tokenizer = await browser.$("#readonly-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");

		// Act
		await firstToken.click();
		await browser.keys("Backspace");
		await browser.keys("Backspace");
		await browser.keys("Delete");
		const tokens = await tokenizer.$$("ui5-token");

		// Assert
		assert.strictEqual(tokens.length, 5, "The tokenizer has 4 tokens");
	});

	it("tests expanding of tokenizer + focus handling", async () => {
		const tokenizer = await browser.$("#readonly-tokenizer");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await secondToken.click();

		assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded");
		assert.ok(await secondToken.getProperty("selected"), "Second token should be selected.");
		assert.ok(await secondToken.getProperty("focused"), "Second token should be focused");

        await browser.keys('Tab');

		assert.ok(await secondToken.getProperty("selected"), "Second token should stay selected after focusout.");
		assert.notOk(await tokenizer.getProperty("expanded"), "Tokenizer should not be expanded");

        await browser.keys(['Shift','Tab']);

        assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded");
		assert.ok(await secondToken.getProperty("focused"), "Focus should go back to the selected token.");
	});
});

describe("Single token", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("should open popover on click of single token", async () => {
		const tokenizer = await $("#single-token-tokenizer");
		const token = await tokenizer.$("ui5-token");
		const rpoClassName = await getTokenizerPopoverId("single-token-tokenizer");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		assert.ok(await rpo.getProperty("opened"), "nMore Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
		assert.ok(await rpo.$("ui5-li").getProperty("focused"), "Token's list item is focused");

		await token.click();

		assert.notOk(await rpo.getProperty("opened"), "nMore Popover should be closed");
		assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		assert.ok(await token.getProperty("focused"), "Token should be focused");
	});
});

describe("Accessibility", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

    it("nMore link should be translated", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		const keys = [
            "MULTIINPUT_SHOW_MORE_TOKENS",
		];

        const texts = await getResourceBundleTexts(keys);

        console.log(texts)

		assert.strictEqual(await nMoreLabel.getText(), texts.MULTIINPUT_SHOW_MORE_TOKENS, "nMore label is correctly translated");
	});

// 	it ("aria-describedby value according to the tokens count", async () => {
// 		const mi = await browser.$("#no-tokens");
// 		const innerInput = await mi.shadow$("input");
// 		const btn = await browser.$("#add-tokens");
// 		const invisibleText = await mi.shadow$(".ui5-hidden-text");
// 		const inivisbleTextId = await invisibleText.getProperty("id");
// 		let resourceBundleText = null;

// 		resourceBundleText = await browser.executeAsync(done => {
// 			const mi = document.getElementById("no-tokens");
// 			done(mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN));
// 		});

// 		let allTokens = await mi.$$("ui5-token");
// 		assert.strictEqual(allTokens.length, 0, "should not have tokens");
// 		assert.strictEqual(await innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
// 		assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

// 		await browser.$("#add-tokens").scrollIntoView();
// 		await btn.click();

// 		resourceBundleText = await browser.executeAsync(done => {
// 			const mi = document.getElementById("no-tokens");
// 			done(mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN));
// 		});

// 		allTokens = await mi.$$("ui5-token");
// 		assert.strictEqual(allTokens.length, 1, "should have one token");
// 		assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

// 		await btn.click();
// 		allTokens = await mi.$$("ui5-token");
// 		assert.strictEqual(allTokens.length, 2, "should have two tokens");
// 		assert.strictEqual(await invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");
// 	});

// 	it ("aria-describedby value according to the tokens and suggestions count", async () => {
// 		const mi = await browser.$("#suggestion-token");
// 		const innerInput = await mi.shadow$("input");
// 		const tokensCountITextId = `${await mi.getProperty("_id")}-hiddenText-nMore`;
// 		const suggestionsITextId = `${await mi.getProperty("_id")}-suggestionsText`;
// 		const ariaDescribedBy = `${tokensCountITextId} ${suggestionsITextId}`;

// 		await browser.$("#suggestion-token").scrollIntoView();
// 		await innerInput.click();
// 		await innerInput.keys("a");
// 		await innerInput.keys("ArrowDown");
// 		await innerInput.keys("Enter");

// 		assert.strictEqual(await innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby attribute contains multiple references");
// 	});

// 	it ("aria-roledescription is set properly", async () => {
// 		const mi = await browser.$("#no-tokens");
// 		const innerInput = await mi.shadow$("input");

// 		assert.strictEqual(await innerInput.getAttribute("aria-roledescription"), "Multi Value Input", "aria-roledescription value is correct");
// 	});
});

describe("Keyboard handling", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

    it("token selection", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await firstToken.click();
		await tokenizer.keys("ArrowRight");

		assert.ok(await secondToken.getProperty("focused"), "The second token is focused");

		await tokenizer.keys("Space");

		assert.ok(await secondToken.getProperty("selected"), "The second token is selected");

		await tokenizer.keys("Space");

		assert.notOk(await secondToken.getProperty("selected"), "The second token is deselected");
	});

	it("left/right arrow navigation", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await firstToken.click();
		await tokenizer.keys("ArrowRight");

		assert.ok(await secondToken.getProperty("focused"), "The second token is focused");

		await tokenizer.keys("ArrowLeft");

		assert.notOk(await secondToken.getProperty("focused"), "The second token is not focused anymore");
		assert.ok(await firstToken.getProperty("focused"), "The first token is focused");
	});

	it("home/end navigation", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const lastToken = await tokenizer.$("ui5-token:last-child");

		await firstToken.click();
		await tokenizer.keys("End");
		assert.strictEqual(await lastToken.getProperty("focused"), true, "The last token is focused");

		await tokenizer.keys("Home");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token is focused");
	});

	it("should select tokens with [Shift] key modifier", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
		const thirdToken = await tokenizer.$("ui5-token:nth-child(3)");

		await firstToken.click();
		await browser.keys(["Shift", "ArrowRight"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await secondToken.getProperty("focused"), true, "The second token should be focused");
		assert.strictEqual(await thirdToken.getProperty("selected"), false, "The third token should NOT be selected");

		await browser.keys(["Shift", "ArrowLeft"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token should be focused");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await thirdToken.getProperty("selected"), false, "The third token should NOT be selected");

		await secondToken.click();

		assert.strictEqual(await firstToken.getProperty("selected"), false, "The first token should NOT be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), false, "The second token should NOT be selected");
		assert.strictEqual(await thirdToken.getProperty("selected"), false, "The third token should NOT be selected");
	});

    it("should select tokens with [Shift] + [End] key modifier", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
		const lastToken = await tokenizer.$("ui5-token:last-child");

		await firstToken.click();
		await browser.keys(["Shift", "End"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await lastToken.getProperty("focused"), true, "The last token should be focused");
		assert.strictEqual(await lastToken.getProperty("selected"), true, "The last token should be selected");
	});


    it("should select tokens with [Shift] + [Home] key modifier", async () => {
		const tokenizer =  await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
		const lastToken = await tokenizer.$("ui5-token:last-child");

		await firstToken.click();
		await browser.keys("End");

		assert.strictEqual(await lastToken.getProperty("focused"), true, "The second token should be selected");

		await browser.keys(["Shift", "Home"]);

		assert.strictEqual(await firstToken.getProperty("selected"), true, "The first token should be selected");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token should be focused");
		assert.strictEqual(await secondToken.getProperty("selected"), true, "The second token should be selected");
		assert.strictEqual(await lastToken.getProperty("selected"), true, "The last token should be selected");
	});

	it ("Clicking delete icon should delete token and place the focus on the previous one", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
        const deleteIcon = await firstToken.shadow$(".ui5-token--icon");

		let tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 5, "should have five tokens");

		await deleteIcon.click();

		tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 4, "should have one tokens");
		assert.equal(await secondToken.getProperty("focused"), true, "Previous token is focused");
	});

	it("should delete token on backspace", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		let tokens = await tokenizer.$$("ui5-token");

        assert.equal(tokens.length, 5, "should have five tokens");

		// Act
		await firstToken.click();
		await browser.keys("Backspace");
		tokens = await tokenizer.$$("ui5-token");

		// Assert
		assert.ok(await secondToken.getProperty("focused"), "The second token is focused on Backspace");
		assert.strictEqual(tokens.length, 4, "The tokenizer has four tokens");

		// Act
		await browser.keys(["Control", "A"]);
		await browser.keys("Backspace");
		tokens = await tokenizer.$$("ui5-token");

		assert.strictEqual(tokens.length, 0, "The tokenizer has no tokens");
	});

    // it ("DELETE should delete token and place the focus on the next one", async () => {
    //     await browser.url(`test/pages/MultiComboBox.html`);

    //     const mcb = await browser.$("#multi1");
    //     const input = await mcb.shadow$("input");

    //     await input.click();
    //     await mcb.keys("ArrowLeft");
    //     await mcb.keys("ArrowLeft");

    //     await mcb.keys("Delete");

    //     const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

    //     assert.equal(await tokens.length, 2, "should have two tokens");
    //     assert.equal(await tokens[1].getProperty("focused"), true, "Previous token is focused");
    // });

    // it ("BACKSPACE should delete token all selected tokens and place the focus on the first token before the deleted ones", async () => {
    //     await browser.url(`test/pages/MultiComboBox.html`);

    //     const mcb = await browser.$("#mcb-items");
    //     const input = await mcb.shadow$("input");
    //     let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
    //     const fourthToken = tokens[3];

    //     await fourthToken.click();
    //     await mcb.keys(["Shift", "ArrowLeft"]);
    //     await mcb.keys("Backspace");

    //     tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
    //     assert.equal(await tokens.length, 3, "should have three tokens");
    //     assert.equal(await tokens[1].getProperty("focused"), true, "Second token is focused");
    // });

    // it ("DELETE should delete token all selected tokens and place the focus on the first token after the deleted ones", async () => {
    //     await browser.url(`test/pages/MultiComboBox.html`);

    //     const mcb = await browser.$("#mcb-items");
    //     const input = await mcb.shadow$("input");
    //     let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
    //     const fourthToken = tokens[3];

    //     await fourthToken.click();
    //     await mcb.keys(["Shift", "ArrowLeft"]);
    //     await mcb.keys("Delete");

    //     tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

    //     assert.equal(await tokens.length, 3, "should have two tokens");
    //     assert.equal(await tokens[2].getProperty("focused"), true, "Last token is focused");
    // });

    // it ("should cut a token with CTRL+X and paste it with CTRL+V", async () => {
    //     await browser.url(`test/pages/MultiComboBox.html`);

    //     const mcb = await browser.$("#multi1");
    //     const mcb2 = await browser.$("#mcb");
    //     const input = await mcb2.shadow$("input");
    //     let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

    //     await tokens[1].click();
    //     await tokens[1].keys(["Control", "x"]);

    //     tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
    //     assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

    //     await input.click();
    //     await input.keys(["Control", "v"]);

    //     assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
    // });

    // it ("should cut a token with SHIFT+DELETE and paste it with SHIFT+INSERT", async () => {
    //     await browser.url(`test/pages/MultiComboBox.html`);

    //     const mcb = await browser.$("#multi1");
    //     const mcb2 = await browser.$("#mcb");
    //     const input = await mcb2.shadow$("input");
    //     let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

    //     await tokens[1].click();
    //     await tokens[1].keys(["Shift", "Delete"]);

    //     tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
    //     assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

    //     await input.click();
    //     await input.keys(["Shift", "Insert"]);

    //     assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
    // });


	it("tests if tokenizer is scrolled on keyboard navigation through the tokens", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");

		await firstToken.click();

		let scrollLeftFirstToken = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		await tokenizer.keys('ArrowRight');
		await tokenizer.keys('ArrowRight');
		await tokenizer.keys('ArrowRight');

		let scrollLeftForthToken = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.notEqual(scrollLeftFirstToken, scrollLeftForthToken, "tokenizer is scrolled when navigating through the tokens");

		await tokenizer.keys('ArrowLeft');
		await tokenizer.keys('ArrowLeft');
		await tokenizer.keys('ArrowLeft');

		let newScrollLeft =  await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.notEqual(newScrollLeft, scrollLeftForthToken, "tokenizer is scrolled again when navigating through the tokens");
	})

	it("should open popover on keyboard combination ctrl + i", async () => {
		const tokenizer = await $("#long-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");

		const rpoClassName = await getTokenizerPopoverId("long-tokenizer");
		const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		await firstToken.click();
		await browser.keys(["Control", "i"]);
		assert.ok(await rpo.getProperty("opened"), "nMore Popover should be opened");

		await browser.keys(["Control", "i"]);
		assert.notOk(await rpo.getProperty("opened"), "nMore Popover should be closed");
	});
});
