import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isTabNext,
	isTabPrevious,
	isDown,
	isLeft,
	isUp,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Title from "./Title.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-right-arrow.js";
import SideNavigationItemTemplate from "./generated/templates/SideNavigationItemTemplate.lit.js";

// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
		text: {
			type: String,
		},

		icon: {
			type: String,
		},

		expandable: {
			type: Boolean,
		},

		expanded: {
			type: Boolean,
		},

		/**
		 * Defines the current active item.
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_mouseDown: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_focused: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_collapsed: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigationItem.prototype */ {
		/**
		 * @private
		 */
		_click: {

		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-side-navigation-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigationItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigationItem
 * @extends UI5Element
 * @tagname ui5-side-navigation-item
 * @public
 * @since 1.0.0-rc.8
 */
class SideNavigationItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationItemCss;
	}

	static get template() {
		return SideNavigationItemTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Icon.define(),
			Title.define(),
		]);
	}

	get showChildren() {
		return this.expanded && !this._collapsed;
	}

	_onkeydown(event) {
		if (isTabNext(event)) {
			this.fireEvent("_forward-focus");
		}

		if (isTabPrevious(event)) {
			this.fireEvent("_return_focus");
		}

		if (isDown(event) || isRight(event)) {
			event.preventDefault();
			this.fireEvent("_focus_next");
		}

		if (isUp(event) || isLeft(event)) {
			event.preventDefault();
			this.fireEvent("_focus_previous");
		}
	}

	_onmousedown(event) {
		this._mouseDown = true;
	}

	_onmouseup(event) {
		this._mouseDown = false;
		this.fireEvent("_click");
	}

	_onfocusin(event) {
		this._focused = true;
	}

	_onfocusout(event) {
		this._focused = false;
	}

	toggleExpanded() {
		this.expanded = !this.expanded;
	}

	get classessni() {
		return {
			root: {
				"ui5-sni-content": true,
				"ui5-sni-padding": !this.icon,
			},
		};
	}

	get activeIcon() {
		if (!this.expandable) {
			return undefined;
		}

		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	get hasOverflow() {
		return this._collapsed && this.icon && this.items.length > 0;
	}

	_generatePopoverContent() {
		return this.items.map(item => {
			return {
				icon: item.icon,
				text: item.text,
				item,
			};
		});
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
