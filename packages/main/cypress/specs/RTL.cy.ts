import "../../src/CheckBox.js";

describe("RTL", () => {
	it("tests effectiveDir", () => {
		cy.mount(`<section dir="rtl">
	<ui5-checkbox id="cbRTL" text="Click me"></ui5-checkbox>
	<ui5-checkbox id="cbLTR" text="This checkbox however defines dir=ltr" dir="ltr"></ui5-checkbox>
</section>`);

		cy.get("#cbRTL")
			.should("have.prop", "effectiveDir", "rtl");

		cy.get("#cbLTR")
			.should("have.prop", "effectiveDir", "ltr");
	});
});
