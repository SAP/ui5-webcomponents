import { html } from "lit";
import "../../src/ColorPalette.js";
import "../../src/ColorPaletteItem.js";

describe("Color Palette tests", () => {
	it("internal color picker should have selected color set on open", () => {
		cy.mount(html`<ui5-color-palette show-more-colors show-recent-colors>
<ui5-color-palette-item id="named" value="red"></ui5-color-palette-item>
<ui5-color-palette-item id="rgba" value="rgba(0, 255, 0, 0.5)"></ui5-color-palette-item>
<ui5-color-palette-item id="rgb" value="rgb(0,0,255)"></ui5-color-palette-item>
<ui5-color-palette-item id="hex" value="#C0FFEE"></ui5-color-palette-item>
</ui5-color-palette>`);

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
