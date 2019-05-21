import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";
import LinkType from "./types/LinkType.js";

// Template
import LinkRederer from "./build/compiled/LinkRenderer.lit.js";
import LinkTemplateContext from "./LinkTemplateContext.js";

// Styles
import linkCss from "./themes/Link.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-link",
	properties: /** @lends  sap.ui.webcomponents.main.Link.prototype */  {

		/**
		 * Determines whether the <code>ui5-link</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> When disabled, the link cannot be triggered by the user.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the <code>ui5-link</code> target URI.
		 * <br><br>
		 * <b>Note:</b> Standard hyperlink behavior is supported.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		href: {
			type: URI,
			defaultValue: "",
		},

		/**
		 * Defines the <code>ui5-link</code> target.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul><li>Available options are the standard values: <code>_self</code>, <code>_top</code>,
		 * <code>_blank</code>, <code>_parent</code>, and <code>_search</code>.</li>
		 * <li>This property must only be used when the <code>href</code> property is set.</li></ul>
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		target: {
			type: String,
		},

		/**
		 * Defines the <code>ui5-link</code> type.
		 * <br><br>
		 * <b>Note:</b> Avaialble options are <code>Default</code>, <code>Subtle</code>, and <code>Emphasized</code>.
		 *
		 * @type {string}
		 * @defaultvalue "Default"
		 * @public
		 */
		type: {
			type: LinkType,
			defaultValue: LinkType.Default,
		},

		/**
		 * Defines whether the <code>ui5-link</code> text should wrap
		 * when there is no sufficient space.
		 * <br><br>
		 * <b>Note:</b> the text is truncated by default.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		wrap: {
			type: Boolean,
		},

		_rel: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Link.prototype */ {
		/**
		 * Defines the text of the <code>ui5-link</code>.
		 * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		text: {
			type: Node,
			multiple: true,
		},
	},
	defaultSlot: "text",
	events: /** @lends sap.ui.webcomponents.main.Link.prototype */ {

		/**
		 * Fired when the <code>ui5-link</code> is triggered either with a click/tap
		 * or by using the Space or Enter key.
		 *
		 * @event
		 * @public
		 */
		press: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-link</code> is a hyperlink component is used to navigate to other
 * apps and web pages or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *

 *
 * <h3>Usage</h3>
 *
 * You can set the <code>ui5-link</code> to be enabled or disabled.
 * <br><br>
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * <code>Subtle</code> or the more important ones as <code>Emphasized</code>
 * by using the <code>type</code> property.
 * <br><br>
 * If the <code>href</code> property is set, the link behaves as the basic HTML
 * anchor tag (<code><a></code>) and opens the specified URL in the given target frame (<code>target</code> property).
 * To specify where the linked content is opened, you can use the <code>target</code> property.
 *
 * <h3>Responsive behavior</h3>
 *
 * If there is not enough space, the text of the <code>ui5-link</code> becomes truncated.
 * If the <code>wrap</code> property is set to <code>true</code>, the text is displayed
 * on several lines instead of being truncated.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Link";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Link
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-link
 * @public
 */
class Link extends UI5Element {
	constructor() {
		super();
		this._dummyAnchor = document.createElement("a");
	}

	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return LinkRederer;
	}

	static get styles() {
		return linkCss;
	}


	onBeforeRendering() {
		const needsNoReferrer = this.target === "_blank"
			&& this.href
			&& this._isCrossOrigin();

		this._rel = needsNoReferrer ? "noreferrer" : undefined;
	}

	onclick(event) {
		if (this.disabled) {
			return;
		}

		const defaultPrevented = !this.fireEvent("press", {}, true);
		if (defaultPrevented) {
			event.preventDefault();
		}
	}

	onkeydown(event) {
		const eventKeyCode = event.keyCode;

		if (this.disabled) {
			return;
		}

		if (eventKeyCode === KeyCodes.SPACE) {
			event.preventDefault();
		}
	}

	onkeyup(event) {
		if (this.disabled) {
			return;
		}

		if (event.keyCode === KeyCodes.SPACE) {
			const defaultPrevented = !this.fireEvent("press", {}, true);
			if (defaultPrevented) {
				return;
			}

			// Simulate click event
			const oClickEvent = document.createEvent("MouseEvents");
			oClickEvent.initEvent("click" /* event type */, false/* no-bubbling */, true /* cancelable */);
			this.getDomRef().dispatchEvent(oClickEvent);
		}
	}

	_isCrossOrigin() {
		const loc = window.location;

		this._dummyAnchor.href = this.href;

		return !(this._dummyAnchor.hostname === loc.hostname
			&& this._dummyAnchor.port === loc.port
			&& this._dummyAnchor.protocol === loc.protocol);
	}

	static get calculateTemplateContext() {
		return LinkTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Link.define();
});

export default Link;
