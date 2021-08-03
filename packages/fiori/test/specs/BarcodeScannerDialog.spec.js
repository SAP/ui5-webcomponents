
const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("BarcodeScannerDialog Behavior", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/BarcodeScannerDialog.html`);
	});

	it("fires scan-error when no permissions granted", () => {
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

});
