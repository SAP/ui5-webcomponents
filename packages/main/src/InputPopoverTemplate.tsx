import Input from "./Input.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";

import Popover from "./Popover.js";
import List from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

export default function InputPopoverTemplate(this: Input) {
	return (
		<>
			{this._effectiveShowSuggestions &&
			<ResponsivePopover
				class={this.classes.popover}
				hideArrow={true}
				preventFocusRestore={true}
				preventInitialFocus={true}
				placement="Bottom"
				horizontalAlign="Start"
				tabindex={-1}
				style={this.styles.suggestionsPopover}
				onOpen={this._afterOpenPicker}
				onClose={this._afterClosePicker}
				onScroll={this._scroll}
				open={this.open}
				opener={this}
				accessibleName={this._popupLabel}
			>
				{this._isPhone &&
					<>
						<div slot="header" class="ui5-responsive-popover-header">
							<div class="row">
								<span>{this._headerTitleText}</span>
								<Button
									class="ui5-responsive-popover-close-btn"
									icon={decline}
									design="Transparent"
									onClick={this._closePicker}
								>
								</Button>
							</div>
							<div class="row">
								<div class="input-root-phone native-input-wrapper">
									<Input
										class="ui5-input-inner-phone"
										type={this.inputType}
										value={this.value}
										showClearIcon={this.showClearIcon}
										placeholder={this.placeholder}
										onInput={this._handleInput}
										onChange={this._handleChange}
									/>
								</div>
							</div>
						</div>

						{this.hasValueStateMessage &&
						<div class={this.classes.popoverValueState} style={this.styles.suggestionPopoverHeader}>
							<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)} />
							{ this.open && valueStateMessage.call(this) }
						</div>
						}
					</>
				}

				{!this._isPhone && this.hasValueStateMessage &&
						<div
							slot="header"
							class={{
								"ui5-responsive-popover-header": true,
								"ui5-responsive-popover-header--focused": this._isValueStateFocused,
								...this.classes.popoverValueState,
							}}
							style={this.styles.suggestionPopoverHeader}
						>
							<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon.call(this)} />
							{ this.open && valueStateMessage.call(this) }
						</div>
				}

				{ suggestionsList.call(this) }

				{this._isPhone &&
					<div slot="footer" class="ui5-responsive-popover-footer">
						<Button
							design="Transparent"
							onClick={this._closePicker}
						>
							OK
						</Button>
					</div>
				}
			</ResponsivePopover>
			}

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
				this.shouldDisplayDefaultValueStateMessage ? <>{this.valueStateText}</> : <slot name="valueStateMessage"></slot>
			}
		</>
	);
}

function suggestionsList(this: Input) {
	return (
		<List
			separators={this.suggestionSeparators}
			selectionMode="Single"
			onMouseDown={this.onItemMouseDown}
			onItemClick={this._handleSuggestionItemPress}
			onSelectionChange={this._handleSelectionChange}
		>
			<slot></slot>
		</List>
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
