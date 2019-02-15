import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import ToolbarDesign from "./types/ToolbarDesign";
import ToolbarStyle from "./types/ToolbarStyle";

// Template
import ToolbarRenderer from "./build/compiled/ToolbarRenderer.lit";
import ToolbarTemplateContext from "./ToolbarTemplateContext";

// Styles
import belize from "./themes/sap_belize/Toolbar.less";
import belizeHcb from "./themes/sap_belize_hcb/Toolbar.less";
import fiori3 from "./themes/sap_fiori_3/Toolbar.less";

// Styles
import spacerBelize from "./themes/sap_belize/ToolbarSpacer.less";
import spacerBelizeHcb from "./themes/sap_belize_hcb/ToolbarSpacer.less";
import spacerFiori3 from "./themes/sap_fiori_3/ToolbarSpacer.less";

ShadowDOM.registerStyle("sap_belize", "ToolbarSpacer.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "ToolbarSpacer.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "ToolbarSpacer.css", fiori3);

ShadowDOM.registerStyle("sap_belize", "Toolbar.css", spacerBelize);
ShadowDOM.registerStyle("sap_belize_hcb", "Toolbar.css", spacerBelizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Toolbar.css", spacerFiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-toolbar",
	styleUrl: [
		"Toolbar.css",
		"ToolbarSpacer.css",
	],
	defaultSlot: "content",
	slots: /** @lends  sap.ui.webcomponents.main.Toolbar.prototype */ {

		/**
		 * Defines the content of the <code>ui5-toolbar</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Toolbar.prototype */ {

		/**
		 * Defines the <code>ui5-toolbar</code> design.
		 * Available options are: <code>Solid</code>, <code>Transparent</code>, and <code>Info</code>.
		 * <br><br>
		 * <b>Note:</b> Design settings are theme dependent. They also determine the default height
		 * of the <code>ui5-toolbar</code>.
		 * @type {ToolbarDesign}
		 * @public
		 */
		design: {
			type: ToolbarDesign,
			defaultValue: ToolbarDesign.Solid,
		},

		/**
		 * Defines the visual style of the <code>ui5-toolbar</code>.
		 * Available options are: <code>Standard</code> and <code>Clear</code>.
		 * <br><br>
		 * <b>Note:</b> The visual styles are theme dependent.
		 *
		 * @type {ToolbarStyle}
		 * @public
		 */
		toolbarStyle: {
			type: ToolbarStyle,
			defaultValue: ToolbarStyle.Standard,
		},
	},
};

/**
 *
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toolbar</code> component is a horizontal container, most commonly used
 * to display buttons, labels, selects, and various other input components.
 *
 * <h3>Usage</h3>
 *
 * You can add horizontal space between the <code>ui5-toolbar</code> items, using the
 * <code>ui5-toolbarspacer</code>.
 * For example, it can be useful if you want to push an item to the edge of the
 * <code>ui5-toolbar</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Toolbar";</code>
 * <br>
 * <b>Note:</b> This also includes the <code>ui5-toolbar-spacer</code> Web Component.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Toolbar
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-toolbar
 * @appenddocs ToolbarSpacer
 * @public
 */
class Toolbar extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return ToolbarRenderer;
	}

	static get calculateTemplateContext() {
		return ToolbarTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Toolbar.define();
});

export default Toolbar;
