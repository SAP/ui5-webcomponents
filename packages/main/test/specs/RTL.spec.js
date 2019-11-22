const assert = require("chai").assert;


describe("RTL", () => {
	browser.url("http://localhost:8080/test-resources/pages/Button.html?sap-ui-language=he");

	it("language forces RTL if RTL not specified", () => {
		const buttonRoot = browser.$("#button1").shadow$(".ui5-button-root");
		assert.strictEqual(buttonRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});
});
