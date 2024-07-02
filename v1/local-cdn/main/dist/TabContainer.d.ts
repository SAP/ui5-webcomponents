import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { StyleData } from "@ui5/webcomponents-base/dist/types.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type { SetDraggedElementFunction } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Button from "./Button.js";
import DropIndicator from "./DropIndicator.js";
import type Tab from "./Tab.js";
import type { ListItemClickEventDetail, ListMoveEventDetail } from "./List.js";
import type CustomListItem from "./CustomListItem.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";
import SemanticColor from "./types/SemanticColor.js";
import TabContainerBackgroundDesign from "./types/TabContainerBackgroundDesign.js";
import TabLayout from "./types/TabLayout.js";
import TabsOverflowMode from "./types/TabsOverflowMode.js";
import type { IButton } from "./Button.js";
/**
 * Interface for components that may be slotted inside `ui5-tabcontainer` as items
 * @public
 */
interface ITab extends UI5Element {
    isSeparator: boolean;
    getTabInStripDomRef: () => ITab | null;
    additionalText?: string;
    design?: `${SemanticColor}`;
    disabled?: boolean;
    icon?: string;
    isSingleClickArea?: boolean;
    requiresExpandButton?: boolean;
    selected?: boolean;
    subTabs?: Array<ITab>;
    tabs?: Array<ITab>;
    text?: string;
    hasOwnContent?: boolean;
    forcedLevel?: number;
    forcedSelected?: boolean;
    getElementInStrip?: () => ITab | null;
    isInline?: boolean;
    forcedMixedMode?: boolean;
    forcedPosinset?: number;
    forcedSetsize?: number;
    realTabReference: ITab;
    isTopLevelTab?: boolean;
    forcedStyle?: Record<string, any>;
}
type TabContainerPopoverOwner = "start-overflow" | "end-overflow" | Tab;
type TabContainerTabSelectEventDetail = {
    tab: ITab;
    tabIndex: number;
};
type TabContainerMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
interface TabContainerTabInOverflow extends CustomListItem {
    realTabReference: Tab;
}
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tabcontainer` represents a collection of tabs with associated content.
 * Navigation through the tabs changes the content display of the currently active content area.
 * A tab can be labeled with text only, or icons with text.
 *
 * ### Structure
 *
 * The `ui5-tabcontainer` can hold two types of entities:
 *
 * - `ui5-tab` - contains all the information on an item (text and icon)
 * - `ui5-tab-separator` - used to separate tabs with a line
 *
 * ### Hierarchies
 * Multiple sub tabs could be placed underneath one main tab. Nesting allows deeper hierarchies with indentations
 * to indicate the level of each nested tab. When a tab has both sub tabs and own content its click area is split
 * to allow the user to display the content or alternatively to expand / collapse the list of sub tabs.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TabContainer.js";`
 *
 * `import "@ui5/webcomponents/dist/Tab.js";` (for `ui5-tab`)
 *
 * `import "@ui5/webcomponents/dist/TabSeparator.js";` (for `ui5-tab-separator`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart tabstrip - Used to style the tabstrip of the component
 */
declare class TabContainer extends UI5Element {
    /**
     * Defines whether the tabs are in a fixed state that is not
     * expandable/collapsible by user interaction.
     * @default false
     * @public
     */
    fixed: boolean;
    /**
     * Defines whether the tab content is collapsed.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Defines whether the overflow select list is displayed.
     *
     * The overflow select list represents a list, where all tabs are displayed
     * so that it's easier for the user to select a specific tab.
     * @default false
     * @public
     * @deprecated Since the introduction of TabsOverflowMode, overflows will always be visible if there is not enough space for all tabs,
     * all hidden tabs are moved to a select list in the respective overflows and are accessible via the `overflowButton` and / or `startOverflowButton` slots.
     */
    showOverflow: boolean;
    /**
     * Defines the alignment of the content and the `additionalText` of a tab.
     *
     * **Note:**
     * The content and the `additionalText` would be displayed vertically by default,
     * but when set to `Inline`, they would be displayed horizontally.
     * @default "Standard"
     * @public
     */
    tabLayout: `${TabLayout}`;
    /**
     * Defines the overflow mode of the header (the tab strip). If you have a large number of tabs, only the tabs that can fit on screen will be visible.
     * All other tabs that can 't fit on the screen are available in an overflow tab "More".
     *
     * **Note:**
     * Only one overflow at the end would be displayed by default,
     * but when set to `StartAndEnd`, there will be two overflows on both ends, and tab order will not change on tab selection.
     * @default "End"
     * @since 1.1.0
     * @public
     */
    tabsOverflowMode: `${TabsOverflowMode}`;
    /**
     * Sets the background color of the Tab Container's header as `Solid`, `Transparent`, or `Translucent`.
     * @default "Solid"
     * @since 1.10.0
     * @public
     */
    headerBackgroundDesign: `${TabContainerBackgroundDesign}`;
    /**
     * Sets the background color of the Tab Container's content as `Solid`, `Transparent`, or `Translucent`.
     * @default "Solid"
     * @since 1.10.0
     * @public
     */
    contentBackgroundDesign: `${TabContainerBackgroundDesign}`;
    /**
     * Defines the placement of the tab strip relative to the actual tabs' content.
     *
     * **Note:** By default the tab strip is displayed above the tabs' content area and this is the recommended
     * layout for most scenarios. Set to `Bottom` only when the component is at the
     * bottom of the page and you want the tab strip to act as a menu.
     * @default "Top"
     * @since 1.0.0-rc.7
     * @private
     */
    tabsPlacement: `${TabContainerTabsPlacement}`;
    /**
     * Defines the current media query size.
     * @private
     */
    mediaRange: string;
    _selectedTab: Tab;
    _animationRunning: boolean;
    _contentCollapsed: boolean;
    _startOverflowText: string;
    _endOverflowText: string;
    _popoverItemsFlat: Array<ITab>;
    _width?: number;
    /**
     * Defines the tabs.
     *
     * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
     * @public
     */
    items: Array<ITab>;
    /**
     * Defines the button which will open the overflow menu. If nothing is provided to this slot,
     * the default button will be used.
     * @public
     * @since 1.0.0-rc.9
     */
    overflowButton: Array<IButton>;
    /**
     * Defines the button which will open the start overflow menu if available. If nothing is provided to this slot,
     * the default button will be used.
     * @public
     * @since 1.1.0
     */
    startOverflowButton: Array<IButton>;
    _itemNavigation: ItemNavigation;
    _itemsFlat?: Array<ITab>;
    responsivePopover?: ResponsivePopover;
    _hasScheduledPopoverOpen: boolean;
    _handleResizeBound: () => void;
    _setDraggedElement?: SetDraggedElementFunction;
    _setDraggedElementInStaticArea?: SetDraggedElementFunction;
    static registerTabStyles(styles: StyleData): void;
    static registerStaticAreaTabStyles(styles: StyleData): void;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleResize(): void;
    _updateMediaRange(width: number): void;
    _setItemsPrivateProperties(items: Array<ITab>): void;
    _onHeaderFocusin(e: FocusEvent): void;
    _onHeaderDragStart(e: DragEvent): void;
    _onHeaderDragEnter(e: DragEvent): void;
    _onHeaderDragOver(e: DragEvent, isLongDragOver: boolean): void;
    _onHeaderDrop(e: DragEvent): void;
    _onHeaderDragLeave(e: DragEvent): void;
    _onPopoverListMoveOver(e: CustomEvent<ListMoveEventDetail>): void;
    _onPopoverListMove(e: CustomEvent<ListMoveEventDetail>): void;
    _onTabStripClick(e: Event): Promise<void>;
    _onTabExpandButtonClick(e: Event): Promise<void>;
    _setPopoverInitialFocus(): void;
    _getSelectedTabInOverflow(): TabContainerTabInOverflow;
    _getFirstFocusableItemInOverflow(): TabContainerTabInOverflow;
    _onTabStripKeyDown(e: KeyboardEvent): void;
    _onTabStripKeyUp(e: KeyboardEvent): void;
    _onHeaderItemSelect(tab: HTMLElement): void;
    _onOverflowListItemClick(e: CustomEvent<ListItemClickEventDetail>): Promise<void>;
    /**
     * Returns all slotted tabs and their subTabs in a flattened array.
     * The order of tabs is depth-first.
     *
     * @public
     * @default []
     */
    get allItems(): Array<ITab>;
    _setIndentLevels(items: Array<ITab>, level?: number): void;
    _flatten(items: Array<ITab>): ITab[];
    _onItemSelect(selectedTabId: string): void;
    toggleAnimated(selectedTab: Tab, previousTab: Tab): Promise<void>;
    toggle(selectedTab: Tab, previousTab: Tab): void;
    /**
     * Fires the `tab-select` event and changes the internal reference for the currently selected tab.
     * If the event is prevented, the current tab is not changed.
     * @private
     * @param selectedTab selected tab instance
     * @param selectedTabIndex selected tab index for an array containing all tabs and sub tabs. **Note:** Use the method `allTabs` to get this array.
     * @returns true if the tab selection is successful, false if it was prevented
     */
    selectTab(selectedTab: Tab, selectedTabIndex: number): boolean;
    slideContentDown(element: HTMLElement): Promise<void | Error>;
    slideContentUp(element: HTMLElement): Promise<void | Error>;
    _onOverflowClick(e: Event): Promise<void>;
    _addStyleIndent(itemsFlat: Array<ITab>): void;
    _onOverflowKeyDown(e: KeyboardEvent): Promise<void>;
    _setItemsForStrip(): void;
    _getRootTab(tab: Tab): Tab;
    _updateEndOverflow(itemsDomRefs: Array<ITab>): void;
    _updateStartAndEndOverflow(itemsDomRefs: Array<ITab>): void;
    _hasStartOverflow(containerWidth: number, itemsDomRefs: Array<ITab>, selectedItemIndexAndWidth: {
        width: number;
        index: number;
    }): boolean;
    _hasEndOverflow(containerWidth: number, itemsDomRefs: Array<ITab>, selectedItemIndexAndWidth: {
        width: number;
        index: number;
    }): boolean;
    _getItemWidth(itemDomRef: HTMLElement): number;
    _getSelectedItemIndexAndWidth(itemsDomRefs: Array<ITab>, selectedTabDomRef: ITab): {
        index: number;
        width: number;
    };
    _findFirstVisibleItem(itemsDomRefs: Array<ITab>, containerWidth: number, selectedItemWidth: number, startIndex?: number): number;
    _findLastVisibleItem(itemsDomRefs: Array<ITab>, containerWidth: number, selectedItemWidth: number, startIndex?: number): number;
    get isModeStartAndEnd(): boolean;
    _updateOverflowCounters(): void;
    _getFocusableRefs(): IButton[];
    _getHeader(): HTMLElement;
    _getTabs(): Array<Tab>;
    _getPopoverOwner(opener: HTMLElement): TabContainerPopoverOwner;
    _getPopoverItemsFor(targetOwner: TabContainerPopoverOwner): ITab[];
    _setPopoverItems(items: Array<ITab>): void;
    _togglePopover(opener: HTMLElement, setInitialFocus?: boolean): Promise<void>;
    _showPopoverAt(opener: HTMLElement, setInitialFocus?: boolean, preventInitialFocus?: boolean): Promise<void>;
    get hasSubTabs(): boolean;
    _getTabStrip(): HTMLElement;
    _getStartOverflow(): HTMLElement;
    _getEndOverflow(): HTMLElement;
    _getStartOverflowBtnDOM(): Button | null;
    _getEndOverflowBtnDOM(): Button | null;
    _respPopover(): Promise<ResponsivePopover>;
    _closePopover(): void;
    get dropIndicatorDOM(): DropIndicator | null;
    get classes(): {
        root: {
            "ui5-tc-root": boolean;
            "ui5-tc--textOnly": boolean;
            "ui5-tc--withAdditionalText": boolean;
            "ui5-tc--standardTabLayout": boolean;
        };
        header: {
            "ui5-tc__header": boolean;
        };
        tabStrip: {
            "ui5-tc__tabStrip": boolean;
        };
        separator: {
            "ui5-tc__separator": boolean;
        };
        content: {
            "ui5-tc__content": boolean;
            "ui5-tc__content--collapsed": boolean;
        };
    };
    get mixedMode(): boolean;
    get textOnly(): boolean;
    get withAdditionalText(): boolean;
    get standardTabLayout(): boolean;
    get previousIconACCName(): string;
    get nextIconACCName(): string;
    get overflowMenuTitle(): string;
    get tabsAtTheBottom(): boolean;
    get overflowMenuIcon(): "slim-arrow-up" | "slim-arrow-down";
    get overflowButtonText(): string;
    get popoverCancelButtonText(): string;
    get accInvisibleText(): string;
    get tablistAriaDescribedById(): string | undefined;
    get shouldAnimate(): boolean;
    static onDefine(): Promise<void>;
}
export default TabContainer;
export type { ITab, TabContainerTabSelectEventDetail, TabContainerMoveEventDetail, };
