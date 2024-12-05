import type TimePicker from "./TimePicker.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";

export default function (this: TimePicker) {
	return (
		<>
			<ResponsivePopover
				id={`${this._id}-responsive-popover`}
				class="ui5-time-picker-popover"
				placement="Bottom"
				horizontalAlign="Start"
				opener={this}
				open={this.open}
				allowTargetOverlap={true}
				_hideHeader={true}
				hideArrow={true}
				accessibleName={this.pickerAccessibleName}
				onClose={this.onResponsivePopoverAfterClose}
				onOpen={this.onResponsivePopoverAfterOpen}
				onWheel={this._handleWheel}
				onKeyDown={this._onkeydown}
			>
				<TimeSelectionClocks
					id={`${this._id}-time-sel`}
					value={this._timeSelectionValue}
					formatPattern={this._formatPattern}
					onChange={this.onTimeSelectionChange}
					onClosePicker={this.submitPickers}
				></TimeSelectionClocks>

				<div slot="footer" class="ui5-time-picker-footer">
					<Button id="submit" design="Emphasized" onClick={this.submitPickers}>{this.submitButtonLabel}</Button>
					<Button id="close" design="Transparent" onClick={this._togglePicker}>{this.cancelButtonLabel}</Button>
				</div>
			</ResponsivePopover>

			{this._isMobileDevice &&
				<Popover
					id={`${this._id}-popover`}
					class="ui5-time-picker-inputs-popover"
					placement="Bottom"
					horizontalAlign="Start"
					allow-target-overlap
					_hide-header
					hide-arrow
					onOpen={this.onInputsPopoverAfterOpen}
					onClose={this.onInputsPopoverAfterClose}
					onWheel={this._handleWheel}
					onKeyDown={this._onkeydown}
				>
					<div class="popover-content">
						<TimeSelectionInputs
							id={`${this._id}-time-sel-inputs`}
							value={this._timeSelectionValue}
							formatPattern={this._formatPattern}
							onChange={this.onTimeSelectionChange}
							onCloseInputs={this.submitInputsPopover}
						></TimeSelectionInputs>
					</div>

					<div slot="footer" class="ui5-time-picker-footer">
						<Button id="submitInputs" design="Emphasized" onClick={this.submitInputsPopover}>{this.submitButtonLabel}</Button>
						<Button id="closeInputs" design="Transparent" onClick={this.closeInputsPopover}>{this.cancelButtonLabel}</Button>
					</div>
				</Popover>
			}
		</>
	);
}
