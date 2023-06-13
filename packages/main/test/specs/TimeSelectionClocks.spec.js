import { assert } from "chai";

describe("Interactions", () => {
	before(async () => {
		await browser.url(`test/pages/TimeSelectionClocks.html`);
	});

	it("switch active clock", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");

		assert.strictEqual(await clocks.length, 3, "There are 3 clock components");

		// switch clocks by button
		await buttons[0].click();
		assert.ok(await clocks[0].getProperty("active"), "First clock is active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await buttons[1].click();
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.ok(await clocks[1].getProperty("active"), "Second clock is active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await buttons[2].click();
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		// switch clock by pressing colon (:)
		await browser.keys(":");
		assert.ok(await clocks[0].getProperty("active"), "First clock is active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys(":");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.ok(await clocks[1].getProperty("active"), "Second clock is active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys(":");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		// switch clock by pressing space
		await browser.keys(" ");
		assert.ok(await clocks[0].getProperty("active"), "First clock is active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys(" ");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.ok(await clocks[1].getProperty("active"), "Second clock is active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys(" ");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");
	});

	it("switch AM/PM", async () => {
		const clocksAmPmComponent = await browser.$("#myClocksAmPm");
		const amPmSegmentedButon = await clocksAmPmComponent.shadow$("ui5-segmented-button");
		const amButtonItem =  await amPmSegmentedButon.$("ui5-segmented-button-item:first-child");
		const pmButtonItem =  await amPmSegmentedButon.$("ui5-segmented-button-item:last-child");
		const buttons = await clocksAmPmComponent.shadow$$("ui5-toggle-spin-button");

		await buttons[0].click();

		assert.notOk(await amButtonItem.getProperty("pressed"), "AM should not be pressed");
		assert.ok(await pmButtonItem.getProperty("pressed"), "PM should be pressed");

		await browser.keys("a");
		assert.ok(await amButtonItem.getProperty("pressed"), "AM should be pressed");
		assert.notOk(await pmButtonItem.getProperty("pressed"), "PM should not be pressed");

		await browser.keys("p");
		assert.notOk(await amButtonItem.getProperty("pressed"), "AM should not be pressed");
		assert.ok(await pmButtonItem.getProperty("pressed"), "PM should be pressed");
	});

	it("arrow keys", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");

		await buttons[0].click();

		// change hours
		await browser.keys("ArrowDown");
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 11, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "11", "value is displayed on a button");

		await browser.keys("ArrowUp");
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 12, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "12", "value is displayed on a button");

		// change minutes
		await browser.keys(":");

		await browser.keys("ArrowDown");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 19, "value is changed");
		assert.strictEqual(await buttons[1].getText(), "19", "value is displayed on a button");

		await browser.keys("ArrowUp");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 20, "value is changed");
		assert.strictEqual(await buttons[1].getText(), "20", "value is displayed on a button");

		// change seconds
		await browser.keys(":");

		await browser.keys("ArrowDown");
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 39, "value is changed");
		assert.strictEqual(await buttons[2].getText(), "39", "value is displayed on a button");

		await browser.keys("ArrowUp");
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 40, "value is changed");
		assert.strictEqual(await buttons[2].getText(), "40", "value is displayed on a button");
	});

	it("pageup/pagedown", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");

		await buttons[0].click();

		// change hours
		await browser.keys("PageDown");
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 11, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "11", "value is displayed on a button");
		assert.ok(await clocks[0].getProperty("active"), "First clock is active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys("PageUp");
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 12, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "12", "value is displayed on a button");

		// change minutes
		await browser.keys(["Shift", "PageDown"]);
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 19, "value is changed");
		assert.strictEqual(await buttons[1].getText(), "19", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.ok(await clocks[1].getProperty("active"), "Second clock is active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.keys(["Shift", "PageUp"]);
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 20, "value is changed");
		assert.strictEqual(await buttons[1].getText(), "20", "value is displayed on a button");

		// change seconds
		await browser.keys(["Control", "Shift", "PageDown"]);
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 39, "value is changed");
		assert.strictEqual(await buttons[2].getText(), "39", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		await browser.keys(["Control", "Shift", "PageUp"]);
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 40, "value is changed");
		assert.strictEqual(await buttons[2].getText(), "40", "value is displayed on a button");
	});

	it("direct number typing", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");

		await buttons[0].click();

		await browser.keys(["0", "8", "2", "4", "1", "3"]);
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 8, "value is changed");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 24, "value is changed");
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 13, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "08", "value is displayed on a button");
		assert.strictEqual(await buttons[1].getText(), "24", "value is displayed on a button");
		assert.strictEqual(await buttons[2].getText(), "13", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		await browser.keys(":"); // return back to first clock

		await browser.keys(["3", "6", "8"]);
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 3, "value is changed");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 6, "value is changed");
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 8, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "03", "value is displayed on a button");
		assert.strictEqual(await buttons[1].getText(), "06", "value is displayed on a button");
		assert.strictEqual(await buttons[2].getText(), "08", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		await browser.keys(":"); // return back to first clock

		await browser.keys(["1", "1", "8"]);
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 11, "value is changed");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 8, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "11", "value is displayed on a button");
		assert.strictEqual(await buttons[1].getText(), "08", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");

		await browser.keys(":"); // return back to first clock

		await browser.keys(["2", "5"]);
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 2, "value is changed");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 5, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "02", "value is displayed on a button");
		assert.strictEqual(await buttons[1].getText(), "05", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.ok(await clocks[1].getProperty("active"), "Second clock is active");
		assert.notOk(await clocks[2].getProperty("active"), "Third clock is not active");

		await browser.pause(1500); // simulate cooldown

		await browser.keys(["3", "2", "1", "0"]);
		assert.strictEqual(await clocks[0].getProperty("selectedValue"), 2, "value is changed");
		assert.strictEqual(await clocks[1].getProperty("selectedValue"), 32, "value is changed");
		assert.strictEqual(await clocks[2].getProperty("selectedValue"), 10, "value is changed");
		assert.strictEqual(await buttons[0].getText(), "02", "value is displayed on a button");
		assert.strictEqual(await buttons[1].getText(), "32", "value is displayed on a button");
		assert.strictEqual(await buttons[2].getText(), "10", "value is displayed on a button");
		assert.notOk(await clocks[0].getProperty("active"), "First clock is not active");
		assert.notOk(await clocks[1].getProperty("active"), "Second clock is not active");
		assert.ok(await clocks[2].getProperty("active"), "Third clock is active");
	});

});

describe("Accessibility", () => {
	it("accessibility-related attributes", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocksWrapper = clocksComponent.shadow$(".ui5-time-picker-tsc-clocks");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");

		assert.strictEqual(await clocksWrapper.getAttribute("role"), "img", "Clocks component has the proper role");

		// Hours button
		assert.strictEqual(await buttons[0].getAttribute("value-min"), "0", "Hours button have proper value-min attribute");
		assert.strictEqual(await buttons[0].getAttribute("value-max"), "23", "Hours button have proper value-max attribute");
		assert.strictEqual(Number(await buttons[0].getAttribute("value-now")), await clocks[0].getProperty("selectedValue"),
							"Hours button have proper value-now attribute");
		assert.ok(await buttons[0].getAttribute("accessible-name"), "Hours button have accessible-name attribute");
		assert.strictEqual(await buttons[0].getAttribute("value-text"),
							await buttons[0].getAttribute("value-now") + " " + await buttons[0].getAttribute("accessible-name"),
							"Hours button have proper value-text attribute");

		// Minutes button
		assert.strictEqual(await buttons[1].getAttribute("value-min"), "0", "Minutes button have proper value-min attribute");
		assert.strictEqual(await buttons[1].getAttribute("value-max"), "59", "Minutes button have proper value-max attribute");
		assert.strictEqual(Number(await buttons[1].getAttribute("value-now")), await clocks[1].getProperty("selectedValue"),
							"Minutes button have proper value-now attribute");
		assert.ok(await buttons[1].getAttribute("accessible-name"), "Minutes button have accessible-name attribute");
		assert.strictEqual(await buttons[1].getAttribute("value-text"),
							await buttons[1].getAttribute("value-now") + " " + await buttons[1].getAttribute("accessible-name"),
							"Minutes button have proper value-text attribute");

		// Seconds button
		assert.strictEqual(await buttons[2].getAttribute("value-min"), "0", "Seconds button have proper value-min attribute");
		assert.strictEqual(await buttons[2].getAttribute("value-max"), "59", "Seconds button have proper value-max attribute");
		assert.strictEqual(Number(await buttons[2].getAttribute("value-now")), await clocks[2].getProperty("selectedValue"),
							"Seconds button have proper value-now attribute");
		assert.ok(await buttons[2].getAttribute("accessible-name"), "Seconds button have accessible-name attribute");
		assert.strictEqual(await buttons[2].getAttribute("value-text"),
							await buttons[2].getAttribute("value-now") + " " + await buttons[2].getAttribute("accessible-name"),
							"Seconds button have proper value-text attribute");
	});

	it("change of accessibility-related attributes during interactions", async () => {
		const clocksComponent = await browser.$("#myClocks");
		const clocksWrapper = clocksComponent.shadow$(".ui5-time-picker-tsc-clocks");
		const buttons = await clocksComponent.shadow$$("ui5-toggle-spin-button");
		const clocks = await clocksComponent.shadow$$("ui5-time-picker-clock");

		await buttons[0].click();

		// Hours button
		assert.strictEqual(Number(await buttons[0].getAttribute("value-now")), await clocks[0].getProperty("selectedValue"),
							"Hours button have proper value-now attribute");
		assert.strictEqual(await buttons[0].getAttribute("value-text"),
							await buttons[0].getAttribute("value-now") + " " + await buttons[0].getAttribute("accessible-name"),
							"Hours button have proper value-text attribute");

		await browser.keys("ArrowDown");
		assert.strictEqual(Number(await buttons[0].getAttribute("value-now")), await clocks[0].getProperty("selectedValue"),
							"Hours button have proper value-now attribute after interaction");
		assert.strictEqual(await buttons[0].getAttribute("value-text"),
							await buttons[0].getAttribute("value-now") + " " + await buttons[0].getAttribute("accessible-name"),
							"Hours button have proper value-text attribute after interaction");

		// Minutes button
		await browser.keys(":");
		assert.strictEqual(Number(await buttons[1].getAttribute("value-now")), await clocks[1].getProperty("selectedValue"),
							"Minutes button have proper value-now attribute");
		assert.strictEqual(await buttons[1].getAttribute("value-text"),
							await buttons[1].getAttribute("value-now") + " " + await buttons[1].getAttribute("accessible-name"),
							"Minutes button have proper value-text attribute");

		await browser.keys("ArrowDown");
		assert.strictEqual(Number(await buttons[1].getAttribute("value-now")), await clocks[1].getProperty("selectedValue"),
							"Minutes button have proper value-now attribute after interaction");
		assert.strictEqual(await buttons[1].getAttribute("value-text"),
							await buttons[1].getAttribute("value-now") + " " + await buttons[1].getAttribute("accessible-name"),
							"Minutes button have proper value-text attribute after interaction");

		// Seconds button
		await browser.keys(":");
		assert.strictEqual(Number(await buttons[2].getAttribute("value-now")), await clocks[2].getProperty("selectedValue"),
							"Seconds button have proper value-now attribute");
		assert.strictEqual(await buttons[2].getAttribute("value-text"),
							await buttons[2].getAttribute("value-now") + " " + await buttons[2].getAttribute("accessible-name"),
							"Seconds button have proper value-text attribute");

		await browser.keys("ArrowDown");
		assert.strictEqual(Number(await buttons[2].getAttribute("value-now")), await clocks[2].getProperty("selectedValue"),
							"Seconds button have proper value-now attribute after interaction");
		assert.strictEqual(await buttons[2].getAttribute("value-text"),
							await buttons[2].getAttribute("value-now") + " " + await buttons[2].getAttribute("accessible-name"),
							"Seconds button have proper value-text attribute after interaction");
	});
});

describe("Events", () => {
	it("'change' event", async () => {
		const amPmClocksComponent = await browser.$("#myClocksAmPm");
		const buttons = await amPmClocksComponent.shadow$$("ui5-toggle-spin-button");
		const countInput = await browser.$("#clocksChangeEvent");

		await buttons[0].click();

		await browser.keys("PageDown");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 3, "The event is fired after hours change");

		await browser.keys(["Shift", "PageDown"]);
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 4, "The event is fired after minutes change");

		await browser.keys(["Control", "Shift", "PageDown"]);
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 5, "The event is fired after seconds change");

		await browser.keys("a");
		assert.strictEqual(Number(parseInt(await countInput.getValue())), 6, "The event is fired after AM/PM change");
	});
});

