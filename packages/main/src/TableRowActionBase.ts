import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableRowActionBaseTemplate from "./generated/templates/TableRowActionBaseTemplate.lit.js";
import TableRowActionBaseStyles from "./generated/themes/TableRowActionBase.css.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import MenuItem from "./MenuItem.js";
import Menu from "./Menu.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableRowAction from "./TableRowAction.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { TemplateFunction } from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";

/**
 * @class
 * A class to serve as a foundation for table row actions.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.6.0
 * @public
 */
@customElement({
	renderer: litRender,
	styles: TableRowActionBaseStyles,
	template: TableRowActionBaseTemplate,
})

abstract class TableRowActionBase extends UI5Element {
	/**
	 * Defines the visibility of the row action.
	 *
	 * **Note:** Hidden row actions still occupy space, allowing to hide the action while maintaining its position.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hidden = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	static get actionTemplate(): TemplateFunction {
		throw new Error(/* Subclasses are required to implement this method */);
	}

	get actionTemplate() {
		const constructor = this.constructor as typeof TableRowActionBase;
		return executeTemplate(constructor.actionTemplate, this);
	}

	abstract getOverflowInfo(): { text?: string; icon?: string; disabled?: boolean };

	isFixedAction() {
		return false;
	}

	onActionClick() {
		const row = this.parentElement as TableRow;
		const table = row.parentElement as Table;
		table._onRowActionClick(this);
	}

	private static _menu: Menu;
	private static _menuItems = new WeakMap();

	static showMenu(actions: TableRowActionBase[], opener: HTMLElement) {
		if (!this._menu || !this._menu.isConnected) {
			this._menu = new Menu();
			this._menu.addEventListener("item-click", ((e: CustomEvent) => {
				const menuItem = e.detail.item as MenuItem;
				const rowAction = this._menuItems.get(menuItem) as TableRowAction;
				rowAction.onActionClick();
			}) as EventListener);
			document.body.append(this._menu);
		}

		const menuItems = actions.map(action => {
			const menuItem = new MenuItem();
			const overflowInfo = action.getOverflowInfo();
			menuItem.icon = overflowInfo.icon;
			menuItem.text = overflowInfo.text;
			menuItem.disabled = Boolean(overflowInfo.disabled);
			this._menuItems.set(menuItem, action);
			return menuItem;
		});

		this._menu.replaceChildren(...menuItems);
		this._menu.opener = opener;
		this._menu.open = true;
	}
}

export default TableRowActionBase;
