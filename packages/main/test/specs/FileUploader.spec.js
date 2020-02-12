const assert = require("chai").assert;

describe("API", () => {
	browser.url("http://localhost:8080/test-resources/pages/FileUploader.html");

	it("Files property", () => {
		const fileUploader = $("ui5-file-uploader");
		assert.ok(fileUploader.getProperty("files"), "Property 'files' should return FileList with 0 files.")
	});

	it("File upload with no input", () => {
		const fileUploader = $("#file-uploader-no-input");
		const inputField = fileUploader.shadow$("ui5-input");
		assert.notOk(inputField.isExisting(), "Input should not be rendered");
	});

	it("Default slot is working", () => {
		const fileUploader = $("#file-uploader-no-input");
		const button = fileUploader.shadow$("ui5-button");
		assert.notOk(button.isExisting(), "Button should be rendered");
	});
});
