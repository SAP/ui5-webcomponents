import "@ui5/webcomponents/dist/ColorPalettePopover.js";
import "@ui5/webcomponents/dist/ColorPaletteItem.js";
import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"

colorPaletteBtn.addEventListener("click", function () {
    colorPalettePopover.showAt(this);
});