const assert = require("assert");

// describe("button general interaction", () => {
// 	browser.url("http://localhost:8080/test-resources/single_import/button/button.html");

// 	it("component is rendered", () => {
// 		const button = browser.findElementDeep("#button1 >>> .sapMBtn");
// 		assert.ok(button, "Component rendered and its shadow DOM is created");
// 	});
// });

// describe("datepicker general interaction", () => {
// 	browser.url("http://localhost:8080/test-resources/single_import/datepicker/datepicker.html");

// 	it("component is rendered", () => {
// 		const datePicker = browser.findElementDeep("#datePicker1 >>> .sapMDP");
// 		assert.ok(datePicker, "Component rendered and its shadow DOM is created");
// 	});
// });

describe("textarea general interaction", () => {
	browser.url("http://localhost:8080/test-resources/single_import/textarea/textarea.html");

	it("component is rendered", () => {

		const textArea = browser.findElementDeep("#textArea1 >>> .sapWCTextArea");
		assert.ok(textArea, "Component rendered and its shadow DOM is created");
	});
});