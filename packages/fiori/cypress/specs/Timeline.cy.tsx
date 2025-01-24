import TimelineItem from "../../src/TimelineItem.js";
import TimelineGroupItem from "../../src/TimelineGroupItem.js";
import accept from "@ui5/webcomponents-icons/dist/accept.js";
import messageInformation from "@ui5/webcomponents-icons/dist/message-information.js";
import Timeline from "../../src/Timeline.js";

describe("Accessibility", () => {
	beforeEach(() => {
		cy.mount(
			<Timeline id="test-timeline">
				<TimelineGroupItem group-name="Build">
					<TimelineItem
						id="item1"
						title="Compile"
						// subtitle="Testing suite A"
						subtitleText="Testing suite A"
						icon={accept}
						name="Testing suite A"
						state="Positive"
					>
						Compilation succeeded.
					</TimelineItem>
					<TimelineItem
						id="item2"
						title="Lint"
						// subtitle="Testing suite B"
						subtitleText="Testing suite B"
						icon={messageInformation}
						name="Testing suite B"
					>
						Lint completed with minor issues.
					</TimelineItem>
				</TimelineGroupItem>
			</Timeline>
		);

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
