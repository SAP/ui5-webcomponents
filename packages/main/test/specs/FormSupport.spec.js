const assert = require("assert");

describe("Form support", () => {

	it("Normal button does not submit forms", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/FormSupport.html");

		const noSubmitButton = browser.$("#b1");
		noSubmitButton.click();

		const hrefIsSame = browser.execute(() => {
			return location.href.endsWith("FormSupport.html");
		});
		assert.ok(hrefIsSame, "By default the button does not submit a form");
	});

	it("Submit button does submit forms", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/FormSupport.html");

		const submitButton = browser.$("#b2");
		submitButton.click();

		const formWasSubmitted = browser.execute(() => {
			const expectedFormData = "FormSupport.html?input=ok&ta=ok&dp=Apr+10%2C+2019&cb=on&radio=b";
			return location.href.endsWith(expectedFormData);
		});
		assert.ok(formWasSubmitted, "For was submitted and URL changed");
	});

});
