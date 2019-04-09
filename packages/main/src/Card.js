import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import URI from "@ui5/webcomponents-base/src/types/URI";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import { isIconURI } from "@ui5/webcomponents-base/src/IconPool";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents";
import Function from "@ui5/webcomponents-base/src/types/Function";
import CardRenderer from "./build/compiled/CardRenderer.lit";
import Icon from "./Icon";

// Styles
import cardCss from "./themes-next/Card.css";

addCustomCSS("ui5-card", "sap_fiori_3", cardCss);
addCustomCSS("ui5-card", "sap_belize", cardCss);
addCustomCSS("ui5-card", "sap_belize_hcb", cardCss);

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

		/**
		 * Defines the header of the <code>ui5-card</code>.
		 * If not given standart card header will be applied.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 * @since 0.10.0
		 */
		header: {
			type: HTMLElement,
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

		_headerActive: {
			type: Boolean,
		},

		_headerClick: {
			type: Function,
		},

		_headerKeydown: {
			type: Function,
		},

		_headerKeyup: {
			type: Function,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Fired when the <code>ui5-card</code> header is pressed
		 * by click/tap or by using the Enter or Space key.
		 *
		 * @event
		 * @public
		 * @since 0.10.0
		 */
		headerPress: {},
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
	constructor() {
		super();

		this._headerClick = this.headerClick.bind(this);
		this._headerKeydown = this.headerKeydown.bind(this);
		this._headerKeyup = this.headerKeyup.bind(this);
	}

	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CardRenderer;
	}

	static calculateTemplateContext(state) {
		const hasAvatar = !!state.avatar;
		const icon = hasAvatar && isIconURI(state.avatar);
		const image = hasAvatar && !icon;
		const hasContent = !!state.content.length;

		return {
			icon,
			image,
			ctr: state,
			renderIcon: state.icon && !state.image,
			classes: {
				main: {
					"sapFCard": true,
					"sapFCardNoContent": !hasContent,
				},
				header: {
					"sapFCardHeader": true,
					"sapFCardHeaderActive": state._headerActive,
				},
			},
		};
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}

	headerClick() {
		this.fireEvent("headerPress");
	}

	headerKeydown(event) {
		const enter = isEnter(event);
		const space = isSpace(event);

		this._headerActive = enter || space;

		if (enter) {
			this.fireEvent("headerPress");
			return;
		}

		if (space) {
			event.preventDefault();
		}
	}

	headerKeyup(event) {
		const space = isSpace(event);

		this._headerActive = false;

		if (space) {
			this.fireEvent("headerPress");
		}
	}
}

Bootstrap.boot().then(_ => {
	Card.define();
});

export default Card;
