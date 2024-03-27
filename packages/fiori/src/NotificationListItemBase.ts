import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// Icons
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

/**
 * @class
 *
 * The base class of the `NotificationListItem` and `NotificationListGroupItem`.
 * @constructor
 * @extends ListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
class NotificationListItemBase extends ListItemBase {
	/**
	 * Defines the `titleText` of the item.
	 * @default ""
	 * @public
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the `priority` of the item.
	 *
	 * **Note:** this property is deprecated and will be removed in future. Please use "state" property instead.
	 * @default "None"
	 * @private
	 * @deprecated
	 */
	@property({ type: Priority, defaultValue: Priority.None })
	priority!: `${Priority}`;

	/**
	 * Defines if the `notification` is new or has been already read.
	 *
	 * **Note:** if set to `false` the `titleText` has bold font,
	 * if set to true - it has a normal font.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	read!: boolean;

	/**
	 * Defines if a busy indicator would be displayed over the item.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the actions, displayed in the top-right area.
	 *
	 * **Note:** use the `ui5-notification-action` component.
	 * @deprecated
	 * @private
	 */
	@slot()
	actions!: Array<NotificationAction>

	static i18nFioriBundle: I18nBundle;

	get hasTitleText() {
		return !!this.titleText.length;
	}

	/**
	 * Event handlers
	 */

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (getEventMark(e) === "button") {
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}
	}

	static async onDefine() {
		NotificationListItemBase.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

export default NotificationListItemBase;
