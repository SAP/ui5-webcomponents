import { html } from "lit";
import "../../src/Card.js";
import "../../src/CardHeader.js";

const interactiveCardHeader = html` <ui5-card>
	<ui5-card-header
        id="cardHeader1"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick links sub title"
		interactive
	>
	</ui5-card-header>
</ui5-card>`;

const cardHeader = html` <ui5-card>
	<ui5-card-header
        id="cardHeader2"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick links sub title"
	>
	</ui5-card-header>
</ui5-card>`;

const card = html`<ui5-card id="card" class="myCard">
	<ui5-card-header
		id="cardHeader"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick links sub title"
		interactive>
	</ui5-card-header>

	<ui5-list id="myList3" separators="Inner">
		<ui5-li icon="horizontal-bullet-chart">Template Based Segmentation</ui5-li>
		<ui5-li icon="opportunity">Segmentation Models</ui5-li>
		<ui5-li icon="line-charts">Marketing plans</ui5-li>
	</ui5-list>

	<ui5-input id="field" value="0" class="myInput"></ui5-input>
</ui5-card>`;

const card2 = html`<ui5-card id="card2" class="myCard">
	<ui5-card-header
		id="cardHeader2"
		slot="header"
		additional-text="4 of 10"
		title-text="Quick Links"
		subtitle-text="Quick Links">
		<ui5-icon name="group" slot="avatar"></ui5-icon>
	</ui5-card-header>

	<ui5-list id="myList3" separators="None">
		<ui5-li icon="horizontal-bullet-chart">Template Based Segmentation</ui5-li>
		<ui5-li icon="opportunity">Segmentation Models</ui5-li>
	</ui5-list>
</ui5-card>`;

describe("Card general interaction", () => {
	it("Tests initial rendering", () => {
		cy.mount(card);

		// assert
		cy.get("#card").should("exist");
	});

	it("Tests additionalText is rendered, when action is set", () => {
		cy.mount(html`
			<ui5-card class="myCard" id="actionCard">
				<ui5-card-header
					id="actionCardHeader"
					slot="header"
					title-text="Linked Activities (5)"
					additional-text="4 of 10">
					<ui5-button icon="add" slot="action" design="Transparent">Add activity</ui5-button>
				</ui5-card-header>

				<ui5-list id="myList3" separators="Inner">
					<ui5-li icon="horizontal-bullet-chart">Increase customer satisfaction by 10% using marketing methods</ui5-li>
					<ui5-li icon="opportunity">Get 1000 survey responses to annual employee survey</ui5-li>
				</ui5-list>
			</ui5-card>
		`);

		// assert
		cy.get("#actionCardHeader")
			.shadow()
			.find(".ui5-card-header-additionalText")
			.should("exist");
	});

	it("Tests interactive header results in interactive class on the card", () => {
		cy.mount(html`<div>${card}${card2}</div>`);

		// assert
		cy.get("#cardHeader")
			.should("have.prop", "interactive", true);
		cy.get("#card")
			.shadow()
			.find(".ui5-card-root")
			.should("have.class", "ui5-card--interactive");

		cy.get("#cardHeader2")
			.should("have.prop", "interactive", false);
		cy.get("#card2")
			.shadow()
			.find(".ui5-card-root")
			.should("not.have.class", "ui5-card--interactive");
	});

	it("Tests header's click event with mouse click, Enter and Space", () => {
		cy.mount(html`<div>${card}${card2}</div>`);

		// interactive header
		cy.get("#cardHeader")
			.then($header => {
				$header.get(0).addEventListener("click", cy.stub().as("headerClick"));
			});

		cy.get("#cardHeader")
			.shadow()
			.find(".ui5-card-header")
			.realClick();
		cy.realPress("Space");
		cy.realPress("Enter");

		cy.get("@headerClick")
			.should("have.been.calledThrice");

		// non-interactive header
		cy.get("#cardHeader2")
			.then($header => {
				$header.get(0).addEventListener("click", cy.stub().as("headerClick2"));
			});

		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header")
			.realClick();
		cy.realPress("Space");
		cy.realPress("Enter");

		cy.get("@headerClick2")
			.should("not.have.been.called");
	});

	it("Tests clicking on an action does not fire header's click event", () => {
		cy.mount(html`
			<ui5-card id="card3">
				<ui5-card-header
					id="cardHeader3"
					slot="header"
					title-text="Quick Links"
					subtitle-text="Quick Links"
					interactive>
					<ui5-button id="actionBtn" slot="action">Act</ui5-button>
				</ui5-card-header>

				<ui5-list id="myList3" separators="Inner">
					<ui5-li icon="horizontal-bullet-chart">Template Based Segmentation</ui5-li>
					<ui5-li icon="opportunity">Segmentation Models</ui5-li>
				</ui5-list>
			</ui5-card>
		`);

		cy.get("#cardHeader3").then($header => {
			$header.get(0).addEventListener("ui5-click", cy.stub().as("headerClick"));
		});

		cy.get("#actionBtn").realClick();

		// assert
		cy.get("@headerClick").should("not.have.been.called");
	});

	it("Tests loading", () => {
		cy.mount(html`
			<ui5-card
				id="loadingCard"
				loading
				loading-delay="500"
				accessible-name="My Card">
				<ui5-card-header
					id="loadingCardHeader"
					slot="header"
					interactive
					title-text="Interactive Header">
					<ui5-button slot="action">Header Button</ui5-button>
				</ui5-card-header>
				<div class="myContent">
					<ui5-button>Content Button</ui5-button>
				</div>
			</ui5-card>
		`);

		cy.get("#loadingCard")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("have.attr", "delay", "500")
			.and("have.attr", "active");
	});
});

describe("Card header", () => {
	it("Tests that aria attribute are correct on interactive header", () => {
		cy.mount(interactiveCardHeader);

		// assert
		cy.get("#cardHeader1")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "button")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Interactive Card Header");
	});

	it("Tests that aria attribute are correct on a header", () => {
		cy.mount(cardHeader);

		// assert
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header-focusable-element")
			.should("have.attr", "role", "group")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-roledescription", "Card Header");
	});
});

describe("Card Accessibility", () => {
	it("Tests accessibleName", () => {
		cy.mount(html`
			<ui5-card id="textCard" accessible-name="Internships">
				<ui5-card-header
					slot="header"
					id="header4"
					title-text="New Internships">
				</ui5-card-header>
			</ui5-card>
		`);

		// assert
		cy.get("#textCard")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card Internships");
	});

	it("Tests accessibleNameRef", () => {
		cy.mount(html`
			<ui5-card id="textCardRef" accessible-name="Internships" accessible-name-ref="cont">
				<ui5-card-header
					id="header5"
					slot="header"
					title-text="New Positions">
				</ui5-card-header>
				<div id="cont" class="myContent">I am the content</div>
			</ui5-card>
		`);

		// assert
		cy.get("#textCardRef")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card I am the content");
	});

	it("Tests aria-label", () => {
		cy.mount(html`
			<ui5-card id="textAreaAriaLabel" class="myCard">
				<ui5-card-header
					slot="header"
					id="header"
					additional-text="4 of 10"
					title-text="Linked Activities (5)"
					subtitle-text="Quick Links">
				</ui5-card-header>
			</ui5-card>
		`);

		// assert
		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-card-root")
			.should("have.attr", "aria-label", "Card");
	});

	it("Tests ARIA attributes of the content", () => {
		cy.mount(card);

		// assert
		cy.get("#card")
			.shadow()
			.find(".ui5-card-root div:nth-child(2)")
			.should("have.attr", "role", "group")
			.and("have.attr", "aria-label", "Card Content");
	});

	it("Tests aria-level property", () => {
		cy.mount(card2);

		// assert
		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header .ui5-card-header-title")
			.should("have.attr", "aria-level", "3");

		cy.get("#cardHeader2")
			.shadow()
			.find(".ui5-card-header .ui5-card-header-title")
			.invoke("attr", "aria-level", "4")
			.should("have.attr", "aria-level", "4");
	});
});
