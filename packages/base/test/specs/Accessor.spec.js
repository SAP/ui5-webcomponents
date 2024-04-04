import { assert } from "chai";

describe("Framework boot", async () => {
	before(async () => {
		await browser.url("test/pages/Accessor.html");
	});

	it("Setting property updates attribute, state and DOM", async () => {
		// set to true
		const res = await browser.executeAsync( async (done) => {
			const el = document.getElementById("accessor");
			el.myProp = true;
			await window["sap-ui-webcomponents-bundle"].renderFinished();
			done([el.getAttribute("my-prop"), el.shadowRoot.querySelector("div").innerText, el.storage]);
		});

		assert.strictEqual(res[0], "", "attribute is set");
		assert.strictEqual(res[1], "true", "content is rendered in shadowDOM");
		assert.strictEqual(res[2], true, "internal storage is updated");

		// set to false
		const res2 = await browser.executeAsync( async (done) => {
			const el = document.getElementById("accessor");
			el.myProp = false;
			await window["sap-ui-webcomponents-bundle"].renderFinished();
			done([el.getAttribute("my-prop"), el.shadowRoot.querySelector("div").innerText, el.storage]);
		});

		assert.strictEqual(res2[0], null, "attribute is removed");
		assert.strictEqual(res2[1], "false", "content is rendered in shadowDOM");
		assert.strictEqual(res2[2], false, "internal storage is updated");
	});

	it("Setting attribute updates property, state and DOM", async () => {
		// set to true
		const res = await browser.executeAsync( async (done) => {
			const el = document.getElementById("accessor");
			el.setAttribute("my-prop", "");
			await window["sap-ui-webcomponents-bundle"].renderFinished();
			done([el.myProp, el.shadowRoot.querySelector("div").innerText, el.storage]);
		});

		assert.strictEqual(res[0], true, "property is updated");
		assert.strictEqual(res[1], "true", "content is rendered in shadowDOM");
		assert.strictEqual(res[2], true, "internal storage is updated");

		// set to false
		const res2 = await browser.executeAsync( async (done) => {
			const el = document.getElementById("accessor");
			el.removeAttribute("my-prop")
			await window["sap-ui-webcomponents-bundle"].renderFinished();
			done([el.myProp, el.shadowRoot.querySelector("div").innerText, el.storage]);
		});

		assert.strictEqual(res2[0], false, "property is updated");
		assert.strictEqual(res2[1], "false", "content is rendered in shadowDOM");
		assert.strictEqual(res2[2], false, "internal storage is updated");
	});

});