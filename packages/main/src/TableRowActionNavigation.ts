import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionNavigationTemplate from "./generated/templates/TableRowActionNavigationTemplate.lit.js";
import TableRowActionNavigationCss from "./generated/themes/TableRowActionNavigation.css.js";
import TableRowActionBase from "./TableRowActionBase.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import { TABLE_NAVIGATION } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 * A class for the navigation row action.
 * @constructor
 * @abstract
 * @extends TableRowActionBase
 * @since 2.6.0
 * @public
 */
@customElement({
	tag: "ui5-table-row-action-navigation",
	styles: [TableRowActionBase.styles, TableRowActionNavigationCss],
	dependencies: [Button, Icon],
})

class TableRowActionNavigation extends TableRowActionBase {
	/**
	 * Defines the interactive state of the navigation action.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	static get actionTemplate() {
		return TableRowActionNavigationTemplate;
	}

	isFixedAction() {
		return true;
	}

	getOverflowInfo() {
		return {
			text: this._i18nNavigation,
			icon: "navigation-right-arrow",
			disabled: !this.interactive,
		};
	}

	get _i18nNavigation() {
		return TableRowActionBase.i18nBundle.getText(TABLE_NAVIGATION);
	}
}

TableRowActionNavigation.define();

export default TableRowActionNavigation;
