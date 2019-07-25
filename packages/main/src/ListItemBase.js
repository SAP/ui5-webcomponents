import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import FocusHelper from "@ui5/webcomponents-base/dist/FocusHelper.js";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";

// Styles
import styles from "./generated/themes/ListItemBase.css.js";

/**
 * @public
 */
const metadata = {
	"abstract": true,
	properties: /** @lends  sap.ui.webcomponents.main.ListItemBase.prototype */  {

		_hideBorder: {
			type: Boolean,
			noAttribute: true,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},
	},
	events: {
		_focused: {},
		_focusForward: {},
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
 * @extends UI5Element
 * @public
 */
class ListItemBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	onfocusin(event) {
		this.fireEvent("_focused", event);
	}

	onkeydown(event) {
		if (isTabNext(event)) {
			return this._handleTabNext(event);
		}

		if (isTabPrevious(event)) {
			return this._handleTabPrevious(event);
		}
	}

	_handleTabNext(event) {
		const target = event.target.shadowRoot.activeElement;

		if (this.shouldForwardTabAfter(target)) {
			this.fireEvent("_forwardAfter", { item: target });
		}
	}

	_handleTabPrevious(event) {
		const target = event.target.shadowRoot.activeElement;

		if (this.shouldForwardTabBefore(target)) {
			const eventData = event;
			eventData.item = target;
			this.fireEvent("_forwardBefore", eventData);
		}
	}

	/*
	* Determines if th current list item either has no tabbable content or
	* [TAB] is performed onto the last tabbale content item.
	*/
	shouldForwardTabAfter(target) {
		const aContent = FocusHelper.getTabbableContent(this.getDomRef());

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
				sapMLIBBorder: !this._hideBorder,
				sapMLIB: true,
				"sapMLIB-CTX": true,
				sapMLIBShowSeparator: true,
				sapMLIBFocusable: isDesktop(),
				"sap-phone": isPhone(),
				"sapUiSizeCompact": getCompactSize(),
			},
			inner: {
				sapMLIBContent: true,
			},
		};
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}
}

export default ListItemBase;
