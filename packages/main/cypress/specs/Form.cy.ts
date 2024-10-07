import { html } from "lit";
import "../../src/Form.js";
import "../../src/FormItem.js";
import "../../src/FormGroup.js";

describe("General API", () => {
	it("tests calculated state of Form with layout='S1 M2 L3 XL6' and label-span='S12 M4 L4 XL4'", () => {
		cy.mount(html`<ui5-form class="addressForm" header-text="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
	<ui5-form-group header-text="Address">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span class="text">Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup2" header-text="Contact">
		<ui5-form-item>
			<span slot="labelContent">Twitter:</span>
			<span class="text">@sap</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup3" header-text="Other info">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span class="text">Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>
</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.invoke("prop", "columnsS")
			.should("be.equal", 1);

		cy.get("@form")
			.invoke("prop", "labelSpanS")
			.should("be.equal", 12);

		cy.get("@form")
			.invoke("prop", "columnsM")
			.should("be.equal", 2);

		cy.get("@form")
			.invoke("prop", "labelSpanM")
			.should("be.equal", 4);

		cy.get("@form")
			.invoke("prop", "columnsL")
			.should("be.equal", 3);

		cy.get("@form")
			.invoke("prop", "labelSpanL")
			.should("be.equal", 4);

		cy.get("@form")
			.invoke("prop", "columnsXl")
			.should("be.equal", 6);

		cy.get("@form")
			.invoke("prop", "labelSpanXl")
			.should("be.equal", 4);
	});

	it("tests calculated state of Form with layout='S1 M2 L2 XL3' label-span='S12 M12 L12 XL12'", () => {
		cy.mount(html`<ui5-form header-text="Labels on top" layout="S1 M2 L2 XL3" label-span="S12 M12 L12 XL12">
	<ui5-form-item>
		<span slot="labelContent">Name:</span>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<span slot="labelContent">ZIP Code/City:</span>
		<input />
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<span slot="labelContent">Street:</span>
		<input />
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<span slot="labelContent">Country:</span>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<span slot="labelContent">WebSite:</span>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<span slot="labelContent">Delivery address:</span>
		<input />
	</ui5-form-item>
</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.invoke("prop", "columnsS")
			.should("be.equal", 1);

		cy.get("@form")
			.invoke("prop", "labelSpanS")
			.should("be.equal", 12);

		cy.get("@form")
			.invoke("prop", "columnsM")
			.should("be.equal", 2);

		cy.get("@form")
			.invoke("prop", "labelSpanM")
			.should("be.equal", 12);

		cy.get("@form")
			.invoke("prop", "columnsL")
			.should("be.equal", 2);

		cy.get("@form")
			.invoke("prop", "labelSpanL")
			.should("be.equal", 12);

		cy.get("@form")
			.invoke("prop", "columnsXl")
			.should("be.equal", 3);

		cy.get("@form")
			.invoke("prop", "labelSpanXl")
			.should("be.equal", 12);
	});

	it("tests calculated state of two FormGroups in layout='S1 M2 L3 XL4'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 2gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
	<ui5-form-group id="testFormGroup4" header-text="Address">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span>Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup5" header-text="Contact">
		<ui5-form-item>
			<span slot="labelContent">Twitter:</span>
			<span>@sap</span>
		</ui5-form-item>

		<ui5-form-item>
			<span slot="labelContent">Email:</span>
			<span>john.smith@sap.com</span>
		</ui5-form-item>
</ui5-form>`);

		cy.get("#testFormGroup4")
			.as("formGr1");

		cy.get("#testFormGroup5")
			.as("formGr2");

		cy.get("@formGr1")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsL")
			.should("be.equal", 2);

		cy.get("@formGr1")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);

		cy.get("@formGr2")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL6'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
	<ui5-form-group id="testFormGroup1" header-text="Address">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span>Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup2" header-text="Contact">
		<ui5-form-item>
			<span slot="labelContent">Twitter:</span>
			<span>@sap</span>
		</ui5-form-item>

		<ui5-form-item>
			<span slot="labelContent">Email:</span>
			<span>john.smith@sap.com</span>
		</ui5-form-item>

		<ui5-form-item>
			<span slot="labelContent">Tel:</span>
			<span>+49 6227 747474</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup3" header-text="Other info">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span>Red Point Stores</span>
		</ui5-form-item>

		<ui5-form-item>
			<span slot="labelContent">ZIP Code/City:</span>
			<span>411 Maintown</span>
		</ui5-form-item>
	</ui5-form-group>
</ui5-form>`);

		cy.get("#testFormGroup1")
			.as("formGr1");

		cy.get("#testFormGroup2")
			.as("formGr2");

		cy.get("#testFormGroup3")
			.as("formGr3");

		cy.get("@formGr1")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);

		cy.get("@formGr2")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);

		cy.get("@formGr3")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL4'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 3gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
	<ui5-form-group id="testFormGroup6" header-text="Address">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span>Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup7" header-text="Contact">
		<ui5-form-item>
			<span slot="labelContent">Twitter:</span>
			<span>@sap</span>
		</ui5-form-item>

		<ui5-form-item>
			<span slot="labelContent">Email:</span>
			<span>john.smith@sap.com</span>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup8" header-text="Other info">
		<ui5-form-item>
			<span slot="labelContent">Name:</span>
			<span>Red Point Stores</span>
		</ui5-form-item>
	</ui5-form-group>
</ui5-form>`);

		cy.get("#testFormGroup6")
			.as("formGr1");

		cy.get("#testFormGroup7")
			.as("formGr2");

		cy.get("#testFormGroup8")
			.as("formGr3");

		cy.get("@formGr1")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsS")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsM")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr3")
			.invoke("prop", "colsL")
			.should("be.equal", 1);

		cy.get("@formGr1")
			.invoke("prop", "colsXl")
			.should("be.equal", 1);

		cy.get("@formGr2")
			.invoke("prop", "colsXl")
			.should("be.equal", 2);

		cy.get("@formGr3")
			.invoke("prop", "colsXl")
			.should("be.equal", 1);
	});
});
