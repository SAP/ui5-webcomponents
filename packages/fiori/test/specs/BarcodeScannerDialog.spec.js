import { assert } from "chai";

describe("BarcodeScannerDialog Behavior", () => {
	before(async () => {
		await browser.url(`test/pages/BarcodeScannerDialog.html`);
	});

	it("fires scan-error when no permissions granted", async () => {
		// Setup: deny permissions to access the camera
		await browser.setPermissions({ name: 'camera'}, 'denied');
		const btnScan = await browser.$("#btnScan"),
		scanError = await browser.$("#scanError");

		await btnScan.click();

		await browser.waitUntil(async () => {
			return (await scanError.getText()).length > 0;
		}, 25000, "expect scan-error output");

		// assert
		const scanErrorText = await scanError.getText();
		assert.ok(scanErrorText.length, "fires scan-error when no permissions");
	});

});
