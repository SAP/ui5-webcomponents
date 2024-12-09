import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type SliderBase from "./SliderBase.js";

export type SliderBaseHooks = {
	handlesAriaText: any
	progressBar: any
	handles: any
}

const predefinedHooks: SliderBaseHooks = {
	handlesAriaText,
	progressBar,
	handles,
};

export default function SliderBaseTemplate(this: SliderBase, hooks?: Partial<SliderBaseHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };
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
			{currentHooks.handlesAriaText.call(this)}

			<div class="ui5-slider-inner">
				{this.step && this.showTickmarks && <>
					<ul class="ui5-slider-tickmarks">
						{this.tickmarksObject.map(tm => <>
							{tm ?
								<li class="ui5-slider-tickmark ui5-slider-tickmark-in-range"></li>
								:
								<li class="ui5-slider-tickmark"></li>
							}
						</>)}
					</ul>
					{this.labelInterval &&
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

				{currentHooks.progressBar.call(this)}

				{currentHooks.handles.call(this)}
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

function handlesAriaText(this: SliderBase) { }
function progressBar(this: SliderBase) { }
function handles(this: SliderBase) { }
