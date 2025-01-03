import type Input from "./Input.js";
import Icon from "./Icon.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

export default function InputPopoverTemplate(this: Input) {
	return (
		<>
			{this._effectiveShowSuggestions && this.Suggestions?.template.call(this, valueStateMessage, valueStateMessageInputIcon) }

			{this.hasValueStateMessage &&
				<Popover
					preventInitialFocus={true}
					preventFocusRestore={true}
					hideArrow={true}
					class="ui5-valuestatemessage-popover"
					placement="Bottom"
					tabindex={-1}
					horizontalAlign={this._valueStatePopoverHorizontalAlign}
					opener={this}
					open={this.valueStateOpen}
					onClose={this._handleValueStatePopoverAfterClose}
				>
					<div slot="header" class={this.classes.popoverValueState} style={this.styles.popoverHeader}>
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)} />
						{ this.valueStateOpen && valueStateMessage.call(this) }
					</div>
				</Popover>
			}
		</>
	);
}

function valueStateMessage(this: Input) {
	return (
		<>
			{
				this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : <slot name="valueStateMessage"></slot>
			}
		</>
	);
}

function valueStateMessageInputIcon(this: Input) {
	const iconPerValueState = {
		Negative: error,
		Critical: alert,
		Positive: sysEnter2,
		Information: information,
	};

	return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}
