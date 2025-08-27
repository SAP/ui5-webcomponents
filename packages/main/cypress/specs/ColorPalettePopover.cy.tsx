import Button from "../../src/Button.js";
import ColorPalettePopover from "../../src/ColorPalettePopover.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";

describe("Color Popover Palette tests", () => {

    describe("Arrow keys navigation", () => {
        it("Arrow right", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette" showMoreColors={true}>
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

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

        it("Arrow left", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette" showDefaultColor={true}>
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

             cy.focused()
                .realPress("ArrowRight");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowLeft");

            cy.focused()
                .should("have.attr", "aria-label", "Default Color");
        });
    });

    describe("Home and End keyboard navigation", () => {
        it("showDefaultColor", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette" showDefaultColor={true}>
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

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

        it("showMoreColors", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette" showMoreColors={true}>
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

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

        it("showDefaultColor & showMoreColors", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette" showDefaultColor={true} showMoreColors={true}>
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

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

        it("Item navigation End", () => {
            cy.mount(<>
                <Button id="btnPalette">Open Palette</Button>
                <ColorPalettePopover opener="btnPalette">
                    <ColorPaletteItem value="cyan"></ColorPaletteItem>
                    <ColorPaletteItem value="orange"></ColorPaletteItem>
                    <ColorPaletteItem value="blue"></ColorPaletteItem>
                    <ColorPaletteItem value="yellow"></ColorPaletteItem>
                    <ColorPaletteItem value="green"></ColorPaletteItem>
                    <ColorPaletteItem value="purple"></ColorPaletteItem>
                    <ColorPaletteItem value="red"></ColorPaletteItem>
                </ColorPalettePopover>
            </>);

            cy.get("[ui5-color-palette-popover]")
                .ui5PaletteOpen();

            cy.focused()
                .should("have.attr", "aria-label", "Color - 1: cyan");

            cy.focused()
                .realPress("ArrowDown");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 6: purple");

            cy.focused()
                .realPress("End");

            cy.focused()
                .should("have.attr", "aria-label", "Color - 7: red");
        });
    });
});