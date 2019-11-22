const assert = require("chai").assert;


describe("RTL set via language config", () => {
	it("language forces RTL if RTL not specified", () => {
		browser.url("http://localhost:8080/test-resources/pages/Button.html?sap-ui-language=he");

		const buttonRoot = browser.$("#button1").shadow$(".ui5-button-root");
		assert.strictEqual(buttonRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	
	it("comfig forces RTL", () => {
		browser.url("http://localhost:8080/test-resources/pages/Button.html?sap-ui-rtl=true");

		const buttonRoot = browser.$("#button1").shadow$(".ui5-button-root");
		assert.strictEqual(buttonRoot.getProperty("dir"), "rtl", "dir is correctly set");
	});

	
	it("comfig unsets RTL, although rtl language is used", () => {
		browser.url("http://localhost:8080/test-resources/pages/Button.html?sap-ui-rtl=false&sap-ui-language=he");

		const buttonRoot = browser.$("#button1").shadow$(".ui5-button-root");
		assert.notOk(buttonRoot.getProperty("dir"), "dir is correctly set");
	});
});