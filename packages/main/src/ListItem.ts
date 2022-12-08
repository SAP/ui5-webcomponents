import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isSpace, isEnter, isDelete } from "@ui5/webcomponents-base/dist/Keys.js";
import { ComponentStylesData } from "@ui5/webcomponents-base/dist/types.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
// @ts-ignore
import RadioButton from "./RadioButton.js";
// @ts-ignore
import CheckBox from "./CheckBox.js";
// @ts-ignore
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
@event("detail-click")
@event("_press")
@event("_selection-requested")
abstract class ListItem extends ListItemBase {
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: ListItemType;

	@property({ type: Boolean })
	active!: boolean;

	@property()
	title!: string;

	@property({ type: Boolean })
	actionable!: boolean;

	@property({ defaultValue: "listitem" })
	role!: string;

	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	@property()
	accessibleRole!: string;

	@property({ type: ListMode, defaultValue: ListMode.None })
	_mode!: ListMode;

	@property({ type: HasPopup, noAttribute: true })
	ariaHaspopup?: HasPopup;

	@property({ type: Boolean })
	navigated!: boolean;

	@property({ type: Integer })
	_level?: number;

	@slot({ type: HTMLElement })
	deleteButton!: Array<HTMLElement>;

	deactivateByKey: (e: KeyboardEvent) => void;
	deactivate: () => void;
	_ontouchstart: {
		handleEvent: (e: TouchEvent) => void,
		passive: boolean;
	};

	static i18nBundle: I18nBundle;

	static get styles(): ComponentStylesData {
		return [ListItemBase.styles, styles] as ComponentStylesData;
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

		this.deactivateByKey = e => {
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

		this.fireEvent("_selection-requested", { item: this, selected: (e.target as HTMLInputElement).checked, selectionComponentPressed: true }); // Switch as HTMLInputElement to as CheckBox when ui5-check is migrated to TypeScript
	}

	onSingleSelectionComponentPress(e: MouseEvent) {
		if (this.isInactive) {
			return;
		}

		this.fireEvent("_selection-requested", { item: this, selected: !(e.target as ListItemBase).selected, selectionComponentPressed: true });
	}

	activate() {
		if (this.type === ListItemType.Active || this.type === ListItemType.Navigation) {
			this.active = true;
		}
	}

	onDelete() {
		this.fireEvent("_selection-requested", { item: this, selectionComponentPressed: false });
	}

	onDetailClick() {
		this.fireEvent("detail-click", { item: this, selected: this.selected });
	}

	fireItemPress(e: Event) {
		if (this.isInactive) {
			return;
		}

		e.preventDefault();
		this.fireEvent("_press", { item: this, selected: this.selected, key: (e as unknown as KeyboardEvent).key });
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

	get _accessibleNameRef() {
		if (this.hasAccesibleName && (this as IAccessibleListItem).accessibleName) {
			// accessibleName is set - return labels excluding content
			return `${this._id}-invisibleText`;
		}

		// accessibleName is not set - return _accInfo.listItemAriaLabel including content
		return `${this._id}-content ${this._id}-invisibleText`;
	}

	get hasAccesibleName() {
		return false;
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
export {
	IAccessibleListItem,
};
