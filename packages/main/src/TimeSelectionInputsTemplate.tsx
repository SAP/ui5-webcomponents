import type TimeSelectionInputs from "./TimeSelectionInputs.js";
import Input from "./Input.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";

export default function TimeSelectionInputsTemplate(this: TimeSelectionInputs) {
	return (
		<div
			class="ui5-time-selection-inputs"
			onKeyDown={this._onkeydown}
		>

			{this._entities.map(entity => (

				<>
					{
						entity.hasSeparator && <span class="ui5-time-selection-separator">:</span>
					}

					<Input
						id={`${this._id}_input_${entity.entity}`}
						class="ui5-time-selection-numeric-input"
						type={this._numberType}
						maxlength={2}
						autocomplete="off"
						pattern="[0-9]*"
						inputmode="numeric"
						value={entity.stringValue}
						accessibleName={entity.label}
						_nativeInputAttributes={entity.attributes}
						onFocusIn={this._onfocusin}
						onFocusOut={this._onfocusout}
						onInput={this._oninput}
					/>
				</>
			))}

			{this._periods.length > 0 &&
			<>
				<span class="ui5-time-selection-separator"></span>
				<SegmentedButton id={`${this._id}_AmPm`} onClick={this._periodChange}>
					{this._periods.map(period =>
						<SegmentedButtonItem selected={period.selected}>{period.label}</SegmentedButtonItem>
					)}
				</SegmentedButton>
			</>
			}
		</div>);
}
