import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";

import TokenRenderer from "./build/compiled/TokenRenderer.lit.js";

// Styles
import styles from "./themes/Token.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

import { isBackSpace, isEnter, isSpace, isDelete } from "@ui5/webcomponents-base/src/events/PseudoEvents";

/**
 * @public
 */
const metadata = {
	tag: "ui5-token",
	defaultSlot: "description",
	usesNodeText: true,
	slots: /** @lends sap.ui.webcomponents.main.Token.prototype */ {},
	properties: /** @lends sap.ui.webcomponents.main.Token.prototype */ {
		selected: { type: Boolean },
		readonly: { type: Boolean },
		_handlers: { type: Object },
		_tabIndex: { type: String, defaultValue: "-1" },
	},
	events: /** @lends sap.ui.webcomponents.main.Token.prototype */ {
		delete: {
			detail: {
				backSpace: { type: Boolean },
				delete: { type: Boolean },
			}
		},
		select: {}
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
 * @public
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
			}
		};
	}

	static get styles() {
		return styles;
	}

	constructor() {
		super();

		this._handlers = {
			select: () => {
				this.fireEvent("select", {});
			},
			delete: () => {
				this.fireEvent("delete");
			},
			keydown: event => {
				const isBS = isBackSpace(event);
				const isD = isDelete(event)
				if (isBS || isD) {
					this.fireEvent("delete", {
						backSpace: isBS,
						delete: isD,
					});
				}

				if (isEnter(event) || isSpace(event)) {
					this.fireEvent("select", {});
				}
			}
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
