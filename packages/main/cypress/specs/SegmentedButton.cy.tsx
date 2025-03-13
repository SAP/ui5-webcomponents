import SegmentedButton from "../../src/SegmentedButton.js";
import SegmentedButtonItem from "../../src/SegmentedButtonItem.js";

describe("SegmentedButton general interaction tests", () => {
	it("should have first item selected by default", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.first()
			.should("have.attr", "selected");
	});

	it("should select second item with enter", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.ui5SegmentedButtonFocusFirstItem();

		cy.realPress("ArrowRight");

		cy.get<SegmentedButtonItem>("@items")
			.eq(1)
			.as("secondItem");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("be.focused");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("not.have.attr", "selected");

		cy.realPress("Enter");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("have.attr", "selected");
	});

	it("should select second item with space", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.ui5SegmentedButtonFocusFirstItem();

		cy.realPress("ArrowRight");

		cy.get<SegmentedButtonItem>("@items")
			.eq(1)
			.as("secondItem");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("be.focused");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("not.have.attr", "selected");

		cy.realPress("Space");

		cy.get<SegmentedButtonItem>("@secondItem")
			.should("have.attr", "selected");
	});

	it("should select last item with mouse", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
				<SegmentedButtonItem>Third</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.last()
			.as("lastItem");

		cy.get<SegmentedButtonItem>("@lastItem")
			.ui5SegmentedButtonItemToggleSelect();
	});

	it("should be able to select multple items in multiple selection mode", () => {
		cy.mount(
			<SegmentedButton selectionMode="Multiple">
				<SegmentedButtonItem selected={true}>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.first()
			.as("firstItem");

		cy.get<SegmentedButtonItem>("@items")
			.last()
			.as("lastItem");

		// Select second item
		cy.get<SegmentedButtonItem>("@lastItem")
			.ui5SegmentedButtonItemToggleSelect();

		// First item should still be selected
		cy.get<SegmentedButtonItem>("@firstItem")
			.should("have.attr", "selected");
	});

	it("should be able to deselect items in multiple selection mode", () => {
		cy.mount(
			<SegmentedButton selectionMode="Multiple">
				<SegmentedButtonItem selected={true}>First</SegmentedButtonItem>
				<SegmentedButtonItem selected={true}>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.first()
			.as("firstItem");

		cy.get<SegmentedButtonItem>("@items")
			.last()
			.as("lastItem");

		const deselect = true;
		// Deselect first item
		cy.get<SegmentedButtonItem>("@firstItem")
			.ui5SegmentedButtonItemToggleSelect(deselect);

		// Second item is still selected
		cy.get<SegmentedButtonItem>("@lastItem")
			.should("have.attr", "selected");
	});
});

describe("Accessibility", () => {
	it("should have correct aria labels", () => {
		cy.mount(
			<>
				<SegmentedButton selectionMode="Multiple">
					<SegmentedButtonItem accessibleName="accessible text">First</SegmentedButtonItem>
					<SegmentedButtonItem accessibleNameRef="reference">Second</SegmentedButtonItem>
				</SegmentedButton>
				<span id="reference">accessible ref text</span>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.first()
			.shadow()
			.find("li")
			.should("have.attr", "aria-label", "accessible text");

		cy.get<SegmentedButtonItem>("@items")
			.last()
			.shadow()
			.find("li")
			.should("have.attr", "aria-label", "accessible ref text");
	});
});
