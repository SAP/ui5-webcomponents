import "@ui5/webcomponents/dist/ColorPalettePopover.js";
import "@ui5/webcomponents/dist/ColorPaletteItem.js";
import "@ui5/webcomponents/dist/Button.js";

colorPaletteBtn.addEventListener("click", () => {
	colorPalettePopover.open = !colorPalettePopover.open;
});