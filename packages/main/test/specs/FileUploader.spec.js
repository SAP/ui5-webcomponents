import { assert } from "chai";

describe("API", () => {
	before(async () => {
		await browser.url(`test/pages/FileUploader.html`);
	});

	it("Files property", async () => {
		const fileUploader = await browser.$("ui5-file-uploader");
		assert.ok(await fileUploader.getProperty("files"), "Property 'files' should return FileList with 0 files.");
	});

	it("MaxFileSize property", async () => {
		const fileUploader = await browser.$("#file-uploader-max-size");
		assert.strictEqual(await fileUploader.getProperty("maxFileSize"), 1, "Property 'maxFileSize' should return 1 (MB).");
	});

	it("File upload with no input", async () => {
		const fileUploader = await browser.$("#file-uploader-no-input");
		const inputField = await fileUploader.shadow$("ui5-input");
		assert.notOk(await inputField.isExisting(), "Input should not be rendered.");
	});

	it("Default slot is working", async () => {
		const fileUploader = await browser.$("#file-uploader-no-input");
		const button = await fileUploader.shadow$("ui5-button");
		assert.notOk(await button.isExisting(), "Button should be rendered.");
	});

	it("Tests disabled file uploader", async () => {
		const fileUploader = await browser.$("#disabled");
		const input = await fileUploader.shadow$("input");
		assert.ok(await input.getProperty("disabled"), "Native input is disabled.");
	});

	it("Tests accept property", async () => {
		const fileUploader = await browser.$("#file-uploader-accept");
		const input = await fileUploader.shadow$("input");
		assert.strictEqual(await input.getProperty("accept"), ".txt,.docx", "Native input is has the rignt accept property.");
	});

	it("Input not focusable", async () => {
		const openDialogButton = await browser.$("#open-dialog-btn");

		await openDialogButton.click();
		const dialog = await browser.$("#dialog");
		const fileUploader = await dialog.$("ui5-file-uploader");

		assert.notOk(await fileUploader.isFocused(), "Uploader isn't focusable");
	});

	it("Value state message of type 'Critical' is opened on focusing the File Uploader button", async () => {
		await browser.url(`test/pages/FileUploader.html`);

		const fileUploader = await browser.$("#fu-valuestate-test");
		await browser.keys("Tab");
		await browser.keys("Tab");
		await browser.keys("Tab");

		const valueState = await fileUploader.shadow$("ui5-popover");

		assert.ok(await valueState.isExisting(), "Value state message exists.");
		assert.ok(await valueState.getProperty("open"), "File Uploader in focus should have open value state message.");
	});
});
