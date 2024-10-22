import type Button from "./Button.js"
import Icon from "./Icon.js";

export default (props: Button, injectedProps?: { ariaPressed?: boolean }) => {
	return (<>
		<button
			type="button"
			class="ui5-button-root"
			disabled={props.disabled}
			data-sap-focus-ref
			aria-pressed={injectedProps?.ariaPressed}
			onFocusOut={props._onfocusout}
			onFocusIn={props._onfocusin}
			onClick={props._onclick}
			onMouseDown={props._onmousedown}
			onMouseUp={props._onmouseup}
			onKeyDown={props._onkeydown}
			onKeyUp={props._onkeyup}
			onTouchStart={props._ontouchstart}
			onTouchEnd={props._ontouchend}
			tabindex={props.tabIndexValue}
			aria-expanded={props.accessibilityAttributes.expanded}
			aria-controls={props.accessibilityAttributes.controls}
			aria-haspopup={props._hasPopup}
			aria-label={props.ariaLabelText}
			aria-describedby={props.ariaDescribedbyText}
			title={props.buttonTitle}
			part="button"
			role={props.effectiveAccRole}
		>
			{ props.icon &&
				<Icon
					class="ui5-button-icon"
					name={props.icon}
					mode={props.iconMode}
					part="icon"
					showTooltip={props.showIconTooltip}
				></Icon>
			}

			<span id="{_id}-content" class="ui5-button-text">
				<bdi>
					<slot></slot>
				</bdi>
			</span>

			{props.endIcon &&
				<Icon
					class="ui5-button-end-icon"
					name={props.endIcon}
					mode={props.endIconMode}
					part="endIcon"
				></Icon>
			}

			{props.hasButtonType &&
				<span id="ui5-button-hiddenText-type" aria-hidden="true" class="ui5-hidden-text">{props.buttonTypeText}</span>
			}
		</button>
	</>);
};
