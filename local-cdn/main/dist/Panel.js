var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Panel_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import TitleLevel from "./types/TitleLevel.js";
import PanelAccessibleRole from "./types/PanelAccessibleRole.js";
import PanelTemplate from "./generated/templates/PanelTemplate.lit.js";
import { PANEL_ICON } from "./generated/i18n/i18n-defaults.js";
// Styles
import panelCss from "./generated/themes/Panel.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-panel` component is a container which has a header and a
 * content area and is used
 * for grouping and displaying information. It can be collapsed to save space on the screen.
 *
 * ### Guidelines:
 *
 * - Nesting two or more panels is not recommended.
 * - Do not stack too many panels on one page.
 *
 * ### Structure
 * The panel's header area consists of a title bar with a header text or custom header.
 *
 * The header is clickable and can be used to toggle between the expanded and collapsed state. It includes an icon which rotates depending on the state.
 *
 * The custom header can be set through the `header` slot and it may contain arbitraray content, such as: title, buttons or any other HTML elements.
 *
 * The content area can contain an arbitrary set of controls.
 *
 * **Note:** The custom header is not clickable out of the box, but in this case the icon is interactive and allows to show/hide the content area.
 *
 * ### Responsive Behavior
 *
 * - If the width of the panel is set to 100% (default), the panel and its children are
 * resized responsively,
 * depending on its parent container.
 * - If the panel has a fixed height, it will take up the space even if the panel is
 * collapsed.
 * - When the panel is expandable (the `fixed` property is set to `false`),
 * an arrow icon (pointing to the right) appears in front of the header.
 * - When the animation is activated, expand/collapse uses a smooth animation to open or
 * close the content area.
 * - When the panel expands/collapses, the arrow icon rotates 90 degrees
 * clockwise/counter-clockwise.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Panel.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the content of the component. The content is visible only when the component is expanded.
 * @csspart header - Used to style the wrapper of the header.
 * @csspart content - Used to style the wrapper of the content.
 */
let Panel = Panel_1 = class Panel extends UI5Element {
    onBeforeRendering() {
        // If the animation is running, it will set the content expanded state at the end
        if (!this._animationRunning) {
            this._contentExpanded = !this.collapsed;
        }
        this._hasHeader = !!this.header.length;
    }
    shouldToggle(element) {
        const customContent = this.header.length;
        if (customContent) {
            return element.classList.contains("ui5-panel-header-button");
        }
        return true;
    }
    shouldNotAnimate() {
        return this.noAnimation || getAnimationMode() === AnimationMode.None;
    }
    _headerClick(e) {
        if (!this.shouldToggle(e.target)) {
            return;
        }
        this._toggleOpen();
    }
    _toggleButtonClick(e) {
        if (e.x === 0 && e.y === 0) {
            e.stopImmediatePropagation();
        }
    }
    _headerKeyDown(e) {
        if (!this.shouldToggle(e.target)) {
            return;
        }
        if (isEnter(e)) {
            e.preventDefault();
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
    }
    _headerKeyUp(e) {
        if (!this.shouldToggle(e.target)) {
            return;
        }
        if (isEnter(e)) {
            this._toggleOpen();
        }
        if (isSpace(e)) {
            this._toggleOpen();
        }
    }
    _toggleOpen() {
        if (this.fixed) {
            return;
        }
        this.collapsed = !this.collapsed;
        if (this.shouldNotAnimate()) {
            this.fireEvent("toggle");
            return;
        }
        this._animationRunning = true;
        const elements = this.getDomRef().querySelectorAll(".ui5-panel-content");
        const animations = [];
        [].forEach.call(elements, oElement => {
            if (this.collapsed) {
                animations.push(slideUp(oElement).promise());
            }
            else {
                animations.push(slideDown(oElement).promise());
            }
        });
        Promise.all(animations).then(() => {
            this._animationRunning = false;
            this._contentExpanded = !this.collapsed;
            this.fireEvent("toggle");
        });
    }
    _headerOnTarget(target) {
        return target.classList.contains("sapMPanelWrappingDiv");
    }
    get classes() {
        return {
            headerBtn: {
                "ui5-panel-header-button-animated": !this.shouldNotAnimate(),
            },
            stickyHeaderClass: {
                "ui5-panel-heading-wrapper-sticky": this.stickyHeader,
            },
        };
    }
    get toggleButtonTitle() {
        return Panel_1.i18nBundle.getText(PANEL_ICON);
    }
    get expanded() {
        return !this.collapsed;
    }
    get accRole() {
        return this.accessibleRole.toLowerCase();
    }
    get effectiveAccessibleName() {
        return typeof this.accessibleName === "string" && this.accessibleName.length ? this.accessibleName : undefined;
    }
    get accInfo() {
        return {
            "button": {
                "accessibilityAttributes": {
                    "expanded": this.expanded,
                },
                "title": this.toggleButtonTitle,
                "ariaLabelButton": !this.nonFocusableButton && this.useAccessibleNameForToggleButton ? this.effectiveAccessibleName : undefined,
            },
            "ariaExpanded": this.nonFixedInternalHeader ? this.expanded : undefined,
            "ariaControls": this.nonFixedInternalHeader ? `${this._id}-content` : undefined,
            "ariaLabelledby": this.nonFocusableButton ? this.ariaLabelledbyReference : undefined,
            "role": this.nonFixedInternalHeader ? "button" : undefined,
        };
    }
    get ariaLabelledbyReference() {
        return (this.nonFocusableButton && this.headerText && !this.fixed) ? `${this._id}-header-title` : undefined;
    }
    get fixedPanelAriaLabelledbyReference() {
        return this.fixed && !this.effectiveAccessibleName ? `${this._id}-header-title` : undefined;
    }
    get headerAriaLevel() {
        return this.headerLevel.slice(1);
    }
    get headerTabIndex() {
        return (this.header.length || this.fixed) ? "-1" : "0";
    }
    get headingWrapperAriaLevel() {
        return !this._hasHeader ? this.headerAriaLevel : undefined;
    }
    get headingWrapperRole() {
        return !this._hasHeader ? "heading" : undefined;
    }
    get nonFixedInternalHeader() {
        return !this._hasHeader && !this.fixed;
    }
    get hasHeaderOrHeaderText() {
        return this._hasHeader || this.headerText;
    }
    get nonFocusableButton() {
        return !this.header.length;
    }
    get styles() {
        return {
            content: {
                display: this._contentExpanded ? "block" : "none",
            },
        };
    }
    static async onDefine() {
        Panel_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], Panel.prototype, "headerText", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "fixed", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "collapsed", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "noAnimation", void 0);
__decorate([
    property({ type: PanelAccessibleRole, defaultValue: PanelAccessibleRole.Form })
], Panel.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: TitleLevel, defaultValue: TitleLevel.H2 })
], Panel.prototype, "headerLevel", void 0);
__decorate([
    property()
], Panel.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "stickyHeader", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "useAccessibleNameForToggleButton", void 0);
__decorate([
    property({ type: Boolean })
], Panel.prototype, "_hasHeader", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Panel.prototype, "_contentExpanded", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Panel.prototype, "_animationRunning", void 0);
__decorate([
    slot()
], Panel.prototype, "header", void 0);
Panel = Panel_1 = __decorate([
    customElement({
        tag: "ui5-panel",
        fastNavigation: true,
        languageAware: true,
        renderer: litRender,
        template: PanelTemplate,
        styles: panelCss,
        dependencies: [Button, Icon],
    })
    /**
     * Fired when the component is expanded/collapsed by user interaction.
     * @public
     */
    ,
    event("toggle")
], Panel);
Panel.define();
export default Panel;
//# sourceMappingURL=Panel.js.map