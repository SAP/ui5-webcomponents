import StandardListItem from "./StandardListItem.js";
import SuggestionListItemTemplate from "./generated/templates/SuggestionListItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-suggestion-item",
	managedSlots: true,
	slots: {
		/**
		 * Defines a description that can contain HTML.
		 * <b>Note:</b> If not specified, the <code>description</code> property will be used.
		 * <br>
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.8
		 * @slot
		 * @public
		 */
		richDescription: {
			type: HTMLElement,
		},
		"default": {
			propertyName: "title",
		},
	},
};

/**
 * @class
 * The <code>ui5-li-suggestion-item</code> represents the suggestion item in the <code>ui5-input</code>
 * suggestion popover.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SuggestionListItem
 * @extends UI5Element
 * @tagname ui5-suggestion-item
 */
class SuggestionListItem extends StandardListItem {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return SuggestionListItemTemplate;
	}

	onBeforeRendering(...params) {
		super.onBeforeRendering(...params);
		this.hasTitle = !!this.title.length;
	}

	get effectiveTitle() {
		return this.title.map(el => el.textContent).join("");
	}

	get hasDescription() {
		return this.richDescription.length || this.description;
	}
}

SuggestionListItem.define();

export default SuggestionListItem;
