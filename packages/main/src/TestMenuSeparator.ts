import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuItemTemplate from "./generated/templates/TestMenuSeparatorTemplate.lit.js";
import menuItemCss from "./generated/themes/TestMenuItem.css.js";
import ListItem from "./ListItem.js";
import type { IMenuItem } from "./TestMenu.js";

@customElement({
	tag: "ui5-test-menu-separator",
	renderer: litRender,
	styles: [ListItem.styles, menuItemCss],
	template: menuItemTemplate,
	dependencies: [
	],
})

class TestMenuSeparator extends ListItem implements IMenuItem {
	get isSeparator() {
		return true;
	}
}

TestMenuSeparator.define();

export default TestMenuSeparator;
