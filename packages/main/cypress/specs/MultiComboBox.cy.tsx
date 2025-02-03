import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="<script>alert('XSS')</script>"></MultiComboBoxItem>
				<MultiComboBoxItem text="<b onmouseover=alert('XSS')></b>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("ui5-mcb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-mcb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-mcb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("Value State", () => {
	it("should be able to change value states upon typing", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		// add event listener
		cy.get("ui5-multi-combobox")
			.then(mcb => {
				mcb.get(0).addEventListener("input", e => {
					(mcb.get(0) as MultiComboBox).valueState = (e.target as MultiComboBox).value.length ? "Negative" : "Information";
				});
			});

		// type "f"
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.realType("f");

		cy.realPress("Backspace");

		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.realPress("f");

		cy.get("ui5-multi-combobox")
			.shadow()
			.find(".ui5-valuestatemessage--information")
			.should("not.exist");
	});
});
