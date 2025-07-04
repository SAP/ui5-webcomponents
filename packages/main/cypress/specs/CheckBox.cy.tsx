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

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#cb")
			.then($el => {
				const checkbox = $el[0] as CheckBox;
				expect(checkbox.formValidity.valueMissing, "Unchecked required checkbox should have formValidity with valueMissing=true").to.be.true;
				expect(checkbox.validity.valueMissing, "Unchecked required checkbox should have validity with valueMissing=true").to.be.true;
				expect(checkbox.validity.valid, "Unchecked required checkbox should have validity with valid=false").to.be.false;
				expect(checkbox.checkValidity(), "Unchecked required checkbox should fail validity check").to.be.false;
				expect(checkbox.reportValidity(), "Unchecked required checkbox should fail report validity").to.be.false;
			});

		cy.get("#cb:invalid") // select using :invalid CSS pseudo-class
			.should("exist", "Unchecked required checkbox should have :invalid CSS class");

		cy.get("#cb") // check the required checkbox
			.realClick();

		cy.get("#cb")
			.then($el => {
				const checkbox = $el[0] as CheckBox;
				expect(checkbox.formValidity.valueMissing, "Checked required checkbox should have formValidity with valueMissing=false").to.be.false;
				expect(checkbox.validity.valueMissing, "Checked required checkbox should have validity with valueMissing=false").to.be.false;
				expect(checkbox.validity.valid, "Checked required checkbox should have validity with valid=true").to.be.true;
				expect(checkbox.checkValidity(), "Checked required checkbox should pass validity check").to.be.true;
				expect(checkbox.reportValidity(), "Checked required checkbox should pass report validity").to.be.true;
			});

		cy.get("#cb:invalid").should("not.exist", "Checked required checkbox should not have :invalid CSS class");
	});
});

