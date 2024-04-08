import { assert } from "chai";

describe("Shared Resources", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests the presense of the shared resources 'meta' element", async () => {
		const sharedResourcesElement = await browser.executeAsync(done => {
			return done(document.querySelector(`meta[name="ui5-shared-resources"]`));
		});

		assert.ok(sharedResourcesElement, "The 'meta' element for shared resources is created.");
	});
});
