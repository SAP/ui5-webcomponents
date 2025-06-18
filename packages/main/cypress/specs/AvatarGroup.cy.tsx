import Avatar from "../../src/Avatar.js";
import AvatarGroup from "../../src/AvatarGroup.js";
import type UI5Element from "@ui5/webcomponents-base";

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

describe("Avatars", () => {
	it("checks if no unnecessary margin is applied of only one Avatar is available", () => {
		cy.mount(<AvatarGroup id="ag2" type="Group">
			<Avatar id="av1" initials="II"></Avatar>
			<Avatar id="av2" initials="II"></Avatar>
		</AvatarGroup>);

		cy.get("#av2").invoke("remove");

		cy.get("#av1")
			.invoke("attr", "style")
			.should("equal", "");
	});


	it("tests if _color-scheme attribute is automatically set to avatars", () => {
		const avatarCount = 20;
		cy.mount(<AvatarGroup id="ag" type="Group">
			{Array.from({ length: avatarCount }, (_, i) => {
				return <Avatar initials="II"></Avatar>;
			})}
		</AvatarGroup>);

		Array.from({ length: avatarCount }, (_, i) => {
			const index = (i % 10) + 1;
			cy.get("ui5-avatar").eq(i).should("have.attr", "_color-scheme", `Accent${index}`);
		});
	});
});

describe("AvatarGroup - getFocusDomRef Method", () => {
	it("should return undefined when the AvatarGroup is empty", () => {
		cy.mount(<AvatarGroup></AvatarGroup>);

		cy.get<AvatarGroup>("[ui5-avatar-group]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first avatar if no item was focused before", () => {
		cy.mount(
			<AvatarGroup type="Individual">
				<Avatar id="av1" initials="II"></Avatar>
				<Avatar initials="II"></Avatar>
			</AvatarGroup>
		);

		cy.get<UI5Element>("[ui5-avatar-group], #av1")
			.then(($el) => {
				const avGroup = $el[0];
				const avatar = $el[1];

				expect(avGroup.getFocusDomRef()).to.equal(avatar.getFocusDomRef());
			});
	});

	it("should return last focused avatar in the AvatarGroup", () => {
		cy.mount(
			<AvatarGroup type="Individual">
				<Avatar initials="II"></Avatar>
				<Avatar id="av2" initials="II"></Avatar>
			</AvatarGroup>
		);

		cy.get("#av2").click();
		cy.get("#av2").should("be.focused");

		cy.get<UI5Element>("[ui5-avatar-group], #av2")
			.then(($el) => {
				const avGroup = $el[0];
				const avatar = $el[1];

				expect(avGroup.getFocusDomRef()).to.equal(avatar.getFocusDomRef());
			});
	});
});
