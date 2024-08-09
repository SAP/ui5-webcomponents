import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type NotificationAction from "./NotificationAction.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
type NotificationListItemBaseCloseEventDetail = {
    item: HTMLElement;
};
/**
 * @class
 *
 * The base class of the `NotificationListItem` and `NotificationListGroupItem`.
 * @constructor
 * @extends ListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
declare class NotificationListItemBase extends ListItemBase {
    /**
     * Defines the `titleText` of the item.
     * @default ""
     * @public
     */
    titleText: string;
    /**
     * Defines the `priority` of the item.
     * @default "None"
     * @public
     */
    priority: `${Priority}`;
    /**
     * Defines if the `close` button would be displayed.
     * @default false
     * @public
     */
    showClose: boolean;
    /**
     * Defines if the `notification` is new or has been already read.
     *
     * **Note:** if set to `false` the `titleText` has bold font,
     * if set to true - it has a normal font.
     * @default false
     * @public
     */
    read: boolean;
    /**
     * Defines if a busy indicator would be displayed over the item.
     * @default false
     * @public
     * @since 1.0.0-rc.8
     */
    busy: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
     * @default 1000
     * @public
     */
    busyDelay: number;
    /**
     * Defines the actions, displayed in the top-right area.
     *
     * **Note:** use the `ui5-notification-action` component.
     * @public
     */
    actions: Array<NotificationAction>;
    static i18nFioriBundle: I18nBundle;
    get hasTitleText(): boolean;
    get hasPriority(): boolean;
    get priorityIcon(): string;
    get overflowButtonDOM(): HTMLElement;
    get showOverflow(): boolean;
    get overflowActions(): {
        icon: string;
        text: string;
        press: (e: MouseEvent) => void;
        refItemid: string;
        disabled: boolean | undefined;
        design: "Default" | "Positive" | "Negative" | "Transparent" | "Emphasized" | "Attention";
    }[];
    get standardActions(): {
        icon: string;
        text: string;
        press: (e: MouseEvent) => void;
        refItemid: string;
        disabled: boolean | undefined;
        design: "Default" | "Positive" | "Negative" | "Transparent" | "Emphasized" | "Attention";
    }[];
    get actionsInfo(): {
        icon: string;
        text: string;
        press: (e: MouseEvent) => void;
        refItemid: string;
        disabled: boolean | undefined;
        design: "Default" | "Positive" | "Negative" | "Transparent" | "Emphasized" | "Attention";
    }[];
    /**
     * Event handlers
     */
    _onBtnCloseClick(): void;
    _onBtnOverflowClick(): void;
    _onCustomActionClick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    getActionByID(id: string): NotificationAction | undefined;
    openOverflow(): Promise<void>;
    closeOverflow(): Promise<void>;
    getOverflowPopover(): Promise<Popover>;
    static onDefine(): Promise<void>;
}
export default NotificationListItemBase;
export type { NotificationListItemBaseCloseEventDetail, };
