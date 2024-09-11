import { html } from "lit";
import "../../../src/Card.js";
import "../../../src/CardHeader.js";

import { ignoreCustomElements, shouldIgnoreCustomElement } from "@ui5/webcomponents-base/dist/IgnoreCustomElements.js";

ignoreCustomElements("app-");
ignoreCustomElements("my-");

describe("Ignore Custom Elements", () => {
	it("tests shouldIgnoreCustomElement method", () => {
		cy.mount(html`<ui5-card>
		<ui5-card-header
			slot="header"
			status="4 of 10"
			title-text="Product"></ui5-card-header>

		<app-trip-calendar class="myCard-trip-calendar"></app-trip-calendar>
		<my-trip-calendar class="myCard-trip-calendar"></app-trip-calendar>
	</ui5-card>`);

		cy.wrap({ _shouldIgnoreCustomElement: shouldIgnoreCustomElement })
			.invoke("_shouldIgnoreCustomElement", "app-trip-calendar")
			.should("be.eq", true)
			.invoke("_shouldIgnoreCustomElement", "my-trip-calendar")
			.should("be.eq", true)
			.invoke("_shouldIgnoreCustomElement", "ui5-card-header")
			.should("be.eq", false);
	});
});
