import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuItemCss from "./generated/themes/TestMenuItem.css.js";
import ListItem from "./ListItem.js";

@customElement({
	renderer: litRender,
	styles: [ListItem.styles, menuItemCss],

})

/**
 * @abstract
*/
class TestMenuItemBase extends ListItem {
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: false,
			slots: ["default"],
		},
		"default": true,
	})
	items!: Array<TestMenuItemBase>;

	@property({ validator: DOMReference })
	_opener!: HTMLElement | string;

	@property({ type: Boolean })
	_showSubMenu!: boolean;

	_openSubMenu(e: Event) {
		e.stopPropagation();
		if (this.items.length) {
			this._showSubMenu = true;
			this._opener = this;
		}
	}
}

export default TestMenuItemBase;
