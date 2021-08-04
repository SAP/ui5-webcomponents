import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getAriaLabelledByTexts } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import LinkDesign from "./types/LinkDesign.js";
import WrappingType from "./types/WrappingType.js";

// Template
import LinkRederer from "./generated/templates/LinkTemplate.lit.js";

import { LINK_SUBTLE, LINK_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import linkCss from "./generated/themes/Link.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-link",
	languageAware: true,
	properties: /** @lends  sap.ui.webcomponents.main.Link.prototype */  {

		/**
		 * Defines whether the component is disabled.
		 * <br><br>
		 * <b>Note:</b> When disabled, the component cannot be triggered by the user.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the component href.
		 * <br><br>
		 * <b>Note:</b> Standard hyperlink behavior is supported.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		href: {
			type: String,
		},

		/**
		 * Defines the component target.
		 * <br><br>
		 * <b>Notes:</b>
		 *
		 * <ul>
		 * <li><code>_self</code></li>
		 * <li><code>_top</code></li>
		 * <li><code>_blank</code></li>
		 * <li><code>_parent</code></li>
		 * <li><code>_search</code></li>
		 * </ul>
		 *
		 * <b>This property must only be used when the <code>href</code> property is set.</b>
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		target: {
			type: String,
		},

		/**
		 * Defines the component design.
		 * <br><br>
		 * <b>Note:</b> Avaialble options are <code>Default</code>, <code>Subtle</code>, and <code>Emphasized</code>.
		 *
		 * @type {LinkDesign}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: LinkDesign,
			defaultValue: LinkDesign.Default,
		},

		/**
		 * Defines how the text of a component will be displayed when there is not enough space.
		 * Available options are:
		 * <ul>
		 * <li><code>None</code> - The text will be truncated with an ellipsis.</li>
		 * <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
		 * </ul>
		 *
		 * @type {WrappingType}
		 * @defaultvalue "None"
		 * @public
		 */
		wrappingType: {
			type: WrappingType,
			defaultValue: WrappingType.None,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the aria-haspopup value of the component.
		 *
		 * @type String
		 * @defaultvalue undefined
		 * @private
		 * @since 1.0.0-rc.15
		 */
		 ariaHaspopup: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the accessibility role of the component.
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.15
		 */
		 accessibleRole: {
			type: String,
		},

		_rel: {
			type: String,
			noAttribute: true,
		},

		_tabIndex: {
			type: String,
			noAttribute: true,
		},

		/**
		 * Indicates if the element is on focus.
		 * @private
		 */
		 focused: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Link.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Link.prototype */ {

		/**
		 * Fired when the component is triggered either with a mouse/tap
		 * or by using the Enter key.
		 *
		 * @event
		 * @public
		 * @native
		 */
		click: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-link</code> is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
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
 * <code>Subtle</code> or the more important ones as <code>Emphasized</code>,
 * by using the <code>design</code> property.
 * <br><br>
 * If the <code>href</code> property is set, the link behaves as the HTML
 * anchor tag (<code>&lt;a&gt;&lt;a&#47;&gt;</code>) and opens the specified URL in the given target frame (<code>target</code> property).
 * To specify where the linked content is opened, you can use the <code>target</code> property.
 *
 * <h3>Responsive behavior</h3>
 *
 * If there is not enough space, the text of the <code>ui5-link</code> becomes truncated.
 * If the <code>wrappingType</code> property is set to <code>"Normal"</code>, the text is displayed
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
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
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

	_isCrossOrigin() {
		const loc = window.location;

		this._dummyAnchor.href = this.href;

		return !(this._dummyAnchor.hostname === loc.hostname
			&& this._dummyAnchor.port === loc.port
			&& this._dummyAnchor.protocol === loc.protocol);
	}

	get tabIndex() {
		if (this._tabIndex) {
			return this._tabIndex;
		}
		return (this.disabled || !this.textContent.length) ? "-1" : "0";
	}

	get ariaLabelText() {
		return getAriaLabelledByTexts(this);
	}

	get hasLinkType() {
		return this.design !== LinkDesign.Default;
	}

	static typeTextMappings() {
		return {
			"Subtle": LINK_SUBTLE,
			"Emphasized": LINK_EMPHASIZED,
		};
	}

	get linkTypeText() {
		return this.i18nBundle.getText(Link.typeTextMappings()[this.design]);
	}

	get parsedRef() {
		return (this.href && this.href.length > 0) ? this.href : undefined;
	}

	get effectiveAccRole() {
		return this.accessibleRole || "link";
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	_onclick(event) {
		event.isMarked = "link";
	}

	_onfocusin(event) {
		event.isMarked = "link";
		this.focused = true;
	}

	_onfocusout(event) {
		this.focused = false;
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			const executeEvent = this.fireEvent("click", null, true);

			if (executeEvent) {
				event.preventDefault();
				this.href && window.open(this.href, this.target);
			}
		} else if (isSpace(event)) {
			event.preventDefault();
		}

		event.isMarked = "link";
	}

	_onkeyup(event) {
		if (!isSpace(event)) {
			event.isMarked = "link";
			return;
		}

		event.preventDefault();

		const executeEvent = this.fireEvent("click", null, true);
		if (executeEvent) {
			this.href && window.open(this.href, this.target);
		}
	}
}

Link.define();

export default Link;
