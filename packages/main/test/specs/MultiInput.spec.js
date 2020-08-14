// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require("chai").assert;

const getTokenizerPopoverId = (inputId) => {
	return browser.execute(async (inputId) => {
		const input = await document.querySelector(`#${inputId}`);
		const staticAreaItem = await (input.shadowRoot.querySelector("ui5-tokenizer").getStaticAreaItemDomRef());
		
		return staticAreaItem.host.classList[0];
	}, inputId);
}

describe("MultiInput general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/MultiInput.html");

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
		const nMoreLable = tokenizer.shadow$(".ui5-tokenizer-more-text");
		
		nMoreLable.click();

		const rpoClassName = getTokenizerPopoverId("basic-overflow");
		const rpo = $(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(rpo.getProperty("opened"), "More Popover should be open");
	});
	
	it ("fires value help icon press", () => {
		const lable = $("#basic-event-listener");
		const icon = $("#basic-overflow-and-icon").shadow$("ui5-icon");

		assert.strictEqual(lable.getText(), "", "event is not fired");

		icon.click();

		assert.strictEqual(lable.getText(), "value help icon press", "value help press event is fired");		
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
});
