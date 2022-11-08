import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";

// Styles
import styles from "./generated/themes/ListItemBase.css.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends sap.ui.webcomponents.main.ListItemBase.prototype */  {

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
		* Defines if the list item should display its bottom border.
		* @private
		*/
		hasBorder: {
			type: Boolean,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},

		/**
		 * Defines whether <code>ui5-li</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-li</code> is noninteractive.
		 * @type {boolean}
		 * @defaultvalue false
		 * @protected
		 * @since 1.0.0-rc.12
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Indicates if the element is on focus
		 * @private
		 */
		focused: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ListItemBase.prototype */  {
		_focused: {},
		"_forward-after": {},
		"_forward-before": {},
	},
};

/**
 * A class to serve as a foundation
 * for the <code>ListItem</code> and <code>GroupHeaderListItem</code> classes.
 *
 * @abstract
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListItemBase
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */
class ListItemBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return styles;
	}

	_onfocusin(event) {
		if (event.target !== this.getFocusDomRef()) {
			return;
		}

		this.focused = true;
		this.fireEvent("_focused", event);
	}

	_onfocusout(_event) {
		this.focused = false;
	}

	_onkeydown(event) {
		if (isTabNext(event)) {
			return this._handleTabNext(event);
		}

		if (isTabPrevious(event)) {
			return this._handleTabPrevious(event);
		}
	}

	_onkeyup() {}

	_handleTabNext(event) {
		const target = event.target;

		if (this.shouldForwardTabAfter(target)) {
			if (!this.fireEvent("_forward-after", { item: target }, true)) {
				event.preventDefault();
			}
		}
	}

	_handleTabPrevious(event) {
		const target = event.target;

		if (this.shouldForwardTabBefore(target)) {
			const eventData = event;
			eventData.item = target;
			this.fireEvent("_forward-before", eventData);
		}
	}

	/*
	* Determines if th current list item either has no tabbable content or
	* [TAB] is performed onto the last tabbale content item.
	*/
	shouldForwardTabAfter(target) {
		const aContent = getTabbableElements(this.getDomRef());

		if (target.getFocusDomRef) {
			target = target.getFocusDomRef();
		}

		return !aContent.length || (aContent[aContent.length - 1] === target);
	}

	/*
	* Determines if the current list item is target of [SHIFT+TAB].
	*/
	shouldForwardTabBefore(target) {
		return this.getDomRef() === target;
	}

	get classes() {
		return {
			main: {
				"ui5-li-root": true,
				"ui5-li--focusable": !this.disabled,
			},
		};
	}

	get ariaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get tabIndex() {
		if (this.disabled) {
			return -1;
		}
		if (this.selected) {
			return 0;
		}
		return this._tabIndex;
	}
}

export default ListItemBase;
