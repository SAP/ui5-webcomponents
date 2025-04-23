import type Button from "./Button.js";
import Icon from "./Icon.js";

export default function ButtonTemplate(this: Button, injectedProps?: {
		ariaPressed?: boolean,
		ariaValueMax?: number,
		ariaValueMin?: number,
		ariaValueNow?: number,
		ariaValueText?: string,
}) {
	return (<>
		<button
			type="button"
			class={{
				"ui5-button-root": true,
				"ui5-button-badge-placement-end": this.badge[0]?.design === "InlineText",
				"ui5-button-badge-placement-end-top": this.badge[0]?.design === "OverlayText",
				"ui5-button-badge-dot": this.badge[0]?.design === "AttentionDot",
			}}
			disabled={this.disabled}
			data-sap-focus-ref
			aria-pressed={injectedProps?.ariaPressed}
			aria-valuemin={injectedProps?.ariaValueMin}
			aria-valuemax={injectedProps?.ariaValueMax}
			aria-valuenow={injectedProps?.ariaValueNow}
			aria-valuetext={injectedProps?.ariaValueText}
			onFocusOut={this._onfocusout}
			onClick={this._onclick}
			onMouseDown={this._onmousedown}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onTouchStart={this._ontouchstart}
			onTouchEnd={this._ontouchend}
			tabindex={this.tabIndexValue}
			aria-expanded={this.accessibilityAttributes.expanded}
			aria-controls={this.accessibilityAttributes.controls}
			aria-haspopup={this._hasPopup}
			aria-label={this.ariaLabelText}
			aria-describedby={this.ariaDescribedbyText}
			aria-description={this.ariaDescriptionText}
			title={this.buttonTitle}
			part="button"
			role={this.effectiveAccRole}
		>
			{ this.icon &&
				<Icon
					class="ui5-button-icon"
					name={this.icon}
					mode="Decorative"
					part="icon"
				/>
			}

			<span id={`${this._id}-content`} class="ui5-button-text">
				<bdi>
					<slot></slot>
				</bdi>
			</span>

			{this.endIcon &&
				<Icon
					class="ui5-button-end-icon"
					name={this.endIcon}
					mode="Decorative"
					part="endIcon"
				/>
			}

			{this.hasButtonType &&
				<span id="ui5-button-hiddenText-type" aria-hidden="true" class="ui5-hidden-text">{this.buttonTypeText}</span>
			}

			{this.shouldRenderBadge &&
				<slot name="badge"/>
			}
		</button>
	</>);
}
