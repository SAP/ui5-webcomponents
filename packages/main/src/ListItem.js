import Function from "@ui5/webcomponents-base/src/types/Function.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
import "./RadioButton.js";
import "./CheckBox.js";
import "./Button.js";

// Styles
import styles from "./themes/ListItem.css.js";

/**
 * @public
 */
const metadata = {
	"abstract": true,
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
		 * </br></br>
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

		_active: {
			type: Boolean,
		},

		_mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		_selectionControl: {
			type: Object,
		},

		_fnOnDelete: {
			type: Function,
		},
	},
	events: {
		_press: {},
		_detailPress: {},
		_focused: {},
		_focusForward: {},
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
		return [styles, ListItemBase.styles];
	}

	constructor() {
		super();
		this._fnOnDelete = this.onDelete.bind(this);
	}

	onBeforeRendering() {}

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
			this.fireItemPress();
		}
	}

	onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.deactivate();
		}

		if (isSpace(event)) {
			this.fireItemPress();
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
		this.fireItemPress();
	}

	activate() {
		if (this.type === ListItemType.Active) {
			this._active = true;
		}
	}

	deactivate() {
		this._active = false;
	}

	onDelete(event) {
		this.fireEvent("_selectionRequested", { item: this, selected: event.selected });
	}

	fireItemPress() {
		this.fireEvent("_press", { item: this, selected: this.selected });
	}
}

export default ListItem;
