var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TabSeparator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TabContainer from "./TabContainer.js";
// Templates
import TabSeparatorInStripTemplate from "./generated/templates/TabSeparatorInStripTemplate.lit.js";
import TabSeparatorInOverflowTemplate from "./generated/templates/TabSeparatorInOverflowTemplate.lit.js";
// Styles
import stripCss from "./generated/themes/TabSeparatorInStrip.css.js";
import overflowCss from "./generated/themes/TabSeparatorInOverflow.css.js";
/**
 * @class
 * The `ui5-tab-separator` represents a vertical line to separate tabs inside a `ui5-tabcontainer`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ITab}
 * @public
 */
let TabSeparator = TabSeparator_1 = class TabSeparator extends UI5Element {
    static get stripTemplate() {
        return TabSeparatorInStripTemplate;
    }
    static get overflowTemplate() {
        return TabSeparatorInOverflowTemplate;
    }
    get classes() {
        return {
            root: {
                "ui5-tc__separator": true,
            },
        };
    }
    get isSeparator() {
        return true;
    }
    /**
     * Returns the DOM reference of the separator that is placed in the header.
     *
     * **Note:** Tabs and separators, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs or separators will return `null`.
     * @public
     */
    getTabInStripDomRef() {
        if (this.getElementInStrip) {
            return this.getElementInStrip();
        }
        return null;
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    get stripPresentation() {
        return executeTemplate(TabSeparator_1.stripTemplate, this);
    }
    get overflowPresentation() {
        return executeTemplate(TabSeparator_1.overflowTemplate, this);
    }
};
__decorate([
    property({ type: Object, defaultValue: null })
], TabSeparator.prototype, "realTabReference", void 0);
TabSeparator = TabSeparator_1 = __decorate([
    customElement({
        tag: "ui5-tab-separator",
        renderer: litRender,
    })
], TabSeparator);
TabSeparator.define();
TabContainer.registerTabStyles(stripCss);
TabContainer.registerStaticAreaTabStyles(overflowCss);
export default TabSeparator;
//# sourceMappingURL=TabSeparator.js.map