import { assert } from "chai";

describe("Form support", () => {

	it("Normal button does not submit forms", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const noSubmitButton = await browser.$("#b1");
		await noSubmitButton.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});
		assert.ok(hrefIsSame, "By default the button does not submit a form");
	});

	it("Submit button does submit forms", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		// Enter multiline text in TextArea
		const textarea = await browser.$("#ta");
		await textarea.click()
		await browser.keys("Enter");
		await browser.keys("o");
		await browser.keys("k");

		const submitButton = await browser.$("#b2");
		await submitButton.click();

		const formWasSubmitted = await browser.executeAsync(done => {
			const expectedFormData = "?input=ok&sel=condensed&ta=ok%0D%0Aok&dp=Apr+10%2C+2019&cb=on&radio=b&si=5";
			done(location.href.endsWith(expectedFormData));
		});
		assert.ok(formWasSubmitted, "For was submitted and URL changed");
	});

	it("Prevent default on submit event", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const noSubmitButton = await browser.$("#b3");
		await noSubmitButton.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});
		assert.ok(hrefIsSame, "Form is not submitted when prevent default is called");
	});

});
