var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import TreeItem from "./TreeItem.js";
import TreeItemCustom from "./TreeItemCustom.js";
import TreeList from "./TreeList.js";
import ListMode from "./types/ListMode.js";
// Template
import TreeTemplate from "./generated/templates/TreeTemplate.lit.js";
// Styles
import TreeCss from "./generated/themes/Tree.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-tree` component provides a tree structure for displaying data in a hierarchy.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - To display hierarchically structured items.
 * - To select one or more items out of a set of hierarchically structured items.
 *
 * #### When not to use:
 *
 * - To display items not hierarchically structured. In this case, use the List component.
 * - To select one item from a very small number of non-hierarchical items. Select or ComboBox might be more appropriate.
 * - The hierarchy turns out to have only two levels. In this case, use List with group items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-tree` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - [Up] or [Down] - Navigates up and down the tree items that are currently visible.
 * - [Right] - Drills down the tree by expanding the tree nodes.
 * - [Left] - Goes up the tree and collapses the tree nodes.
 *
 * The user can use the following keyboard shortcuts to perform selection,
 * when the `mode` property is in use:
 *
 * - [Space] - Selects the currently focused item upon keyup.
 * - [Enter]  - Selects the currently focused item upon keydown.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Tree.js";`
 *
 * `import "@ui5/webcomponents/dist/TreeItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
let Tree = class Tree extends UI5Element {
    onBeforeRendering() {
        this._prepareTreeItems();
    }
    onAfterRendering() {
        // Note: this is a workaround for the problem that the list cannot invalidate itself when its only physical child is a slot (and the list items are inside the slot)
        // This code should be removed once a framework-level fix is implemented
        this.shadowRoot.querySelector("[ui5-tree-list]").onBeforeRendering();
    }
    get list() {
        return this.getDomRef();
    }
    get _role() {
        return "tree";
    }
    get _label() {
        return getEffectiveAriaLabelText(this);
    }
    get _hasHeader() {
        return !!this.header.length;
    }
    _onListItemStepIn(e) {
        const treeItem = e.detail.item;
        if (treeItem.items.length > 0) {
            const firstChild = treeItem.items[0];
            const firstChildListItem = this._getListItemForTreeItem(firstChild);
            firstChildListItem && this.list.focusItem(firstChildListItem);
        }
    }
    _onListItemStepOut(e) {
        const treeItem = e.detail.item;
        if (treeItem.parentElement !== this) {
            const parent = treeItem.parentElement;
            const parentListItem = this._getListItemForTreeItem(parent);
            parentListItem && this.list.focusItem(parentListItem);
        }
    }
    _onListItemToggle(e) {
        const treeItem = e.detail.item;
        const defaultPrevented = !this.fireEvent("item-toggle", { item: treeItem }, true);
        if (!defaultPrevented) {
            treeItem.toggle();
        }
    }
    _onListItemClick(e) {
        const treeItem = e.detail.item;
        if (!this.fireEvent("item-click", { item: treeItem }, true)) {
            e.preventDefault();
        }
    }
    _onListItemDelete(e) {
        const treeItem = e.detail.item;
        this.fireEvent("item-delete", { item: treeItem });
    }
    _onListItemFocus(e) {
        const treeItem = e.detail.item;
        this.fireEvent("item-focus", { item: treeItem });
    }
    _onListItemMouseOver(e) {
        const target = e.target;
        if (this._isInstanceOfTreeItemBase(target)) {
            this.fireEvent("item-mouseover", { item: target });
        }
    }
    _onListItemMouseOut(e) {
        const target = e.target;
        if (this._isInstanceOfTreeItemBase(target)) {
            this.fireEvent("item-mouseout", { item: target });
        }
    }
    _onListSelectionChange(e) {
        const previouslySelectedItems = e.detail.previouslySelectedItems;
        const selectedItems = e.detail.selectedItems;
        const targetItem = e.detail.targetItem;
        previouslySelectedItems.forEach(item => {
            item.selected = false;
        });
        selectedItems.forEach(item => {
            item.selected = true;
        });
        this.fireEvent("selection-change", {
            previouslySelectedItems,
            selectedItems,
            targetItem,
        });
    }
    _prepareTreeItems() {
        // set level to tree items
        this.walk((item, level, index) => {
            const parent = item.parentNode;
            const ariaSetSize = (parent && parent.children.length) || this.items.length;
            item.setAttribute("level", level.toString());
            item.forcedSetsize = ariaSetSize;
            item.forcedPosinset = index + 1;
        });
    }
    /**
     * Returns the corresponding list item for a given tree item
     * @param item The tree item
     * @protected
     */
    _getListItemForTreeItem(item) {
        return this.getItems().find(listItem => listItem === item);
    }
    /**
     * Returns the a flat array of all tree items
     * @protected
     * @returns array of the tree items
     */
    getItems() {
        return this.list.getItems();
    }
    /**
     * Focus a tree item by its index in the flat array of all tree items
     * @protected
     * @param index
     */
    focusItemByIndex(index) {
        const item = this.getItems()[index];
        item && this.list.focusItem(item);
    }
    /**
     * Perform Depth-First-Search walk on the tree and run a callback on each node
     * @public
     * @param callback function to execute on each node of the tree with 3 arguments: the node, the level and the index
     */
    walk(callback) {
        walkTree(this, 1, callback);
    }
    _isInstanceOfTreeItemBase(object) {
        return "isTreeItem" in object;
    }
};
__decorate([
    property({ type: ListMode, defaultValue: ListMode.None })
], Tree.prototype, "mode", void 0);
__decorate([
    property()
], Tree.prototype, "noDataText", void 0);
__decorate([
    property()
], Tree.prototype, "headerText", void 0);
__decorate([
    property()
], Tree.prototype, "footerText", void 0);
__decorate([
    property()
], Tree.prototype, "accessibleName", void 0);
__decorate([
    property()
], Tree.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ defaultValue: undefined, noAttribute: true })
], Tree.prototype, "accessibleRoleDescription", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Tree.prototype, "items", void 0);
__decorate([
    slot()
], Tree.prototype, "header", void 0);
Tree = __decorate([
    customElement({
        tag: "ui5-tree",
        renderer: litRender,
        styles: TreeCss,
        template: TreeTemplate,
        dependencies: [
            TreeList,
            TreeItem,
            TreeItemCustom,
        ],
    })
    /**
     * Fired when a tree item is expanded or collapsed.
     *
     * **Note:** You can call `preventDefault()` on the event object to suppress the event, if needed.
     * This may be handy for example if you want to dynamically load tree items upon the user expanding a node.
     * Even if you prevented the event's default behavior, you can always manually call `toggle()` on a tree item.
     * @param {HTMLElement} item the toggled item.
     * @allowPreventDefault
     * @public
     */
    ,
    event("item-toggle", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the mouse cursor enters the tree item borders.
     * @param {HTMLElement} item the hovered item.
     * @since 1.0.0-rc.16
     * @public
     */
    ,
    event("item-mouseover", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the mouse cursor leaves the tree item borders.
     * @param {HTMLElement} item the hovered item.
     * @since 1.0.0-rc.16
     * @public
     */
    ,
    event("item-mouseout", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when a tree item is activated.
     * @allowPreventDefault
     * @param {HTMLElement} item The clicked item.
     * @public
     */
    ,
    event("item-click", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the Delete button of any tree item is pressed.
     *
     * **Note:** A Delete button is displayed on each item,
     * when the component `mode` property is set to `Delete`.
     * @param {HTMLElement} item the deleted item.
     * @public
     */
    ,
    event("item-delete", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when a tree item is focused.
     * @param {HTMLElement} item The focused item.
     * @private
     */
    ,
    event("item-focus", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when selection is changed by user interaction
     * in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.
     * @param {Array} selectedItems An array of the selected items.
     * @param {Array} previouslySelectedItems An array of the previously selected items.
     * @param {HTMLElement} targetItem The item triggering the event.
     * @public
     */
    ,
    event("selection-change", {
        detail: {
            /**
             * @public
             */
            selectedItems: { type: Array },
            /**
             * @public
             */
            previouslySelectedItems: { type: Array },
            /**
             * @public
             */
            targetItem: { type: HTMLElement },
        },
    })
], Tree);
const walkTree = (el, level, callback) => {
    (el.items).forEach((item, index) => {
        callback(item, level, index);
        if (item.items.length > 0) {
            walkTree(item, level + 1, callback);
        }
    });
};
Tree.define();
export default Tree;
//# sourceMappingURL=Tree.js.map