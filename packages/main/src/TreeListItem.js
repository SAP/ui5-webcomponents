import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import {
	TREE_ITEM_ARIA_LABEL,
	TREE_ITEM_EXPAND_NODE,
	TREE_ITEM_COLLAPSE_NODE,
} from "./generated/i18n/i18n-defaults.js";

// Template
import TreeListItemTemplate from "./generated/templates/TreeListItemTemplate.lit.js";

// Styles
import treeListItemCss from "./generated/themes/TreeListItem.css.js";

import HasPopup from "./types/HasPopup.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-tree",
	languageAware: true,
	properties: /** @lends sap.ui.webc.main.TreeListItem.prototype */ {

		/**
		 * Defines the indentation of the tree list item. Use level 1 for tree list items, representing top-level tree nodes.
		 *
		 * @type {sap.ui.webc.base.types.Integer}
		 * @public
		 * @defaultValue 1
		 */
		level: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * If set, an icon will be displayed before the text of the tree list item.
		 *
		 * @public
		 * @type {string}
		 * @defaultValue ""
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the tree list item should display an expand/collapse button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showToggleButton: {
			type: Boolean,
		},

		/**
		 * Defines whether the tree list item will show a collapse or expand icon inside its toggle button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		expanded: {
			type: Boolean,
		},

		/**
		 * @private
		 * @since 1.1.0
		 */
		indeterminate: {
			type: Boolean,
		},

		/**
		 * Defines the <code>additionalText</code>, displayed in the end of the tree item.
		 * @type {string}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalText: {
			type: String,
		},

		/**
		 * Defines the state of the <code>additionalText</code>.
		 * <br>
		 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.
		 * @type {sap.ui.webc.base.types.ValueState}
		 * @defaultvalue "None"
		 * @public
		 * @since 1.0.0-rc.15
		 */
		additionalTextState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines the accessible name of the component.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.8.0
		 */
		 accessibleName: {
			type: String,
		},

		/**
		 * Defines whether the toggle button is shown at the end, rather than at the beginning of the item
		 *
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		_toggleButtonEnd: {
			type: Boolean,
		},

		/**
		 * Defines whether the item shows minimal details - only icon (no text or toggle button)
		 *
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		_minimal: {
			type: Boolean,
		},

		/**
		 * @private
		 * @since 1.0.0-rc.11
		 */
		_setsize: {
			type: Integer,
			defaultValue: 1,
			noAttribute: true,
		},

		/**
		 * @private
		 * @since 1.0.0-rc.11
		 */
		_posinset: {
			type: Integer,
			defaultValue: 1,
			noAttribute: true,
		},

		/**
		 * Defines the description for the accessible role of the component.
		 * @protected
		 * @type {string}
		 * @defaultvalue undefined
		 * @since 1.10.0
		 */
		 accessibleRoleDescription: {
			type: String,
			defaultValue: undefined,
			noAttribute: true,
		},

		/**
		 * Defines the availability and type of interactive popup element that can be triggered by the component on which the property is set.
		 * @type {sap.ui.webc.main.types.HasPopup}
		 * @since 1.10.0
		 * @private
		 */
		ariaHaspopup: {
			type: HasPopup,
			noAttribute: true,
		},

	},
	slots: /** @lends sap.ui.webc.main.TreeListItem.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webc.main.TreeListItem.prototype */ {

		/**
		 * Fired when the user interacts with the expand/collapse button of the tree list item.
		 * @event
		 * @param {HTMLElement} item the toggled item.
		 * @public
		 */
		toggle: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user drills down into the tree hierarchy by pressing the right arrow on the tree node.
		 *
		 * @event sap.ui.webc.main.TreeListItem#step-in
		 * @param {HTMLElement} item the item on which right arrow was pressed.
		 * @public
		 */
		"step-in": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user goes up the tree hierarchy by pressing the left arrow on the tree node.
		 *
		 * @event sap.ui.webc.main.TreeListItem#step-out
		 * @param {HTMLElement} item the item on which left arrow was pressed.
		 * @public
		 */
		"step-out": {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * The <code>ui5-li-tree</code> represents a node in a tree structure, shown as a <code>ui5-list</code>.
 * <br>
 * <i>Note:</i> Do not use <code>ui5-li-tree</code> directly in your apps. Use <code>ui5-tree-item</code> instead, as it can be nested inside a <code>ui5-tree</code>.
 * On the other hand, <code>ui5-li-tree</code> can only be slotted inside a <code>ui5-list</code>, being a list item. It may be useful if you want to build a custom tree component, for example.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li-tree</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the tree list item</li>
 * <li>additionalText - Used to style the additionalText of the tree list item</li>
 * <li>icon - Used to style the icon of the tree list item</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TreeListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li-tree
 * @public
 * @since 1.0.0-rc.8
 */
class TreeListItem extends ListItem {
	static get template() {
		return TreeListItemTemplate;
	}

	static get styles() {
		return [ListItem.styles, treeListItemCss];
	}

	static get metadata() {
		return metadata;
	}

	static get dependencies() {
		return [
			...ListItem.dependencies,
			Icon,
		];
	}

	onBeforeRendering() {
		this.actionable = false;
	}

	get classes() {
		const allClasses = super.classes;
		allClasses.main["ui5-li-root-tree"] = true;
		return allClasses;
	}

	get styles() {
		return {
			preContent: {
				"padding-left": `calc(var(--_ui5-tree-indent-step) * ${this.effectiveLevel})`,
			},
		};
	}

	get effectiveLevel() {
		return this.level - 1;
	}

	get hasParent() {
		return this.level > 1;
	}

	get _toggleIconName() {
		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	get _showToggleButtonBeginning() {
		return this.showToggleButton && !this._minimal && !this._toggleButtonEnd;
	}

	get _showToggleButtonEnd() {
		return this.showToggleButton && !this._minimal && this._toggleButtonEnd;
	}

	get _showTitle() {
		return this.textContent.length && !this._minimal;
	}

	get _ariaLabel() {
		return this.accessibleRoleDescription ? undefined : TreeListItem.i18nBundle.getText(TREE_ITEM_ARIA_LABEL);
	}

	get _accInfo() {
		const accInfoSettings = {
			role: this._minimal ? "menuitemradio" : "treeitem",
			ariaExpanded: this.showToggleButton && !this._minimal ? this.expanded : undefined,
			ariaLevel: this._minimal ? undefined : this.level,
			posinset: this._posinset,
			setsize: this._setsize,
			ariaSelectedText: this.ariaSelectedText,
			listItemAriaLabel: !this.accessibleName ? this._ariaLabel : undefined,
			ariaHaspopup: this.ariaHaspopup || undefined,
		};

		if (this._minimal) {
			accInfoSettings.ariaChecked = this.selected;
		} else {
			accInfoSettings.ariaSelected = this.selected;
		}

		return accInfoSettings;
	}

	_toggleClick(event) {
		event.stopPropagation();
		this.fireEvent("toggle", { item: this });
	}

	_onkeydown(event) {
		super._onkeydown(event);

		if (this.showToggleButton && isRight(event)) {
			if (!this.expanded) {
				this.fireEvent("toggle", { item: this });
			} else {
				this.fireEvent("step-in", { item: this });
			}
		}

		if (isLeft(event)) {
			if (this.expanded) {
				this.fireEvent("toggle", { item: this });
			} else if (this.hasParent) {
				this.fireEvent("step-out", { item: this });
			}
		}
	}

	get iconAccessibleName() {
		return this.expanded ? TreeListItem.i18nBundle.getText(TREE_ITEM_COLLAPSE_NODE) : TreeListItem.i18nBundle.getText(TREE_ITEM_EXPAND_NODE);
	}

	static async onDefine() {
		[TreeListItem.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			super.onDefine(),
		]);
	}
}

TreeListItem.define();

export default TreeListItem;
