import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import { getTheme } from "@ui5/webcomponents-base/src/Configuration.js";
import {
	isBackSpace,
	isEnter,
	isSpace,
	isDelete,
} from "@ui5/webcomponents-base/src/events/PseudoEvents.js";

import TokenRenderer from "./build/compiled/TokenRenderer.lit.js";

// Styles
import styles from "./themes/Token.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-token",
	defaultSlot: "description",
	usesNodeText: true,
	slots: /** @lends sap.ui.webcomponents.main.Token.prototype */ {},
	properties: /** @lends sap.ui.webcomponents.main.Token.prototype */ {

		/**
		 * Defines whether the <code>ui5-token</code> is selected or not.
		 *
		 * @type {boolean}
		 * @public
		 */
		selected: { type: Boolean },

		/**
		 * Defines whether the <code>ui5-token</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-token</code> can not be deleted or selected,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @public
		 */
		readonly: { type: Boolean },

		_handlers: { type: Object },
		_tabIndex: { type: String, defaultValue: "-1" },
	},

	events: /** @lends sap.ui.webcomponents.main.Token.prototype */ {

		/**
		 * Fired when the backspace, delete or close icon of the token is pressed
		 *
		 * @event
		 * @param {boolean} backSpace indicates whether token is deleted by backspace key
		 * @param {boolean} delete indicates whether token is deleted by delete key
		 * @public
		 */
		"delete": {
			detail: {
				"backSpace": { type: Boolean },
				"delete": { type: Boolean },
			},
		},

		/**
		 * Fired when the a token is selected by user interaction with mouse, clicking space or enter
		 *
		 * @event
		 * @public
		 */
		select: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An entry posted on the timeline.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Token
 * @extends UI5Element
 * @tagname ui5-timeline
 * @usestextcontent
 * @private
 */
class Token extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TokenRenderer;
	}

	static get calculateTemplateContext() {
		return state => {
			return {
				ctr: state,
				iconURI: getTheme() === "sap_fiori_3" ? "sap-icon://decline" : "sap-icon://sys-cancel",
			};
		};
	}

	static get styles() {
		return styles;
	}

	constructor() {
		super();

		this._handlers = {
			"select": () => {
				this.fireEvent("select", {});
			},
			"delete": () => {
				this.fireEvent("delete");
			},
			"keydown": event => {
				const isBS = isBackSpace(event);
				const isD = isDelete(event);

				if (!this.readonly && (isBS || isD)) {
					this.fireEvent("delete", {
						backSpace: isBS,
						"delete": isD,
					});
				}

				if (isEnter(event) || isSpace(event)) {
					this.fireEvent("select", {});
				}
			},
		};
	}

	static async define(...params) {
		await Promise.all([]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Token.define();
});

export default Token;
