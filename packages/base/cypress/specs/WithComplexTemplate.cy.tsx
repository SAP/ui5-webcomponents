import WithComplexTemplate from "../../test/test-elements/WithComplexTemplate.js";

describe("Complex templates", () => {
	it("Tests context maintained in the HBS template before, after and inside 'each' statements", () => {
		const EXPTECTED_LOOP_CONTENT = "Root text: root, Item text: positives";
		const EXPTECTED_NESTED_LOOP_CONTENT = "Root Text: root, Word text: word1_good";

		cy.mount(<WithComplexTemplate />);

		cy.get("[ui5-test-complex-template]")
			.shadow()
			.find(".before-each-content--start--0")
			.should("have.text", EXPTECTED_LOOP_CONTENT);

		cy.get("[ui5-test-complex-template]")
			.shadow()
			.find(".nested-each-content--0--0")
			.first()
			.should("have.text", EXPTECTED_NESTED_LOOP_CONTENT);

		cy.get("[ui5-test-complex-template]")
			.shadow()
			.find(".nested-each-content--0--1")
			.first()
			.should("have.text", EXPTECTED_NESTED_LOOP_CONTENT);

		cy.get("[ui5-test-complex-template]")
			.shadow()
			.find(".after-each-content--end--0")
			.should("have.text", EXPTECTED_LOOP_CONTENT);
	});
});
