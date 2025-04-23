import {{INIT_PACKAGE_VAR_CLASS_NAME}} from "../../src/{{INIT_PACKAGE_VAR_CLASS_NAME}}.js";

describe('{{INIT_PACKAGE_VAR_CLASS_NAME}}.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<{{INIT_PACKAGE_VAR_CLASS_NAME}} />)

    cy.get("[hardcoded-button]")
      .click();

    cy.get("[hardcoded-button]")
      .should("have.prop", "count", 1)
  })
})