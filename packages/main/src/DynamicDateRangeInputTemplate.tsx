import type DynamicDateRange from "./DynamicDateRange.js";
import Icon from "./Icon.js";
import Input from "./Input.js";

export default function DynamicDateRangeInputTemplate(this: DynamicDateRange) {
	return (
		<div
			class="ui5-dynamic-date-range-root"
			style={{
				width: "100%",
			}}
		>
			<Input
				data-sap-focus-ref
				id={`${this._id}-inner`}
				class="ui5-dynamic-date-range-input"
				value={this.value && this.getOption(this.value?.operator)?.format(this.value)}
				onChange={this.onInputChange}
			>

				{/* {this.valueStateMessage.length > 0 &&
					<slot name="valueStateMessage" slot="valueStateMessage"></slot>
				} */}

				{/* {!this.readonly && */}
				<Icon
					id={`${this._id}-value-help`}
					slot="icon"
					name={this.openIconName}
					tabindex={-1}
					mode={this._iconMode}
					onClick={this._togglePicker}
				/>

			</Input>
		</div>
	);
}
