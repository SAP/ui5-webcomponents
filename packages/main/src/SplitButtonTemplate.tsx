import type SplitButton from "./SplitButton.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import Button from "./Button.js";

export default function SplitButtonTemplate(this: SplitButton) {
	return (
		<div
			role={this._hideArrowButton ? "button" : "group"}
			class="ui5-split-button-root"
			tabindex={this._tabIndex}
			aria-labelledby={`${this._id}-invisibleTextDefault ${this._id}-invisibleText`}
			aria-haspopup={this.accInfo?.root?.accessibilityAttributes?.hasPopup}
			aria-roledescription={this.accInfo?.root?.accessibilityAttributes?.ariaRoleDescription}
			onFocusOut={this._onFocusOut}
			onKeyDown={this._onKeyDown}
			onKeyUp={this._onKeyUp}
		>
			<Button
				class="ui5-split-text-button"
				design={this.design}
				icon={this.icon}
				endIcon={this._endIcon}
				tabindex={-1}
				disabled={this.disabled}
				active={this._textButtonActive}
				exportparts="icon,endIcon,button"
				onClick={this._handleMouseClick}
				onTouchStart={this.handleTouchStart}
				onMouseDown={this.handleTouchStart}
				onMouseUp={this._textButtonRelease}
				onFocusIn={this._onInnerButtonFocusIn}
				onFocusOut={this._onFocusOut}
				tooltip={this.accInfo?.root?.accessibilityAttributes?.title}
			>
				{this.isTextButton && <slot></slot> }
			</Button>

			{!this._hideArrowButton && (
				<>
					<Button
						class="ui5-split-arrow-button"
						design={this.design}
						icon={slimArrowDown}
						tabindex={-1}
						tooltip={this.accInfo.arrowButton.title}
						accessibilityAttributes={this.accInfo.arrowButton.accessibilityAttributes}
						disabled={this.disabled}
						active={this.effectiveActiveArrowButton}
						part="arrowButton"
						onClick={this._handleArrowButtonAction}
						onMouseDown={this._arrowButtonPress}
						onMouseUp={this._arrowButtonRelease}
						onFocusIn={this._onInnerButtonFocusIn}
						onActiveStateChange={this._onArrowButtonActiveStateChange}
					>
					</Button>
					<span id={`${this._id}-invisibleText`} class="ui5-hidden-text">{this.accInfo.root.description} {this.accInfo.root.keyboardHint} {this.accessibleName}</span>
					<span id={`${this._id}-invisibleTextDefault`} class="ui5-hidden-text">{this.textButtonAccText}</span>
				</>
			)}
		</div>
	);
}
