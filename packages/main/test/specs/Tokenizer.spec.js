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

describe("General interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("tests expanding of tokenizer + focus handling", async () => {
		const longTokenizer = await browser.$("#long-tokenizer");
		const selectedTokenizer = await browser.$("#selected-tokenizer");
		const selectedToken = await selectedTokenizer.$("ui5-token:nth-child(2)");
		const secondToken = await longTokenizer.$("ui5-token:nth-child(2)");

		await secondToken.click();

		assert.ok(await longTokenizer.getProperty("expanded"), "Tokenizer should be expanded upon token focus.");
		assert.ok(await secondToken.getProperty("selected"), "Second token should be selected.");
		assert.ok(await secondToken.getProperty("focused"), "Second token should be focused");

		await browser.keys('Tab');

		assert.ok(await secondToken.getProperty("selected"), "Second token should stay selected after focusout.");
		assert.notOk(await longTokenizer.getProperty("expanded"), "Tokenizer should not be expanded");

		await browser.keys(['Shift', 'Tab']);

		assert.ok(await longTokenizer.getProperty("expanded"), "Tokenizer should be expanded upon token focus.");
		assert.ok(await secondToken.getProperty("focused"), "Focus should go back to the selected token.");

		await browser.keys(['Shift', 'Tab']);

		assert.ok(await selectedToken.getProperty("focused"), "Upon Tab navigation, focus should go to the selected token if any.");
	});
});

describe("nMore Popover", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("tests opening of nMore Popover", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");
		const lastToken = await tokenizer.$("ui5-token:last-child");
		const tokenizerScrollContainerScrollLeft = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
		const tokenizerScrollContainerScrollWidth = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollWidth);
		const tokenizerScrollContainerClientWidth = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").getBoundingClientRect().width);

		await nMoreLabel.click();

		const rpo = await tokenizer.shadow$("ui5-responsive-popover");
		const firstListItem = await rpo.$("ui5-list").$$("ui5-li")[0];

		assert.strictEqual(Math.floor(tokenizerScrollContainerScrollLeft), Math.floor(tokenizerScrollContainerScrollWidth - tokenizerScrollContainerClientWidth), "tokenizer is scrolled to end");
		assert.ok(await rpo.getProperty("open"), "nMore Popover should be opened upon click of nMore label.");
		assert.ok(await firstListItem.getProperty("focused"), "First list item should be focused, upon Popover open.");

		await browser.keys('Escape');

		assert.ok(await lastToken.getProperty("focused"), "Last token should be focused, after Escape key is pressed.");
	});

	it("tests [F7] list item navigation", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const rpo = await tokenizer.shadow$("ui5-responsive-popover");
		const firstListItem = await rpo.$("ui5-list").$$("ui5-li")[0];
		const itemDeleteButton = await firstListItem.shadow$('ui5-button');

		assert.ok(await rpo.getProperty("open"), "nMore Popover should be opened upon click of nMore label.");
		assert.ok(await firstListItem.getProperty("focused"), "First list item should be focused, upon Popover open.");

		await browser.keys('F7');

		// assert.ok(await itemDeleteButton.getProperty("focused"), "Delete button should be focused upon F7 key press.");
		assert.notOk(await firstListItem.getProperty("focused"), "List item should no longer be focused.");

		await browser.keys('F7');

		assert.notOk(await itemDeleteButton.getProperty("focused"), "List item should be focused upon F7 key press.");
		assert.ok(await firstListItem.getProperty("focused"), "Delete button should no longer be focused.");
	});
});

describe("Readonly", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("should NOT fire token-delete when Tokenizer is readonly", async () => {
		const tokenizer = await browser.$("#readonly-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");

		await firstToken.click();
		await browser.keys("Backspace");
		await browser.keys("Backspace");
		await browser.keys("Delete");

		const tokens = await tokenizer.$$("ui5-token");

		assert.strictEqual(tokens.length, 5, "The tokenizer has 5 tokens");
	});

	it("tests expanding of tokenizer + focus handling in readonly mode.", async () => {
		const tokenizer = await browser.$("#readonly-tokenizer");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await secondToken.click();

		assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded");
		assert.ok(await secondToken.getProperty("selected"), "Second token should be selected.");
		assert.ok(await secondToken.getProperty("focused"), "Second token should be focused");

		await browser.keys('Tab');

		assert.ok(await secondToken.getProperty("selected"), "Second token should stay selected after focusout.");
		assert.notOk(await tokenizer.getProperty("expanded"), "Tokenizer should not be expanded");

		await browser.keys(['Shift', 'Tab']);

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
		const rpo = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

		await token.click();

		assert.ok(await rpo.getProperty("open"), "nMore Popover should be open");
		assert.ok(await token.getProperty("selected"), "Token should be selected");
		assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
		assert.ok(await rpo.$("ui5-li").getProperty("focused"), "Token's list item is focused");

		await token.click();

		assert.notOk(await rpo.getProperty("open"), "nMore Popover should be closed");
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

		assert.strictEqual(await nMoreLabel.getText(), texts.MULTIINPUT_SHOW_MORE_TOKENS, "nMore label is correctly translated");
	});
});

describe("Keyboard handling", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
	});

	it("token selection", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
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

	it("[LeftArrow]/[RightArrow] navigation", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");

		await firstToken.click();
		await tokenizer.keys("ArrowRight");

		assert.ok(await secondToken.getProperty("focused"), "The second token is focused");

		await tokenizer.keys("ArrowLeft");

		assert.notOk(await secondToken.getProperty("focused"), "The second token is not focused anymore");
		assert.ok(await firstToken.getProperty("focused"), "The first token is focused");
	});

	it("[Home]/[End] navigation", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const lastToken = await tokenizer.$("ui5-token:last-child");

		await firstToken.click();
		await tokenizer.keys("End");
		assert.strictEqual(await lastToken.getProperty("focused"), true, "The last token is focused");

		await tokenizer.keys("Home");
		assert.strictEqual(await firstToken.getProperty("focused"), true, "The first token is focused");
	});

	it("should select tokens with [Shift] key modifier", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
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
		const tokenizer = await browser.$("#nmore-tokenizer");
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
		const tokenizer = await browser.$("#nmore-tokenizer");
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

	it("Clicking delete icon should delete token and place the focus on the previous one", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
		const deleteIcon = await firstToken.shadow$(".ui5-token--icon");

		let tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 5, "Should have 5 tokens");

		await deleteIcon.click();

		tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 4, "Should have 4 tokens after deletion");
		assert.equal(await secondToken.getProperty("focused"), true, "Previous token is focused");
	});

	it("should delete token on [Backspace]", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const secondToken = await tokenizer.$("ui5-token:nth-child(2)");
		let tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 5, "Should have 5 tokens");

		await firstToken.click();
		await browser.keys("Backspace");
		tokens = await tokenizer.$$("ui5-token");

		assert.ok(await secondToken.getProperty("focused"), "The second token is focused on [Backspace]");
		assert.strictEqual(tokens.length, 4, "The tokenizer has 4 tokens");

		await browser.keys(["Control", "A"]);
		await browser.keys("Backspace");
		tokens = await tokenizer.$$("ui5-token");

		assert.strictEqual(tokens.length, 0, "The tokenizer has no tokens");
	});

	it("should delete first and last token with [Backspace]", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		let tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 5, "Should have 5 tokens");

		await firstToken.click();
		await browser.keys("End");
		await browser.keys("Space");
		await browser.keys("Backspace");

		tokens = await tokenizer.$$("ui5-token");
		const lastToken = await tokenizer.$("ui5-token:last-child");

		assert.ok(await lastToken.getProperty("focused"), "The last token is focused after [Backspace]");
		assert.strictEqual(tokens.length, 3, "The tokenizer has 3 tokens");
		assert.ok(await tokenizer.getProperty("expanded"), "Tokenizer should be expanded after token deletion");
	});

	it("should delete token on [Delete]", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const thirdToken = await tokenizer.$("ui5-token:nth-child(3)");
		let tokens = await tokenizer.$$("ui5-token");

		assert.equal(tokens.length, 5, "Should have 5 tokens");

		await firstToken.click();

		// reset token selection
		await browser.keys(["Control", "A"]);
		await browser.keys(["Control", "A"]);

		await browser.keys("ArrowRight");
		await browser.keys("Delete");

		tokens = await tokenizer.$$("ui5-token");

		assert.ok(await thirdToken.getProperty("focused"), "The next token should be focused after [Delete] key is pressed");
		assert.strictEqual(tokens.length, 4, "The tokenizer has 4 tokens");

		await browser.keys(["Control", "A"]);
		await browser.keys("Delete");
		tokens = await tokenizer.$$("ui5-token");

		assert.strictEqual(tokens.length, 0, "The tokenizer has no tokens");
	});

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

		let newScrollLeft = await browser.execute(() => document.querySelector("#nmore-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

		assert.notEqual(newScrollLeft, scrollLeftForthToken, "tokenizer is scrolled again when navigating through the tokens");
	})

	it("should open popover on keyboard combination [Ctrl] + [I]", async () => {
		const tokenizer = await $("#long-tokenizer");
		const firstToken = await tokenizer.$("ui5-token:first-child");
		const rpo = await tokenizer.shadow$("ui5-responsive-popover");

		await firstToken.click();
		await browser.keys(["Control", "i"]);
		assert.ok(await rpo.getProperty("open"), "nMore Popover should be opened");

		await browser.keys(["Control", "i"]);
		assert.notOk(await rpo.getProperty("open"), "nMore Popover should be closed");
	});
});
