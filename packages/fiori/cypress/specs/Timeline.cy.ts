import { html } from "lit";
import type Timeline from "../../src/Timeline.js";
import "../../src/Timeline.js";
import "../../src/TimelineItem.js";
import "../../src/TimelineGroupItem.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";

const sample = html`
<ui5-timeline layout="Vertical" accessible-name="vertical" id="timelineAccName">
	<ui5-timeline-item title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="Stanislava Baltova" name-clickable></ui5-timeline-item>
	<ui5-timeline-item title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="Stanislava Baltova"></ui5-timeline-item>
	<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.08.2017 (11:00 - 12:00)" icon="calendar">
		<ui5-label>MR SOF02 2.43</ui5-label>
	</ui5-timeline-item>
	<ui5-timeline-item id="testTimelineItem" title-text="Video Conference Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar" name="Stanislava Baltova">
		Online meeting
	</ui5-timeline-item>
	<ui5-timeline-item title-text="Video Conference Call - UI5" subtitle-text="31.01.2018 (13:30 - 14:00)" icon="calendar"><ui5-avatar initials="SK"></ui5-avatar></ui5-timeline-item>
</ui5-timeline>
`;

const sampleWithSingleItem = html`
<ui5-timeline layout="Vertical" id="testTimeline">
	<ui5-timeline-item id="testTimelineItem" title-text="Video Conference Call - UI5" subtitle-text="31.01.2018 (13:30 - 14:00)" icon="calendar"><ui5-avatar initials="SK"></ui5-avatar></ui5-timeline-item>
</ui5-timeline>
`;

const groupSample = html`
<ui5-timeline id="verticalWithGroups">
				<ui5-timeline-group-item group-name="Events">
					<ui5-timeline-item id="testItem1" class="group-item" title-text="Event" subtitle-text="20.02.2017 11:30" icon="calendar" name="SAP Talk">Morning event</ui5-timeline-item>
					<ui5-timeline-item id="testItem2" class="group-item" title-text="Event" subtitle-text="20.02.2017 11:30" icon="calendar" name="SAP Talk">
						<ui5-avatar initials="SK"></ui5-avatar>
						<ui5-label>Good morning</ui5-label>
					</ui5-timeline-item>
					<ui5-timeline-item id="testItem3" class="group-item" title-text="Event" subtitle-text="20.02.2017 11:30" icon="calendar" name="SAP D-com"><ui5-avatar initials="SK"></ui5-avatar></ui5-timeline-item>
					<ui5-timeline-item id="testItem4" class="group-item" title-text="Event" subtitle-text="20.02.2017 11:30" name="SAP iXP Party">20.02.2017 11:30</ui5-timeline-item>
				</ui5-timeline-group-item>
				<ui5-timeline-group-item group-name="Meetings">
					<ui5-timeline-item id="testItem5" class="group-item" title-text="coming up" subtitle-text="20.02.2017 11:30" icon="calendar" name="Team Balkan Meeting"></ui5-timeline-item>
					<ui5-timeline-item id="testItem6" class="group-item" title-text="coming up" subtitle-text="20.02.2017 11:30"  name="Team Balkan Meeting">20.02.2017 11:30</ui5-timeline-item>
					<ui5-timeline-item id="testItem7" class="group-item" title-text="coming up" subtitle-text="20.02.2017 11:30" icon="calendar" name="Team Balkan Meeting"><ui5-avatar initials="SK"></ui5-avatar></ui5-timeline-item>
				</ui5-timeline-group-item>
				<ui5-timeline-group-item>
					<ui5-timeline-item id="testItem8" class="group-item" title-text="called" subtitle-text="20.02.2017 11:30 11:30" icon="calendar" name="Stanislava Baltova" name-clickable></ui5-timeline-item>
				</ui5-timeline-group-item>
				<ui5-timeline-group-item group-name="Calls">
					<ui5-timeline-item id="testItem9" class="group-item" title-text="made group call" subtitle-text="20.02.2017 11:30" icon="calendar" name="Stoyan Kralimarkov" name-clickable></ui5-timeline-item>
					<ui5-timeline-item id="testItem10" class="group-item" title-text="made group call" subtitle-text="20.02.2017 11:30" name="Stoyan Kralimarkov" name-clickable></ui5-timeline-item>
					<ui5-timeline-item id="testItem11" class="group-item" title-text="made group call" subtitle-text="20.02.2017 11:30" icon="calendar" name="Stoyan Kralimarkov" name-clickable></ui5-timeline-item>
				</ui5-timeline-group-item>
			</ui5-timeline>
`;

describe("Timeline general interaction", () => {
	it("should fire name-click event on a normal item name", () => {
		cy.mount(sample);

		cy.get("[ui5-timeline]")
			.as("timeline")
			.then($item => {
				$item.get(0).addEventListener("name-click", cy.stub().as("clicked"));
			});

		cy.get("ui5-timeline-item")
			.shadow()
			.find("ui5-link")
			.click();

		cy.get("@clicked").should("have.been.calledOnce");
	});

	it("setting accessible-name applied on the host element is reflected on the ul tag", () => {
		cy.mount(sample);
		cy.get("[ui5-timeline]")
			.shadow()
			.find("ul")
			.should("have.attr", "aria-label", "Timeline vertical");
	});

	it("Item within Timeline Item is rendered", () => {
		cy.mount(sampleWithSingleItem);
		cy.get("[ui5-timeline]")
			.find("#testTimelineItem")
			.shadow()
			.find(".ui5-tli-bubble")
			.find(".ui5-tli-desc")
			.should("exist");
	});
});

describe("Timeline with group items interactions", () => {
	it("Group items are rendered", () => {
		cy.mount(groupSample);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("groupItem");

		cy.get("@groupItem")
			.eq(0)
			.find("ui5-timeline-item")
			.should("have.length", 4);
	});

	it("Group items are collapsed on button click", () => {
		cy.mount(groupSample);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("currentGroup");

		cy.get("@currentGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.as("currentGroupButton");

		cy.get("@currentGroupButton")
			.realClick();

		cy.realPress("Tab");

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Meetings']")
			.as("nextGroup");

		cy.get("@nextGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.should("be.focused");
	});

	it("Group items are navigable", () => {
		cy.mount(groupSample);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.eq(0)
			.as("currentGroup");

		cy.realPress("Tab");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowUp");

		cy.get("@currentGroup")
			.find("ui5-timeline-item")
			.eq(1)
			.should("be.focused");
	});

	it("Group can be collapsed/expanded using keyboard", () => {
		cy.mount(groupSample);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("currentGroup");

		cy.get("@currentGroup")
			.eq(0)
			.shadow()
			.find("[ui5-toggle-button]")
			.as("currentGroupButton");

		cy.get("@currentGroupButton")
			.realClick();

		cy.realPress("Enter");

		cy.get("@currentGroup")
			.eq(0)
			.should("not.have.attr", "collapsed");

		cy.realPress("Space");

		cy.get("@currentGroup")
			.eq(0)
			.should("have.attr", "collapsed");
	});
});

describe("Timeline with growing mode", () => {
	it("tests 'loadMore' event fired upon infinite scroll", () => { // 8
		cy.mount(html`
			<div id="scroll-container" style="height: 200px; overflow: scroll;">
				<ui5-timeline growing="Scroll">
					<ui5-timeline-item title-text="first item" subtitle-text="20.02.2017 11:30" ></ui5-timeline-item>
					<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30"></ui5-timeline-item>
					<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30" ></ui5-timeline-item>
					<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30" ></ui5-timeline-item>
					<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30"></ui5-timeline-item>
				</ui5-timeline>
			</div>`);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get<Timeline>("@timeline")
			.then(timeline => {
				timeline.get(0).addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		cy.get("#scroll-container")
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(html`
			<ui5-timeline growing="Button">
				<ui5-timeline-item title-text="first item" subtitle-text="20.02.2017 11:30" ></ui5-timeline-item>
				<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30"></ui5-timeline-item>
				<ui5-timeline-item title-text="coming up" subtitle-text="20.02.2017 11:30" ></ui5-timeline-item>
			</ui5-timeline>
		`);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.find("ui5-timeline-item")
			.last()
			.click();

		cy.get("@timeline")
			.find("ui5-timeline-item")
			.last()
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@timeline")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("@timeline")
			.find("ui5-timeline-item")
			.first()
			.should("be.focused");
	});
});


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
