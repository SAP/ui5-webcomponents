import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Templates
import ComboBoxNewTemplate from "./generated/templates/ComboBoxNewTemplate.lit.js";

// Styles
import ComboBoxNewCss from "./generated/themes/ComboBoxNew.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox-new",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.ComboBoxNew.prototype */ {
		/**
		 * Defines the value of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the "live" value of the component.
		 * <br><br>
		 * <b>Note:</b> If we have an item e.g. "Bulgaria", "B" is typed, "ulgaria" is typed ahead, value will be "Bulgaria", filterValue will be "B".
		 *
		 * <br><br>
		 * <b>Note:</b> Initially the filter value is synced with value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		filterValue: {
			type: String,
			defaultValue: "",
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
			defaultValue: "",
		},

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
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Indicates whether a loading indicator should be shown in the picker.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		loading: {
			type: Boolean,
		},

		/**
		 * Defines the filter type of the component.
		 * Available options are: <code>StartsWithPerTerm</code>, <code>StartsWith</code> and <code>Contains</code>.
		 *
		 * @type {string}
		 * @defaultvalue "StartsWithPerTerm"
		 * @public
		 */
		filter: {
			type: String,
			defaultValue: "StartsWithPerTerm",
		},

		/**
		 * Indicates whether the input is focssed
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

		/**
		 * Defines the accessible aria name of the component.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the component
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		_filteredItems: {
			type: Object,
		},

	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the component items.
		 *
		 * @type {sap.ui.webcomponents.main.IComboBoxItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the component.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-combobox</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.9
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},

		/**
		 * Defines the icon to be displayed in the input field.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon}
		 * @slot
		 * @public
		 * @since 1.0.0-rc.9
		 */
		icon: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter, focusout or an item is selected.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when typing in input.
		 * <br><br>
		 * <b>Note:</b> filterValue property is updated, input is changed.
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when selection is changed by user interaction
		 *
		 * @event sap.ui.webcomponents.main.ComboBox#selection-change
		 * @param {HTMLElement} item item to be selected.
		 * @public
		 */
		"selection-change": {
			detail: {
				item: { type: HTMLElement },
			},
		},
	},
};

class ComboBoxNew extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ComboBoxNewCss;
	}

	static get template() {
		return ComboBoxNewTemplate;
	}

	constructor(props) {
		super(props);
	}

	onBeforeRendering() {

	}

	async onAfterRendering() {

	}

	static get dependencies() {
		return [

		];
	}

	get menu() {
		return document.querySelector(`[for="${this.id}"]`);
	}

	_arrowClick() {
		this.menu.open(this);
	}

	_input(event) {
		const { value } = event.target;
		this.value = value;
		this.menu.value = value;
	}
}

ComboBoxNew.define();

export default ComboBoxNew;
