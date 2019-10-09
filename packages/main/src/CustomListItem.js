import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import ListItem from "./ListItem.js";
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import columnListItemCss from "./generated/themes/CustomListItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-custom",
	slots: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {

		/**
		 * Defines the content of the <code>ui5-li-custom</code>.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {
	},
};

/**
 * @class
 *
 * A component to be used as custom list item within the <code>ui5-list</code>
 * the same way as the standard <code>ui5-li</code>.
 *
 * The <code>ui5-li-custom</code> accepts arbitrary HTML content to allow full customization.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CustomListItem
 * @extends ListItem
 * @tagname ui5-li-custom
 * @public
 */
class CustomListItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return CustomListItemTemplate;
	}

	static get styles() {
		return [ListItem.styles, columnListItemCss];
	}

	onkeydown(event) {
		if (isSpace(event) && event.target !== this) {
			return;
		}
		super.onkeydown(event);
	}

	onkeyup(event) {
		if (isSpace(event) && event.target !== this) {
			return;
		}
		super.onkeyup(event);
	}

	onmousedown(event) {
		if (event.target !== this) {
			return;
		}
		super.onmousedown(event);
	}

	onmouseup(event) {
		if (event.target !== this) {
			return;
		}
		super.onmouseup(event);
	}

	onclick(event) {
		if (event.target !== this) {
			return;
		}
		super.onclick();
	}

	get classes() {
		const result = super.classes;
		result.main["ui5-custom-li-root"] = true;
		return result;
	}
}

CustomListItem.define();

export default CustomListItem;
