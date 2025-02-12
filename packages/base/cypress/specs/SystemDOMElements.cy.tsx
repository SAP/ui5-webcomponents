import "../../test/test-elements/Accessor.js";

describe("Shared Resources", () => {
	it("Tests the presense of the shared resources 'meta' element", () => {
		cy.get(`meta[name="ui5-shared-resources"]`)
			.should("exist");
	});
});
