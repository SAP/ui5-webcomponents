import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import type { IAccessibleListItem } from "./ListItem.js";
import Icon from "./Icon.js";
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

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 *
 * @slot {Node[]} default - Defines the text of the component.
 * <br><br>
 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 *
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	tag: "ui5-li",
	template: StandardListItemTemplate,
	dependencies: [
		...ListItem.dependencies,
		Icon,
		Avatar,
	],
})
class StandardListItem extends ListItem implements IAccessibleListItem {
	/**
	 * Defines the description displayed right under the item text, if such is present.
	 * @default ""
	 * @public
	 * @since 0.8.0
	 */
	@property()
	description!: string;

	/**
	 * Defines the <code>icon</code> source URI.
	 * <br><br>
	 * <b>Note:</b>
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end.
	 * <br><br>
	 * <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * Defines the <code>image</code> source URI.
	 * <br><br>
	 * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	image!: string;

	/**
	 * Defines the <code>additionalText</code>, displayed in the end of the list item.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the state of the <code>additionalText</code>.
	 * <br>
	 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.
	 * @default "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	additionalTextState!: `${ValueState}`;

	/**
	 * Defines the text alternative of the component.
	 * Note: If not provided a default text alternative will be set, if present.
	 *
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	declare accessibleName: string;

	/**
	 * Defines if the text of the component should wrap, they truncate by default.
	 *
	 * <br><br>
	 * <b>Note:</b> this property takes affect only if text node is provided to default slot of the component
	 * @default "None"
	 * @private
	 * @since 1.5.0
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`;

	/**
	 * Indicates if the list item has text content.
	 * @private
	 */
	@property({ type: Boolean })
	hasTitle!: boolean;

	@property({ type: Boolean })
	_hasImageContent!: boolean;

	/**
	 * <b>Note:</b> While the slot allows option for setting custom avatar, to match the
	 * design guidelines, please use the <code>ui5-avatar</code> with it`s default size - S.
	 * <b>Note:</b> If bigger <code>ui5-avatar</code> needs to be used, then the size of the
	 * <code>ui5-li</code> should be customized in order to fit.
	 * @since 1.10.0
	 * @public
	 */
	@slot()
	imageContent!: Array<HTMLElement>;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!this.textContent;
		this._hasImageContent = this.hasImageContent;
	}

	get displayImage(): boolean {
		return !!this.image;
	}

	get displayIconBegin(): boolean {
		return !!(this.icon && !this.iconEnd);
	}

	get displayIconEnd(): boolean {
		return !!(this.icon && this.iconEnd);
	}

	get hasImageContent(): boolean {
		return !!this.imageContent.length;
	}
}

StandardListItem.define();

export default StandardListItem;
