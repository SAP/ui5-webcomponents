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
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design. <br/>
 * **Note:** Deprecated since version `2.9.0`. Use the `text` property instead. <br/>
 * Only use the default slot if you need to apply custom text formatting with HTML elements (like `<b>`, `<i>`, etc.).
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
	 * Defines the text of the component.
	 *
	 * @default undefined
	 * @public
	 * @since 2.9.0
	 */
	@property()
	text?: string;

	/**
	 * Defines the description displayed right under the item text, if such is present.
	 * @default undefined
	 * @public
	 * @since 0.8.0
	 */
	@property()
	description?: string;

	/**
	 * Defines the additional text, displayed in the end of the list item.
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
	 * Defines whether the item is movable.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable = false;

	/**
	 * Defines whether the content of the list item should wrap when it's too long.
	 * When set to true, the content (title, description) will be wrapped
	 * using the `ui5-expandable-text` component.<br/>
	 *
	 * The text can wrap up to 100 characters on small screens (size S) and
	 * up to 300 characters on larger screens (size M and above). When text exceeds
	 * these limits, it truncates with an ellipsis followed by a text expansion trigger.
	 *
	 * @default false
	 * @public
	 * @since 2.9.0
	 */
	@property({ type: Boolean })
	wrapping = false;

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
	 * Defines the text alternative of the component.
	 * **Note:** If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Indicates if the list item has text content.
	 * @private
	 */
	@property({ type: Boolean })
	hasTitle = false;

	@property({ type: Boolean })
	_hasImage = false;

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

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!(this.text || this.textContent);
		this._hasImage = this.hasImage;
		this.wrappingType = this.wrapping ? "Normal" : "None";
	}

	/**
	 * Returns the content text, either from text property or from the default slot
	 * @private
	 */
	get _textContent(): string {
		return this.text || this.textContent || "";
	}

	/**
	 * Determines the maximum characters to display based on the current media range.
	 * - Size S: 100 characters
	 * - Size M and larger: 300 characters
	 * @private
	 */
	get _maxCharacters(): number {
		return this.mediaRange === "S" ? 100 : 300;
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
}

ListItemStandard.define();

export default ListItemStandard;
