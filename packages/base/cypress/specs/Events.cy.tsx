import EventsConsumer from "../../test/test-elements/Events.js";
import type { Events } from "../../test/test-elements/Events.js";

describe("Event provider attaches and detaches listeners properly", () => {
	it("Tests that attaching camelCase and kebab-case events in templates works", () => {
		cy.mount(<EventsConsumer></EventsConsumer>);
		cy.get<EventsConsumer>("[ui5-test-events-consumer]")
			.as("eventsConsumer");

		cy.get("@eventsConsumer")
			.shadow()
			.find("[ui5-test-events]")
			.then(elements => {
				(elements[0] as Events).fireKebaCaseEvent();
			});
		cy.get("@eventsConsumer")
			.should("have.prop", "kebabCaseFired", true);

		cy.get("@eventsConsumer")
			.shadow()
			.find("[ui5-test-events]")
			.then(elements => {
				(elements[0] as Events).fireCamelCaseEvent();
			});
		cy.get("@eventsConsumer")
			.should("have.prop", "camelCaseFired", true);
	});
});
