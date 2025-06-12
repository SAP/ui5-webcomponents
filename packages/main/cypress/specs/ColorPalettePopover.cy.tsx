import Button from "../../src/Button.js";
import ColorPalettePopover from "../../src/ColorPalettePopover.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

type TempalteOptions = Partial<{ open: boolean, defaultColor: string, showRecentColors: boolean, showMoreColors: boolean, showDefaultColor: boolean, onClose: () => void }>

function ColorPaletteTemplate(options: TempalteOptions) {
	return <>
		<Button id="opener">Open</Button>
		<ColorPalettePopover opener="opener" {...options}>
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
}

describe("ColorPalette interactions", () => {
	it("Test if focusing first element works on initial open", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");
	});

	it("Test if default color functionality works", () => {
		const DEFAULT_COLOR = "green";

		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

		cy.realPress("Space")

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetColorPalette()
			.should("have.prop", "selectedColor", DEFAULT_COLOR);
	});

	it("Test if keyboard navigation on elements works", () => {
		const EXPTECTED_COLOR = "pink"

		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-color-palette-item]")
			.eq(0)
			.should("be.focused");

		cy.realPress("Space")

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetColorPalette()
			.should("have.prop", "selectedColor", EXPTECTED_COLOR);
	});

	it("Test if keyboard navigation on elements works", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetMoreColors()
			.should("be.focused");
	});

	it("Tests navigation with recent colors", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused")
			.realClick();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused")

		cy.realPress("ArrowUp");

		cy.get("@cpp")
			.shadow()
			.find("[ui5-color-palette]")
			.shadow()
			.find(".ui5-cp-recent-colors-container [ui5-color-palette-item]")
			.eq(0)
			.should("be.focused");

		cy.realPress("ArrowUp");

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetMoreColors()
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("@cpp")
			.shadow()
			.find("[ui5-color-palette]")
			.shadow()
			.find(".ui5-cp-recent-colors-container [ui5-color-palette-item]")
			.eq(0)
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

	});

	it("Test 'close' event fired when popover closes", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} onClose={cy.stub().as("close")} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

		cy.realPress("Escape");

		cy.get("@close")
			.should("have.been.calledOnce");

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.realClick();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed();

		cy.get("@close")
			.should("have.been.calledTwice");
	});

	it("Test attribute propagation propagation", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverGetColorPalette()
			.should("have.attr", "show-default-color")

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetColorPalette()
			.should("have.attr", "show-recent-colors")

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetColorPalette()
			.should("have.attr", "show-more-colors")
	});

	it("After selecting an item, opening the popover again should focus be on default color", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");

		cy.realPress("ArrowDown");

		cy.get("[ui5-color-palette-item]")
			.eq(0)
			.should("be.focused");

		cy.realPress("Space");

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverClosed()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverOpen()

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");
	});

	it("Clicking default button and opening the popover again should focus the default button", () => {
		cy.mount(<ColorPaletteTemplate defaultColor="green" showDefaultColor={true} showMoreColors={true} showRecentColors={true} />)

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("cpp")
			.ui5ColorPalettePopoverOpen();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused")
			.realClick();

		cy.get("@cpp")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();

		cy.get("@cpp")
			.invoke("prop", "open", true);

		cy.get("@cpp")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get<ColorPalettePopover>("@cpp")
			.ui5ColorPalettePopoverGetDefaultButton()
			.should("be.focused");
	});
});