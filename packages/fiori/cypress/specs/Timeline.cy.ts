import { html } from "lit";
import "../../src/Timeline.js";
import "../../src/TimelineItem.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";

describe("Accessibility", () => {
	beforeEach(() => {
		cy.mount(html`
			<ui5-timeline id="test-timeline">
				<ui5-timeline-group-item group-name="Build">
					<ui5-timeline-item
						id="item1"
						title="Compile"
						subtitle="Testing suite A"
						icon="sap-icon://accept"
						name="Testing suite A"
						state="Positive"
					>
						Compilation succeeded.
					</ui5-timeline-item>
					<ui5-timeline-item
						id="item2"
						title="Lint"
						subtitle="Testing suite B"
						icon="sap-icon://message-information"
						name="Testing suite B"
					>
						Lint completed with minor issues.
					</ui5-timeline-item>
				</ui5-timeline-group-item>
			</ui5-timeline>
		`);

		cy.get("#test-timeline").as("timeline");
	});

	it("item with state attribute has aria-description, item without state does not", () => {
		cy.get(`ui5-timeline-item[state="Positive"]`).each($itemWithState => {
			cy.wrap($itemWithState)
				.shadow()
				.find(".ui5-tli-bubble")
				.should("have.attr", "aria-description");
		});

		cy.get(`ui5-timeline-item:not([state="Positive"])`).each($itemWithoutState => {
			cy.wrap($itemWithoutState)
				.shadow()
				.find(".ui5-tli-bubble")
				.should("not.have.attr", "aria-description");
		});
	});
});
