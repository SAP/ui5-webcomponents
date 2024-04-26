import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuTemplate from "./generated/templates/TestMenuTemplate.lit.js";
import menuCss from "./generated/themes/TestMenu.css.js";
import TestMenuItem from "./TestMenuItem.js";

@customElement({
	tag: "ui5-test-menu",
	renderer: litRender,
	styles: menuCss,
	template: menuTemplate,
	dependencies: [
	],
})

class TestMenu extends UI5Element {
	/**
	 * Defines the header text of the menu (displayed on mobile).
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	@property({ type: Boolean })
	open!: boolean;

	@property({ validator: DOMReference })
	opener!: HTMLElement | string;

	@slot({
		"default": true,
		individualSlots: true,
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	items!: Array<TestMenuItem>;
}

TestMenu.define();
export default TestMenu;
