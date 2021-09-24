const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Eventing", () => {

	it("Default prevented", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Eventing.html`);

		const innerLink = await browser.$("#defaultPreventedLink");
		await innerLink.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("Eventing.html"));
		});
		assert.ok(hrefIsSame, "When default was prevented, URL did not change");
	});

	it("Default not prevented", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Eventing.html`);

		const innerLink = await browser.$("#normalLink");
		await innerLink.click();

		const hrefChanged = await browser.executeAsync(done => {
			done(location.href.endsWith("Eventing.html#new"));
		});
		assert.ok(hrefChanged, "When default was not prevented, the URL did change");
	});
});
