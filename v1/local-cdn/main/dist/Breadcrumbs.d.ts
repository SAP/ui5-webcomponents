import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import BreadcrumbsSeparatorStyle from "./types/BreadcrumbsSeparatorStyle.js";
import BreadcrumbsItem from "./BreadcrumbsItem.js";
import Link from "./Link.js";
import type { LinkClickEventDetail } from "./Link.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ListSelectionChangeEventDetail } from "./List.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
type BreadcrumbsItemClickEventDetail = {
    item: BreadcrumbsItem;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
};
/**
 * @class
 *
 * ### Overview
 * Enables users to navigate between items by providing a list of links to previous steps in the user's navigation path.
 * It helps the user to be aware of their location within the application and allows faster navigation.
 *
 * The last three steps can be accessed as links directly, while the remaining links prior to them are available
 * in a drop-down menu.
 *
 * You can choose the type of separator to be used from a number of predefined options.
 *
 * ### Keyboard Handling
 * The `ui5-breadcrumbs` provides advanced keyboard handling.
 *
 * - [F4], [Alt] + [Up], [Alt] + [Down], [Space], or [Enter] - If the dropdown arrow is focused - opens/closes the drop-down.
 * - [Space],[Enter] - Activates the focused item and triggers the `item-click` event.
 * - [Escape] - Closes the drop-down.
 * - [Left] - If the drop-down is closed - navigates one item to the left.
 * - [Right] - If the drop-down is closed - navigates one item to the right.
 * - [Up] - If the drop-down is open - moves focus to the next item.
 * - [Down] - If the drop-down is open - moves focus to the previous item.
 * - [Home] - Navigates to the first item.
 * - [End] - Navigates to the last item.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
declare class Breadcrumbs extends UI5Element {
    /**
     * Defines the visual appearance of the last BreadcrumbsItem.
     *
     * The Breadcrumbs supports two visual appearances for the last BreadcrumbsItem:
     * - "Standard" - displaying the last item as "current page" (bold and without separator)
     * - "NoCurrentPage" - displaying the last item as a regular BreadcrumbsItem, followed by separator
     * @default "Standard"
     * @public
    */
    design: `${BreadcrumbsDesign}`;
    /**
     * Determines the visual style of the separator between the breadcrumb items.
     * @default "Slash"
     * @public
     */
    separatorStyle: `${BreadcrumbsSeparatorStyle}`;
    /**
     * Holds the number of items in the overflow.
     * @default 0
     * @private
     */
    _overflowSize: number;
    /**
     * Defines the component items.
     *
     * **Note:** Use the `ui5-breadcrumbs-item` component to define the desired items.
     * @public
     */
    items: Array<BreadcrumbsItem>;
    _itemNavigation: ItemNavigation;
    _onResizeHandler: ResizeObserverCallback;
    _breadcrumbItemWidths: WeakMap<BreadcrumbsItem, number>;
    _dropdownArrowLinkWidth: number;
    responsivePopover?: ResponsivePopover;
    static i18nBundle: I18nBundle;
    constructor();
    onInvalidation(changeInfo: ChangeInfo): void;
    _getItems(): BreadcrumbsItem[];
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _initItemNavigation(): void;
    /**
     * Obtains the items for navigation via keyboard
     * @private
     */
    _getFocusableItems(): ITabbable[];
    _onfocusin(e: FocusEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * Caches the space required to render the content
     * @private
     */
    _cacheWidths(): void;
    _updateOverflow(): void;
    _getElementWidth(element: HTMLElement): number;
    _getTotalContentWidth(): number;
    _onLinkPress(e: CustomEvent<LinkClickEventDetail>): void;
    _onOverflowListItemSelect(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    _respPopover(): Promise<ResponsivePopover>;
    _toggleRespPopover(): Promise<void>;
    _closeRespPopover(): void;
    _openRespPopover(): Promise<void>;
    _isItemVisible(item: BreadcrumbsItem): string | boolean;
    _hasVisibleContent(item: BreadcrumbsItem): string | boolean;
    _preprocessItems(): void;
    _getItemPositionText(position: number, size: number): string;
    _getItemAccessibleName(item: BreadcrumbsItem, position: number, size: number): string;
    get _visibleItems(): BreadcrumbsItem[];
    get _endsWithCurrentPageItem(): boolean;
    get _isDropdownArrowFocused(): boolean;
    /**
     * Returns the maximum allowed count of items in the overflow
     * with respect to the UX requirement to never overflow the last visible item
     */
    get _maxAllowedOverflowSize(): number;
    /**
     * Getter for the interactive element that opens the overflow
     * @private
     */
    get _dropdownArrowLink(): Link;
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
     */
    get _overflowItemsData(): BreadcrumbsItem[];
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
     */
    get _linksData(): BreadcrumbsItem[];
    /**
     * Getter for the list of links corresponding to the abstract breadcrumb items
     */
    get _links(): Link[];
    get _isOverflowEmpty(): boolean;
    get _ariaHasPopup(): "listbox" | undefined;
    get _isPickerOpen(): boolean;
    get _accessibleNameText(): string;
    get _dropdownArrowAccessibleNameText(): string;
    get _cancelButtonText(): string;
    static onDefine(): Promise<void>;
}
export default Breadcrumbs;
export type { BreadcrumbsItemClickEventDetail, };
