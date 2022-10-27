import { isSpace, isEnter, isDelete } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
import Button from "./Button.js";
import {
	DELETE,
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
	ARIA_LABEL_LIST_ITEM_RADIO_BUTTON,
	LIST_ITEM_SELECTED,
	LIST_ITEM_NOT_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/ListItem.css.js";

/**
 * @public
 */
const metadata = {
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.ListItem.prototype */ {

		/**
		 * Defines the visual indication and behavior of the list items.
		 * Available options are <code>Active</code> (by default), <code>Inactive</code> and <code>Detail</code>.
		 * <br><br>
		 * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press and hover,
		 * while with type <code>Inactive</code> and <code>Detail</code> - will not.
		 *
		 * @type {sap.ui.webcomponents.main.types.ListItemType}
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
		 * Defines the tooltip of the component.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.15
		 */
		title: {
			type: String,
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

		/**
		 * Used to define the role of the list item.
		 *
		 * @private
		 * @type {string}
		 * @defaultvalue "listitem"
		 * @since 1.0.0-rc.9
		 *
		 */
		role: {
			type: String,
			defaultValue: "listitem",
		},

		/**
		 * Used to define the role of the list item.
		 *
		 * @private
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.3.0
		 *
		 */
		accessibleRole: {
			type: String,
		},

		_mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		_ariaHasPopup: {
			type: String,
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
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.ListItem.prototype */ {

		/**
		 * Defines the delete button, displayed in "Delete" mode.
		 * <b>Note:</b> While the slot allows custom buttons, to match
		 * design guidelines, please use the <code>ui5-button</code> component.
		 * <b>Note:</b> When the slot is not present, a built-in delete button will be displayed.
		 * @type {sap.ui.webcomponents.main.IButton}
		 * @since 1.9.0
		 * @slot
		 * @public
		 */
		deleteButton: {
			type: HTMLElement,
		},
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
 * @extends sap.ui.webcomponents.main.ListItemBase
 * @public
 */
class ListItem extends ListItemBase {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [ListItemBase.styles, styles];
	}

	static get dependencies() {
		return [
			Button,
			RadioButton,
			CheckBox,
		];
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

		const handleTouchStartEvent = event => {
			this._onmousedown(event);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
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

		if (this.modeDelete && isDelete(event)) {
			this.onDelete();
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
	 * Called when selection components in Single (ui5-radio-button)
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

		event.preventDefault();
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

	/**
	 * Used in UploadCollectionItem
	 */
	get renderDeleteButton() {
		return this.modeDelete;
	}

	get disableDeleteButton() {
		return false;
	}
	/**
	 * End
	 */

	get typeDetail() {
		return this.type === ListItemType.Detail;
	}

	get typeActive() {
		return this.type === ListItemType.Active;
	}

	get ariaSelected() {
		if (this.modeMultiSelect || this.modeSingleSelect) {
			return this.selected;
		}

		return undefined;
	}

	get ariaSelectedText() {
		let ariaSelectedText;

		// Selected state needs to be supported separately since now the role mapping is list -> listitem[]
		// to avoid the issue of nesting interactive elements, ex. (option -> radio/checkbox);
		// The text is added to aria-describedby because as part of the aria-labelledby
		// the whole content of the item is readout when the aria-labelledby value is changed.
		if (this.ariaSelected !== undefined) {
			ariaSelectedText = this.ariaSelected ? ListItem.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
		}

		return ariaSelectedText;
	}

	get deleteText() {
		return ListItem.i18nBundle.getText(DELETE);
	}

	get hasDeleteButtonSlot() {
		return !!this.deleteButton.length;
	}

	get _accessibleNameRef() {
		if (this.accessibleName) {
			// accessibleName is set - return labels excluding content
			return `${this._id}-invisibleText`;
		}

		// accessibleName is not set - return _accInfo.listItemAriaLabel including content
		return `${this._id}-content ${this._id}-invisibleText`;
	}

	get _accInfo() {
		return {
			role: this.accessibleRole || this.role,
			ariaExpanded: undefined,
			ariaLevel: undefined,
			ariaLabel: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
			ariaLabelRadioButton: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
			ariaSelectedText: this.ariaSelectedText,
			ariaHaspopup: this._ariaHasPopup || undefined,
		};
	}

	static async onDefine() {
		ListItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

export default ListItem;
