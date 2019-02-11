import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import FocusHelper from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/FocusHelper";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import ListItemBaseTemplateContext from "./ListItemBaseTemplateContext";

// Styles
import belize from "./themes/sap_belize/ListItemBase.less";
import belizeHcb from "./themes/sap_belize_hcb/ListItemBase.less";
import fiori3 from "./themes/sap_fiori_3/ListItemBase.less";

ShadowDOM.registerStyle("sap_belize", "ListItemBase.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "ListItemBase.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "ListItemBase.css", fiori3);

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

	constructor(state) {
		super(state);
	}

	static get calculateTemplateContext() {
		return ListItemBaseTemplateContext.calculate;
	}

	onfocusin(event) {
		this.fireEvent("_focused", event);
	}

	onsaptabnext(event) {
		const target = event.target.shadowRoot.activeElement;

		if (this.shouldForwardTabAfter(target)) {
			this.fireEvent("_forwardAfter", { item: target });
		}
	}

	onsaptabprevious(event) {
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
