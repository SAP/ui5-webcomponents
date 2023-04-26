import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isUp,
	isDown,
	isEnter,
	isEscape,
	isHome,
	isEnd,
	isShow,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import List from "./List.js";
import type { ClickEventDetail } from "./List.js";
import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	INPUT_SUGGESTIONS_TITLE,
	LIST_ITEM_POSITION,
	SELECT_ROLE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import Option from "./Option.js";
import Label from "./Label.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import Button from "./Button.js";

// Templates
import SelectTemplate from "./generated/templates/SelectTemplate.lit.js";
import SelectPopoverTemplate from "./generated/templates/SelectPopoverTemplate.lit.js";

// Styles
import selectCss from "./generated/themes/Select.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SelectPopoverCss from "./generated/themes/SelectPopover.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import type ListItemBase from "./ListItemBase.js";

type SelectChangeEventDetail = {
	selectedOption: Option,
}

interface IOption extends UI5Element {
	selected: boolean,
	_focused: boolean,
	icon?: string | undefined,
	value: string,
	textContent: string | null,
	title: string,
	additionalText: string,
	id: string,
	stableDomRef: string,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-select</code> component is used to create a drop-down list.
 * The items inside the <code>ui5-select</code> define the available options by using the <code>ui5-option</code> component.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-select</code> provides advanced keyboard handling.
 * <br>
 * <ul>
 * <li>[F4, ALT+UP, ALT+DOWN, SPACE, ENTER] - Opens/closes the drop-down.</li>
 * <li>[UP, DOWN] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.</li>
 * <li>[SPACE, ENTER] - If the drop-down is opened - selects the focused option.</li>
 * <li>[ESC] - Closes the drop-down without changing the selection.</li>
 * <li>[HOME] - Navigates to first option</li>
 * <li>[END] - Navigates to the last option</li>
 * </ul>
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/Select";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/Option";</code> (comes with <code>ui5-select</code>)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Select
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-select
 * @appenddocs sap.ui.webc.main.Option
 * @public
 * @since 0.8.0
 */
@customElement({
	tag: "ui5-select",
	languageAware: true,
	renderer: litRender,
	template: SelectTemplate,
	staticAreaTemplate: SelectPopoverTemplate,
	styles: selectCss,
	staticAreaStyles: [
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SelectPopoverCss,
	],
	dependencies: [
		Option,
		Label,
		ResponsivePopover,
		Popover,
		List,
		StandardListItem,
		Icon,
		Button,
	],
})
/**
 * Fired when the selected option changes.
 *
 * @event sap.ui.webc.main.Select#change
 * @param {HTMLElement} selectedOption the selected option.
 * @public
 */
@event("change", {
	detail: {
		selectedOption: { type: HTMLElement },
	},
})
/**
 * Fired after the component's dropdown menu opens.
 *
 * @event sap.ui.webc.main.Select#open
 * @public
 */
@event("open")
/**
 * Fired after the component's dropdown menu closes.
 *
 * @event sap.ui.webc.main.Select#close
 * @public
 */
@event("close")
class Select extends UI5Element implements IFormElement {
	static i18nBundle: I18nBundle;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is noninteractive.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.Select.prototype.disabled
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 * The value of the component will be the value of the currently selected <code>ui5-option</code>.
	 *
	 * <br><br>
	 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
	 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
	 *
	 * <br><br>
	 * <b>Note:</b> When set, a native <code>input</code> HTML element
	 * will be created inside the <code>ui5-select</code> so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.Select.prototype.name
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the value state of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>Error</code></li>
	 * <li><code>Warning</code></li>
	 * <li><code>Success</code></li>
	 * <li><code>Information</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @defaultvalue "None"
	 * @name sap.ui.webc.main.Select.prototype.valueState
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is required.
	 *
	 * @since 1.0.0-rc.9
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.Select.prototype.required
	 * @public
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @since 1.0.0-rc.9
	 * @public
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.Select.prototype.accessibleName
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.Select.prototype.accessibleNameRef
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * @private
	 */
	@property({ type: String, noAttribute: true })
	_text?: string | null;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_iconPressed!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	opened!: boolean;

	/**
	 * @type {sap.ui.webc.base.types.Integer}
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0, noAttribute: true })
	_listWidth!: number;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	_syncedOptions: Array<IOption>;
	_selectedIndex: number;
	_selectedIndexBeforeOpen: number;
	_escapePressed: boolean;
	_lastSelectedOption: Option | null;
	_typedChars: string;
	_typingTimeoutID?: Timeout | number;
	responsivePopover!: ResponsivePopover;
	selectedItem?: string | null;
	popover?: Popover;
	value!: string;

	/**
	 * Defines the component options.
	 *
	 * <br><br>
	 * <b>Note:</b> Only one selected option is allowed.
	 * If more than one option is defined as selected, the last one would be considered as the selected one.
	 *
	 * <br><br>
	 * <b>Note:</b> Use the <code>ui5-option</code> component to define the desired options.
	 * @type {sap.ui.webc.main.ISelectOption[]}
	 * @slot options
	 * @name sap.ui.webc.main.Select.prototype.default
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	options!: Array<Option>;

	/**
	 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit,
	 * when <code>name</code> property is set.
	 * @type {HTMLElement[]}
	 * @slot
	 * @private
	 */
	@slot()
	formSupport!: Array<HTMLElement>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * <br><br>
	 *
	 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
	 * <br><br>
	 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
	 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
	 * <br><br>
	 * <b>Note:</b> If the component has <code>suggestionItems</code>,
	 * the <code>valueStateMessage</code> would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.Select.prototype.valueStateMessage
	 * @slot
	 * @public
	*/
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	constructor() {
		super();

		this._syncedOptions = [];
		this._selectedIndex = -1;
		this._selectedIndexBeforeOpen = -1;
		this._escapePressed = false;
		this._lastSelectedOption = null;
		this._typedChars = "";
	}

	onBeforeRendering() {
		this._syncSelection();
		this._enableFormSupport();

		this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);
	}

	onAfterRendering() {
		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);

		if (this._isPickerOpen) {
			if (!this._listWidth) {
				this._listWidth = this.responsivePopover.offsetWidth;
			}
		}

		this._attachRealDomRefs();
	}

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	get _isPickerOpen() {
		return !!this.responsivePopover && this.responsivePopover.opened;
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	/**
	 * Currently selected <code>ui5-option</code> element.
	 * @readonly
	 * @type {sap.ui.webc.main.ISelectOption}
     * @name sap.ui.webc.main.Select.prototype.selectedOption
	 * @public
	 */
	get selectedOption() {
		return this._filteredItems.find(option => option.selected);
	}

	async _toggleRespPopover() {
		this._iconPressed = true;
		this.responsivePopover = await this._respPopover();
		if (this.disabled) {
			return;
		}

		if (this._isPickerOpen) {
			this.responsivePopover.close();
		} else {
			this.responsivePopover.showAt(this);
		}
	}

	async _attachRealDomRefs() {
		this.responsivePopover = await this._respPopover();

		this.options.forEach(option => {
			option._getRealDomRef = () => this.responsivePopover.querySelector<HTMLElement>(`*[data-ui5-stable=${option.stableDomRef}]`)!;
		});
	}

	_syncSelection() {
		let lastSelectedOptionIndex = -1,
			firstEnabledOptionIndex = -1;
		const options = this._filteredItems;
		const syncOpts = options.map((opt, index) => {
			if (opt.selected || opt.textContent === this.value) {
				// The second condition in the IF statement is added because of Angular Reactive Forms Support(Two way data binding)
				lastSelectedOptionIndex = index;
			}
			if (firstEnabledOptionIndex === -1) {
				firstEnabledOptionIndex = index;
			}

			opt.selected = false;
			opt._focused = false;

			return {
				selected: false,
				_focused: false,
				icon: opt.icon,
				value: opt.value,
				textContent: opt.textContent,
				title: opt.title,
				additionalText: opt.additionalText,
				id: opt._id,
				stableDomRef: opt.stableDomRef,
			};
		});

		if (lastSelectedOptionIndex > -1) {
			syncOpts[lastSelectedOptionIndex].selected = true;
			syncOpts[lastSelectedOptionIndex]._focused = true;
			options[lastSelectedOptionIndex].selected = true;
			options[lastSelectedOptionIndex]._focused = true;
			this._text = syncOpts[lastSelectedOptionIndex].textContent;
			this._selectedIndex = lastSelectedOptionIndex;
		} else {
			this._text = "";
			this._selectedIndex = -1;
			if (syncOpts[firstEnabledOptionIndex]) {
				syncOpts[firstEnabledOptionIndex].selected = true;
				syncOpts[firstEnabledOptionIndex]._focused = true;
				options[firstEnabledOptionIndex].selected = true;
				options[firstEnabledOptionIndex]._focused = true;
				this._selectedIndex = firstEnabledOptionIndex;
				this._text = options[firstEnabledOptionIndex].textContent;
			}
		}

		this._syncedOptions = syncOpts as Array<IOption>;
	}

	_enableFormSupport() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport) {
			formSupport.syncNativeHiddenInput(this, (element: IFormElement, nativeInput: HTMLInputElement) => {
				const selectElement = (element as Select);
				nativeInput.disabled = !!element.disabled;
				nativeInput.value = selectElement._currentlySelectedOption ? selectElement._currentlySelectedOption.value : "";
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const isTab = (isTabNext(e) || isTabPrevious(e));

		if (isTab && this.responsivePopover && this.responsivePopover.opened) {
			this.responsivePopover.close();
		}

		if (isShow(e)) {
			e.preventDefault();
			this._toggleRespPopover();
		} else if (isSpace(e)) {
			e.preventDefault();
		} else if (isEscape(e) && this._isPickerOpen) {
			this._escapePressed = true;
		} else if (isHome(e)) {
			this._handleHomeKey(e);
		} else if (isEnd(e)) {
			this._handleEndKey(e);
		} else if (isEnter(e)) {
			this._handleSelectionChange();
		} else if (isUp(e) || isDown(e)) {
			this._handleArrowNavigation(e);
		}
	}

	_handleKeyboardNavigation(e: KeyboardEvent) {
		if (isEnter(e)) {
			return;
		}

		const typedCharacter = e.key.toLowerCase();

		this._typedChars += typedCharacter;

		// We check if we have more than one characters and they are all duplicate, we set the
		// text to be the last input character (typedCharacter). If not, we set the text to be
		// the whole input string.

		const text = (/^(.)\1+$/i).test(this._typedChars) ? typedCharacter : this._typedChars;

		clearTimeout(this._typingTimeoutID);

		this._typingTimeoutID = setTimeout(() => {
			this._typedChars = "";
			this._typingTimeoutID = -1;
		}, 1000);

		this._selectTypedItem(text);
	}

	_selectTypedItem(text: string) {
		const currentIndex = this._selectedIndex;
		const itemToSelect = this._searchNextItemByText(text);

		if (itemToSelect) {
			const nextIndex = this._filteredItems.indexOf(itemToSelect);

			this._changeSelectedItem(this._selectedIndex, nextIndex);

			if (currentIndex !== this._selectedIndex) {
				this.itemSelectionAnnounce();
			}
		}
	}

	_searchNextItemByText(text: string) {
		let orderedOptions = this._filteredItems.slice(0);
		const optionsAfterSelected = orderedOptions.splice(this._selectedIndex + 1, orderedOptions.length - this._selectedIndex);
		const optionsBeforeSelected = orderedOptions.splice(0, orderedOptions.length - 1);

		orderedOptions = optionsAfterSelected.concat(optionsBeforeSelected);

		return orderedOptions.find(option => (option.textContent || "").toLowerCase().startsWith(text));
	}

	_handleHomeKey(e: KeyboardEvent) {
		e.preventDefault();
		this._changeSelectedItem(this._selectedIndex, 0);
	}

	_handleEndKey(e: KeyboardEvent) {
		const lastIndex = this._filteredItems.length - 1;

		e.preventDefault();
		this._changeSelectedItem(this._selectedIndex, lastIndex);
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			if (this._isPickerOpen) {
				this._handleSelectionChange();
			} else {
				this._toggleRespPopover();
			}
		}
	}

	_getSelectedItemIndex(item: ListItemBase) {
		return this._filteredItems.findIndex(option => `${option._id}-li` === item.id);
	}

	_select(index: number) {
		this._filteredItems[this._selectedIndex].selected = false;
		this._selectedIndex = index;
		this._filteredItems[index].selected = true;
	}

	/**
	 * The user clicked on an item from the list
	 * @private
	 */
	_handleItemPress(e: CustomEvent<ClickEventDetail>) {
		const item = e.detail.item;
		const selectedItemIndex = this._getSelectedItemIndex(item);

		this._handleSelectionChange(selectedItemIndex);
	}

	_itemMousedown(e: MouseEvent) {
		// prevent actual focus of items
		e.preventDefault();
	}

	_onclick() {
		this.getFocusDomRef()!.focus();
		this._toggleRespPopover();
	}

	/**
	 * The user selected an item with Enter or Space
	 * @private
	 */
	_handleSelectionChange(index = this._selectedIndex) {
		this._select(index);

		this._toggleRespPopover();
	}

	_handleArrowNavigation(e: KeyboardEvent) {
		let nextIndex = -1;
		const currentIndex = this._selectedIndex;
		const isDownKey = isDown(e);

		e.preventDefault();
		if (isDownKey) {
			nextIndex = this._getNextOptionIndex();
		} else {
			nextIndex = this._getPreviousOptionIndex();
		}

		this._changeSelectedItem(this._selectedIndex, nextIndex);

		if (currentIndex !== this._selectedIndex) {
			// Announce new item even if picker is opened.
			// The aria-activedescendents attribute can't be used,
			// because listitem elements are in different shadow dom
			this.itemSelectionAnnounce();
		}
	}

	_changeSelectedItem(oldIndex: number, newIndex: number) {
		const options = this._filteredItems;

		options[oldIndex].selected = false;
		options[oldIndex]._focused = false;

		options[newIndex].selected = true;
		options[newIndex]._focused = true;

		this._selectedIndex = newIndex;

		if (!this._isPickerOpen) {
			// arrow pressed on closed picker - do selection change
			this._fireChangeEvent(options[newIndex]);
		}
	}

	_getNextOptionIndex() {
		return this._selectedIndex === (this.options.length - 1) ? this._selectedIndex : (this._selectedIndex + 1);
	}

	_getPreviousOptionIndex() {
		return this._selectedIndex === 0 ? this._selectedIndex : (this._selectedIndex - 1);
	}

	_beforeOpen() {
		this._selectedIndexBeforeOpen = this._selectedIndex;
		this._lastSelectedOption = this._filteredItems[this._selectedIndex];
	}

	_afterOpen() {
		this.opened = true;
		this.fireEvent<CustomEvent>("open");
		this.itemSelectionAnnounce();
	}

	_afterClose() {
		this.opened = false;
		this._iconPressed = false;
		this._listWidth = 0;

		if (this._escapePressed) {
			this._select(this._selectedIndexBeforeOpen);
			this._escapePressed = false;
		} else if (this._lastSelectedOption !== this._filteredItems[this._selectedIndex]) {
			this._fireChangeEvent(this._filteredItems[this._selectedIndex]);
			this._lastSelectedOption = this._filteredItems[this._selectedIndex];
		}
		this.fireEvent<CustomEvent>("close");
	}

	_fireChangeEvent(selectedOption: Option) {
		this.fireEvent<SelectChangeEventDetail>("change", { selectedOption });

		//  Angular two way data binding
		this.selectedItem = selectedOption.textContent;
		this.fireEvent("selected-item-changed");
	}

	get valueStateTextMappings() {
		return {
			[ValueState.Success]: Select.i18nBundle.getText(VALUE_STATE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_INFORMATION),
			[ValueState.Error]: Select.i18nBundle.getText(VALUE_STATE_ERROR),
			[ValueState.Warning]: Select.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateTypeMappings() {
		return {
			[ValueState.Success]: Select.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			[ValueState.Information]: Select.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			[ValueState.Error]: Select.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			[ValueState.Warning]: Select.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	get valueStateText() {
		let valueStateText;

		if (this.shouldDisplayDefaultValueStateMessage) {
			valueStateText = this.valueStateDefaultText;
		} else {
			valueStateText = this.valueStateMessageText.map(el => el.textContent).join(" ");
		}

		return `${this.valueStateTypeText} ${valueStateText}`;
	}

	get valueStateDefaultText() {
		return this.valueState !== ValueState.None ? this.valueStateTextMappings[this.valueState] : "";
	}

	get valueStateTypeText() {
		return this.valueState !== ValueState.None ? this.valueStateTypeMappings[this.valueState] : "";
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get isDisabled() {
		return this.disabled || undefined;
	}

	get _headerTitleText() {
		return Select.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _currentlySelectedOption() {
		return this._filteredItems[this._selectedIndex];
	}

	get _effectiveTabIndex() {
		return this.disabled
		|| (this.responsivePopover // Handles focus on Tab/Shift + Tab when the popover is opened
		&& this.responsivePopover.opened) ? "-1" : "0";
	}

	 /**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get iconsCount(): number {
		return this.selectedOptionIcon ? 2 : 1;
	}

	get classes() {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
			popover: {
				"ui5-select-popover-valuestate": this.hasValueState,
			},
		};
	}

	get styles() {
		return {
			popoverHeader: {
				"max-width": `${this.offsetWidth}px`,
			},
			responsivePopoverHeader: {
				"display": this._filteredItems.length && this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._filteredItems.length ? this._listWidth : this.offsetWidth}px`,
			},
			responsivePopover: {
				"min-width": `${this.offsetWidth}px`,
			},
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessageText.length && this.hasValueStateText;
	}

	get hasValueStateText() {
		return this.hasValueState && this.valueState !== ValueState.Success;
	}

	get shouldOpenValueStateMessagePopover() {
		return this.focused && this.hasValueStateText && !this._iconPressed
			&& !this._isPickerOpen && !this._isPhone;
	}

	get _ariaRoleDescription() {
		return Select.i18nBundle.getText(SELECT_ROLE_DESCRIPTION);
	}

	get _isPhone() {
		return isPhone();
	}

	get _filteredItems() {
		return this.options.filter(option => !option.disabled);
	}

	itemSelectionAnnounce() {
		let text;
		const optionsCount = this._filteredItems.length;
		const itemPositionText = Select.i18nBundle.getText(LIST_ITEM_POSITION, this._selectedIndex + 1, optionsCount);

		if (this.focused && this._currentlySelectedOption) {
			text = `${this._currentlySelectedOption.textContent as string} ${this._isPickerOpen ? itemPositionText : ""}`;

			announce(text, InvisibleMessageMode.Polite);
		}
	}

	async openValueStatePopover() {
		this.popover = await this._getPopover() as Popover;
		if (this.popover) {
			this.popover.showAt(this);
		}
	}

	closeValueStatePopover() {
		this.popover && this.popover.close();
	}

	toggleValueStatePopover(open: boolean) {
		if (open) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	get selectedOptionIcon() {
		return this.selectedOption && this.selectedOption.icon;
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>("[ui5-popover]");
	}

	static async onDefine() {
		Select.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Select.define();

export default Select;
export type {
	SelectChangeEventDetail,
	IOption,
};
