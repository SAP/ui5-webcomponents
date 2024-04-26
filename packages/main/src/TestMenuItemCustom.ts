import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import menuItemCustomTemplate from "./generated/templates/TestMenuItemCustomTemplate.lit.js";
import menuItemCss from "./generated/themes/TestMenuItem.css.js";
import TestMenuItemBase from "./TestMenuItemBase.js";

@customElement({
	tag: "ui5-test-menu-item-custom",
	styles: [TestMenuItemBase.styles, menuItemCss],
	template: menuItemCustomTemplate,
})

class TestMenuItemCustom extends TestMenuItemBase {
	@property()
	some!: string;

	@slot()
	content!: Array<HTMLElement>;
}

TestMenuItemCustom.define();
export default TestMenuItemCustom;
