const assert = require("chai").assert;

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
});
