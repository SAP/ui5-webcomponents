import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ValueState from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/ValueState";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import Icon from "./Icon";
import InputType from "./types/InputType";
// Template
import InputRenderer from "./build/compiled/InputRenderer.lit";
import InputTemplateContext from "./InputTemplateContext";

// Styles
import belize from "./themes/sap_belize/Input.less";
import belizeHcb from "./themes/sap_belize_hcb/Input.less";
import fiori3 from "./themes/sap_fiori_3/Input.less";

// Styles for searchField
import shellBarInput from "./themes/sap_fiori_3/ShellBarInput.less";
import shellBarInputBelize from "./themes/sap_belize/ShellBarInput.less";
import shellBarInputBelizeHcb from "./themes/sap_belize_hcb/ShellBarInput.less";

ShadowDOM.registerStyle("sap_belize", "Input.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Input.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Input.css", fiori3);


ShadowDOM.registerStyle("sap_fiori_3", "ShellBarInput.css", shellBarInput);
ShadowDOM.registerStyle("sap_belize", "ShellBarInput.css", shellBarInputBelize);
ShadowDOM.registerStyle("sap_belize_hcb", "ShellBarInput.css", shellBarInputBelizeHcb);

/**
 * @public
 */
const metadata = {
	tag: "ui5-input",
	styleUrl: [
		"Input.css",
		"ShellBarInput.css",
	],
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
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li type="Active">Item #1&lt;/ui5-li></br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li type="Active">Item #2&lt;/ui5-li></br>
		 * &lt;/ui5-input>
		 * <ui5-input show-suggestions><ui5-li type="Active">Item #1</ui5-li><ui5-li type="Active">Item #2</ui5-li></ui5-input>
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
	},
	properties: /** @lends  sap.ui.webcomponents.main.Input.prototype */  {

		/**
		 * Defines whether <code>ui5-input</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-input</code> is completely uninteractive.
		 *
		 * @type {boolean}
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
		 * @public
		 */
		placeholder: {
			defaultValue: null,
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-input</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-input</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
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
		 * @public
		 */
		type: {
			defaultValue: InputType.Text,
			type: InputType,
		},

		/**
		 * Defines the value of the <code>ui5-input</code>.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * @type {string}
		 * @public
		 */
		value: {
			defaultValue: "",
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-input</code>.
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
		 *
		 * @type {string}
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines whether the <code>ui5-input</code> should show suggestions, if such are present.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showSuggestions: {
			type: Boolean,
		},

		_focused: {
			type: Boolean,
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
		liveChange: {},

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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-input
 * @public
 */
class Input extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return InputRenderer;
	}

	static get calculateTemplateContext() {
		return InputTemplateContext.calculate;
	}

	constructor(state) {
		super(state);

		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Indicates if there is focused suggestionItem.
		// Used to ignore the Input "focusedOut" and thus preventing firing "change" event.
		this.hasSuggestionItemFocused = false;

		this.previousValue = undefined;

		// Represents the value before user moves selection between the suggestion items.
		// Used to register and fire "liveChange" event upon [SPACE] or [ENTER].
		// Note: the property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// all sementic events
		this.EVENT_SUBMIT = "submit";
		this.EVENT_CHANGE = "change";
		this.EVENT_LIVE_CHANGE = "liveChange";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestionItemSelect";

		// all user interactions
		this.ACTION_INPUT = "input";
		this.ACTION_ENTER = "enter";
		this.ACTION_FOCUSOUT = "focusOut";

		this._whenShadowRootReady().then(this.attachFocusHandler.bind(this));
	}

	onBeforeRendering() {
		if (this.showSuggestions) {
			this.enableSuggestions();
		}
	}

	onAfterRendering() {
		if (!this.firstRendering && this.Suggestions) {
			this.Suggestions.toggle(this.shouldOpenSuggestions());
		}
		this.checkFocusOut();
		this.firstRendering = false;
	}

	/* Event handling */
	onsapup(event) {
		if (this.Suggestions) {
			this.Suggestions.onUp(event);
		}
	}

	onsapdown(event) {
		if (this.Suggestions) {
			this.Suggestions.onDown(event);
		}
	}

	onsapright(event) {
		this.onsapdown(event);
	}

	onsapleft(event) {
		this.onsapup(event);
	}

	onsapspace(event) {
		if (this.Suggestions) {
			this.Suggestions.onSpace(event);
		}
	}

	onsapenter(event) {
		const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));
		if (!itemPressed) {
			this.fireEventByAction(this.ACTION_ENTER);
		}
	}

	onfocusin() {
		this.previousValue = this.value;
		this.hasSuggestionItemFocused = false;
		this._focused = true; // invalidating property
	}

	onfocusout() {
		this._focused = false; // invalidating property
	}

	oninput() {
		this.fireEventByAction(this.ACTION_INPUT);
		this.hasSuggestionItemSelected = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);
		}
	}

	/* Private Methods */
	attachFocusHandler() {
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
		const itemText = item._nodeText;
		const fireLiveChange = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : this.value !== itemText;

		item.selected = false;
		this.hasSuggestionItemSelected = true;
		this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item });

		if (fireLiveChange) {
			this.value = itemText;
			this.valueBeforeItemSelection = itemText;
			this.fireEvent(this.EVENT_LIVE_CHANGE);
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
		const isFocusOut = action === this.ACTION_FOCUSOUT;
		const isInput = action === this.ACTION_INPUT;

		this.value = inputValue;

		const valueChanged = (this.previousValue !== undefined) && (this.previousValue !== this.value);

		if (isInput) { // liveChange
			this.fireEvent(this.EVENT_LIVE_CHANGE);
			return;
		}

		if ((isSubmit || isFocusOut) && valueChanged) { // change
			this.previousValue = this.value;
			this.fireEvent(this.EVENT_CHANGE);
		}

		if (isSubmit) { // submit
			this.fireEvent(this.EVENT_SUBMIT);
		}
	}

	checkFocusOut() {
		if (!this._focused && !this.hasSuggestionItemFocused) {
			this.fireEventByAction(this.ACTION_FOCUSOUT);
			this.previousValue = "";
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
	onItemFocused() {
		this.hasSuggestionItemFocused = true;
	}

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
