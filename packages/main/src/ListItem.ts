import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isSpace, isEnter, isDelete } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ComponentStylesData, PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
// @ts-ignore
import RadioButton from "./RadioButton.js";
// @ts-ignore
import CheckBox from "./CheckBox.js";
import Button from "./Button.js";
import {
	DELETE,
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
	ARIA_LABEL_LIST_ITEM_RADIO_BUTTON,
	LIST_ITEM_SELECTED,
	LIST_ITEM_NOT_SELECTED,
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/ListItem.css.js";
import HasPopup from "./types/HasPopup.js";

// Icons
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

interface IAccessibleListItem {
	accessibleName?: string;
	accessibleNameRef?: string;
}

type SelectionRequestEventDetail = {
	item: ListItemBase,
	selectionComponentPressed: boolean,
	selected?: boolean,
	key?: string,
}

type PressEventDetail = {
	item: ListItem,
	selected: boolean,
	key: string,
}

type CloseEventDetail = {
	item: ListItem,
}

type ToggleEventDetail = CloseEventDetail;

/**
 * @class
 * A class to serve as a base
 * for the <code>StandardListItem</code> and <code>CustomListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ListItem
 * @extends sap.ui.webc.main.ListItemBase
 * @public
 */
@languageAware
/**
 * Fired when the user clicks on the detail button when type is <code>Detail</code>.
 *
 * @event sap.ui.webc.main.ListItem#detail-click
 * @public
 */
@event("detail-click")
@event("_press")
@event("_focused")
@event("_selection-requested")
abstract class ListItem extends ListItemBase {
	/**
	 * Defines the visual indication and behavior of the list items.
	 * Available options are <code>Active</code> (by default), <code>Inactive</code>, <code>Detail</code> and <code>Navigation</code>.
	 * <br><br>
	 * <b>Note:</b> When set to <code>Active</code> or <code>Navigation</code>, the item will provide visual response upon press and hover,
	 * while with type <code>Inactive</code> and <code>Detail</code> - will not.
	 *
	 * @type {sap.ui.webc.main.types.ListItemType}
	 * @name sap.ui.webc.main.ListItem.prototype.type
	 * @defaultvalue "Active"
	 * @public
	*/
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: ListItemType;

	/**
	 * The navigated state of the list item.
	 * If set to <code>true</code>, a navigation indicator is displayed at the end of the list item.
	 *
	 * @public
	 * @type {boolean}
	 * @name sap.ui.webc.main.ListItem.prototype.navigated
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	navigated!: boolean;

	/**
	 * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.ListItem.prototype.active
	 * @private
	*/
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @type {string}
	 * @name sap.ui.webc.main.ListItem.prototype.title
	 * @defaultvalue ""
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	title!: string;

	/**
	 * Indicates if the list item is actionable, e.g has hover and pressed effects.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.ListItem.prototype.actionable
	 * @private
	*/
	@property({ type: Boolean })
	actionable!: boolean;

	/**
	 * Used to define the role of the list item.
	 *
	 * @private
	 * @type {string}
	 * @name sap.ui.webc.main.ListItem.prototype.role
	 * @defaultvalue "listitem"
	 * @since 1.0.0-rc.9
	 *
	 */
	@property({ defaultValue: "listitem" })
	role!: string;

	/**
	 * Defines the description for the accessible role of the component.
	 * @protected
	 * @type {string}
	 * @name sap.ui.webc.main.ListItem.prototype.accessibleRoleDescription
	 * @defaultvalue undefined
	 * @since 1.10.0
	 */
	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	/**
	 * Used to define the role of the list item.
	 *
	 * @private
	 * @type {string}
	 * @name sap.ui.webc.main.ListItem.prototype.accessibleRole
	 * @defaultvalue ""
	 * @since 1.3.0
	 *
	 */
	@property()
	accessibleRole!: string;

	@property({ type: ListMode, defaultValue: ListMode.None })
	_mode!: ListMode;

	/**
	 * Defines the availability and type of interactive popup element that can be triggered by the component on which the property is set.
	 * @type {sap.ui.webc.main.types.HasPopup}
	 * @name sap.ui.webc.main.ListItem.prototype.ariaHaspopup
	 * @since 1.10.0
	 * @private
	 */
	@property({ type: HasPopup, noAttribute: true })
	ariaHaspopup?: HasPopup;

	@property({ type: Integer })
	_level?: number;

	/**
	 * Defines the delete button, displayed in "Delete" mode.
	 * <b>Note:</b> While the slot allows custom buttons, to match
	 * design guidelines, please use the <code>ui5-button</code> component.
	 * <b>Note:</b> When the slot is not present, a built-in delete button will be displayed.
	 * @type {sap.ui.webc.main.IButton}
	 * @name sap.ui.webc.main.ListItem.prototype.deleteButton
	 * @since 1.9.0
	 * @slot
	 * @public
	 */
	@slot()
	deleteButton!: Array<HTMLElement>;

	deactivateByKey: (e: KeyboardEvent) => void;
	deactivate: () => void;
	_ontouchstart: PassiveEventListenerObject;

	static i18nBundle: I18nBundle;

	static get styles(): ComponentStylesData {
		return [ListItemBase.styles, styles];
	}

	static get dependencies() {
		return [
			Button,
			RadioButton,
			CheckBox,
		];
	}

	constructor() {
		super();

		this.deactivateByKey = (e: KeyboardEvent) => {
			if (isEnter(e)) {
				this.deactivate();
			}
		};

		this.deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};

		const handleTouchStartEvent = (e: TouchEvent) => {
			this._onmousedown(e as unknown as MouseEvent);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	onBeforeRendering() {
		this.actionable = (this.type === ListItemType.Active || this.type === ListItemType.Navigation) && (this._mode !== ListMode.Delete);
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this.deactivate);
		document.addEventListener("touchend", this.deactivate);
		document.addEventListener("keyup", this.deactivateByKey);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this.deactivate);
		document.removeEventListener("keyup", this.deactivateByKey);
		document.removeEventListener("touchend", this.deactivate);
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		const itemActive = this.type === ListItemType.Active,
			itemNavigated = this.typeNavigation;

		if (isSpace(e)) {
			e.preventDefault();
		}

		if ((isSpace(e) || isEnter(e)) && (itemActive || itemNavigated)) {
			this.activate();
		}

		if (isEnter(e)) {
			this.fireItemPress(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.deactivate();
		}

		if (isSpace(e)) {
			this.fireItemPress(e);
		}

		if (this.modeDelete && isDelete(e)) {
			this.onDelete();
		}
	}

	_onmousedown(e: MouseEvent) {
		if (getEventMark(e) === "button") {
			return;
		}
		this.activate();
	}

	_onmouseup(e: MouseEvent) {
		if (getEventMark(e) === "button") {
			return;
		}
		this.deactivate();
	}

	_ontouchend(e: TouchEvent) {
		this._onmouseup(e as unknown as MouseEvent);
	}

	_onfocusout() {
		super._onfocusout();
		this.deactivate();
	}

	_onclick(e: MouseEvent) {
		if (getEventMark(e) === "button") {
			return;
		}
		this.fireItemPress(e);
	}

	/*
	 * Called when selection components in Single (ui5-radio-button)
	 * and Multi (ui5-checkbox) selection modes are used.
	 */
	onMultiSelectionComponentPress(e: MouseEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selected: (e.target as HTMLInputElement).checked, selectionComponentPressed: true }); // Switch HTMLInputElement to CheckBox when ui5-check is migrated to TypeScript
	}

	onSingleSelectionComponentPress(e: MouseEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selected: !(e.target as ListItemBase).selected, selectionComponentPressed: true });
	}

	activate() {
		if (this.type === ListItemType.Active || this.type === ListItemType.Navigation) {
			this.active = true;
		}
	}

	onDelete() {
		this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selectionComponentPressed: false });
	}

	onDetailClick() {
		this.fireEvent("detail-click", { item: this, selected: this.selected });
	}

	fireItemPress(e: Event) {
		if (this.isInactive) {
			return;
		}
		if (isEnter(e as KeyboardEvent)) {
			e.preventDefault();
		}
		this.fireEvent<PressEventDetail>("_press", { item: this, selected: this.selected, key: (e as KeyboardEvent).key });
	}

	get isInactive() {
		return this.type === ListItemType.Inactive || this.type === ListItemType.Detail;
	}

	get placeSelectionElementBefore() {
		return this._mode === ListMode.MultiSelect
			|| this._mode === ListMode.SingleSelectBegin;
	}

	get placeSelectionElementAfter() {
		return !this.placeSelectionElementBefore
			&& (this._mode === ListMode.SingleSelectEnd || this._mode === ListMode.Delete);
	}

	get modeSingleSelect() {
		return [
			ListMode.SingleSelectBegin,
			ListMode.SingleSelectEnd,
			ListMode.SingleSelect,
		].includes(this._mode);
	}

	get modeMultiSelect() {
		return this._mode === ListMode.MultiSelect;
	}

	get modeDelete() {
		return this._mode === ListMode.Delete;
	}

	/**
	 * Used in UploadCollectionItem
	 */
	get renderDeleteButton() {
		return this.modeDelete;
	}

	get disableDeleteButton() {
		return false;
	}
	/**
	 * End
	 */

	get typeDetail() {
		return this.type === ListItemType.Detail;
	}

	get typeNavigation() {
		return this.type === ListItemType.Navigation;
	}

	get typeActive() {
		return this.type === ListItemType.Active;
	}

	get _ariaSelected() {
		if (this.modeMultiSelect || this.modeSingleSelect) {
			return this.selected;
		}

		return undefined;
	}

	get ariaSelectedText() {
		let ariaSelectedText;

		// Selected state needs to be supported separately since now the role mapping is list -> listitem[]
		// to avoid the issue of nesting interactive elements, ex. (option -> radio/checkbox);
		// The text is added to aria-describedby because as part of the aria-labelledby
		// the whole content of the item is readout when the aria-labelledby value is changed.
		if (this._ariaSelected !== undefined) {
			ariaSelectedText = this._ariaSelected ? ListItem.i18nBundle.getText(LIST_ITEM_SELECTED as I18nText) : ListItem.i18nBundle.getText(LIST_ITEM_NOT_SELECTED as I18nText);
		}

		return ariaSelectedText;
	}

	get deleteText() {
		return ListItem.i18nBundle.getText(DELETE as I18nText);
	}

	get hasDeleteButtonSlot() {
		return !!this.deleteButton.length;
	}

	get _accessibleNameRef(): string {
		if ((this as IAccessibleListItem).accessibleName) {
			// accessibleName is set - return labels excluding content
			return `${this._id}-invisibleText`;
		}

		// accessibleName is not set - return _accInfo.listItemAriaLabel including content
		return `${this._id}-content ${this._id}-invisibleText`;
	}

	get _accInfo() {
		return {
			role: this.accessibleRole || this.role,
			ariaExpanded: undefined,
			ariaLevel: this._level || undefined,
			ariaLabel: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX as I18nText),
			ariaLabelRadioButton: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON as I18nText),
			ariaSelectedText: this.ariaSelectedText,
			ariaHaspopup: this.ariaHaspopup || undefined,
		};
	}

	get hasConfigurableMode() {
		return true;
	}

	static async onDefine() {
		ListItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

export default ListItem;
export type {
	IAccessibleListItem,
	SelectionRequestEventDetail,
	PressEventDetail,
	ToggleEventDetail,
	CloseEventDetail,
};
