import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
// Template
import AvatarTemplate from "./generated/templates/AvatarTemplate.lit.js";

import { AVATAR_TOOLTIP } from "./generated/i18n/i18n-defaults.js";

// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";

import Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarShape from "./types/AvatarShape.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-avatar",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {

		/**
		 * Defines if the avatar is interactive (focusable and pressable)
		 * @type {boolean}
		 * @defaultValue false
		 * @public
		 */
		interactive: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements is on focus
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Defines the name of the UI5 Icon, that would be displayed.
		 * <br>
		 * <b>Note:</b> If <code>image</code> slot is provided, the property would be ignored.
		 * <br>
		 * <b>Note:</b> You should import the desired icon first, then use its name as "icon".
		 * <br><br>
		 * import "@ui5/webcomponents-icons/dist/{icon_name}.js"
		 * <br>
		 * <pre>&lt;ui5-avatar icon="employee"></pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the displayed initials.
		 * <br>
		 * Up to two Latin letters can be displayed as initials.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		initials: {
			type: String,
		},

		/**
		 * Defines the shape of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Circle</code></li>
		 * <li><code>Square</code></li>
		 * </ul>
		 * @type {AvatarShape}
		 * @defaultvalue "Circle"
		 * @public
		 */
		shape: {
			type: AvatarShape,
			defaultValue: AvatarShape.Circle,
		},

		/**
		 * Defines predefined size of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>XS</code></li>
		 * <li><code>S</code></li>
		 * <li><code>M</code></li>
		 * <li><code>L</code></li>
		 * <li><code>XL</code></li>
		 * </ul>
		 * @type {AvatarSize}
		 * @defaultvalue "S"
		 * @public
		 */
		size: {
			type: AvatarSize,
			defaultValue: AvatarSize.S,
		},

		/**
		 * @private
		 */
		_size: {
			type: String,
			defaultValue: AvatarSize.S,
		},

		/**
		 * Defines the background color of the desired image.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Accent1</code></li>
		 * <li><code>Accent2</code></li>
		 * <li><code>Accent3</code></li>
		 * <li><code>Accent4</code></li>
		 * <li><code>Accent5</code></li>
		 * <li><code>Accent6</code></li>
		 * <li><code>Accent7</code></li>
		 * <li><code>Accent8</code></li>
		 * <li><code>Accent9</code></li>
		 * <li><code>Accent10</code></li>
		 * <li><code>Placeholder</code></li>
		 * </ul>
		 * @type {AvatarColorScheme}
		 * @defaultvalue "Accent6"
		 * @public
		 */
		colorScheme: {
			type: AvatarColorScheme,
			defaultValue: AvatarColorScheme.Accent6,
		},

		/**
		 * @private
		 */
		_colorScheme: {
			type: String,
			defaultValue: AvatarColorScheme.Accent6,
		},

		/**
		 * Defines the text alternative of the component.
		 * If not provided a default text alternative will be set, if present.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.7
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines the aria-haspopup value of the component when <code>interactive</code> property is <code>true</code>.
		 * <br><br>
		 * @type String
		 * @since 1.0.0-rc.15
		 * @protected
		 */
		ariaHaspopup: {
			type: String,
		},

		_tabIndex: {
			type: String,
			noAttribute: true,
		},

		_hasImage: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {
		/**
		 * Receives the desired <code>&lt;img&gt;</code> tag
		 *
		 * <b>Note:</b> If you experience flickering of the provided image, you can hide the component until it is being defined with the following CSS:
		 * <br /> <br />
		 * <code>
		 *		ui5-avatar:not(:defined) { <br />
		 *			&nbsp;visibility: hidden; <br />
		 *		} <br />
		 * </code>
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 * @since 1.0.0-rc.15
		 */
		"default": {
			propertyName: "image",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {
		/**
		* Fired on mouseup, space and enter if avatar is interactive
		*
		* @event
		* @private
		* @since 1.0.0-rc.11
		*/
		click: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An image-like control that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - Fires the <code>click</code> event if the <code>interactive</code> property is set to true.</li>
 * <li>[SHIFT] - If [SPACE] or [ENTER],[RETURN] is pressed, pressing [SHIFT] releases the component without triggering the click event.</li>
 * </ul>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Avatar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Avatar
 * @extends UI5Element
 * @tagname ui5-avatar
 * @since 1.0.0-rc.6
 * @implements sap.ui.webcomponents.main.IAvatar
 * @public
 */
class Avatar extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return AvatarCss;
	}

	static get template() {
		return AvatarTemplate;
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	get tabindex() {
		return this._tabIndex || (this.interactive ? "0" : "-1");
	}

	/**
	 * Returns the effective avatar size.
	 * @readonly
	 * @type { String }
	 * @defaultValue "S"
	 * @private
	 */
	get _effectiveSize() {
		// we read the attribute, because the "size" property will always have a default value
		return this.getAttribute("size") || this._size;
	}

	/**
	 * Returns the effective background color.
	 * @readonly
	 * @type { String }
	 * @defaultValue "Accent6"
	 * @private
	 */
	get _effectiveBackgroundColor() {
		// we read the attribute, because the "background-color" property will always have a default value
		return this.getAttribute("_color-scheme") || this._colorScheme;
	}

	get _role() {
		return this.interactive ? "button" : undefined;
	}

	get _ariaHasPopup() {
		return this._getAriaHasPopup();
	}

	get validInitials() {
		const validInitials = /^[a-zA-Z]{1,2}$/;

		if (this.initials && validInitials.test(this.initials)) {
			return this.initials;
		}

		return null;
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		return this.i18nBundle.getText(AVATAR_TOOLTIP) || undefined;
	}

	get hasImage() {
		this._hasImage = !!this.image.length;
		return this._hasImage;
	}

	_onclick(event) {
		if (this.interactive) {
			// prevent the native event and fire custom event to ensure the noConfict "ui5-click" is fired
			event.stopPropagation();
			this.fireEvent("click");
		}
	}

	_onkeydown(event) {
		if (!this.interactive) {
			return;
		}

		if (isEnter(event)) {
			this.fireEvent("click");
		}

		if (isSpace(event)) {
			event.preventDefault(); // prevent scrolling
		}
	}

	_onkeyup(event) {
		if (this.interactive && !event.shiftKey && isSpace(event)) {
			this.fireEvent("click");
		}
	}

	_onfocusout() {
		this.focused = false;
	}

	_onfocusin() {
		if (this.interactive) {
			this.focused = true;
		}
	}

	_getAriaHasPopup() {
		if (!this.interactive || this.ariaHaspopup === "") {
			return;
		}

		return this.ariaHaspopup;
	}
}

Avatar.define();

export default Avatar;
