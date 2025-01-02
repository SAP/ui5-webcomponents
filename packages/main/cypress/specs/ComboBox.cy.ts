import { html } from "lit";
import "../../src/ComboBox.js";
import "../../src/ComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(html`
			<ui5-combobox>
				<ui5-cb-item text="<script>alert('XSS')</script>"></ui5-cb-item>
				<ui5-cb-item text="<b onmouseover=alert('XSS')></b>"></ui5-cb-item>
				<ui5-cb-item text="Albania<button onClick='alert(1)'>alert</button>"></ui5-cb-item>
			</ui5-combobox>
		`);

		cy.get("ui5-cb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-cb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-cb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});
