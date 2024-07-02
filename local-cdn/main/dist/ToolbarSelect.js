var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import { registerToolbarItem } from "./ToolbarRegistry.js";
// Templates
import ToolbarSelectTemplate from "./generated/templates/ToolbarSelectTemplate.lit.js";
import ToolbarPopoverSelectTemplate from "./generated/templates/ToolbarPopoverSelectTemplate.lit.js";
import ToolbarItem from "./ToolbarItem.js";
import Select from "./Select.js";
import Option from "./Option.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
let ToolbarSelect = class ToolbarSelect extends ToolbarItem {
    static get toolbarTemplate() {
        return ToolbarSelectTemplate;
    }
    static get toolbarPopoverTemplate() {
        return ToolbarPopoverSelectTemplate;
    }
    get subscribedEvents() {
        const map = new Map();
        map.set("click", { preventClosing: true });
        map.set("ui5-change", { preventClosing: false });
        map.set("ui5-open", { preventClosing: true });
        map.set("ui5-close", { preventClosing: true });
        return map;
    }
    constructor() {
        super();
        this._onEvent = this._onEventHandler.bind(this);
    }
    onEnterDOM() {
        this.attachEventListeners();
    }
    onExitDOM() {
        this.detachEventListeners();
    }
    attachEventListeners() {
        [...this.subscribedEvents.keys()].forEach(e => {
            this.addEventListener(e, this._onEvent);
        });
    }
    detachEventListeners() {
        [...this.subscribedEvents.keys()].forEach(e => {
            this.removeEventListener(e, this._onEvent);
        });
    }
    _onEventHandler(e) {
        if (e.type === "ui5-change") {
            // update options
            const selectedOption = e.detail.selectedOption;
            const selectedOptionIndex = Number(selectedOption?.getAttribute("data-ui5-external-action-item-index"));
            this.options.forEach((option, index) => {
                if (index === selectedOptionIndex) {
                    option.setAttribute("selected", "");
                }
                else {
                    option.removeAttribute("selected");
                }
            });
        }
    }
    get styles() {
        return {
            width: this.width,
        };
    }
};
__decorate([
    property({ validator: CSSSize })
], ToolbarSelect.prototype, "width", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], ToolbarSelect.prototype, "options", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], ToolbarSelect.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarSelect.prototype, "disabled", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "accessibleName", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "accessibleNameRef", void 0);
ToolbarSelect = __decorate([
    customElement({
        tag: "ui5-toolbar-select",
        dependencies: [Select, Option],
    })
    /**
     * Fired when the selected option changes.
     * @allowPreventDefault
     * @param {HTMLElement} selectedOption the selected option.
     * @public
     */
    ,
    event("change", {
        detail: {
            /**
            * @public
            */
            selectedOption: { type: HTMLElement },
        },
    })
    /**
     * Fired after the component's dropdown menu opens.
     * @public
     */
    ,
    event("open")
    /**
     * Fired after the component's dropdown menu closes.
     * @public
     */
    ,
    event("close")
], ToolbarSelect);
registerToolbarItem(ToolbarSelect);
ToolbarSelect.define();
export default ToolbarSelect;
//# sourceMappingURL=ToolbarSelect.js.map