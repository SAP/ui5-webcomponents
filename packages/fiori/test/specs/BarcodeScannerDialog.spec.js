
const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("BarcodeScannerDialog Behavior", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/BarcodeScannerDialog.html`);
	});

	it("fires scan-error when no persions granted", () => {
		// Setup: deny permissions to access the camera
		browser.setPermissions({ name: 'camera'}, 'denied');
		const btnScan = browser.$("#btnScan"),
		scanError = browser.$("#scanError");
		
		btnScan.click();

		browser.waitUntil(() => {
			return scanError.getText().length > 0;
		}, 25000, "expect scan-error output");

		// assert
		assert.ok(scanError.getText().length > 0, "fires scan-error when no permissions");
	});

	it("opens and closes the dialog", () => {
		// Setup: grant permissions to access the camera
		browser.setPermissions({ name: 'camera'}, 'granted');
		const btnScan = browser.$("#btnScan"),
		dlgScan = browser.$("#dlgScan");
		
		btnScan.click();

		browser.waitUntil(() => {
			return dlgScan.getProperty("_isOpen") === true;
		}, 2500, "expect the dialog to open");

		// assert
		assert.strictEqual(dlgScan.getProperty("_isOpen"), true, "the dialog is open");

		browser.execute(() => {
			const dlgScan = document.getElementById("dlgScan");
			dlgScan.close();
		});

		// assert
		assert.strictEqual(dlgScan.getProperty("_isOpen"), false, "the dialog is closed");
	});

});
