import { html } from "lit";
import "../../../src/Label.js";
import "../../../src/Input.js";
import "../../../src/Button.js";

describe("AriaLabelHelper", () => {
	it("Label-for tests", () => {
		cy.mount(html`<div class="wrapper">
			<ui5-input id="myInput" placeholder="input placeholder" class="field"></ui5-input>
			<ui5-label id="lblDesc1" for="myInput">Desc1</ui5-label>
			<ui5-label id="lblDesc2" for="myInput">Desc2</ui5-label>
			<ui5-label id="lblDesc3" for="myInput">Desc3</ui5-label>
			<div class="info"><label id="lblDesc4" for="myInput">Desc4</label></div>
		`);

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "Desc1 Desc2 Desc3 Desc4");

		// act
		cy.get("#lblDesc2")
			.invoke("attr", "for", "other");

		cy.get("#lblDesc3")
			.invoke("remove");

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "Desc1 Desc4");
	});

	it("Input accessibleNameRef Tests", () => {
		cy.mount(html`<div class="fields">
            <div class="info">
                lblEnterName1: &nbsp;<ui5-label id="lblEnterName1">FirstDesc</ui5-label>
            </div>
            <div class="info">
                lblEnterName2: &nbsp; <ui5-label id="lblEnterName2">SecondDesc</ui5-label>
            </div>
            <div class="info">
                lblEnterName3: &nbsp; <ui5-label id="lblEnterName3">ThirdDesc</ui5-label>
            </div>
            <div class="info">
                <ui5-input id="inputEnterName" accessible-name-ref="lblEnterName1 lblEnterName3" placeholder="Enter your name" class="field"></ui5-input>
            </div>
        </div>`);

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblEnterName1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "First Label Desc ThirdDesc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName3 lblEnterName1");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "ThirdDesc First Label Desc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName2");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "SecondDesc");
	});

	// TODO: more test cases to be added
	// it('Input accessibleName and accessibleNameRef Tests', () => {
	// });
	// it('Three inputs with same label accessibleNameRef Tests', () => {
	// });
	// it('Tests generic html elements with for attribute', () => {
	// });
});
