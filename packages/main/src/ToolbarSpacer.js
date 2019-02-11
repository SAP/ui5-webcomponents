import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";

// Styles
import spacerBelize from "./themes/sap_belize/ToolbarSpacer.less";
import spacerBelizeHcb from "./themes/sap_belize_hcb/ToolbarSpacer.less";
import spacerFiori3 from "./themes/sap_fiori_3/ToolbarSpacer.less";

ShadowDOM.registerStyle("sap_belize", "ToolbarSpacer.css", spacerBelize);
ShadowDOM.registerStyle("sap_belize_hcb", "ToolbarSpacer.css", spacerBelizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "ToolbarSpacer.css", spacerFiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-toolbar-spacer",
	noShadowDOM: true,
	properties: /** @lends  sap.ui.webcomponents.main.ToolbarSpacer.prototype */ {

	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Adds horizontal space between the items used within a <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ToolbarSpacer
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-toolbar-spacer
 * @public
 */
class ToolbarSpacer extends WebComponent {
	static get metadata() {
		return metadata;
	}
}

Core.boot().then(_ => {
	ToolbarSpacer.define();
});

export default ToolbarSpacer;
