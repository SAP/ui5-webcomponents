import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import FlexibleColumnLayout from "../../src/FlexibleColumnLayout.js";

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

describe("Layout API Tests", () => {
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

	it("tests change layout with API", () => {
		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "2");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.attr", "_visible-columns", "3");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("tests change layout upon dragging the separator to a new layout", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");
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
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");
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
	beforeEach(() => {
		cy.viewport(1600, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.realMouseDown()
			.realMouseMove(-600, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Layout change by dragging start-separator on tablet", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="TwoColumnsStartExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand mid column from TwoColumnsStartExpanded to TwoColumnsMidExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");
	});

	it("allows expand start column from TwoColumnsMidExpanded to TwoColumnsStartExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("separator");

		// Separate the drag operations
		cy.get("@separator")
			.realMouseDown();

		cy.get("@separator")
			.realMouseMove(600, 0)

		cy.get("@separator")
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");
	});

	it("allows hide end column from ThreeColumnsMidExpanded to ThreeColumnsMidExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("startSeparator");

		cy.get("@startSeparator")
			.realMouseDown();

		cy.get("@startSeparator")
			.realMouseMove(300, 0);

		cy.get("@startSeparator")
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Tablet Layout Tests", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand start column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsStartExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");
	});

	it("allows expand mid column from ThreeColumnsStartExpandedEndHidden to ThreeColumnsMidExpandedEndHidden", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsStartExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("separator");

		cy.get("@separator")
			.realMouseDown();

		cy.get("@separator")
			.realMouseMove(-600, 0)

		cy.get("@separator")
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});

	it("preserves ThreeColumnsMidExpandedEndHidden when dragging to shrink start column", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.realMouseDown()
			.realMouseMove(-100, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	});
});

describe("Layout change by dragging end-separator on tablet", () => {
	beforeEach(() => {
		cy.viewport(1000, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpandedEndHidden">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("allows expand end-column from ThreeColumnsMidExpandedEndHidden to ThreeColumnsMidExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.realMouseDown()
			.realMouseMove(-400, 0)
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	});

	it("allows expand end-column from ThreeColumnsMidExpanded to ThreeColumnsEndExpanded", () => {
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.as("endSeparator");

		cy.get("@endSeparator")
			.realMouseDown();

		cy.get("@endSeparator")
			.realMouseMove(-500, 0)

		cy.get("@endSeparator")
			.realMouseUp();

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsEndExpanded");
	});
});

describe("Preserves column min-width", () => {
	beforeEach(() => {
		cy.viewport(1400, 1080);

		cy.mount(
			<FlexibleColumnLayout style={{ height: "300px" }} layout="ThreeColumnsMidExpanded">
				<div slot="startColumn">some content</div>
				<div slot="midColumn">some content</div>
				<div slot="endColumn">some content</div>
			</FlexibleColumnLayout>
		);
	});

	it("complies with min-width requirement on smallest desktop", () => {
		const smallestDesktopWidth = 1024;
		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.invoke("css", "width", `${smallestDesktopWidth}px`);

		cy.get("[ui5-flexible-column-layout]")
			.should("have.css", "width", `${smallestDesktopWidth}px`);

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.should($startColumn => {
				const width = $startColumn.width();
				expect(width).to.equal(smallestColumnWidth);
			});
	});

	it("preserves min-width of begin column", () => {
		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--start")
			.then($startColumn => {
				const initialWidth = $startColumn.width();

				const differenceFromSmallestWidth = initialWidth - smallestColumnWidth;
				const testOffsetX = differenceFromSmallestWidth + 50;

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-separator-start")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0)
					.realMouseUp();

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-column--start")
					.then($finalColumn => {
						const finalWidth = $finalColumn.width();
					});

				cy.get("[ui5-flexible-column-layout]")
					.should("have.prop", "layout", "TwoColumnsMidExpanded");

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-column--start")
					.should($startColumn => {
						const finalWidth = $startColumn.width();
						expect(finalWidth).to.be.at.least(smallestColumnWidth);
					});
			});
	});

	it("preserves min-width of mid column in 2-column layout", () => {
		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "TwoColumnsStartExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-start")
			.should("be.visible")
			.as("separator");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.then($midColumn => {
				const midColumnWidth = $midColumn.width();
				const differenceFromSmallestWidth = midColumnWidth - smallestColumnWidth;
				const testOffsetX = differenceFromSmallestWidth + 10;

				cy.get("@separator")
					.realMouseDown();

				cy.get("@separator")
					.realMouseMove(testOffsetX, 0);

				cy.get("@separator")
					.realMouseUp();

				cy.get("[ui5-flexible-column-layout]")
					.should("have.prop", "layout", "TwoColumnsStartExpanded");

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.should($finalMidColumn => {
						const finalWidth = $finalMidColumn.width();
						expect(finalWidth).to.be.closeTo(smallestColumnWidth, 5);
					});
			});
	});

	it("preserves min-width of mid column in 3-column layout", () => {
		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--middle")
			.then($midColumn => {
				const midColumnWidth = $midColumn.width();
				const differenceFromSmallestWidth = midColumnWidth - smallestColumnWidth;
				const testOffsetX = differenceFromSmallestWidth + 10;

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.realMouseDown()
					.realMouseMove(-testOffsetX, 0)
					.realMouseUp();

				cy.get("[ui5-flexible-column-layout]")
					.should("have.prop", "layout", "ThreeColumnsEndExpanded");

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-column--middle")
					.then($finalMidColumn => {
						const finalWidth = $finalMidColumn.width();

						expect(finalWidth).to.be.closeTo(smallestColumnWidth, 10);
					});
			});
	});

	it("preserves min-width of end column", () => {
		const smallestColumnWidth = 248;

		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");

		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.then($endColumn => {
				const endColumnWidth = $endColumn.width();
				const differenceFromSmallestWidth = endColumnWidth - smallestColumnWidth;
				const testOffsetX = differenceFromSmallestWidth + 10;

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-separator-end")
					.realMouseDown()
					.realMouseMove(testOffsetX, 0)
					.realMouseUp();

				cy.get("[ui5-flexible-column-layout]")
					.should("have.prop", "layout", "ThreeColumnsMidExpanded");

				cy.get("[ui5-flexible-column-layout]")
					.shadow()
					.find(".ui5-fcl-column--end")
					.then($finalEndColumn => {
						const finalWidth = $finalEndColumn.width();

						expect(finalWidth).to.be.closeTo(smallestColumnWidth, 10);
					});
			});
	});

	it("fully reveals the end-column on dragging the end-separator only few pixels", () => {
		const smallestColumnWidth = 248;
	
		cy.get("[ui5-flexible-column-layout]")
			.invoke("prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	
		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpandedEndHidden");
	
		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-separator-end")
			.should("be.visible")
			.as("endSeparator");
	
		cy.get("@endSeparator")
			.realMouseDown();
	
		cy.get("@endSeparator")
			.realMouseMove(-150, 0)
	
		cy.get("@endSeparator")
			.realMouseUp();
	
		cy.get("[ui5-flexible-column-layout]")
			.should("have.prop", "layout", "ThreeColumnsMidExpanded");
	
		cy.get("[ui5-flexible-column-layout]")
			.shadow()
			.find(".ui5-fcl-column--end")
			.should($endColumn => {
				const width = $endColumn.width();
				expect(width).to.be.closeTo(smallestColumnWidth, 10);
			});
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