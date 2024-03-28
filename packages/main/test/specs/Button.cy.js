import { html } from 'lit';
// import "../../src/bundle.esm.ts";

describe("Button general interaction", () => {
	it("tests button's text rendering", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`)

		cy.get("[ui5-button]")
			.shadow()
			.find(".ui5-button-text>bdi>slot")
			.should("have.length", 1, "Button text is not rendered");
	});

	it("tests button's icon rendering", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "add");
			});

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("exist", "icon is present");

		cy.get("@button")
			.then($button => {
				$button.attr("icon", "");
			});

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("not.exist", "icon is not present");
	});

	it("tests click event", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then((button) => {
				button.get(0).addEventListener('click', cy.stub().as('clicked'))
			})

		cy.get("@button")
			.realClick()

		cy.get("@button")
			.realPress("Space");

		cy.get("@button")
			.realPress("Enter");

		cy.get("@clicked")
			.should("have.been.calledThrice");
	});

	it("aria-expanded is properly applied on the button tag", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "true"
				}
			})

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "true", "Attribute is reflected");

		cy.get("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					expanded: "false"
				}
			})

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-expanded", "false", "Attribute is reflected");
	});

	it("not setting accessible-role on the host keeps the correct role on the button tag", () => {
		cy.mount(html`<ui5-button icon="home" design="Emphasized">Action Bar Button</ui5-button>`)

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "button", "Attribute is reflected");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(html`<ui5-button icon="home"><!----><!----></ui5-button>`)

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only", "", "Button comment has attribute icon-only");
	});

	it("tests button's icon only rendering", () => {
		cy.mount(html`<ui5-button icon="text"> </ui5-button>`)

		cy.get("[ui5-button]")
			.should("have.attr", "icon-only", "", "Button blank text has attribute icon-only")
	});

	it("tests button's slot rendering", () => {
		cy.mount(html`
	<ui5-button>
		<ui5-avatar id="btnImage" size="XS">
			<img src="https://sdk.openui5.org/test-resources/sap/f/images/Woman_avatar_01.png" />
		</ui5-avatar>
	</ui5-button>`)
		cy.get("[ui5-button]")
			.should("be.visible", "Btn image is rendered")
	});

	it("tests clicking on disabled button", () => {
		cy.mount(html`<ui5-button disabled>Inactive</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then((button) => {
				button.get(0).addEventListener('click', cy.stub().as('clicked'))
			})

		// don't test space and enter, as wdio always fires a click but the browser not.
		// await button.keys("Space");
		// await button.keys("Enter");
		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called")

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "disabled");
	});

	it("tests clicking on disabled button with Icon", () => {
		cy.mount(html`<ui5-button icon="employee" disabled></ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then((button) => {
				button.get(0).addEventListener('click', cy.stub().as('clicked'))
			})

		cy.get("@button")
			.scrollIntoView();

		cy.get("@button")
			.realClick();

		cy.get("@clicked")
			.should("not.called")

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("be.visible")
			.realClick();

		cy.get("@clicked")
			.should("not.called")
	});

	it("tests button with text icon role", () => {
		cy.mount(html`<ui5-button design="Attention" icon="message-warning">Warning</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "accessible-role", "presentation", "icon has proper role");
	});

	it("setting accessible-name-ref on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button icon="download" accessible-name="Help me" accessible-name-ref="1download-text"></ui5-button>
		<ui5-label id="1download-text">Download Application</ui5-label>`)

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "aria-label", "Download Application", "Attribute is reflected");
	});

	it("aria-haspopup and aria-controls are properly applied on the button tag", () => {
		cy.mount(html`<ui5-button>Show Registration Dialog</ui5-button>`)

		cy.get("[ui5-button]")
			.as("button");

		cy.get("@button")
			.then($el => {
				$el.get(0).accessibilityAttributes = {
					hasPopup: "dialog",
					controls: "registration-dialog",
				}
			})

		cy.get("@button")
			.shadow()
			.find("button")
			.should("have.attr", "aria-haspopup", "dialog", "Attribute is reflected")
			.and("have.attr", "aria-controls", "registration-dialog", "Attribute is reflected");
	});

	it("setting tooltip on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button icon="message-information" tooltip="Go home"></ui5-button>`)

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Go home", "Attribute is reflected");
	});

	it("tooltip from inner icon is propagated", () => {
		cy.mount(html`<ui5-button icon="download" accessible-name="Download application"></ui5-button>`)

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "title", "Download", "Icon tooltip is shown");
	});

	it("setting accessible-role on the host is reflected on the button tag", () => {
		cy.mount(html`<ui5-button accessible-role="Link"> Navigation Button </ui5-button>`)

		cy.get("[ui5-button]")
			.shadow()
			.find("button")
			.as("button");

		cy.get("@button")
			.should("have.attr", "role", "link", "Attribute is reflected");
	});
})