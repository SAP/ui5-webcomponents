const assert = require("chai").assert;

describe("API", () => {
	browser.url("http://localhost:8080/test-resources/pages/FileUploader.html");

	it("files", () => {
		const fileUploader = $("ui5-fileuploader");
		assert.ok(fileUploader.getProperty("files"), "Property 'files' should return FileList with 0 files.")
	});
});
