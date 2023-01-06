import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import LinkDesign from "./types/LinkDesign.js";
import WrappingType from "./types/WrappingType.js";

// Template
import LinkRederer from "./generated/templates/LinkTemplate.lit.js";

// @ts-ignore
import { LINK_SUBTLE, LINK_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import linkCss from "./generated/themes/Link.css.js";

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
 * @alias sap.ui.webc.main.Link
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-link
 * @public
 */
@customElement("ui5-link")
@languageAware
/**
 * Fired when the component is triggered either with a mouse/tap
 * or by using the Enter key.
 *
 * @event sap.ui.webc.main.Link#click
 * @public
 * @allowPreventDefault
 * @param {Boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {Boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {Boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {Boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 */
@event("click", {
	detail: {
		altKey: { type: Boolean },
		ctrlKey: { type: Boolean },
		metaKey: { type: Boolean },
		shiftKey: { type: Boolean },
	},
})
class Link extends UI5Element {
	/**
	 * Defines whether the component is disabled.
	 * <br><br>
	 * <b>Note:</b> When disabled, the click event cannot be triggered by the user.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Link.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the component href.
	 * <br><br>
	 * <b>Note:</b> Standard hyperlink behavior is supported.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Link.prototype.href
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	href!: string;

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
	 * @name sap.ui.webc.main.Link.prototype.target
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	target!: string;

	/**
	 * Defines the component design.
	 * <br><br>
	 * <b>Note:</b> Avaialble options are <code>Default</code>, <code>Subtle</code>, and <code>Emphasized</code>.
	 *
	 * @type {sap.ui.webc.main.types.LinkDesign}
	 * @name sap.ui.webc.main.Link.prototype.design
	 * @defaultvalue "Default"
	 * @public
	 */
	@property({ type: LinkDesign, defaultValue: LinkDesign.Default })
	design!: LinkDesign;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 * Available options are:
	 * <ul>
	 * <li><code>None</code> - The text will be truncated with an ellipsis.</li>
	 * <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.main.types.WrappingType}
	 * @name sap.ui.webc.main.Link.prototype.wrappingType
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: WrappingType;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Link.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the input
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Link.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the ARIA role of the component.
	 *
	 * <b>Note:</b> Use the "button" role in cases when navigation is not expected to occur and the href property is not defined.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Link.prototype.accessibleRole
	 * @defaultvalue "link"
	 * @public
	 * @since 1.9.0
	 */
	@property({ defaultValue: "link" })
	accessibleRole!: string;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * <ul>
	 * 		<li><code>expanded</code>: Indicates whether the anchor element, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *			<ul>
	 *				<li><code>true</code></li>
	 *				<li><code>false</code></li>
	 *			</ul>
	 * 		</li>
	 * 		<li><code>hasPopup</code>: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the anchor element. Accepts the following string values:
	 * 			<ul>
	 *				<li><code>Dialog</code></li>
	 *				<li><code>Grid</code></li>
	 *				<li><code>ListBox</code></li>
	 *				<li><code>Menu</code></li>
	 *				<li><code>Tree</code></li>
	 * 			</ul>
	 * 		</li>
	 * </ul>
	 * @type {object}
	 * @name sap.ui.webc.main.Link.prototype.accessibilityAttributes
	 * @public
	 * @since 1.1.0
	 */
	@property({ type: Object })
	accessibilityAttributes!: object;

	@property({ noAttribute: true })
	_rel: string | undefined;

	@property({ noAttribute: true })
	_tabIndex!: string;

	/**
	 * Indicates if the element is on focus.
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean

	/**
	 * Defines the text of the component.
	 * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.Link.prototype.default
	 * @slot
	 * @public
	 */

	_dummyAnchor: HTMLAnchorElement;

	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._dummyAnchor = document.createElement("a");
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
		const needsNoReferrer = this.target !== "_self"
			&& this.href
			&& this._isCrossOrigin();

		this._rel = needsNoReferrer ? "noreferrer noopener" : undefined;
	}

	_isCrossOrigin() {
		const loc = window.location;

		this._dummyAnchor.href = this.href;

		return !(this._dummyAnchor.hostname === loc.hostname
			&& this._dummyAnchor.port === loc.port
			&& this._dummyAnchor.protocol === loc.protocol);
	}

	get effectiveTabIndex() {
		if (this._tabIndex) {
			return this._tabIndex;
		}
		return (this.disabled || !this.textContent?.length) ? "-1" : "0";
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get hasLinkType() {
		return this.design !== LinkDesign.Default;
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Subtle": LINK_SUBTLE,
			"Emphasized": LINK_EMPHASIZED,
		};
	}

	get linkTypeText() {
		return Link.i18nBundle.getText(Link.typeTextMappings()[this.design]);
	}

	get parsedRef() {
		return (this.href && this.href.length > 0) ? this.href : undefined;
	}

	get effectiveAccRole() {
		return this.accessibleRole.toLowerCase();
	}

	static async onDefine() {
		Link.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_onclick(e: MouseEvent | KeyboardEvent) {
		const {
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		} = e;

		e.stopImmediatePropagation();
		markEvent(e, "link");

		const executeEvent = this.fireEvent("click", {
			altKey,
			ctrlKey,
			metaKey,
			shiftKey,
		}, true);

		if (!executeEvent) {
			e.preventDefault();
		}
	}

	_onfocusin(e: FocusEvent) {
		markEvent(e, "link");
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e) && !this.href) {
			this._onclick(e);
		} else if (isSpace(e)) {
			e.preventDefault();
		}

		markEvent(e, "link");
	}

	_onkeyup(e: KeyboardEvent) {
		if (!isSpace(e)) {
			markEvent(e, "link");
			return;
		}

		this._onclick(e);

		if (this.href && !e.defaultPrevented) {
			const customEvent = new MouseEvent("click");

			customEvent.stopImmediatePropagation();
			this.getDomRef()!.dispatchEvent(customEvent);
		}
	}
}

Link.define();

export default Link;
