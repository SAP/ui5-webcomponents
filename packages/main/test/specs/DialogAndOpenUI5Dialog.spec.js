import { assert } from "chai";

describe("Dialog general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DialogAndOpenUI5Dialog.html`);
	});

	it("opening and focusing", async () => {
		await browser.$("#openUI5Button").waitForExist({
			timeout: 3000,
			timeoutMsg: "Busy area must be created after 3000ms"
		});

		await browser.$("#myButton").click();
		await browser.$("#dialogButton").click();
		await browser.$("#openUI5DialogButton").click();

		assert.ok(await browser.$("#someButton").isFocused(), "button is focused");
	});
});
