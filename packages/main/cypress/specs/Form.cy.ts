import { html } from "lit";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import "../../src/Form.js";
import "../../src/FormItem.js";
import "../../src/FormGroup.js";
import "../../src/Label.js";
import "../../src/Text.js";
import "../../src/Input.js";

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

	describe("tests items ordering within a group", () => {
		beforeEach(() => {
			cy.mount(html`<ui5-form layout="S3 M4 L5 XL6">
	<ui5-form-group>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>1</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>2</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>3</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>4</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>5</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>6</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>7</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>8</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>9</span>
		</ui5-form-item>
		<ui5-form-item>
			<span slot="labelContent">Item:</span>
			<span>10</span>
		</ui5-form-item>
	</ui5-form-group>
</ui5-form>`);
		});

		it("10 items in 6 columns", () => {
			cy.get("[ui5-form]")
				.invoke("width", 1500);

			cy.get("[ui5-form-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.css", "order", "0");

			cy.get("@items")
				.eq(1)
				.should("have.css", "order", "6");

			cy.get("@items")
				.eq(2)
				.should("have.css", "order", "1");

			cy.get("@items")
				.eq(3)
				.should("have.css", "order", "7");

			cy.get("@items")
				.eq(4)
				.should("have.css", "order", "2");

			cy.get("@items")
				.eq(5)
				.should("have.css", "order", "8");

			cy.get("@items")
				.eq(6)
				.should("have.css", "order", "3");

			cy.get("@items")
				.eq(7)
				.should("have.css", "order", "9");

			cy.get("@items")
				.eq(8)
				.should("have.css", "order", "4");

			cy.get("@items")
				.eq(9)
				.should("have.css", "order", "5");
		});

		it("10 items in 5 columns", () => {
			cy.get("[ui5-form]")
				.invoke("width", 1300);

			cy.get("[ui5-form-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.css", "order", "0");

			cy.get("@items")
				.eq(1)
				.should("have.css", "order", "5");

			cy.get("@items")
				.eq(2)
				.should("have.css", "order", "1");

			cy.get("@items")
				.eq(3)
				.should("have.css", "order", "6");

			cy.get("@items")
				.eq(4)
				.should("have.css", "order", "2");

			cy.get("@items")
				.eq(5)
				.should("have.css", "order", "7");

			cy.get("@items")
				.eq(6)
				.should("have.css", "order", "3");

			cy.get("@items")
				.eq(7)
				.should("have.css", "order", "8");

			cy.get("@items")
				.eq(8)
				.should("have.css", "order", "4");

			cy.get("@items")
				.eq(9)
				.should("have.css", "order", "9");
		});

		it("10 items in 4 columns", () => {
			cy.get("[ui5-form]")
				.invoke("width", 800);

			cy.get("[ui5-form-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.css", "order", "0");

			cy.get("@items")
				.eq(1)
				.should("have.css", "order", "4");

			cy.get("@items")
				.eq(2)
				.should("have.css", "order", "8");

			cy.get("@items")
				.eq(3)
				.should("have.css", "order", "1");

			cy.get("@items")
				.eq(4)
				.should("have.css", "order", "5");

			cy.get("@items")
				.eq(5)
				.should("have.css", "order", "9");

			cy.get("@items")
				.eq(6)
				.should("have.css", "order", "2");

			cy.get("@items")
				.eq(7)
				.should("have.css", "order", "6");

			cy.get("@items")
				.eq(8)
				.should("have.css", "order", "3");

			cy.get("@items")
				.eq(9)
				.should("have.css", "order", "7");
		});

		it("10 items in 3 columns", () => {
			cy.get("[ui5-form]")
				.invoke("width", 500);

			cy.get("[ui5-form-item]")
				.as("items");

			cy.get("@items")
				.eq(0)
				.should("have.css", "order", "0");

			cy.get("@items")
				.eq(1)
				.should("have.css", "order", "3");

			cy.get("@items")
				.eq(2)
				.should("have.css", "order", "6");

			cy.get("@items")
				.eq(3)
				.should("have.css", "order", "9");

			cy.get("@items")
				.eq(4)
				.should("have.css", "order", "1");

			cy.get("@items")
				.eq(5)
				.should("have.css", "order", "4");

			cy.get("@items")
				.eq(6)
				.should("have.css", "order", "7");

			cy.get("@items")
				.eq(7)
				.should("have.css", "order", "2");

			cy.get("@items")
				.eq(8)
				.should("have.css", "order", "5");

			cy.get("@items")
				.eq(9)
				.should("have.css", "order", "8");
		});
	});
});

describe("Accessibility", () => {
	it("tests 'role' and 'aria-labelledby' of form with groups", () => {
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

		cy.get("[ui5-form-group]")
			.first()
			.as("formGroup");

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
			.as("firstGroupDOMRef");

		cy.get("@form")
			.shadow()
			.find(".ui5-form-group [ui5-title]")
			.eq(0)
			.as("firstGroupTitle");

		cy.get("@form")
			.should("not.have.attr", "data-sap-ui-fastnavgroup", "true");

		cy.get("@formGroup")
			.should("have.attr", "data-sap-ui-fastnavgroup", "true");

		cy.get("@firstGroupDOMRef")
			.should("have.attr", "role", "form");

		// assert: the form group's aria-labelledby is equal to the form group title's ID
		cy.get("@firstGroupDOMRef")
			.invoke("attr", "aria-labelledby")
			.then(ariaLabelledBy => {
				cy.get("@firstGroupTitle")
					.invoke("attr", "id")
					.then(id => {
						expect(ariaLabelledBy).to.equal(id);
					});
			});
	});

	it("tests 'role' and 'aria-labelledby' of form without groups", () => {
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

		cy.get("@form")
			.should("have.attr", "data-sap-ui-fastnavgroup", "true");

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

	it("tests F6 navigation", () => {
		cy.mount(html`
			<section>
				<button id="before">Before element</button>
			</section>
			<ui5-form id="formWithGroups" header-text="Form 1">
				<ui5-form-group header-text="Address">
					<ui5-form-item>
						<ui5-label for="nameInp" slot="labelContent">Name:</ui5-label>
						<ui5-input value="Red Point Stores" id="nameInp"></ui5-input>
					</ui5-form-item>
				
					<ui5-form-item>
						<ui5-label id="cityLbl" for="cityInp" slot="labelContent">ZIP Code/City:</ui5-label>
						<ui5-input id="cityInp" value="411" accessible-name-ref="cityLbl"></ui5-input>
						<ui5-input value="Maintown" accessible-name-ref="cityLbl"></ui5-input>
					</ui5-form-item>
				</ui5-form-group>

				<ui5-form-group header-text="Contact">
					<ui5-form-item>
						<ui5-label id="streetLbl" for="streetInp" slot="labelContent">Street:</ui5-label>
						<ui5-input id="streetInp" value="Main St" accessible-name-ref="streetLbl"></ui5-input>
						<ui5-input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl"></ui5-input>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label id="countryLbl" for="countrySel" slot="labelContent">Country:</ui5-label>
						<ui5-input id="countrySel" accessible-name-ref="countryLbl"></ui5-input>
					</ui5-form-item>
				</ui5-form-group>
			</ui5-form>

			<ui5-form id="formWithItems" header-text="Form 2">
				<ui5-form-item>
					<ui5-label for="nameInp2" slot="labelContent">Name:</ui5-label>
					<ui5-input value="Red Point Stores" id="nameInp2"></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label id="cityLbl2" for="cityInp2" slot="labelContent">ZIP Code/City:</ui5-label>
					<ui5-input id="cityInp2" value="411" accessible-name-ref="cityLbl2"></ui5-input>
					<ui5-input value="Maintown" accessible-name-ref="cityLbl2"></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label id="streetLbl2" for="streetInp2" slot="labelContent">Street:</ui5-label>
					<ui5-input id="streetInp2" value="Main St" accessible-name-ref="streetLbl2"></ui5-input>
					<ui5-input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl2"></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label id="countryLbl2" for="countrySel2" slot="labelContent">Country:</ui5-label>
					<ui5-input id="countrySel2" accessible-name-ref="countryLbl2"></ui5-input>
				</ui5-form-item>
			</ui5-form>`);

		cy.get("#before").focus();
		cy.realPress("F6");

		// assert: the first input of the first FormGroup is focused
		cy.get("#nameInp")
			.should("be.focused");

		cy.realPress("F6");

		// assert: the first input in second FormGroup is focused
		cy.get("#streetInp")
			.should("be.focused");

		cy.realPress("F6");

		// assert: the first input in next Form is focused
		cy.get("#nameInp2")
			.should("be.focused");

		cy.realPress("F6");

		// assert: back to the first Form
		cy.get("#nameInp")
			.should("be.focused");
	});
});
