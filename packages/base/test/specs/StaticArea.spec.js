const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

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
});
