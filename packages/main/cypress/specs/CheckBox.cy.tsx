import CheckBox from "../../src/CheckBox.js";

describe('CheckBox Component', () => {
	it('should have correct type and value attributes in shadow dom', () => {
		cy.mount(<CheckBox value="testValue" />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('have.attr', 'value', 'testValue');
	});

	it('should omit value attribute in shadow dom when checkbox has default value', () => {
		cy.mount(<CheckBox />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('not.have.attr', 'value');
	});

});

describe("Validation inside a form", () => {
	it("has correct validity", () => {
		cy.mount(<form method="get">
			<CheckBox id="cb" name="checkbox5" required text="unchecked ui5-checkbox with name and required" > </CheckBox>
			<button type="submit" > Submits forms </button>
		</form>);

		cy.get("#cb")
			.then($el => {
				const checkbox = $el[0] as CheckBox;
				expect(checkbox.validity.valueMissing).to.be.true;
				expect(checkbox.checkValidity()).to.be.false;
				expect(checkbox.reportValidity()).to.be.false;
			});

		cy.get("#cb:invalid") // select using :invalid CSS pseudo-class
			.should("exist");

		cy.get("#cb") // check the required checkbox
			.realClick();

		cy.get("#cb")
			.then($el => {
				const checkbox = $el[0] as CheckBox;
				expect(checkbox.validity.valueMissing).to.be.false;
				expect(checkbox.checkValidity()).to.be.true;
				expect(checkbox.reportValidity()).to.be.true;
			});

		cy.get("#cb:invalid").should("not.exist");
	});
});

