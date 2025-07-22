import type ToolbarSelect from "./ToolbarSelect.js";
import Select from "./Select.js";
import Option from "./Option.js";

export default function ToolbarSelectTemplate(this: ToolbarSelect) {
	const HTMLElementForLabel = this.hasCustomLabel ? this.label[0]?.tagName?.toLowerCase() : "span";
	return (
		<Select
			class={this.classes.root}
			style={this.styles}
			value={this.value}
			data-ui5-external-action-item-id={this._id}
			valueState={this.valueState}
			disabled={this.disabled}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			onClick={(...args) => this.onClick(...args)}
			onClose={(...args) => this.onClose(...args)}
			onOpen={(...args) => this.onOpen(...args)}
			onChange={(...args) => this.onChange(...args)}
			label={this.label}
		>
			{this.hasCustomLabel &&
				<HTMLElementForLabel slot="label">
					{this.label[0].innerHTML}
				</HTMLElementForLabel>
			}
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
}
