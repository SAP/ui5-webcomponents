import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import Avatar from "./Avatar.js";
import WrappingType from "./types/WrappingType.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li",
	properties: /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */ {

		/**
		 * Defines the description displayed right under the item text, if such is present.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 0.8.0
		 */
		description: {
			type: String,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br><br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end.
		 * <br><br>
		 * <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * Defines the <code>image</code> source URI.
		 * <br><br>
		 * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.
		 *
		 * @type {string}
		 * @public
		 */
		image: {
			type: String,
		},

		/**
		 * Defines the <code>additionalText</code>, displayed in the end of the list item.
		 * @type {string}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Defines the state of the <code>additionalText</code>.
		 * <br>
		 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.
		 * @type {sap.ui.webcomponents.base.types.ValueState}
		 * @defaultvalue "None"
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalTextState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines the text alternative of the component.
		 * Note: If not provided a default text alternative will be set, if present.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines if the text of the component should wrap, they truncate by default.
		 *
		 * <br><br>
		 * <b>Note:</b> this property takes affect only if text node is provided to default slot of the component
		 * @type {sap.ui.webcomponents.main.types.WrappingType}
		 * @defaultvalue "None"
		 * @private
		 * @since 1.5.0
		 */
		wrappingType: {
			type: WrappingType,
			defaultValue: WrappingType.None,
		},

		/**
		 * Indicates if the list item has text content.
		 * @type {boolean}
		 * @private
		 */
		hasTitle: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
};

/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the list item</li>
 * <li>description - Used to style the description of the list item</li>
 * <li>additional-text - Used to style the additionalText of the list item</li>
 * <li>icon - Used to style the icon of the list item</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.StandardListItem
 * @extends sap.ui.webcomponents.main.ListItem
 * @tagname ui5-li
 * @implements sap.ui.webcomponents.main.IListItem
 * @public
 */
class StandardListItem extends ListItem {
	static get template() {
		return StandardListItemTemplate;
	}

	static get metadata() {
		return metadata;
	}

	onBeforeRendering(...params) {
		super.onBeforeRendering(...params);
		this.hasTitle = !!this.textContent;
	}

	get displayImage() {
		return !!this.image;
	}

	get displayIconBegin() {
		return (this.icon && !this.iconEnd);
	}

	get displayIconEnd() {
		return (this.icon && this.iconEnd);
	}

	static get dependencies() {
		return [
			...ListItem.dependencies,
			Icon,
			Avatar,
		];
	}
}

StandardListItem.define();

export default StandardListItem;
