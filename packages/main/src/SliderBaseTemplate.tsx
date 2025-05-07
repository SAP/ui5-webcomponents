import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type { JsxTemplate } from "@ui5/webcomponents-base";
import type SliderBase from "./SliderBase.js";

export default function SliderBaseTemplate(this: SliderBase, hooks?: {
	handlesAriaText?: JsxTemplate
	progressBar?: JsxTemplate
	handles?: JsxTemplate
}) {
	return (
		<div
			class={{
				"ui5-slider-root": true,
				"ui5-slider-root-phone": isPhone(),
			}}
			onMouseDown={this._onmousedown}
			onTouchStart={this._onmousedown}
			onMouseOver={this._onmouseover}
			onMouseOut={this._onmouseout}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onKeyupBase}
			part="root-container"
		>
			{(hooks?.handlesAriaText || handlesAriaText).call(this)}

			<div class="ui5-slider-inner">
				{!!this.step && this.showTickmarks && <>
					<ul class="ui5-slider-tickmarks">
						{this.tickmarksObject.map(tm => <>
							{tm ?
								<li class="ui5-slider-tickmark ui5-slider-tickmark-in-range"></li>
								:
								<li class="ui5-slider-tickmark"></li>
							}
						</>)}
					</ul>
					{!!this.labelInterval &&
							<ul class={{
								"ui5-slider-labels": true,
								"ui5-slider-hidden-labels": this._labelsOverlapping,
							}}
							style={this.styles.labelContainer}
							>
								{this._labels.map(l =>
									<li style={this.styles.label}>{l}</li>
								)}
							</ul>
					}
				</>}

				{(hooks?.progressBar || progressBar).call(this)}

				{(hooks?.handles || handles).call(this)}
			</div>

			{this.accessibleName &&
				<span id="ui5-slider-accName" class="ui5-hidden-text">{this.accessibleName}</span>
			}

			<span id="ui5-slider-sliderDesc" class="ui5-hidden-text">{this._ariaLabelledByText}</span>

			{this.editableTooltip && <>
				<span id="ui5-slider-InputDesc" class="ui5-hidden-text">{this._ariaDescribedByInputText}</span>
				<span id="ui5-slider-InputLabel" class="ui5-hidden-text">{this._ariaLabelledByInputText}</span>
			</>}

		</div>

	);
}

export function handlesAriaText(this: SliderBase) { }
export function progressBar(this: SliderBase) { }
export function handles(this: SliderBase) { }
