import { html } from "lit";
import "../../src/MultiComboBox.js";
import "../../src/MultiComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(html`
			<ui5-multi-combobox>
				<ui5-mcb-item text="<script>alert('XSS')</script>"></ui5-mcb-item>
				<ui5-mcb-item text="<b onmouseover=alert('XSS')></b>"></ui5-mcb-item>
				<ui5-mcb-item text="Albania<button onClick='alert(1)'>alert</button>"></ui5-mcb-item>
			</ui5-multi-combobox>
		`);

		cy.get("ui5-mcb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-mcb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-mcb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});
