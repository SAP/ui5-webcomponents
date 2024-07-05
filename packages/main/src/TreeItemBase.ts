import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
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
import TreeItemBaseTemplate from "./generated/templates/TreeItemBaseTemplate.lit.js";

// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";

type TreeItemBaseEventDetail = {
	item: TreeItemBase,
}
type TreeItemBaseToggleEventDetail = TreeItemBaseEventDetail;
type TreeItemBaseStepInEventDetail = TreeItemBaseEventDetail;
type TreeItemBaseStepOutEventDetail = TreeItemBaseEventDetail;

/**
 * A class to serve as a foundation
 * for the `TreeItem` and `TreeItemCustom` classes.
 * @abstract
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	languageAware: true,
	template: TreeItemBaseTemplate,
	styles: [
		ListItem.styles,
		treeItemCss,
	],
	dependencies: [
		...ListItem.dependencies,
		Icon,
	],
})
/**
 * Fired when the user interacts with the expand/collapse button of the tree list item.
 * @param {HTMLElement} item the toggled item.
 * @protected
 */
@event<TreeItemBaseToggleEventDetail>("toggle", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the user drills down into the tree hierarchy by pressing the right arrow on the tree node.
 * @param {HTMLElement} item the item on which right arrow was pressed.
 * @protected
 */
@event<TreeItemBaseStepInEventDetail>("step-in", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the user goes up the tree hierarchy by pressing the left arrow on the tree node.
 * @param {HTMLElement} item the item on which left arrow was pressed.
 * @protected
 */
@event<TreeItemBaseStepOutEventDetail>("step-out", {
	detail: {
		item: { type: HTMLElement },
	},
})
class TreeItemBase extends ListItem {
	/**
	 * Defines the indentation of the tree list item. Use level 1 for tree list items, representing top-level tree nodes.
	 * @protected
	 * @default 1
	 */
	@property({ type: Number })
	level = 1;

	/**
	 * If set, an icon will be displayed before the text of the tree list item.
	 * @public
	 * @default undefined
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the tree list item should display an expand/collapse button.
	 * @default false
	 * @protected
	 */
	@property({ type: Boolean })
	showToggleButton = false;

	/**
	 * Defines whether the tree list item will show a collapse or expand icon inside its toggle button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	expanded = false;

	/**
	 * Defines whether the item is movable.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable!: boolean;

	/**
	* Defines whether the selection of a tree node is displayed as partially selected.
	*
	* **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
	* interaction, meaning that the resulting visual state depends on the values of the `indeterminate`
	* and `selected` properties:
	*
	* -  If a tree node has both `selected` and `indeterminate` set to `true`, it is displayed as partially selected.
	* -  If a tree node has `selected` set to `true` and `indeterminate` set to `false`, it is displayed as selected.
	* -  If a tree node has `selected` set to `false`, it is displayed as not selected regardless of the value of the `indeterminate` property.
	*
	* **Note:** This property takes effect only when the `ui5-tree` is in `Multiple` mode.
	* @default false
	* @public
	* @since 1.1.0
	*/
	@property({ type: Boolean })
	declare indeterminate: boolean;

	/**
	 * Defines whether the tree node has children, even if currently no other tree nodes are slotted inside.
	 *
	 * **Note:** This property is useful for showing big tree structures where not all nodes are initially loaded due to performance reasons.
	 * Set this to `true` for nodes you intend to load lazily, when the user clicks the expand button.
	 * It is not necessary to set this property otherwise. If a tree item has children, the expand button will be displayed anyway.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hasChildren = false;

	/**
	 * Defines the state of the `additionalText`.
	 *
	 * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
	 * @default "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalTextState: `${ValueState}` = "None";

	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	declare accessibleName?: string;

	/**
	 * @private
	 * @since 1.0.0-rc.11
	 */
	@property({ type: Number, noAttribute: true })
	forcedSetsize = 1;

	/**
	 * @private
	 * @since 1.0.0-rc.11
	 */
	@property({ type: Number, noAttribute: true })
	forcedPosinset = 1;

	/**
	 * Defines if the item should be collapsible or not.
	 * @private
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	_fixed = false;

	/**
	 * Defines the items of the component.
	 *
	 * **Note:** Use `ui5-tree-item` or `ui5-tree-item-custom`
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: false,
			slots: ["default"],
		},
		"default": true,
	})
	items!: Array<TreeItemBase>;

	onBeforeRendering() {
		this.showToggleButton = this.requiresToggleButton;
	}

	get classes(): ClassMap {
		const allClasses = super.classes;
		allClasses.main["ui5-li-root-tree"] = true;
		return allClasses;
	}

	get styles() {
		return {
			preContent: {
				"padding-inline-start": `calc(var(${getScopedVarName("--_ui5-tree-indent-step")}) * ${this.effectiveLevel})`,
			},
		};
	}

	get requiresToggleButton() {
		return !this._fixed ? (this.hasChildren || this.items.length > 0) : false;
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

	get _ariaLabel() {
		return TreeItemBase.i18nBundle.getText(TREE_ITEM_ARIA_LABEL);
	}

	get _accInfo() {
		const accInfoSettings = {
			role: "treeitem",
			ariaExpanded: this.showToggleButton ? this.expanded : undefined,
			ariaLevel: this.level,
			posinset: this.forcedPosinset,
			setsize: this.forcedSetsize,
			ariaSelectedText: this.ariaSelectedText,
			listItemAriaLabel: !this.accessibleName ? this._ariaLabel : undefined,
			ariaOwns: this.expanded ? `${this._id}-subtree` : undefined,
			ariaHaspopup: this.accessibilityAttributes.hasPopup,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}

	/**
	 * Used to duck-type TreeItem elements without using instanceof
	 * @default true
	 * @protected
	 */
	get isTreeItem(): boolean {
		return true;
	}

	/**
	 * Call this method to manually switch the `expanded` state of a tree item.
	 * @public
	 */
	toggle(): void {
		this.expanded = !this.expanded;
	}

	_toggleClick(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation();
		this.fireEvent<TreeItemBaseToggleEventDetail>("toggle", { item: this });
	}

	async _onkeydown(e: KeyboardEvent) {
		await super._onkeydown(e);

		if (!this._fixed && this.showToggleButton && isRight(e)) {
			if (!this.expanded) {
				this.fireEvent<TreeItemBaseToggleEventDetail>("toggle", { item: this });
			} else {
				this.fireEvent<TreeItemBaseStepInEventDetail>("step-in", { item: this });
			}
		}

		if (!this._fixed && isLeft(e)) {
			if (this.expanded) {
				this.fireEvent<TreeItemBaseToggleEventDetail>("toggle", { item: this });
			} else if (this.hasParent) {
				this.fireEvent<TreeItemBaseStepOutEventDetail>("step-out", { item: this });
			}
		}
	}

	get iconAccessibleName(): string {
		return this.expanded ? TreeItemBase.i18nBundle.getText(TREE_ITEM_COLLAPSE_NODE) : TreeItemBase.i18nBundle.getText(TREE_ITEM_EXPAND_NODE);
	}

	static async onDefine() {
		[TreeItemBase.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			super.onDefine(),
		]);
	}
}

export default TreeItemBase;
export type {
	TreeItemBaseToggleEventDetail,
	TreeItemBaseStepInEventDetail,
	TreeItemBaseStepOutEventDetail,
};
