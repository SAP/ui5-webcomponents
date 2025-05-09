import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import type Slider from "./Slider.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";

export default function SliderTemplate(this: Slider) {
	return SliderBaseTemplate.call(this, {
		progressBar,
		handles,
	});
}

export function progressBar(this: Slider) {
	return (
		<div
			class="ui5-slider-progress-container"
			aria-hidden="true"
			part="progress-container"
		>
			<div class="ui5-slider-progress"
				style={this.styles.progress}
				onFocusOut={this._onfocusout}
				onFocusIn={this._onfocusin}
				tabIndex={-1}
				part="progress-bar"
			></div>
		</div>
	);
}

export function handles(this: Slider) {
	return (
		<div class="ui5-slider-handle-container" style={this.styles.handle} part="handle-container">
			<div class="ui5-slider-handle"
				onFocusOut={this._onfocusout}
				onFocusIn={this._onfocusin}
				onKeyUp={this._onkeyup}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.value}
				{...(this.ariaLabelText
					? { "aria-label": this.ariaLabelText }
					: { "aria-labelledby": this._ariaLabelledByHandleText })}
				aria-disabled={this._ariaDisabled}
				aria-keyshortcuts={this._ariaKeyshortcuts}
				aria-describedby={this._ariaDescribedByHandleText}
				data-sap-focus-ref
				part="handle"
			>
				<Icon name={directionArrows}
					mode="Decorative"
					part="icon-slider"
					slider-icon
				></Icon>
			</div>
			{this.showTooltip &&
			<div class="ui5-slider-tooltip" style={this.styles.tooltip}>
				{this.editableTooltip ?
					<Input
						value={this._tooltipInputValue}
						valueState={this._tooltipInputValueState}
						type="Number"
						accessibleNameRef="ui5-slider-InputLabel"
						onFocusOut={this._onInputFocusOut}
						onKeyDown={this._onInputKeydown}
						onChange={this._onInputChange}
						onInput={this._onInputInput}
						data-sap-ui-end-value
						tabIndex={-1}
					></Input>
					:
					<span class="ui5-slider-tooltip-value">{this.tooltipValue}</span>
				}
			</div>
			}
		</div>
	);
}
