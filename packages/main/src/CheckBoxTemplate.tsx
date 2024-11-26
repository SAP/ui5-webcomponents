import Icon from "./Icon.js";
import type CheckBox from "./CheckBox.js";
import Label from "./Label.js";

import accept from "@ui5/webcomponents-icons/dist/accept.js";
import complete from "@ui5/webcomponents-icons/dist/complete.js";
import border from "@ui5/webcomponents-icons/dist/border.js";
import triState from "@ui5/webcomponents-icons/dist/tri-state.js"

export default function (this: CheckBox) {
	return (
		<div
		// todo classes
			class="ui5-checkbox-root {{classes.main}}"
			role="checkbox"
			part="root"
			aria-checked={this.effectiveAriaChecked}
			aria-readonly={this.ariaReadonly}
			aria-disabled={this.effectiveAriaDisabled}
			aria-label={this.ariaLabelText}
			aria-labelledby={this.ariaLabelledBy}
			aria-describedby={this.ariaDescribedBy}
			aria-required={this.required}
			tabindex={this.effectiveTabIndex}
			onMouseDown={this._onmousedown}
			onMouseUp={this._onmouseup}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._onclick}
			onFocusOut={this._onfocusout}
		>

		{this.isDisplayOnly ?
			<div class="ui5-checkbox-display-only-icon-inner">
				<Icon aria-hidden="true" name={displayOnlyIcon.call(this)} class="ui5-checkbox-display-only-icon" part="icon"></Icon>
			</div>
		:
			<div id={`${this._id}}-CbBg`} class="ui5-checkbox-inner">
				{this.isCompletelyChecked &&
					<Icon aria-hidden="true" name={accept} class="ui5-checkbox-icon" part="icon"></Icon>
				}
			</div>
		}

		<input
			id={`${this._id}}-CB`}
			type="checkbox"
			checked={this.checked}
			readonly={this.readonly}
			disabled={this.disabled}
			tabindex={-1}
			aria-hidden="true"
			data-sap-no-tab-ref
		/>

		{this.text &&
			<Label 
				id={`${this._id}}-label`}
				part="label" 
				class="ui5-checkbox-label"
				wrappingType={this.wrappingType}
			>
				{this.text}
			</Label>
		}

		{this.hasValueState &&
			<span id={`${this._id}}-descr`} class="ui5-hidden-text">{this.valueStateText}</span>
		}
	</div>
	);
}

function displayOnlyIcon(this: CheckBox) {
	if (this.isCompletelyChecked) {
		return complete;
	}
	if (this.checked && this.indeterminate) {
		return triState;
	}
	return border;
}
