import { html } from "lit";
import "../../src/MultiComboBox.js";
import "../../src/MultiComboBoxItem.js";
import type MultiComboBox from "../../src/MultiComboBox.js";

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

describe("Value State", () => {
	it("should be able to change value states upon typing", () => {
		cy.mount(html`
			<ui5-multi-combobox no-validation>
				<ui5-mcb-item text="Item 1"></ui5-mcb-item>
				<ui5-mcb-item text="Item 2"></ui5-mcb-item>
			</ui5-multi-combobox>
		`);

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
			.type("f");

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
