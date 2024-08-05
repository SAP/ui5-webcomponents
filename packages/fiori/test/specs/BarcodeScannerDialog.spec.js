import { assert } from "chai";

describe("BarcodeScannerDialog Behavior", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/BarcodeScannerDialog.html`);
	});

	it("opens barcode scanner dialog", async () => {
		await browser.setPermissions({ name: "camera" }, "granted");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const dialog = await browser.$("#dlgScan");
		const dialogOpened = await dialog.hasAttribute("open");
		assert.strictEqual(dialogOpened, true, "Dialog is opened.");

		const videoElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-video");
		await videoElement.waitForDisplayed();

		const isVideoSrcObjectSet = await browser.execute(video => {
			return video.srcObject !== null;
		}, videoElement);

		assert.strictEqual(isVideoSrcObjectSet, true, "Video srcObject is set.");

		// Check if the canvas dimensions match the video element's dimensions
		// This is important for the barcode scanner to work correctly
		const overlayElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-overlay");
		const canvasDimensionsMatch = await browser.execute((canvas, video) => {
			return canvas.width === video.clientWidth && canvas.height === video.clientHeight;
		}, overlayElement, videoElement);

		assert.strictEqual(canvasDimensionsMatch, true, "Canvas dimensions match the video element's dimensions.");
	});

	it("closes barcode scanner dialog", async () => {
		await browser.setPermissions({ name: "camera" }, "granted");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const dialog = await browser.$("#dlgScan");
		const videoElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-video");
		await videoElement.waitForDisplayed();

		const btnClose = await dialog.shadow$(".ui5-barcode-scanner-dialog-footer > ui5-button");
		await btnClose.click();

		const dialogClosed = await dialog.hasAttribute("open");
		assert.strictEqual(dialogClosed, false, "Dialog is closed.");
	});

	it("closes barcode scanner dialog with escape key", async () => {
		await browser.setPermissions({ name: "camera" }, "granted");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const dialog = await browser.$("#dlgScan");
		const videoElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-video");
		await videoElement.waitForDisplayed();

		await browser.keys("Escape");

		const dialogClosed = await dialog.hasAttribute("open");
		assert.strictEqual(dialogClosed, false, "Dialog is closed after pressing the Escape key.");
	});

	it("should clear the stream and stop tracks when dialog is closed", async () => {
		await browser.setPermissions({ name: "camera" }, "granted");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const dialog = await browser.$("#dlgScan");
		const videoElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-video");
		await videoElement.waitForDisplayed();

		// Ensure that the video srcObject is set and save the stream in the browser context
		const isVideoSrcObjectSet = await browser.execute(() => {
			const video = document.querySelector("#dlgScan").shadowRoot.querySelector(".ui5-barcode-scanner-dialog-video")
			window.savedStream = video.srcObject; // Save the stream in a global variable within the browser context
			return video.srcObject !== null;
		});
		assert.strictEqual(isVideoSrcObjectSet, true, "Video srcObject is set.");

		const btnClose = await dialog.shadow$(".ui5-barcode-scanner-dialog-footer > ui5-button");
		await btnClose.click();

		const dialogClosed = await dialog.hasAttribute("open");
		assert.strictEqual(dialogClosed, false, "Dialog is closed.");

		// Check if tracks are stopped and srcObject is cleared
		const { tracksStopped, srcObjectCleared } = await browser.execute(() => {
			const video = document.querySelector("#dlgScan").shadowRoot.querySelector(".ui5-barcode-scanner-dialog-video")
			const stream = window.savedStream;  // Retrieve the stream from the global variable
			const tracksStopped = stream.getTracks().every(track => track.readyState === 'ended');
			const srcObjectCleared = video.srcObject === null;
			return { tracksStopped, srcObjectCleared };
		});

		assert.strictEqual(tracksStopped, true, "All media tracks are stopped.");
		assert.strictEqual(srcObjectCleared, true, "Video srcObject is cleared.");
	});

	it("handles scan success event", async () => {
		await browser.setPermissions({ name: "camera" }, "granted");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const dialog = await browser.$("#dlgScan");
		const videoElement = await dialog.shadow$(".ui5-barcode-scanner-dialog-video");
		await videoElement.waitForDisplayed();

		// Mock scan success
		await browser.execute(() => {
			const dialog = document.querySelector("#dlgScan");
			dialog._handleScanSuccess({
				getText: () => "mocked-scan-result",
				getRawBytes: () => new Uint8Array(),
			});
		});

		const scanSuccessEvent = await browser.$("#scanResult");
		await scanSuccessEvent.waitForDisplayed();

		const scanSuccessText = await scanSuccessEvent.getText();
		assert.strictEqual(scanSuccessText, "mocked-scan-result", "Scan success event should be handled correctly with the expected result.");
	});

	it("handles unsupported browser error", async () => {
		await browser.execute(() => {
			navigator.mediaDevices.getUserMedia = undefined;
		});

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const scanError = await browser.$("#scanError");
		await scanError.waitForDisplayed();

		const scanErrorText = await scanError.getText();
		assert.include(scanErrorText, "getUserMedia() is not supported", "Scan error should be logged when getUserMedia is unsupported.");
	});

	it("handles permission denied error", async () => {
		await browser.setPermissions({ name: "camera" }, "denied");

		const btnScan = await browser.$("#btnScan");
		await btnScan.click();

		const scanError = await browser.$("#scanError");
		await scanError.waitForDisplayed();

		const scanErrorText = await scanError.getText();
		assert.include(scanErrorText, "Permission denied", "Scan error should be logged when permission is denied.");
	});
});
