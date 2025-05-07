import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import type RangeSlider from "./RangeSlider.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";

export default function RangeSliderTemplate(this: RangeSlider) {
	return SliderBaseTemplate.call(this, {
		handlesAriaText,
		progressBar,
		handles,
	});
}

export function handlesAriaText(this: RangeSlider) {
	return (<>
		<span id="ui5-slider-startHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.startHandleText}</span>
		<span id="ui5-slider-endHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.endHandleText}</span>
	</>);
}

export function progressBar(this: RangeSlider) {
	return (
		<div
			class="ui5-slider-progress-container"
			part="progress-container"
		>
			<div class="ui5-slider-progress"
				part="progress-bar"
				style={this.styles.progress}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this._ariaValueNow}
				aria-valuetext={`From ${this.startValue} to ${this.endValue}`}
				{...(this.ariaLabelText
					? { "aria-label": this.ariaLabelText }
					: { "aria-labelledby": "ui5-slider-sliderDesc" })}
				aria-disabled={this._ariaDisabled}
			></div>
		</div>
	);
}

export function handles(this: RangeSlider) {
	return (<>
		<div class="ui5-slider-handle-container" style={this.styles.startHandle} part="handle-container">
			<div class="ui5-slider-handle ui5-slider-handle--start"
				part="handle"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabindex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.startValue}
				aria-labelledby={this._ariaLabelledByStartHandleText}
				aria-disabled={this._ariaDisabled}
				aria-describedby={this._ariaDescribedByHandleText}
				aria-keyshortcuts="F2"
			>
				<Icon name={directionArrows}
					mode="Decorative"
					slider-icon
				></Icon>
			</div>

			{this.showTooltip &&
				<div class="ui5-slider-tooltip ui5-slider-tooltip--start" style={this.styles.tooltip}>
					{this.editableTooltip ?
						<Input
							type="Number"
							value={this.startValue.toString()}
							accessibleNameRef="ui5-slider-InputLabel"
							onFocusOut={this._onInputFocusOut}
							onKeyDown={this._onInputKeydown}
							onChange={this._onInputChange}
							onInput={this._onInputInput}
							data-sap-ui-start-value
							tabIndex={-1}
						></Input>
						:
						<span class="ui5-slider-tooltip-value">{this.tooltipStartValue}</span>
					}
				</div>
			}
		</div>
		<div class="ui5-slider-handle-container" style={this.styles.endHandle} part="handle-container">
			<div class="ui5-slider-handle ui5-slider-handle--end"
				part="handle"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.endValue}
				aria-labelledby={this._ariaLabelledByEndHandleText}
				aria-describedby={this._ariaDescribedByHandleText}
				aria-disabled={this._ariaDisabled}
				aria-keyshortcuts="F2"
			>
				<Icon name={directionArrows}
					mode="Decorative"
					slider-icon
				></Icon>
			</div>

			{this.showTooltip &&
				<div class="ui5-slider-tooltip ui5-slider-tooltip--end" style={this.styles.tooltip}>
					{this.editableTooltip ?
						<Input
							type="Number"
							value={this.endValue.toString()}
							accessibleNameRef="ui5-slider-InputLabel"
							onFocusOut={this._onInputFocusOut}
							onKeyDown={this._onInputKeydown}
							onChange={this._onInputChange}
							onInput={this._onInputInput}
							data-sap-ui-end-value
							tabIndex={-1}
						></Input>
						:
						<span class="ui5-slider-tooltip-value">{this.tooltipEndValue}</span>
					}
				</div>
			}
		</div>
	</>);
}
