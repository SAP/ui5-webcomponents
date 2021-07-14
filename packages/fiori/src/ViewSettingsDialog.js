import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Dialog from "@ui5/webcomponents/Dialog.js";
import Button from "@ui5/webcomponents/Button.js";
import Bar from "./Bar.js";

import {
	VSD_DIALOG_TITLE_SORT,
	VSD_SUBMIT_BUTTON,
	VSD_CANCEL_BUTTON,
	VSD_RESET_BUTTON,
	VSD_SORT_ORDER,
	VSD_SORT_BY,
	VSD_ORDER_ASCENDING,
	VSD_ORDER_DESCENDING,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ViewSettingsDialogTemplate from "./generated/templates/ViewSettingsDialogTemplate.lit.js";

// Styles
import viewSettingsDialogCSS from "./generated/themes/ViewSettingsDialog.css.js";

const metadata = {
	tag: "ui5-view-settings-dialog",
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {
		/**
		 * Defines the <code>Sort By</code> list.
		 * @type {sap.ui.webcomponents.fiori.List}
		 * @slot sortBy
		 * @public
		 */
		 "sortBy": {
			propertyName: "sortBy",
			type: HTMLElement,
		},
	},
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
	},
	events: /** @lends  sap.ui.webcomponents.fiori.ViewSettingsDialog.prototype */ {

		/**
		 * Fired when OK button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#ok-click
		 * @param {String} sortOrder The current sort order selected.
		 * @param {String} sortBy The current sort by selected.
		 * @public
		 */
		"ok-click": {
			detail: {
				sortOrder: { type: String },
				sortBy: { type: String },
			},
		},
		/**
		 * Fired when Cancel button is activated.
		 *
		 * @event sap.ui.webcomponents.fiori.ViewSettingsDialog#cancel-click
		 * @param {Object} settings The current settings.
		 * @public
		 */
		"cancel-click": {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-view-settings-dialog</code> component consisting of several lists.
 * One of them (<code>Sort order</code>) is built-in, and another (<code>Sort By</code>) must be provided by the developer.
 * The selected options can be used to create sorters for the table.
 *
 * The <code>ui5-view-settings-dialog</code> interrupts the current app processing as it is the only focused UI element and
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
 * <code>import "@ui5/webcomponents/dist/ViewSettingsDialog";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.ViewSettigsDialog
 * @extends UI5Element
 * @tagname ui5-view-settings-dialog
 * @public
 */
class ViewSettingsDialog extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
		this._initialSettings = {}; // settings when the control is opened for the first time
		this._currentSettings = {}; // settings saved after pressing OK button
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
		];
	}

	static get template() {
		return ViewSettingsDialogTemplate;
	}

	static get styles() {
		return viewSettingsDialogCSS;
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents-fiori");
	}

	get _dialogTitle() {
		return this.i18nBundle.getText(VSD_DIALOG_TITLE_SORT);
	}

	get _okButtonLabel() {
		return this.i18nBundle.getText(VSD_SUBMIT_BUTTON);
	}

	get _cancelButtonLabel() {
		return this.i18nBundle.getText(VSD_CANCEL_BUTTON);
	}

	get _resetButtonLabel() {
		return this.i18nBundle.getText(VSD_RESET_BUTTON);
	}

	get _ascendingLabel() {
		return this.i18nBundle.getText(VSD_ORDER_ASCENDING);
	}

	get _descendingLabel() {
		return this.i18nBundle.getText(VSD_ORDER_DESCENDING);
	}

	get _sortOrderLabel() {
		return this.i18nBundle.getText(VSD_SORT_ORDER);
	}

	get _sortByLabel() {
		return this.i18nBundle.getText(VSD_SORT_BY);
	}

	get _isPhone() {
		return isPhone();
	}

	get _sortAscending() {
		return !this.sortDescending;
	}

	get _sortDescending() {
		return this.sortDescending;
	}

	get _settings() {
		// return the current settings
		const settings = {},
			  sortOrderSelected = this._sortOrder.getSelectedItems(),
			  sortBySelected = this._sortBy.getSelectedItems();

		settings.sortOrder = sortOrderSelected.length ? sortOrderSelected[0].innerText : "";
		settings.sortBy = sortBySelected.length ? sortBySelected[0].innerText : "";
		return settings;
	}

	open() {
		if (!this._dialog) {
			this._dialog = this.shadowRoot.querySelector("[ui5-dialog]");
			this._sortOrder = this.shadowRoot.querySelector("[ui5-list][sort-order]");
			this._sortBy = this.shadowRoot.querySelector("[ui5-list][sort-by]");
			this._resetButton = this.shadowRoot.querySelector("[ui5-button][reset-button]");
			this._recentlyFocused = this._sortOrder;
			this._dialog.ariaLabel = this._dialogTitle;
			this._initialSettings = this._settings;
			this._currentSettings = this._initialSettings;
		} else {
			this._restoreSettings(this._currentSettings);
		}
		this._resetButtonDisabled();
		this._dialog.open();
	}

	close() {
		this._dialog && this._dialog.close();
	}

	_focusLastControl() {
		const recentlyFocusedSelectedItems = this._recentlyFocused.getSelectedItems(),
			  recentlyFocusedItems = this._recentlyFocused.items;

		if (recentlyFocusedSelectedItems.length) {
			recentlyFocusedSelectedItems[0].focus();
		} else if (recentlyFocusedItems[1] && recentlyFocusedItems[1].assignedNodes && recentlyFocusedItems[1].assignedNodes().length) {
			this._recentlyFocused.focusItem(recentlyFocusedItems[1].assignedNodes()[0]);
		}
	}

	_resetButtonDisabled() {
		// check for current and saved state and disable Reset button if there is no difference
		this._resetButton.disabled = JSON.stringify(this._settings) === JSON.stringify(this._initialSettings);
	}

	_acceptSettings() {
		// save current settings and close the dialog
		this._currentSettings = this._settings;
		this.fireEvent("ok-click", {
			sortOrder: this._currentSettings.sortOrder,
			sortBy: this._currentSettings.sortBy,
		});
		this.close();
	}

	_cancelSettings() {
		// don't save current settings and close the dialog
		this._restoreSettings(this._currentSettings);
		this.fireEvent("cancel-click");
		this.close();
	}

	_resetSettings() {
		// reset to initial settings
		this._restoreSettings(this._initialSettings);
		this._recentlyFocused = this._sortOrder;
		this._focusLastControl();
	}

	_restoreSettings(settings) {
		// apply stored settings if any
		this._sortOrder.items.forEach(item => { item.selected = settings.sortOrder === item.innerText; });
		this._sortBy.items[1].assignedNodes().forEach(item => { item.selected = settings.sortBy === item.innerText; });
		this._resetButtonDisabled();
	}

	_onSortOrderChange() {
		// called when the sort order is changed in order to update reset button
		this._recentlyFocused = this._sortOrder;
		this._resetButtonDisabled();
	}

	_onSortByChange() {
		// called when the sort by is changed in order to update reset button
		this._recentlyFocused = this._sortBy;
		this._resetButtonDisabled();
	}
}

ViewSettingsDialog.define();

export default ViewSettingsDialog;
