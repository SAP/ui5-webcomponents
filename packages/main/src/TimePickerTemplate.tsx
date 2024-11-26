import type TimePicker from "./TimePicker.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import TimePickerPopoverTemplate from "./TimePickerPopoverTemplate.js";

export default function (this: TimePicker) {
	return (
		<>
			<div id={this._id} class="ui5-time-picker-root">
				<Input
					data-sap-focus-ref
					id={`${this._id}-inner`}
					class="ui5-time-picker-input"
					value={this.value}
					placeholder={this._placeholder}
					disabled={this.disabled}
					readonly={this.readonly}
					required={this.required}
					valueState={this.valueState}
					_inputAccInfo={this.accInfo}
					onClick={this._handleInputClick}
					onChange={this._handleInputChange}
					onInput={this._handleInputLiveChange}
					onFocusIn={this._onfocusin}
					onKeyDown={this._onkeydown}
				>
					{this.valueStateMessage.length > 0 &&
						<slot
							name="valueStateMessage"
							slot="valueStateMessage"
						></slot>
					}

					{!this.readonly &&
						<Icon
							slot="icon"
							name={this.openIconName}
							tabindex={-1}
							showTooltip={true}
							onClick={this._togglePicker}
							pressed={this.open}
							class="ui5-time-picker-input-icon-button inputIcon"
						></Icon>
					}
				</Input>
			</div>

			{ TimePickerPopoverTemplate.call(this) }
		</>
	);
};