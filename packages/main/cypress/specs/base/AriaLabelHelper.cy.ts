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

	it("Input accessibleName and accessibleNameRef Tests", () => {
		cy.mount(html`
			<div class="info">
				lblEnterDesc1: &nbsp; <ui5-label id="lblEnterDesc1" for="inputEnterDesc">Label for inputEnterDesc</ui5-label>
			</div>
			<div class="info">
				lblEnterDesc3: &nbsp; <ui5-label id="lblEnterDesc3">Label to be added/removed as accessible-name-ref</ui5-label>
			</div>
			<div class="info">
				<ui5-input id="inputEnterDesc" accessible-name="Some description added by accessibleName" placeholder="Enter description"
					class="field"></ui5-input>
			</div>
		`);

		const INITIAL_ACCESSIBLE_NAME = "Some description added by accessibleName";
		const UPDATED_ACCESSIBLE_NAME = "Another description added by accessibleName";
		const ACCESSIBLE_NAME_REF = "lblEnterDesc3";
		const ACCESSIBLE_NAME_REF_TEXT = "Label to be added/removed as accessible-name-ref";

		cy.get("#inputEnterDesc")
			.shadow()
			.find("input")
			.as("input");

		// assert
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", INITIAL_ACCESSIBLE_NAME);

		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", UPDATED_ACCESSIBLE_NAME);

		// assert
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", UPDATED_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", "Label for inputEnterDesc");

		// act - add acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name-ref", ACCESSIBLE_NAME_REF);

		// assert - the text of the elment labelled with accessible-name-ref is used
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", ACCESSIBLE_NAME_REF_TEXT);

		// act - add acccessible-name once again
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", INITIAL_ACCESSIBLE_NAME);

		// assert - the text of the elment labelled with accessible-name-ref is still used
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", ACCESSIBLE_NAME_REF_TEXT);

		// act - remove acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - after acccessible-name-ref is removed, fallbacks to use acccessible-name
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", INITIAL_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", "Label for inputEnterDesc");

		// act - remove ui5-label's for
		cy.get("#lblEnterDesc1")
			.invoke("removeAttr", "for");

		// assert - aria-label is undefined
		cy.get("@input")
			.invoke("attr", "aria-label")
			.should("eq", undefined);
	});

	// it('Three inputs with same label accessibleNameRef Tests', () => {
	// });

	// it('Tests generic html elements with for attribute', () => {
	// });
});
