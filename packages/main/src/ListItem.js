import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
import "./RadioButton.js";
import "./CheckBox.js";
import "./Button.js";

// Styles
import styles from "./generated/themes/ListItem.css.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends  sap.ui.webcomponents.main.ListItem.prototype */ {

		/**
		 * Defines the selected state of the <code>ListItem</code>.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the visual indication and behavior of the list items.
		 * Available options are <code>Active</code> (by default) and <code>Inactive</code>.
		 * <br><br>
		 * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press and hover,
		 * while with type <code>Inactive</code> - will not.
		 *
		 * @type {string}
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
	events: {
		_press: {},
		_detailPress: {},
		_focused: {},
		_focusForward: {},
	},
	_eventHandlersByConvention: true,
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
		return [styles, ListItemBase.styles];
	}

	constructor(props) {
		super(props);

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
	}

	onBeforeRendering(...params) {
		const desktop = isDesktop();
		const isActionable = (this.type === ListItemType.Active) && (this._mode !== ListMode.Delete);

		this.actionable = desktop && isActionable;
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this.deactivate);
		document.addEventListener("keyup", this.deactivateByKey);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this.deactivate);
		document.removeEventListener("keyup", this.deactivateByKey);
	}

	onkeydown(event) {
		super.onkeydown(event);

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

	onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.deactivate();
		}

		if (isSpace(event)) {
			this.fireItemPress(event);
		}
	}

	onmousedown(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.activate();
	}

	onmouseup(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.deactivate();
	}

	onfocusout(event) {
		this.deactivate();
	}

	onclick(event) {
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
		this.fireEvent("_selectionRequested", { item: this, selected: event.target.checked, selectionComponentPressed: true });
	}

	onSingleSelectionComponentPress(event) {
		this.fireEvent("_selectionRequested", { item: this, selected: !event.target.selected, selectionComponentPressed: true });
	}

	activate() {
		if (this.type === ListItemType.Active) {
			this.active = true;
		}
	}

	onDelete(event) {
		this.fireEvent("_selectionRequested", { item: this, selectionComponentPressed: false });
	}

	fireItemPress(event) {
		this.fireEvent("_press", { item: this, selected: this.selected, key: event.key });
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
}

export default ListItem;
