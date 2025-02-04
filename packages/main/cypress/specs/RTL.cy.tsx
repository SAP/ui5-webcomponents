import CheckBox from "../../src/CheckBox.js";

describe("RTL", () => {
	it("tests effectiveDir", () => {
		cy.mount(
			<section dir="rtl">
				<CheckBox id="cbRTL" text="Click me"></CheckBox>
				<CheckBox id="cbLTR" text="This checkbox however defines dir=ltr" dir="ltr"></CheckBox>
			</section>
		);

		cy.get("#cbRTL")
			.should("have.prop", "effectiveDir", "rtl");

		cy.get("#cbLTR")
			.should("have.prop", "effectiveDir", "ltr");
	});
});
