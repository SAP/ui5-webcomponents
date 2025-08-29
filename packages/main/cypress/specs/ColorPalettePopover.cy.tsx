import Button from "../../src/Button.js";
import ColorPalettePopover from "../../src/ColorPalettePopover.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";
import ColorPalette from "../../src/ColorPalette.js";

type ColorPalettePopoverTemplateOptions = Partial<{
	showDefaultColor: boolean;
	showMoreColors: boolean;
	showRecentColors: boolean;
	defaultColor: string;
	onItemClick: () => void;
	onClose: () => void;
}>

function ColorPalettePopoverSample(options: ColorPalettePopoverTemplateOptions) {
	return (
		<>
		<Button id="btnOpen">Open</Button>
		<ColorPalettePopover 
			{...options}
			opener="btnOpen" 
		>
			<ColorPaletteItem value="violet"></ColorPaletteItem>
			<ColorPaletteItem value="hotpink"></ColorPaletteItem>
			<ColorPaletteItem value="pink"></ColorPaletteItem>
			<ColorPaletteItem value="lightsalmon"></ColorPaletteItem>
			<ColorPaletteItem value="lightcoral"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="lightgreen"></ColorPaletteItem>
			<ColorPaletteItem value="springgreen"></ColorPaletteItem>
			<ColorPaletteItem value="floralwhite"></ColorPaletteItem>
			<ColorPaletteItem value="beige"></ColorPaletteItem>
			<ColorPaletteItem value="gainsboro"></ColorPaletteItem>
			<ColorPaletteItem value="aliceblue"></ColorPaletteItem>
			<ColorPaletteItem value="cornflowerblue"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

describe("Color Palette Popover general interaction tests", () => {
	it("should focus first element on initial open (default color)", () => {
		cy.mount(
			<ColorPalettePopoverSample showDefaultColor={true} defaultColor="floralwhite"/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.as("defaultColorButton");

		cy.get("@defaultColorButton")
			.should("have.focus");
	});

	it("should focus first swatch on initial open (when there is only a color palette)", () => {
		cy.mount(
			<ColorPalettePopoverSample/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalettePopover")
			.ui5GetColorPaletteItem()
			.as("firstItem");

		cy.get("@firstItem")
			.should("have.attr", "value", "violet")
			.should("have.focus");
	});

	it("should focus on last selected color swatch when popover is re-opened", () => {
		cy.mount(
			<ColorPalettePopoverSample/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalettePopover")
			.ui5GetColorPaletteItem(5)
			.as("sixthItem");

		cy.get("@sixthItem")
			.should("have.attr", "value", "orange")
			.realClick();

		cy.get("@colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get("@sixthItem")
			.should("have.focus");
	});

	it("should focus on Default Color button when popover is re-opened if Default Color ha been selected", () => {
		cy.mount(
			<ColorPalettePopoverSample
				showDefaultColor={true}
				defaultColor="lightsalmon"
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");
		
		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.as("defaultColorButton");

		cy.get("@defaultColorButton")
			.realClick();

		cy.get("@colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get("@defaultColorButton")
			.should("have.focus");
	});
});

describe("Color Palette Popover keyboard navigation tests", () => {
	/* Keyboard navigation is currently being worked on in another backlog,
	 * more tests will be added once the behaviour is fixed.
	*/
	it("should navigate to color with Arrow Right in a basic ColorPalettePopover", () => {
		cy.mount(
			<ColorPalettePopoverSample/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalettePopover")
			.ui5GetColorPaletteItem()
			.as("firstItem");

		cy.get("@firstItem")
			.should("have.attr", "value", "violet")
			.should("have.focus");
		
		cy.realPress("ArrowRight");
		cy.realPress("Enter");

		cy.get("@colorPalette")
			.should("have.attr", "_selected-color", "hotpink");
	});

	it("should navigate to More Colors with Arrow Up on Default Color", () => {
		cy.mount(
			<ColorPalettePopoverSample
				showDefaultColor={true}
				showMoreColors={true}
				defaultColor="lightsalmon"
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.as("defaultColorButton");

		cy.get("@defaultColorButton")
			.should("have.focus");

		cy.realPress("ArrowUp");

		cy.get("@colorPalette")
			.ui5GetColorPaletteMoreColorsButton()
			.as("moreColorsButton");

		cy.get("@moreColorsButton")
			.should("have.focus");
	});
});

describe("Color Palette Popover events tests", () => {
	it("should fire itemClick with correct color when selecting 'Default Color'", () => {
		cy.mount(
			<ColorPalettePopoverSample 
				showDefaultColor={true}
				defaultColor="lightsalmon"
				onItemClick={cy.stub().as("itemClick")}
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalette")
			.ui5GetColorPaletteDefaultButton()
			.as("defaultColorButton");

		cy.get("@defaultColorButton")
			.realClick();

		cy.get("@itemClick")
			.should("be.calledOnce")
			.and("be.calledWithMatch", { detail: { color: "lightsalmon" } });
	});

	it("should fire itemClick when selecting a color from the ColorPalette", () => {
		cy.mount(
			<ColorPalettePopoverSample 
				onItemClick={cy.stub().as("itemClick")}
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalettePopover")
			.ui5GetColorPaletteItem(7)
			.as("fourthItem");

		cy.get("@fourthItem")
			.realClick();

		cy.get("@itemClick")
			.should("be.calledOnce")
			.and("be.calledWithMatch", { detail: { color: "springgreen" } });

	});

	it("should fire close event when popover is closed after color selection", () => {
		cy.mount(
			<ColorPalettePopoverSample 
				onClose={cy.stub().as("popoverClose")}
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5GetColorPaletteInPopover()
			.as("colorPalette");

		cy.get("@colorPalettePopover")
			.ui5GetColorPaletteItem()
			.as("firstItem");

		cy.get("@firstItem")
			.realClick();

		cy.get("@colorPalettePopover")
			.should("not.have.attr", "open");

		cy.get("@popoverClose")
			.should("be.calledOnce");
	});

	it("should fire close event when popover is closed by pressing Escape", () => {
		cy.mount(
			<ColorPalettePopoverSample 
				onClose={cy.stub().as("popoverClose")}
			/>
		);

		cy.get<ColorPalettePopover>("[ui5-color-palette-popover]")
			.as("colorPalettePopover")
			.ui5ColorPalettePopoverOpen({ opener: "btnOpen" });

		cy.get<ColorPalette>("@colorPalettePopover")
			.ui5ColorPalettePopoverClose();

		cy.get("@popoverClose")
			.should("be.calledOnce");
	});
});