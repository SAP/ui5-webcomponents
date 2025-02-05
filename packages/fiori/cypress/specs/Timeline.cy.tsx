import Timeline from "../../src/Timeline.js";
import TimelineItem from "../../src/TimelineItem.js";
import TimelineGroupItem from "../../src/TimelineGroupItem.js";
import accept from "@ui5/webcomponents-icons/dist/accept.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import messageInformation from "@ui5/webcomponents-icons/dist/message-information.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";

function Sample() {
	return <Timeline layout="Vertical" accessibleName="vertical" id="timelineAccName">
		<TimelineItem titleText="called" subtitleText="20.02.2017 11:30" icon="phone" name="Stanislava Baltova" nameClickable={true}></TimelineItem>
		<TimelineItem titleText="called" subtitleText="20.02.2017 11:30" icon="phone" name="Stanislava Baltova"></TimelineItem>
		<TimelineItem titleText="Weekly Sync - CP Design" subtitleText="27.08.2017 (11:00 - 12:00)" icon={calendar}>
			<Label>MR SOF02 2.43</Label>
		</TimelineItem>
		<TimelineItem id="testTimelineItem" titleText="Video Conference Call - UI5" subtitleText="31.01.2018 (12:00 - 13:00)" icon={calendar} name="Stanislava Baltova">
			Online meeting
		</TimelineItem>
		<TimelineItem titleText="Video Conference Call - UI5" subtitleText="31.01.2018 (13:30 - 14:00)" icon={calendar}><Avatar initials="SK"></Avatar></TimelineItem>
	</Timeline>;
}

function SampleWithSingleItem() {
	return <Timeline layout="Vertical" id="testTimeline">
		<TimelineItem
			id="testTimelineItem"
			titleText="Video Conference Call - UI5"
			subtitleText="31.01.2018 (13:30 - 14:00)"
			icon={calendar}
		>
			<Avatar initials="SK"></Avatar>
		</TimelineItem>
	</Timeline>;
}

function GroupSample() {
	return <Timeline id="verticalWithGroups">
		<TimelineGroupItem groupName="Events">
			<TimelineItem id="testItem1" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP Talk">Morning event</TimelineItem>
			<TimelineItem id="testItem2" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP Talk">
				<Avatar initials="SK"></Avatar>
				<Label>Good morning</Label>
			</TimelineItem>
			<TimelineItem id="testItem3" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" icon={calendar} name="SAP D-com"><Avatar initials="SK"></Avatar></TimelineItem>
			<TimelineItem id="testItem4" class="group-item" titleText="Event" subtitleText="20.02.2017 11:30" name="SAP iXP Party">20.02.2017 11:30</TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem groupName="Meetings">
			<TimelineItem id="testItem5" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" icon={calendar} name="Team Balkan Meeting"></TimelineItem>
			<TimelineItem id="testItem6" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" name="Team Balkan Meeting">20.02.2017 11:30</TimelineItem>
			<TimelineItem id="testItem7" class="group-item" titleText="coming up" subtitleText="20.02.2017 11:30" icon={calendar} name="Team Balkan Meeting"><Avatar initials="SK"></Avatar></TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem>
			<TimelineItem id="testItem8" class="group-item" titleText="called" subtitleText="20.02.2017 11:30 11:30" icon={calendar} name="Stanislava Baltova" nameClickable={true}></TimelineItem>
		</TimelineGroupItem>

		<TimelineGroupItem groupName="Calls">
			<TimelineItem id="testItem9" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" icon={calendar} name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
			<TimelineItem id="testItem10" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
			<TimelineItem id="testItem11" class="group-item" titleText="made group call" subtitleText="20.02.2017 11:30" icon={calendar} name="Stoyan Kralimarkov" nameClickable={true}></TimelineItem>
		</TimelineGroupItem>
	</Timeline>;
}

describe("Timeline general interaction", () => {
	it("should fire name-click event on a normal item name", () => {
		cy.mount(<Sample />);

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
		cy.mount(<Sample />);
		cy.get("[ui5-timeline]")
			.shadow()
			.find("ul")
			.should("have.attr", "aria-label", "Timeline vertical");
	});

	it("Item within Timeline Item is rendered", () => {
		cy.mount(<SampleWithSingleItem />);

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
		cy.mount(<GroupSample />);

		cy.get("[ui5-timeline]")
			.find("[ui5-timeline-group-item][group-name='Events']")
			.as("groupItem");

		cy.get("@groupItem")
			.eq(0)
			.find("ui5-timeline-item")
			.should("have.length", 4);
	});

	it("Group items are collapsed on button click", () => {
		cy.mount(<GroupSample />);

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
		cy.mount(<GroupSample />);

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
		cy.mount(<GroupSample />);

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
		cy.mount(
			<div id="scroll-container" style={{ height: "200px", overflow: "scroll" }}>
				<Timeline growing="Scroll">
					<TimelineItem titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
					<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				</Timeline>
			</div>
		);

		cy.get("[ui5-timeline]")
			.as("timeline");

		cy.get("@timeline")
			.then(timeline => {
				timeline.get(0).addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		cy.get("#scroll-container")
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(
			<Timeline growing="Button">
				<TimelineItem titleText="first item" subtitleText="20.02.2017 11:30" ></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30"></TimelineItem>
				<TimelineItem titleText="coming up" subtitleText="20.02.2017 11:30" ></TimelineItem>
			</Timeline>
		);

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

		cy.realPress("ArrowDown");

		cy.get("@timeline")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get("@timeline")
			.find("ui5-timeline-item")
			.last()
			.should("be.focused");
	});
});

describe("Accessibility", () => {
	beforeEach(() => {
		cy.mount(
			<Timeline id="test-timeline">
				<TimelineGroupItem groupName="Build">
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
