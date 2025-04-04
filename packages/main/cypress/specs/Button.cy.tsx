import Avatar from "../../src/Avatar.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import ButtonBadge from "../../src/ButtonBadge.js";
import download from "@ui5/webcomponents-icons/dist/download.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

describe("Button general interaction", () => {
	it("tests button's text rendering", () => {
		cy.mount(<Button icon={download} design="Negative">Action Bar Button</Button>);

		cy.get<Button>("[ui5-button]")
			.shadow()
			.find(".ui5-button-text>bdi>slot")
			.should("have.length", 1, "Button text is not rendered");
	});

	it("tests button's icon rendering", () => {
		cy.mount(<Button icon={download} design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "add");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-icon")
			.should("exist", "icon is present");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-icon")
			.should("not.exist", "icon is not present");
	});

	it("tests button's endIon rendering", () => {
		cy.mount(<Button>Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($button => {
				$button.attr("end-icon", "add");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-end-icon")
			.should("exist", "endIon is present");

		cy.get("@button")
			.then($button => {
				$button.attr("end-icon", "");
			});

		cy.get("@button")
			.shadow()
			.find(".ui5-button-end-icon")
			.should("not.exist", "endIon is not present");
	});

	it("tests click event", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@button")
			.realClick();

		cy.realPress("Space");

		cy.realPress("Enter");

		cy.get("@clicked")
			.should("have.been.calledThrice");
	});

	it("tests keyboard shortcuts used to prevent a click event", () => {
		cy.mount(<Button>Text</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.realClick();

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.realPress(["Space", "Shift"]);
		cy.realPress(["Space", "Escape"]);

		cy.get("@clicked")
			.should("not.been.called");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(<Button icon="home"></Button>);

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(<Button icon="text"> </Button>);

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only");
	});

	it("tests button's slot rendering", () => {
		cy.mount(
			<Button>
				<Avatar id="btnImage" size="XS">
					<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
				</Avatar>
			</Button>
		);
		cy.get("[ui5-button]")
			.should("be.visible", "Btn image is rendered");
	});

	it("tests clicking on disabled button", () => {
		cy.mount(<Button disabled>Inactive</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		// don't test space and enter, as wdio always fires a click but the browser not.
		// await button.keys("Space");
		// await button.keys("Enter");
		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called");

		cy.get("@button")
			.shadow()
			.find("button")
			.as("nativeButton");

		cy.get("@nativeButton")
			.should("have.attr", "disabled");

		cy.get("@nativeButton")
			.should("not.have.attr", "tabindex");
	});

	it("tests clicking on disabled button with Icon", () => {
		cy.mount(<Button icon={employee} disabled></Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("@button")
			.scrollIntoView();

		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("be.visible")
			.realClick();

		cy.get("@clicked")
			.should("not.called");
	});

	it("tests button with text icon role", () => {
		cy.mount(<Button design="Attention" icon="message-warning">Warning</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "mode", "Decorative");
	});
});

describe("Accessibility", () => {
	it("setting tooltip on the host is reflected on the button tag", () => {
		cy.mount(<Button icon="message-information" tooltip="Go home"></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Go home");
	});

	it("tooltip from inner icon is propagated", () => {
		cy.mount(<Button icon="download" accessibleName="Download application"></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Download");
	});

	it("aria-expanded is properly applied on the button tag", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "true",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "true");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "false",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "false");
	});

	it("setting accessible-role on the host is reflected on the button tag", () => {
		cy.mount(<Button accessibleRole="Link"> Navigation Button </Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "link");
	});

	it("not setting accessible-role on the host keeps the correct role on the button tag", () => {
		cy.mount(<Button icon="home" design="Emphasized">Action Bar Button</Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "button");
	});

	it("aria-describedby properly applied on the button tag", () => {
		const hiddenTextTypeId = "ui5-button-hiddenText-type";
		cy.mount(<Button design="Attention">Content</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-description", "Warning");

		cy.get("@button")
			.shadow()
			.find(`span[id="${hiddenTextTypeId}"]`)
			.should("exist");
	});

	it("accessibleDescription in combination with design property applied on the button tag", () => {
		cy.mount(<Button design="Negative" accessibleDescription="Decline">Content</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-description", "Negative Action Decline");
	});

	it("setting accessible-name-ref on the host is reflected on the button tag", () => {
		cy.mount(
			<>
				<Button icon="download" accessibleName="Help me" accessibleNameRef="1download-text"></Button>
				<Label id="1download-text">Download Application</Label>
			</>
		);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", "Download Application");
	});

	it("aria-haspopup and aria-controls are properly applied on the button tag", () => {
		cy.mount(<Button>Show Registration Dialog</Button>);

		cy.get("[ui5-button]")
			.as("button");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					hasPopup: "dialog",
					controls: "registration-dialog",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-controls", "registration-dialog");
	});

	it("setting accessible-description is applied to button tag", () => {
		cy.mount(<Button accessibleDescription="A long description."></Button>);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-description", "A long description.");
	});

	it("button with a badge", () => {
		cy.mount(
			<Button design="Emphasized" icon={employee}>Emphasized
				<ButtonBadge design="OverlayText" text="999+" slot="badge"></ButtonBadge>
			</Button>
		);

		cy.get("[ui5-button]")
			.find("ui5-button-badge")
			.as("badge");

		cy.get("@badge")
			.shadow()
			.find("ui5-tag")
			.as("tag");

		cy.get("@tag")
			.should("have.attr", "design", "Critical");

		cy.get("@tag")
			.should("have.text", "999+");
	});
});

ui5AccDescribe("Automated accessibility tests", () => {
	it("Icon only", () => {
		cy.mount(<Button icon="message-information"></Button>);

		cy.ui5CheckA11y();
	})
});