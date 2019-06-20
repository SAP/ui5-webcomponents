import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-option",
	noShadowDOM: true,
	properties: /** @lends  sap.ui.webcomponents.main.Option.prototype */ {

		/**
		 * Defines the selected state of the <code>ui5-option</code>.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * </br></br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @public
		 */
		icon: {
			type: String,
			defaultValue: null,
		},
	},

	events: /** @lends sap.ui.webcomponents.main.Option.prototype */ {},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-option</code> component defines the content of an opton in the <code>ui5-select</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Option
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-option
 * @public
 */
class Option extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

Bootstrap.boot().then(_ => {
	Option.define();
});

export default Option;
