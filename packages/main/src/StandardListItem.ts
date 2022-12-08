import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItem, { IAccessibleListItem } from "./ListItem.js";
import Icon from "./Icon.js";
// @ts-ignore
import Avatar from "./Avatar.js";
import WrappingType from "./types/WrappingType.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";

/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the list item</li>
 * <li>description - Used to style the description of the list item</li>
 * <li>additional-text - Used to style the additionalText of the list item</li>
 * <li>icon - Used to style the icon of the list item</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.StandardListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
@customElement("ui5-li")
class StandardListItem extends ListItem implements IAccessibleListItem {
	@property()
	description!: string;

	@property()
	icon!: string;

	@property({ type: Boolean })
	iconEnd!: boolean;

	@property()
	image!: string;

	@property()
	additionalText!: string;

	@property({ type: ValueState, defaultValue: ValueState.None })
	additionalTextState!: ValueState;

	@property()
	accessibleName!: string;

	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: WrappingType;

	@property({ type: Boolean })
	hasTitle!: boolean;

	static get template() {
		return StandardListItemTemplate;
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!this.textContent;
	}

	get displayImage() {
		return !!this.image;
	}

	get displayIconBegin() {
		return (this.icon && !this.iconEnd);
	}

	get displayIconEnd() {
		return (this.icon && this.iconEnd);
	}

	static get dependencies() {
		return [
			...ListItem.dependencies,
			Icon,
			Avatar,
		];
	}
}

StandardListItem.define();

export default StandardListItem;
