import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type { IAvatarGroupItem } from "./AvatarGroup.js";
// Template
import AvatarTemplate from "./generated/templates/AvatarTemplate.lit.js";

import { AVATAR_TOOLTIP } from "./generated/i18n/i18n-defaults.js";

// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";

import Icon from "./Icon.js";
import type AvatarSize from "./types/AvatarSize.js";
import type AvatarShape from "./types/AvatarShape.js";
import type AvatarColorScheme from "./types/AvatarColorScheme.js";

// Icon
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/alert.js";

type AvatarAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;

/**
 * @class
 * ### Overview
 *
 * An image-like component that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `interactive` property is set to true.
 * - [Shift] - If [Space] is pressed, pressing [Shift] releases the component without triggering the click event.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Avatar.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @implements {IAvatarGroupItem}
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
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @private
 * @since 1.0.0-rc.11
 */
@event("click", {
	bubbles: true,
})
class Avatar extends UI5Element implements ITabbable, IAvatarGroupItem {
	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines if the avatar is interactive (focusable and pressable).
	 *
	 * **Note:** This property won't have effect if the `disabled`
	 * property is set to `true`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Defines the name of the UI5 Icon, that will be displayed.
	 *
	 * **Note:** If `image` slot is provided, the property will be ignored.
	 *
	 * **Note:** You should import the desired icon first, then use its name as "icon".
	 *
	 * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
	 *
	 * `<ui5-avatar icon="employee">`
	 *
	 * **Note:** If no icon or an empty one is provided, by default the "employee" icon should be displayed.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the name of the fallback icon, which should be displayed in the following cases:
	 *
	 * 	- If the initials are not valid (more than 3 letters, unsupported languages or empty initials).
	 * 	- If there are three initials and they do not fit in the shape (e.g. WWW for some of the sizes).
	 * 	- If the image src is wrong.
	 *
	 * **Note:** If not set, a default fallback icon "employee" is displayed.
	 *
	 * **Note:** You should import the desired icon first, then use its name as "fallback-icon".
	 *
	 * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
	 *
	 * `<ui5-avatar fallback-icon="alert">`
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default "employee"
	 * @public
	 */
	@property()
	fallbackIcon = "employee";

	/**
	 * Defines the displayed initials.
	 *
	 * Up to three Latin letters can be displayed as initials.
	 * @default undefined
	 * @public
	 */
	@property()
	initials?: string;

	/**
	 * Defines the shape of the component.
	 * @default "Circle"
	 * @public
	 */
	@property()
	shape: `${AvatarShape}` = "Circle";

	/**
	 * Defines predefined size of the component.
	 * @default "S"
	 * @public
	 */
	@property()
	size: `${AvatarSize}` = "S";

	/**
	 * Defines the background color of the desired image.
	 * @default "Accent6"
	 * @public
	 */
	@property()
	colorScheme: `${AvatarColorScheme}` = "Accent6";

	/**
	 * @private
	 */
	@property()
	_colorScheme: `${AvatarColorScheme}` = "Accent6";

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.7
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following field is supported:
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * @public
	 * @since 2.0.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes: AvatarAccessibilityAttributes = {};

	@property({ noAttribute: true })
	forcedTabIndex?: string;

	@property({ type: Boolean })
	_hasImage = false;

	/**
	 * Receives the desired `<img>` tag
	 *
	 * **Note:** If you experience flickering of the provided image, you can hide the component until it is being defined with the following CSS:
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@slot({ type: HTMLElement, "default": true })
	image!: Array<HTMLElement>;

	/**
	 * Defines the optional badge that will be used for visual affordance.
	 *
	 * **Note:** While the slot allows for custom badges, to achieve
	 * the Fiori design, you can use the `ui5-tag` with `ui5-icon`
	 * in the corresponding `icon` slot, without text nodes.
	 * @public
	 * @since 1.7.0
	 */
	@slot()
	badge!: Array<HTMLElement>;

	_onclick?: (e: MouseEvent) => void;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		this._handleResizeBound = this.handleResize.bind(this);
	}

	get tabindex() {
		return this.forcedTabIndex || (this._interactive ? "0" : "-1");
	}

	/**
	 * Returns the effective avatar size.
	 * @default "S"
	 * @private
	 */
	get effectiveSize(): AvatarSize {
		// we read the attribute, because the "size" property will always have a default value
		return this.getAttribute("size") as AvatarSize;
	}

	/**
	 * Returns the effective background color.
	 * @default "Accent6"
	 * @private
	 */
	get еffectiveBackgroundColor(): AvatarColorScheme {
		// we read the attribute, because the "background-color" property will always have a default value
		return this.getAttribute("color-scheme") as AvatarColorScheme || this._colorScheme;
	}

	get _role() {
		return this._interactive ? "button" : "img";
	}

	get _ariaHasPopup() {
		return this._getAriaHasPopup();
	}

	get _interactive() {
		return this.interactive && !this.disabled;
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

	get fallBackIconDomRef(): Icon | null {
		return this.getDomRef()!.querySelector(".ui5-avatar-icon-fallback");
	}

	onBeforeRendering() {
		this._onclick = this._interactive ? this._onClickHandler.bind(this) : undefined;
	}

	async onAfterRendering() {
		await renderFinished();
		if (this.initials && !this.icon) {
			this._checkInitials();
		}
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}

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
		const avatar = this.getDomRef()!;
		const avatarInitials = avatar.querySelector(".ui5-avatar-initials");
		const validInitials = this.validInitials && avatarInitials && avatarInitials.scrollWidth <= avatar.scrollWidth;

		if (validInitials) {
			this.showInitials();
			return;
		}
		this.showFallbackIcon();
	}

	showFallbackIcon() {
		this.initialsContainer?.classList.add("ui5-avatar-initials-hidden");
		this.fallBackIconDomRef?.classList.remove("ui5-avatar-fallback-icon-hidden");
	}

	showInitials() {
		this.initialsContainer?.classList.remove("ui5-avatar-initials-hidden");
		this.fallBackIconDomRef?.classList.add("ui5-avatar-fallback-icon-hidden");
	}

	_onClickHandler(e: MouseEvent) {
		// prevent the native event and fire custom event to ensure the noConfict "ui5-click" is fired
		e.stopPropagation();
		this._fireClick();
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this._interactive) {
			return;
		}

		if (isEnter(e)) {
			this._fireClick();
		}

		if (isSpace(e)) {
			e.preventDefault(); // prevent scrolling
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this._interactive && !e.shiftKey && isSpace(e)) {
			this._fireClick();
		}
	}

	_fireClick() {
		this.fireDecoratorEvent("click");
	}

	_getAriaHasPopup() {
		const ariaHaspopup = this.accessibilityAttributes.hasPopup;

		if (!this._interactive || !ariaHaspopup) {
			return;
		}

		return ariaHaspopup;
	}
}

Avatar.define();

export default Avatar;
export type {
	AvatarAccessibilityAttributes,
};
