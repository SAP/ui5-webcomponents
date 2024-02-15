import { assert } from "chai";

describe("BarcodeScannerDialog Behavior", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/BarcodeScannerDialog.html`);
	});

	it("should grant webcam permission", async () => {
		await browser.setPermissions({ name: 'camera' }, 'granted');

		const permissionStatus = await browser.executeAsync(async (done) => {
			await navigator.permissions.query({ name: 'camera' }).then(result => {
				done(result.state);  // 'granted', 'denied' or 'prompt'
			});
		});

		assert.equal(permissionStatus, "granted", "Camera permission granted");
	});

	it("fires scan-error when no permissions granted", async () => {
		// Setup: deny permissions to access the camera
		await browser.setPermissions({ name: 'camera' }, 'denied');
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
