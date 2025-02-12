import Input from "../../src/Input.js";
import Button from "../../src/Button.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";
import ColorPalettePopover from "../../src/ColorPalettePopover.js";

function ColorPaletteSample() {
	return (
		<>
			<Button id="colorPaletteBtnTest">Open</Button>
			<ColorPalettePopover
				id="colorPalettePopoverTest"
				showRecentColors={true}
				showMoreColors={true}
				showDefaultColor={true}
				defaultColor="green"
				opener="colorPaletteBtnTest"
			>
				<ColorPaletteItem value="pink" />
				<ColorPaletteItem value="darkblue" />
				<ColorPaletteItem value="#444444" />
				<ColorPaletteItem value="rgb(0,200,0)" />
				<ColorPaletteItem value="green" />
				<ColorPaletteItem value="darkred" />
				<ColorPaletteItem value="yellow" />
				<ColorPaletteItem value="blue" />
				<ColorPaletteItem value="cyan" />
				<ColorPaletteItem value="orange" />
				<ColorPaletteItem value="#5480e7" />
				<ColorPaletteItem value="#ff6699" />
			</ColorPalettePopover>
		</>
	);
}

describe("Color Palette Popover tests", () => {
	it("Test if focusing first element works on initial open", () => {
		cy.mount(<ColorPaletteSample />);

		// use the command to open the color palette popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// get elements and assert focus
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.ui5GetColorPaletteDefaultButton()
			.should("have.focus");

		// close popover
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.ui5GetColorPaletteDefaultButton()
			.realClick();
	});

	it("Test if default color functionality works", () => {
		cy.mount(<ColorPaletteSample />);
		const DEFAULT_COLOR = "green";

		// open color palette popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// get color palette within popover
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		// find and click default color button
		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.realPress("Space"); // simulate space key press

		// "green" is selected as default color
		cy.get("@colorPalette")
			.invoke("prop", "selectedColor")
			.should("equal", DEFAULT_COLOR);
	});

	it("Test if keyboard navigation on elements works correctly", () => {
		const EXPECTED_COLOR = "pink";
		cy.mount(<ColorPaletteSample />);

		// open color palette popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// get color palette within popover
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		// get default button and perform keyboard navigation
		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.realPress("ArrowDown");

		// find first color palette item and press space
		cy.get("@colorPalette")
			.ui5GetColorPaletteFirstItem()
			.realPress("Space");

		// "pink" is selected
		cy.get("@colorPalette")
			.invoke("prop", "selectedColor")
			.should("equal", EXPECTED_COLOR);
	});

	it("Test if keyboard navigation on elements works correctly", () => {
		cy.mount(<ColorPaletteSample />);

		// open color palette popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// get color palette within popover
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		// get default button and perform keyboard navigation up
		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.realPress("ArrowUp");

		// more Colors button is focused
		cy.get("@colorPalette")
			.ui5GetColorPaletteMoreColorsButton()
			.should("have.focus");

		// close popover
		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.realClick();
	});

	it("Test 'close' event fired when popover closes", () => {
		cy.mount(
			<>
				<Button id="colorPaletteBtnTest6">Open</Button>
				<Input id="inpOpenChangeCounter" placeholder="'close' event count"></Input>
				<Button id="btnFocusOut">Press</Button>
				<ColorPalettePopover
					id="colorPalettePopoverTest6"
					showRecentColors={true}
					showMoreColors={true}
					showDefaultColor={true}
					defaultColor="green"
					opener="colorPaletteBtnTest6"
				>
					<ColorPaletteItem value="pink"></ColorPaletteItem>
					<ColorPaletteItem value="darkblue"></ColorPaletteItem>
					<ColorPaletteItem value="#444444"></ColorPaletteItem>
					<ColorPaletteItem value="rgb(0,200,0)"></ColorPaletteItem>
					<ColorPaletteItem value="green"></ColorPaletteItem>
					<ColorPaletteItem value="darkred"></ColorPaletteItem>
					<ColorPaletteItem value="yellow"></ColorPaletteItem>
					<ColorPaletteItem value="blue"></ColorPaletteItem>
					<ColorPaletteItem value="cyan"></ColorPaletteItem>
					<ColorPaletteItem value="orange"></ColorPaletteItem>
					<ColorPaletteItem value="#5480e7"></ColorPaletteItem>
					<ColorPaletteItem value="#ff6699"></ColorPaletteItem>
				</ColorPalettePopover>
			</>
		);

		// listener to increment the counter on popover close
		cy.get("#colorPalettePopoverTest6").ui5RegisterCloseCounter("#inpOpenChangeCounter");

		// open popover and close it by clicking outside
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest6" });
		cy.get("#btnFocusOut").realClick();

		// verify that the close event fired
		cy.get("#inpOpenChangeCounter").should("have.attr", "value", "1");

		// open the color palette popover again
		cy.get("[ui5-color-palette-popover]").ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest6" });

		// close the popover
		cy.get("#colorPalettePopoverTest6").ui5ColorPalettePopoverClose();

		cy.get("#inpOpenChangeCounter").should("have.attr", "value", "2");
	});

	// the item is focused but the assertion fails
	it.skip("After selecting an item, opening the popover again should focus the selected item", () => {
		cy.mount(<ColorPaletteSample />);

		// open the popover and select the first item using keyboard navigation
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		// navigate from the default button to the first palette item
		cy.get("@colorPalette")
			.realPress("ArrowDown")
			.realPress("Space");

		// close the popover by clicking the opener button
		cy.get("#colorPaletteBtnTest").realClick();

		// re-open the popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// verify that the previously selected item is focused
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.ui5GetColorPaletteFirstItem()
			.should("be.focused");
	});

	it("Clicking default button and opening the popover again should focus the default button", () => {
		cy.mount(<ColorPaletteSample />);

		// open the popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// click on the default button inside the popover
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.ui5GetColorPaletteDefaultButton()
			.realClick();

		// close the popover by clicking the opener button
		cy.get("#colorPaletteBtnTest").realClick();

		// re-open the popover
		cy.get("[ui5-color-palette-popover]")
			.ui5ColorPalettePopoverOpen({ opener: "colorPaletteBtnTest" });

		// assert that the default button is focused
		cy.get("#colorPalettePopoverTest")
			.ui5GetColorPaletteInPopover()
			.ui5GetColorPaletteDefaultButton()
			.should("have.focus");
	});
});
