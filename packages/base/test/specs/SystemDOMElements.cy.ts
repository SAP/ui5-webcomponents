import "../../src/bundle.common.js";

describe("Shared Resources", () => {
	it("Tests the presense of the shared resources 'meta' element", async () => {
		cy.get(`meta[name="ui5-shared-resources"]`)
			.should("exist");
	});
});
