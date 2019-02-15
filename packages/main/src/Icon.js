import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import IconTemplateContext from "./IconTemplateContext";
import IconRenderer from "./build/compiled/IconRenderer.lit";

// Styles
import belize from "./themes/sap_belize/Icon.less";
import belizeHcb from "./themes/sap_belize_hcb/Icon.less";
import fiori3 from "./themes/sap_fiori_3/Icon.less";

ShadowDOM.registerStyle("sap_belize", "Icon.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Icon.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Icon.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-icon",
	styleUrl: [
		"Icon.css",
	],
	properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {

		/**
		 * Defines the source URI of the <code>ui5-icon</code>.
		 * <br><br>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * <br><br>
		 * Example:
		 * <br>
		 * <code>src='sap-icons://add'</code>, <code>src='sap-icons://delete'</code>, <code>src='sap-icons://employee'</code>.
		 *
		 * @type {String}
		 * @public
		*/
		src: { type: URI, defaultValue: null },
	},
	events: {
		press: {},
	},
	renderer: IconRenderer,
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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-icon
 * @public
 */
class Icon extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return IconRenderer;
	}

	static get calculateTemplateContext() {
		return IconTemplateContext.calculate;
	}

	constructor(state) {
		super(state);
	}

	focus() {
		HTMLElement.prototype.focus.call(this);
	}

	ontap() {
		this.fireEvent("press");
	}

	onsapenter() {
		this.ontap();
	}

	onkeydown(event) {
		if (event.which === KeyCodes.SPACE) {
			this.__spaceDown = true;
		}
	}

	onkeyup(event) {
		if (event.which === KeyCodes.SPACE && this.__spaceDown) {
			this.fireEvent("press");
			this.__spaceDown = false;
		}
	}
}

Bootstrap.boot().then(_ => {
	Icon.define();
});

export default Icon;
