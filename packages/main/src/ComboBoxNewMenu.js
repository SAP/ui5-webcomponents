import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Templates
import ComboBoxNewMenuTemplate from "./generated/templates/ComboBoxNewMenuTemplate.lit.js";

// Styles
import ComboBoxNewMenuCss from "./generated/themes/ComboBoxNewMenu.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox-new-menu",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.ComboBoxNewMenu.prototype */ {
		"for": {
			type: String,
		},
		value: {
			type: String,
		}
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
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
	},
};

class ComboBoxNewMenu extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ComboBoxNewMenuCss;
	}

	static get template() {
		return ComboBoxNewMenuTemplate;
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

	open(opener) {
		this.getDomRef().showAt(opener);
	}

	get _filteredItems() {
		if (!this.value) {
			return this.items;
		}

		return this.items.filter(item => item.getEffectiveValue().includes(this.value));
	}

	_selectItem(event) {
		const listItem = event.detail.item;
		const cbItem = listItem.children[0].assignedNodes()[0];
		this.value = cbItem.getEffectiveValue();
		document.getElementById(this.for).value = this.value;
	}
}

ComboBoxNewMenu.define();

export default ComboBoxNewMenu;
