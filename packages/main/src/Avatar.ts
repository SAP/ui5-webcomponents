import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
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

// Icon
import "@ui5/webcomponents-icons/dist/employee.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An image-like component that has different display options for representing images and icons
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
 * <li>[SHIFT] - If [SPACE] is pressed, pressing [SHIFT] releases the component without triggering the click event.</li>
 * </ul>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Avatar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Avatar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-avatar
 * @since 1.0.0-rc.6
 * @implements sap.ui.webc.main.IAvatar
 * @public
 */
@customElement({
	tag: "ui5-avatar",
	languageAware: true,
	renderer: litRender,
	styles: AvatarCss,
	template: AvatarTemplate,
	dependencies: [Icon],
})
/**
* Fired on mouseup, space and enter if avatar is interactive
*
* @event
* @private
* @since 1.0.0-rc.11
*/
@event("click")
class Avatar extends UI5Element implements ITabbable {
	/**
	 * Defines if the avatar is interactive (focusable and pressable).
	 * @type {boolean}
	 * @name sap.ui.webc.main.Avatar.prototype.interactive
	 * @defaultValue false
	 * @public
	 */
	@property({ type: Boolean })
	interactive!: boolean;

	/**
	 * Indicates if the elements is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Defines the name of the UI5 Icon, that will be displayed.
	 * <br>
	 * <b>Note:</b> If <code>image</code> slot is provided, the property will be ignored.
	 * <br>
	 * <b>Note:</b> You should import the desired icon first, then use its name as "icon".
	 * <br><br>
	 * import "@ui5/webcomponents-icons/dist/{icon_name}.js"
	 * <br>
	 * <pre>&lt;ui5-avatar icon="employee"></pre>
	 * <br>
	 * <b>Note:</b> If no icon or an empty one is provided, by default the "employee" icon should be displayed.
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 * @type {string}
	 * @name sap.ui.webc.main.Avatar.prototype.icon
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the displayed initials.
	 * <br>
	 * Up to three Latin letters can be displayed as initials.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Avatar.prototype.initials
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	initials!: string;

	/**
	 * Defines the shape of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Circle</code></li>
	 * <li><code>Square</code></li>
	 * </ul>
	 * @type {sap.ui.webc.main.types.AvatarShape}
	 * @name sap.ui.webc.main.Avatar.prototype.shape
	 * @defaultvalue "Circle"
	 * @public
	 */
	@property({ type: AvatarShape, defaultValue: AvatarShape.Circle })
	shape!: `${AvatarShape}`;

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
	 * @type {sap.ui.webc.main.types.AvatarSize}
	 * @name sap.ui.webc.main.Avatar.prototype.size
	 * @defaultvalue "S"
	 * @public
	 */
	@property({ type: AvatarSize, defaultValue: AvatarSize.S })
	size!: `${AvatarSize}`;

	/**
	 * @private
	 */
	@property({ type: AvatarSize, defaultValue: AvatarSize.S })
	_size!: AvatarSize;

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
	 * @type {sap.ui.webc.main.types.AvatarColorScheme}
	 * @name sap.ui.webc.main.Avatar.prototype.colorScheme
	 * @defaultvalue "Accent6"
	 * @public
	 */
	@property({ type: AvatarColorScheme, defaultValue: AvatarColorScheme.Accent6 })
	colorScheme!: `${AvatarColorScheme}`;

	/**
	 * @private
	 */
	@property({ type: AvatarColorScheme, defaultValue: AvatarColorScheme.Accent6 })
	_colorScheme!: AvatarColorScheme;

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Avatar.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.7
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the aria-haspopup value of the component when <code>interactive</code> property is <code>true</code>.
	 * <br><br>
	 * @type String
	 * @since 1.0.0-rc.15
	 * @protected
	 */
	@property()
	ariaHaspopup!: string;

	@property({ noAttribute: true })
	_tabIndex!: string;

	@property({ type: Boolean })
	_hasImage!: boolean;

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
	 * @name sap.ui.webc.main.Avatar.prototype.default
	 * @slot image
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@slot({ type: HTMLElement, "default": true })
	image!: Array<HTMLElement>;

	/**
	 * Defines the optional badge that will be used for visual affordance.
	 * <b>Note:</b> While the slot allows for custom badges, to achieve
	 * the Fiori design, please use <code>ui5-badge</code> with <code>ui5-icon</code>
	 * in the corresponding <code>icon</code> slot, without text nodes.
	 * <br><br>
	 * Example:
	 * <br><br>
	 * &lt;ui5-avatar><br>
	 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-badge slot="badge"><br>
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-icon slot="icon" name="employee">&lt;/ui5-icon><br>
	 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;/ui5-badge><br>
	 * &lt;/ui5-avatar>
	 * <br><br>
	 * <ui5-avatar initials="AB" color-scheme="Accent1">
	 * <ui5-badge slot="badge">
	 * <ui5-icon slot="icon" name="accelerated"></ui5-icon>
	 * </ui5-badge>
	 * </ui5-avatar>
	 *
	 * @type {HTMLElement}
	 * @name sap.ui.webc.main.Avatar.prototype.badge
	 * @slot badge
	 * @public
	 * @since 1.7.0
	 */
	@slot()
	badge!: Array<HTMLElement>;

	_onclick?: (e: MouseEvent) => void;
	static i18nBundle: I18nBundle;
	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		this._handleResizeBound = this.handleResize.bind(this);
	}

	static async onDefine() {
		Avatar.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get tabindex() {
		return this._tabIndex || (this.interactive ? "0" : "-1");
	}

	/**
	 * Returns the effective avatar size.
	 * @readonly
	 * @type {string}
	 * @defaultValue "S"
	 * @private
	 */
	get _effectiveSize(): AvatarSize {
		// we read the attribute, because the "size" property will always have a default value
		return this.getAttribute("size") as AvatarSize || this._size;
	}

	/**
	 * Returns the effective background color.
	 * @readonly
	 * @type {string}
	 * @defaultValue "Accent6"
	 * @private
	 */
	get _effectiveBackgroundColor() {
		// we read the attribute, because the "background-color" property will always have a default value
		return this.getAttribute("color-scheme") || this._colorScheme;
	}

	get _role() {
		return this.interactive ? "button" : undefined;
	}

	get _ariaHasPopup() {
		return this._getAriaHasPopup();
	}

	get validInitials() {
		// initials should consist of only 1,2 or 3 latin letters
		const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/,
			areInitialsValid = this.initials && validInitials.test(this.initials);

		if (areInitialsValid) {
			return this.initials;
		}

		return null;
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		return Avatar.i18nBundle.getText(AVATAR_TOOLTIP) || undefined;
	}

	get hasImage() {
		this._hasImage = !!this.image.length;
		return this._hasImage;
	}

	get initialsContainer(): HTMLObjectElement | null {
		return this.getDomRef()!.querySelector(".ui5-avatar-initials");
	 }

	onBeforeRendering() {
		this._onclick = this.interactive ? this._onClickHandler.bind(this) : undefined;
	}

	async onAfterRendering() {
		await renderFinished();
		if (this.initials && !this.icon) {
			this._checkInitials();
		}
	}

	onEnterDOM() {
		this.initialsContainer && ResizeHandler.register(this.initialsContainer,
			this._handleResizeBound);
	}

	onExitDOM() {
		this.initialsContainer && ResizeHandler.deregister(this.initialsContainer,
			this._handleResizeBound);
	}

	handleResize() {
		if (this.initials && !this.icon) {
			this._checkInitials();
		}
	}

	_checkInitials() {
		const avatar = this.getDomRef()!,
			avatarInitials = avatar.querySelector(".ui5-avatar-initials");
		// if there aren`t initalts set - the fallBack icon should be shown
		if (!this.validInitials) {
			avatarInitials!.classList.add("ui5-avatar-initials-hidden");
			return;
		}
		// if initials` width is bigger than the avatar, an icon should be shown inside the avatar
		avatarInitials && avatarInitials.classList.remove("ui5-avatar-initials-hidden");
		if (this.initials && this.initials.length === 3) {
			if (avatarInitials && avatarInitials.scrollWidth > avatar.scrollWidth) {
				avatarInitials.classList.add("ui5-avatar-initials-hidden");
			}
		}
	}

	_onClickHandler(e: MouseEvent) {
		// prevent the native event and fire custom event to ensure the noConfict "ui5-click" is fired
		e.stopPropagation();
		this.fireEvent("click");
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this.interactive) {
			return;
		}

		if (isEnter(e)) {
			this.fireEvent("click");
		}

		if (isSpace(e)) {
			e.preventDefault(); // prevent scrolling
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.interactive && !e.shiftKey && isSpace(e)) {
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
