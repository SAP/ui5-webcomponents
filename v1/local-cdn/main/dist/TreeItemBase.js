var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TreeItemBase_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import { TREE_ITEM_ARIA_LABEL, TREE_ITEM_EXPAND_NODE, TREE_ITEM_COLLAPSE_NODE, } from "./generated/i18n/i18n-defaults.js";
// Template
import TreeItemBaseTemplate from "./generated/templates/TreeItemBaseTemplate.lit.js";
// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";
/**
 * A class to serve as a foundation
 * for the `TreeItem` and `TreeItemCustom` classes.
 * @abstract
 * @constructor
 * @extends ListItem
 * @public
 */
let TreeItemBase = TreeItemBase_1 = class TreeItemBase extends ListItem {
    onBeforeRendering() {
        this.actionable = false;
        this.showToggleButton = this.requiresToggleButton;
    }
    get classes() {
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
        return this.accessibleRoleDescription ? undefined : TreeItemBase_1.i18nBundle.getText(TREE_ITEM_ARIA_LABEL);
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
            ariaHaspopup: this.ariaHaspopup?.toLowerCase() || undefined,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
    /**
     * Used to duck-type TreeItem elements without using instanceof
     * @default true
     * @protected
     */
    get isTreeItem() {
        return true;
    }
    /**
     * Call this method to manually switch the `expanded` state of a tree item.
     * @public
     */
    toggle() {
        this.expanded = !this.expanded;
    }
    _toggleClick(e) {
        e.stopPropagation();
        this.fireEvent("toggle", { item: this });
    }
    _onkeydown(e) {
        super._onkeydown(e);
        if (!this._fixed && this.showToggleButton && isRight(e)) {
            if (!this.expanded) {
                this.fireEvent("toggle", { item: this });
            }
            else {
                this.fireEvent("step-in", { item: this });
            }
        }
        if (!this._fixed && isLeft(e)) {
            if (this.expanded) {
                this.fireEvent("toggle", { item: this });
            }
            else if (this.hasParent) {
                this.fireEvent("step-out", { item: this });
            }
        }
    }
    get iconAccessibleName() {
        return this.expanded ? TreeItemBase_1.i18nBundle.getText(TREE_ITEM_COLLAPSE_NODE) : TreeItemBase_1.i18nBundle.getText(TREE_ITEM_EXPAND_NODE);
    }
    static async onDefine() {
        [TreeItemBase_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            super.onDefine(),
        ]);
    }
};
__decorate([
    property({ validator: Integer, defaultValue: 1 })
], TreeItemBase.prototype, "level", void 0);
__decorate([
    property()
], TreeItemBase.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "showToggleButton", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "hasChildren", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], TreeItemBase.prototype, "additionalTextState", void 0);
__decorate([
    property()
], TreeItemBase.prototype, "accessibleName", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1, noAttribute: true })
], TreeItemBase.prototype, "forcedSetsize", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1, noAttribute: true })
], TreeItemBase.prototype, "forcedPosinset", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "_fixed", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: {
            properties: false,
            slots: ["default"],
        },
        "default": true,
    })
], TreeItemBase.prototype, "items", void 0);
TreeItemBase = TreeItemBase_1 = __decorate([
    customElement({
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
    ,
    event("toggle", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user drills down into the tree hierarchy by pressing the right arrow on the tree node.
     * @param {HTMLElement} item the item on which right arrow was pressed.
     * @protected
     */
    ,
    event("step-in", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user goes up the tree hierarchy by pressing the left arrow on the tree node.
     * @param {HTMLElement} item the item on which left arrow was pressed.
     * @protected
     */
    ,
    event("step-out", {
        detail: {
            item: { type: HTMLElement },
        },
    })
], TreeItemBase);
export default TreeItemBase;
//# sourceMappingURL=TreeItemBase.js.map