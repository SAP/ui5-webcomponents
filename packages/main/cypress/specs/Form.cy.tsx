import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Form from "../../src/Form.js";
import FormItem from "../../src/FormItem.js";
import FormGroup from "../../src/FormGroup.js";
import Label from "../../src/Label.js";
import Text from "../../src/Text.js";
import Input from "../../src/Input.js";

describe("General API", () => {
	it("tests calculated state of Form with default layout, label-span and empty-span", () => {
		cy.mount(<Form headerText="Default form">
			<FormGroup headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>
			</FormGroup>

			<FormGroup headerText="Other info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>
		</Form>);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.should("have.prop", "columnsS", 1)
			.and("have.prop", "labelSpanS", 12)
			.and("have.prop", "emptySpanS", 0)
			.and("have.prop", "columnsM", 1)
			.and("have.prop", "labelSpanM", 4)
			.and("have.prop", "emptySpanM", 0)
			.and("have.prop", "columnsL", 2)
			.and("have.prop", "labelSpanL", 4)
			.and("have.prop", "emptySpanL", 0)
			.and("have.prop", "columnsXl", 3)
			.and("have.prop", "emptySpanXl", 0)
			.and("have.prop", "labelSpanXl", 4);
	});

	it("tests calculated state of Form with layout='S1 M2 L3 XL6' and label-span='S12 M4 L4 XL4'", () => {
		cy.mount(<Form headerText="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
			<FormGroup headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>
			</FormGroup>

			<FormGroup headerText="Other info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>
		</Form>);

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
		cy.mount(<Form headerText="Labels on top" layout="S1 M2 L2 XL3" labelSpan="S12 M12 L12 XL12">
			<FormItem>
				<Label slot="labelContent">Name</Label>
				<input />
			</FormItem>

			<FormItem>
				<Label slot="labelContent">ZIP Code/City</Label>
				<input />
				<input />
			</FormItem>

			<FormItem>
				<Label slot="labelContent">Street</Label>
				<input />
				<input />
			</FormItem>

			<FormItem>
				<Label slot="labelContent">Country</Label>
				<input />
			</FormItem>

			<FormItem>
				<Label slot="labelContent">WebSite</Label>
				<input />
			</FormItem>

			<FormItem>
				<Label slot="labelContent">Delivery address</Label>
				<input />
			</FormItem>
		</Form>);

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

	it("tests calculated state of Form empty-span='S0 M0 L1 XL1'", () => {
		cy.mount(<Form emptySpan="L1 XL1">
			<FormGroup headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup2" headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup3" headerText="Other info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>
		</Form>);

		cy.get("[ui5-form]")
			.as("form");

		cy.get("@form")
			.should("have.prop", "emptySpanS", 0)
			.and("have.prop", "emptySpanM", 0)
			.and("have.prop", "emptySpanL", 1)
			.and("have.prop", "emptySpanXl", 1);
	});

	it("tests calculated state of two FormGroups in layout='S1 M2 L3 XL4'", () => {
		cy.mount(<Form headerText="WebC :: Supplier 2gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
			<FormGroup id="testFormGroup4" headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup5" headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>

				<FormItem>
					<Label slot="labelContent">Email</Label>
					<Text>john.smith@sap.com</Text>
				</FormItem>
			</FormGroup>
		</Form>);

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
		cy.mount(<Form headerText="WebC :: Supplier 3gr (S1 M2 L3 XL6)" layout="S1 M2 L3 XL6">
			<FormGroup id="testFormGroup1" headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup2" headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>

				<FormItem>
					<Label slot="labelContent">Email</Label>
					<Text>john.smith@sap.com</Text>
				</FormItem>

				<FormItem>
					<Label slot="labelContent">Tel</Label>
					<Text>+49 6227 747474</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup3" headerText="Other info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>

				<FormItem>
					<Label slot="labelContent">ZIP Code/City</Label>
					<Text>411 Maintown</Text>
				</FormItem>
			</FormGroup>
		</Form>);

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
		cy.mount(<Form headerText="WebC :: Supplier 3gr (S1 M2 L3 XL4)" layout="S1 M2 L3 XL4">
			<FormGroup id="testFormGroup6" headerText="Address">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup7" headerText="Contact">
				<FormItem>
					<Label slot="labelContent">Twitter</Label>
					<Text>@sap</Text>
				</FormItem>

				<FormItem>
					<Label slot="labelContent">Email</Label>
					<Text>john.smith@sap.com</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup8" headerText="Other info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>
		</Form>);

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
			cy.mount(<Form layout="S3 M4 L5 XL6">
				<FormGroup>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>1</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>2</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>3</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>4</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>5</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>6</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>7</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>8</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>9</span>
					</FormItem>
					<FormItem>
						<span slot="labelContent">Item:</span>
						<span>10</span>
					</FormItem>
				</FormGroup>
			</Form>);
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
		cy.mount(<Form headerText="Form header text">
			<FormGroup headerText="Address">
				<FormItem>
					<Label>Name:</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup2" headerText="Contact">
				<FormItem>
					<Label>Twitter:</Label>
					<Text>@sap</Text>
				</FormItem>
			</FormGroup>

			<FormGroup id="testFormGroup3" headerText="Other info">
				<FormItem>
					<Label>Name:</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
			</FormGroup>
		</Form>);

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
		cy.mount(<Form headerText="Form header text">
			<FormItem>
				<Label>Name:</Label>
				<Text>Red Point Stores</Text>
			</FormItem>
			<FormItem>
				<Label>Twitter:</Label>
				<Text>@sap</Text>
			</FormItem>
			<FormItem>
				<Label>Name:</Label>
				<Text>Red Point Stores</Text>
			</FormItem>
		</Form>);

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
		cy.mount(
			<>
				<section>
					<button id="before">Before element</button>
				</section>
				<Form id="formWithGroups" headerText="Form 1">
					<FormGroup headerText="Address">
						<FormItem>
							<Label for="nameInp" slot="labelContent">Name:</Label>
							<Input value="Red Point Stores" id="nameInp"></Input>
						</FormItem>

						<FormItem>
							<Label id="cityLbl" for="cityInp" slot="labelContent">ZIP Code/City:</Label>
							<Input id="cityInp" value="411" accessible-name-ref="cityLbl"></Input>
							<Input value="Maintown" accessible-name-ref="cityLbl"></Input>
						</FormItem>
					</FormGroup>

					<FormGroup headerText="Contact">
						<FormItem>
							<Label id="streetLbl" for="streetInp" slot="labelContent">Street:</Label>
							<Input id="streetInp" value="Main St" accessible-name-ref="streetLbl"></Input>
							<Input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl"></Input>
						</FormItem>

						<FormItem>
							<Label id="countryLbl" for="countrySel" slot="labelContent">Country:</Label>
							<Input id="countrySel" accessible-name-ref="countryLbl"></Input>
						</FormItem>
					</FormGroup>
				</Form>

				<Form id="formWithItems" headerText="Form 2">
					<FormItem>
						<Label for="nameInp2" slot="labelContent">Name:</Label>
						<Input value="Red Point Stores" id="nameInp2"></Input>
					</FormItem>

					<FormItem>
						<Label id="cityLbl2" for="cityInp2" slot="labelContent">ZIP Code/City:</Label>
						<Input id="cityInp2" value="411" accessible-name-ref="cityLbl2"></Input>
						<Input value="Maintown" accessible-name-ref="cityLbl2"></Input>
					</FormItem>

					<FormItem>
						<Label id="streetLbl2" for="streetInp2" slot="labelContent">Street:</Label>
						<Input id="streetInp2" value="Main St" accessible-name-ref="streetLbl2"></Input>
						<Input id="streetNumberInp" value="1618" accessible-name-ref="streetLbl2"></Input>
					</FormItem>

					<FormItem>
						<Label id="countryLbl2" for="countrySel2" slot="labelContent">Country:</Label>
						<Input id="countrySel2" accessible-name-ref="countryLbl2"></Input>
					</FormItem>
				</Form>
			</>);

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
