import { html } from 'lit';

describe("Select - Accessibility", () => {
	it("tests options tooltip is set displayed", () => {
		const EXPECTED_TOOLTIP = "Tooltip";
		cy.mount(html`
			<ui5-select>
				<ui5-option value="1" tooltip="${EXPECTED_TOOLTIP}">Option 1</ui5-option>
				<ui5-option-custom value="2" tooltip="${EXPECTED_TOOLTIP}">Option 2</ui5-option-custom>
			</ui5-select>
		`);

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
});