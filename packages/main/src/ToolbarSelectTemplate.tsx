import type ToolbarSelect from "./ToolbarSelect.js";
import Select from "./Select.js";
import Option from "./Option.js";

export default function (this: ToolbarSelect ) {
	return (
		<Select
			class="ui5-tb-item"
			style={this.styles}
			data-ui5-external-action-item-id={this._id}
			value-state={this.valueState}
			disabled={this.disabled}
			accessible-name={this.accessibleName}
			accessible-name-ref={this.accessibleNameRef}
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
