import { assert } from "chai";

describe("Clock API", () => {
	it("disabled", async () => {
		await browser.url(`test/pages/TimePickerClock.html`);
		const hours12 = await browser.$("#myHours12");
		const hours12disabled = await browser.$("#myHours12D");
		const clockValue = await browser.$("#clockChangeValue");

		const enabled = await hours12.shadow$(".ui5-tp-clock-cover");
		const disabled = await hours12disabled.shadow$(".ui5-tp-clock-cover");

		await enabled.click({ x: 195, y: 35, skipRelease: true });
		assert.strictEqual(await hours12.getProperty("_selectedValue"), 1, "There is proper value set after click on 1st number on enabled clock");
	});
});