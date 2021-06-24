import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-option",
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.Option.prototype */ {

		/**
		 * Defines the selected state of the component.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled component is noninteractive.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.12
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br><br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @public
		 */
		icon: {
			type: String,
			defaultValue: null,
		},

		/**
		 * Defines the value of the <code>ui5-select</code> inside an HTML Form element when this component is selected.
		 * For more information on HTML Form support, see the <code>name</code> property of <code>ui5-select</code>.
		 *
		 * @type {string}
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the stable selector that you can use via getStableDomRef method.
		 * @public
		 * @type {string}
		 * @since 1.0.0-rc.11
		 */
		stableDomRef: {
			type: String,
		},

		/**
		 * Defines the focused state of the component.
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.13
		 * @private
		 */
		_focused: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Option.prototype */ {
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
	events: /** @lends sap.ui.webcomponents.main.Option.prototype */ {},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-option</code> component defines the content of an option in the <code>ui5-select</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Option
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-option
 * @implements sap.ui.webcomponents.main.ISelectOption
 * @public
 */
class Option extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

Option.define();

export default Option;
