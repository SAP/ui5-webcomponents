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
