const assert = require("chai").assert;

const assertBooleanProperty = (el, prop) => {
	assert.strictEqual(el.getProperty(prop), false, "the value should be false by default.");
}

const assertHidden = component => {
	assert.strictEqual(component.isDisplayedInViewport(), false, "the component is hidden.");
}

describe("General assertions", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/Components.html");
	});

	it("tests components with 'hidden' property are not visible", () => {
		[
			browser.$("#shellbar2"),
			browser.$("#uploadCollection")
		].forEach(assertHidden);
	});
});
