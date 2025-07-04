import type Select from "./Select.js";
import Icon from "./Icon.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import SelectPopoverTemplate from "./SelectPopoverTemplate.js";

export default function SelectTemplate(this: Select) {
	return (
		<>
			<div
				class={{
					"ui5-select-root": true,
					"ui5-input-focusable-element": true,
				}}
				id={`${this._id}-select`}
				onClick={this._onclick}
				title={this.tooltip}
			>
				{!this.icon && this.selectedOptionIcon &&
					<Icon
						mode="Decorative"
						class="ui5-select-option-icon"
						name={this.selectedOptionIcon} />
				}

				<div
					class="ui5-select-label-root"
					data-sap-focus-ref
					tabindex={this._effectiveTabIndex}
					role="combobox"
					aria-haspopup="listbox"
					aria-label={this.ariaLabelText}
					aria-describedby={this.valueStateTextId}
					aria-disabled={this.isDisabled}
					aria-required={this.required}
					aria-readonly={this.readonly}
					aria-expanded={this._isPickerOpen}
					aria-roledescription={this._ariaRoleDescription}
					onKeyDown={this._onkeydown}
					onKeyPress={this._handleKeyboardNavigation}
					onKeyUp={this._onkeyup}
					onFocusIn={this._onfocusin}
					onFocusOut={this._onfocusout}
				>
					{this.hasCustomLabel
						? <slot name="label"></slot>
						: this.text
					}
				</div>

				{this.icon &&
					<div class={{
						"ui5-select-icon-root": true,
						"inputIcon": true,
						"inputIcon--pressed": this._iconPressed,
					}}>
						<Icon
							name={this.icon}
							class={{
								"ui5-select-icon": true,
							}} />
					</div>
				}

				{!this.icon && !this.readonly &&
					<div class={{
						"ui5-select-icon-root": true,
						"inputIcon": true,
						"inputIcon--pressed": this._iconPressed,
					}}>
						<Icon
							part="icon"
							name={slimArrowDown}
							class={{
								"ui5-select-icon": true,
							}} />
					</div>
				}

				{this.hasValueState &&
					<span id={`${this._id}-valueStateDesc`} class="ui5-hidden-text">
						{this.valueStateText}
					</span>
				}
			</div>
			{SelectPopoverTemplate.call(this)}
		</>
	);
}
