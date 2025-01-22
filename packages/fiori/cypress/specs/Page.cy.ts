import { html } from "lit-html";
import "../../src/Page.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";

describe("Page general interaction", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-page style="height: 300px;" show-footer>
				<ui5-bar slot="header">
					<ui5-button slot="startContent">Header button</ui5-button>
				</ui5-bar>

				<div id="content">
					Test content
				</div>
				<ui5-bar slot="footer">
					<ui5-button slot="endContent">Footer button</ui5-button>
				</ui5-bar>
			</ui5-page>
		`);
	});

	it("tests initial rendering", () => {
		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-header-root")
			.should("exist");

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-content-root")
			.should("exist");

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("exist");
	});

	it("tests footer visibility", () => {
		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("be.visible");

		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", true);

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("not.be.visible");

		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", false);
	});

	it("tests animation off footer toggling", () => {
		setAnimationMode(AnimationMode.None);

		cy.get("[ui5-page] [slot='footer']")
			.as("footer");

		cy.get("@footer")
			.should("be.visible");

		// toggle hideFooter
		cy.get("[ui5-page]")
			.invoke("prop", "hideFooter", true);

		cy.get("[ui5-page]")
			.shadow()
			.find(".ui5-page-footer-root")
			.should("not.be.visible");

		setAnimationMode(AnimationMode.Full);
	});

	it("createElement does not throw exception", () => {
		cy.document().then(doc => {
			doc.createElement("ui5-page");
		});
	});
});
