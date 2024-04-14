import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isSpace, isEnter, isDelete } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import HighlightTypes from "./types/HighlightTypes.js";
import ListItemType from "./types/ListItemType.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import ListItemBase from "./ListItemBase.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
import Button from "./Button.js";
import type { IButton } from "./Button.js";
import {
	DELETE,
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
	ARIA_LABEL_LIST_ITEM_RADIO_BUTTON,
	LIST_ITEM_SELECTED,
	LIST_ITEM_NOT_SELECTED,
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

type AccInfo = {
	role: string;
	ariaExpanded?: boolean;
	ariaLevel?: number;
	ariaLabel: string;
	ariaLabelRadioButton: string;
	ariaSelectedText?: string;
	ariaHaspopup?: `${Lowercase<HasPopup>}`;
	posinset?: number;
	setsize?: number;
	ariaSelected?: boolean;
	ariaChecked?: boolean;
	listItemAriaLabel?: string;
	ariaOwns?: string;
	tooltip?: string;
}

type AccessibilityAttributes = {
	ariaSetsize?: number,
	ariaPosinset?: number,
}

/**
 * @class
 * A class to serve as a base
 * for the `StandardListItem` and `CustomListItem` classes.
 * @constructor
 * @abstract
 * @extends ListItemBase
 * @public
 */
@customElement({
	languageAware: true,
	styles: [ListItemBase.styles, styles],
	dependencies: [
		Button,
		RadioButton,
		CheckBox,
	],
})
/**
 * Fired when the user clicks on the detail button when type is `Detail`.
 * @public
 */
@event("detail-click")
@event("_press")
@event("_focused")
@event("_selection-requested")
abstract class ListItem extends ListItemBase {
	/**
	 * Defines the visual indication and behavior of the list items.
	 * Available options are `Active` (by default), `Inactive`, `Detail` and `Navigation`.
	 *
	 * **Note:** When set to `Active` or `Navigation`, the item will provide visual response upon press and hover,
	 * while with type `Inactive` and `Detail` - will not.
	 * @default "Active"
	 * @public
	*/
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: `${ListItemType}`;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 *  It supports the following fields:
	 *
	 * - `ariaSetsize`: Defines the number of items in the current set of listitems or treeitems when not all items in the set are present in the DOM.
	 * 	The value of each `aria-setsize` is an integer reflecting number of items in the complete set.
	 *
	 * 	**Note:** If the size of the entire set is unknown, set `aria-setsize="-1"`.
	 * 	- `ariaPosinset`: Defines an element's number or position in the current set of listitems or treeitems when not all items are present in the DOM.
	 * 	The value of each `aria-posinset` is an integer greater than or equal to 1, and less than or equal to the size of the set when that size is known.
	 * @default {}
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * The navigated state of the list item.
	 * If set to `true`, a navigation indicator is displayed at the end of the list item.
	 * @default false
	 * @public
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	navigated!: boolean;

	/**
	 * Defines the text of the tooltip that would be displayed for the list item.
	 * @default ""
	 * @public
	 * @since 1.23.0
	 */
	@property({ type: String, defaultValue: "" })
	tooltip!: string;

	/**
	 * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
	 * @private
	*/
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @default ""
	 * @deprecated
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	title!: string;

	/**
	 * Defines the highlight state of the list items.
	 * Available options are: `"None"` (by default), `"Success"`, `"Warning"`, `"Information"` and `"Error"`.
	 * @default "None"
	 * @public
	 * @since 1.24
	 */
	@property({ type: HighlightTypes, defaultValue: HighlightTypes.None })
	highlight!: `${HighlightTypes}`;

	/**
	 * Indicates if the list item is actionable, e.g has hover and pressed effects.
	 * @private
	*/
	@property({ type: Boolean })
	actionable!: boolean;

	/**
	 * Used to define the role of the list item.
	 * @private
	 * @default "listitem"
	 * @since 1.0.0-rc.9
	 *
	 */
	@property({ defaultValue: "listitem" })
	role!: string;

	/**
	 * Defines the description for the accessible role of the component.
	 * @protected
	 * @default undefined
	 * @since 1.10.0
	 */
	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	/**
	 * Used to define the role of the list item.
	 * @private
	 * @default ""
	 * @since 1.3.0
	 *
	 */
	@property()
	accessibleRole!: string;

	@property({ type: ListSelectionMode, defaultValue: ListSelectionMode.None })
	_selectionMode!: `${ListSelectionMode}`;

	/**
	 * Defines the availability and type of interactive popup element that can be triggered by the component on which the property is set.
	 * @since 1.10.0
	 * @private
	 */
	@property({ type: HasPopup, noAttribute: true })
	ariaHaspopup?: `${HasPopup}`;

	/**
	 * Defines the delete button, displayed in "Delete" mode.
	 * **Note:** While the slot allows custom buttons, to match
	 * design guidelines, please use the `ui5-button` component.
	 * **Note:** When the slot is not present, a built-in delete button will be displayed.
	 * @since 1.9.0
	 * @public
	*/
	@slot()
	deleteButton!: Array<IButton>;

	deactivateByKey: (e: KeyboardEvent) => void;
	deactivate: () => void;
	_ontouchstart: PassiveEventListenerObject;
	// used in template, implemented in TreeItemBase, StandardListItem
	accessibleName?: string;
	// used in ListItem template but implemented in TreeItemBase
	indeterminate?: boolean;
	// Used in UploadCollectionItem
	disableDeleteButton?: boolean;

	static i18nBundle: I18nBundle;

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
		this.actionable = (this.type === ListItemType.Active || this.type === ListItemType.Navigation) && (this._selectionMode !== ListSelectionMode.Delete);
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

	_ondragstart(e: DragEvent) {
		if (e.target === this._listItem) {
			this.setAttribute("data-moving", "");
		}
	}

	_ondragend(e: DragEvent) {
		if (e.target === this._listItem) {
			this.removeAttribute("data-moving");
		}
	}

	/*
	 * Called when selection components in Single (ui5-radio-button)
	 * and Multi (ui5-checkbox) selection modes are used.
	 */
	onMultiSelectionComponentPress(e: MouseEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selected: (e.target as CheckBox).checked, selectionComponentPressed: true });
	}

	onSingleSelectionComponentPress(e: MouseEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selected: !(e.target as RadioButton).checked, selectionComponentPressed: true });
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
		if (this.isInactive || this.disabled) {
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
		return this._selectionMode === ListSelectionMode.Multiple
			|| this._selectionMode === ListSelectionMode.SingleStart;
	}

	get placeSelectionElementAfter() {
		return !this.placeSelectionElementBefore
			&& (this._selectionMode === ListSelectionMode.SingleEnd || this._selectionMode === ListSelectionMode.Delete);
	}

	get modeSingleSelect() {
		return [
			ListSelectionMode.SingleStart,
			ListSelectionMode.SingleEnd,
			ListSelectionMode.Single,
		].includes(this._selectionMode as ListSelectionMode);
	}

	get modeMultiple() {
		return this._selectionMode === ListSelectionMode.Multiple;
	}

	get modeDelete() {
		return this._selectionMode === ListSelectionMode.Delete;
	}

	/**
	 * Used in UploadCollectionItem
	 */
	get renderDeleteButton() {
		return this.modeDelete;
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
		if (this.modeMultiple || this.modeSingleSelect) {
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
			ariaSelectedText = this._ariaSelected ? ListItem.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
		}

		return ariaSelectedText;
	}

	get deleteText() {
		return ListItem.i18nBundle.getText(DELETE);
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

	get _accInfo(): AccInfo {
		return {
			role: this.accessibleRole || this.role,
			ariaExpanded: undefined,
			ariaLevel: undefined,
			ariaLabel: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
			ariaLabelRadioButton: ListItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
			ariaSelectedText: this.ariaSelectedText,
			ariaHaspopup: this.ariaHaspopup?.toLowerCase() as Lowercase<HasPopup> || undefined,
			setsize: this.accessibilityAttributes.ariaSetsize,
			posinset: this.accessibilityAttributes.ariaPosinset,
			tooltip: this.tooltip || this.title,
		};
	}

	get _hasHighlightColor() {
		return this.highlight !== HighlightTypes.None;
	}

	get hasConfigurableMode() {
		return true;
	}

	get _listItem() {
		return this.shadowRoot!.querySelector("li");
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
	AccessibilityAttributes,
};
