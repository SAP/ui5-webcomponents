import BusyIndicator from "../../src/BusyIndicator.js";

describe("Rendering", () => {
	it("Rendering without content", () => {
		cy.mount(<BusyIndicator id="busyInd" active></BusyIndicator>);

		cy.get("#busyInd")
			.shadow()
			.find(".ui5-busy-indicator-busy-area:not(.ui5-busy-indicator-busy-area-over-content)")
			.should("exist");

	});

	it("Rendering with content", () => {
		cy.mount(
			<BusyIndicator id="busyInd" active>
				<span>content</span>
			</BusyIndicator>
		);

		cy.get("#busyInd")
			.shadow()
			.find(".ui5-busy-indicator-busy-area.ui5-busy-indicator-busy-area-over-content")
			.should("exist");
	});
});
