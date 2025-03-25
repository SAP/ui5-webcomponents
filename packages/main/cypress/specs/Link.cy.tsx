import Link from "../../src/Link.js";

describe("General API", () => {
	it("render initially", () => {
		cy.mount(<Link></Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("exist");
	});

	it("tests rel attribute", () => {
		cy.mount(<Link href="https://www.sap.com" target="_blank"></Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "rel", "noreferrer noopener");
	});

	it("should wrap the text of the link", () => {
		cy.mount(
			<>
				<Link style="width: 100px" id="wrapping-link">Eu enim consectetur do amet elit Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
				<Link style="width: 100px" id="non-wrapping-link" wrapping-type="None">Eu enim consectetur do amet elit Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
			</>
		);

		cy.get("#wrapping-link")
			.shadow()
			.find(".ui5-link-root")
			.should($root => {
				const clientHeight = $root[0].clientHeight;
				expect(clientHeight).to.be.greaterThan(16);
			});

		cy.get("#non-wrapping-link")
			.shadow()
			.find(".ui5-link-root")
			.should($root => {
				const clientHeight = $root[0].clientHeight;
				expect(clientHeight).to.be.eq(16);
			});
	});

	it("clicking the link works", () => {
		cy.mount(<Link href="#testClick">Click me</Link>);

		cy.url()
			.should("not.include", "#testClick");

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("include", "#testClick");
	});

	it("should prevent clicking on disabled link", () => {
		cy.mount(<Link href="#testDisabled" disabled>Click me</Link>);

		cy.url()
			.should("not.include", "#testDisabled");

		cy.get("[ui5-link]")
			.realClick();

		cy.url().should("not.include", "#testDisabled");
	});

	it("disabled link should not be enabled", () => {
		cy.mount(<Link disabled>Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-disabled", "true");
	});

	it("tests prevent default", () => {
		cy.mount(<Link href="#testPreventDefault">Click me</Link>);

		cy.url()
			.should("not.include", "#testPreventDefault");

		cy.get("[ui5-link]")
			.then($link => {
				$link.get(0).addEventListener("click", event => {
					event.preventDefault();
				});
			});

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("not.include", "#testPreventDefault");
	});

	it("link renders aria-expanded attribute", () => {
		cy.mount(<Link href="#">Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.as("innerLink");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"expanded": true,
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-expanded", "true");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"expanded": false,
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-expanded", "false");
	});

	it("link renders proper aria-haspopup attribute", () => {
		cy.mount(<Link>Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.as("innerLink");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"hasPopup": "dialog",
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("setting accessible-name applied on the host element is reflected on the anchor tag", () => {
		cy.mount(<Link accessible-name="more info" tooltip="my tooltip">Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", "more info");

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "title", "my tooltip");
	});

	it("passes special keys pressed while item clicked", () => {
		cy.mount(<Link>Link</Link>);

		cy.get("[ui5-link]")
			.then($link => {
				$link[0].addEventListener("click", cy.stub().as("clickHandler"));
			});

		// CTRL Key
		cy.get("[ui5-link]")
			.realClick({ ctrlKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { ctrlKey: true } });

		// META Key
		cy.get("[ui5-link]")
			.realClick({ metaKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { metaKey: true } });

		// ALT Key
		cy.get("[ui5-link]")
			.realClick({ altKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { altKey: true } });

		// SHIFT Key
		cy.get("[ui5-link]").realClick({ shiftKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { shiftKey: true } });
	});

	it("links have icons", () => {
		cy.mount(
			<>
				<Link id="linkWithIcon" icon="employee">View employee profile</Link>
				<Link id="linkWithEndIcon" end-icon="cloud">Weather today</Link>
			</>
		);
		cy.get("#linkWithIcon")
			.shadow()
			.find("[ui5-icon]")
			.should("exist");

		cy.get("#linkWithEndIcon")
			.shadow()
			.find("[ui5-icon]")
			.should("exist");
	});
});
