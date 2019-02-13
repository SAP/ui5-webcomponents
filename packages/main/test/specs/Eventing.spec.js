const assert = require("assert");

describe("Eventing", () => {

	it("Default prevented", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Eventing.html");

		const innerLink = browser.findElementDeep("#defaultPreventedLink >>> a");
		innerLink.click();

		const hrefIsSame = browser.execute(() => {
			return location.href.endsWith("Eventing.html");
		});
		assert.ok(hrefIsSame);
	});

	it("Default not prevented", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Eventing.html");

		const innerLink = browser.findElementDeep("#normalLink >>> a");
		innerLink.click();

		const hrefChanged = browser.execute(() => {
			return location.href.endsWith("Eventing.html#new");
		});
		assert.ok(hrefChanged);
	});
});
