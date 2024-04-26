import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import menuItemTemplate from "./generated/templates/TestMenuItemTemplate.lit.js";
import menuItemCss from "./generated/themes/TestMenuItem.css.js";
import TestMenuItemBase from "./TestMenuItemBase.js";

@customElement({
	tag: "ui5-test-menu-item",
	styles: [TestMenuItemBase.styles, menuItemCss],
	template: menuItemTemplate,
})

class TestMenuItem extends TestMenuItemBase {
	@property()
	text!: string;
}

TestMenuItem.define();
export default TestMenuItem;
