const assert = require("chai").assert;

describe("Some configuration options can be changed at runtime", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests control with no static area item", async () => {
		const componentId = await browser.$("#no-static-area").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		assert.notOk(await staticArea.$(`.${componentId}`).isExisting(), "No static area item is defined for this control");
	});

	it("Tests control with static area item", async () => {
		const componentId = await browser.$("#with-static-area").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		assert.ok(await staticArea.$(`.${componentId}`).isExisting(), "No static area item is defined for this control");
	});

	it("Tests removing an element with static area", async () => {
		const result = await browser.executeAsync(done => {
			let res = true;
			window.onerror = (errorMsg, url, lineNumber) => {
				res = false;
			}

			document.querySelector("#no-static-area").remove();

			done(res);
		});

		assert.ok(result, "Static area removed from DOM successfully");
	});

	it("Test RTL not set for static area items", async () => {
		const componentId = await browser.$("#with-static-area").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		assert.notOk(await staticArea.$(`.${componentId}`).getAttribute("dir"), "dir attribute not set for static area item");
	});

	it("Test RTL set for static area items", async () => {
		const componentId = await browser.$("#with-static-area-rtl").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		assert.equal(await staticArea.$(`.${componentId}`).getAttribute("dir"), "rtl", "dir property correctly set for static area item");
	});

	it("Test setting RTL for a static area item owner", async () => {
		const componentId = await browser.$("#with-static-area").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		await browser.$("#with-static-area").setAttribute("dir", "rtl");
		await browser.executeAsync( async (done) => {
			await window["sap-ui-webcomponents-bundle"].applyDirection();
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done();
		});
		assert.equal(await staticArea.$(`.${componentId}`).getAttribute("dir"), "rtl", "dir attribute dynamically set for static area item owner");
	});

	it("Test removing RTL for a static area item owner", async () => {
		const componentId = await browser.$("#with-static-area-rtl").getProperty("_id");
		const staticArea = await browser.$("ui5-static-area");

		await browser.$("#with-static-area-rtl-container").removeAttribute("dir");
		await browser.executeAsync( async (done) => {
			await window["sap-ui-webcomponents-bundle"].applyDirection();
			await window["sap-ui-webcomponents-bundle"].renderFinished();

			done();
		});
		assert.notOk(await staticArea.$(`.${componentId}`).getAttribute("dir"), "dir attribute dynamically removed for static area item owner");
	});
});
