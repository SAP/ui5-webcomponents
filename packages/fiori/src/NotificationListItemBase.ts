import { isSpace, isF2 } from "@ui5/webcomponents-base/dist/Keys.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

// Texts
import {
	NOTIFICATION_LIST_ITEM_LOADING,
} from "./generated/i18n/i18n-defaults.js";

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
	loading!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	loadingDelay!: number;

	static i18nFioriBundle: I18nBundle;

	get hasTitleText() {
		return !!this.titleText.length;
	}

	get loadingText() {
		return NotificationListItemBase.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOADING);
	}

	get isLoading() {
		return this.loading;
	}

	/**
	 * Event handlers
	 */
	async _onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isF2(e)) {
			e.stopImmediatePropagation();
			const focusDomRef = this.getHeaderDomRef()!;
			if (this.focused) {
				(await getFirstFocusableElement(focusDomRef))?.focus(); // start content editing
			} else {
				focusDomRef.focus(); // stop content editing
			}
		}
	}

	getHeaderDomRef() {
		return this.getFocusDomRef();
	}

	static async onDefine() {
		NotificationListItemBase.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

export default NotificationListItemBase;
