import { html } from "lit";
import "../../../src/Assets.js";
import "../../../src/Icon.js";

describe("AriaLabelHelper", () => {
	it("Label-for tests", () => {
		cy.mount(html`<div class="wrapper">
			<div class="fields">
				<h4>Label-For Tests</h4>
				<div class="info">
					<ui5-label id="lblDesc1" for="myInput">Desc1</ui5-label>
				</div>
				<div class="info">
					<ui5-label id="lblDesc2" for="myInput">Desc2</ui5-label>
				</div>
				<div class="info">
					<ui5-input id="myInput" placeholder="input placeholder" class="field"></ui5-input>
				</div>
				<div class="info">
					<ui5-label id="lblDesc3" for="myInput">Desc3</ui5-label>
				</div>
				<div class="info"><label id="lblDesc4" for="myInput">Desc4</label></div>
				<div class="info"><ui5-button id="btnChange">Change Desc</ui5-button></div>
				<div class="info"><ui5-button id="btnChange11">Remove for attr from Another Description</ui5-button></div>
				<div class="info"><ui5-button id="btnRemoveInput">Remove input</ui5-button></div>
			</div>
			<div class="fields">
				<h4>Input accessibleNameRef Tests</h4>
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
					<ui5-input id="inputEnterName" accessible-name-ref="lblEnterName1 lblEnterName3" placeholder="Enter your name"
						class="field"></ui5-input>
				</div>
				<div class="info"><ui5-button id="btnChange2">Change Desc lblEnterName1</ui5-button>&nbsp;<ui5-button id="btnChange22">Change Desc lblEnterName2</ui5-button></div>
				<div class="info"><ui5-button id="btnChange3">Swap Accessible Name Ref 1 and 2</ui5-button></div>
				<div class="info"><ui5-button id="btnChange35">Remove lblEnterName3 from accessible-name-ref</ui5-button></div>
			</div>
			<div class="fields">
				<h4>Input accessibleName and accessibleNameRef Tests</h4>
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
				<div class="info"><ui5-button id="btnChange4">Toggle AccessibleName Value</ui5-button></div>
				<div class="info"><ui5-button id="btnChange5">Remove AccessibleName Attribute</ui5-button></div>
				<div class="info"><ui5-button id="btnChange6">Add Accessible Name Ref</ui5-button></div>
				<div class="info"><ui5-button id="btnChange65">Remove lblEnterDesc1 for Attribute</ui5-button></div>
			</div>
			<div class="fields">
				<h4>Three inputs with same label accessibleNameRef Tests</h4>
				<div class="info">
					lblTestDesc: &nbsp; <ui5-label id="lblTestDesc" for="testInput1">Label for testInput1 Desc</ui5-label>
				</div>
				<div class="info">
					<ui5-input id="testInput1" placeholder="Enter description1" class="field"></ui5-input>
					<ui5-input id="testInput2" accessible-name-ref="lblTestDesc" accessible-name="Hello" placeholder="Enter description2" class="field"></ui5-input>
					<ui5-input id="testInput3" accessible-name-ref="lblTestDesc" placeholder="Enter description3" class="field"></ui5-input>
				</div>
				<div class="info"><ui5-button id="btnChange71">Remove For Attribute On Label</ui5-button></div>
				<div class="info"><ui5-button id="btnChange72">Remove AccessibleNameRef Attribute For Input 2</ui5-button></div>
				<div class="info"><ui5-button id="btnChange73">Remove AccessibleNameRef Attribute For Input 3</ui5-button></div>
				<div class="info"><ui5-button id="btnChange74">Change Label Desc</ui5-button></div>
			</div>
			<div class="fields">
				<h4>Tests for html elements used with for</h4>
				<div class="info">
					<label id="elId1" for="myInput2">Desc1</label>
				</div>
				<div class="info">
					<label id="elId2" for="myInput2">Desc2</label>
				</div>
				<div class="info">
					<ui5-input id="myInput2" placeholder="input placeholder" class="field"></ui5-input>
				</div>
				<div class="info">
					<div id="elId3" for="myInput2">Desc3</div>
				</div>
				<div class="info">
					<span id="elId4" for="myInput2">Desc4</span>
				</div>
				<div class="info">
					<span id="elId5" for="myInput2">Desc5</span>
				</div>
				<div class="info"><ui5-button id="btnChange8">Change el1, Remove el2, Change for of el3, Change el4 </ui5-button></div>
			</div>
			
		</div>`);

		cy.get("#myInput")
			.shadow()
			.find("input")
			.invoke("attr", "aria-label")
			.should("eq", "Desc1 Desc2 Desc3 Desc4");
	  });
});
