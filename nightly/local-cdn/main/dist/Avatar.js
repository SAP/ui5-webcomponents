var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Avatar_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
// Template
import AvatarTemplate from "./generated/templates/AvatarTemplate.lit.js";
import { AVATAR_TOOLTIP } from "./generated/i18n/i18n-defaults.js";
// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";
import Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarShape from "./types/AvatarShape.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";
// Icon
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/alert.js";
/**
 * @class
 * ### Overview
 *
 * An image-like component that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `interactive` property is set to true.
 * - [Shift] - If [Space] is pressed, pressing [Shift] releases the component without triggering the click event.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Avatar.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @implements {IAvatarGroupItem}
 * @public
 */
let Avatar = Avatar_1 = class Avatar extends UI5Element {
    constructor() {
        super();
        this._handleResizeBound = this.handleResize.bind(this);
    }
    static async onDefine() {
        Avatar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get tabindex() {
        return this.forcedTabIndex || (this._interactive ? "0" : "-1");
    }
    /**
     * Returns the effective avatar size.
     * @default "S"
     * @private
     */
    get effectiveSize() {
        // we read the attribute, because the "size" property will always have a default value
        return this.getAttribute("size") || this._size;
    }
    /**
     * Returns the effective background color.
     * @default "Accent6"
     * @private
     */
    get еffectiveBackgroundColor() {
        // we read the attribute, because the "background-color" property will always have a default value
        return this.getAttribute("color-scheme") || this._colorScheme;
    }
    get _role() {
        return this._interactive ? "button" : "img";
    }
    get _ariaHasPopup() {
        return this._getAriaHasPopup();
    }
    get _fallbackIcon() {
        if (this.fallbackIcon === "") {
            this.fallbackIcon = "employee";
        }
        return this.fallbackIcon;
    }
    get _interactive() {
        return this.interactive && !this.disabled;
    }
    get validInitials() {
        // initials should consist of only 1,2 or 3 latin letters
        const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/, areInitialsValid = this.initials && validInitials.test(this.initials);
        if (areInitialsValid) {
            return this.initials;
        }
        return null;
    }
    get accessibleNameText() {
        if (this.accessibleName) {
            return this.accessibleName;
        }
        return Avatar_1.i18nBundle.getText(AVATAR_TOOLTIP) || undefined;
    }
    get hasImage() {
        this._hasImage = !!this.image.length;
        return this._hasImage;
    }
    get initialsContainer() {
        return this.getDomRef().querySelector(".ui5-avatar-initials");
    }
    get fallBackIconDomRef() {
        return this.getDomRef().querySelector(".ui5-avatar-icon-fallback");
    }
    onBeforeRendering() {
        this._onclick = this._interactive ? this._onClickHandler.bind(this) : undefined;
    }
    async onAfterRendering() {
        await renderFinished();
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
        this.initialsContainer && ResizeHandler.register(this.initialsContainer, this._handleResizeBound);
    }
    onExitDOM() {
        this.initialsContainer && ResizeHandler.deregister(this.initialsContainer, this._handleResizeBound);
    }
    handleResize() {
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    _checkInitials() {
        const avatar = this.getDomRef();
        const avatarInitials = avatar.querySelector(".ui5-avatar-initials");
        const validInitials = this.validInitials && avatarInitials && avatarInitials.scrollWidth <= avatar.scrollWidth;
        if (validInitials) {
            this.showInitials();
            return;
        }
        this.showFallbackIcon();
    }
    showFallbackIcon() {
        this.initialsContainer?.classList.add("ui5-avatar-initials-hidden");
        this.fallBackIconDomRef?.classList.remove("ui5-avatar-fallback-icon-hidden");
    }
    showInitials() {
        this.initialsContainer?.classList.remove("ui5-avatar-initials-hidden");
        this.fallBackIconDomRef?.classList.add("ui5-avatar-fallback-icon-hidden");
    }
    _onClickHandler(e) {
        // prevent the native event and fire custom event to ensure the noConfict "ui5-click" is fired
        e.stopPropagation();
        this._fireClick();
    }
    _onkeydown(e) {
        if (!this._interactive) {
            return;
        }
        if (isEnter(e)) {
            this._fireClick();
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this._interactive && !e.shiftKey && isSpace(e)) {
            this._fireClick();
        }
    }
    _fireClick() {
        this.fireEvent("click");
    }
    _getAriaHasPopup() {
        if (!this._interactive || this.ariaHaspopup === "") {
            return;
        }
        return this.ariaHaspopup;
    }
};
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "interactive", void 0);
__decorate([
    property()
], Avatar.prototype, "icon", void 0);
__decorate([
    property()
], Avatar.prototype, "fallbackIcon", void 0);
__decorate([
    property()
], Avatar.prototype, "initials", void 0);
__decorate([
    property({ type: AvatarShape, defaultValue: AvatarShape.Circle })
], Avatar.prototype, "shape", void 0);
__decorate([
    property({ type: AvatarSize, defaultValue: AvatarSize.S })
], Avatar.prototype, "size", void 0);
__decorate([
    property({ type: AvatarSize, defaultValue: AvatarSize.S })
], Avatar.prototype, "_size", void 0);
__decorate([
    property({ type: AvatarColorScheme, defaultValue: AvatarColorScheme.Accent6 })
], Avatar.prototype, "colorScheme", void 0);
__decorate([
    property({ type: AvatarColorScheme, defaultValue: AvatarColorScheme.Accent6 })
], Avatar.prototype, "_colorScheme", void 0);
__decorate([
    property()
], Avatar.prototype, "accessibleName", void 0);
__decorate([
    property()
], Avatar.prototype, "ariaHaspopup", void 0);
__decorate([
    property({ noAttribute: true })
], Avatar.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "_hasImage", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Avatar.prototype, "image", void 0);
__decorate([
    slot()
], Avatar.prototype, "badge", void 0);
Avatar = Avatar_1 = __decorate([
    customElement({
        tag: "ui5-avatar",
        languageAware: true,
        renderer: litRender,
        styles: AvatarCss,
        template: AvatarTemplate,
        dependencies: [Icon],
    })
    /**
     * Fired on mouseup, space and enter if avatar is interactive
     *
     * **Note:** The event will not be fired if the `disabled`
     * property is set to `true`.
     * @private
     * @since 1.0.0-rc.11
     */
    ,
    event("click")
], Avatar);
Avatar.define();
export default Avatar;
//# sourceMappingURL=Avatar.js.map