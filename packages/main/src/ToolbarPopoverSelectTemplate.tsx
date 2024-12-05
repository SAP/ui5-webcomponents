import type ToolbarSelect from "./ToolbarSelect.js";
import Select from "./Select.js";
import Option from "./Option.js";

export default function (this: ToolbarSelect ) {
	return (
		<Select
			class="ui5-tb-popover-item"
			data-ui5-external-action-item-id={this._id}
			valueState={this.valueState}
			disabled={this.disabled}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
		>
			{this.options.map((option, index) => (
				<Option
					selected={option.selected}
					data-ui5-external-action-item-index={index}
				>
					{option.textContent}
				</Option>
			))}
		</Select>
	);
};
