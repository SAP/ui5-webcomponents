import { html } from "lit";
import "../../src/DynamicSideContent.js";
import type DynamicSideContent from "../../src/DynamicSideContent.js";

describe("Accessibility", () => {
	it("tests main and side content roles", () => {
		cy.mount(html`
			<ui5-dynamic-side-content>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</ui5-dynamic-side-content>
		`);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "role", "main");

		   cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "role", "complementary");
	});

	it("tests main and side content aria-label values", () => {
		const customMainContentLabel = "Custom Main Content Label";
		const customSideContentLabel = "Custom Side Content Label";

		cy.mount(html`
			<ui5-dynamic-side-content>
				<div>
					<h1>Main Content</h1>
					<ui5-button>Set Custom ARIA Labels</ui5-button>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</ui5-dynamic-side-content>
		`);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", "Main Content");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", "Side Content");

		cy.get<DynamicSideContent>("@dsc")
			.then($dsc => {
				$dsc.get(0).accessibilityAttributes = {
					"mainContent": {
						"ariaLabel": customMainContentLabel,
					},
					"sideContent": {
						"ariaLabel": customSideContentLabel,
					},
				};
			});

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", customMainContentLabel);

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", customSideContentLabel);
	});
});
