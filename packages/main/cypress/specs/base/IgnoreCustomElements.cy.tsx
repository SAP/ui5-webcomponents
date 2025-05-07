import Card from "../../../src/Card.js";
import CardHeader from "../../../src/CardHeader.js";

import { ignoreCustomElements, shouldIgnoreCustomElement } from "@ui5/webcomponents-base/dist/IgnoreCustomElements.js";

ignoreCustomElements("app-");
ignoreCustomElements("my-");

describe("Ignore Custom Elements", () => {
	it("tests shouldIgnoreCustomElement method", () => {
		cy.mount(
			<Card>
				<CardHeader
					slot="header"
					subtitleText="4 of 10"
					titleText="Product">
				</CardHeader>

				{/* @ts-expect-error */}
				<app-trip-calendar class="myCard-trip-calendar"></app-trip-calendar>
				{/* @ts-expect-error */}
				<my-trip-calendar class="myCard-trip-calendar"></my-trip-calendar>
			</Card>
		);

		cy.wrap({ shouldIgnoreCustomElement })
			.invoke("shouldIgnoreCustomElement", "app-trip-calendar")
			.should("be.true");

		cy.wrap({ shouldIgnoreCustomElement })
			.invoke("shouldIgnoreCustomElement", "my-trip-calendar")
			.should("be.true");

		cy.wrap({ shouldIgnoreCustomElement })
			.invoke("shouldIgnoreCustomElement", "ui5-card-header")
			.should("be.false");
	});
});
