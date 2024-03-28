var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SegmentedButton_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { isSpace, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import SegmentedButtonMode from "./types/SegmentedButtonMode.js";
// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";
// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 * **Note:** There can be just one selected `item` at a time.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 */
let SegmentedButton = SegmentedButton_1 = class SegmentedButton extends UI5Element {
    static async onDefine() {
        SegmentedButton_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
        this._itemNavigation = new ItemNavigation(this, {
            getItemsCallback: () => this.getSlottedNodes("items"),
        });
        this.hasPreviouslyFocusedItem = false;
    }
    onBeforeRendering() {
        const items = this.getSlottedNodes("items");
        items.forEach((item, index, arr) => {
            item.posInSet = index + 1;
            item.sizeOfSet = arr.length;
        });
        this.normalizeSelection();
        this.style.setProperty(getScopedVarName("--_ui5_segmented_btn_items_count"), `${items.length}`);
    }
    normalizeSelection() {
        if (!this.items.length) {
            return;
        }
        switch (this.mode) {
            case SegmentedButtonMode.SingleSelect: {
                const selectedItems = this.selectedItems;
                const selectedItemIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;
                if (this._selectedItem && selectedItems.length > 1) {
                    selectedItems.splice(selectedItemIndex, 1);
                }
                const selectedItem = selectedItems.pop() || this.items[0];
                this._applySingleSelection(selectedItem);
                break;
            }
            default:
        }
    }
    _selectItem(e) {
        const target = e.target;
        const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");
        if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
            return;
        }
        switch (this.mode) {
            case SegmentedButtonMode.MultiSelect:
                if (e instanceof KeyboardEvent) {
                    target.pressed = !target.pressed;
                }
                break;
            default:
                this._applySingleSelection(target);
        }
        this.fireEvent("selection-change", {
            selectedItem: target,
            selectedItems: this.selectedItems,
        });
        this._itemNavigation.setCurrentItem(target);
        target.focus();
        return this;
    }
    _applySingleSelection(item) {
        this.items.forEach(currentItem => {
            currentItem.pressed = false;
        });
        item.pressed = true;
        this._selectedItem = item;
    }
    _onclick(e) {
        this._selectItem(e);
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._selectItem(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectItem(e);
        }
    }
    _onmousedown(e) {
        const eventTarget = e.target;
        const isTargetSegmentedButtonItem = eventTarget.hasAttribute("ui5-segmented-button-item");
        if (isTargetSegmentedButtonItem) {
            eventTarget.focus();
            this._itemNavigation.setCurrentItem(eventTarget);
            this.hasPreviouslyFocusedItem = true;
        }
    }
    _onfocusin(e) {
        // If the component was previously focused,
        // update the ItemNavigation to sync the button's tabindex values
        if (this.hasPreviouslyFocusedItem) {
            this._itemNavigation.setCurrentItem(e.target);
            return;
        }
        // If the component is focused for the first time
        // focus the selected item if such is present
        if (this.selectedItems.length) {
            this.selectedItems[0].focus();
            this._itemNavigation.setCurrentItem(this.selectedItems[0]);
            this.hasPreviouslyFocusedItem = true;
        }
    }
    /**
     * Currently selected item.
     * @deprecated since 1.14.0. This method will be removed in the next major release.
     * Please use the `selectedItems` property instead.
     * @public
     * @default undefined
     */
    get selectedItem() {
        return this._selectedItem;
    }
    /**
     * Returns an array of the currently selected items.
     * @since 1.14.0
     * @public
     * @default []
     */
    get selectedItems() {
        return this.items.filter(item => item.pressed);
    }
    get ariaDescribedBy() {
        return SegmentedButton_1.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY);
    }
    get ariaDescription() {
        return SegmentedButton_1.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
    }
};
__decorate([
    property({ defaultValue: undefined })
], SegmentedButton.prototype, "accessibleName", void 0);
__decorate([
    property({ type: SegmentedButtonMode, defaultValue: SegmentedButtonMode.SingleSelect })
], SegmentedButton.prototype, "mode", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SegmentedButton.prototype, "items", void 0);
SegmentedButton = SegmentedButton_1 = __decorate([
    customElement({
        tag: "ui5-segmented-button",
        languageAware: true,
        renderer: litRender,
        template: SegmentedButtonTemplate,
        styles: SegmentedButtonCss,
        dependencies: [SegmentedButtonItem],
    })
    /**
     * Fired when the selected item changes.
     * @param {ISegmentedButtonItem} selectedItem the pressed item.
     * @param {Array<ISegmentedButtonItem>} selectedItems an array of selected items.
     * @public
     */
    ,
    event("selection-change", {
        detail: {
            /**
             * @public
             * @deprecated deprecated since 1.14.0 and will be removed in the next major release, use the `selectedItems` parameter instead.
             */
            selectedItem: { type: HTMLElement },
            /**
             * @public
             * @since 1.14.0
             */
            selectedItems: { type: Array },
        },
    })
], SegmentedButton);
SegmentedButton.define();
export default SegmentedButton;
//# sourceMappingURL=SegmentedButton.js.map