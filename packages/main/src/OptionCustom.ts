import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import CustomListItem from "./CustomListItem.js";
import { IButton } from "./Button.js";
import ListItemType from "./types/ListItemType.js";
import type { ListItemAccessibilityAttributes as CustomOptionAccessibilityAttributes } from "./ListItem.js";
import HighlightTypes from "./types/HighlightTypes.js";
import { IOption } from "./Select.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option-custom` component defines a custom content of an option in the `ui5-select`.
 * A component to be the same way as the standard `ui5-option`.
 * The component accepts arbitrary HTML content to allow full customization.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/OptionCustom.js";`
 * @constructor
 * @since 2.0.0
 * @extends CustomListItem
 * @public
 */
@customElement({
	tag: "ui5-option-custom",
})
/**
 * **Note:** The event is inherited and not supported. If used, it won't take any effect.
 * @public
 * @deprecated
 */
@event("detail-click")
class OptionCustom extends CustomListItem implements IOption {
	/**
	 * Defines the text, displayed inside the `ui5-select` input filed
	 * when the option gets selected.
	 * @default ""
	 * @public
	 */
	@property()
	displayText!: string;

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
	 * @default false
	 * @public
	 * @deprecated
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

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
	declare accessibilityAttributes: CustomOptionAccessibilityAttributes;

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
	 * **Note:** The slot is inherited and not supported. If set, it won't take any effect.
	 * @public
	 * @deprecated
	 */
	@slot()
	declare deleteButton: Array<IButton>;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: Array<Node>;

	get effectiveDisplayText() {
		return this.displayText || this.textContent || "";
	}
}

OptionCustom.define();

export default OptionCustom;
