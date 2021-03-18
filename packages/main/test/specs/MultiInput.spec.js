const assert = require("chai").assert;

const getTokenizerPopoverId = (inputId) => {
	return browser.execute(async (inputId) => {
		const input = await document.querySelector(`#${inputId}`);
		const staticAreaItem = await (input.shadowRoot.querySelector("ui5-tokenizer").getStaticAreaItemDomRef());

		return staticAreaItem.host.classList[0];
	}, inputId);
}

describe("MultiInput general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/MultiInput.html");
	});

	it("tests expanding of tokenizer", () => {
		const basic = $("#basic-overflow");
		const basicInner = basic.shadow$("input");
		const basicTokenizer = basic.shadow$("ui5-tokenizer");

		basicInner.click();
		basicInner.keys("Tab");

		assert.ok(!basicTokenizer.getProperty("expanded"), "Tokenizer should not be expanded");
	});

	it ("tests opening of tokenizer Popover", () => {
		const tokenizer = $("#basic-overflow").shadow$("ui5-tokenizer");
		const nMoreLabel = tokenizer.shadow$(".ui5-tokenizer-more-text");

		nMoreLabel.click();

		const rpoClassName = getTokenizerPopoverId("basic-overflow");
		const rpo = $(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(rpo.getProperty("opened"), "More Popover should be open");
	});

	it ("fires value-help-trigger on icon press", () => {
		const label = $("#basic-event-listener");
		const icon = $("#basic-overflow-and-icon").shadow$("ui5-icon");
		const EXPECTED_TEXT = "value help icon press"

		assert.strictEqual(label.getText(), "", "event is not fired");

		// act
		icon.click();

		// assert
		assert.strictEqual(label.getText(), EXPECTED_TEXT, "value help press event is fired");

	});

	it ("fires value-help-trigger with F4 and Alt/Option + ArrowUp/Down", () => {
		const eventCounter = $("#value-help-trigger-counter");
		const multiInputInner = $("#multi-with-value-help-icon").shadow$(".ui5-input-inner");

		// act
		multiInputInner.click();
		browser.keys(["Alt", "ArrowUp", "NULL"]);

		// assert
		assert.strictEqual(eventCounter.getProperty("value"), "1", "value help press event is fired");

		// act
		browser.keys("F4");

		// assert
		assert.strictEqual(eventCounter.getProperty("value"), "2", "value help press event is fired");
	});

	it ("adds a token to multi input", () => {
		const mi = $("#single-token");
		const btn = $("#add-to-single");

		assert.strictEqual(mi.$$("ui5-token").length, 1, "should have 1 token");
		$("#suggestion-token").scrollIntoView();

		assert.ok(!mi.$$("ui5-token")[0].getProperty("overflows"), "Token should not overflow");

		btn.click();

		assert.strictEqual(mi.$$("ui5-token").length, 2, "should have 2 tokens");
		assert.ok(!mi.$$("ui5-token")[0].getProperty("overflows"), "Token should not overflow");
		assert.ok(!mi.$$("ui5-token")[1].getProperty("overflows"), "Token should not overflow");
	});

	it ("adds an overflowing token to multi input", () => {
		const mi = $("#multiple-token");
		const btn = $("#add-to-multiple");

		assert.strictEqual(mi.$$("ui5-token").length, 5, "should have 5 token");
		$("#suggestion-token").scrollIntoView();

		assert.ok(!mi.$$("ui5-token")[0].getProperty("overflows"), "Token should not overflow");

		for (let i = 1; i <= 4; i++) {
			assert.ok(mi.$$("ui5-token")[i].getProperty("overflows"), "Token should overflow");
		}

		btn.click();

		assert.strictEqual(mi.$$("ui5-token").length, 6, "should have 6 tokens");

		for (let i = 1; i <= 5; i++) {
			assert.ok(mi.$$("ui5-token")[i].getProperty("overflows"), "Token should overflow");
		}
	});

	it ("adds a token after selection change", () => {
		const mi = $("#suggestion-token");
		const input = mi.shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#suggestion-token");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		input.click();
		input.keys("c");

		assert.ok(popover.getProperty("opened"), "Suggestion Popovoer is open");
		assert.strictEqual(mi.$$("ui5-token").length, 0, "0 tokens");

		popover.$("ui5-li-suggestion-item").click();

		assert.ok(!popover.getProperty("opened"), "Suggestion Popovoer is closed");
		assert.strictEqual(mi.$$("ui5-token").length, 1, "a token is added after selection");
	});

	it ("Placeholder", () => {
		const mi1 = browser.$("#empty-mi").shadow$(".ui5-input-inner");
		const mi2 = browser.$("#mi-with-tokens-customicon").shadow$(".ui5-input-inner");

		assert.strictEqual(mi1.getAttribute("placeholder"), "Placeholder", "a token is added after selection");
		assert.strictEqual(mi2.getAttribute("placeholder"), "", "a token is added after selection");
	});
});

describe("ARIA attributes", () => {
	it ("aria-describedby value according to the tokens count", () => {
		const mi = $("#no-tokens");
		const innerInput = mi.shadow$("input");
		const btn = $("#add-tokens");
		const invisibleText = mi.shadow$(".ui5-hidden-text");
		const inivisbleTextId = invisibleText.getProperty("id");
		let resourceBundleText = null;

		resourceBundleText = browser.execute(() => {
			const mi = document.getElementById("no-tokens");
			return mi.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN);
		});

		assert.strictEqual(mi.$$("ui5-token").length, 0, "should not have tokens");
		assert.strictEqual(innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
		assert.strictEqual(invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

		$("#add-tokens").scrollIntoView();
		btn.click();

		resourceBundleText = browser.execute(() => {
			const mi = document.getElementById("no-tokens");
			return mi.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN);
		});

		assert.strictEqual(mi.$$("ui5-token").length, 1, "should have one token");
		assert.strictEqual(invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

		btn.click();
		assert.strictEqual(mi.$$("ui5-token").length, 2, "should have two tokens");
		assert.strictEqual(invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");
	});

	it ("aria-describedby value according to the tokens and suggestions count", () => {
		const mi = $("#suggestion-token");
		const innerInput = mi.shadow$("input");
		const tokensCountITextId = `${mi.getProperty("_id")}-hiddenText-nMore`;
		const suggestionsITextId = `${mi.getProperty("_id")}-suggestionsText`;
		const suggestionsCountITextId = `${mi.getProperty("_id")}-suggestionsCount`;
		const ariaDescribedBy = `${tokensCountITextId} ${suggestionsITextId}  ${suggestionsCountITextId}`;

		$("#suggestion-token").scrollIntoView();
		innerInput.click();
		innerInput.keys("a");
		innerInput.keys("ArrowDown");
		innerInput.keys("Enter");

		assert.strictEqual(innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby attribute contains multiple references");
	});

	it ("aria-roledescription is set properly", () => {
		const mi = $("#no-tokens");
		const innerInput = mi.shadow$("input");

		assert.strictEqual(innerInput.getAttribute("aria-roledescription"), "Multi Value Input", "aria-roledescription value is correct");
	});
});

