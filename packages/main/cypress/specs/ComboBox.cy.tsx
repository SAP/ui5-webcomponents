import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="<script>alert('XSS')</script>"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-cb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-cb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-cb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});
