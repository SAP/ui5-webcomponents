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

describe("Accessibility", () => {
	it("should announce the associated label when CheckBox is focused", () => {
		cy.mount(
			<>
				<label for="cb">Should be the aria-label</label>
				<CheckBox id="cb"></CheckBox>
			</>
		);

		cy.get('label[for="cb"]')
			.invoke('text')
			.then((labelText) => {
				cy.get("[ui5-checkbox]")
					.shadow()
					.find(".ui5-checkbox-root")
					.should("have.attr", "aria-label", labelText);
			});
	});
});