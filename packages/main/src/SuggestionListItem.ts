import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import StandardListItem from "./StandardListItem.js";
import SuggestionListItemTemplate from "./generated/templates/SuggestionListItemTemplate.lit.js";

/**
 * @class
 * The `ui5-li-suggestion-item` represents the suggestion item in the `ui5-input`
 * suggestion popover.
 * @constructor
 * @extends StandardListItem
 * @csspart title - Used to style the title of the suggestion list item
 * @csspart description - Used to style the description of the suggestion list item
 * @csspart info - Used to style the info of the suggestion list item
 */
@customElement({
	tag: "ui5-li-suggestion-item",
	template: SuggestionListItemTemplate,
})
class SuggestionListItem extends StandardListItem {
	/**
	 * Defines a description that can contain HTML.
	 * **Note:** If not specified, the `description` property will be used.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot({ type: HTMLElement })
	richDescription!: Array<HTMLElement>

	/**
	 * Defines the title text of the suggestion item.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	titleText!: Array<Node>;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!this.titleText.length;
		this.accessibleRole = "option";
	}

	get effectiveTitle() {
		return this.titleText.filter(node => node.nodeType !== Node.COMMENT_NODE).map(el => el.textContent).join("");
	}

	get hasDescription() {
		return this.richDescription.length || this.description;
	}

	get groupItem() {
		return false;
	}

	get _effectiveTabIndex(): string {
		return "-1";
	}
}

SuggestionListItem.define();

export default SuggestionListItem;
