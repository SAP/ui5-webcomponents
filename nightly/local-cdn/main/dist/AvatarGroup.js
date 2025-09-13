var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AvatarGroup_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isEnter, isSpace, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarGroupType from "./types/AvatarGroupType.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";
import { AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL, AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL, AVATAR_GROUP_ARIA_LABEL_GROUP, AVATAR_GROUP_MOVE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import AvatarGroupCss from "./generated/themes/AvatarGroup.css.js";
// Template
import AvatarGroupTemplate from "./AvatarGroupTemplate.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
const OVERFLOW_BTN_CLASS = "ui5-avatar-group-overflow-btn";
const AVATAR_GROUP_OVERFLOW_BTN_SELECTOR = `.${OVERFLOW_BTN_CLASS}`;
// based on RTL/LTR a margin-left/right is set respectfully
const offsets = {
    [AvatarSize.XS]: {
        [AvatarGroupType.Individual]: "0.0625rem",
        [AvatarGroupType.Group]: "-0.5rem",
    },
    [AvatarSize.S]: {
        [AvatarGroupType.Individual]: "0.125rem",
        [AvatarGroupType.Group]: "-1.25rem",
    },
    [AvatarSize.M]: {
        [AvatarGroupType.Individual]: "0.125rem",
        [AvatarGroupType.Group]: "-1.625rem",
    },
    [AvatarSize.L]: {
        [AvatarGroupType.Individual]: "0.125rem",
        [AvatarGroupType.Group]: " -2rem",
    },
    [AvatarSize.XL]: {
        [AvatarGroupType.Individual]: "0.25rem",
        [AvatarGroupType.Group]: "-2.75rem",
    },
};
/**
 * @class
 *
 * ### Overview
 *
 * Displays a group of avatars arranged horizontally. It is useful to visually
 * showcase a group of related avatars, such as, project team members or employees.
 *
 * The component allows you to display the avatars in different sizes,
 * depending on your use case.
 *
 * The `AvatarGroup` component has two group types:
 *
 * - `Group` type: The avatars are displayed as partially overlapped on
 * top of each other and the entire group has one click/tap area.
 * - `Individual` type: The avatars are displayed side-by-side and each
 * avatar has its own click/tap area.
 *
 * ### Usage
 *
 * Use the `AvatarGroup` if:
 *
 * - You want to display a group of avatars.
 * - You want to display several avatars which have something in common.
 *
 * Do not use the `AvatarGroup` if:
 *
 * - You want to display a single avatar.
 * - You want to display a gallery for simple images.
 * - You want to use it for other visual content than avatars.
 *
 * ### Responsive Behavior
 *
 * When the available space is less than the width required to display all avatars,
 * an overflow visualization appears as a button placed at the end with the same shape
 * and size as the avatars. The visualization displays the number of avatars that have overflowed
 * and are not currently visible.
 *
 * ### Keyboard Handling
 * The component provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * `type` Individual:
 *
 * - [Tab] - Move focus to the overflow button
 * - [Left] - Navigate one avatar to the left
 * - [Right] - Navigate one avatar to the right
 * - [Home] - Navigate to the first avatar
 * - [End] - Navigate to the last avatar
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * `type` Group:
 *
 * - [Tab] - Move focus to the next interactive element after the component
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.11
 * @public
 */
let AvatarGroup = AvatarGroup_1 = class AvatarGroup extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the mode of the `AvatarGroup`.
         * @default "Group"
         * @public
         */
        this.type = "Group";
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following field is supported:
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * @public
         * @since 2.0.0
         * @default {}
         */
        this.accessibilityAttributes = {};
        this._colorIndex = 0;
        this._hiddenItems = 0;
        this._itemNavigation = new ItemNavigation(this, {
            getItemsCallback: () => {
                return this._isGroup ? [] : this.items.slice(0, this._hiddenStartIndex);
            },
        });
        this._onResizeHandler = this._onResize.bind(this);
    }
    /**
     * Returns an array containing the `ui5-avatar` instances that are currently not displayed due to lack of space.
     * @default []
     * @public
     */
    get hiddenItems() {
        return this.items.slice(this._hiddenStartIndex);
    }
    /**
     * Returns an array containing the `AvatarColorScheme` values that correspond to the avatars in the component.
     * @default []
     * @public
     */
    get colorScheme() {
        return this.items.map(avatar => avatar.effectiveBackgroundColor);
    }
    get _customOverflowButton() {
        return this.overflowButton.length ? this.overflowButton[0] : undefined;
    }
    get _ariaLabelText() {
        if (this.accessibleName || this.accessibleNameRef) {
            return getEffectiveAriaLabelText(this);
        }
        // Fallback to existing default behavior
        const hiddenItemsCount = this.hiddenItems.length;
        const typeLabelKey = this._isGroup ? AVATAR_GROUP_ARIA_LABEL_GROUP : AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL;
        // avatar type label
        let text = AvatarGroup_1.i18nBundle.getText(typeLabelKey);
        // add displayed-hidden avatars label
        text += ` ${AvatarGroup_1.i18nBundle.getText(AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL, this._itemsCount - hiddenItemsCount, hiddenItemsCount)}`;
        if (this._isGroup) {
            // the container role is "button", add the message for complete list activation
            text += ` ${AvatarGroup_1.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL)}`;
        }
        else {
            // the container role is "group", add the "how to navigate" message
            text += ` ${AvatarGroup_1.i18nBundle.getText(AVATAR_GROUP_MOVE)}`;
        }
        return text;
    }
    get _overflowButtonAriaLabelText() {
        return this._isGroup ? undefined : AvatarGroup_1.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL);
    }
    get _containerAriaHasPopup() {
        return this._isGroup ? this._getAriaHasPopup() : undefined;
    }
    get _overflowButtonAccAttributes() {
        return {
            hasPopup: this._isGroup ? undefined : this._getAriaHasPopup(),
        };
    }
    get _role() {
        return this._isGroup ? "button" : "group";
    }
    get _hiddenStartIndex() {
        return this._itemsCount - this._hiddenItems;
    }
    get _overflowBtnHidden() {
        return this._hiddenItems === 0;
    }
    get _isGroup() {
        return this.type === AvatarGroupType.Group;
    }
    get _itemsCount() {
        return this.items.length;
    }
    get _groupTabIndex() {
        return this._isGroup ? 0 : -1;
    }
    get _overflowButton() {
        return this.shadowRoot.querySelector(AVATAR_GROUP_OVERFLOW_BTN_SELECTOR);
    }
    /**
     * Return the effective overflow button width
     * Differences are that when in "Group" type the button is offset and overlaps the avatars
     *
     * 1) In case of "Group", (LTR/RTL aware) button width is qual to second item offset left/right
     * 2) In case of "Individual" group type width is directly taken from button element
     * @private
     */
    get _overflowButtonEffectiveWidth() {
        const button = this._customOverflowButton ? this._customOverflowButton : this._overflowButton;
        // if in "Group" mode overflow button size is equal to the offset from second item
        if (!button) {
            return 0;
        }
        if (this._isGroup) {
            let item = this.items[1];
            const ltrEffectiveWidth = item.offsetLeft - this.offsetLeft;
            // in some cases when second avatar is overflowed the offset of the button is the right one
            if (!item || item.hidden) {
                item = button;
            }
            return this.effectiveDir === "rtl" ? this._getWidthToItem(item) : ltrEffectiveWidth;
        }
        return button.offsetWidth;
    }
    get firstAvatarSize() {
        return this.items[0]?.size ?? AvatarSize.S;
    }
    onAfterRendering() {
        this._overflowItems();
    }
    onBeforeRendering() {
        if (this._customOverflowButton) {
            this._customOverflowButton.nonInteractive = this._isGroup;
        }
        this._prepareAvatars();
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
        ResizeHandler.register(this, this._onResizeHandler);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResizeHandler);
    }
    _onResize() {
        this._overflowItems();
    }
    _onkeydown(e) {
        if (this._isGroup) {
            if (isEnter(e)) {
                this._fireGroupEvent(e.target);
            }
            else if (isSpace(e)) {
                e.preventDefault();
            }
        }
    }
    _onkeyup(e) {
        if (!e.shiftKey && isSpace(e) && this._isGroup) {
            this._fireGroupEvent(e.target);
            e.preventDefault();
        }
    }
    _fireGroupEvent(targetRef) {
        const isOverflowButtonClicked = targetRef.classList.contains(OVERFLOW_BTN_CLASS) || targetRef === this._customOverflowButton;
        this.fireDecoratorEvent("click", {
            targetRef,
            overflowButtonClicked: isOverflowButtonClicked,
        });
    }
    _onClick(e) {
        e.stopPropagation();
        this._isGroup && this._fireGroupEvent(e.target);
    }
    onAvatarClick(e) {
        e.stopPropagation();
        this.fireDecoratorEvent("click", {
            targetRef: e.target,
            overflowButtonClicked: false,
        });
    }
    onAvatarUI5Click(e) {
        // AvatrGroup fires click and ui5-click - Avatar's ui5-click should be stopped.
        e.stopPropagation();
    }
    onOverflowButtonClick(e) {
        e.stopPropagation();
        this.fireDecoratorEvent("click", {
            targetRef: e.target,
            overflowButtonClicked: true,
        });
    }
    /**
     * Modifies avatars to the needs of avatar group properties. Respects already set size and background color.
     * Set the margins (offsets) based on RTL/LTR.
     * @private
     */
    _prepareAvatars() {
        this._colorIndex = 0;
        this.items.forEach((avatar, index) => {
            const colorIndex = this._getNextBackgroundColor();
            avatar.interactive = !this._isGroup;
            if (avatar.getAttribute("_color-scheme") === AvatarColorScheme.Auto) {
                // AvatarGroup respects colors set to ui5-avatar
                avatar.setAttribute("_color-scheme", AvatarColorScheme[`Accent${colorIndex}`]);
            }
            // last avatar should not be offset as it breaks the container width and focus styles are no set correctly
            if (index !== this._itemsCount - 1 || this._customOverflowButton) {
                // based on RTL the browser automatically sets left or right margin to avatars
                avatar.style.marginInlineEnd = offsets[avatar.effectiveSize][this.type];
            }
            else {
                avatar.style.marginInlineEnd = "";
            }
        });
    }
    _onfocusin(e) {
        this._itemNavigation.setCurrentItem(e.target);
    }
    getFocusDomRef() {
        return this._itemNavigation._getCurrentItem();
    }
    /**
     * Returns the total width to item excluding the item width
     * RTL/LTR aware
     * @private
     * @param item
     */
    _getWidthToItem(item) {
        const isRTL = this.effectiveDir === "rtl";
        const ltrWidthToItem = item.offsetLeft - this.offsetLeft;
        if (isRTL) {
            const itemOffsetParent = item.offsetParent;
            // in RTL the total width is equal to difference of the parent container width and
            // how much is the item offset to the left minus its offsetWidth
            if (!itemOffsetParent) {
                return 0;
            }
            return itemOffsetParent.offsetWidth - item.offsetLeft - item.offsetWidth;
        }
        return ltrWidthToItem;
    }
    /**
     * Overflows items that were not able to fit the container
     * @private
     */
    _overflowItems() {
        if (this.items.length < 2) {
            // no need to overflow avatars
            this._setHiddenItems(0);
            return;
        }
        let hiddenItems = 0;
        for (let index = 0; index < this._itemsCount; index++) {
            const item = this.items[index];
            // show item to determine if it will fit the new container size
            item.hidden = false;
            // container width to current item + item width (avatar)
            // used to determine whether the following items will fit the container or not
            let totalWidth = this._getWidthToItem(item) + item.offsetWidth;
            if (index !== this._itemsCount - 1 || this._customOverflowButton) {
                totalWidth += this._overflowButtonEffectiveWidth;
            }
            if (totalWidth > this.offsetWidth) {
                hiddenItems = this._itemsCount - index;
                break;
            }
        }
        // hide the items that did not fit the container size
        this._setHiddenItems(hiddenItems);
    }
    _getNextBackgroundColor() {
        // counter is to automatically assign background colors to avatars, `Accent10` is the highest color value
        if (++this._colorIndex > 10) {
            this._colorIndex = 1;
        }
        return this._colorIndex;
    }
    _setHiddenItems(hiddenItems) {
        const shouldFireEvent = this._hiddenItems !== hiddenItems;
        this._hiddenItems = hiddenItems;
        this.items.forEach((item, index) => {
            item.hidden = index >= this._hiddenStartIndex;
        });
        this._overflowButtonText = `+${hiddenItems > 99 ? 99 : hiddenItems}`;
        if (shouldFireEvent) {
            this.fireDecoratorEvent("overflow");
        }
    }
    _getAriaHasPopup() {
        return this.accessibilityAttributes.hasPopup;
    }
};
__decorate([
    property()
], AvatarGroup.prototype, "type", void 0);
__decorate([
    property({ type: Object })
], AvatarGroup.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ noAttribute: true })
], AvatarGroup.prototype, "_overflowButtonText", void 0);
__decorate([
    property()
], AvatarGroup.prototype, "accessibleName", void 0);
__decorate([
    property()
], AvatarGroup.prototype, "accessibleNameRef", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], AvatarGroup.prototype, "items", void 0);
__decorate([
    slot()
], AvatarGroup.prototype, "overflowButton", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], AvatarGroup, "i18nBundle", void 0);
AvatarGroup = AvatarGroup_1 = __decorate([
    customElement({
        tag: "ui5-avatar-group",
        renderer: jsxRenderer,
        template: AvatarGroupTemplate,
        styles: AvatarGroupCss,
    })
    /**
     * Fired when the component is activated either with a
     * click/tap or by using the Enter or Space key.
     * @param {HTMLElement} targetRef The DOM ref of the clicked item.
     * @param {boolean} overflowButtonClicked indicates if the overflow button is clicked
     * @public
     * @since 1.0.0-rc.11
     */
    ,
    event("click")
    /**
     * Fired when the count of visible `ui5-avatar` elements in the
     * component has changed
     * @public
     * @since 1.0.0-rc.13
     */
    ,
    event("overflow")
], AvatarGroup);
AvatarGroup.define();
export default AvatarGroup;
//# sourceMappingURL=AvatarGroup.js.map