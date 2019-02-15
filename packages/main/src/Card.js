import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import IconPoolProxy from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/IconPoolProxy";
import CardRenderer from "./build/compiled/CardRenderer.lit";
import Icon from "./Icon";

// Styles
import belize from "./themes/sap_belize/Card.less";
import belizeHcb from "./themes/sap_belize_hcb/Card.less";
import fiori3 from "./themes/sap_fiori_3/Card.less";

ShadowDOM.registerStyle("sap_belize", "Card.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Card.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Card.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-card",
	styleUrl: [
		"Card.css",
	],
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the content of the <code>ui5-card</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the title displayed in the <code>ui5-card</code> header.
		 * @type {String}
		 * @public
		 */
		heading: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the subtitle displayed in the <code>ui5-card</code> header.
		 * @type {String}
		 * @public
		 */
		subtitle: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the status displayed in the <code>ui5-card</code> header.
		 * @type {String}
		 * @public
		 */
		status: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines image source URI or built-in icon source URI.
		 * </br></br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {URI}
		 * @public
		 */
		avatar: {
			type: URI,
			defaultValue: null,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card</code> is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
 * The header can be used through several properties, such as:
 * <code>heading</code>, <code>subtitle</code>, <code>status</code> and <code>avatar</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Card
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-card
 * @public
 */
class Card extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CardRenderer;
	}

	constructor(state) {
		super(state);
	}

	static calculateTemplateContext(state) {
		const hasAvatar = !!state.avatar;
		const icon = hasAvatar && IconPoolProxy.isIconURI(state.avatar);
		const image = hasAvatar && !icon;

		return {
			icon,
			image,
			ctr: state,
			renderIcon: state.icon && !state.image,
		};
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Card.define();
});

export default Card;
