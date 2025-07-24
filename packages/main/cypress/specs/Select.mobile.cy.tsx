import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("Select mobile general interaction", () => {
	it("Changes selection in Dialog", () => {
		cy.get("html").viewport("iphone-x");

		const changeEvents = [];

		const handleChange = (e) => {
			changeEvents.push(e);
		};

		cy.mount(
			<Select onChange={handleChange}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Condensed");

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]").realPress("ArrowUp");
		cy.get("[ui5-select]").realPress("ArrowUp");

		cy.get("[ui5-select]").realPress("Enter");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Cozy");

		cy.wrap(changeEvents).should("have.length", 1);

		cy.get("[ui5-select]").should("have.prop", "value", "Cozy");
	});
});