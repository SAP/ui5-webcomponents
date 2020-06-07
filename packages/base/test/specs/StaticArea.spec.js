const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");

	it("Tests component with no static area item", () => {
		const component = browser.$("#parent");

		const staticAreaItem = browser.execute(async component => {
			return await component.getStaticAreaItemDomRef();
		}, component);

		assert.notOk(staticAreaItem, "No static area item is defined for this component");
	});

	it("Tests component with static area item", () => {
		const component = browser.$("#with-static-area");
		const staticAreaItem = browser.execute(async component => {
			return (await component.getStaticAreaItemDomRef()).host.tagName;
		}, component);

		assert.strictEqual(staticAreaItem, "UI5-STATIC-AREA-ITEM", "Static area item is defined for this component");
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
