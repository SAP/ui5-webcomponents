import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import HasPopup from "@ui5/webcomponents/dist/types/HasPopup.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import type { Timeout, ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type ShellBarItem from "./ShellBarItem.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
type ShellBarAccessibilityRoles = {
    logoRole?: string;
};
type ShellBarAccessibilityTexts = {
    logoTitle?: string;
    profileButtonTitle?: string;
};
type ShellBarAccessibilityAttributesValue = {
    expanded?: "true" | "false" | boolean;
    ariaHasPopup?: `${HasPopup}`;
};
type ShellBarAccessibilityAttributes = {
    notifications?: ShellBarAccessibilityAttributesValue;
    profile?: ShellBarAccessibilityAttributesValue;
    product?: ShellBarAccessibilityAttributesValue;
    search?: ShellBarAccessibilityAttributesValue;
    overflow?: ShellBarAccessibilityAttributesValue;
};
type ShellBarNotificationsClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarProfileClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarProductSwitchClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarLogoClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarCoPilotClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarMenuItemClickEventDetail = {
    item: HTMLElement;
};
type ShellBarSearchButtonEventDetail = {
    targetRef: HTMLElement;
    searchFieldVisible: boolean;
};
type ShellBarCoPilot = {
    animated?: boolean;
    animationValues?: string;
};
interface IShelBarItemInfo {
    id: string;
    icon?: string;
    text: string;
    priority: number;
    show: boolean;
    count?: string;
    custom?: boolean;
    title?: string;
    stableDomRef?: string;
    refItemid?: string;
    press: (e: MouseEvent) => void;
    styles: object;
    domOrder: number;
    classes: string;
    order?: number;
    profile?: boolean;
}
/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * ### Stable DOM Refs
 *
 * You can use the following stable DOM refs for the `ui5-shellbar`:
 *
 * - logo
 * - copilot
 * - notifications
 * - overflow
 * - profile
 * - product-switch
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
declare class ShellBar extends UI5Element {
    /**
     * Defines the `primaryTitle`.
     *
     * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
     * @default ""
     * @public
     */
    primaryTitle: string;
    /**
     * Defines the `secondaryTitle`.
     *
     * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
     * @default ""
     * @public
     */
    secondaryTitle: string;
    /**
     * Defines the `notificationsCount`,
     * displayed in the notification icon top-right corner.
     * @default ""
     * @public
     */
    notificationsCount: string;
    /**
     * Defines, if the notification icon would be displayed.
     * @default false
     * @public
     */
    showNotifications: boolean;
    /**
     * Defines, if the product switch icon would be displayed.
     * @default false
     * @public
     */
    showProductSwitch: boolean;
    /**
     * Defines, if the product CoPilot icon would be displayed.
     *
     * **Note:** By default the co-pilot is displayed as static SVG.
     * If you need an animated co-pilot, you can import the `"@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"` module as add-on feature.
     * @default false
     * @public
     */
    showCoPilot: boolean;
    /**
     * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
     *
     * **Note:** By default the Search Field is not displayed.
     * @default false
     * @public
     */
    showSearchField: boolean;
    /**
     * An object of strings that defines additional accessibility roles for further customization.
     *
     * It supports the following fields:
     *  - `logoRole`: the accessibility role for the `logo`
     * @default {}
     * @public
     * @since 1.6.0
     */
    accessibilityRoles: ShellBarAccessibilityRoles;
    /**
     * An object of strings that defines several additional accessibility texts
     * for even further customization.
     *
     * It supports the following fields:
     * - `profileButtonTitle`: defines the tooltip for the profile button
     * - `logoTitle`: defines the tooltip for the logo
     * @default {}
     * @public
     * @since 1.1.0
     */
    accessibilityTexts: ShellBarAccessibilityTexts;
    /**
     * An object of strings that defines several additional accessibility attribute values
     * for customization depending on the use case.
     *
     * It supports the following fields:
     *
     * - `expanded`: Indicates whether the anchor element, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
     *
     *	- `true`
     *	- `false`
     *
     * - `hasPopup`: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the anchor element. Accepts the following string values:
     *	- `Dialog`
     *	- `Grid`
     *	- `ListBox`
     *	- `Menu`
     *	- `Tree`
     * @default {}
     * @public
     * @since 1.10.0
     */
    accessibilityAttributes: ShellBarAccessibilityAttributes;
    /**
     * @private
     */
    breakpointSize: string;
    /**
     * @private
     */
    withLogo: boolean;
    _itemsInfo: Array<IShelBarItemInfo>;
    _menuPopoverItems: Array<HTMLElement>;
    _menuPopoverExpanded: boolean;
    _overflowPopoverExpanded: boolean;
    _fullWidthSearch: boolean;
    _coPilotPressed: boolean;
    _isXXLBreakpoint: boolean;
    /**
     * Defines the `ui5-shellbar` aditional items.
     *
     * **Note:**
     * You can use the `<ui5-shellbar-item></ui5-shellbar-item>`.
     * @public
     */
    items: Array<ShellBarItem>;
    /**
     * You can pass `ui5-avatar` to set the profile image/icon.
     * If no profile slot is set - profile will be excluded from actions.
     *
     * **Note:** We recommend not using the `size` attribute of `ui5-avatar` because
     * it should have specific size by design in the context of `ui5-shellbar` profile.
     * @since 1.0.0-rc.6
     * @public
     */
    profile: Array<HTMLElement>;
    /**
     * Defines the logo of the `ui5-shellbar`.
     * For example, you can use `ui5-avatar` or `img` elements as logo.
     * @since 1.0.0-rc.8
     * @public
     */
    logo: Array<HTMLElement>;
    /**
     * Defines the items displayed in menu after a click on the primary title.
     *
     * **Note:** You can use the  `<ui5-li></ui5-li>` and its ancestors.
     * @since 0.10
     * @public
     */
    menuItems: Array<ListItemBase>;
    /**
     * Defines the `ui5-input`, that will be used as a search field.
     * @public
     */
    searchField: Array<Input>;
    /**
     * Defines a `ui5-button` in the bar that will be placed in the beginning.
     * We encourage this slot to be used for a back or home button.
     * It gets overstyled to match ShellBar's styling.
     * @public
     */
    startButton: Array<IButton>;
    /**
     * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
     *
     * **Note:** If set, the `searchField` slot is not rendered.
     * @private
     */
    midContent: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    overflowPopover?: Popover | null;
    menuPopover?: Popover | null;
    _isInitialRendering: boolean;
    _defaultItemPressPrevented: boolean;
    menuItemsObserver: MutationObserver;
    coPilot?: ShellBarCoPilot;
    _coPilotIcon: string;
    _debounceInterval?: Timeout | null;
    _hiddenIcons?: Array<IShelBarItemInfo>;
    _handleResize: ResizeObserverCallback;
    _headerPress: () => Promise<void>;
    static get CO_PILOT_ICON_PRESSED(): string;
    static get CO_PILOT_ICON_UNPRESSED(): string;
    static get FIORI_3_BREAKPOINTS(): number[];
    static get FIORI_3_BREAKPOINTS_MAP(): Record<string, string>;
    constructor();
    _toggleCoPilotIcon(button: ToggleButton): void;
    _debounce(fn: () => Promise<void>, delay: number): void;
    _menuItemPress(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    _logoPress(): void;
    _menuPopoverBeforeOpen(): void;
    _menuPopoverAfterClose(): void;
    _overflowPopoverBeforeOpen(): void;
    _overflowPopoverAfterClose(): void;
    _logoKeyup(e: KeyboardEvent): void;
    _logoKeydown(e: KeyboardEvent): void;
    _fireCoPilotClick(e: Event): void;
    _coPilotClick(e: MouseEvent): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    /**
     * Closes the overflow area.
     * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
     * @public
     */
    closeOverflow(): void;
    _handleBarBreakpoints(): string;
    _handleSizeS(): void;
    _handleActionsOverflow(): IShelBarItemInfo[];
    _overflowActions(): void;
    _toggleActionPopover(): Promise<void>;
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleSearchIconPress(): void;
    _handleActionListClick(): Promise<void>;
    _handleCustomActionPress(e: MouseEvent): void;
    _handleOverflowPress(): void;
    _handleNotificationsPress(e: MouseEvent): void;
    _handleProfilePress(): void;
    _handleCancelButtonPress(): void;
    _handleProductSwitchPress(e: MouseEvent): void;
    /**
     * Returns the `logo` DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get logoDomRef(): HTMLElement | null;
    /**
     * Returns the `copilot` DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get copilotDomRef(): HTMLElement | null;
    /**
     * Returns the `notifications` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get notificationsDomRef(): HTMLElement | null;
    /**
     * Returns the `overflow` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get overflowDomRef(): HTMLElement | null;
    /**
     * Returns the `profile` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get profileDomRef(): HTMLElement | null;
    /**
     * Returns the `product-switch` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get productSwitchDomRef(): HTMLElement | null;
    /**
     * Returns all items that will be placed in the right of the bar as icons / dom elements.
     * @param showOverflowButton Determines if overflow button should be visible (not overflowing)
     */
    _getAllItems(showOverflowButton: boolean): IShelBarItemInfo[];
    _updateItemsInfo(newItems: Array<IShelBarItemInfo>): void;
    _updateClonedMenuItems(): void;
    _observeMenuItems(): void;
    _getResponsivePopover(): Promise<void>;
    _getOverflowPopover(): Promise<Popover | null>;
    _getMenuPopover(): Promise<Popover | null>;
    isIconHidden(name: string): boolean;
    get classes(): ClassMap;
    get styles(): {
        items: {
            notification: {
                order: string;
            };
            overflow: {
                order: string;
            };
            profile: {
                order: string;
            };
            product: {
                order: string;
            };
        };
        searchField: {
            display: string;
        };
    };
    get correctSearchFieldStyles(): "flex" | "none";
    get customItemsInfo(): IShelBarItemInfo[];
    get hasLogo(): boolean;
    get showLogoInMenuButton(): boolean;
    get showTitleInMenuButton(): boolean | "";
    get showMenuButton(): string | boolean;
    get popoverHorizontalAlign(): "Left" | "Right";
    get hasSearchField(): boolean;
    get hasMidContent(): boolean;
    get hasProfile(): boolean;
    get hasMenuItems(): boolean;
    get _shellbarText(): string;
    get _logoText(): string;
    get _copilotText(): string;
    get _notificationsText(): string;
    get _cancelBtnText(): string;
    get _showFullWidthSearch(): boolean;
    get _profileText(): string;
    get _productsText(): string;
    get _searchText(): string;
    get _overflowText(): string;
    get accInfo(): {
        notifications: {
            title: string;
            accessibilityAttributes: {
                hasPopup: string | null | undefined;
            };
        };
        profile: {
            title: string;
            accessibilityAttributes: {
                hasPopup: string | null | undefined;
            };
        };
        products: {
            title: string;
            accessibilityAttributes: {
                hasPopup: string | null | undefined;
            };
        };
        search: {
            title: string;
            accessibilityAttributes: {
                hasPopup: string | null | undefined;
                expanded: boolean;
            };
        };
        overflow: {
            title: string;
            accessibilityAttributes: {
                hasPopup: string | undefined;
                expanded: boolean;
            };
        };
    };
    get _notificationsHasPopup(): string | null | undefined;
    get _profileHasPopup(): string | null | undefined;
    get _productsHasPopup(): string | null | undefined;
    get _searchHasPopup(): string | null | undefined;
    get _overflowHasPopup(): string | undefined;
    get accLogoRole(): string;
    static onDefine(): Promise<void>;
}
export default ShellBar;
export type { ShellBarNotificationsClickEventDetail, ShellBarProfileClickEventDetail, ShellBarProductSwitchClickEventDetail, ShellBarLogoClickEventDetail, ShellBarCoPilotClickEventDetail, ShellBarMenuItemClickEventDetail, ShellBarAccessibilityAttributes, ShellBarAccessibilityRoles, ShellBarAccessibilityTexts, ShellBarSearchButtonEventDetail, };
