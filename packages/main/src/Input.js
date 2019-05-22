import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import ValueState from "@ui5/webcomponents-base/src/types/ValueState.js";

import {
	isUp,
	isDown,
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import Icon from "./Icon.js";
import InputType from "./types/InputType.js";
// Template
import InputRenderer from "./build/compiled/InputRenderer.lit.js";
import InputTemplateContext from "./InputTemplateContext.js";

// Styles
import styles from "./themes/Input.css.js";
import shellbarInput from "./themes/ShellBarInput.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-input",
	defaultSlot: "suggestionItems",
	slots: /** @lends sap.ui.webcomponents.main.Input.prototype */ {

		/**
		 * Defines the icon to be displayed in the <code>ui5-input</code>.
		 *
		 * @type {Icon}
		 * @slot
		 * @public
		 */
		icon: {
			type: Icon,
		},

		/**
		 * Defines the <code>ui5-input</code> suggestion items.
		 * </br></br>
		 * Example: </br>
		 * &lt;ui5-input show-suggestions></br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #1&lt;/ui5-li></br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #2&lt;/ui5-li></br>
		 * &lt;/ui5-input>
		 * <ui5-input show-suggestions><ui5-li>Item #1</ui5-li><ui5-li>Item #2</ui5-li></ui5-input>
		 * </br></br>
		 * <b>Note:</b> The suggestion would be displayed only if the <code>showSuggestions</code>
		 * property is set to <code>true</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		suggestionItems: {
			type: HTMLElement,
			multiple: true,
		},

		_beginContent: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Input.prototype */  {

		/**
		 * Defines whether <code>ui5-input</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-input</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-input</code> has no value.
		 * <br><br>
		 * <b>Note:</b> The placeholder is not supported in IE. If the placeholder is provided, it won`t be displayed in IE.
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
		 * @type {string}
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
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
		 *
		 * @type {string}
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
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport";</code>
		 *
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
		 *
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		showSuggestions: {
			type: Boolean,
		},

		_focused: {
			type: Boolean,
		},

		_input: {
			type: Object,
		},

		_popover: {
			type: Object,
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
		 * Fired when a suggestion item, which displayed in the suggestion popup, is selected.
		 *
		 * @event
		 * @param {HTMLElement} item The selected item
		 * @public
		 */
		suggestionItemSelect: {
			detail: {
				item: { type: HTMLElement },
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
 * and and it can be enabled or disabled (<code>enabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don"t forget to import the <code>Suggestions</code> module from
 * "@ui5/webcomponents/dist/Suggestions"
 * to enable the suggestions functionality.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/InputSuggestions";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Input
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @public
 */
class Input extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return InputRenderer;
	}

	static get calculateTemplateContext() {
		return InputTemplateContext.calculate;
	}

	static get styles() {
		return [styles, shellbarInput];
	}

	constructor() {
		super();
		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Represents the value before user moves selection between the suggestion items.
		// Used to register and fire "input" event upon [SPACE] or [ENTER].
		// Note: the property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = undefined;

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// all sementic events
		this.EVENT_SUBMIT = "submit";
		this.EVENT_CHANGE = "change";
		this.EVENT_INPUT = "input";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestionItemSelect";

		// all user interactions
		this.ACTION_ENTER = "enter";
		this.ACTION_USER_INPUT = "input";

		this._input = {
			onInput: this._onInput.bind(this),
			change: event => {
				this.fireEvent(this.EVENT_CHANGE);
			},
		};

		this._whenShadowRootReady().then(this.attachFocusHandlers.bind(this));
	}

	onBeforeRendering() {
		if (this.showSuggestions) {
			this.enableSuggestions();
		}

		if (Input.FormSupport) {
			Input.FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport";`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		if (!this.firstRendering && this.Suggestions) {
			this.Suggestions.toggle(this.shouldOpenSuggestions());
		}
		this.firstRendering = false;
	}

	onkeydown(event) {
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
	}

	/* Event handling */
	_handleUp(event) {
		if (this.Suggestions) {
			this.Suggestions.onUp(event);
		}
	}

	_handleDown(event) {
		if (this.Suggestions) {
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

	onfocusin() {
		this._focused = true; // invalidating property
		this.previousValue = this.value;
	}

	onfocusout() {
		this._focused = false; // invalidating property
		this.previousValue = "";
	}

	_onInput(event) {
		if (event.target === this.getInputDOMRef()) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		this.fireEventByAction(this.ACTION_USER_INPUT);
		this.hasSuggestionItemSelected = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);
		}
	}

	/* Private Methods */
	attachFocusHandlers() {
		this.shadowRoot.addEventListener("focusout", this.onfocusout.bind(this));
		this.shadowRoot.addEventListener("focusin", this.onfocusin.bind(this));
	}

	enableSuggestions() {
		if (this.Suggestions) {
			return;
		}

		try {
			const Suggestions = Input.getSuggestions();
			this.Suggestions = new Suggestions(this, "suggestionItems");
		} catch (err) {
			throw new Error(`You have to import @ui5/webcomponents/dist/InputSuggestions module to use ui5-input suggestions:: ${err}`);
		}
	}

	shouldOpenSuggestions() {
		return !!(this.suggestionItems.length
			&& this.showSuggestions
			&& this._focused
			&& !this.hasSuggestionItemSelected);
	}

	selectSuggestion(item, keyboardUsed) {
		const itemText = item.textContent;
		const fireInput = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : this.value !== itemText;

		item.selected = false;
		this.hasSuggestionItemSelected = true;
		this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item });

		if (fireInput) {
			this.value = itemText;
			this.valueBeforeItemSelection = itemText;
			this.fireEvent(this.EVENT_INPUT);
			this.fireEvent(this.EVENT_CHANGE);
		}
	}

	previewSuggestion(item) {
		this.valueBeforeItemSelection = this.value;
		this.value = item.textContent;
	}

	fireEventByAction(action) {
		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = this.getInputValue();
		const isSubmit = action === this.ACTION_ENTER;
		const isUserInput = action === this.ACTION_USER_INPUT;

		this.value = inputValue;

		if (isUserInput) { // input
			this.fireEvent(this.EVENT_INPUT);
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


	getInputValue() {
		const inputDOM = this.getDomRef();
		if (inputDOM) {
			return this.getInputDOMRef().value;
		}
		return "";
	}

	getInputDOMRef() {
		return this.getDomRef().querySelector(`#${this.getInputId()}`);
	}

	getLabelableElementId() {
		return this.getInputId();
	}

	getInputId() {
		return `${this._id}-inner`;
	}

	/* Suggestions interface  */
	onItemFocused() {}

	onItemSelected(item, keyboardUsed) {
		this.selectSuggestion(item, keyboardUsed);
	}

	onItemPreviewed(item) {
		this.previewSuggestion(item);
	}

	onOpen() {}

	onClose() {}
}

Bootstrap.boot().then(_ => {
	Input.define();
});

export default Input;
