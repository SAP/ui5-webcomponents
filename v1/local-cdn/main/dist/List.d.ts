import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListItemBase from "./ListItemBase.js";
import DropIndicator from "./DropIndicator.js";
import type { SelectionRequestEventDetail, PressEventDetail } from "./ListItem.js";
import ListSeparators from "./types/ListSeparators.js";
type ListItemFocusEventDetail = {
    item: ListItemBase;
};
type ListSelectionChangeEventDetail = {
    selectedItems: Array<ListItemBase>;
    previouslySelectedItems: Array<ListItemBase>;
    selectionComponentPressed: boolean;
    targetItem: ListItemBase;
    key?: string;
};
type ListItemDeleteEventDetail = {
    item: ListItemBase;
};
type ListMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
type ListItemCloseEventDetail = {
    item: ListItemBase;
};
type ListItemToggleEventDetail = {
    item: ListItemBase;
};
type ListItemClickEventDetail = {
    item: ListItemBase;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-list` component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 *
 * The `ui5-list` is a container for the available list items:
 *
 * - `ui5-li`
 * - `ui5-li-custom`
 * - `ui5-li-groupheader`
 *
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * `SingleSelect`, `MultiSelect` and `Delete`.
 *
 * Additionally, the `ui5-list` provides header, footer, and customization for the list item separators.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the `mode` property is in use:
 *
 * - [Space] - Select an item (if `type` is 'Active') when `mode` is selection
 * - [Delete] - Delete an item if `mode` property is `Delete`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/List.js";`
 *
 * `import "@ui5/webcomponents/dist/StandardListItem.js";` (for `ui5-li`)
 *
 * `import "@ui5/webcomponents/dist/CustomListItem.js";` (for `ui5-li-custom`)
 *
 * `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` (for `ui5-li-groupheader`)
 * @constructor
 * @extends UI5Element
 * @public
 */
declare class List extends UI5Element {
    /**
     * Defines the component header text.
     *
     * **Note:** If `header` is set this property is ignored.
     * @default ""
     * @public
     */
    headerText: string;
    /**
     * Defines the footer text.
     * @default ""
     * @public
     */
    footerText: string;
    /**
     * Determines whether the component is indented.
     * @default false
     * @public
     */
    indent: boolean;
    /**
     * Defines the mode of the component.
     * @default "None"
     * @public
     */
    mode: `${ListMode}`;
    /**
     * Defines the text that is displayed when the component contains no items.
     * @default ""
     * @public
     */
    noDataText: string;
    /**
     * Defines the item separator style that is used.
     * @default "All"
     * @public
     */
    separators: `${ListSeparators}`;
    /**
     * Defines whether the component will have growing capability either by pressing a `More` button,
     * or via user scroll. In both cases `load-more` event is fired.
     *
     * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
     * on IE the component will fallback to `growing="Button"`.
     * @default "None"
     * @since 1.0.0-rc.13
     * @public
     */
    growing: `${ListGrowingMode}`;
    /**
     * Defines the text that will be displayed inside the growing button.
     *
     * **Note:** If not specified a built-in text will be displayed.
     *
     * **Note:** This property takes effect if the `growing` property is set to the `Button`.
     * @default ""
     * @since 1.24
     * @public
     */
    growingButtonText: string;
    /**
     * Defines if the component would display a loading indicator over the list.
     * @default false
     * @public
     * @since 1.0.0-rc.6
     */
    busy: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
     * @default 1000
     * @public
     */
    busyDelay: number;
    /**
     * Defines the accessible name of the component.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName: string;
    /**
     * Defines the IDs of the elements that label the input.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef: string;
    /**
     * Defines the accessible role of the component.
     * @public
     * @default "list"
     * @since 1.0.0-rc.15
     */
    accessibleRole: string;
    /**
     * Defines the description for the accessible role of the component.
     * @protected
     * @default undefined
     * @since 1.10.0
     */
    accessibleRoleDescription?: string;
    /**
     * Defines if the entire list is in view port.
     * @private
     */
    _inViewport: boolean;
    /**
     * Defines the active state of the `More` button.
     * @private
     */
    _loadMoreActive: boolean;
    /**
     * Defines the items of the component.
     *
     * **Note:** Use `ui5-li`, `ui5-li-custom`, and `ui5-li-groupheader` for the intended design.
     * @public
     */
    items: Array<ListItemBase>;
    /**
     * Defines the component header.
     *
     * **Note:** When `header` is set, the
     * `headerText` property is ignored.
     * @public
     */
    header: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    _previouslyFocusedItem: ListItemBase | null;
    _forwardingFocus: boolean;
    resizeListenerAttached: boolean;
    listEndObserved: boolean;
    _handleResize: ResizeObserverCallback;
    initialIntersection: boolean;
    _selectionRequested?: boolean;
    growingIntersectionObserver?: IntersectionObserver | null;
    _itemNavigation: ItemNavigation;
    _beforeElement?: HTMLElement | null;
    _afterElement?: HTMLElement | null;
    static onDefine(): Promise<void>;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    attachForResize(): void;
    get shouldRenderH1(): string | false;
    get headerID(): string;
    get modeLabelID(): string;
    get listEndDOM(): Element | null;
    get dropIndicatorDOM(): DropIndicator | null;
    get hasData(): boolean;
    get showNoDataText(): string | false;
    get isDelete(): boolean;
    get isSingleSelect(): boolean;
    get isMultiSelect(): boolean;
    get ariaLabelledBy(): string | undefined;
    get ariaLabelTxt(): string | undefined;
    get ariaLabelModeText(): string;
    get grows(): boolean;
    get growsOnScroll(): boolean;
    get growsWithButton(): boolean;
    get _growingButtonText(): string;
    get busyIndPosition(): "absolute" | "sticky";
    get styles(): {
        busyInd: {
            position: string;
        };
    };
    get classes(): ClassMap;
    prepareListItems(): void;
    observeListEnd(): Promise<void>;
    unobserveListEnd(): void;
    onInteresection(entries: Array<IntersectionObserverEntry>): void;
    onSelectionRequested(e: CustomEvent<SelectionRequestEventDetail>): void;
    handleSingleSelect(item: ListItemBase): boolean;
    handleSingleSelectBegin(item: ListItemBase): boolean;
    handleSingleSelectEnd(item: ListItemBase): boolean;
    handleSingleSelectAuto(item: ListItemBase): boolean;
    handleMultiSelect(item: ListItemBase, selected: boolean): boolean;
    handleDelete(item: ListItemBase): boolean;
    deselectSelectedItems(): void;
    getSelectedItems(): Array<ListItemBase>;
    getEnabledItems(): Array<ListItemBase>;
    getItems(): Array<ListItemBase>;
    getItemsForProcessing(): Array<ListItemBase>;
    _revertSelection(previouslySelectedItems: Array<ListItemBase>): void;
    _onkeydown(e: KeyboardEvent): void;
    _onLoadMoreKeydown(e: KeyboardEvent): void;
    _onLoadMoreKeyup(e: KeyboardEvent): void;
    _onLoadMoreMousedown(): void;
    _onLoadMoreMouseup(): void;
    _onLoadMoreClick(): void;
    checkListInViewport(): void;
    loadMore(): void;
    _handleTabNext(e: KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    isForwardElement(element: HTMLElement): boolean;
    isForwardAfterElement(element: HTMLElement): boolean;
    onItemTabIndexChange(e: CustomEvent): void;
    onItemFocused(e: CustomEvent): void;
    onItemPress(e: CustomEvent<PressEventDetail>): void;
    onItemClose(e: CustomEvent<ListItemCloseEventDetail>): void;
    onItemToggle(e: CustomEvent<ListItemToggleEventDetail>): void;
    onForwardBefore(e: CustomEvent): void;
    onForwardAfter(e: CustomEvent): void;
    focusBeforeElement(): void;
    focusAfterElement(): void;
    focusGrowingButton(): void;
    getGrowingButton(): HTMLElement;
    /**
     * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     */
    focusFirstItem(): void;
    focusPreviouslyFocusedItem(): void;
    focusFirstSelectedItem(): void;
    /**
     * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     * @param item
     */
    focusItem(item: ListItemBase): void;
    onFocusRequested(e: CustomEvent): void;
    setForwardingFocus(forwardingFocus: boolean): void;
    getForwardingFocus(): boolean;
    setPreviouslyFocusedItem(item: ListItemBase): void;
    getPreviouslyFocusedItem(): ListItemBase | null;
    getFirstItem(filter: (item: ListItemBase) => boolean): ListItemBase | null;
    getAfterElement(): HTMLElement;
    getBeforeElement(): HTMLElement;
    getIntersectionObserver(): IntersectionObserver;
}
export default List;
export type { ListItemClickEventDetail, ListItemFocusEventDetail, ListItemDeleteEventDetail, ListItemCloseEventDetail, ListItemToggleEventDetail, ListSelectionChangeEventDetail, ListMoveEventDetail, };
