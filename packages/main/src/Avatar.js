import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import encodeCSS from "@ui5/webcomponents-base/dist/util/encodeCSS.js";

import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
// Template
import AvatarTemplate from "./generated/templates/AvatarTemplate.lit.js";

import { AVATAR_TOOLTIP } from "./generated/i18n/i18n-defaults.js";

// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";

import Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarShape from "./types/AvatarShape.js";
import AvatarFitType from "./types/AvatarFitType.js";
import AvatarBackgroundColor from "./types/AvatarBackgroundColor.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-avatar",
	languageAware: true,
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
		 * Defines the source path to the desired image.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		image: {
			type: String,
		},

		/**
		 * Defines the name of the UI5 Icon, that would be displayed.
		 * <br>
		 * <b>Note:</b> If <code>image</code> is set, the property would be ignored.
		 * <br>
		 * <b>Note:</b> You should import the desired icon first, then use its name as "icon".
		 * <br><br>
		 * import "@ui5/webcomponents-icons/dist/{icon_name}.js"
		 * <br>
		 * <pre>&lt;ui5-avatar icon-src="employee"></pre>
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
		 * Up to two Latin letters can be displayed as initials in a <code>ui5-avatar</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		initials: {
			type: String,
		},

		/**
		 * Defines the shape of the <code>ui5-avatar</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Circle</code></li>
		 * <li><code>Square</code></li>
		 * <ul>
		 * @type {AvatarShape}
		 * @defaultvalue "Circle"
		 * @public
		 */
		shape: {
			type: AvatarShape,
			defaultValue: AvatarShape.Circle,
		},

		/**
		 * Defines predefined size of the <code>ui5-avatar</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>XS</code></li>
		 * <li><code>S</code></li>
		 * <li><code>M</code></li>
		 * <li><code>L</code></li>
		 * <li><code>XL</code></li>
		 * <ul>
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
		 * Defines the fit type of the desired image.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Cover</code></li>
		 * <li><code>Contain</code></li>
		 * <ul>
		 * @type {AvatarFitType}
		 * @defaultvalue "Cover"
		 * @public
		 */
		imageFitType: {
			type: AvatarFitType,
			defaultValue: AvatarFitType.Cover,
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
		 * <ul>
		 * @type {AvatarBackgroundColor}
		 * @defaultvalue "Accent6"
		 * @public
		 */
		backgroundColor: {
			type: AvatarBackgroundColor,
			defaultValue: AvatarBackgroundColor.Accent6,
		},

		/**
		 * @private
		 */
		_backgroundColor: {
			type: String,
			defaultValue: AvatarBackgroundColor.Accent6,
		},

		/**
		 * Defines the text alternative of the <code>ui5-avatar</code>.
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

		_tabIndex: {
			type: String,
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {
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
		return this.getAttribute("background-color") || this._backgroundColor;
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

	get styles() {
		return {
			img: {
				"background-image": `url("${encodeCSS(this.image)}")`,
			},
		};
	}

	_onclick(event) {
		event.isMarked = "avatar";
		if (this.interactive) {
			event.preventDefault();
			// Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown
			this.fireEvent("click");
		}
	}

	_onkeydown(event) {
		if (this.interactive && isEnter(event)) {
			this.fireEvent("click");
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
}

Avatar.define();

export default Avatar;
