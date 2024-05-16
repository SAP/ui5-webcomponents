import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import StandardListItem from "./StandardListItem.js";
import ListItemType from "./types/ListItemType.js";
import { IButton } from "./Button.js";
import type { ListItemAccessibilityAttributes as OptionAccessibilityAttributes } from "./ListItem.js";
import HighlightTypes from "./types/HighlightTypes.js";
import { IOption } from "./Select.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends StandardListItem
 * @public
 */
@customElement({
	tag: "ui5-option",
})
/**
 * **Note:** The event is inherited and not supported. If used, it won't take any effect.
 * @deprecated
 */
@event("detail-click")
class Option extends StandardListItem implements IOption {
	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	text!: Array<Node>;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default "Active"
	 * @public
	 * @deprecated
	 */
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	declare type: `${ListItemType}`;

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default {}
	 * @public
	 * @deprecated
	 */
	@property({ type: Object })
	declare accessibilityAttributes: OptionAccessibilityAttributes;

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default false
	 * @public
	 * @deprecated
	 */
	@property({ type: Boolean })
	declare navigated: boolean;

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default "None"
	 * @public
	 * @deprecated
	 */
	@property({ type: HighlightTypes, defaultValue: HighlightTypes.None })
	highlight!: `${HighlightTypes}`;

	/**
	 *
	 * @default "None"
	 * @public
	 * @deprecated
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	additionalTextState!: `${ValueState}`;

	/**
	 * **Note:** The slot is inherited and not supported. If set, it won't take any effect.
	 * @public
	 * @deprecated
	 */
	@slot()
	declare deleteButton: Array<IButton>;

	get effectiveDisplayText() {
		return this.textContent || "";
	}
}

Option.define();

export default Option;
