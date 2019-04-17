import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import FocusHelper from "@ui5/webcomponents-base/src/FocusHelper";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/src/events/PseudoEvents";
import ListItemBaseTemplateContext from "./ListItemBaseTemplateContext";

/**
 * @public
 */
const metadata = {
	"abstract": true,
	properties: /** @lends  sap.ui.webcomponents.main.ListItemBase.prototype */  {

		_hideBorder: {
			type: Boolean,
		},

		_background: {
			type: String,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
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
 * @extends WebComponent
 * @public
 */
class ListItemBase extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get calculateTemplateContext() {
		return ListItemBaseTemplateContext.calculate;
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
}

export default ListItemBase;
