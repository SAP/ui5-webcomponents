import { html } from 'lit';
import "../../bundle.common.js";

describe("Custom mount", () => {
	it("mount", () => {
		cy.mount(html`<button>Test</button>`);

		cy.get("button")
			.should("exist")
			.and("have.text", "Test");
	});

	it("mount with configuration", () => {
		const configurationObject = { "animationMode": "basic" }

		cy.mount(html`<button>Test with configuration</button>`, {
			ui5Configuration: configurationObject
		});

		cy.get("button")
			.should("exist")
			.and("have.text", "Test with configuration");

		cy.get("script[data-ui5-config]")
			.should("exist")
			.then($el => {
				return $el.get(0).innerHTML;
			})
			.should("equal", JSON.stringify(configurationObject));

		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getAnimationMode")
			.should("equal", configurationObject.animationMode);
	});
})