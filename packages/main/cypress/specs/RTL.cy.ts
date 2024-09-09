import { html } from "lit";
import "../../src/CheckBox.js";

describe("RTL", () => {
	it("tests effectiveDir", () => {
		cy.mount(html`<section dir="rtl">
	<ui5-checkbox id="cbRTL" text="Click me"></ui5-checkbox>
	<ui5-checkbox id="cbLTR" text="This checkbox however defines dir=ltr" dir="ltr"></ui5-checkbox>
</section>`);

		cy.get("#cbRTL")
			.invoke("prop", "effectiveDir")
			.should("be.equal", "rtl");

		cy.get("#cbLTR")
			.invoke("prop", "effectiveDir")
			.should("be.equal", "ltr");
	});
});
