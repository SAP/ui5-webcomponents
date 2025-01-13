import { html } from "lit";
import "../../src/ComboBoxItem.js";
import "../../src/ComboBox.js";
import type ComboBox from "../../src/ComboBox.js";

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

describe("Events testing", () => {
	it("Selection-change: event fires when item is fully typed and selected from the items list", () => {
		cy.mount(html`
			<ui5-combobox no-typeahead="true">
				<ui5-cb-item text="Algeria"></ui5-cb-item>
				<ui5-cb-item text="Bulgaria"></ui5-cb-item>
			</ui5-combobox>
		`);

		cy.get("[ui5-combobox]").as("combobox");
		cy.get<ComboBox>("@combobox").shadow().find("input").as("inner");

		cy.get<ComboBox>("@combobox")
			.then($combobox => {
				$combobox.get(0).addEventListener("selection-change", cy.stub().as("selectionChange"));
			});

		cy.get("@inner").realClick();
		cy.get("@inner").type("Bulgaria");

		cy.get("@combobox")
			.find("ui5-cb-item")
			.last()
			.click();

		cy.get("@selectionChange")
			.should("have.been.calledOnce");
		cy.get("@selectionChange")
			.should("have.been.calledWithMatch", { detail: { item: { text: "Bulgaria" } } });
	});
});
