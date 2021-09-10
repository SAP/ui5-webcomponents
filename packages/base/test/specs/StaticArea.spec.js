const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests control with no static area item", () => {
		const componentId = browser.$("#no-static-area").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		assert.notOk(staticArea.$(`.${componentId}`).isExisting(), "No static area item is defined for this control");
	});

	it("Tests control with static area item", () => {
		const componentId = browser.$("#with-static-area").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		assert.ok(staticArea.$(`.${componentId}`).isExisting(), "No static area item is defined for this control");
	});

	it("Tests removing an element with static area", () => {
		const result = browser.execute(() => {
			let res = true;
			window.onerror = (errorMsg, url, lineNumber) => {
				res = false;
			}

			document.querySelector("#no-static-area").remove();

			return res;
		});

		assert.ok(result, "Static area removed from DOM successfully");
	});

	it("Test RTL not set for static area items", () => {
		const componentId = browser.$("#with-static-area").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		assert.notOk(staticArea.$(`.${componentId}`).getAttribute("dir"), "dir attribute not set for static area item");
	});

	it("Test RTL set for static area items", () => {
		const componentId = browser.$("#with-static-area-rtl").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		assert.equal(staticArea.$(`.${componentId}`).getAttribute("dir"), "rtl", "dir property correctly set for static area item");
	});

	it("Test setting RTL for a static area item owner", () => {
		const componentId = browser.$("#with-static-area").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		browser.$("#with-static-area").setAttribute("dir", "rtl");
		browser.executeAsync( async (done) => {
			await window["sap-ui-webcomponents-bundle"].applyDirection();
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done();
		});
		assert.equal(staticArea.$(`.${componentId}`).getAttribute("dir"), "rtl", "dir attribute dynamically set for static area item owner");
	});

	it("Test removing RTL for a static area item owner", () => {
		const componentId = browser.$("#with-static-area-rtl").getProperty("_id");
		const staticArea = browser.$("ui5-static-area");

		browser.$("#with-static-area-rtl-container").removeAttribute("dir");
		browser.executeAsync( async (done) => {
			await window["sap-ui-webcomponents-bundle"].applyDirection();
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			return done();
		});
		assert.notOk(staticArea.$(`.${componentId}`).getAttribute("dir"), "dir attribute dynamically removed for static area item owner");
	});
});
