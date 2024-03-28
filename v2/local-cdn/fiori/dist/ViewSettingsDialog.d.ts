import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import ViewSettingsDialogMode from "./types/ViewSettingsDialogMode.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type SortItem from "./SortItem.js";
import type FilterItem from "./FilterItem.js";
type VSDFilter = Record<string, Array<string>>;
type VSDFilters = Array<VSDFilter>;
type VSDSettings = {
    sortOrder: string;
    sortBy: string;
    filters: VSDFilters;
};
type ViewSettingsDialogConfirmEventDetail = VSDSettings & {
    sortByItem: SortItem;
    sortDescending: boolean;
};
type ViewSettingsDialogCancelEventDetail = VSDSettings & {
    sortByItem: SortItem;
    sortDescending: boolean;
};
type VSDItem = {
    text: string;
    selected: boolean;
};
type VSDInternalSettings = {
    sortOrder: Array<VSDItem>;
    sortBy: Array<VSDItem & {
        index: number;
    }>;
    filters: Array<VSDItem & {
        filterOptions: Array<VSDItem>;
    }>;
};
/**
 * @class
 * ### Overview
 * The `ui5-view-settings-dialog` component helps the user to sort data within a list or a table.
 * It consists of several lists like `Sort order` which is built-in and `Sort By` and `Filter By` lists,
 * for which you must be provide items(`ui5-sort-item` & `ui5-filter-item` respectively)
 * These options can be used to create sorters for a table.
 *
 * The `ui5-view-settings-dialog` interrupts the current application processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The `ui5-view-settings-dialog` is modal, which means that user action is required before returning to the parent window is possible.
 *
 * ### Structure
 * A `ui5-view-settings-dialog` consists of a header, content, and a footer for action buttons.
 * The `ui5-view-settings-dialog` is usually displayed at the center of the screen.
 *
 * ### Responsive Behavior
 * `ui5-view-settings-dialog` stretches on full screen on phones.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.16
 * @public
 */
declare class ViewSettingsDialog extends UI5Element {
    /**
     * Defines the initial sort order.
     * @default false
     * @public
     */
    sortDescending: boolean;
    /**
     * Keeps recently focused list in order to focus it on next dialog open.
     * @private
     */
    _recentlyFocused: List;
    /**
     * Stores settings of the dialog before the initial open.
     * @private
     */
    _initialSettings: VSDInternalSettings;
    /**
     * Stores settings of the dialog after confirmation.
     * @private
     */
    _confirmedSettings: VSDInternalSettings;
    /**
     * Stores current settings of the dialog.
     * @private
     */
    _currentSettings: VSDInternalSettings;
    /**
     * Defnies the current mode of the component.
     * @since 1.0.0-rc.16
     * @private
     */
    _currentMode: ViewSettingsDialogMode;
    /**
     * When in Filter By mode, defines whether we need to show the list of keys, or the list with values.
     * @since 1.0.0-rc.16
     * @private
     */
    _filterStepTwo: boolean;
    /**
     * Defines the list of items against which the user could sort data.
     *
     * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/SortItem.js";`
     * @public
     */
    sortItems: Array<SortItem>;
    /**
     * Defines the `filterItems` list.
     *
     * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
     * @public
     */
    filterItems: Array<FilterItem>;
    _dialog?: Dialog;
    _sortOrder?: List;
    _sortBy?: List;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onInvalidation(changeInfo: ChangeInfo): void;
    _setAdditionalTexts(): void;
    static onDefine(): Promise<void>;
    get _selectedFilter(): (VSDItem & {
        filterOptions: VSDItem[];
    }) | undefined;
    get shouldBuildSort(): boolean;
    get shouldBuildFilter(): boolean;
    get hasPagination(): boolean;
    get _filterByTitle(): string;
    get _dialogTitle(): string;
    get _okButtonLabel(): string;
    get _cancelButtonLabel(): string;
    get _resetButtonLabel(): string;
    get _ascendingLabel(): string;
    get _descendingLabel(): string;
    get _sortOrderLabel(): string;
    get _filterByLabel(): string;
    get _sortByLabel(): string;
    get _isPhone(): boolean;
    get _sortAscending(): boolean;
    get _title(): string;
    /**
     * Determines disabled state of the `Reset` button.
     */
    get _disableResetButton(): boolean | undefined;
    get _sortSetttingsAreInitial(): boolean;
    get _filteresAreInitial(): boolean;
    /**
     * Returns the current settings (current state of all lists).
     */
    get _settings(): VSDInternalSettings;
    get initSortByItems(): {
        text: string;
        selected: boolean;
        index: number;
    }[];
    get initSortOrderItems(): {
        text: string;
        selected: boolean;
    }[];
    get expandContent(): boolean;
    get isModeSort(): boolean;
    get isModeFilter(): boolean;
    get showBackButton(): boolean;
    get _sortOrderListDomRef(): List;
    get _sortByList(): List;
    get _dialogDomRef(): Dialog;
    /**
     * Shows the dialog.
     * @public
     */
    show(): void;
    _handleModeChange(e: CustomEvent): void;
    _handleFilterValueItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _navigateToFilters(): void;
    _changeCurrentFilter(e: CustomEvent<ListItemClickEventDetail>): void;
    /**
     * Closes the dialog.
     */
    close(): void;
    /**
     * Sets focus on recently used control within the dialog.
     */
    _focusRecentlyUsedControl(): void;
    /**
     * Stores current settings as confirmed and fires `confirm` event.
     */
    _confirmSettings(): void;
    /**
     * Sets current settings to recently confirmed ones and fires `cancel` event.
     */
    _cancelSettings(): void;
    get eventsParams(): {
        sortOrder: string;
        sortDescending: boolean;
        sortBy: string;
        sortByItem: SortItem;
        filters: VSDFilters;
    };
    get selectedFilters(): VSDFilters;
    /**
     * If the dialog is closed by [Escape] key, do the same as if the `Cancel` button is pressed.
     * @param evt
     */
    _restoreConfirmedOnEscape(evt: CustomEvent): void;
    /**
     * Resets the control settings to their initial state.
     */
    _resetSettings(): void;
    /**
     * Sets current settings to ones passed as `settings` argument.
     * @param settings
     */
    _restoreSettings(settings: VSDInternalSettings): void;
    /**
     * Stores `Sort Order` list as recently used control and its selected item in current state.
     */
    _onSortOrderChange(e: CustomEvent<ListItemClickEventDetail>): void;
    /**
     * Stores `Sort By` list as recently used control and its selected item in current state.
     */
    _onSortByChange(e: CustomEvent<ListItemClickEventDetail>): void;
    /**
     * Sets a JavaScript object, as settings to the `ui5-view-settings-dialog`.
     * This method can be used after the dialog is initially open, as the dialog needs
     * to set its initial settings.
     * The `ui5-view-settings-dialog` throws an event called "before-open",
     * which can be used as a trigger point.
     * The object should have the following format:
     * @param settings - predefined settings.
     * @public
     */
    setConfirmedSettings(settings: VSDSettings): void;
}
export default ViewSettingsDialog;
export type { ViewSettingsDialogConfirmEventDetail, ViewSettingsDialogCancelEventDetail, VSDSettings, };
