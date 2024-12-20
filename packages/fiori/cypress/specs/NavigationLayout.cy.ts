import { html } from "lit";
import "../../src/NavigationLayout.js";
import "../../src/SideNavigation.js";
import "../../src/SideNavigationGroup.js";
import "../../src/SideNavigationItem.js";
import "../../src/ShellBar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/menu.js";

const sampleCode = html`
<ui5-navigation-layout id="nl1">
	<ui5-shellbar
		slot="header"
		primary-title="UI5 Web Components"
	>
		<ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
	</ui5-shellbar>
	<ui5-side-navigation id="sn1" slot="sideContent">
		<!-- Items -->
		<ui5-side-navigation-item text="Home" href="#home" icon="home"></ui5-side-navigation-item>
		<ui5-side-navigation-group text="Group 1" expanded>
			<ui5-side-navigation-item text="Item 1" href="#item1"
									  icon="home"></ui5-side-navigation-item>
			<ui5-side-navigation-item text="Item 2" href="#item2"
									  icon="home"></ui5-side-navigation-item>
			<ui5-side-navigation-item text="Item 3" href="#item3"
									  icon="home"></ui5-side-navigation-item>
		</ui5-side-navigation-group>
		<!-- Fixed Items -->
		<ui5-side-navigation-item slot="fixedItems"
								  text="Legal"
								  href="https://www.sap.com/about/legal/impressum.html"
								  target="_blank"
								  icon="home"></ui5-side-navigation-item>
	</ui5-side-navigation>
	<div>
		Content
	</div>
</ui5-navigation-layout>`;

describe("Rendering and interaction", () => {
	beforeEach(() => {
		cy.mount(sampleCode);
	});

	it("tests initial rendering", () => {
		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-root")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-header")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-section")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-content")
			.should("exist");
	});

	it("tests collapsing", () => {
		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", false);

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Collapsed");

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", true);

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Expanded");

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", false);
	});
});

describe("Navigation Layout on Phone", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
		cy.mount(sampleCode);
	});

	it("tests initial rendering", () => {
		cy.get("[ui5-navigation-layout]")
			.should("have.prop", "sideCollapsed", true);

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", false);

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("not.be.visible");
	});

	it("tests collapsing", () => {
		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Expanded");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("be.visible");

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Collapsed");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("not.be.visible");
	});
});
