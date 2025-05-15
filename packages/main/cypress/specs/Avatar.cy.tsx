import Avatar from "../../src/Avatar.js";
import "@ui5/webcomponents-icons/dist/supplier.js";

describe("Accessibility", () => {
	it("checks if initials of avatar are correctly announced", () => {
		const INITIALS = "XS";

		cy.mount(<Avatar id="interactive-avatar" initials={INITIALS} interactive></Avatar>);

		// Store the expected label to compare against
		const expectedLabel = `Avatar ${INITIALS}`;

		// Check if the aria-label is correctly set
		cy.get("#interactive-avatar")
			.shadow()
			.find(".ui5-avatar-root")
			.should("have.attr", "aria-label", expectedLabel);
	});

	it("checks if accessible-name is correctly passed to the icon", () => {
		const ACCESSIBLE_NAME = "Supplier Icon";
		const ICON_NAME = "supplier";

		cy.mount(<Avatar id="avatar-with-icon" icon={ICON_NAME} accessibleName={ACCESSIBLE_NAME}></Avatar>);

		cy.get("#avatar-with-icon")
			.shadow()
			.find("ui5-icon")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-label", ACCESSIBLE_NAME);
	});

	it("doesn't fire ui5-click event, when disabled property is set", () => {
		cy.mount(
			<div>
				<Avatar interactive disabled initials="JD" id="diabled-avatar"></Avatar>
				<input value="0" id="click-event" />
			</div>
		);
		document.getElementById("diabled-avatar")?.addEventListener("ui5-click", increment);

		function increment() {
			const input = document.getElementById("click-event") as HTMLInputElement;
			input.value = "1";
		}
		cy.get("#diabled-avatar").realClick();
		cy.get("#click-event").should("have.value", "0");
	});
});
