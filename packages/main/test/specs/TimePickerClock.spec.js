import { assert } from "chai";

describe("Clock API", () => {
	before(async () => {
		await browser.url(`test/pages/TimePickerClock.html`);
	});

	it("'disabled' property", async () => {
		const hours12 = await browser.$("#myHours12");
		const hours12Disabled = await browser.$("#myHours12Disabled");
		const enabled = await hours12.shadow$(".ui5-tp-clock-cover");
		const disabled = await hours12Disabled.shadow$(".ui5-tp-clock-cover");

		await disabled.click({ x: 45, y: -110, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours12Disabled.getProperty("selectedValue"), 12, "There is no value change after click on 1st number on disabled clock");

		await enabled.click({ x: 45, y: -110, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours12.getProperty("selectedValue"), 1, "There is proper value set after click on 1st number on enabled clock");
	});

	it("'active' property", async () => {
		const minutesActive = await browser.$("#myMinutes");
		const minutesInactive = await browser.$("#myMinutesInactive");
		const activeCSS = await minutesActive.shadow$(".ui5-tp-clock").getCSSProperty("display");
		const inactiveCSS = await minutesInactive.shadow$(".ui5-tp-clock").getCSSProperty("display");

		assert.strictEqual(activeCSS.value, "block", "The clock with active=true is visible");
		assert.strictEqual(inactiveCSS.value, "none", "The clock with active=false is invisible");
	});

	it("'showInnerCircle' property", async () => {
		const hours12 = await browser.$("#myHours12");
		const hours24 = await browser.$("#myHours24");
		const minutes10 = await browser.$("#myMinutes10");
		const numbersInHours12 = await hours12.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");
		const numbersInHours24 = await hours24.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");

		assert.strictEqual(numbersInHours12.length, 12, "There are 12 numbers rendered in clock with showInnerCircle=false");
		assert.strictEqual(numbersInHours24.length, 24, "There are 24 numbers rendered in clock with showInnerCircle=true");
	});

	it("'displayStep' and 'valueStep' properties", async () => {
		const hours12 = await browser.$("#myHours12");
		const minutes = await browser.$("#myMinutes");
		const minutes10 = await browser.$("#myMinutes10");
		const numbersInHours12 = await hours12.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");
		const numbersInMinutes = await minutes.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");
		const numbersInMinutes10 = await minutes10.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");

		assert.strictEqual(numbersInHours12.length, 12, "There are 12 numbers rendered in clock with itemMax=12, displayStep=1 and valueStep=1");
		assert.strictEqual(numbersInMinutes.length, 12, "There are 12 numbers rendered in clock with itemMax=60, displayStep=5 and valueStep=1");
		assert.strictEqual(numbersInMinutes10.length, 6, "There are 6 numbers rendered in clock with itemMax=60, displayStep=10 and valueStep=10");
	});

	it("'lastItemReplacement' and 'prependZero' properties", async () => {
		const hours24 = await browser.$("#myHours24");
		const minutes = await browser.$("#myMinutes");
		const numbersInHours24 = await hours24.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");
		const numbersInMinutes = await minutes.shadow$$(".ui5-tp-clock-item:not([marker]) .ui5-tp-clock-number");

		assert.strictEqual(await numbersInHours24[numbersInHours24.length-1].getText(), "00", "The last number element in clock with prependZero=false and no lastItemReplacement property set is '24'");
		assert.strictEqual(await numbersInMinutes[numbersInMinutes.length-1].getText(), "0", "The last number element in clock with prependZero=false and lastItemReplacement=0 is '0'");
	});
});

describe("Clock item selection", () => {
	it("select clock item and 'change' event", async () => {
		const hours12 = await browser.$("#myHours12");
		const hours24 = await browser.$("#myHours24");
		const hours12Cover = await hours12.shadow$(".ui5-tp-clock-cover");
		const hours24Cover = await hours24.shadow$(".ui5-tp-clock-cover");
		const valueInput = await browser.$("#clockChangeValue");
		const countInput = await browser.$("#clockChangeEvent");

		await hours12Cover.click({ x: 50, y: -100, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours12.getProperty("selectedValue"), 1, "The selected value is proper");
		assert.strictEqual(Number(parseInt(await valueInput.getValue())), 1, "The event returned proper value");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 2, "The event is fired once");

		await hours12Cover.click({ x: 0, y: -110, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours12.getProperty("selectedValue"), 12, "The selected value is proper");
		assert.strictEqual(Number(parseInt(await valueInput.getValue())), 12, "The event returned proper value");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 3, "The event is fired once");

		await hours24Cover.click({ x: -55, y: -105, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours24.getProperty("selectedValue"), 11, "The selected value is proper");
		assert.strictEqual(Number(parseInt(await valueInput.getValue())), 11, "The event returned proper value");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 4, "The event is fired once");

		await hours24Cover.click({ x: -40, y: -60, skipRelease: true });
		await browser.pause(500);
		assert.strictEqual(await hours24.getProperty("selectedValue"), 23, "The selected value is proper");
		assert.strictEqual(Number(parseInt(await valueInput.getValue())), 23, "The event returned proper value");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 5, "The event is fired once");

	});
});