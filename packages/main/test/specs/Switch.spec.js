import { assert } from "chai";

describe("Switch general interaction", async () => {
	before(async () => {
		await browser.url(`test/pages/Switch.html`);
	});

	it("tests change event", async () => {
		const switchEl = await browser.$("#sw");
		const field = await browser.$("#field");

		await switchEl.click();
		await switchEl.keys("Space");
		await switchEl.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", async () => {
		const switchEl = await browser.$("#sw2");
		const field = await browser.$("#field");

		await switchEl.click();
		await switchEl.keys("Space");
		await switchEl.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more");
	});

	it("setting accessible-name on the host is reflected on the root element", async () => {
		const switchEl = await browser.$("#switchAccName").shadow$("div");

		assert.strictEqual(await switchEl.getAttribute("role"), "switch", "Proper role attribute is set");
		assert.strictEqual(await switchEl.getAttribute("aria-label"), "Geographical location No", "Attribute is reflected");
	});

	it("setting accessible-name-ref on the host is reflected on the root element", async () => {
		const switchEl = await browser.$("#switchAccNameRef").shadow$("div");

		assert.strictEqual(await switchEl.getAttribute("role"), "switch", "Proper role attribute is set");
		assert.strictEqual(await switchEl.getAttribute("aria-label"), "Use GPS location No", "Attribute is reflected");
	});

	it("setting tooltip on the host is reflected on the root element", async () => {
		const switchEl = await browser.$("#switchTooltip").shadow$("div");

		assert.strictEqual(await switchEl.getAttribute("title"), "Use GPS location", "Attribute is reflected");
	});

	it("aria-label attribute is properly set when text-on and text-off attributes aren't set", async () => {
		const switchEl = await browser.$("#noLabel").shadow$("div");

		assert.notOk(await switchEl.getAttribute("aria-label"), "Attribute is reflected");
	});

	it("tests change event - value is not changed", async () => {
		const switchPrevented = await browser.$("#switchprevented");
		const currentChecked = await switchPrevented.getProperty("checked");

		await switchPrevented.click();

		assert.strictEqual(await switchPrevented.getProperty("checked"), currentChecked, "The switch is not checked");
	});

	it("The 'required' attribute is propagated properly", async () => {
		assert.strictEqual(await browser.$("#requiredSwitch").shadow$(".ui5-switch-root").getAttribute("aria-required"), "true", "The required attribute is set correctly");
		assert.strictEqual(await browser.$("#switchprevented").shadow$(".ui5-switch-root").getAttribute("aria-required"), "false", "The required attribute is set correctly");
	})

	it("Form should submit only when the 'required' switch is checked", async () => {
		const requiredSwitch = await browser.$("#requiredTestSwitch");

		let formValidity = await browser.execute(() => {
			const form = document.getElementById("switchForm");
			return form.checkValidity();
		});

		assert.strictEqual(formValidity, false, "The form could be submitted successfuly, when the 'required' switch is not checked");

		requiredSwitch.click();
		await browser.pause(1000);

		formValidity = await browser.execute(() => {
			const form = document.getElementById("switchForm");
			return form.checkValidity();
		});

		assert.strictEqual(formValidity, true, "The form could be submitted successfuly, because the 'required' switch is checked");
	});
});
