import ColorPalette from "../../src/ColorPalette.js";
import ColorPaletteItem from "../../src/ColorPaletteItem.js";

describe("Color Palette tests", () => {
	it("internal color picker should have selected color set on open", () => {
		cy.mount(
			<ColorPalette showMoreColors={true} showRecentColors={true}>
				<ColorPaletteItem id="named" value="red"></ColorPaletteItem>
				<ColorPaletteItem id="rgba" value="rgba(0, 255, 0, 0.5)"></ColorPaletteItem>
				<ColorPaletteItem id="rgb" value="rgb(0,0,255)"></ColorPaletteItem>
				<ColorPaletteItem id="hex" value="#C0FFEE"></ColorPaletteItem>
			</ColorPalette>
		);

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#named", {
				r: "255",
				g: "0",
				b: "0",
				a: "1",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#rgba", {
				r: "0",
				g: "255",
				b: "0",
				a: "0.5",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#rgb", {
				r: "0",
				g: "0",
				b: "255",
				a: "1",
			});

		cy.get("ui5-color-palette")
			.ui5ColorPaletteCheckSelectedColor("#hex", {
				r: "192",
				g: "255",
				b: "238",
				a: "1",
			});
	});
});
