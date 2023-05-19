import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type NotificationAction from "./NotificationAction.js";

// Icons
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

// Templates
import NotificationOverflowActionsPopoverTemplate from "./generated/templates/NotificationOverflowActionsPopoverTemplate.lit.js";

// Styles
import NotificationOverflowActionsPopoverCss from "./generated/themes/NotificationOverflowActionsPopover.css.js";

/**
 * Defines the icons corresponding to the notification's priority.
 */
const ICON_PER_PRIORITY = {
	[Priority.High]: "message-error",
	[Priority.Medium]: "message-warning",
	[Priority.Low]: "message-success",
	[Priority.None]: "",
};

type NotificationListItemBaseCloseEventDetail = {
	item: HTMLElement,
};

/**
 * @class
 *
 * The base class of the <code>NotificationListItem</code> and <code>NotificationListGroupItem</code>.
 *
 * @abstract
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.NotificationListItemBase
 * @extends sap.ui.webc.main.ListItemBase
 * @since 1.0.0-rc.8
 * @public
 */

/**
 * Fired when the <code>Close</code> button is pressed.
 *
 * @event sap.ui.webc.fiori.NotificationListItemBase#close
 * @param {HTMLElement} item the closed item.
 * @public
 */
@event("close", {
	 detail: {
		item: HTMLElement,
	},
})
@customElement({
	staticAreaStyles: NotificationOverflowActionsPopoverCss,
	staticAreaTemplate: NotificationOverflowActionsPopoverTemplate,
})
class NotificationListItemBase extends ListItemBase {
	/**
	 * Defines the <code>titleText</code> of the item.
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.titleText
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the <code>priority</code> of the item.
	 * Available options are:
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>Low</code></li>
	 * <li><code>Medium</code></li>
	 * <li><code>High</code></li>
	 * </ul>
	 * @type {sap.ui.webc.main.types.Priority}
	 * @defaultvalue "None"
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.priority
	 */
	@property({ type: Priority, defaultValue: Priority.None })
	priority!: `${Priority}`;

	/**
	 * Defines if the <code>close</code> button would be displayed.
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.showClose
	 */
	@property({ type: Boolean })
	showClose!: boolean;

	/**
	 * Defines if the <code>notification</code> is new or has been already read.
	 * <br><br>
	 * <b>Note:</b> if set to <code>false</code> the <code>titleText</code> has bold font,
	 * if set to true - it has a normal font.
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.read
	 */
	@property({ type: Boolean })
	read!: boolean;

	/**
	 * Defines if a busy indicator would be displayed over the item.
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.busy
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultValue 1000
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.busyDelay
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the actions, displayed in the top-right area.
	 * <br><br>
	 * <b>Note:</b> use the <code>ui5-notification-action</code> component.
	 *
	 * @type {sap.ui.webc.fiori.INotificationAction[]}
	 * @slot
	 * @public
	 * @name sap.ui.webc.fiori.NotificationListItemBase.prototype.actions
	 */
	@slot()
	actions!: Array<NotificationAction>

	static i18nFioriBundle: I18nBundle;

	get hasTitleText() {
		return !!this.titleText.length;
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return ICON_PER_PRIORITY[this.priority];
	}

	get overflowButtonDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-nli-overflow-btn")!;
	}

	get showOverflow() {
		return !!this.overflowActions.length;
	}

	get overflowActions() {
		if (this.actions.length <= 1) {
			return [];
		}

		return this.actionsInfo;
	}

	get standardActions() {
		if (this.actions.length > 1) {
			return [];
		}

		return this.actionsInfo;
	}

	get actionsInfo() {
		return this.actions.map(action => {
			return {
				icon: action.icon,
				text: action.text,
				press: this._onCustomActionClick.bind(this),
				refItemid: action._id,
				disabled: action.disabled ? true : undefined,
				design: action.design,
			};
		});
	}

	/**
	 * Event handlers
	 */
	_onBtnCloseClick() {
		this.fireEvent<NotificationListItemBaseCloseEventDetail>("close", { item: this });
	}

	_onBtnOverflowClick() {
		this.openOverflow();
	}

	_onCustomActionClick(e: MouseEvent) {
		const refItemId = (e.target as Element).getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			this.getActionByID(refItemId)!.fireClickEvent(e);
			this.closeOverflow();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (getEventMark(e) === "button") {
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}
	}

	getActionByID(id: string) {
		return this.actions.find(action => action._id === id);
	}

	async openOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.showAt(this.overflowButtonDOM);
	}

	async closeOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.close();
	}

	async getOverflowPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>(".ui5-notification-overflow-popover")!;
	}

	static async onDefine() {
		NotificationListItemBase.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

export default NotificationListItemBase;
