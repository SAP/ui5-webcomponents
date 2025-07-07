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
			<Select id="mySelect" onChange={handleChange}>
				<Option id="firstOption" value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Condensed");

		cy.get("#mySelect").realClick();

		cy.get("#mySelect").realPress("ArrowUp");
		cy.get("#mySelect").realPress("ArrowUp");

		cy.get("#mySelect").realPress("Enter");

		cy.get("#mySelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Cozy");

		cy.wrap(changeEvents).should("have.length", 1);

		cy.get("#mySelect").should("have.prop", "value", "Cozy");
	});
});