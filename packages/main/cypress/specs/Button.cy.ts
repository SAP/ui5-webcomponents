import { html } from "lit";
import "../../src/Button.js";
import type Button from "../../src/Button.js";
import "@ui5/webcomponents-icons/dist/download.js";
import "@ui5/webcomponents-icons/dist/employee.js";

describe("Button general interaction", () => {
	it("tests button's text rendering", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`);

		cy.get<Button>("[ui5-button]")
			.shadow()
			.find(".ui5-button-text>bdi>slot")
			.should("have.length", 1, "Button text is not rendered");
	});

	it("tests button's icon rendering", () => {
		cy.mount(html`<ui5-button>Action Bar Button</ui5-button>`);

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
		cy.mount(html`<ui5-button>Action Bar Button</ui5-button>`);

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
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`);

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
		cy.mount(html`<ui5-button>Text</ui5-button>`);

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

	it("aria-expanded is properly applied on the button tag", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`);

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
			.invoke("attr", "aria-expanded")
			.should("be.equal", "true");

		cy.get<Button>("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "false",
				};
			});

		cy.get("@button")
			.shadow()
			.find("button")
			.invoke("attr", "aria-expanded")
			.should("be.equal", "false");
	});

	it("not setting accessible-role on the host keeps the correct role on the button tag", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.invoke("attr", "role")
			.should("be.equal", "button");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(html`<ui5-button icon="home"><!----><!----></ui5-button>`);

		cy.get("[ui5-button]")
			.invoke("attr", "icon-only")
			.should("exist");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(html`<ui5-button icon="text"> </ui5-button>`);

		cy.get("[ui5-button]")
			.invoke("attr", "icon-only")
			.should("exist");
	});

	it("tests button's slot rendering", () => {
		cy.mount(html`
	<ui5-button>
		<ui5-avatar id="btnImage" size="XS">
			<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
		</ui5-avatar>
	</ui5-button>`);
		cy.get("[ui5-button]")
			.should("be.visible", "Btn image is rendered");
	});

	it("tests clicking on disabled button", () => {
		cy.mount(html`<ui5-button disabled>Inactive</ui5-button>`);

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
		cy.mount(html`<ui5-button icon="employee" disabled></ui5-button>`);

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
		cy.mount(html`<ui5-button design="Attention" icon="message-warning">Warning</ui5-button>`);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.invoke("attr", "mode")
			.should("be.equal", "Decorative");
	});

	it("aria-describedby properly applied on the button tag", () => {
		const hiddenTextTypeId = "ui5-button-hiddenText-type";

		cy.mount(html`<ui5-button design="Attention">Content</ui5-button>`);

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("button")
			.invoke("attr", "aria-describedby")
			.should("be.equal", hiddenTextTypeId);

		cy.get("@button")
			.shadow()
			.find(`span[id="${hiddenTextTypeId}"]`)
			.should("exist");
	});

	it("setting accessible-name-ref on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button icon="download" accessible-name="Help me" accessible-name-ref="1download-text"></ui5-button>
		<ui5-label id="1download-text">Download Application</ui5-label>`);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.invoke("attr", "aria-label")
			.should("be.equal", "Download Application");
	});

	it("aria-haspopup and aria-controls are properly applied on the button tag", () => {
		cy.mount(html`<ui5-button>Show Registration Dialog</ui5-button>`);

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
			.invoke("attr", "aria-haspopup")
			.should("be.equal", "dialog");

		cy.get("@button")
			.shadow()
			.find("button")
			.invoke("attr", "aria-controls")
			.should("be.equal", "registration-dialog");
	});

	it("setting tooltip on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button icon="message-information" tooltip="Go home"></ui5-button>`);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.invoke("attr", "title")
			.should("be.equal", "Go home");
	});

	it("tooltip from inner icon is propagated", () => {
		cy.mount(html`<ui5-button icon="download" accessible-name="Download application"></ui5-button>`);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.invoke("attr", "title")
			.should("be.equal", "Download");
	});

	it("setting accessible-role on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button accessible-role="Link"> Navigation Button </ui5-button>`);

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.invoke("attr", "role")
			.should("be.equal", "link");
	});
});
