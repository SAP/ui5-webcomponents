import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isIE, isPhone, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import {
	isUp,
	isDown,
	isSpace,
	isEnter,
	isBackSpace,
	isEscape,
	isTabNext,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getCaretPosition, setCaretPosition } from "@ui5/webcomponents-base/dist/util/Caret.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import InputType from "./types/InputType.js";
import Popover from "./Popover.js";
// Templates
import InputTemplate from "./generated/templates/InputTemplate.lit.js";
import InputPopoverTemplate from "./generated/templates/InputPopoverTemplate.lit.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	INPUT_SUGGESTIONS,
	INPUT_SUGGESTIONS_TITLE,
	INPUT_SUGGESTIONS_ONE_HIT,
	INPUT_SUGGESTIONS_MORE_HITS,
	INPUT_SUGGESTIONS_NO_HIT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Input.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

const rgxFloat = new RegExp(/(\+|-)?\d+(\.|,)\d+/);

/**
 * @public
 */
const metadata = {
	tag: "ui5-input",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Input.prototype */ {

		/**
		 * Defines the icon to be displayed in the component.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon[]}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},

		/**
		 * Defines the suggestion items.
		 * <br><br>
		 * Example:
		 * <br><br>
		 * &lt;ui5-input show-suggestions><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #1">&lt;/ui5-suggestion-item><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #2">&lt;/ui5-suggestion-item><br>
		 * &lt;/ui5-input>
		 * <br>
		 * <ui5-input show-suggestions>
		 * <ui5-suggestion-group-item text="Group #1"></ui5-suggestion-group-item>
		 * <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>
		 * <ui5-suggestion-group-item text="Group #2"></ui5-suggestion-group-item>
		 * <ui5-suggestion-item text="Item #3"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #4"></ui5-suggestion-item>
		 * </ui5-input>
		 * <br><br>
		 * <b>Note:</b> The suggestions would be displayed only if the <code>showSuggestions</code>
		 * property is set to <code>true</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>&lt;ui5-suggestion-item&gt;</code> and <code>&lt;ui5-suggestion-group-item&gt;</code> are recommended to be used as suggestion items.
		 * <br><br>
		 * <b>Note:</b> Importing the Input Suggestions Support feature:
		 * <br>
		 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code>
		 * <br>
		 * automatically imports the <code>&lt;ui5-suggestion-item></code> and <code>&lt;ui5-suggestion-group-item></code> for your convenience.
		 *
		 * @type {sap.ui.webcomponents.main.IInputSuggestionItem[]}
		 * @slot suggestionItems
		 * @public
		 */
		"default": {
			propertyName: "suggestionItems",
			type: HTMLElement,
		},

		/**
		 * The slot is used for native <code>input</code> HTML element to enable form submit,
		 * when <code>name</code> property is set.
		 * @type {HTMLElement[]}
		 * @private
		 */
		formSupport: {
			type: HTMLElement,
		},

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
		 * @since 1.0.0-rc.6
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Input.prototype */  {

		/**
		 * Defines whether the component is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled component is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines if characters within the suggestions are to be highlighted
		 * in case the input value matches parts of the suggestions text.
		 * <br><br>
		 * <b>Note:</b> takes effect when <code>showSuggestions</code> is set to <code>true</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 * @sicne 1.0.0-rc.8
		 */
		highlight: {
			type: Boolean,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * component has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},

		/**
		 * Defines whether the component is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only component is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.3
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Defines the HTML type of the component.
		 * Available options are: <code>Text</code>, <code>Email</code>,
		 * <code>Number</code>, <code>Password</code>, <code>Tel</code>, and <code>URL</code>.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul>
		 * <li>The particular effect of this property differs depending on the browser
		 * and the current language settings, especially for type <code>Number</code>.</li>
		 * <li>The property is mostly intended to be used with touch devices
		 * that use different soft keyboard layouts depending on the given input type.</li>
		 * </ul>
		 *
		 * @type {InputType}
		 * @defaultvalue "Text"
		 * @public
		 */
		type: {
			type: InputType,
			defaultValue: InputType.Text,
		},

		/**
		 * Defines the value of the component.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

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
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines the name with which the component will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the component so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines whether the component should show suggestions, if such are present.
		 * <br><br>
		 * <b>Note:</b> You need to import the <code>InputSuggestions</code> module
		 * from <code>"@ui5/webcomponents/dist/features/InputSuggestions.js"</code> to enable this functionality.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showSuggestions: {
			type: Boolean,
		},

		/**
		 * Sets the maximum number of characters available in the input field.
		 *
		 * @type {Integer}
		 * @since 1.0.0-rc.5
		 * @public
		 */
		maxlength: {
			type: Integer,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Indicates whether the visual focus is on the value state header
		 * @private
		 */
		_isValueStateFocused: {
			type: Boolean,
		},

		open: {
			type: Boolean,
		},

		_input: {
			type: Object,
		},

		_inputAccInfo: {
			type: Object,
		},

		_nativeInputAttributes: {
			type: Object,
		},

		_inputWidth: {
			type: Integer,
		},

		_listWidth: {
			type: Integer,
		},

		_isPopoverOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_inputIconFocused: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Input.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when the value of the component changes at each keystroke,
		 * and when a suggestion item has been selected.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-select
		 * @param {HTMLElement} item The selected item.
		 * @public
		 */
		"suggestion-item-select": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user navigates to a suggestion item via the ARROW keys,
		 * as a preview, before the final selection.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-preview
		 * @param {HTMLElement} item The previewed suggestion item.
		 * @param {HTMLElement} targetRef The DOM ref of the suggestion item.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"suggestion-item-preview": {
			detail: {
				item: { type: HTMLElement },
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user scrolls the suggestion popover.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-scroll
		 * @param {Integer} scrollTop The current scroll position.
		 * @param {HTMLElement} scrollContainer The scroll container.
		 * @protected
		 * @since 1.0.0-rc.8
		 */
		"suggestion-scroll": {
			detail: {
				scrollTop: { type: Integer },
				scrollContainer: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and it can be enabled or disabled (<code>disabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don't forget to import the <code>InputSuggestions</code> module from
 * "@ui5/webcomponents/dist/features/InputSuggestions.js"
 * to enable the suggestions functionality.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Input
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @appenddocs SuggestionItem SuggestionGroupItem
 * @implements sap.ui.webcomponents.main.IInput
 * @public
 */
class Input extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return InputTemplate;
	}

	static get staticAreaTemplate() {
		return InputPopoverTemplate;
	}

	static get styles() {
		return styles;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss];
	}

	constructor() {
		super();
		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Represents the value before user moves selection from suggestion item to another
		// and its value is updated after each move.
		// Note: Used to register and fire "input" event upon [SPACE] or [ENTER].
		// Note: The property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// Represents the value before user moves selection between the suggestion items
		// and its value remains the same when the user navigates up or down the list.
		// Note: Used to cancel selection upon [ESC].
		this.valueBeforeItemPreview = "";

		// Indicates if the user selection has been canceled with [ESC].
		this.suggestionSelectionCanceled = false;

		// Indicates if the change event has already been fired
		this._changeFired = false;

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = undefined;

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// The value that should be highlited.
		this.highlightValue = "";

		// The last value confirmed by the user with "ENTER"
		this.lastConfirmedValue = "";

		// Indicates, if the user pressed the BACKSPACE key.
		this._backspaceKeyDown = false;

		// all sementic events
		this.EVENT_CHANGE = "change";
		this.EVENT_INPUT = "input";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestion-item-select";

		// all user interactions
		this.ACTION_ENTER = "enter";
		this.ACTION_USER_INPUT = "input";

		// Suggestions array initialization
		this.suggestionsTexts = [];

		this._handleResizeBound = this._handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	onBeforeRendering() {
		if (this.showSuggestions) {
			this.enableSuggestions();
			this.suggestionsTexts = this.Suggestions.defaultSlotProperties(this.highlightValue);
		}

		this.open = this.open && (!!this.suggestionItems.length || this._isPhone);

		const FormSupport = getFeature("FormSupport");

		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	async onAfterRendering() {
		if (this.Suggestions) {
			this.Suggestions.toggle(this.open, {
				preventFocusRestore: true,
			});

			this._listWidth = await this.Suggestions._getListWidth();
		}

		if (this.shouldDisplayOnlyValueStateMessage) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	_onkeydown(event) {
		if (isUp(event)) {
			return this._handleUp(event);
		}

		if (isDown(event)) {
			return this._handleDown(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}

		if (isTabNext(event)) {
			return this._handleTab(event);
		}

		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isEscape(event)) {
			return this._handleEscape(event);
		}

		if (isBackSpace(event)) {
			this._backspaceKeyDown = true;
			this._selectedText = window.getSelection().toString();
		}

		if (this.showSuggestions) {
			this._clearPopoverFocusAndSelection();
		}

		this._keyDown = true;
	}

	_onkeyup(event) {
		this._keyDown = false;
		this._backspaceKeyDown = false;
	}

	/* Event handling */
	_handleUp(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onUp(event);
		}
	}

	_handleDown(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onDown(event);
		}
	}

	_handleSpace(event) {
		if (this.Suggestions) {
			this.Suggestions.onSpace(event);
		}
	}

	_handleTab(event) {
		if (this.Suggestions && (this.previousValue !== this.value)) {
			this.Suggestions.onTab(event);
		}
	}

	_handleEnter(event) {
		const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));

		if (!itemPressed) {
			this.fireEventByAction(this.ACTION_ENTER);
			this.lastConfirmedValue = this.value;
			return;
		}

		this.focused = true;
	}

	_handleEscape() {
		const hasSuggestions = this.showSuggestions && !!this.Suggestions;
		const isOpen = hasSuggestions && this.open;

		if (!isOpen) {
			this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
			return;
		}

		if (hasSuggestions && isOpen && this.Suggestions._isItemOnTarget()) {
			// Restore the value.
			this.value = this.valueBeforeItemPreview;

			// Mark that the selection has been canceled, so the popover can close
			// and not reopen, due to receiving focus.
			this.suggestionSelectionCanceled = true;
			this.focused = true;
		}

		if (this._isValueStateFocused) {
			this._isValueStateFocused = false;
			this.focused = true;
		}

		this.open = false;
	}

	async _onfocusin(event) {
		await this.getInputDOMRef();

		this.focused = true; // invalidating property
		this.previousValue = this.value;
		this.valueBeforeItemPreview = this.value;

		this._inputIconFocused = event.target && event.target === this.querySelector("[ui5-icon]");
	}

	_onfocusout(event) {
		const focusedOutToSuggestions = this.Suggestions && event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.contains(this.Suggestions.responsivePopover);
		const focusedOutToValueStateMessage = event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.querySelector(".ui5-valuestatemessage-root");

		// if focusout is triggered by pressing on suggestion item or value state message popover, skip invalidation, because re-rendering
		// will happen before "itemPress" event, which will make item "active" state not visualized
		if (focusedOutToSuggestions || focusedOutToValueStateMessage) {
			event.stopImmediatePropagation();
			return;
		}

		const toBeFocused = event.relatedTarget;

		if (toBeFocused && toBeFocused.classList.contains(this._id)) {
			return;
		}

		this.closePopover();
		this._clearPopoverFocusAndSelection();

		this.previousValue = "";
		this.lastConfirmedValue = "";
		this.focused = false; // invalidating property
		this.open = false;
	}

	_clearPopoverFocusAndSelection() {
		if (!this.showSuggestions || !this.Suggestions) {
			return;
		}

		this._isValueStateFocused = false;
		this.hasSuggestionItemSelected = false;

		this.Suggestions._deselectItems();
		this.Suggestions._clearItemFocus();
	}

	_click(event) {
		if (isPhone() && !this.readonly && this.Suggestions) {
			this.blur();
			this.open = true;
		}
	}

	_handleChange(event) {
		if (!this._changeFired) {
			this.fireEvent(this.EVENT_CHANGE);
		}

		// Set event as no longer marked
		this._changeFired = false;
	}

	_scroll(event) {
		const detail = event.detail;
		this.fireEvent("suggestion-scroll", {
			scrollTop: detail.scrollTop,
			scrollContainer: detail.targetRef,
		});
	}

	async _handleInput(event) {
		const inputDomRef = await this.getInputDOMRef();
		const emptyValueFiredOnNumberInput = this.value && this.isTypeNumber && !inputDomRef.value;

		this.suggestionSelectionCanceled = false;

		if (emptyValueFiredOnNumberInput && !this._backspaceKeyDown) {
			// For input with type="Number", if the delimiter is entered second time,
			// the inner input is firing event with empty value
			return;
		}

		if (emptyValueFiredOnNumberInput && this._backspaceKeyDown) {
			// Issue: when the user removes the character(s) after the delimeter of numeric Input,
			// the native input is firing event with an empty value and we have to manually handle this case,
			// otherwise the entire input will be cleared as we sync the "value".

			// There are tree scenarios:
			// Example: type "123.4" and press BACKSPACE - the native input is firing event with empty value.
			// Example: type "123.456", select/mark "456" and press BACKSPACE - the native input is firing event with empty value.
			// Example: type "123.456", select/mark "123.456" and press BACKSPACE - the native input is firing event with empty value,
			// but this time that's really the case.

			// Perform manual handling in case of floating number
			// and if the user did not select the entire input value
			if (rgxFloat.test(this.value) && this._selectedText !== this.value) {
				const newValue = this.removeFractionalPart(this.value);

				// update state
				this.value = newValue;
				this.highlightValue = newValue;
				this.valueBeforeItemPreview = newValue;

				// fire events
				this.fireEvent(this.EVENT_INPUT);
				this.fireEvent("value-changed");
				return;
			}
		}

		if (event.target === inputDomRef) {
			this.focused = true;

			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		/* skip calling change event when an input with a placeholder is focused on IE
			- value of the host and the internal input should be differnt in case of actual input
			- input is called when a key is pressed => keyup should not be called yet
		*/
		const skipFiring = (inputDomRef.value === this.value) && isIE() && !this._keyDown && !!this.placeholder;

		!skipFiring && this.fireEventByAction(this.ACTION_USER_INPUT);

		this.hasSuggestionItemSelected = false;
		this._isValueStateFocused = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);

			if (!this._isPhone) {
				this.open = !!inputDomRef.value;
			}
		}
	}

	_handleResize() {
		this._inputWidth = this.offsetWidth;
	}

	_closeRespPopover(preventFocusRestore) {
		this.Suggestions.close(preventFocusRestore);
	}

	async _afterOpenPopover() {
		// Set initial focus to the native input
		if (isPhone()) {
			(await this.getInputDOMRef()).focus();
		}
	}

	_afterClosePopover() {
		this.announceSelectedItem();

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
			this.focused = false;
		}
	}

	/**
	 * Checks if the value state popover is open.
	 * @returns {boolean} true if the value state popover is open, false otherwise
	 */
	isValueStateOpened() {
		return !!this._isPopoverOpen;
	}

	async openPopover() {
		const popover = await this._getPopover();

		if (popover) {
			this._isPopoverOpen = true;
			popover.showAt(this);
		}
	}

	async closePopover() {
		const popover = await this._getPopover();

		popover && popover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem && staticAreaItem.querySelector("[ui5-popover]");
	}

	enableSuggestions() {
		if (this.Suggestions) {
			return;
		}

		const Suggestions = getFeature("InputSuggestions");

		if (Suggestions) {
			this.Suggestions = new Suggestions(this, "suggestionItems", true);
		} else {
			throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
		}
	}

	selectSuggestion(item, keyboardUsed) {
		if (item.group) {
			return;
		}

		const itemText = item.text || item.textContent; // keep textContent for compatibility
		const fireInput = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : this.value !== itemText;

		this.hasSuggestionItemSelected = true;

		if (fireInput) {
			this.value = itemText;
			this.valueBeforeItemSelection = itemText;
			this.lastConfirmedValue = itemText;
			this.fireEvent(this.EVENT_INPUT);
			this.fireEvent(this.EVENT_CHANGE);

			// Mark the change event to avoid double firing
			this._changeFired = true;
		}

		this.valueBeforeItemPreview = "";
		this.suggestionSelectionCanceled = false;

		this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item });
	}

	previewSuggestion(item) {
		this.valueBeforeItemSelection = this.value;
		this.updateValueOnPreview(item);
		this.announceSelectedItem();
		this._previewItem = item;
	}

	/**
	 * Updates the input value on item preview.
	 * @param {Object} item The item that is on preview
	 */
	updateValueOnPreview(item) {
		const noPreview = item.type === "Inactive" || item.group;
		const itemValue = noPreview ? this.valueBeforeItemPreview : (item.effectiveTitle || item.textContent);
		this.value = itemValue;
	}

	/**
	 * The suggestion item on preview.
	 * @type { sap.ui.webcomponents.main.IInputSuggestionItem }
	 * @readonly
	 * @public
	 */
	get previewItem() {
		if (!this._previewItem) {
			return null;
		}

		return this.getSuggestionByListItem(this._previewItem);
	}

	async fireEventByAction(action) {
		await this.getInputDOMRef();

		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = await this.getInputValue();
		const isUserInput = action === this.ACTION_USER_INPUT;

		const input = await this.getInputDOMRef();
		const cursorPosition = input.selectionStart;

		this.value = inputValue;
		this.highlightValue = inputValue;
		this.valueBeforeItemPreview = inputValue;

		if (isSafari()) {
			// When setting the value by hand, Safari moves the cursor when typing in the middle of the text (See #1761)
			setTimeout(() => {
				input.selectionStart = cursorPosition;
				input.selectionEnd = cursorPosition;
			}, 0);
		}

		if (isUserInput) { // input
			this.fireEvent(this.EVENT_INPUT);
			// Angular two way data binding
			this.fireEvent("value-changed");
			return;
		}

		// In IE, pressing the ENTER does not fire change
		const valueChanged = (this.previousValue !== undefined) && (this.previousValue !== this.value);
		if (isIE() && action === this.ACTION_ENTER && valueChanged) {
			this.fireEvent(this.EVENT_CHANGE);
		}
	}

	async getInputValue() {
		const domRef = this.getDomRef();

		if (domRef) {
			return (await this.getInputDOMRef()).value;
		}
		return "";
	}

	async getInputDOMRef() {
		if (isPhone() && this.Suggestions) {
			await this.Suggestions._getSuggestionPopover();
			return this.Suggestions && this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
		}

		return this.nativeInput;
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		return this.getDomRef() && this.getDomRef().querySelector(`input`);
	}

	get nativeInputWidth() {
		return this.nativeInput && this.nativeInput.offsetWidth;
	}

	getLabelableElementId() {
		return this.getInputId();
	}

	getSuggestionByListItem(item) {
		const key = parseInt(item.getAttribute("data-ui5-key"));
		return this.suggestionItems[key];
	}

	/**
	 * Returns if the suggestions popover is scrollable.
	 * The method returns <code>Promise</code> that resolves to true,
	 * if the popup is scrollable and false otherwise.
	 * @returns {Promise}
	 */
	isSuggestionsScrollable() {
		if (!this.Suggestions) {
			return Promise.resolve(false);
		}

		return this.Suggestions._isScrollable();
	}

	getInputId() {
		return `${this._id}-inner`;
	}

	/* Suggestions interface  */
	onItemFocused() {}

	onItemMouseOver(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseover", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemMouseOut(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseout", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemMouseDown(event) {
		event.preventDefault();
	}

	onItemSelected(item, keyboardUsed) {
		this.selectSuggestion(item, keyboardUsed);
	}

	onItemPreviewed(item) {
		this.previewSuggestion(item);
		this.fireEvent("suggestion-item-preview", {
			item: this.getSuggestionByListItem(item),
			targetRef: item,
		});
	}

	onOpen() {}

	onClose() {}

	valueStateTextMappings() {
		return {
			"Success": Input.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": Input.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": Input.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": Input.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	announceSelectedItem() {
		const invisibleText = this.shadowRoot.querySelector(`#${this._id}-selectionText`);

		if (this.Suggestions && this.Suggestions._isItemOnTarget()) {
			invisibleText.textContent = this.itemSelectionAnnounce;
		} else {
			invisibleText.textContent = "";
		}
	}

	get _readonly() {
		return this.readonly && !this.disabled;
	}

	get _headerTitleText() {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get inputType() {
		return this.type.toLowerCase();
	}

	get isTypeNumber() {
		return this.type === InputType.Number;
	}

	get suggestionsTextId() {
		return this.showSuggestions ? `${this._id}-suggestionsText` : "";
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : "";
	}

	get accInfo() {
		const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
		const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
		const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();

		return {
			"input": {
				"ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
				"ariaDescribedBy": ariaDescribedBy || undefined,
				"ariaInvalid": this.valueState === ValueState.Error ? "true" : undefined,
				"ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
				"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
				"role": this._inputAccInfo && this._inputAccInfo.role,
				"ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
				"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
				"ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
				"ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || getEffectiveAriaLabelText(this),
			},
		};
	}

	get nativeInputAttributes() {
		return {
			"min": this.isTypeNumber ? this._nativeInputAttributes.min : undefined,
			"max": this.isTypeNumber ? this._nativeInputAttributes.max : undefined,
			"step": this.isTypeNumber ? (this._nativeInputAttributes.step || "any") : undefined,
		};
	}

	get ariaValueStateHiddenText() {
		if (!this.hasValueStateMessage) {
			return;
		}

		if (this.shouldDisplayDefaultValueStateMessage) {
			return this.valueStateText;
		}

		return this.valueStateMessageText.map(el => el.textContent).join(" ");
	}

	get itemSelectionAnnounce() {
		return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : undefined;
	}

	get classes() {
		return {
			popover: {
				"ui5-suggestions-popover": !this.isPhone && this.showSuggestions,
				"ui5-suggestions-popover-with-value-state-header": !this.isPhone && this.showSuggestions && this.hasValueStateMessage,
			},
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);

		const stylesObject = {
			popoverHeader: {
				"max-width": `${this._inputWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
			},
			suggestionsPopover: {
				"min-width": `${this._inputWidth}px`,
				"max-width": (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
			},
			innerInput: {},
		};

		if (this.nativeInputWidth < 48) {
			stylesObject.innerInput.padding = "0";
		}

		return stylesObject;
	}

	get suggestionSeparators() {
		return "None";
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Success
			&& (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
			|| (this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
	}

	get valueStateText() {
		return this.valueStateTextMappings()[this.valueState];
	}

	get suggestionsText() {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get availableSuggestionsCount() {
		if (this.showSuggestions && (this.value || this.Suggestions.isOpened())) {
			switch (this.suggestionsTexts.length) {
			case 0:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);

			case 1:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);

			default:
				return Input.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, this.suggestionsTexts.length);
			}
		}

		return undefined;
	}

	get step() {
		return this.isTypeNumber ? "any" : undefined;
	}

	get _isPhone() {
		return isPhone();
	}

	/**
	 * Returns the placeholder value.
	 * @protected
	 */
	get _placeholder() {
		return this.placeholder;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateInputIcon() {
		const iconPerValueState = {
			Error: ` d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071Z" fill="#EE3939"`,
			Warning: `  d="M12.8619 2.49298C12.6823 2.18754 12.3544 2 12 2C11.6456 2 11.3177 2.18754 11.1381 2.49298L1.13807 19.493C0.956189 19.8022 0.953855 20.1851 1.13195 20.4965C1.31005 20.8079 1.64128 21 2 21H22C22.3587 21 22.69 20.8079 22.868 20.4965C23.0461 20.1851 23.0438 19.8022 22.8619 19.493L12.8619 2.49298ZM12 8C12.5523 8 13 8.44772 13 9V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V9C11 8.44772 11.4477 8 12 8ZM12 18C12.8284 18 13.5 17.3284 13.5 16.5C13.5 15.6716 12.8284 15 12 15C11.1716 15 10.5 15.6716 10.5 16.5C10.5 17.3284 11.1716 18 12 18Z" fill="#F58B00"`,
			Success: ` d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L10 13.5858L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L9.29289 15.7071C9.68342 16.0976 10.3166 16.0976 10.7071 15.7071L16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289Z" fill="#36A41D"`,
			Information: ` d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM12 9.5C12.8284 9.5 13.5 8.82843 13.5 8C13.5 7.17157 12.8284 6.5 12 6.5C11.1716 6.5 10.5 7.17157 10.5 8C10.5 8.82843 11.1716 9.5 12 9.5ZM12 11.5C12.5523 11.5 13 11.9477 13 12.5V16.5C13 17.0523 12.5523 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5V12.5C11 11.9477 11.4477 11.5 12 11.5Z" fill="#1B90FF"`,
		};

		const result = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" ${iconPerValueState[this.valueState]}/>;
		</svg>
		`;

		return this.valueState !== ValueState.None ? result : "";
	}

	get _valueStatePopoverHorizontalAlign() {
		return this.effectiveDir !== "rtl" ? "Left" : "Right";
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

	/**
	 * Returns the caret position inside the native input
	 * @protected
	 */
	getCaretPosition() {
		return getCaretPosition(this.nativeInput);
	}

	/**
	 * Sets the caret to a certain position inside the native input
	 * @protected
	 * @param pos
	 */
	setCaretPosition(pos) {
		setCaretPosition(this.nativeInput, pos);
	}

	/**
	 * Removes the fractional part of floating-point number.
	 * @param {String} value the numeric value of Input of type "Number"
	 */
	removeFractionalPart(value) {
		if (value.includes(".")) {
			return value.slice(0, value.indexOf("."));
		}
		if (value.includes(",")) {
			return value.slice(0, value.indexOf(","));
		}

		return value;
	}

	static get dependencies() {
		const Suggestions = getFeature("InputSuggestions");

		return [Popover].concat(Suggestions ? Suggestions.dependencies : []);
	}

	static async onDefine() {
		const Suggestions = getFeature("InputSuggestions");

		[Input.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			Suggestions ? Suggestions.init() : Promise.resolve(),
		]);
	}
}

Input.define();

export default Input;
