const assert = require("chai").assert;

describe("API", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/FileUploader.html");
	});

	it("Files property", () => {
		const fileUploader = $("ui5-file-uploader");
		assert.ok(fileUploader.getProperty("files"), "Property 'files' should return FileList with 0 files.")
	});

	it("File upload with no input", () => {
		const fileUploader = $("#file-uploader-no-input");
		const inputField = fileUploader.shadow$("ui5-input");
		assert.notOk(inputField.isExisting(), "Input should not be rendered.");
	});

	it("Default slot is working", () => {
		const fileUploader = $("#file-uploader-no-input");
		const button = fileUploader.shadow$("ui5-button");
		assert.notOk(button.isExisting(), "Button should be rendered.");
	});

	it("Tests disabled file uploader", () => {
		const fileUploader = $("#disabled");
		const input = fileUploader.shadow$("input");
		assert.ok(input.getProperty("disabled"), "Native input is disabled.");
	});

	it("Tests accept property", () => {
		const fileUploader = $("#file-uploader-accept");
		const input = fileUploader.shadow$("input");
		assert.strictEqual(input.getProperty("accept"), ".txt,.docx", "Native input is has the rignt accept property.");
	});
});
