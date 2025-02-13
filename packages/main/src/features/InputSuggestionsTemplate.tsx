import type { JsxTemplateResult } from "@ui5/webcomponents-base/dist/index.js";
import Input from "../Input.js";
import Icon from "../Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

import List from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import Button from "../Button.js";

export default function InputSuggestionsTemplate(this: Input, hooks?: { suggestionsList?: (this: Input) => JsxTemplateResult, valueStateMessage: (this: Input) => JsxTemplateResult, valueStateMessageInputIcon: (this: Input) => string }) {
	const suggestionsList = hooks?.suggestionsList || defaultSuggestionsList;
	const valueStateMessage = hooks?.valueStateMessage;
	const valueStateMessageInputIcon = hooks?.valueStateMessageInputIcon;

	return (
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
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon?.call(this)} />
						{ this.open && valueStateMessage?.call(this) }
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
						<Icon class="ui5-input-value-state-message-icon" name={valueStateMessageInputIcon?.call(this)} />
						{ this.open && valueStateMessage?.call(this) }
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
	);
}

function defaultSuggestionsList(this: Input) {
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
