var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResponsivePopover_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getNextZIndex } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import { RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON } from "./generated/i18n/i18n-defaults.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import Title from "./Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";
// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-responsive-popover` acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * ### Usage
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ResponsivePopover.js";`
 * @constructor
 * @extends Popover
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
let ResponsivePopover = ResponsivePopover_1 = class ResponsivePopover extends Popover {
    constructor() {
        super();
    }
    /**
     * Shows popover on desktop and dialog on mobile.
     * @param opener the element that the popover is shown at
     * @param [preventInitialFocus=false] Prevents applying the focus inside the popup
     * @public
     * @returns Resolves when the responsive popover is open
     */
    async showAt(opener, preventInitialFocus = false) {
        if (!isPhone()) {
            await super.showAt(opener, preventInitialFocus);
        }
        else {
            this.style.display = "contents";
            const nextZIndex = getNextZIndex();
            if (!nextZIndex) {
                return;
            }
            this.style.zIndex = nextZIndex.toString();
            await this._dialog.show(preventInitialFocus);
        }
    }
    /**
     * Closes the popover/dialog.
     * @public
     */
    close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!isPhone()) {
            super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
        }
        else {
            this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
        }
    }
    toggle(opener) {
        if (this.isOpen()) {
            return this.close();
        }
        this.showAt(opener);
    }
    /**
     * Tells if the responsive popover is open.
     * @public
     */
    isOpen() {
        return (isPhone() && this._dialog) ? this._dialog.isOpen() : super.isOpen();
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.header = {
            "ui5-responsive-popover-header": true,
            "ui5-responsive-popover-header-no-title": !this.headerText,
        };
        return allClasses;
    }
    get _dialog() {
        return this.shadowRoot.querySelector("[ui5-dialog]");
    }
    get contentDOM() {
        return isPhone() ? this._dialog.contentDOM : super.contentDOM;
    }
    get _isPhone() {
        return isPhone();
    }
    get _displayHeader() {
        return (isPhone() || !this.contentOnlyOnDesktop) && super._displayHeader;
    }
    get _displayFooter() {
        return isPhone() || !this.contentOnlyOnDesktop;
    }
    get _closeDialogAriaLabel() {
        return ResponsivePopover_1.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
    }
    _beforeDialogOpen(e) {
        this.open = true;
        this.opened = true;
        this._propagateDialogEvent(e);
    }
    _afterDialogClose(e) {
        this.open = false;
        this.opened = false;
        this._propagateDialogEvent(e);
    }
    _propagateDialogEvent(e) {
        const type = e.type.replace("ui5-", "");
        this.fireEvent(type, e.detail);
    }
    get isModal() {
        if (!isPhone()) {
            return super.isModal;
        }
        return this._dialog.isModal;
    }
    static async onDefine() {
        ResponsivePopover_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: Boolean })
], ResponsivePopover.prototype, "contentOnlyOnDesktop", void 0);
__decorate([
    property({ type: Boolean })
], ResponsivePopover.prototype, "_hideHeader", void 0);
__decorate([
    property({ type: Boolean })
], ResponsivePopover.prototype, "_hideCloseButton", void 0);
ResponsivePopover = ResponsivePopover_1 = __decorate([
    customElement({
        tag: "ui5-responsive-popover",
        styles: [Popover.styles, ResponsivePopoverCss],
        template: ResponsivePopoverTemplate,
        dependencies: [
            ...Popover.dependencies,
            Button,
            Dialog,
            Title,
        ],
    })
], ResponsivePopover);
ResponsivePopover.define();
export default ResponsivePopover;
//# sourceMappingURL=ResponsivePopover.js.map