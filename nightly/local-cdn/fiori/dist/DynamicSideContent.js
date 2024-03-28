var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicSideContent_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import SideContentPosition from "./types/SideContentPosition.js";
import SideContentVisibility from "./types/SideContentVisibility.js";
import SideContentFallDown from "./types/SideContentFallDown.js";
import DynamicSideContentTemplate from "./generated/templates/DynamicSideContentTemplate.lit.js";
// Styles
import DynamicSideContentCss from "./generated/themes/DynamicSideContent.css.js";
// Texts
import { DSC_SIDE_ARIA_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Breakpoint-related constants
const S_M_BREAKPOINT = 720, // Breakpoint between S and M screen sizes
M_L_BREAKPOINT = 1024, // Breakpoint between M and L screen sizes
L_XL_BREAKPOINT = 1440, // Breakpoint between L and XL screen sizes
MINIMUM_WIDTH_BREAKPOINT = 960; // Minimum width of the control where main and side contents are side by side
/**
 * @class
 *
 * ### Overview
 *
 * The DynamicSideContent (`ui5-dynamic-side-content`) is a layout component that allows additional content
 * to be displayed in a way that flexibly adapts to different screen sizes. The side
 * content appears in a container next to or directly below the main content
 * (it doesn't overlay). When the side content is triggered, the main content becomes
 * narrower (if appearing side-by-side). The side content contains a separate scrollbar
 * when appearing next to the main content.
 *
 * ### Usage
 *
 * *When to use?*
 *
 * Use this component if you want to display relevant information that is not critical
 * for users to complete a task. Users should have access to all the key functions and
 * critical information in the app even if they do not see the side content. This is
 * important because on smaller screen sizes it may be difficult to display the side
 * content in a way that is easily accessible for the user.
 *
 * *When not to use?*
 *
 * Don't use it if you want to display navigation or critical information that prevents
 * users from completing a task when they have no access to the side content.
 *
 * ### Responsive Behavior
 *
 * Screen width \> 1440px
 *
 * - Main vs. side content ratio is 75 vs. 25 percent (with a minimum of 320px
 * each).
 * - If the application defines a trigger, the side content can be hidden.
 *
 * Screen width \<\= 1440px and \> 1024px
 *
 * - Main vs. side content ratio is 66.666 vs. 33.333 percent (with a minimum of
 * 320px each). If the side content width falls below 320 px, it automatically slides
 * under the main content, unless the app development team specifies that it should
 * disappear.
 *
 * Screen width \<\= 1024px and \> 720px
 *
 * - The side content ratio is fixed to 340px, and the main content takes the rest
 * of the width. Only if the `sideContentFallDown` is set to `OnMinimumWidth`
 * and screen width is \<\= 960px and \> 720px the side content falls below the main content.
 *
 * Screen width \<\= 720px (for example on a mobile device)
 *
 * - In this case, the side content automatically disappears from the screen (unless
 * specified to stay under the content by setting of `sideContentVisibility`
 * property to `AlwaysShow`) and can be triggered from a pre-set trigger
 * (specified within the app). When the side content is triggered, it replaces the main
 * content. We recommend that you always place the trigger for the side content in the
 * same location, such as in the app footer.
 *
 * A special case allows switching the comparison mode between the main and side content.
 * In this case, the screen is split into 50:50 percent for main vs. side content. The
 * responsive behavior of the equal split is the same as in the standard view - the
 * side content disappears on screen widths of less than 720 px and can only be
 * viewed by triggering it.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 * @slot {Array<HTMLElement>} default - Defines the main content.
 */
let DynamicSideContent = DynamicSideContent_1 = class DynamicSideContent extends UI5Element {
    constructor() {
        super();
        this._handleResizeBound = this.handleResize.bind(this);
    }
    static async onDefine() {
        DynamicSideContent_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
    onAfterRendering() {
        this._resizeContents();
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
    }
    /**
     * Toggles visibility of main and side contents on S screen size (mobile device).
     * @public
     */
    toggleContents() {
        if (this.breakpoint === this.sizeS && this.sideContentVisibility !== SideContentVisibility.AlwaysShow) {
            this._toggled = !this._toggled;
        }
    }
    get classes() {
        const gridPrefix = "ui5-dsc-span", mcSpan = this._toggled ? this._scSpan : this._mcSpan, scSpan = this._toggled ? this._mcSpan : this._scSpan, classes = {
            main: {
                "ui5-dsc-main": true,
            },
            side: {
                "ui5-dsc-side": true,
            },
        };
        classes.main[`${gridPrefix}-${mcSpan}`] = true;
        classes.side[`${gridPrefix}-${scSpan}`] = true;
        return classes;
    }
    get styles() {
        const isToggled = this.breakpoint === this.sizeS && this._toggled, mcSpan = isToggled ? this._scSpan : this._mcSpan, scSpan = isToggled ? this._mcSpan : this._scSpan, contentHeight = this.breakpoint === this.sizeS && this.sideContentVisibility !== SideContentVisibility.AlwaysShow ? "100%" : "auto";
        return {
            root: {
                "flex-wrap": this._mcSpan === "12" ? "wrap" : "nowrap",
            },
            main: {
                "height": mcSpan === this.span12 ? contentHeight : "100%",
            },
            side: {
                "height": scSpan === this.span12 ? contentHeight : "100%",
            },
        };
    }
    get accInfo() {
        return {
            "label": DynamicSideContent_1.i18nBundle.getText(DSC_SIDE_ARIA_LABEL),
        };
    }
    get sizeS() {
        return "S";
    }
    get sizeM() {
        return "M";
    }
    get sizeL() {
        return "L";
    }
    get sizeXL() {
        return "XL";
    }
    get span0() {
        return "0";
    }
    get span3() {
        return "3";
    }
    get span4() {
        return "4";
    }
    get span6() {
        return "6";
    }
    get span8() {
        return "8";
    }
    get span9() {
        return "9";
    }
    get span12() {
        return "12";
    }
    get spanFixed() {
        return "fixed";
    }
    get containerWidth() {
        return this.parentElement.clientWidth;
    }
    get breakpoint() {
        let size;
        if (this.containerWidth <= S_M_BREAKPOINT) {
            size = this.sizeS;
        }
        else if (this.containerWidth > S_M_BREAKPOINT && this.containerWidth <= M_L_BREAKPOINT) {
            size = this.sizeM;
        }
        else if (this.containerWidth > M_L_BREAKPOINT && this.containerWidth <= L_XL_BREAKPOINT) {
            size = this.sizeL;
        }
        else {
            size = this.sizeXL;
        }
        return size;
    }
    get _isSideContentFirst() {
        return this.sideContentPosition === SideContentPosition.Start;
    }
    handleResize() {
        this._resizeContents();
    }
    _resizeContents() {
        let mainSize, sideSize, sideVisible;
        // initial set contents sizes
        switch (this.breakpoint) {
            case this.sizeS:
                mainSize = this.span12;
                sideSize = this.span12;
                break;
            case this.sizeM:
                if (this.sideContentFallDown === SideContentFallDown.BelowXL
                    || this.sideContentFallDown === SideContentFallDown.BelowL
                    || (this.containerWidth <= MINIMUM_WIDTH_BREAKPOINT && this.sideContentFallDown === SideContentFallDown.OnMinimumWidth)) {
                    mainSize = this.span12;
                    sideSize = this.span12;
                }
                else {
                    mainSize = this.equalSplit ? this.span6 : this.spanFixed;
                    sideSize = this.equalSplit ? this.span6 : this.spanFixed;
                }
                sideVisible = this.sideContentVisibility === SideContentVisibility.ShowAboveS
                    || this.sideContentVisibility === SideContentVisibility.AlwaysShow;
                break;
            case this.sizeL:
                if (this.sideContentFallDown === SideContentFallDown.BelowXL) {
                    mainSize = this.span12;
                    sideSize = this.span12;
                }
                else {
                    mainSize = this.equalSplit ? this.span6 : this.span8;
                    sideSize = this.equalSplit ? this.span6 : this.span4;
                }
                sideVisible = this.sideContentVisibility === SideContentVisibility.ShowAboveS
                    || this.sideContentVisibility === SideContentVisibility.ShowAboveM
                    || this.sideContentVisibility === SideContentVisibility.AlwaysShow;
                break;
            case this.sizeXL:
                mainSize = this.equalSplit ? this.span6 : this.span9;
                sideSize = this.equalSplit ? this.span6 : this.span3;
                sideVisible = this.sideContentVisibility !== SideContentVisibility.NeverShow;
        }
        if (this.sideContentVisibility === SideContentVisibility.AlwaysShow) {
            sideVisible = true;
        }
        // modify sizes of the contents depending on hideMainContent and hideSideContent properties
        if (this.hideSideContent) {
            mainSize = this.hideMainContent ? this.span0 : this.span12;
            sideSize = this.span0;
            sideVisible = false;
        }
        if (this.hideMainContent) {
            mainSize = this.span0;
            sideSize = this.hideSideContent ? this.span0 : this.span12;
            sideVisible = true;
        }
        // set final sizes of the contents
        if (!sideVisible) {
            mainSize = this.span12;
            sideSize = this.span0;
        }
        // fire "layout-change" event
        if (this._currentBreakpoint !== this.breakpoint) {
            const eventParams = {
                currentBreakpoint: this.breakpoint,
                previousBreakpoint: this._currentBreakpoint,
                mainContentVisible: mainSize !== this.span0,
                sideContentVisible: sideSize !== this.span0,
            };
            this.fireEvent("layout-change", eventParams);
            this._currentBreakpoint = this.breakpoint;
        }
        // update contents sizes
        this._setSpanSizes(mainSize, sideSize);
    }
    _setSpanSizes(mainSize, sideSize) {
        this._mcSpan = mainSize;
        this._scSpan = sideSize;
        if (this.breakpoint !== this.sizeS) {
            this._toggled = false;
        }
    }
};
__decorate([
    property({ type: Boolean })
], DynamicSideContent.prototype, "hideMainContent", void 0);
__decorate([
    property({ type: Boolean })
], DynamicSideContent.prototype, "hideSideContent", void 0);
__decorate([
    property({ type: SideContentPosition, defaultValue: SideContentPosition.End })
], DynamicSideContent.prototype, "sideContentPosition", void 0);
__decorate([
    property({ type: SideContentVisibility, defaultValue: SideContentVisibility.ShowAboveS })
], DynamicSideContent.prototype, "sideContentVisibility", void 0);
__decorate([
    property({ type: SideContentFallDown, defaultValue: SideContentFallDown.OnMinimumWidth })
], DynamicSideContent.prototype, "sideContentFallDown", void 0);
__decorate([
    property({ type: Boolean })
], DynamicSideContent.prototype, "equalSplit", void 0);
__decorate([
    property({ defaultValue: "0", noAttribute: true })
], DynamicSideContent.prototype, "_mcSpan", void 0);
__decorate([
    property({ defaultValue: "0", noAttribute: true })
], DynamicSideContent.prototype, "_scSpan", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], DynamicSideContent.prototype, "_toggled", void 0);
__decorate([
    property({ noAttribute: true })
], DynamicSideContent.prototype, "_currentBreakpoint", void 0);
__decorate([
    slot()
], DynamicSideContent.prototype, "sideContent", void 0);
DynamicSideContent = DynamicSideContent_1 = __decorate([
    customElement({
        tag: "ui5-dynamic-side-content",
        renderer: litRender,
        styles: DynamicSideContentCss,
        template: DynamicSideContentTemplate,
    })
    /**
     * Fires when the current breakpoint has been changed.
     * @param {string} currentBreakpoint the current breakpoint.
     * @param {string} previousBreakpoint the breakpoint that was active before change to current breakpoint.
     * @param {boolean} mainContentVisible visibility of the main content.
     * @param {boolean} sideContentVisible visibility of the side content.
     * @public
     */
    ,
    event("layout-change", {
        detail: {
            /**
             * @public
             */
            currentBreakpoint: {
                type: String,
            },
            /**
             * @public
             */
            previousBreakpoint: {
                type: String,
            },
            /**
             * @public
             */
            mainContentVisible: {
                type: Boolean,
            },
            /**
             * @public
             */
            sideContentVisible: {
                type: Boolean,
            },
        },
    })
], DynamicSideContent);
DynamicSideContent.define();
export default DynamicSideContent;
//# sourceMappingURL=DynamicSideContent.js.map