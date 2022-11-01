import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import GroupHeaderListItem from "@ui5/webcomponents/dist/GroupHeaderListItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItem from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import Bar from "./Bar.js";
import ViewSettingsDialogMode from "./types/ViewSettingsDialogMode.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";

import {
	VSD_DIALOG_TITLE_SORT,
	VSD_SUBMIT_BUTTON,
	VSD_CANCEL_BUTTON,
	VSD_RESET_BUTTON,
	VSD_SORT_ORDER,
	VSD_SORT_BY,
	VSD_ORDER_ASCENDING,
	VSD_ORDER_DESCENDING,
	VSD_FILTER_BY,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ViewSettingsDialogTemplate from "./generated/templates/ViewSettingsDialogTemplate.lit.js";

// Styles
import viewSettingsDialogCSS from "./generated/themes/ViewSettingsDialog.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-view-settings-dialog",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {
		/**
		 * Defines the initial sort order.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		 sortDescending: {
			type: Boolean,
		},

		/**
		 * Keeps recently focused list in order to focus it on next dialog open.
		 *
		 * @type {object}
		 * @private
		 */
		 _recentlyFocused: {
			type: Object,
		},

		/**
		 * Stores settings of the dialog before the initial open.
		 *
		 * @type {object}
		 * @private
		 */
		 _initialSettings: {
			type: Object,
		},

		/**
		 * Stores settings of the dialog after confirmation.
		 *
		 * @type {object}
		 * @private
		 */
		 _confirmedSettings: {
			type: Object,
		},

		/**
		 * Stores current settings of the dialog.
		 *
		 * @type {object}
		 * @private
		 */
		 _currentSettings: {
			type: Object,
		},

		/**
		 * Defnies the current mode of the component.
		 *
		 * @since 1.0.0-rc.16
		 * @private
		 */
		_currentMode: {
			type: ViewSettingsDialogMode,
			defaultValue: ViewSettingsDialogMode.Sort,
		},

		/**
		 * When in Filter By mode, defines whether we need to show the list of keys, or the list with values.
		 *
		 * @since 1.0.0-rc.16
		 * @private
		 */
		_filterStepTwo: {
			type: Boolean,
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {
		/**
		 * Defines the list of items against which the user could sort data.
		 * <b>Note:</b> If you want to use this slot, you need to import used item: <code>import "@ui5/webcomponents-fiori/dist/SortItem";</code>
		 *
		 * @type {sap.ui.webcomponents.fiori.ISortItem[]}
		 * @slot sortItems
		 * @public
		 */
		 sortItems: {
			type: HTMLElement,
		},

		/**
		 * Defines the <code>filterItems</code> list.
		 * <b>Note:</b> If you want to use this slot, you need to import used item: <code>import "@ui5/webcomponents-fiori/dist/FilterItem";</code>
		 *
		 * @type {sap.ui.webcomponents.fiori.IFilterItem[]}
		 * @slot filterItems
		 * @public
		 */
		filterItems: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {

		/**
		 * Fired when confirmation button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#confirm
		 * @param {String} sortOrder The current sort order selected.
		 * @param {String} sortBy The currently selected <code>ui5-sort-item</code> text attribute.
		 * @param {HTMLElement} sortByItem The currently selected <code>ui5-sort-item</code>.
		 * @param {Boolean} sortDescending The selected sort order (true = descending, false = ascending).
		 * @param {Array} filterItems The selected filters items.
		 * @public
		 */
		confirm: {
			detail: {
				sortOrder: { type: String },
				sortBy: { type: String },
				sortByItem: { type: HTMLElement },
				sortDescending: { type: Boolean },
				filters: { type: Array },
			},
		},

		/**
		 * Fired when cancel button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#cancel
		 * @param {String} sortOrder The current sort order selected.
		 * @param {String} sortBy The currently selected <code>ui5-sort-item</code> text attribute.
		 * @param {HTMLElement} sortByItem The currently selected <code>ui5-sort-item</code>.
		 * @param {Boolean} sortDescending The selected sort order (true = descending, false = ascending).
		 * @param {Array} filterItems The selected filters items.
		 * @public
		 */
		cancel: {
			detail: {
				sortOrder: { type: String },
				sortBy: { type: String },
				sortByItem: { type: HTMLElement },
				sortDescending: { type: Boolean },
				filters: { type: Array },
			},
		},

		/**
		 * Fired before the component is opened. <b>This event does not bubble.</b>
		 *
		 * @public
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#before-open
		 */
		"before-open": {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-view-settings-dialog</code> component helps the user to sort data within a list or a table.
 * It consists of several lists like <code>Sort order</code> which is built-in and <code>Sort By</code> and <code>Filter By</code> lists,
 * for which you must be provide items(<code>ui5-sort-item</code> & <code>ui5-filter-item</code> respectively)
 * These options can be used to create sorters for a table.
 *
 * The <code>ui5-view-settings-dialog</code> interrupts the current application processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The <code>ui5-view-settings-dialog</code> is modal, which means that user action is required before returning to the parent window is possible.
 *
 * <h3>Structure</h3>
 * A <code>ui5-view-settings-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-view-settings-dialog</code> is usually displayed at the center of the screen.
 *
 * <h3>Responsive Behavior</h3>
 * <code>ui5-view-settings-dialog</code> stretches on full screen on phones.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ViewSettingsDialog
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-view-settings-dialog
 * @appenddocs SortItem FilterItem FilterItemOption
 * @since 1.0.0-rc.16
 * @public
 */
class ViewSettingsDialog extends UI5Element {
	constructor() {
		super();
		this._currentSettings = {
			sortOrder: [],
			sortBy: [],
			filters: [],
		};
	}

	onBeforeRendering() {
		if (this._currentSettings.filters && this._currentSettings.filters.length) {
			this._setAdditionalTexts();
		}

		if (!this.shouldBuildSort && this.shouldBuildFilter) {
			this._currentMode = ViewSettingsDialogMode.Filter;
		}
	}

	_setAdditionalTexts() {
		// Add the additional text to the filter options
		this.filterItems.forEach((filter, index) => {
			let selectedCount = 0;
			for (let i = 0; i < filter.values.length; i++) {
				if (this._currentSettings.filters[index].filterOptions[i].selected) {
					selectedCount++;
				}
			}

			filter.additionalText = !selectedCount ? "" : selectedCount;
		});
	}

	static get render() {
		return litRender;
	}

	static get metadata() {
		return metadata;
	}

	static get dependencies() {
		return [
			Bar,
			Button,
			Title,
			Dialog,
			Label,
			List,
			StandardListItem,
			GroupHeaderListItem,
			SegmentedButton,
			SegmentedButtonItem,
		];
	}

	static get template() {
		return ViewSettingsDialogTemplate;
	}

	static get styles() {
		return viewSettingsDialogCSS;
	}

	static async onDefine() {
		ViewSettingsDialog.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	get _selectedFilter() {
		for (let i = 0; i < this._currentSettings.filters.length; i++) {
			if (this._currentSettings.filters[i].selected) {
				return this._currentSettings.filters[i];
			}
		}

		return "";
	}

	get shouldBuildSort() {
		return !!this.sortItems.length;
	}

	get shouldBuildFilter() {
		return !!this.filterItems.length;
	}

	get hasPagination() {
		return this.shouldBuildSort && this.shouldBuildFilter;
	}

	get _filterByTitle() {
		return `${ViewSettingsDialog.i18nBundle.getText(VSD_FILTER_BY)}: ${this._selectedFilter.text}`;
	}

	get _dialogTitle() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_DIALOG_TITLE_SORT);
	}

	get _okButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SUBMIT_BUTTON);
	}

	get _cancelButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_CANCEL_BUTTON);
	}

	get _resetButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_RESET_BUTTON);
	}

	get _ascendingLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_ORDER_ASCENDING);
	}

	get _descendingLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_ORDER_DESCENDING);
	}

	get _sortOrderLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SORT_ORDER);
	}

	get _filterByLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_FILTER_BY);
	}

	get _sortByLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SORT_BY);
	}

	get _isPhone() {
		return isPhone();
	}

	get _sortAscending() {
		return !this.sortDescending;
	}

	get _title() {
		return this.showBackButton
			? this._filterByTitle
			: this._dialogTitle;
	}

	/**
	 * Determines disabled state of the <code>Reset</code> button.
	 */
	get _disableResetButton() {
		return this._dialog && this._sortSetttingsAreInitial && this._filteresAreInitial;
	}

	get _sortSetttingsAreInitial() {
		let settingsAreInitial = true;
		["sortBy", "sortOrder"].forEach(sortList => {
			this._currentSettings[sortList].forEach((item, index) => {
				if (item.selected !== this._initialSettings[sortList][index].selected) {
					settingsAreInitial = false;
				}
			});
		});

		return settingsAreInitial;
	}

	get _filteresAreInitial() {
		let filtersAreInitial = true;
		this._currentSettings.filters.forEach((filter, index) => {
			for (let i = 0; i < filter.filterOptions.length; i++) {
				if (filter.filterOptions[i].selected !== this._initialSettings.filters[index].filterOptions[i].selected) {
					filtersAreInitial = false;
				}
			}
		});

		return filtersAreInitial;
	}

	/**
	 * Returns the current settings (current state of all lists).
	 */
	get _settings() {
		return {
			sortOrder: JSON.parse(JSON.stringify(this.initSortOrderItems)),
			sortBy: JSON.parse(JSON.stringify(this.initSortByItems)),
			filters: this.filterItems.map(item => {
				return {
					text: item.text,
					selected: false,
					filterOptions: item.values.map(optionValue => {
						return {
							text: optionValue.text,
							selected: optionValue.selected,
						};
					}),
				};
			}),
		};
	}

	get initSortByItems() {
		return this.sortItems.map((item, index) => {
			return {
				text: item.text,
				selected: item.selected,
				index,
			};
		});
	}

	get initSortOrderItems() {
		return [
			{
				text: this._ascendingLabel,
				selected: !this.sortDescending,
			},
			{
				text: this._descendingLabel,
				selected: this.sortDescending,
			},
		];
	}

	get expandContent() {
		return this._filterStepTwo || !this.hasPagination;
	}

	get isModeSort() {
		return this._currentMode === ViewSettingsDialogMode.Sort;
	}

	get isModeFilter() {
		return this._currentMode === ViewSettingsDialogMode.Filter;
	}

	get showBackButton() {
		return this.isModeFilter && this._filterStepTwo;
	}

	get _sortOrderListDomRef() {
		return this.shadowRoot.querySelector("[ui5-list][sort-order]");
	}

	get _sortByList() {
		return this.shadowRoot.querySelector("[ui5-list][sort-by]");
	}

	get _dialogDomRef() {
		return this.shadowRoot.querySelector("[ui5-dialog]");
	}

	/**
	 * Shows the dialog.
	 * @public
	 */
	show() {
		if (!this._dialog) {
			this._sortOrder = this._sortOrderListDomRef;
			this._sortBy = this._sortByList;

			// Sorting
			this._initialSettings = this._settings;
			this._currentSettings = this._settings;
			this._confirmedSettings = this._settings;

			this._dialog = this._dialogDomRef;
		} else {
			this._restoreSettings(this._confirmedSettings);
		}

		this.fireEvent("before-open", {}, true, false);
		this._dialog.show(true);

		this._dialog.querySelector("[ui5-list]").focusFirstItem();
	}

	_handleModeChange(event) {
		this._currentMode = ViewSettingsDialogMode[event.detail.selectedItem.getAttribute("mode")];
	}

	_handleFilterValueItemClick(event) {
		// Update the component state
		this._currentSettings.filters = this._currentSettings.filters.map(filter => {
			if (filter.selected) {
				filter.filterOptions.forEach(option => {
					if (option.text === event.detail.item.innerText) {
						option.selected = !option.selected;
					}
				});
			}
			return filter;
		});

		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	_navigateToFilters(event) {
		this._filterStepTwo = false;
	}

	_changeCurrentFilter(event) {
		this._filterStepTwo = true;
		this._currentSettings.filters = this._currentSettings.filters.map(filter => {
			filter.selected = filter.text === event.detail.item.innerText;
			return filter;
		});
	}

	/**
	 * Closes the dialog.
	 */
	close() {
		this._dialog && this._dialog.close();
	}

	/**
	 * Sets focus on recently used control within the dialog.
	 */
	_focusRecentlyUsedControl() {
		if (!this._recentlyFocused || !Object.keys(this._recentlyFocused).length) {
			return;
		}
		const recentlyFocusedSelectedItems = this._recentlyFocused.getSelectedItems(),
			  recentlyFocusedItems = this._recentlyFocused.items,
			  slottedNodesExist = recentlyFocusedItems[1] && recentlyFocusedItems[1].assignedNodes && recentlyFocusedItems[1].assignedNodes().length;

		if (recentlyFocusedSelectedItems.length) {
			recentlyFocusedSelectedItems[0].focus();
		} else if (slottedNodesExist) {
			this._recentlyFocused.focusItem(recentlyFocusedItems[1].assignedNodes()[0]);
		}
	}

	/**
	 * Stores current settings as confirmed and fires <code>confirm</code> event.
	 */
	_confirmSettings() {
		this.close();
		this._confirmedSettings = this._currentSettings;

		this.fireEvent("confirm", this.eventsParams);
	}

	/**
	 * Sets current settings to recently confirmed ones and fires <code>cancel</code> event.
	 */
	_cancelSettings() {
		this._restoreSettings(this._confirmedSettings);

		this.fireEvent("cancel", this.eventsParams);
		this.close();
	}

	get eventsParams() {
		const _currentSortOrderSelected = this._currentSettings.sortOrder.filter(item => item.selected)[0],
			_currentSortBySelected = this._currentSettings.sortBy.filter(item => item.selected)[0],
			sortOrder = _currentSortOrderSelected && _currentSortOrderSelected.text,
			sortDescending = !this._currentSettings.sortOrder[0].selected,
			sortBy = _currentSortBySelected && _currentSortBySelected.text,
			sortByElementIndex = _currentSortBySelected && _currentSortBySelected.index,
			sortByItem = this.sortItems[sortByElementIndex];
		return {
			sortOrder,
			sortDescending,
			sortBy,
			sortByItem,
			filters: this.selectedFilters,
		};
	}

	get selectedFilters() {
		const result = [];

		this._currentSettings.filters.forEach(filter => {
			const selectedOptions = [];

			filter.filterOptions.forEach(option => {
				if (option.selected) {
					selectedOptions.push(option.text);
				}
			});

			if (selectedOptions.length) {
				result.push({});
				result[result.length - 1][filter.text] = selectedOptions;
			}
		});

		return result;
	}

	/**
	 * If the dialog is closed by [ESC] key, do the same as if the <code>Cancel</code> button is pressed.
	 *
	 * @param {event} evt
	 */
	_restoreConfirmedOnEscape(evt) {
		if (evt.detail.escPressed) {
			this._cancelSettings();
			this._currentMode = "Sort";
			this._filterStepTwo = false;
		}
	}

	/**
	 * Resets the control settings to their initial state.
	 */
	 _resetSettings() {
		this._restoreSettings(this._initialSettings);
		this._recentlyFocused = this._sortOrder;
		this._focusRecentlyUsedControl();
	}

	/**
	 * Sets current settings to ones passed as <code>settings</code> argument.
	 *
	 * @param {Object} settings
	 */
	_restoreSettings(settings) {
		this._currentSettings = JSON.parse(JSON.stringify(settings));
		this._currentMode = ViewSettingsDialogMode.Sort;
		this._filterStepTwo = false;
	}

	/**
	 * Stores <code>Sort Order</code> list as recently used control and its selected item in current state.
	 */
	_onSortOrderChange(event) {
		this._recentlyFocused = this._sortOrder;
		this._currentSettings.sortOrder = this.initSortOrderItems.map(item => {
			item.selected = item.text === event.detail.item.innerText;
			return item;
		});

		// Invalidate
		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	/**
	 * Stores <code>Sort By</code> list as recently used control and its selected item in current state.
	 */
	 _onSortByChange(event) {
		const selectedItemIndex = Number(event.detail.item.getAttribute("data-ui5-external-action-item-index"));
		this._recentlyFocused = this._sortBy;
		this._currentSettings.sortBy = this.initSortByItems.map((item, index) => {
			item.selected = index === selectedItemIndex;
			return item;
		});
		// Invalidate
		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	/**
	 * Sets a JavaScript object, as settings to the <code>ui5-view-settings-dialog</code>.
	 * This method can be used after the dialog is initially open, as the dialog need to set its initial settings.
	 * The <code>ui5-view-settings-dialog</code> throws an event called "before-open", this can be used as trigger point.
	 * The object should have the following format:
	 * <code>
	 *  {sortOrder: "Ascending", sortBy: "Name", filters: [{"Filter 1": ["Some filter 1", "Some filter 2"]}, {"Filter 2": ["Some filter 4"]}]}
	 * </code>
   * @param {Object} settings - predefined settings.
   * @param {string} settings.sortOrder - sort order
   * @param {string} settings.sortBy - sort by
   * @param {Array.<Object>} settings.filters - filters
	 * @public
	 */
	setConfirmedSettings(settings) {
		if (settings && this._dialog && !this._dialog.isOpen()) {
			const tempSettings = JSON.parse(JSON.stringify(this._confirmedSettings));
			if (settings.sortOrder) {
				for (let i = 0; i < tempSettings.sortOrder.length; i++) {
					if (tempSettings.sortOrder[i].text === settings.sortOrder) {
						tempSettings.sortOrder[i].selected = true;
					} else {
						tempSettings.sortOrder[i].selected = false;
					}
				}
			}

			if (settings.sortBy) {
				for (let i = 0; i < tempSettings.sortBy.length; i++) {
					if (tempSettings.sortBy[i].text === settings.sortBy) {
						tempSettings.sortBy[i].selected = true;
					} else {
						tempSettings.sortBy[i].selected = false;
					}
				}
			}

			if (settings.filters) {
				const inputFilters = {};
				for (let i = 0; i < settings.filters.length; i++) {
					inputFilters[Object.keys(settings.filters[i])[0]] = settings.filters[i][Object.keys(settings.filters[i])[0]];
				}

				for (let i = 0; i < tempSettings.filters.length; i++) {
					for (let j = 0; j < tempSettings.filters[i].filterOptions.length; j++) {
						if (inputFilters[tempSettings.filters[i].text] && inputFilters[tempSettings.filters[i].text].indexOf(tempSettings.filters[i].filterOptions[j].text) > -1) {
							tempSettings.filters[i].filterOptions[j].selected = true;
						} else {
							tempSettings.filters[i].filterOptions[j].selected = false;
						}
					}
				}
			}

			this._confirmedSettings = JSON.parse(JSON.stringify(tempSettings));
		}
	}
}

ViewSettingsDialog.define();

export default ViewSettingsDialog;
