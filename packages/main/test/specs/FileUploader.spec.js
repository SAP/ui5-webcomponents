const assert = require("chai").assert;

describe("API", () => {
	before(async () => {
		await browser.url(`test/pages/FileUploader.html`);
	});

	it("Files property", async () => {
		const fileUploader = await browser.$("ui5-file-uploader");
		assert.ok(await fileUploader.getProperty("files"), "Property 'files' should return FileList with 0 files.")
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
});
