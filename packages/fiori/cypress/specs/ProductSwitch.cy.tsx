import ProductSwitch from "../../src/ProductSwitch.js";
import ProductSwitchItem from "../../src/ProductSwitchItem.js";
import type UI5Element from "@ui5/webcomponents-base";

describe("List - getFocusDomRef Method", () => {
	it("should return undefined when the ProductSwitch is empty", () => {
		cy.mount(<ProductSwitch></ProductSwitch>);

		cy.get<ProductSwitch>("[ui5-product-switch]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
		<ProductSwitch>
			<ProductSwitchItem id="psi1" titleText="Item 1"></ProductSwitchItem>
			<ProductSwitchItem titleText="Item 2"></ProductSwitchItem>
		</ProductSwitch>
		);

		cy.get<UI5Element>("[ui5-product-switch], #psi1")
			.then(($el) => {
				const ps = $el[0];
				const psItem = $el[1];

				expect(ps.getFocusDomRef()).to.equal(psItem.getFocusDomRef());
			});
	});

	it("should return last focused item in the ProductSwitch", () => {
		cy.mount(
		<ProductSwitch>
			<ProductSwitchItem titleText="Item 1"></ProductSwitchItem>
			<ProductSwitchItem id="psi2" titleText="Item 2"></ProductSwitchItem>
		</ProductSwitch>
		);

		cy.get("#psi2").click();
		cy.get("#psi2").should("be.focused");

		cy.get<UI5Element>("[ui5-product-switch], #psi2")
			.then(($el) => {
				const ps = $el[0];
				const psItem = $el[1];

				expect(ps.getFocusDomRef()).to.equal(psItem.getFocusDomRef());
			});
	});
});