import { assert } from "chai";

describe("Interactions", () => {

	it("active clock", async () => {
		await browser.url(`test/pages/TimeSelectionClocks.html`);
		const clocksComponent = await browser.$("#myClocks");
		const clocksList = await clocksComponent.shadow$$("ui5-time-picker-clock");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");

		assert.strictEqual(await clocksList.length, 3, "There are 3 clock components");
		await buttons[0].click();

		assert.strictEqual(await clocksList[0].getProperty("active"), true, "First clock is active");
		assert.strictEqual(await clocksList[1].getProperty("active"), false, "Second clock is not active");
		assert.strictEqual(await clocksList[2].getProperty("active"), false, "Third clock is not active");

		await browser.keys(":");
		assert.strictEqual(await clocksList[0].getProperty("active"), false, "First clock is not active");
		assert.strictEqual(await clocksList[1].getProperty("active"), true, "Second clock is active");
		assert.strictEqual(await clocksList[2].getProperty("active"), false, "Third clock is not active");

		await browser.keys(":");
		assert.strictEqual(await clocksList[0].getProperty("active"), false, "First clock is not active");
		assert.strictEqual(await clocksList[1].getProperty("active"), false, "Second clock is not active");
		assert.strictEqual(await clocksList[2].getProperty("active"), true, "Third clock is active");

		await browser.keys(":");

		assert.strictEqual(await clocksList[0].getProperty("active"), true, "First clock is active");
		assert.strictEqual(await clocksList[1].getProperty("active"), false, "Second clock is not active");
		assert.strictEqual(await clocksList[2].getProperty("active"), false, "Third clock is not active");
	});

});