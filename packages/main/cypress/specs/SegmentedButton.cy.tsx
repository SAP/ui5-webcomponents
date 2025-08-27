import SegmentedButton from "../../src/SegmentedButton.js";
import Label from "../../src/Label.js";
import SegmentedButtonItem from "../../src/SegmentedButtonItem.js";
import type UI5Element from "@ui5/webcomponents-base";
import { SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "../../src/generated/i18n/i18n-defaults.js";

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

describe("SegmentedButton - getFocusDomRef", () => {
	it("should return undefined when the SegmentedButton is empty", () => {
		cy.mount(<SegmentedButton></SegmentedButton>);

		cy.get<SegmentedButton>("[ui5-segmented-button]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem id="button1" title="Button 1"></SegmentedButtonItem>
				<SegmentedButtonItem title="Button 2"></SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get<UI5Element>("[ui5-segmented-button], #button1")
			.then(($el) => {
				const wrapper = $el[0],
					firstButton = $el[1];

				expect(wrapper.getFocusDomRef()).to.equal(firstButton.getFocusDomRef());
			});
	});

	it("should return last focused item in the SegmentedButton", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem title="Button 1"></SegmentedButtonItem>
				<SegmentedButtonItem id="button2" title="Button 2"></SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get('#button2').realClick();
		cy.get('#button2').should("be.focused");

		cy.get<UI5Element>("[ui5-segmented-button], #button2")
			.then(($el) => {
				const wrapper = $el[0],
					secondButton = $el[1];

				expect(wrapper.getFocusDomRef()).to.equal(secondButton.getFocusDomRef());
			});
	});
});

describe("SegmentedButton Accessibility", () => {
	it("segmented button should have correct aria label when accessibleName is set", () => {
		const LABEL = "Label";
		cy.mount(
			<SegmentedButton accessibleName={LABEL}>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-label", LABEL);
	});

	it("segmented button should have correct aria label when external label is set", () => {
		const LABEL = "External label";
		cy.mount(
			<>
				<Label for="segBtn">{LABEL}</Label>
				<SegmentedButton id="segBtn">
					<SegmentedButtonItem>First</SegmentedButtonItem>
					<SegmentedButtonItem>Second</SegmentedButtonItem>
				</SegmentedButton>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-label", LABEL);
	});

	it("segmented button should have correct aria label when accessibleNameRef is set", () => {
		const LABEL = "External label";
		cy.mount(
			<>
				<p id="accessibleLabel">{LABEL}</p>
				<SegmentedButton accessibleNameRef="accessibleLabel">
					<SegmentedButtonItem>First</SegmentedButtonItem>
					<SegmentedButtonItem>Second</SegmentedButtonItem>
				</SegmentedButton>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-label", LABEL);
	});

	it("segmented button should have correct aria description when neither accessibleDescription nor accessibleDescriptionRef are set", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-description", SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY));
	});

	it("segmented button should have correct aria description when accessibleDescription is set", () => {
		const DESCRIPTION = "Description";
		cy.mount(
			<SegmentedButton accessibleDescription={DESCRIPTION}>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
			</SegmentedButton>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-description", `${DESCRIPTION} ${SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY)}`);
	});

	it("segmented button should have correct aria description when accessibleDescriptionRef is set", () => {
		const DESCRIPTION = "External description";
		cy.mount(
			<>
				<p id="accessibleDescription">{DESCRIPTION}</p>
				<SegmentedButton accessibleDescriptionRef="accessibleDescription">
					<SegmentedButtonItem>First</SegmentedButtonItem>
					<SegmentedButtonItem>Second</SegmentedButtonItem>
				</SegmentedButton>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.shadow()
			.find(".ui5-segmented-button-root")
			.should("have.attr", "aria-description", `${DESCRIPTION} ${SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY)}`);
	});
});


describe("SebmentedButtonItem Accessibility", () => {
	it("segmented button items should have correct aria labels", () => {
		const LABEL = "Text Label";
		const REF_LABEL = "Ref Label";
		const FOR_LABEL = "For Label";
		cy.mount(
			<>
				<Label for="thirdItem">{FOR_LABEL}</Label>
				<SegmentedButton selectionMode="Multiple">
					<SegmentedButtonItem accessibleName={LABEL}>First</SegmentedButtonItem>
					<SegmentedButtonItem accessibleNameRef="reference">Second</SegmentedButtonItem>
					<SegmentedButtonItem id="thirdItem">Third</SegmentedButtonItem>
				</SegmentedButton>
				<span id="reference">{REF_LABEL}</span>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.eq(0)
			.shadow()
			.find("li")
			.should("have.attr", "aria-label", LABEL);

		cy.get<SegmentedButtonItem>("@items")
			.eq(1)
			.shadow()
			.find("li")
			.should("have.attr", "aria-label", REF_LABEL);

		cy.get<SegmentedButtonItem>("@items")
			.eq(2)
			.shadow()
			.find("li")
			.should("have.attr", "aria-label", FOR_LABEL);
	});

	it("segmented button item should have correct aria descriptions", () => {
		const DESCRIPTION = "Text Description";
		const REF_DESCRIPTION = "Ref Description";
		cy.mount(
			<>
				<p id="accessibleDescription">{REF_DESCRIPTION}</p>
				<SegmentedButton>
					<SegmentedButtonItem accessibleDescription={DESCRIPTION}>First</SegmentedButtonItem>
					<SegmentedButtonItem accessibleDescriptionRef="accessibleDescription">Second</SegmentedButtonItem>
				</SegmentedButton>
			</>
		);

		cy.get("[ui5-segmented-button]")
			.as("segmentedButton");

		cy.get<SegmentedButton>("@segmentedButton")
			.find("[ui5-segmented-button-item]")
			.as("items");

		cy.get<SegmentedButtonItem>("@items")
			.eq(0)
			.shadow()
			.find("li")
			.should("have.attr", "aria-description", DESCRIPTION);

		cy.get<SegmentedButtonItem>("@items")
			.eq(1)
			.shadow()
			.find("li")
			.should("have.attr", "aria-description", REF_DESCRIPTION);
	});
});
