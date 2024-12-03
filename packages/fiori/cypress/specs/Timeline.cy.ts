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
						status="Positive"
						accessible-description="Compilation succeeded."
					>
						Compilation succeeded.
					</ui5-timeline-item>
					<ui5-timeline-item
						id="item2"
						title="Lint"
						subtitle="Testing suite B"
						icon="sap-icon://message-information"
						name="Testing suite B"
						status="Information"
						accessible-description="Lint completed with minor issues."
					>
						Lint completed with minor issues.
					</ui5-timeline-item>
				</ui5-timeline-group-item>
				<ui5-timeline-group-item group-name="Test">
					<ui5-timeline-item
						id="item3"
						title="Unit Test"
						subtitle="Testing suite C"
						icon="sap-icon://decline"
						name="Testing suite C"
						status="Negative"
						accessible-description="Unit tests failed."
					>
						Unit tests failed.
					</ui5-timeline-item>
					<ui5-timeline-item
						id="item4"
						title="Integration Test"
						subtitle="Testing suite D"
						icon="sap-icon://message-warning"
						name="Testing suite D"
						status="Critical"
						accessible-description="Integration tests have warnings."
					>
						Integration tests have warnings.
					</ui5-timeline-item>
					<ui5-timeline-item
						id="item5"
						title="E2E Test"
						subtitle="Testing suite E"
						icon="sap-icon://accept"
						name="Testing suite E"
						status="Positive"
						accessible-description="End-to-end tests passed."
					>
						End-to-end tests passed.
					</ui5-timeline-item>
				</ui5-timeline-group-item>
			</ui5-timeline>
		`);

		cy.get("#test-timeline").as("timeline");
	});

	it("setting accessible-description is applied to the focusable element", () => {
		cy.get("ui5-timeline-item[accessible-description]").each($item => {
			cy.wrap($item)
				.shadow()
				.find(".ui5-tli-bubble")
				.should("have.attr", "aria-description");
		});
	});
});
