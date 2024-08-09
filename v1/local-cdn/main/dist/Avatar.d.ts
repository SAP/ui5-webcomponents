import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { IAvatarGroupItem } from "./AvatarGroup.js";
import Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarShape from "./types/AvatarShape.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/alert.js";
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
declare class Avatar extends UI5Element implements ITabbable, IAvatarGroupItem {
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines if the avatar is interactive (focusable and pressable).
     *
     * **Note:** This property won't have effect if the `disabled`
     * property is set to `true`.
     * @default false
     * @public
     */
    interactive: boolean;
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
     * @default ""
     * @public
     */
    icon: string;
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
     * @default ""
     * @public
     */
    fallbackIcon: string;
    /**
     * Defines the displayed initials.
     *
     * Up to three Latin letters can be displayed as initials.
     * @default ""
     * @public
     */
    initials: string;
    /**
     * Defines the shape of the component.
     * @default "Circle"
     * @public
     */
    shape: `${AvatarShape}`;
    /**
     * Defines predefined size of the component.
     * @default "S"
     * @public
     */
    size: `${AvatarSize}`;
    /**
     * @private
     */
    _size: AvatarSize;
    /**
     * Defines the background color of the desired image.
     * @default "Accent6"
     * @public
     */
    colorScheme: `${AvatarColorScheme}`;
    /**
     * @private
     */
    _colorScheme: AvatarColorScheme;
    /**
     * Defines the text alternative of the component.
     * If not provided a default text alternative will be set, if present.
     * @default ""
     * @public
     * @since 1.0.0-rc.7
     */
    accessibleName: string;
    /**
     * Defines the aria-haspopup value of the component when `interactive` property is `true`.
     * @since 1.0.0-rc.15
     * @protected
     */
    ariaHaspopup: string;
    forcedTabIndex: string;
    _hasImage: boolean;
    /**
     * Receives the desired `<img>` tag
     *
     * **Note:** If you experience flickering of the provided image, you can hide the component until it is being defined with the following CSS:
     * @public
     * @since 1.0.0-rc.15
     */
    image: Array<HTMLElement>;
    /**
     * Defines the optional badge that will be used for visual affordance.
     *
     * **Note:** While the slot allows for custom badges, to achieve
     * the Fiori design, please use `ui5-badge` with `ui5-icon`
     * in the corresponding `icon` slot, without text nodes.
     * @public
     * @since 1.7.0
     */
    badge: Array<HTMLElement>;
    _onclick?: (e: MouseEvent) => void;
    static i18nBundle: I18nBundle;
    _handleResizeBound: ResizeObserverCallback;
    constructor();
    static onDefine(): Promise<void>;
    get tabindex(): string;
    /**
     * Returns the effective avatar size.
     * @default "S"
     * @private
     */
    get effectiveSize(): AvatarSize;
    /**
     * Returns the effective background color.
     * @default "Accent6"
     * @private
     */
    get еffectiveBackgroundColor(): AvatarColorScheme;
    get _role(): "button" | "img";
    get _ariaHasPopup(): string | undefined;
    get _fallbackIcon(): string;
    get _interactive(): boolean;
    get validInitials(): string | null;
    get accessibleNameText(): string | undefined;
    get hasImage(): boolean;
    get initialsContainer(): HTMLObjectElement | null;
    get fallBackIconDomRef(): Icon | null;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    onEnterDOM(): void;
    onExitDOM(): void;
    handleResize(): void;
    _checkInitials(): void;
    showFallbackIcon(): void;
    showInitials(): void;
    _onClickHandler(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _fireClick(): void;
    _getAriaHasPopup(): string | undefined;
}
export default Avatar;
