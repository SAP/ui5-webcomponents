import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import "@ui5/webcomponents-icons/dist/icons/edit.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
import "./RadioButton.js";
import "./CheckBox.js";
import "./Button.js";
import { DELETE, ARIA_LABEL_LIST_ITEM_CHECKBOX } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/ListItem.css.js";

/**
 * @public
 */
const metadata = {
	languageAware: true,
	properties: /** @lends  sap.ui.webcomponents.main.ListItem.prototype */ {

		/**
		 * Defines the visual indication and behavior of the list items.
		 * Available options are <code>Active</code> (by default), <code>Inactive</code> and <code>Detail</code>.
		 * <br><br>
		 * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press and hover,
		 * while with type <code>Inactive</code> and <code>Detail</code> - will not.
		 *
		 * @type {ListItemType}
		 * @defaultvalue "Active"
		 * @public
		*/
		type: {
			type: ListItemType,
			defaultValue: ListItemType.Active,
		},

		/**
		 * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
		 *
		 * @type {boolean}
		 * @private
		*/
		active: {
			type: Boolean,
		},

		/**
		 * Indicates if the list item is actionable, e.g has hover and pressed effects.
		 *
		 * @type {boolean}
		 * @private
		*/
		actionable: {
			type: Boolean,
		},

		_mode: {
			type: ListMode,
			defaultValue: ListMode.None,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ListItem.prototype */ {
		/**
		 * Fired when the user clicks on the detail button when type is <code>Detail</code>.
		 *
		 * @event sap.ui.webcomponents.main.ListItem#detail-click
		 * @public
		 */
		"detail-click": {},
		_press: {},
		_focused: {},
		"_selection-requested": {},
	},
};

/**
 * @class
 * A class to serve as a base
 * for the <code>StandardListItem</code> and <code>CustomListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListItem
 * @extends ListItemBase
 * @public
 */
class ListItem extends ListItemBase {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [ListItemBase.styles, styles];
	}

	constructor() {
		super();

		this.deactivateByKey = event => {
			if (isEnter(event)) {
				this.deactivate();
			}
		};

		this.deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering(...params) {
		this.actionable = (this.type === ListItemType.Active) && (this._mode !== ListMode.Delete);
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this.deactivate);
		document.addEventListener("touchend", this.deactivate);
		document.addEventListener("keyup", this.deactivateByKey);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this.deactivate);
		document.removeEventListener("keyup", this.deactivateByKey);
		document.removeEventListener("touchend", this.deactivate);
	}

	_onkeydown(event) {
		super._onkeydown(event);

		const itemActive = this.type === ListItemType.Active;

		if (isSpace(event)) {
			event.preventDefault();
		}

		if ((isSpace(event) || isEnter(event)) && itemActive) {
			this.activate();
		}

		if (isEnter(event)) {
			this.fireItemPress(event);
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.deactivate();
		}

		if (isSpace(event)) {
			this.fireItemPress(event);
		}
	}

	_onmousedown(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.activate();
	}

	_onmouseup(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.deactivate();
	}

	_ontouchstart(event) {
		this._onmousedown(event);
	}

	_ontouchend(event) {
		this._onmouseup(event);
	}

	_onfocusout() {
		super._onfocusout();
		this.deactivate();
	}

	_onclick(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.fireItemPress(event);
	}

	/*
	 * Called when selection components in Single (ui5-radiobutton)
	 * and Multi (ui5-checkbox) selection modes are used.
	 */
	onMultiSelectionComponentPress(event) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent("_selection-requested", { item: this, selected: event.target.checked, selectionComponentPressed: true });
	}

	onSingleSelectionComponentPress(event) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent("_selection-requested", { item: this, selected: !event.target.selected, selectionComponentPressed: true });
	}

	activate() {
		if (this.type === ListItemType.Active) {
			this.active = true;
		}
	}

	onDelete(event) {
		this.fireEvent("_selection-requested", { item: this, selectionComponentPressed: false });
	}

	onDetailClick(event) {
		this.fireEvent("detail-click", { item: this, selected: this.selected });
	}

	fireItemPress(event) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent("_press", { item: this, selected: this.selected, key: event.key });
	}

	get isInactive() {
		return this.type === ListItemType.Inactive || this.type === ListItemType.Detail;
	}

	get placeSelectionElementBefore() {
		return this._mode === ListMode.MultiSelect
			|| this._mode === ListMode.SingleSelectBegin;
	}

	get placeSelectionElementAfter() {
		return !this.placeSelectionElementBefore
			&& (this._mode === ListMode.SingleSelectEnd || this._mode === ListMode.Delete);
	}

	get modeSingleSelect() {
		return [
			ListMode.SingleSelectBegin,
			ListMode.SingleSelectEnd,
			ListMode.SingleSelect,
		].includes(this._mode);
	}

	get modeMultiSelect() {
		return this._mode === ListMode.MultiSelect;
	}

	get modeDelete() {
		return this._mode === ListMode.Delete;
	}

	get typeDetail() {
		return this.type === ListItemType.Detail;
	}

	get typeActive() {
		return this.type === ListItemType.Active;
	}

	get ariaSelected() {
		if (this.modeMultiSelect) {
			return this.selected;
		}

		return undefined;
	}

	get deleteText() {
		return this.i18nBundle.getText(DELETE);
	}

	get _accInfo() {
		return {
			role: "option",
			ariaExpanded: undefined,
			ariaLevel: undefined,
			ariaLabel: this.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
		};
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

export default ListItem;
