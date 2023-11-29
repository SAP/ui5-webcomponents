import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { AccessibilityAttributes } from "./ListItem.js";
import ListItemType from "./types/ListItemType.js";

/**
 * Interface for components that represent an avatar and may be slotted in numerous higher-order components such as <code>ui5-avatar-group</code>
 *
 * @public
 */
interface IAvatar {
	isUI5Element: boolean,
}

/**
 * Interface for components that may be used as a button inside numerous higher-order components
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IButton extends HTMLElement { }

/**
 * Interface for components that may be slotted inside <code>ui5-card</code> as header
 *
 * @name sap.ui.webc.main.ICardHeader
 * @interface
 * @public
 */
const ICardHeader = "sap.ui.webc.main.ICardHeader";

/**
 * Interface for components that may be used as dates inside <code>ui5-calendar</code>
 *
 * @name sap.ui.webc.main.ICalendarDate
 * @interface
 * @public
 */
const ICalendarDate = "sap.ui.webc.main.ICalendarDate";

/**
 * Interface for components that may be slotted inside a <code>ui5-combobox</code>
 *
 * @name sap.ui.webc.main.IComboBoxItem
 * @interface
 * @public
 */
const IComboBoxItem = "sap.ui.webc.main.IComboBoxItem";

/**
 * Interface for components that may be used inside a <code>ui5-color-palette</code> or <code>ui5-color-palette-popover</code>
 *
 * @name sap.ui.webc.main.IColorPaletteItem
 * @interface
 * @public
 */
const IColorPaletteItem = "sap.ui.webc.main.IColorPaletteItem";

/**
 * Interface for components that represent an icon, usable in numerous higher-order components
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IIcon extends HTMLElement { }

/**
 * Interface for components that represent an input, usable in numerous higher-order components
 *
 * @name sap.ui.webc.main.IInput
 * @interface
 * @public
 */
const IInput = "sap.ui.webc.main.IInput";

/**
 * Interface for components that represent a suggestion item, usable in <code>ui5-input</code>
 *
 * @name sap.ui.webc.main.IInputSuggestionItem
 * @interface
 * @public
 */
const IInputSuggestionItem = "sap.ui.webc.main.IInputSuggestionItem";

/**
 * Interface for components that may be slotted inside <code>ui5-menu</code> as items
 *
 * @name sap.ui.webc.main.IMenuItem
 * @interface
 * @public
 */
const IMenuItem = "sap.ui.webc.main.IMenuItem";

/**
 * Interface for components that may be slotted inside a <code>ui5-multi-combobox</code> as items
 *
 * @name sap.ui.webc.main.IMultiComboBoxItem
 * @interface
 * @public
 */
const IMultiComboBoxItem = "sap.ui.webc.main.IMultiComboBoxItem";

/**
 * Interface for components that may be slotted inside <code>ui5-segmented-button</code> as items
 *
 * @name sap.ui.webc.main.ISegmentedButtonItem
 * @interface
 * @public
 */
const ISegmentedButtonItem = "sap.ui.webc.main.ISegmentedButtonItem";

/**
 * Interface for components that may be slotted inside <code>ui5-select-menu</code> as options

 *
 * @public
 */
interface ISelectMenuOption extends IOption {
	type: `${ListItemType}`,
	accessibilityAttributes: AccessibilityAttributes,
	navigated: boolean,
}

/**
 * Interface for components that may be slotted inside <code>ui5-select</code> as options
 *
 * @public
 */
interface IOption extends UI5Element {
	selected: boolean,
	disabled: boolean,
	title: string,
	icon?: string | null,
	value: string,
	additionalText?: string,
	_focused?: boolean,
	focused?: boolean,
	text?: Array<Node>,
	stableDomRef: string,
	displayText?: string,
}

/**
 * Interface for components that may be slotted inside <code>ui5-tabcontainer</code>
 *
 * @name sap.ui.webc.main.ITab
 * @interface
 * @public
 */
const ITab = "sap.ui.webc.main.ITab";

/**
 * Interface for components that may be slotted inside a <code>ui5-table</code> as rows
 *
 * @name sap.ui.webc.main.ITableRow
 * @interface
 * @public
 */
const ITableRow = "sap.ui.webc.main.ITableRow";

/**
 * Interface for components that may be slotted inside a <code>ui5-table</code> as columns
 *
 * @name sap.ui.webc.main.ITableColumn
 * @interface
 * @public
 */
const ITableColumn = "sap.ui.webc.main.ITableColumn";

/**
 * Interface for components that may be slotted inside a <code>ui5-table-row</code> as cells
 *
 * @name sap.ui.webc.main.ITableCell
 * @interface
 * @public
 */
const ITableCell = "sap.ui.webc.main.ITableCell";

/**
 * Interface for components that represent a token and are usable in components such as <code>ui5-multi-input</code>
 *
 * @name sap.ui.webc.main.IToken
 * @interface
 * @public
 */
const IToken = "sap.ui.webc.main.IToken";

/**
 * Interface for tree items for the purpose of <code>ui5-tree</code>
 *
 * @name sap.ui.webc.main.ITreeItem
 * @interface
 * @public
 */
const ITreeItem = "sap.ui.webc.main.ITreeItem";

export {
	IAvatar,
	IButton,
	ICardHeader,
	ICalendarDate,
	IColorPaletteItem,
	IComboBoxItem,
	IIcon,
	IInput,
	IInputSuggestionItem,
	IMenuItem,
	IMultiComboBoxItem,
	ISegmentedButtonItem,
	IOption,
	ISelectMenuOption,
	ITab,
	ITableCell,
	ITableColumn,
	ITableRow,
	IToken,
	ITreeItem,
};
