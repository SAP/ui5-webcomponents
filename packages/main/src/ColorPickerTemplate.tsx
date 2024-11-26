import type ColorPicker from "./ColorPicker.js";
import Label from "./Label.js";
import Slider from "./Slider.js";
import Input from "./Input.js";

export default function (this: ColorPicker) {
	return (
		<section class="ui5-color-picker-root">
			<div
				class="ui5-color-picker-main-color"
				style={{ "background-color": `rgb(${this._mainValue.r}, ${this._mainValue.g}, ${this._mainValue.b})` }}
				onMouseDown={this._handleMouseDown}
				onMouseUp={this._handleMouseUp}
				onMouseMove={this._handleMouseMove}
				onMouseOut={this._handleMouseOut}
			>
				<div
					class="ui5-color-picker-circle"
					style={{
						left: `${this._selectedCoordinates.x}px`,
						top: `${this._selectedCoordinates.y}px`,
					}}
				></div>
			</div>

			<div class="ui5-color-picker-sliders-wrapper">
				<Slider
					disabled={this.inputsDisabled}
					class="ui5-color-picker-hue-slider"
					min={0}
					max={1530}
					value={this._hue}
					accessibleName={this.hueSliderLabel}
					onInput={this._handleHueInput}
				></Slider>

				{this._isDefaultPickerMode &&
					<Slider
						disabled={this.inputsDisabled}
						class="ui5-color-picker-alpha-slider"
						min={0}
						max={1}
						step={0.01}
						value={this._alpha}
						accessibleName={this.alphaSliderLabel}
						onInput={this._handleAlphaInputFromSlider}
					></Slider>
				}
			</div>

			<div class="ui5-color-picker-current-color">
				<div class="ui5-color-picker-colors-wrapper">
					<span class="ui5-color-picker-white"></span>
					<span class="ui5-color-picker-color">
						<div
							class="ui5-color-picker-color-inner"
							style={{ "background-color": `rgba(${this._value.r}, ${this._value.g}, ${this._value.b}, ${this._alpha})` }}
						></div>
					</span>
				</div>

				<div class="ui5-color-picker-hex-input-wrapper">
					<Label>Hex</Label>
					<Input
						class="ui5-color-picker-hex-input"
						value={this.hex}
						onKeyDown={this._onkeydown}
						accessibleName={this.hexInputLabel}
						onChange={this._handleHEXChange}
						// TODO: Discuss - returning undefined, better return "None"?
						// @ts-expect-error
						valueState={this.hexInputErrorState}
					></Input>
				</div>
			</div>

			{this._isDefaultPickerMode &&
				<div
					class="ui5-color-picker-rgb-wrapper"
					onui5-change={this._handleRGBInputsChange}
				>
					<div class="ui5-color-picker-rgb">
						<Input
							id="red"
							class="ui5-color-picker-rgb-input"
							disabled={this.inputsDisabled}
							accessibleName={this.redInputLabel}
							value={String(this._value.r)}
						></Input>
						<Label>R</Label>
					</div>
					<div class="ui5-color-picker-rgb">
						<Input
							id="green"
							class="ui5-color-picker-rgb-input"
							disabled={this.inputsDisabled}
							accessibleName={this.greenInputLabel}
							value={String(this._value.g)}
						></Input>
						<Label>G</Label>
					</div>
					<div class="ui5-color-picker-rgb">
						<Input
							id="blue"
							class="ui5-color-picker-rgb-input"
							disabled={this.inputsDisabled}
							accessibleName={this.blueInputLabel}
							value={String(this._value.b)}
						></Input>
						<Label>B</Label>
					</div>
					<div class="ui5-color-picker-rgb">
						<Input
							id="alpha"
							disabled={this.inputsDisabled}
							class="ui5-color-picker-rgb-input"
							value={String(this._alpha)}
							accessibleName={this.alphaInputLabel}
							onChange={this._handleAlphaChange}
						></Input>
						<Label>A</Label>
					</div>
				</div>
			}
		</section>
    );
};
