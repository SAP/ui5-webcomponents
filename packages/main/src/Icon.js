import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getIconData } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import { fetchResourceBundle, getResourceBundle } from "@ui5/webcomponents-base/dist/ResourceBundle.js";
import IconTemplate from "./generated/templates/IconTemplate.lit.js";

// Styles
import iconCss from "./generated/themes/Icon.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-icon",
	properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {

		/**
		 * Defines the source URI of the <code>ui5-icon</code>.
		 * <br><br>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * <br><br>
		 * Example:
		 * <br>
		 * <code>src='sap-icon://add'</code>, <code>src='sap-icon://delete'</code>, <code>src='sap-icon://employee'</code>.
		 *
		 * @type {string}
		 * @public
		*/
		src: {
			type: String,
		},

		/**
		 * Defines the text alternative of the <code>ui5-icon</code>.
		 * If not provided a default text alternative will be set, if present.
		 * <br><br>
		 * <b>Note:</b> Every icon should have a text alternative in order to
		 * calculate its accessible name.
		 *
		 * @type {string}
		 * @public
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-icon</code> should have a tooltip.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTooltip: {
			type: Boolean,
		},
	},
	events: {
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component is a wrapper around the HTML tag to embed an icon from an icon font.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * In the first case, images are not predefined as tab stops in accessibility mode.
 * <br><br>
 * The <code>ui5-icon</code> uses embedded font instead of pixel image.
 * Comparing to image, <code>ui5-icon</code> is easily scalable,
 * its color can be altered live, and various effects can be added using CSS.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>src</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */
class Icon extends UI5Element {
	constructor() {
		super();
		this.resourceBundle = getResourceBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return IconTemplate;
	}

	static get styles() {
		return iconCss;
	}

	static async define(...params) {
		await fetchResourceBundle("@ui5/webcomponents");

		super.define(...params);
	}

	_normalizeIconURI(iconURI) {
		return this._hasIconPrefix(iconURI) ? iconURI : `sap-icon://${iconURI}`;
	}

	_hasIconPrefix(uri) {
		return /sap-icon:\/\//.test(uri);
	}

	get d() {
		const icon = getIconData(this._normalizeIconURI(this.src));

		if (!icon) {
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not imported. You have to import the icon as a module in order to use it e.g. "@ui5/webcomponents-base/dist/icons/${this._normalizeIconURI(this.src).split("sap-icon://")[1]}.js"`);
		}

		return icon.d;
	}

	get hasIconTooltip() {
		return this.showTooltip && this.accessibleNameText;
	}

	get accessibleNameText() {
		const icon = getIconData(this._normalizeIconURI(this.src));

		return this.accessibleName || (icon.accData && this.resourceBundle.getText(icon.accData));
	}

	get dir() {
		return getRTL() ? "rtl" : "ltr";
	}
}

Icon.define();

export default Icon;
