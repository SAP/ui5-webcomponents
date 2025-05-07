import Icon from "./Icon.js";
import type ProgressIndicator from "./ProgressIndicator.js";

import information from "@ui5/webcomponents-icons/dist/information.js";
import statusNegative from "@ui5/webcomponents-icons/dist/status-negative.js";
import statusPositive from "@ui5/webcomponents-icons/dist/status-positive.js";
import statusCritical from "@ui5/webcomponents-icons/dist/status-critical.js";

const valueStateIconMappings: Record<string, string> = {
	"Negative": statusNegative,
	"Critical": statusCritical,
	"Positive": statusPositive,
	"Information": information,
};

export default function ProgressIndicatorTemplate(this: ProgressIndicator) {
	return (
		<div
			class={{
				"ui5-progress-indicator-root": true,
				"ui5-progress-indicator-max-value": this.validatedValue === 100,
				"ui5-progress-indicator-min-value": this.validatedValue === 0,
			}}
			role="progressbar"
			aria-valuemin={0}
			aria-valuenow={this.validatedValue}
			aria-valuemax={100}
			aria-valuetext={this.valueStateText}
			aria-label={this.accessibleName}
		>
			<div class="ui5-progress-indicator-bar" part="bar" style={{ "width": `${this.validatedValue}%`, "transition-duration": this.shouldAnimate ? `${this._transitionDuration}ms` : "none" }}>
				{!this.showValueInRemainingBar && valueLabel.call(this) }
			</div>
			<div class="ui5-progress-indicator-remaining-bar" part="remaining-bar">
				{ this.showValueInRemainingBar && valueLabel.call(this) }
			</div>
		</div>
	);
}

function valueLabel(this: ProgressIndicator) {
	return (
		<>
			{ this.showIcon &&
			<Icon name={valueStateIcon.call(this)} class="ui5-progress-indicator-icon"/> }

			{!this.hideValue &&
			<span class="ui5-progress-indicator-value"> {this.displayValue ? this.displayValue : `${this.validatedValue}%`}</span> }
		</>
	);
}

function valueStateIcon(this: ProgressIndicator) {
	return valueStateIconMappings[this.valueState];
}
