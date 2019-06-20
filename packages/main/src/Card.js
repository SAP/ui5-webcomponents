import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import { isIconURI } from "@ui5/webcomponents-base/src/IconPool.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import getEffectiveRTL from "@ui5/webcomponents-base/src/util/getEffectiveRTL.js";
import CardTemplate from "./build/compiled/CardTemplate.lit.js";
import Icon from "./Icon.js";

// Styles
import cardCss from "./themes/Card.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-card",
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
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the subtitle displayed in the <code>ui5-card</code> header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		subtitle: {
			type: String,
		},

		/**
		 * Defines the status displayed in the <code>ui5-card</code> header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		status: {
			type: String,
		},

		/**
		 * Defines if the <code>ui5-card</code> header would be interactive,
		 * e.g gets hover effect, gets focused and <code>headerPress</code> event is fired, when it is pressed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		headerInteractive: {
			type: Boolean,
		},

		/**
		 * Defines image source URI or built-in icon font URI.
		 * </br></br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {string}
		 * @public
		 */
		avatar: {
			type: String,
		},

		_headerActive: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Fired when the <code>ui5-card</code> header is pressed
		 * by click/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event would be fired only if the <code>headerInteractive</code> property is set to true.
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
 * <h3>Keyboard handling</h3>
 * In case you enable <code>headerInteractive</cdoe> property, you can press the <code>ui5-card</code> header by Space and Enter keys.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Card
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-card
 * @public
 */
class Card extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return CardTemplate;
	}

	static get styles() {
		return cardCss;
	}

	get classes() {
		return {
			main: {
				"sapFCard": true,
				"sapFCardNoContent": !this.content.length,
			},
			header: {
				"sapFCardHeader": true,
				"sapFCardHeaderInteractive": this.headerInteractive,
				"sapFCardHeaderActive": this.headerInteractive && this._headerActive,
			},
		};
	}

	get icon() {
		return !!this.avatar && isIconURI(this.avatar);
	}

	get image() {
		return !!this.avatar && !this.icon;
	}

	get role() {
		return this.headerInteractive ? "button" : undefined;
	}

	get tabindex() {
		return this.headerInteractive ? "0" : undefined;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}

	_headerClick() {
		if (this.headerInteractive) {
			this.fireEvent("headerPress");
		}
	}

	_headerKeydown(event) {
		if (!this.headerInteractive) {
			return;
		}

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

	_headerKeyup(event) {
		if (!this.headerInteractive) {
			return;
		}

		const space = isSpace(event);

		this._headerActive = false;

		if (space) {
			this.fireEvent("headerPress");
		}
	}

	get rtl() {
		return getEffectiveRTL() ? "rtl" : undefined;
	}
}

Card.define();

export default Card;
