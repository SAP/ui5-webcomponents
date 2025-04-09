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
				// placeholder={this._placeholder}
				// type={this.type}
				value={this.value && this.getOption(this.value?.operator)?.format(this.value)}
				// disabled={this.disabled}
				// required={this.required}
				// readonly={this.readonly}
				// valueState={this.valueState}
				// _inputAccInfo={this.accInfo}
				onChange={this.onInputChange}
				// onInput={this._onInputInput}
				// onSubmit={this._onInputSubmit}
				// onKeyDown={this._onkeydown}
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
					// accessibleName={this.openIconTitle}
					mode={this._iconMode}
					// showTooltip={true}
					// class={{
					// 	"inputIcon": true,
					// 	"inputIcon--pressed": this.open,
					// }}
					onClick={this._togglePicker}
				/>

			</Input>
		</div>
	);
}
