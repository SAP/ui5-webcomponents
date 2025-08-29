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
	buttonId: string;
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

function SimplePalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

function MultiRowPalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
			<ColorPaletteItem value="green"></ColorPaletteItem>
			<ColorPaletteItem value="yellow"></ColorPaletteItem>
			<ColorPaletteItem value="purple"></ColorPaletteItem>
			<ColorPaletteItem value="pink"></ColorPaletteItem>
			<ColorPaletteItem value="black"></ColorPaletteItem>
			<ColorPaletteItem value="white"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

function IncompleteRowPalettePopover(options: ColorPalettePopoverTemplateOptions & { buttonId?: string }) {
	const buttonId = options.buttonId || "btnPalette";
	return (
		<>
		<Button id={buttonId}>Open Palette</Button>
		<ColorPalettePopover opener={buttonId} {...options}>
			<ColorPaletteItem value="cyan"></ColorPaletteItem>
			<ColorPaletteItem value="orange"></ColorPaletteItem>
			<ColorPaletteItem value="blue"></ColorPaletteItem>
			<ColorPaletteItem value="red"></ColorPaletteItem>
			<ColorPaletteItem value="green"></ColorPaletteItem>
			<ColorPaletteItem value="yellow"></ColorPaletteItem>
			<ColorPaletteItem value="purple"></ColorPaletteItem>
		</ColorPalettePopover>
		</>
	);
}

describe("Color Popover Palette tests", () => {

    describe("Arrow keys navigation", () => {
        it("should navigate with Arrow right", () => {
            cy.mount(
                <SimplePalettePopover showMoreColors={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");

            cy.focused()
                .realPress("ArrowRight");

            cy.focused()
                .should("have.attr", "aria-label", "More Colors...");

            cy.focused()
                .realPress("ArrowLeft");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");
        });

        it("should navigate to color with Arrow Right and select a color", () => {
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

        it("should navigate with Arrow left", () => {
            cy.mount(
                <SimplePalettePopover showDefaultColor={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

             cy.focused()
                .realPress("ArrowRight");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowLeft");

            cy.focused()
                .should("have.attr", "aria-label", "Default Color");
        });

        it("should cycle through colors horizontally with left/right arrows", () => {
            cy.mount(
                <SimplePalettePopover />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowRight");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 2: orange");

            cy.focused()
                .realPress("ArrowRight");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 3: blue");

            cy.focused()
                .realPress("ArrowRight");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");

            cy.focused()
                .realPress("ArrowRight");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowLeft");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");
        });

        it("should cycle through colors vertically with up/down arrows", () => {
            cy.mount(
                <MultiRowPalettePopover />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowDown");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 6: yellow");

            cy.focused()
                .realPress("ArrowDown");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 2: orange");

            cy.focused()
                .realPress("ArrowUp");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 6: yellow");
        });

        it("should navigate to More Colors from colors grid", () => {
            cy.mount(
                <IncompleteRowPalettePopover showMoreColors={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .realPress("End");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 5: green");

            cy.focused()
                .realPress("ArrowDown");
            cy.focused()
                .should("have.attr", "aria-label", "More Colors...");

            cy.focused()
                .realPress("ArrowLeft");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 7: purple");
        });

        it("should handle incomplete row navigation correctly", () => {
            cy.mount(
                <IncompleteRowPalettePopover />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .realPress("End");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 5: green");

            cy.focused()
                .realPress("ArrowUp");
            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");
        });
    });

    describe("Home and End keyboard navigation", () => {
        it("should navigate with Home/End when showDefaultColor is set", () => {
            cy.mount(
                <SimplePalettePopover showDefaultColor={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");

            cy.focused()
                .realPress("Home");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("Home");

            cy.focused()
                .should("have.attr", "aria-label", "Default Color");
        });

        it("should navigate with Home/End keys when showMoreColors is set", () => {
            cy.mount(
                <SimplePalettePopover showMoreColors={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 4: red");

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "More Colors...");
        });

        it("should navigate with Home/End when showDefaultColor & showMoreColors are set", () => {
            cy.mount(
                <SimplePalettePopover showDefaultColor={true} showMoreColors={true} />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .should("have.attr", "aria-label", "Default Color");

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "More Colors...");

            cy.focused()
                .realPress("Home");

            cy.focused()
                .should("have.attr", "aria-label", "Default Color");
        });

        it("should navigate with End key", () => {
            cy.mount(
                <IncompleteRowPalettePopover />
            );

            cy.get("[ui5-color-palette-popover]")
                .ui5ColorPalettePopoverOpen({ opener: "btnPalette" });

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowDown");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 6: yellow");

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 7: purple");
        });
    });


    describe("General interaction tests", () => {
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

    describe("Events tests", () => {
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
});