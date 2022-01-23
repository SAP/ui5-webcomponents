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
	properties: /** @lends  sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {
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
		 * @type {Object}
		 * @private
		 */
		 _recentlyFocused: {
			type: Object,
		},

		/**
		 * Stores settings of the dialog before the initial open.
		 *
		 * @type {Object}
		 * @private
		 */
		 _initialSettings: {
			type: Object,
		},

		/**
		 * Stores settings of the dialog after confirmation.
		 *
		 * @type {Object}
		 * @private
		 */
		 _confirmedSettings: {
			type: Object,
		},

		/**
		 * Stores current settings of the dialog.
		 *
		 * @type {Object}
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
		},
	},
	slots: /** @lends  sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {
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
	events: /** @lends  sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {

		/**
		 * Fired when confirmation button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#confirm
		 * @param {String} sortOrder The current sort order selected.
		 * @param {String} sortBy The currently selected <code>ui5-sort-item</code> text attribute.
		 * @public
		 */
		confirm: {
			detail: {
				sortOrder: { type: String },
				sortBy: { type: String },
				filters: { type: Array },
			},
		},

		/**
		 * Fired when cancel button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#cancel
		 * @param {String} sortOrder The current sort order selected.
		 * @param {String} sortBy The currently selected <code>ui5-sort-item</code> text attribute.
		 * @public
		 */
		cancel: {
			detail: {
				sortOrder: { type: String },
				sortBy: { type: String },
				filters: { type: Array },
			},
		},
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
 * @extends UI5Element
 * @tagname ui5-view-settings-dialog
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
		const currentModeText = this._currentMode === ViewSettingsDialogMode.Sort ? VSD_DIALOG_TITLE_SORT : VSD_FILTER_BY;
		return ViewSettingsDialog.i18nBundle.getText(currentModeText);
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
		return this.sortItems.map(item => {
			return {
				text: item.text,
				selected: item.selected,
			};
		});
	}

	get initSortOrderItems() {
		return [
			{
				text: this._ascendingLabel,
				selected: true,
			},
			{
				text: this._descendingLabel,
				selected: false,
			},
		];
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
		this._dialog.show();
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
			filter.selected = filter.text === event.detail.item.text;

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
			sortBy = _currentSortBySelected && _currentSortBySelected.text;

		return {
			sortOrder,
			sortBy,
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
		this._filterStepTwo = false;
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
		this._recentlyFocused = this._sortBy;
		this._currentSettings.sortBy = this.initSortByItems.map(item => {
			item.selected = item.text === event.detail.item.innerText;
			return item;
		});

		// Invalidate
		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}
}

ViewSettingsDialog.define();

export default ViewSettingsDialog;
