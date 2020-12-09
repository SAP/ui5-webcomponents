import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
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
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/decline.js";
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

/**
 * @public
 */
const metadata = {
	tag: "ui5-input",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Input.prototype */ {

		/**
		 * Defines the icon to be displayed in the <code>ui5-input</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},

		/**
		 * Defines the <code>ui5-input</code> suggestion items.
		 * <br><br>
		 * Example:
		 * <br><br>
		 * &lt;ui5-input show-suggestions><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #1">&lt;/ui5-suggestion-item><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #2">&lt;/ui5-suggestion-item><br>
		 * &lt;/ui5-input>
		 * <br>
		 * <ui5-input show-suggestions>
		 * <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>
		 * </ui5-input>
		 * <br><br>
		 * <b>Note:</b> The suggestion would be displayed only if the <code>showSuggestions</code>
		 * property is set to <code>true</code>.
		 * <br><br>
		 * <b>Note:</b> The &lt;ui5-suggestion-item> is recommended to be used as a suggestion item.
		 * Importing the Input Suggestions Support feature:
		 * <br>
		 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code>
		 * <br>
		 * also automatically imports the &lt;ui5-suggestion-item> for your convenience.
		 *
		 * @type {HTMLElement[]}
		 * @slot
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
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-input</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-input</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * <br>
		 * <b>Note:</b> If the <code>ui5-input</code> has <code>suggestionItems</code>,
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
		 * Defines whether the <code>ui5-input</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-input</code> is completely noninteractive.
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
		 * @public
		 * @sicne 1.0.0-rc.8
		 */
		highlight: {
			type: Boolean,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-input</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-input</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-input</code> is not editable,
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
		 * Defines whether the <code>ui5-input</code> is required.
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
		 * Defines the HTML type of the <code>ui5-input</code>.
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
		 * Defines the value of the <code>ui5-input</code>.
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
		 * Defines the value state of the <code>ui5-input</code>.
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
		 * Determines the name with which the <code>ui5-input</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-input</code> so that it can be submitted as
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
		 * Defines whether the <code>ui5-input</code> should show suggestions, if such are present.
		 * <br><br>
		 * <b>Note:</b>
		 * Don`t forget to import the <code>InputSuggestions</code> module from <code>"@ui5/webcomponents/dist/features/InputSuggestions.js"</code> to enable this functionality.
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
		 * Defines the aria-label attribute for the input
		 *
		 * @type {String}
		 * @since 1.0.0-rc.8
		 * @private
		 * @defaultvalue ""
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		_input: {
			type: Object,
		},

		_inputAccInfo: {
			type: Object,
		},

		_wrapperAccInfo: {
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
		 * Fired when the value of the <code>ui5-input</code> changes at each keystroke,
		 * and when a suggestion item has been selected.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when user presses Enter key on the <code>ui5-input</code>.
		 * <br><br>
		 * <b>Note:</b> The event is fired independent of whether there was a change before or not.
		 * If change was performed, the event is fired after the change event.
		 * The event is also fired when an item of the select list is selected by pressing Enter.
		 *
		 * @event
		 * @public
		 */
		submit: {},

		/**
		 * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-select
		 * @param {HTMLElement} item The selected item
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
		 * @param {HTMLElement} item The previewed suggestion item
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
		 * @param {Integer} scrollTop The current scroll position
		 * @param {HTMLElement} scrollContainer The scroll container
		 * @public
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
 * and it can be enabled or disabled (<code>enabled</code> property).
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
 * @appenddocs SuggestionItem
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
		return [ResponsivePopoverCommonCss, ValueStateMessageCss];
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

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = undefined;

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// The value that should be highlited.
		this.highlightValue = "";

		// all sementic events
		this.EVENT_SUBMIT = "submit";
		this.EVENT_CHANGE = "change";
		this.EVENT_INPUT = "input";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestion-item-select";

		// all user interactions
		this.ACTION_ENTER = "enter";
		this.ACTION_USER_INPUT = "input";

		// Suggestions array initialization
		this.suggestionsTexts = [];

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

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

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	async onAfterRendering() {
		if (!this.firstRendering && !isPhone() && this.Suggestions) {
			const shouldOpenSuggestions = this.shouldOpenSuggestions();

			this.Suggestions.toggle(shouldOpenSuggestions, {
				preventFocusRestore: !this.hasSuggestionItemSelected,
			});

			RenderScheduler.whenFinished().then(async () => {
				this._listWidth = await this.Suggestions._getListWidth();
			});

			if (!isPhone() && shouldOpenSuggestions) {
				// Set initial focus to the native input

				(await this.getInputDOMRef()).focus();
			}
		}

		if (!this.firstRendering && this.hasValueStateMessage) {
			this.toggle(this.shouldDisplayOnlyValueStateMessage);
		}

		this.firstRendering = false;
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

		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isEscape(event)) {
			return this._handleEscape(event);
		}

		if (this.showSuggestions) {
			this.Suggestions._deselectItems();
		}

		this._keyDown = true;
	}

	_onkeyup(event) {
		this._keyDown = false;
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

	_handleEnter(event) {
		const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));
		if (!itemPressed) {
			this.fireEventByAction(this.ACTION_ENTER);
		}
	}

	_handleEscape() {
		if (this.showSuggestions && this.Suggestions && this.Suggestions._isItemOnTarget()) {
			// Restore the value.
			this.value = this.valueBeforeItemPreview;

			// Mark that the selection has been canceled, so the popover can close
			// and not reopen, due to receiving focus.
			this.suggestionSelectionCanceled = true;

			// Close suggestion popover
			this._closeRespPopover(true);
		}
	}

	async _onfocusin(event) {
		const inputDomRef = await this.getInputDOMRef();

		if (event.target !== inputDomRef) {
			return;
		}

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
		if (focusedOutToSuggestions	|| focusedOutToValueStateMessage) {
			event.stopImmediatePropagation();
			return;
		}

		const toBeFocused = event.relatedTarget;

		if (toBeFocused && toBeFocused.classList.contains(this._id)) {
			return;
		}

		this.closePopover();

		this.previousValue = "";
		this.focused = false; // invalidating property
	}

	_click(event) {
		if (isPhone() && !this.readonly && this.Suggestions) {
			this.Suggestions.open(this);
			this.isRespPopoverOpen = true;
		}
	}

	_handleChange(event) {
		this.fireEvent(this.EVENT_CHANGE);
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

		this.suggestionSelectionCanceled = false;

		if (this.value && this.type === InputType.Number && !isBackSpace(event) && !inputDomRef.value) {
			// For input with type="Number", if the delimiter is entered second time, the inner input is firing event with empty value
			return;
		}

		if (event.target === inputDomRef) {
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

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);
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
		}
	}

	toggle(isToggled) {
		if (isToggled && !this.isRespPopoverOpen) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	/**
	 * Checks if the value state popover is open.
	 * @returns {Boolean} true if the popover is open, false otherwise
	 * @public
	 */
	isOpen() {
		return !!this._isPopoverOpen;
	}

	async openPopover() {
		const popover = await this._getPopover();

		if (popover) {
			this._isPopoverOpen = true;
			popover.openBy(this);
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
			this.Suggestions.highlight = this.highlight;
			return;
		}

		const Suggestions = getFeature("InputSuggestions");
		if (Suggestions) {
			this.Suggestions = new Suggestions(this, "suggestionItems", this.highlight);
		} else {
			throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
		}
	}

	shouldOpenSuggestions() {
		return !!(this.suggestionItems.length
			&& this.focused
			&& this.showSuggestions
			&& !this.hasSuggestionItemSelected
			&& !this.suggestionSelectionCanceled);
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
			this.fireEvent(this.EVENT_INPUT);
			this.fireEvent(this.EVENT_CHANGE);
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
		const itemValue = noPreview ? "" : (item.effectiveTitle || item.textContent);
		this.value = itemValue;
	}

	/**
	 * The suggestion item on preview.
	 * @type { ui5-suggestion-item }
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
		const isSubmit = action === this.ACTION_ENTER;
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

		if (isSubmit) { // submit
			this.fireEvent(this.EVENT_SUBMIT);
		}

		// In IE, pressing the ENTER does not fire change
		const valueChanged = (this.previousValue !== undefined) && (this.previousValue !== this.value);
		if (isIE() && isSubmit && valueChanged) {
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
		if (isPhone() && this.Suggestions && this.suggestionItems.length) {
			await this.Suggestions._respPopover();
			return this.Suggestions && this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
		}

		return this.getDomRef().querySelector(`input`);
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
		const i18nBundle = this.i18nBundle;

		return {
			"Success": i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
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
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get inputType() {
		return this.type.toLowerCase();
	}

	get suggestionsTextId() {
		return this.showSuggestions ? `${this._id}-suggestionsText` : "";
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : "";
	}

	get suggestionsCount() {
		return this.showSuggestions ? `${this._id}-suggestionsCount` : "";
	}

	get accInfo() {
		const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
		const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
		const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this.suggestionsCount} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId} ${this.suggestionsCount}`.trim();

		return {
			"input": {
				"ariaDescribedBy": ariaDescribedBy || undefined,
				"ariaInvalid": this.valueState === ValueState.Error ? "true" : undefined,
				"ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
				"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
				"role": this._inputAccInfo && this._inputAccInfo.role,
				"ariaOwns": this._inputAccInfo && this._inputAccInfo.ariaOwns,
				"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
				"ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
				"ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || getEffectiveAriaLabelText(this),
			},
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
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-responsive-popover-header": !this.isOpen(),
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popoverHeader: {
				"width": `${this._inputWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
				"padding": "0.5625rem 1rem",
			},
			suggestionsPopover: {
				"max-width": `${this._inputWidth}px`,
			},
		};
	}

	get suggestionSeparators() {
		return "None";
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.shouldOpenSuggestions() && this.focused;
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
		return this.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get availableSuggestionsCount() {
		if (this.showSuggestions) {
			switch (this.suggestionsTexts.length) {
			case 0:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);

			case 1:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);

			default:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, this.suggestionsTexts.length);
			}
		}

		return undefined;
	}

	get step() {
		return this.type === InputType.Number ? "any" : undefined;
	}

	get _isPhone() {
		return isPhone();
	}

	static get dependencies() {
		const Suggestions = getFeature("InputSuggestions");

		return [Popover].concat(Suggestions ? Suggestions.dependencies : []);
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Input.define();

export default Input;
