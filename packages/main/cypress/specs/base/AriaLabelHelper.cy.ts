import { html } from "lit";
import "../../../src/Label.js";
import "../../../src/Input.js";

describe("AriaLabelHelper", () => {
	it("Label-for tests", () => {
		cy.mount(html`
			<ui5-input id="myInput" placeholder="input placeholder" class="field"></ui5-input>
			<ui5-label id="lblDesc1" for="myInput">Desc1</ui5-label>
			<ui5-label id="lblDesc2" for="myInput">Desc2</ui5-label>
			<ui5-label id="lblDesc3" for="myInput">Desc3</ui5-label>
			<label id="lblDesc4" for="myInput">Desc4</label>
		`);

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "Desc1 Desc2 Desc3 Desc4");

		// act
		cy.get("#lblDesc2")
			.invoke("attr", "for", "other");

		cy.get("#lblDesc3")
			.invoke("remove");

		// assert
		cy.get("#myInput")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "Desc1 Desc4");
	});

	it("Input accessibleNameRef Tests", () => {
		cy.mount(html`
            <ui5-label id="lblEnterName1">FirstDesc</ui5-label>
            <ui5-label id="lblEnterName2">SecondDesc</ui5-label>
            <ui5-label id="lblEnterName3">ThirdDesc</ui5-label>
            <ui5-input id="inputEnterName" accessible-name-ref="lblEnterName1 lblEnterName3" placeholder="Enter your name"></ui5-input>
        `);

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblEnterName1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "First Label Desc ThirdDesc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName3 lblEnterName1");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "ThirdDesc First Label Desc");

		// act - update accessible-name-ref
		cy.get("#inputEnterName")
			.invoke("attr", "accessible-name-ref", "lblEnterName2");

		// assert
		cy.get("#inputEnterName")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", "SecondDesc");
	});

	it("Input accessibleName and accessibleNameRef Tests", () => {
		cy.mount(html`
			<ui5-label id="lblEnterDesc1" for="inputEnterDesc">Label for inputEnterDesc</ui5-label>
			<ui5-label id="lblEnterDesc3">Label to be added/removed as accessible-name-ref</ui5-label>
			<ui5-input id="inputEnterDesc" accessible-name="Some description added by accessibleName" placeholder="Enter description"></ui5-input>
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
			.should("have.attr", "aria-label", INITIAL_ACCESSIBLE_NAME);

		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", UPDATED_ACCESSIBLE_NAME);

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", UPDATED_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.should("have.attr", "aria-label", "Label for inputEnterDesc");

		// act - add acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name-ref", ACCESSIBLE_NAME_REF);

		// assert - the text of the elment labelled with accessible-name-ref is used
		cy.get("@input")
			.should("have.attr", "aria-label", ACCESSIBLE_NAME_REF_TEXT);

		// act - add acccessible-name once again
		cy.get("#inputEnterDesc")
			.invoke("attr", "accessible-name", INITIAL_ACCESSIBLE_NAME);

		// assert - the text of the elment labelled with accessible-name-ref is still used
		cy.get("@input")
			.should("have.attr", "aria-label", ACCESSIBLE_NAME_REF_TEXT);

		// act - remove acccessible-name-ref
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - after acccessible-name-ref is removed, fallbacks to use acccessible-name
		cy.get("@input")
			.should("have.attr", "aria-label", INITIAL_ACCESSIBLE_NAME);

		// act - remove acccessible-name
		cy.get("#inputEnterDesc")
			.invoke("removeAttr", "accessible-name");

		// assert - aria-label fallbacks to use the label's for, pointing to this input
		cy.get("@input")
			.should("have.attr", "aria-label", "Label for inputEnterDesc");

		// act - remove ui5-label's for
		cy.get("#lblEnterDesc1")
			.invoke("removeAttr", "for");

		// assert - aria-label is undefined
		cy.get("@input")
			.should("not.have.attr", "aria-label");
	});

	it("Three inputs with same label accessibleNameRef Tests", () => {
		cy.mount(html`
			<ui5-label id="lblTestDesc" for="testInput1">Label for testInput1 Desc</ui5-label>
			<ui5-input id="testInput1" placeholder="Enter description1"></ui5-input>
			<ui5-input id="testInput2" accessible-name-ref="lblTestDesc" accessible-name="Hello" placeholder="Enter description2"></ui5-input>
			<ui5-input id="testInput3" accessible-name-ref="lblTestDesc" placeholder="Enter description3"></ui5-input>
		`);

		const LBL_TEXT_CONTENT = "Label for testInput1 Desc";
		const LBL_TEXT_CONTENT_UPDATED = "Another description for testing";

		cy.get("#testInput1")
			.shadow()
			.find("input")
			.as("input1");

		cy.get("#testInput2")
			.shadow()
			.find("input")
			.as("input2");

		cy.get("#testInput3")
			.shadow()
			.find("input")
			.as("input3");

		// assert
		cy.get("@input1")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		cy.get("@input2")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		cy.get("@input3")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT);

		// act

		cy.get("#lblTestDesc")
			.then($el => {
				$el.get(0).innerHTML = LBL_TEXT_CONTENT_UPDATED;
			});

		// assert
		cy.get("@input1")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		cy.get("@input2")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		cy.get("@input3")
			.should("have.attr", "aria-label", LBL_TEXT_CONTENT_UPDATED);

		// act - remove "for" attribute
		cy.get("#lblTestDesc")
			.invoke("removeAttr", "for");

		// assert - aria-label is undefined
		cy.get("@input1")
			.should("not.have.attr", "aria-label");

		// act - remove accessible-name-ref
		cy.get("#testInput2")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - aria-label is the existing accessible-name
		cy.get("@input2")
			.should("have.attr", "aria-label", "Hello");

		// act - remove accessible-name-ref
		cy.get("#testInput3")
			.invoke("removeAttr", "accessible-name-ref");

		// assert - shouldn't be any aria-label
		cy.get("@input3")
			.should("not.have.attr", "aria-label");
	});

	it("Tests generic html elements with for attribute", () => {
		cy.mount(html`
			<label id="elId1" for="myInput2">Desc1</label>
			<label id="elId2" for="myInput2">Desc2</label>
			<ui5-input id="myInput2" placeholder="input placeholder"></ui5-input>
			<div id="elId3" for="myInput2">Desc3</div>
			<span id="elId4" for="myInput2">Desc4</span>
			<span id="elId5" for="myInput2">Desc5</span>
		`);

		cy.get("#myInput2")
			.shadow()
			.find("input")
			.as("input");

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", "Desc1 Desc2 Desc3 Desc4 Desc5");

		// act
		cy.get("#elId1")
			.then($el => {
				$el.get(0).innerHTML = `${$el.get(0).innerHTML}X`;
			});

		cy.get("#elId2")
			.invoke("remove");

		cy.get("#elId3")
			.invoke("attr", "for", "other");

		cy.get("#elId4")
			.then($el => {
				$el.get(0).innerHTML = `${$el.get(0).innerHTML}X`;
			});

		cy.get("#elId5")
			.invoke("removeAttr", "for");

		// assert
		cy.get("@input")
			.should("have.attr", "aria-label", "Desc1X Desc4X");
	});
});
