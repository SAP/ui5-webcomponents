import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import type { IAccessibleListItem } from "./ListItem.js";
import type WrappingType from "./types/WrappingType.js";
import ListItemStandardTemplate from "./ListItemStandardTemplate.js";

/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

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
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML elements, it is strongly recommended to provide text
 * or a `<ui5-expandable-text>` component for a consistent design.
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	tag: "ui5-li",
	renderer: jsxRenderer,
	template: ListItemStandardTemplate,
})
class ListItemStandard extends ListItem implements IAccessibleListItem {
	/**
	 * Defines the description displayed right under the item text, if such is present.
	 * @default undefined
	 * @public
	 * @since 0.8.0
	 */
	@property()
	description?: string;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd = false;

	/**
	 * Defines the `additionalText`, displayed in the end of the list item.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the state of the `additionalText`.
	 *
	 * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
	 * @default "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalTextState: `${ValueState}` = "None";

	/**
	 * Defines whether the item is movable.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable = false;

	/**
	 * Defines the text alternative of the component.
	 * Note: If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	declare accessibleName?: string;

	/**
	 * Defines if the text of the component should wrap, they truncate by default.
	 *
	 * **Note:** this property takes affect only if text node is provided to default slot of the component
	 * @default "None"
	 * @private
	 * @since 1.5.0
	 */
	@property()
	wrappingType: `${WrappingType}` = "None";

	/**
	 * Indicates if the list item has text content.
	 * @private
	 */
	@property({ type: Boolean })
	hasTitle = false;

	@property({ type: Boolean })
	_hasImage = false;

	/**
	 * Indicates if the list item has description content.
	 * @private
	 */
	@property({ type: Boolean })
	hasDescription = false;

	/**
	 * Indicates if the list item has additional text content.
	 * @private
	 */
	@property({ type: Boolean })
	hasAdditionalText = false;

	/**
	 * Indicates if the list item has expandable content.
	 * @private
	 */
	@property({ type: Boolean })
	hasExpandableContent = false;

	/**
	 * **Note:** While the slot allows option for setting custom avatar, to match the
	 * design guidelines, please use the `ui5-avatar` with it's default size - S.
	 *
	 * **Note:** If bigger `ui5-avatar` needs to be used, then the size of the
	 * `ui5-li` should be customized in order to fit.
	 * @since 2.0.0
	 * @public
	 */
	@slot()
	image!: Array<HTMLElement>;

	/**
	 * Defines the expandable description of the component.
	 * **Note:** Can only be used with a `ui5-expandable-text` component
	 * @since 2.8.0
	 * @public
	 */
	@slot()
	expandableDescription!: Array<HTMLElement>;

	/**
	 * Defines the expandable additional text of the component.
	 * **Note:** Can only be used with a `ui5-expandable-text` component
	 * @since 2.8.0
	 * @public
	 */
	@slot()
	expandableAdditionalText!: Array<HTMLElement>;

	onBeforeRendering() {
		super.onBeforeRendering();

		this.hasTitle = !!this.textContent;
		this._hasImage = this.hasImage;
		this.hasDescription = !!(this.description || this.hasExpandableDescription);
		this.hasAdditionalText = !!(this.additionalText || this.hasExpandableAdditionalText);

		if (this.hasExpandableNodes) {
			this.hasExpandableContent = true;
		}
	}

	get displayIconBegin(): boolean {
		return !!(this.icon && !this.iconEnd);
	}

	get displayIconEnd(): boolean {
		return !!(this.icon && this.iconEnd);
	}

	get hasImage(): boolean {
		return !!this.image.length;
	}

	get hasExpandableDescription(): boolean {
		return this.expandableDescription.length > 0;
	}

	get hasExpandableAdditionalText(): boolean {
		return this.expandableAdditionalText.length > 0;
	}

	get hasExpandableTitle(): boolean {
		const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])");
		const assignedNodes = defaultSlot ? (defaultSlot as HTMLSlotElement).assignedNodes() : [];

		return assignedNodes.some(node => node instanceof HTMLElement && node.tagName.toLowerCase() === "ui5-expandable-text");
	}

	get hasExpandableNodes(): boolean {
		return this.hasExpandableTitle
			|| this.hasExpandableDescription
			|| this.hasExpandableAdditionalText;
	}
}

ListItemStandard.define();

export default ListItemStandard;
