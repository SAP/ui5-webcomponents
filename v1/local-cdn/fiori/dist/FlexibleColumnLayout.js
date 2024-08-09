var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FlexibleColumnLayout_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import FCLLayout from "./types/FCLLayout.js";
import { getLayoutsByMedia, getNextLayoutByStartArrow, getNextLayoutByEndArrow, } from "./fcl-utils/FCLLayout.js";
// Texts
import { FCL_START_COLUMN_TXT, FCL_MIDDLE_COLUMN_TXT, FCL_END_COLUMN_TXT, FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP, FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP, FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP, FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP, } from "./generated/i18n/i18n-defaults.js";
// Template
import FlexibleColumnLayoutTemplate from "./generated/templates/FlexibleColumnLayoutTemplate.lit.js";
// Styles
import FlexibleColumnLayoutCss from "./generated/themes/FlexibleColumnLayout.css.js";
var MEDIA;
(function (MEDIA) {
    MEDIA["PHONE"] = "phone";
    MEDIA["TABLET"] = "tablet";
    MEDIA["DESKTOP"] = "desktop";
})(MEDIA || (MEDIA = {}));
const BREAKPOINTS = {
    "PHONE": 599,
    "TABLET": 1023,
};
/**
 * @class
 *
 * ### Overview
 *
 * The `FlexibleColumnLayout` implements the list-detail-detail paradigm by displaying up to three pages in separate columns.
 * There are several possible layouts that can be changed either with the component API, or by pressing the arrows, displayed between the columns.
 *
 * ### Usage
 *
 * Use this component for applications that need to display several logical levels of related information side by side (e.g. list of items, item, sub-item, etc.).
 * The Component is flexible in a sense that the application can focus the user's attention on one particular column.
 *
 * ### Responsive Behavior
 *
 * The `FlexibleColumnLayout` automatically displays the maximum possible number of columns based on `layout` property and the window size.
 * The component would display 1 column for window size smaller than 599px, up to two columns between 599px and 1023px,
 * and 3 columns for sizes bigger than 1023px.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 *
 * - [Space] / [Enter] or [Return] - If focus is on the layout toggle button (arrow button), once activated, it triggers the associated action (such as expand/collapse the column).
 * - This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
let FlexibleColumnLayout = FlexibleColumnLayout_1 = class FlexibleColumnLayout extends UI5Element {
    constructor() {
        super();
        this.columnResizeHandler = (e) => {
            e.target.classList.add("ui5-fcl-column--hidden");
        };
        this._prevLayout = null;
        this.initialRendering = true;
        this._handleResize = this.handleResize.bind(this);
    }
    static async onDefine() {
        FlexibleColumnLayout_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
    static get ANIMATION_DURATION() {
        return getAnimationMode() !== AnimationMode.None ? 560 : 0;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize.bind(this));
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResize);
    }
    onAfterRendering() {
        if (this.initialRendering) {
            this.handleInitialRendering();
            return;
        }
        this.syncLayout();
    }
    handleInitialRendering() {
        this._prevLayout = this.layout;
        this.updateLayout();
        this.initialRendering = false;
    }
    handleResize() {
        if (this.initialRendering) {
            return;
        }
        // store the previous layout
        const prevLayoutHash = this.columnLayout.join();
        // update the column layout, based on the current width
        this.updateLayout();
        // fire layout-change if the column layout changed
        if (prevLayoutHash !== this.columnLayout.join()) {
            this.fireLayoutChange(false, true);
        }
    }
    startArrowClick() {
        this.arrowClick({ start: true, end: false });
    }
    endArrowClick() {
        this.arrowClick({ start: false, end: true });
    }
    arrowClick(options) {
        // update public property
        this.layout = this.nextLayout(this.layout, { start: options.start, end: options.end });
        // update layout
        this.updateLayout();
        // fire layout-change
        this.fireLayoutChange(true, false);
    }
    updateLayout() {
        this._width = this.widthDOM;
        this._columnLayout = this.nextColumnLayout(this.layout);
        this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
        this.toggleColumns();
    }
    syncLayout() {
        if (this._prevLayout !== this.layout) {
            this.updateLayout();
            this._prevLayout = this.layout;
        }
    }
    toggleColumns() {
        this.toggleColumn("start");
        this.toggleColumn("mid");
        this.toggleColumn("end");
    }
    toggleColumn(column) {
        let columnWidth;
        let columnDOM;
        if (column === "start") {
            columnWidth = this.startColumnWidth;
            columnDOM = this.startColumnDOM;
        }
        else if (column === "mid") {
            columnWidth = this.midColumnWidth;
            columnDOM = this.midColumnDOM;
        }
        else {
            columnWidth = this.endColumnWidth;
            columnDOM = this.endColumnDOM;
        }
        const currentlyHidden = this._isColumnHidden(columnWidth);
        const previouslyHidden = this._isColumnHidden(columnDOM.style.width);
        // no change
        if (currentlyHidden && previouslyHidden) {
            return;
        }
        // column resizing: from 33% to 67%, from 25% to 50%, etc.
        if (!currentlyHidden && !previouslyHidden) {
            columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
            return;
        }
        // hide column: 33% to 0, 25% to 0, etc .
        if (currentlyHidden) {
            // animate the width
            columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
            // hide column with delay to allow the animation runs entirely
            columnDOM.addEventListener("transitionend", this.columnResizeHandler);
            return;
        }
        // show column: from 0 to 33%, from 0 to 25%, etc.
        if (previouslyHidden) {
            columnDOM.removeEventListener("transitionend", this.columnResizeHandler);
            columnDOM.classList.remove("ui5-fcl-column--hidden");
            columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
        }
    }
    nextLayout(layout, arrowsInfo) {
        if (!arrowsInfo) {
            return;
        }
        if (arrowsInfo.start) {
            return getNextLayoutByStartArrow()[layout];
        }
        if (arrowsInfo.end) {
            return getNextLayoutByEndArrow()[layout];
        }
    }
    nextColumnLayout(layout) {
        return this._effectiveLayoutsByMedia[this.media][layout].layout;
    }
    calcVisibleColumns(colLayout) {
        return colLayout.filter(colWidth => !this._isColumnHidden(colWidth)).length;
    }
    fireLayoutChange(arrowUsed, resize) {
        this.fireEvent("layout-change", {
            layout: this.layout,
            columnLayout: this._columnLayout,
            startColumnVisible: this.startColumnVisible,
            midColumnVisible: this.midColumnVisible,
            endColumnVisible: this.endColumnVisible,
            arrowUsed,
            arrowsUsed: arrowUsed,
            resize,
        });
    }
    /**
     * Checks if a column is hidden based on its width.
     */
    _isColumnHidden(columnWidth) {
        return columnWidth === 0 || columnWidth === "0px";
    }
    /**
    * Returns the current column layout, based on both the `layout` property and the screen size.
    *
    * **For example:** ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
    * where the numbers represents the width of the start, middle and end columns.
    * @default undefined
    * @public
    */
    get columnLayout() {
        return this._columnLayout;
    }
    /**
    * Returns if the `start` column is visible.
    * @default true
    * @public
    */
    get startColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[0]);
        }
        return false;
    }
    /**
    * Returns if the `middle` column is visible.
    * @default false
    * @public
    */
    get midColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[1]);
        }
        return false;
    }
    /**
    * Returns if the `end` column is visible.
    * @default false
    * @public
    */
    get endColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[2]);
        }
        return false;
    }
    /**
    * Returns the number of currently visible columns.
    * @default 1
    * @public
    */
    get visibleColumns() {
        return this._visibleColumns;
    }
    get classes() {
        const hasAnimation = getAnimationMode() !== AnimationMode.None;
        return {
            root: {
                "ui5-fcl-root": true,
            },
            columns: {
                start: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--start": true,
                },
                middle: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--middle": true,
                },
                end: {
                    "ui5-fcl-column": true,
                    "ui5-fcl-column-animation": hasAnimation,
                    "ui5-fcl-column--end": true,
                },
            },
        };
    }
    get styles() {
        return {
            arrowsContainer: {
                start: {
                    display: this.showStartSeparator ? "flex" : "none",
                },
                end: {
                    display: this.showEndSeparator ? "flex" : "none",
                },
            },
            arrows: {
                start: {
                    display: this.showStartArrow ? "inline-block" : "none",
                    transform: this.startArrowDirection === "mirror" ? "rotate(180deg)" : "",
                },
                end: {
                    display: this.showEndArrow ? "inline-block" : "none",
                    transform: this.endArrowDirection === "mirror" ? "rotate(180deg)" : "",
                },
            },
        };
    }
    get startColumnWidth() {
        return this._columnLayout ? this._columnLayout[0] : "100%";
    }
    get midColumnWidth() {
        return this._columnLayout ? this._columnLayout[1] : "0px";
    }
    get endColumnWidth() {
        return this._columnLayout ? this._columnLayout[2] : "0px";
    }
    get showStartSeparator() {
        return this.effectiveArrowsInfo[0].separator || this.startArrowVisibility;
    }
    get showEndSeparator() {
        return this.effectiveArrowsInfo[1].separator || this.endArrowVisibility;
    }
    get showStartArrow() {
        return this.hideArrows ? false : this.startArrowVisibility;
    }
    get showEndArrow() {
        return this.hideArrows ? false : this.endArrowVisibility;
    }
    get startArrowVisibility() {
        return this.effectiveArrowsInfo[0].visible;
    }
    get endArrowVisibility() {
        return this.effectiveArrowsInfo[1].visible;
    }
    get startArrowDirection() {
        return this.effectiveArrowsInfo[0].dir;
    }
    get endArrowDirection() {
        return this.effectiveArrowsInfo[1].dir;
    }
    get effectiveArrowsInfo() {
        return this._effectiveLayoutsByMedia[this.media][this.layout].arrows;
    }
    get media() {
        if (this._width <= BREAKPOINTS.PHONE) {
            return MEDIA.PHONE;
        }
        if (this._width <= BREAKPOINTS.TABLET) {
            return MEDIA.TABLET;
        }
        return MEDIA.DESKTOP;
    }
    get widthDOM() {
        return this.getBoundingClientRect().width;
    }
    get startColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--start");
    }
    get midColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--middle");
    }
    get endColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--end");
    }
    get accStartColumnText() {
        return this.accessibilityTexts.startColumnAccessibleName || FlexibleColumnLayout_1.i18nBundle.getText(FCL_START_COLUMN_TXT);
    }
    get accMiddleColumnText() {
        return this.accessibilityTexts.midColumnAccessibleName || FlexibleColumnLayout_1.i18nBundle.getText(FCL_MIDDLE_COLUMN_TXT);
    }
    get accEndColumnText() {
        return this.accessibilityTexts.endColumnAccessibleName || FlexibleColumnLayout_1.i18nBundle.getText(FCL_END_COLUMN_TXT);
    }
    get accStartArrowContainerText() {
        return this.accessibilityTexts.startArrowContainerAccessibleName || undefined;
    }
    get accEndArrowContainerText() {
        return this.accessibilityTexts.endArrowContainerAccessibleName || undefined;
    }
    get accStartColumnRole() {
        if (this.startColumnVisible) {
            return this.accessibilityRoles.startColumnRole || "region";
        }
        return undefined;
    }
    get accMiddleColumnRole() {
        if (this.midColumnVisible) {
            return this.accessibilityRoles.midColumnRole || "region";
        }
        return undefined;
    }
    get accEndColumnRole() {
        if (this.endColumnVisible) {
            return this.accessibilityRoles.endColumnRole || "region";
        }
        return undefined;
    }
    get accStartArrowContainerRole() {
        return this.accessibilityRoles.startArrowContainerRole || undefined;
    }
    get accEndArrowContainerRole() {
        return this.accessibilityRoles.endArrowContainerRole || undefined;
    }
    get _effectiveLayoutsByMedia() {
        return this._layoutsConfiguration || getLayoutsByMedia();
    }
    get _accAttributes() {
        return {
            columns: {
                start: {
                    role: this.accStartColumnRole,
                    ariaHidden: !this.startColumnVisible || undefined,
                },
                middle: {
                    role: this.accMiddleColumnRole,
                    ariaHidden: !this.midColumnVisible || undefined,
                },
                end: {
                    role: this.accEndColumnRole,
                    ariaHidden: !this.endColumnVisible || undefined,
                },
            },
        };
    }
    get accStartArrowText() {
        const customTexts = this.accessibilityTexts;
        if (this.startArrowDirection === "mirror") {
            return customTexts.startArrowLeftText || FlexibleColumnLayout_1.i18nBundle.getText(FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
        }
        return customTexts.startArrowRightText || FlexibleColumnLayout_1.i18nBundle.getText(FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP);
    }
    get accEndArrowText() {
        const customTexts = this.accessibilityTexts;
        if (this.endArrowDirection === "mirror") {
            return customTexts.endArrowRightText || FlexibleColumnLayout_1.i18nBundle.getText(FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
        }
        return customTexts.endArrowLeftText || FlexibleColumnLayout_1.i18nBundle.getText(FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP);
    }
};
__decorate([
    property({ type: FCLLayout, defaultValue: FCLLayout.OneColumn })
], FlexibleColumnLayout.prototype, "layout", void 0);
__decorate([
    property({ type: Boolean })
], FlexibleColumnLayout.prototype, "hideArrows", void 0);
__decorate([
    property({ type: Object })
], FlexibleColumnLayout.prototype, "accessibilityTexts", void 0);
__decorate([
    property({ type: Object })
], FlexibleColumnLayout.prototype, "accessibilityRoles", void 0);
__decorate([
    property({ validator: Float, defaultValue: 0 })
], FlexibleColumnLayout.prototype, "_width", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], FlexibleColumnLayout.prototype, "_columnLayout", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], FlexibleColumnLayout.prototype, "_visibleColumns", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], FlexibleColumnLayout.prototype, "_layoutsConfiguration", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "startColumn", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "midColumn", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "endColumn", void 0);
FlexibleColumnLayout = FlexibleColumnLayout_1 = __decorate([
    customElement({
        tag: "ui5-flexible-column-layout",
        fastNavigation: true,
        renderer: litRender,
        styles: FlexibleColumnLayoutCss,
        template: FlexibleColumnLayoutTemplate,
        dependencies: [Button],
    })
    /**
     * Fired when the layout changes via user interaction by clicking the arrows
     * or by changing the component size due to resizing.
     * @param {FCLLayout} layout The current layout
     * @param {array} columnLayout The effective column layout, f.e [67%, 33%, 0]
     * @param {boolean} startColumnVisible Indicates if the start column is currently visible
     * @param {boolean} midColumnVisible Indicates if the middle column is currently visible
     * @param {boolean} endColumnVisible Indicates if the end column is currently visible
     * @param {boolean} arrowsUsed Indicates if the layout is changed via the arrows
     * @param {boolean} resize Indicates if the layout is changed via resizing
     * @public
     */
    ,
    event("layout-change", {
        detail: {
            /**
            * @public
            */
            layout: { type: FCLLayout },
            /**
            * @public
            */
            columnLayout: { type: Array },
            /**
            * @public
            */
            startColumnVisible: { type: Boolean },
            /**
            * @public
            */
            midColumnVisible: { type: Boolean },
            /**
            * @public
            */
            endColumnVisible: { type: Boolean },
            /**
            * @public
            */
            arrowsUsed: { type: Boolean },
            /**
             * @public
            */
            resize: { type: Boolean },
            /**
             * @private
            */
            arrowUsed: { type: Boolean },
        },
    })
], FlexibleColumnLayout);
FlexibleColumnLayout.define();
export default FlexibleColumnLayout;
//# sourceMappingURL=FlexibleColumnLayout.js.map