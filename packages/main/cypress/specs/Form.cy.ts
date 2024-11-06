import { html } from "lit";
import "../../src/Form.js";
import "../../src/FormItem.js";
import "../../src/FormGroup.js";
import "../../src/Label.js";
import "../../src/Text.js";

describe("General API", () => {
	it("tests calculated state of Form with default layout and label-span", () => {
		cy.mount(html`<ui5-form class="addressForm" header-text="Default form">
			<ui5-form-group header-text="Address">
				<ui5-form-item>
					<ui5-label slot="labelContent">Name</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group id="testFormGroup2" header-text="Contact">
				<ui5-form-item>
					<ui5-label slot="labelContent">Twitter</ui5-label>
					<ui5-text>@sap</ui5-text>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group id="testFormGroup3" header-text="Other info">
				<ui5-form-item>
					<ui5-label slot="labelContent">Name</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
			</ui5-form-group>
		</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.should("have.prop", "columnsS", 1);

		cy.get("@form")
			.should("have.prop", "labelSpanS", 12);

		cy.get("@form")
			.should("have.prop", "columnsM", 1);

		cy.get("@form")
			.should("have.prop", "labelSpanM", 4);

		cy.get("@form")
			.should("have.prop", "columnsL", 2);

		cy.get("@form")
			.should("have.prop", "labelSpanL", 4);

		cy.get("@form")
			.should("have.prop", "columnsXl", 3);

		cy.get("@form")
			.should("have.prop", "labelSpanXl", 4);
	});

	it("tests calculated state of Form with layout='S1 M2 L3 XL6' and label-span='S12 M4 L4 XL4'", () => {
		cy.mount(html`<ui5-form class="addressForm" header-text="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
	<ui5-form-group header-text="Address">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup2" header-text="Contact">
		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter</ui5-label>
			<ui5-text>@sap</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup3" header-text="Other info">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>
	</ui5-form-group>
</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.should("have.prop", "columnsS", 1);

		cy.get("@form")
			.should("have.prop", "labelSpanS", 12);

		cy.get("@form")
			.should("have.prop", "columnsM", 2);

		cy.get("@form")
			.should("have.prop", "labelSpanM", 4);

		cy.get("@form")
			.should("have.prop", "columnsL", 3);

		cy.get("@form")
			.should("have.prop", "labelSpanL", 4);

		cy.get("@form")
			.should("have.prop", "columnsXl", 6);

		cy.get("@form")
			.should("have.prop", "labelSpanXl", 4);
	});

	it("tests calculated state of Form with layout='S1 M2 L2 XL3' label-span='S12 M12 L12 XL12'", () => {
		cy.mount(html`<ui5-form header-text="Labels on top" layout="S1 M2 L2 XL3" label-span="S12 M12 L12 XL12">
	<ui5-form-item>
		<ui5-label slot="labelContent">Name</ui5-label>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">ZIP Code/City</ui5-label>
		<input />
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Street</ui5-label>
		<input />
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Country</ui5-label>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">WebSite</ui5-label>
		<input />
	</ui5-form-item>

	<ui5-form-item>
		<ui5-label slot="labelContent">Delivery address</ui5-label>
		<input />
	</ui5-form-item>
</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.should("have.prop", "columnsS", 1);

		cy.get("@form")
			.should("have.prop", "labelSpanS", 12);

		cy.get("@form")
			.should("have.prop", "columnsM", 2);

		cy.get("@form")
			.should("have.prop", "labelSpanM", 12);

		cy.get("@form")
			.should("have.prop", "columnsL", 2);

		cy.get("@form")
			.should("have.prop", "labelSpanL", 12);

		cy.get("@form")
			.should("have.prop", "columnsXl", 3);

		cy.get("@form")
			.should("have.prop", "labelSpanXl", 12);
	});

	it("tests calculated state of two FormGroups in layout='S1 M2 L3 XL4'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 2gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
	<ui5-form-group id="testFormGroup4" header-text="Address">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup5" header-text="Contact">
		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter</ui5-label>
			<ui5-text>@sap</ui5-text>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Email</ui5-label>
			<ui5-text>john.smith@sap.com</ui5-text>
		</ui5-form-item>
</ui5-form>`);

		cy.get("#testFormGroup4")
			.as("formGr1");

		cy.get("#testFormGroup5")
			.as("formGr2");

		cy.get("@formGr1")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsL", 2);

		cy.get("@formGr1")
			.should("have.prop", "colsXl", 2);

		cy.get("@formGr2")
			.should("have.prop", "colsXl", 2);
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL6'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
	<ui5-form-group id="testFormGroup1" header-text="Address">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup2" header-text="Contact">
		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter</ui5-label>
			<ui5-text>@sap</ui5-text>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Email</ui5-label>
			<ui5-text>john.smith@sap.com</ui5-text>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Tel</ui5-label>
			<ui5-text>+49 6227 747474</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup3" header-text="Other info">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">ZIP Code/City</ui5-label>
			<ui5-text>411 Maintown</ui5-text>
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
			.should("have.prop", "colsS", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsXl", 2);

		cy.get("@formGr2")
			.should("have.prop", "colsXl", 2);

		cy.get("@formGr3")
			.should("have.prop", "colsXl", 2);
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL4'", () => {
		cy.mount(html`<ui5-form header-text="WebC :: Supplier 3gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
	<ui5-form-group id="testFormGroup6" header-text="Address">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup7" header-text="Contact">
		<ui5-form-item>
			<ui5-label slot="labelContent">Twitter</ui5-label>
			<ui5-text>@sap</ui5-text>
		</ui5-form-item>

		<ui5-form-item>
			<ui5-label slot="labelContent">Email</ui5-label>
			<ui5-text>john.smith@sap.com</ui5-text>
		</ui5-form-item>
	</ui5-form-group>

	<ui5-form-group id="testFormGroup8" header-text="Other info">
		<ui5-form-item>
			<ui5-label slot="labelContent">Name</ui5-label>
			<ui5-text>Red Point Stores</ui5-text>
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
			.should("have.prop", "colsS", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsS", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsM", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr3")
			.should("have.prop", "colsL", 1);

		cy.get("@formGr1")
			.should("have.prop", "colsXl", 1);

		cy.get("@formGr2")
			.should("have.prop", "colsXl", 2);

		cy.get("@formGr3")
			.should("have.prop", "colsXl", 1);
	});
});

describe("Accessibility", () => {
	it("tests 'role' and 'aria-labelled-by' of form with groups", () => {
		cy.mount(html`<ui5-form class="addressForm" header-text="Form header text">
			<ui5-form-group header-text="Address">
				<ui5-form-item>
					<ui5-label>Name:</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group id="testFormGroup2" header-text="Contact">
				<ui5-form-item>
					<ui5-label>Twitter:</ui5-label>
					<ui5-text>@sap</ui5-text>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group id="testFormGroup3" header-text="Other info">
				<ui5-form-item>
					<ui5-label>Name:</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
			</ui5-form-group>
		</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.shadow()
			.find(".ui5-form-root")
			.should("have.attr", "role", "region");

		// assert: the root element's aria-labelledby is equal to the form title's ID
		cy.get("@form").shadow().find(".ui5-form-root").invoke("attr", "aria-labelledby")
			.then(ariaLabelledBy => {
				cy.get("@form").shadow().find(".ui5-form-header [ui5-title]")
					.invoke("attr", "id")
					.then(id => {
						expect(ariaLabelledBy).to.equal(id);
					});
			});

		cy.get("@form")
			.shadow()
			.find(".ui5-form-group")
			.eq(0)
			.as("firstGroup");

		cy.get("@firstGroup")
			.should("have.attr", "role", "form")
			.should("have.attr", "data-sap-ui-fastnavgroup", "true");

		cy.get("@form")
			.shadow()
			.find(".ui5-form-group [ui5-title]")
			.eq(0)
			.as("firstGroupTitle");

		// assert: the form group's aria-labelledby is equal to the form group title's ID
		cy.get("@firstGroup")
			.invoke("attr", "aria-labelledby")
			.then(ariaLabelledBy => {
				cy.get("@firstGroupTitle")
					.invoke("attr", "id")
					.then(id => {
						expect(ariaLabelledBy).to.equal(id);
					});
			});
	});

	it("tests 'role' and 'aria-labelled-by' of form with groups", () => {
		cy.mount(html`<ui5-form class="addressForm" header-text="Form header text">
				<ui5-form-item>
					<ui5-label>Name:</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
				<ui5-form-item>
					<ui5-label>Twitter:</ui5-label>
					<ui5-text>@sap</ui5-text>
				</ui5-form-item>
				<ui5-form-item>
					<ui5-label>Name:</ui5-label>
					<ui5-text>Red Point Stores</ui5-text>
				</ui5-form-item>
		</ui5-form>`);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.shadow()
			.find(".ui5-form-root")
			.should("have.attr", "role", "form");

		// assert: the root element's aria-labelledby is equal to the form title's ID
		cy.get("@form").shadow().find(".ui5-form-root").invoke("attr", "aria-labelledby")
			.then(ariaLabelledBy => {
				cy.get("@form").shadow().find(".ui5-form-header [ui5-title]")
					.invoke("attr", "id")
					.then(id => {
						expect(ariaLabelledBy).to.equal(id);
					});
			});
	});
});
