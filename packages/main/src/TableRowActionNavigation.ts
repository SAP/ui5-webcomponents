import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionBase from "./TableRowActionBase.js";
import { TABLE_NAVIGATION } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

/**
 * @class
 * The `TableRowActionNavigation` class defines a navigation actio‚n for table rows.
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
@customElement({ tag: "ui5-table-row-action-navigation" })

class TableRowActionNavigation extends TableRowActionBase {
	/**
	 * Defines the interactive state of the navigation action.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	getRenderInfo() {
		return {
			text: this._i18nNavigation,
			icon: "navigation-right-arrow",
			interactive: this.interactive,
		};
	}

	isFixedAction() {
		return true;
	}

	get _i18nNavigation() {
		return TableRowActionBase.i18nBundle.getText(TABLE_NAVIGATION);
	}
}

TableRowActionNavigation.define();

export default TableRowActionNavigation;
