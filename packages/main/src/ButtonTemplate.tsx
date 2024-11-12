import type Button from "./Button.js"
import Icon from "./Icon.js";

export default function (this: Button, injectedProps?: { ariaPressed?: boolean }) {
	return (<>
		<button
			type="button"
			class="ui5-button-root"
			disabled={this.disabled}
			data-sap-focus-ref
			aria-pressed={injectedProps?.ariaPressed}
			onFocusOut={this._onfocusout}
			onFocusIn={this._onfocusin}
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
			title={this.buttonTitle}
			part="button"
			role={this.effectiveAccRole}
		>
			{ this.icon &&
				<Icon
					class="ui5-button-icon"
					name={this.icon}
					mode={this.iconMode}
					part="icon"
					showTooltip={this.showIconTooltip}
				></Icon>
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
					mode={this.endIconMode}
					part="endIcon"
				></Icon>
			}

			{this.hasButtonType &&
				<span id="ui5-button-hiddenText-type" aria-hidden="true" class="ui5-hidden-text">{this.buttonTypeText}</span>
			}
		</button>
	</>);
};
