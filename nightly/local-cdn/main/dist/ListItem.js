var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isSpace, isEnter, isDelete } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import HighlightTypes from "./types/HighlightTypes.js";
import ListItemType from "./types/ListItemType.js";
import ListMode from "./types/ListMode.js";
import ListItemBase from "./ListItemBase.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
import Button from "./Button.js";
import { DELETE, ARIA_LABEL_LIST_ITEM_CHECKBOX, ARIA_LABEL_LIST_ITEM_RADIO_BUTTON, LIST_ITEM_SELECTED, LIST_ITEM_NOT_SELECTED, } from "./generated/i18n/i18n-defaults.js";
// Styles
import styles from "./generated/themes/ListItem.css.js";
import HasPopup from "./types/HasPopup.js";
// Icons
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
/**
 * @class
 * A class to serve as a base
 * for the `StandardListItem` and `CustomListItem` classes.
 * @constructor
 * @abstract
 * @extends ListItemBase
 * @public
 */
let ListItem = ListItem_1 = class ListItem extends ListItemBase {
    constructor() {
        super();
        this.deactivateByKey = (e) => {
            if (isEnter(e)) {
                this.deactivate();
            }
        };
        this.deactivate = () => {
            if (this.active) {
                this.active = false;
            }
        };
        const handleTouchStartEvent = (e) => {
            this._onmousedown(e);
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
    _onkeydown(e) {
        super._onkeydown(e);
        const itemActive = this.type === ListItemType.Active, itemNavigated = this.typeNavigation;
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
    _onkeyup(e) {
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
    _onmousedown(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.activate();
    }
    _onmouseup(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.deactivate();
    }
    _ontouchend(e) {
        this._onmouseup(e);
    }
    _onfocusout() {
        super._onfocusout();
        this.deactivate();
    }
    _onclick(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.fireItemPress(e);
    }
    _ondragstart(e) {
        if (e.target === this._listItem) {
            this.setAttribute("data-moving", "");
        }
    }
    _ondragend(e) {
        if (e.target === this._listItem) {
            this.removeAttribute("data-moving");
        }
    }
    /*
     * Called when selection components in Single (ui5-radio-button)
     * and Multi (ui5-checkbox) selection modes are used.
     */
    onMultiSelectionComponentPress(e) {
        if (this.isInactive) {
            return;
        }
        this.fireEvent("_selection-requested", { item: this, selected: e.target.checked, selectionComponentPressed: true });
    }
    onSingleSelectionComponentPress(e) {
        if (this.isInactive) {
            return;
        }
        this.fireEvent("_selection-requested", { item: this, selected: !e.target.checked, selectionComponentPressed: true });
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
    fireItemPress(e) {
        if (this.isInactive || this.disabled) {
            return;
        }
        if (isEnter(e)) {
            e.preventDefault();
        }
        this.fireEvent("_press", { item: this, selected: this.selected, key: e.key });
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
            ariaSelectedText = this._ariaSelected ? ListItem_1.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem_1.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
        }
        return ariaSelectedText;
    }
    get deleteText() {
        return ListItem_1.i18nBundle.getText(DELETE);
    }
    get hasDeleteButtonSlot() {
        return !!this.deleteButton.length;
    }
    get _accessibleNameRef() {
        if (this.accessibleName) {
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
            ariaLevel: undefined,
            ariaLabel: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
            ariaLabelRadioButton: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
            ariaSelectedText: this.ariaSelectedText,
            ariaHaspopup: this.ariaHaspopup?.toLowerCase() || undefined,
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
        return this.shadowRoot.querySelector("li");
    }
    static async onDefine() {
        ListItem_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: ListItemType, defaultValue: ListItemType.Active })
], ListItem.prototype, "type", void 0);
__decorate([
    property({ type: Object })
], ListItem.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "navigated", void 0);
__decorate([
    property({ type: String, defaultValue: "" })
], ListItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "active", void 0);
__decorate([
    property()
], ListItem.prototype, "title", void 0);
__decorate([
    property({ type: HighlightTypes, defaultValue: HighlightTypes.None })
], ListItem.prototype, "highlight", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "actionable", void 0);
__decorate([
    property({ defaultValue: "listitem" })
], ListItem.prototype, "role", void 0);
__decorate([
    property({ defaultValue: undefined, noAttribute: true })
], ListItem.prototype, "accessibleRoleDescription", void 0);
__decorate([
    property()
], ListItem.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: ListMode, defaultValue: ListMode.None })
], ListItem.prototype, "_mode", void 0);
__decorate([
    property({ type: HasPopup, noAttribute: true })
], ListItem.prototype, "ariaHaspopup", void 0);
__decorate([
    slot()
], ListItem.prototype, "deleteButton", void 0);
ListItem = ListItem_1 = __decorate([
    customElement({
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
    ,
    event("detail-click"),
    event("_press"),
    event("_focused"),
    event("_selection-requested")
], ListItem);
export default ListItem;
//# sourceMappingURL=ListItem.js.map