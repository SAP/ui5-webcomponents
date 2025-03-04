import Avatar from "../../src/Avatar.js";
import AvatarGroup from "../../src/AvatarGroup.js";

describe("Overflow", () => {
	it("checks if overflow button is hiding properly", () => {
		cy.mount(<AvatarGroup id="ag" style="width: 100px;">
			<Avatar initials="II"></Avatar>
			<Avatar initials="II"></Avatar>
			<Avatar initials="II"></Avatar>
		</AvatarGroup>);

		// Store the expected hidden items to compare against
		const expectedHiddenItems = 0;

		// Check if the aria-label is correctly set
		cy.get("#ag")
			.as("ag")
			.then($el => {
				$el.get(0).innerHTML = "";
				return $el;
			});

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@ag")
			.then($el => {
				const avatar = document.createElement("ui5-avatar");
				avatar.setAttribute("initials", "II");
				$el.get(0).appendChild(avatar);
				const ag = document.querySelector("#ag") as AvatarGroup;
				return ag._hiddenItems;
			})
			.should("equal", expectedHiddenItems);
	});
});
