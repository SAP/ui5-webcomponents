const assert = require("assert");

const assertBooleanProperty = (el, prop) => {
	assert.strictEqual(el.getProperty(prop), false, "the value should be false by default.");
}

const assertHidden = component => {
	assert.strictEqual(component.isDisplayedInViewport(), false, "the component is hidden.");
}

describe("General assertions", () => {
	browser.url("http://localhost:8080/test-resources/pages/Components.html");

	it("tests components with 'hidden' property are not visible", () => {
		[
			browser.$("#shellbar2")
		].forEach(assertHidden);
	});
});
