import CheckBox from "../../src/CheckBox.js";

describe('CheckBox Component', () => {
	it('should have correct type and value attributes in shadow dom', () => {
		cy.mount(<CheckBox value="testValue" />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('have.attr', 'value', 'testValue');
	});

	it('should omit value attribute in shadow dom when no value is provided', () => {
		cy.mount(<CheckBox />);
		cy.get("[ui5-checkbox]")
			.shadow()
			.find('[type="checkbox"]')
			.should('not.have.attr', 'value');
	});

});

