import StandardListItem from "./StandardListItem.js";
import SuggestionListItemTemplate from "./generated/templates/SuggestionListItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-suggestion-item",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.SuggestionListItem.prototype */ {
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
			propertyName: "titleText",
		},
	},
};

/**
 * @class
 * The <code>ui5-li-suggestion-item</code> represents the suggestion item in the <code>ui5-input</code>
 * suggestion popover.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li-suggestion-item</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the suggestion list item</li>
 * <li>description - Used to style the description of the suggestion list item</li>
 * <li>info - Used to style the info of the suggestion list item</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SuggestionListItem
 * @extends sap.ui.webcomponents.main.StandardListItem
 * @tagname ui5-li-suggestion-item
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
		this.hasTitle = !!this.titleText.length;
	}

	get effectiveTitle() {
		return this.titleText.filter(node => node.nodeType !== Node.COMMENT_NODE).map(el => el.textContent).join("");
	}

	get hasDescription() {
		return this.richDescription.length || this.description;
	}
}

SuggestionListItem.define();

export default SuggestionListItem;
