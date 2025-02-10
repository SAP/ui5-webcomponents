import { getAnimationMode } from "../../src/config/AnimationMode.js";

describe("Custom mount", () => {
	it("mount", () => {
		cy.mount(<button>Test</button>);

		cy.get("button")
			.should("exist")
			.and("have.text", "Test");
	});

	it("mount with configuration", () => {
		const configurationObject = { "animationMode": "basic" };

		cy.mount(<button>Test with configuration</button>, {
			ui5Configuration: configurationObject,
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

		cy.wrap({ getAnimationMode })
			.invoke("getAnimationMode")
			.should("equal", configurationObject.animationMode);
	});
});
