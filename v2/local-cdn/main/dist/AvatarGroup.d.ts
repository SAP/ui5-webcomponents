import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarGroupType from "./types/AvatarGroupType.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";
import type { IButton } from "./Button.js";
/**
 * Interface for components that represent an avatar and may be slotted in numerous higher-order components such as `ui5-avatar-group`
 * @public
 */
interface IAvatarGroupItem extends HTMLElement, ITabbable {
    еffectiveBackgroundColor: AvatarColorScheme;
    size: `${AvatarSize}`;
    effectiveSize: AvatarSize;
    interactive: boolean;
}
type AvatarGroupClickEventDetail = {
    targetRef: HTMLElement;
    overflowButtonClicked: boolean;
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
declare class AvatarGroup extends UI5Element {
    /**
     * Defines the mode of the `AvatarGroup`.
     * @default "Group"
     * @public
     */
    type: `${AvatarGroupType}`;
    /**
     * Defines the aria-haspopup value of the component on:
     *
     * -  the whole container when `type` property is `Group`
     * -  the default "More" overflow button when `type` is `Individual`
     * @since 1.0.0-rc.15
     * @protected
     */
    ariaHaspopup: string;
    /**
     * @private
     */
    _overflowButtonText: string;
    /**
     * Defines the items of the component. Use the `ui5-avatar` component as an item.
     *
     * **Note:** The UX guidelines recommends using avatars with "Circle" shape.
     *
     * Moreover, if you use avatars with "Square" shape, there will be visual inconsistency
     * as the built-in overflow action has "Circle" shape.
     * @public
     */
    items: Array<IAvatarGroupItem>;
    /**
     * Defines the overflow button of the component.
     *
     * **Note:** We recommend using the `ui5-button` component.
     *
     * **Note:** If this slot is not used, the component will display the built-in overflow button.
     * @public
     * @since 1.0.0-rc.13
     */
    overflowButton: Array<IButton>;
    static i18nBundle: I18nBundle;
    _onResizeHandler: () => void;
    _colorIndex: number;
    _hiddenItems: number;
    _itemNavigation: ItemNavigation;
    constructor();
    static onDefine(): Promise<void>;
    /**
     * Returns an array containing the `ui5-avatar` instances that are currently not displayed due to lack of space.
     * @default []
     * @public
     */
    get hiddenItems(): IAvatarGroupItem[];
    /**
     * Returns an array containing the `AvatarColorScheme` values that correspond to the avatars in the component.
     * @default []
     * @public
     */
    get colorScheme(): AvatarColorScheme[];
    get _customOverflowButton(): IButton | undefined;
    get _ariaLabelText(): string;
    get _overflowButtonAriaLabelText(): string | undefined;
    get _containerAriaHasPopup(): string | undefined;
    get _overflowButtonAccAttributes(): {
        hasPopup: string | undefined;
    };
    get _role(): "button" | "group";
    get _hiddenStartIndex(): number;
    get _overflowBtnHidden(): boolean;
    get _isGroup(): boolean;
    get _itemsCount(): number;
    get _groupTabIndex(): "0" | "-1";
    get _overflowButton(): Button | null;
    /**
     * Return the effective overflow button width
     * Differences are that when in "Group" type the button is offset and overlaps the avatars
     *
     * 1) In case of "Group", (LTR/RTL aware) button width is qual to second item offset left/right
     * 2) In case of "Individual" group type width is directly taken from button element
     * @private
     */
    get _overflowButtonEffectiveWidth(): number;
    get firstAvatarSize(): "XS" | "S" | "M" | "L" | "XL";
    get classes(): {
        overflowButton: {
            "ui5-avatar-group-overflow-btn": boolean;
            "ui5-avatar-group-overflow-btn-xs": boolean;
            "ui5-avatar-group-overflow-btn-s": boolean;
            "ui5-avatar-group-overflow-btn-m": boolean;
            "ui5-avatar-group-overflow-btn-l": boolean;
            "ui5-avatar-group-overflow-btn-xl": boolean;
        };
    };
    onAfterRendering(): void;
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _onResize(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _fireGroupEvent(targetRef: HTMLElement): void;
    _onClick(e: MouseEvent): void;
    _onUI5Click(e: MouseEvent): void;
    /**
     * Modifies avatars to the needs of avatar group properties. Respects already set size and background color.
     * Set the margins (offsets) based on RTL/LTR.
     * @private
     */
    _prepareAvatars(): void;
    _onfocusin(e: FocusEvent): void;
    /**
     * Returns the total width to item excluding the item width
     * RTL/LTR aware
     * @private
     * @param item
     */
    _getWidthToItem(item: HTMLElement): number;
    /**
     * Overflows items that were not able to fit the container
     * @private
     */
    _overflowItems(): void;
    _getNextBackgroundColor(): number;
    _setHiddenItems(hiddenItems: number): void;
    _getAriaHasPopup(): string | undefined;
}
export default AvatarGroup;
export type { AvatarGroupClickEventDetail, IAvatarGroupItem, };
