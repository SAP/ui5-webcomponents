import { html } from "lit";
import "../../src/Select.js";
import "../../src/Option.js";
import "../../src/OptionCustom.js";

describe("Select - Accessibility", () => {
	it("tests options tooltip is set displayed", () => {
		const EXPECTED_TOOLTIP = "Tooltip";
		const EXPECTED_ROLE = "option";
		cy.mount(html`
			<ui5-select>
				<ui5-option value="1" tooltip="${EXPECTED_TOOLTIP}">Option 1</ui5-option>
				<ui5-option-custom value="2" tooltip="${EXPECTED_TOOLTIP}">Option 2</ui5-option-custom>
			</ui5-select>
		`);

		// Check if the role is set to option
		cy
			.get("[ui5-option]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE)
			.get("[ui5-option-custom]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE);

		// Check if the tooltip is set
		cy
			.get("[ui5-option][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP)
			.get("[ui5-option-custom][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP);
	});

	it("Tests if currently selected option is visible in the viewport when keyboard navigation is used",   {
		viewportHeight: 100,
		viewportWidth: 600,
	  }, () => {
		cy.mount(html`
			<ui5-select>
				<ui5-option value="1">Option 1</ui5-option>
				<ui5-option value="2">Option 2</ui5-option>
				<ui5-option value="3">Option 3</ui5-option>
				<ui5-option id="optionUnderTest" value="4">Option 4</ui5-option>
			</ui5-select>
		`);

		// Open the select
		cy.get("ui5-select").click();

		// Move focus to to the forth item using the arrow down key
		cy.get("ui5-select").shadow().find('[tabindex][role="combobox"]')
			.type("{downArrow}")
			.type("{downArrow}")	
			.type("{downArrow}");

		cy.get("#optionUnderTest")
			.ui5IsWithinViewport();
	});
});
