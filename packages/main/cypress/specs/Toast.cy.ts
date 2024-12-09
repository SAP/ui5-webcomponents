import { html } from "lit";
import "../../src/Toast.js";
import "../../src/Button.js";
import "../../src/List.js";
import type Toast from "../../src/Toast.js";

describe("Toast - test popover API", () => {
	it("Should verify the toast has the popover attribute set to manual", () => {
		cy.mount(html`
		<ui5-toast id="toast" open placement="TopStart">TopStart</ui5-toast>`);
		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");
	});

	it("Toast should stay on top of list after scroll", () => {
		cy.mount(html`
		<ui5-toast id="toast" open duration="999999" placement="TopStart">TopStart</ui5-toast>
		<ui5-list id="list" header-text="List with ListItemStandard" style="opacity: 0.7">
			<ui5-li additional-text="3">List Item 1</ui5-li>
			<ui5-li additional-text="2">List Item 2</ui5-li>
			<ui5-li additional-text="1">List Item 3</ui5-li>
		</ui5-list>`);

		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");

		cy.get("#toast")
			.then($toast => {
				const toastRect = $toast[0].getBoundingClientRect();
				cy.get("#list")
					.then($list => {
						const listRect = $list[0].getBoundingClientRect();
						const isOverlapping = toastRect.right > listRect.left
							&& toastRect.left < listRect.right
							&& toastRect.bottom > listRect.top
							&& toastRect.top < listRect.bottom;
						expect(isOverlapping).to.be.true;
					});
			});
	});
});
