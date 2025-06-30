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

describe("Accessibility", () => {
	it("checks if accessibleName is properly set and applied as aria-label", () => {
		const customLabel = "Development Team Members";
		
		cy.mount(<AvatarGroup id="ag" accessible-name={customLabel}>
			<Avatar initials="JD"></Avatar>
			<Avatar initials="SM"></Avatar>
			<Avatar initials="KL"></Avatar>
		</AvatarGroup>);

		cy.get("#ag")
			.should("have.attr", "accessible-name", customLabel)
			.then(($el) => {
				const avatarGroup = $el.get(0) as AvatarGroup;
				expect(avatarGroup.accessibleName).to.equal(customLabel);
			});

		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("have.attr", "aria-label", customLabel)
			.and("not.have.attr", "aria-labelledby");
	});

	it("checks if accessibleNameRef is properly set and applied as aria-label", () => {
		const labelId = "team-header";
		
		cy.mount(
			<>
				<h3 id={labelId}>Quality Assurance Team</h3>
				<AvatarGroup id="ag" accessible-name-ref={labelId}>
					<Avatar initials="AB"></Avatar>
					<Avatar initials="CD"></Avatar>
					<Avatar initials="EF"></Avatar>
				</AvatarGroup>
			</>
		);
	
		cy.get("#ag")
			.should("have.attr", "accessible-name-ref", labelId)
			.then(($el) => {
				const avatarGroup = $el.get(0) as AvatarGroup;
				expect(avatarGroup.accessibleNameRef).to.equal(labelId);
			});
	
		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("have.attr", "aria-label", "Quality Assurance Team");
		
		cy.get("#ag")
			.shadow()
			.find(".ui5-avatar-group-items")
			.should("not.have.attr", "aria-labelledby");
		
		cy.get(`#${labelId}`).should("exist");
	});
});

describe("avatar-group rendering", () => {
	beforeEach(() => {
		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup id="avatar-group-individual" type="Individual">
					<Avatar id="avatar-1" size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
				<AvatarGroup id="avatar-group-group" type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" icon="home"></Avatar>
				</AvatarGroup>
				<input type="text" id="event-target" defaultValue="" />
				<input type="text" id="event-overflow-button-clicked" defaultValue="" />
				<button id="reset-btn">Reset fields</button>
			</div>
		);

		// Set up event listener for individual avatar group
		cy.get("#avatar-group-individual").then(($avatarGroup) => {
			$avatarGroup[0].addEventListener("ui5-click", function(event: CustomEvent) {
				const eventTargetRef = document.getElementById("event-target") as HTMLInputElement;
				const eventOverflowButtonClicked = document.getElementById("event-overflow-button-clicked") as HTMLInputElement;
				
				eventTargetRef.value = event.detail.targetRef.tagName;
				eventOverflowButtonClicked.value = event.detail.overflowButtonClicked.toString();
			});
		});

		// Set up event listener for group avatar group - SAME handler as individual
		cy.get("#avatar-group-group").then(($avatarGroup) => {
			$avatarGroup[0].addEventListener("ui5-click", function(event: CustomEvent) {
				const eventTargetRef = document.getElementById("event-target") as HTMLInputElement;
				const eventOverflowButtonClicked = document.getElementById("event-overflow-button-clicked") as HTMLInputElement;
				
				// For group type, use tagName + className 
				eventTargetRef.value = event.detail.targetRef.tagName + "." + event.detail.targetRef.className;
				eventOverflowButtonClicked.value = event.detail.overflowButtonClicked.toString();
			});
		});

		// Set up reset functionality
		cy.get("#reset-btn").then(($btn) => {
			$btn[0].addEventListener("click", function() {
				(document.getElementById("event-target") as HTMLInputElement).value = "";
				(document.getElementById("event-overflow-button-clicked") as HTMLInputElement).value = "";
			});
		});
	});

	it("tests if web component is correctly rendered", () => {
		cy.get("#avatar-group-individual")
			.shadow()
			.find("div")
			.should("exist");

		cy.get("#avatar-group-group")
			.shadow()
			.find("div")
			.should("exist");
	});

	it("tests click event when avatar is clicked", () => {
		cy.get("#reset-btn").realClick();
		cy.get("#avatar-1").realClick();

		cy.get("#event-target")
			.should("have.value", "UI5-AVATAR");

		cy.get("#event-overflow-button-clicked")
			.should("have.value", "false");
	});

	it("tests click event when overflow button is clicked", () => {
		cy.get("#reset-btn").realClick();
		
		cy.get("#avatar-group-individual")
			.shadow()
			.find("ui5-button")
			.realClick();

		cy.get("#event-target")
			.should("have.value", "UI5-BUTTON");

		cy.get("#event-overflow-button-clicked")
			.should("have.value", "true");
	});

	it("tests click event avatar group with type group is clicked", () => {
		cy.get("#reset-btn").realClick();
		
		cy.get("#avatar-group-group")
			.shadow()
			.find(".ui5-avatar-group-items")
			.realClick();
	
		cy.get("#event-target")
			.should("have.value", "DIV.ui5-avatar-group-items");
	
		cy.get("#event-overflow-button-clicked")
			.should("have.value", "false");
	});

	it("tests if hiddenItems is correctly displayed in the overflow button", () => {
		cy.viewport(200, 1080);
	
		cy.get("#avatar-group-individual")
			.shadow()
			.find("ui5-button")
			.should("not.have.text", "")
			.invoke("text")
			.then((buttonText) => {
				cy.get("#avatar-group-individual")
					.then(($avatarGroup) => {
						const avatarGroup = $avatarGroup[0] as AvatarGroup;
						const hiddenItemsCount = avatarGroup.hiddenItems.length;
						expect(buttonText).to.equal(`+${hiddenItemsCount}`);
					});
			});
	});

	it("tests if click event is firing only once", () => {
		let eventCounter = 0;
	
		cy.mount(
			<div style={{width: "400px"}}>
				<AvatarGroup id="avatar-group-individual-events" type="Individual">
					<Avatar id="avatar-1-test-events" size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive icon="home"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
				<AvatarGroup id="avatar-group-group-events" type="Group">
					<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
					<Avatar size="XL" interactive icon="home"></Avatar>
					<Avatar size="XL" interactive initials="XL"></Avatar>
				</AvatarGroup>
				<input type="text" id="event-avatars-clicked" defaultValue="0" />
			</div>
		);
	
		cy.get("#avatar-group-individual-events").then(($avatarGroup) => {
			$avatarGroup[0].addEventListener("ui5-click", function() {
				const eventAvatarsClicked = document.getElementById("event-avatars-clicked") as HTMLInputElement;
				eventAvatarsClicked.value = (parseInt(eventAvatarsClicked.value) + 1).toString();
			});
		});
	
		cy.get("#avatar-group-group-events").then(($avatarGroup) => {
			$avatarGroup[0].addEventListener("ui5-click", function() {
				const eventAvatarsClicked = document.getElementById("event-avatars-clicked") as HTMLInputElement;
				eventAvatarsClicked.value = (parseInt(eventAvatarsClicked.value) + 1).toString();
			});
		});
	
		cy.get("#avatar-1-test-events").realClick();
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-1-test-events").realPress("Enter");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-1-test-events").realPress("Space");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-individual-events")
			.shadow()
			.find("ui5-button")
			.realClick();
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-individual-events")
			.shadow()
			.find("ui5-button")
			.realPress("Enter");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-individual-events")
			.shadow()
			.find("ui5-button")
			.realPress("Space");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-group-events").realClick();
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-group-events").realPress("Enter");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	
		cy.get("#avatar-group-group-events").realPress("Space");
		cy.get("#event-avatars-clicked").should("have.value", (++eventCounter).toString());
	});
});

describe("ARIA attributes", () => {
	describe("Type Individual", () => {
		beforeEach(() => {
			cy.mount(
				<div style={{width: "200px"}}>
					<AvatarGroup id="avatar-group-individual" type="Individual">
						<Avatar size="XL" interactive icon="home" initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
						<Avatar size="XL" interactive initials="XL"></Avatar>
					</AvatarGroup>
				</div>
			);
		});

		it("role is correct", () => {
			cy.get("#avatar-group-individual")
				.should("have.prop", "_role", "group");
		});

		it("aria-haspopup is correct", () => {
			cy.get("#avatar-group-individual").then(($avatarGroup) => {
				($avatarGroup[0] as any).accessibilityAttributes = { hasPopup: "menu" };
			});


			cy.get("#avatar-group-individual")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					
					expect(avatarGroup._containerAriaHasPopup).to.be.undefined;
					
					expect(avatarGroup._overflowButtonAccAttributes).to.exist;
					expect(avatarGroup._overflowButtonAccAttributes.hasPopup).to.equal("menu");
				});
		});

		it("aria-label is correct", () => {
			cy.get("#avatar-group-individual")
				.then(($avatarGroup) => {
					const ariaLabel = ($avatarGroup[0] as AvatarGroup)._ariaLabelText;
					expect(ariaLabel).to.include("Individual avatars");
					expect(ariaLabel).to.not.include("Show complete list");
					expect(ariaLabel).to.include("Press ARROW keys");
				});

			cy.get("#avatar-group-individual")
				.then(($avatarGroup) => {
					const overflowButtonLabel = ($avatarGroup[0] as AvatarGroup)._overflowButtonAriaLabelText;
					expect(overflowButtonLabel).to.include("Activate for complete list");
				});
		});
	});

	describe("Type Group", () => {
		beforeEach(() => {
			cy.mount(
				<AvatarGroup id="avatar-group-group" type="Group">
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
					<Avatar size="M" initials="M"></Avatar>
				</AvatarGroup>
			);
		});
	
		it("role is correct", () => {
			cy.get("#avatar-group-group")
				.should("have.prop", "_role", "button");
		});
	
		it("aria-haspopup is correct", () => {
			cy.get("#avatar-group-group").then(($avatarGroup) => {
				($avatarGroup[0] as AvatarGroup).accessibilityAttributes = { hasPopup: "menu" };
			});
	
			cy.get("#avatar-group-group")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					
					expect(avatarGroup._containerAriaHasPopup).to.equal("menu");
					
					if (avatarGroup._overflowButtonAccAttributes) {
						expect(avatarGroup._overflowButtonAccAttributes.hasPopup).to.be.undefined;
					}
				});
		});
	
		it("aria-label is correct", () => {
			cy.get("#avatar-group-group")
				.then(($avatarGroup) => {
					const avatarGroup = $avatarGroup[0] as AvatarGroup;
					const ariaLabel = avatarGroup._ariaLabelText;
					const overflowButtonLabel = avatarGroup._overflowButtonAriaLabelText;
	
					expect(ariaLabel).to.include("Conjoined avatars");
					expect(ariaLabel).to.include("Activate for complete list");
					expect(ariaLabel).to.not.include("Press ARROW keys");
					
					expect(overflowButtonLabel).to.be.undefined;
				});
		});
	});
});