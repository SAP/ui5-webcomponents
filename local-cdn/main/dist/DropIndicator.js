var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import DropIndicatorTemplate from "./generated/templates/DropIndicatorTemplate.lit.js";
// Styles
import DropIndicatorCss from "./generated/themes/DropIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DropIndicator.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
let DropIndicator = class DropIndicator extends UI5Element {
    get _positionProperty() {
        if (this.orientation === Orientation.Vertical) {
            return "left";
        }
        return "top";
    }
    constructor() {
        super();
    }
    onAfterRendering() {
        if (!this.targetReference || !this.ownerReference) {
            Object.assign(this.style, {
                display: "none",
            });
            return;
        }
        const { left, width, right, top, bottom, height, } = this.targetReference.getBoundingClientRect();
        const { top: containerTop, } = this.ownerReference.getBoundingClientRect();
        const style = {
            display: "",
            [this._positionProperty]: "",
            width: "",
            height: "",
        };
        let position = 0;
        if (this.orientation === Orientation.Vertical) {
            switch (this.placement) {
                case MovePlacement.Before:
                    position = left - this._needle.offsetWidth / 2;
                    break;
                case MovePlacement.On:
                    style.width = `${width}px`;
                    position = left;
                    break;
                case MovePlacement.After:
                    position = right - this._needle.offsetWidth / 2;
                    break;
            }
            style.height = `${height}px`;
        }
        if (this.orientation === Orientation.Horizontal) {
            switch (this.placement) {
                case MovePlacement.Before:
                    position = top;
                    break;
                case MovePlacement.On:
                    style.height = `${height}px`;
                    position = top;
                    break;
                case MovePlacement.After:
                    position = bottom;
                    break;
            }
            style.width = `${width}px`;
            position -= containerTop;
        }
        style[this._positionProperty] = `${position}px`;
        Object.assign(this.style, style);
    }
    get classes() {
        return {
            root: {
                "ui5-di-rect": this.placement === MovePlacement.On,
                "ui5-di-needle": this.placement !== MovePlacement.On,
            },
        };
    }
    get _needle() {
        return this.shadowRoot.querySelector(".ui5-di-needle");
    }
};
__decorate([
    property({ type: Object, defaultValue: null })
], DropIndicator.prototype, "targetReference", void 0);
__decorate([
    property({ type: Object, defaultValue: null })
], DropIndicator.prototype, "ownerReference", void 0);
__decorate([
    property({ type: MovePlacement, defaultValue: MovePlacement.Before })
], DropIndicator.prototype, "placement", void 0);
__decorate([
    property({ type: Orientation, defaultValue: Orientation.Vertical })
], DropIndicator.prototype, "orientation", void 0);
DropIndicator = __decorate([
    customElement({
        tag: "ui5-drop-indicator",
        renderer: litRender,
        styles: DropIndicatorCss,
        template: DropIndicatorTemplate,
        dependencies: [],
    })
], DropIndicator);
DropIndicator.define();
export default DropIndicator;
//# sourceMappingURL=DropIndicator.js.map