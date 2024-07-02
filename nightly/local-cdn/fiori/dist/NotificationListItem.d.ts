import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
import type Menu from "@ui5/webcomponents/dist/Menu.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import NotificationListItemImportance from "./types/NotificationListItemImportance.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/high-priority.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
type NotificationListItemCloseEventDetail = {
    item: HTMLElement;
};
type NotificationListItemPressEventDetail = {
    item: NotificationListItem;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification` is a type of list item, meant to display notifications.
 *
 * The component has a rich set of various properties that allows the user to set `avatar`, `menu`, `titleText`, descriptive `content`
 * and `footnotes` to fully describe a notification.
 *
 * The user can:
 *
 * - display a `Close` button
 * - can control whether the `titleText` and `description` should wrap or truncate
 * and display a `ShowMore` button to switch between less and more information
 * - add actions by using the `ui5-menu` component
 *
 * **Note:** Adding custom actions by using the `ui5-notification-action` component is deprecated as of version 2.0!
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
 *
 * - [Enter] - select an item (trigger "item-click" event)
 * - [Delete] - close an item (trigger "item-close" event)
 *
 * #### Fast Navigation
 * This component provides a fast navigation using the following keyboard shortcuts:
 *
 * - [Shift] + [Enter] - 'More'/'Less' link will be triggered
 * - [Shift] + [F10] - 'Menu' (Actions) button will be triggered (clicked)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";`
 *
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 * @csspart title-text - Used to style the titleText of the notification list item
 */
declare class NotificationListItem extends NotificationListItemBase {
    /**
    * Defines if the `titleText` and `description` should wrap,
    * they truncate by default.
    *
    * **Note:** by default the `titleText` and `description`,
    * and a `ShowMore/Less` button would be displayed.
    * @default "None"
    * @public
    * @since 1.0.0-rc.15
    */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the status indicator of the item.
     * @default "None"
     * @public
     */
    state: `${ValueState}`;
    /**
     * Defines if the `Close` button would be displayed.
     * @default false
     * @public
     */
    showClose: boolean;
    /**
     * Defines the `Important` label of the item.
     * @default "Standard"
     * @public
     */
    importance: `${NotificationListItemImportance}`;
    /**
    * Defines the state of the `titleText` and `description`,
    * if less or more information is displayed.
    * @private
    */
    _showMorePressed: boolean;
    /**
    * Defines the visibility of the `showMore` button.
    * @private
    */
    _showMore: boolean;
    /**
    * Defines the avatar, displayed in the `ui5-li-notification`.
    *
    * **Note:** Consider using the `ui5-avatar` to display icons, initials or images.
    *
    * **Note:** In order to be complaint with the UX guidlines and for best experience,
    * we recommend using avatars with 2rem X 2rem in size (32px X 32px). In case you are using the `ui5-avatar`
    * you can set its `size` property to `XS` to get the required size - `<ui5-avatar size="XS"></ui5-avatar>`.
    * @public
    */
    avatar: Array<HTMLElement>;
    /**
    * Defines the menu, displayed in the `ui5-li-notification`.
    *
    * **Note:** Use this for implementing actions.
    *
    * **Note:** Should be used instead `u5-notification-action`, which is deprecated as of version 2.0.
    * @public
    */
    menu: Array<HTMLElement>;
    /**
    * Defines the elements, displayed in the footer of the of the component.
    * @public
    */
    footnotes: Array<HTMLElement>;
    /**
    * Defines the content of the `ui5-li-notification`,
    * usually a description of the notification.
    *
    * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
    * @public
    */
    description: Array<Node>;
    _titleTextOverflowHeight: number;
    _descOverflowHeight: number;
    _onResizeBound: ResizeObserverCallback;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    get hasState(): boolean;
    get hasDesc(): boolean;
    get hasImportance(): boolean;
    get contentClasses(): "ui5-nli-content ui5-nli-content-with-importance" | "ui5-nli-content";
    get hasFootNotes(): boolean;
    get showMoreText(): string;
    get menuBtnAccessibleName(): string;
    get moreLinkAccessibleName(): string;
    get closeBtnAccessibleName(): string;
    get hideShowMore(): true | undefined;
    get descriptionDOM(): HTMLElement | null;
    get titleTextDOM(): HTMLElement | null;
    get titleTextHeight(): number;
    get descriptionHeight(): number;
    get titleTextOverflows(): boolean;
    get descriptionOverflows(): boolean;
    get footerItems(): {
        slotName: any;
        showDivider: boolean;
    }[];
    get ariaLabelledBy(): string;
    get itemClasses(): string;
    get statusIconName(): string;
    get statusIconDesign(): string;
    get importanceText(): string;
    get stateText(): string;
    get readText(): string;
    get accInfoButton(): {
        accessibilityAttributes: {
            hasPopup: string;
        };
    };
    get accInfoLink(): {
        accessibilityAttributes: {
            expanded: boolean;
        };
    };
    get menuButtonDOM(): HTMLElement;
    get showMenu(): boolean;
    /**
     * Event handlers
     */
    _onclick(e: MouseEvent): void;
    _onShowMoreClick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    focusSameItemOnNextRow(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onBtnCloseClick(): void;
    _onBtnMenuClick(): void;
    openMenu(): void;
    getMenu(): Menu;
    /**
     * Private
     */
    fireItemPress(e: Event): void;
    onResize(): void;
}
export default NotificationListItem;
export type { NotificationListItemPressEventDetail, NotificationListItemCloseEventDetail, };
