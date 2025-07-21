import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import FlexibleColumnLayout from "../../src/FlexibleColumnLayout.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";

before(() => {
	cy.wrap({ setAnimationMode })
		.then(api => {
			return api.setAnimationMode("none");
		});
});

describe("Columns resize", () => {
	beforeEach(() => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" style={{ height: "300px" }} layout="TwoColumnsMidExpanded">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
				<div class="column" id="midColumn" slot="midColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("separator drag'n'drop", () => {
		let oldWidthFirstCol: number;
		let widthAfterMove: number;

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("separator");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.then($el => {
				oldWidthFirstCol = $el.width()!;
			});

		// act: mock the user starting to drag the separator
		cy.get("@separator")
			.realMouseDown();

		// act: mock the user starting to drag the separator
		cy.get("@separator")
			.realMouseMove(200, 0);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should($el => {
				widthAfterMove = $el.width()!;

				expect(oldWidthFirstCol).to.be.lt(widthAfterMove);
			});

		// act: mock the user releasing the mouse button; use "then" to ensure it happens after the above check has completed
		cy.get("@separator")
			.realMouseUp();

		cy.get("@separator")
			.realMouseMove(200, 0);

		cy.get("@separator")
			.realMouseMove(-100, 0);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should($el => {
				expect(widthAfterMove).to.be.equal($el.width()!);
			});
	});

	it("sets dedicated class to hidden columns", () => {
		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should($el => {
				expect($el).to.have.class("ui5-fcl-column--hidden");
			});
	});
});

describe("ACC", () => {
	it("verifies that aria-hidden is not set in OneColumn layout", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" layout="OneColumn">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=startColumn]")
			.should("not.have.attr", "aria-hidden");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=midColumn]")
			.should("have.attr", "aria-hidden");

		cy.get("@fcl")
			.shadow()
			.find("slot[name=endColumn]")
			.should("have.attr", "aria-hidden");
	});

	it("verifies that aria-valuenow is set on separators", () => {
		cy.mount(
			<FlexibleColumnLayout id="fcl" style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div class="column" id="startColumn" slot="startColumn">some content</div>
				<div class="column" id="midColumn" slot="midColumn">some content</div>
				<div class="column" id="endColumn" slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.as("fcl");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "aria-valuenow");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "aria-valuenow");
	});
});

describe("FlexibleColumnLayout Behavior", () => {
	it("tests Desktop size 1400px", () => {
		cy.viewport(1400, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "3");
	});

	it("tests Tablet Size 1000px", () => {
		cy.viewport(1000, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "2");
	});

	it("tests Phone size 500px", () => {
		cy.viewport(320, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "1");
	});
});

describe("First column closing arrow behavior", () => {
	beforeEach(() => {
		cy.viewport(1400, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsStartHiddenMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("should switch layout and update arrow icon on desktop", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsStartHiddenMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-right");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.click();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-left");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.click();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartHiddenMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-arrow--start")
			.should("have.attr", "icon", "slim-arrow-right");
	});
});

before(() => {
	cy.wrap({ setAnimationMode })
		.then(api => {
			return api.setAnimationMode("none");
		});
});

describe("Layout Change API", () => {
	beforeEach(() => {
		cy.mount(
			<div>
				<Button data-testid="switch-btn">Set to ThreeColumnsMidExpanded</Button>

				<FlexibleColumnLayout
					data-testid="fcl"
					layout="TwoColumnsStartExpanded"
					style={{ height: "300px" }}
				>
					<div slot="startColumn">Column 1 content</div>
					<div slot="midColumn">Column 2 content</div>
					<div slot="endColumn">Column 3 content</div>
				</FlexibleColumnLayout>
			</div>
		);

		// Set up the button click handler to change FCL layout
		cy.get("[data-testid='switch-btn']").then($btn => {
			$btn[0].addEventListener('click', () => {
				cy.get("[data-testid='fcl']").invoke('prop', 'layout', 'ThreeColumnsMidExpanded');
			});
		});
	});

	it("tests change layout with API", () => {
		// Initial assertions - using custom attributes and should()
		cy.get("[data-testid='fcl']")
			.should("have.attr", "_visible-columns", "2")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		// Act - click the button
		cy.get("[data-testid='switch-btn']").click();

		// Assert - verify layout changed using should()
		cy.get("[data-testid='fcl']")
			.should("have.attr", "_visible-columns", "3")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("changes layout when dragging separator", () => {
		let counter = 0;

		cy.mount(
			<>
				<Input id="layoutChangeRes4" value="0" />
				<FlexibleColumnLayout
					id="fcl1"
					layout="TwoColumnsStartExpanded"
					style={{ height: "300px" }}
				>
					<div slot="startColumn">Start</div>
					<div slot="midColumn">Mid</div>
					<div slot="endColumn">End</div>
				</FlexibleColumnLayout>
			</>
		).then(() => {
			const fcl = document.getElementById("fcl1")!;
			const counterInput = document.getElementById("layoutChangeRes4") as HTMLInputElement;

			fcl.addEventListener("layout-change", () => {
				counter += 1;
				counterInput.value = `${counter}`;
			});
		});

		cy.get("#fcl1").as("fcl");
		cy.get("#layoutChangeRes4").as("counter");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@counter").should("have.value", "1");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@counter").should("have.value", "2");
		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");
	});
});

describe("Column Expansion Tests", () => {
	beforeEach(() => {
		cy.viewport(1600, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="TwoColumnsStartExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl1"
				layout="TwoColumnsStartExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl1").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");
	});


	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Start Column Expansion Test", () => {
	beforeEach(() => {
		cy.viewport(1600, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="TwoColumnsStartExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("allows expand end column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});
});

describe("Layout change by dragging end-separator on desktop", () => {
	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Layout change by dragging start-separator on tablet", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);
	});

	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl1"
				layout="TwoColumnsStartExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl1").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl1"
				layout="TwoColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl1").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(300, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsStartExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("preserves ThreeColumnsMidExpandedEndHidden on tiny start column drag", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Layout change by dragging end-separator on tablet", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-300, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Preserves column min-width", () => {
	beforeEach(() => {
		cy.viewport(1400, 1080);
	});

	it("complies with min-width requirement on smallest desktop", () => {
		const smallestDesktopWidth = 1024;
		const smallestColumnWidth = 248;

		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px", width: `${smallestDesktopWidth}px` }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl").invoke("width").should("equal", smallestDesktopWidth);

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.invoke("width")
			.should("equal", smallestColumnWidth);
	});

	it("preserves min-width of begin column", () => {
		const smallestColumnWidth = 248;
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="TwoColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--start")
			.invoke("width")
			.then((initialStartWidth) => {
				const differenceFromMin = initialStartWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-start")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "TwoColumnsMidExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--start")
					.invoke("width")
					.should("equal", smallestColumnWidth);
			});
	});

	it("preserves min-width of mid column in 2-column layout", () => {
		const smallestColumnWidth = 248;
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="TwoColumnsStartExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.invoke("width")
			.then((initialMidWidth) => {
				const differenceFromMin = initialMidWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-start")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(testOffsetX, 0) // drag right to shrink mid column
					.realMouseUp();

				// assert layout is preserved
				cy.get("@fcl").should("have.prop", "layout", "TwoColumnsStartExpanded");

				// assert min-width is respected
				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.invoke("width")
					.should("equal", smallestColumnWidth);
			});
	});

	it("preserves min-width of mid column in 3-column layout", () => {
		const smallestColumnWidth = 248;

		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.invoke("width")
			.then((initialMidWidth) => {
				const differenceFromMin = initialMidWidth - smallestColumnWidth;
				const testOffsetX = differenceFromMin + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0) // drag left to shrink mid column
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsEndExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.invoke("width")
					.should("be.closeTo", smallestColumnWidth, 1);
			});
	});

	it("preserves min-width of end column", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpanded"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		const smallestColumnWidth = 248;

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.invoke("width")
			.then((endColumnWidth) => {
				const testOffsetX = endColumnWidth - smallestColumnWidth + 10;

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.should("be.visible")
					.realMouseDown()
					.realMouseMove(testOffsetX, 0)
					.realMouseUp();

				cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

				cy.get("@fcl")
					.shadow()
					.find(".ui5-fcl-column--end")
					.invoke("width")
					.should("be.closeTo", smallestColumnWidth, 1);
			});
	});

	it("fully reveals the end-column on dragging the end-separator only few pixels", () => {
		cy.mount(
			<FlexibleColumnLayout
				id="fcl3"
				layout="ThreeColumnsMidExpandedEndHidden"
				style={{ height: "300px" }}
			>
				<div slot="startColumn">Start</div>
				<div slot="midColumn">Mid</div>
				<div slot="endColumn">End</div>
			</FlexibleColumnLayout>
		);

		const smallestColumnWidth = 248;

		cy.get("#fcl3").as("fcl");

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		cy.get("@fcl").should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("@fcl")
			.shadow()
			.find(".ui5-fcl-column--end")
			.invoke("width")
			.should("be.closeTo", smallestColumnWidth, 1);
	});
});

describe("Accessibility with Animation Disabled", () => {
	beforeEach(() => {
		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").then(($fcl) => {
			($fcl[0] as any).accessibilityAttributes = {
				startColumn: {
					name: "Products list",
				},
				midColumn: {
					name: "Product information",
				},
				endColumn: {
					name: "Product detailed information",
				},
				startSeparator: {
					name: "Start Draggable Splitter",
				},
				endSeparator: {
					name: "End Draggable Splitter",
				},
			};
		});
	});

	it("tests separator acc attrs", () => {
		const startSeparatorText = "Start Draggable Splitter";
		const endSeparatorText = "End Draggable Splitter";

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "title", startSeparatorText);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "title", endSeparatorText);
	});

	it("tests acc default roles", () => {
		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "role", "region");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "role", "region");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("not.have.attr", "role");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "role", "separator");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "role", "separator");
	});

	it("tests acc custom roles", () => {
		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]").then(($fcl) => {
			($fcl[0] as any).accessibilityAttributes = {
				startColumn: { role: "complementary" },
				startSeparator: { role: "navigation" },
				midColumn: { role: "main" },
				endSeparator: { role: "navigation" },
				endColumn: { role: "complementary" },
			};
		});

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("have.attr", "role", "complementary");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "role", "main");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should("have.attr", "role", "complementary");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("have.attr", "role", "navigation");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("have.attr", "role", "navigation");
	});

	it("tests acc attrs", () => {
		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="OneColumn">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should("not.have.attr", "aria-hidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.should("have.attr", "aria-hidden", "true");
	});
});