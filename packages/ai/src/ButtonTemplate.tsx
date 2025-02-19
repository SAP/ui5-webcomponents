import Icon from "@ui5/webcomponents/dist/Icon.js";
import type Button from "./Button.js";

export default function ButtonTemplate(this: Button) {
	return (<div class="ui5-ai-button-inner">
		<div
			role={this._hideArrowButton ? "button" : "group"}
			class="ui5-split-button-root"
			tabindex={this._tabIndex}
			aria-labelledby={`${this._id}-invisibleTextDefault ${this._id}}-invisibleText`}
			onFocusOut={this._onFocusOut}
			onFocusIn={this._onFocusIn}
			onKeyDown={this._onKeyDown}
			onKeyUp={this._onKeyUp}
		>
			<div
				class="ui5-split-text-button ui5-button"
				design={this.design}
				icon={this._stateIcon}
				endIcon={this._stateEndIcon}
				tabindex={-1}
				disabled={this.disabled}
				onClick={this._onClick}
				onTouchStart={this.handleTouchStart}
				onMouseDown={this.handleTouchStart}
				onMouseUp={this._textButtonRelease}
				onFocusIn={this._onInnerButtonFocusIn}
				onFocusOut={this._onFocusOut}
			>
				<button
					type="button"
					class="ui5-button-root"
					disabled={this.disabled}
					data-sap-focus-ref
					aria-pressed={injectedProps?.ariaPressed}
					onFocusOut={this._onfocusouttextbutton}
					onClick={this._onclicktextbutton}
					onKeyDown={this._onkeydowntextbutton}
					onKeyUp={this._onkeyuptextbutton}
					onTouchEnd={this._ontouchendtextbutton}
					tabindex={this.tabIndexValue}
					aria-haspopup={this._hasPopup}
					aria-label={this.ariaLabelTextTextButton}
					aria-describedby={this.ariaDescribedbyText}
					aria-description={this.ariaDescriptionText}
					title={this.buttonTitle}
					role={this.effectiveAccRole}
				>
					{ this._stateIcon &&
						<Icon
							class="ui5-button-icon"
							name={this._stateIcon

							}
							mode="Decorative"
							showTooltip={this.showIconTooltip}
						/>
					}

					<span id={`${this._id}-content`} class="ui5-button-text">
						<bdi>
							{this._hasText && <slot name="text">{this._stateText}</slot> }
						</bdi>
					</span>

					{this._stateEndIcon &&
						<Icon
							class="ui5-button-end-icon"
							name={this._stateEndIcon}
							mode="Decorative"
						/>
					}

					{this.hasButtonType &&
						<span id="ui5-button-hiddenText-type" aria-hidden="true" class="ui5-hidden-text">{this.buttonTypeText}</span>
					}
				</button>
			<div/>

			{!this._hideArrowButton &&
				<div
					class="ui5-split-arrow-button ui5-button"
					design={this.design}
					icon="slim-arrow-down"
					tabindex={-1}
					tooltip={this.accInfo.arrowButton.title}
					accessibilityAttributes={this.accInfo.arrowButton.accessibilityAttributes}
					active={this.effectiveActiveArrowButton}
					onClick={this._onArrowClick}
					onMouseDown={this._arrowButtonPress}
					onMouseUp={this._arrowButtonRelease}
					onFocusIn={this._onInnerButtonFocusIn}
					onActiveStateChange={this._onArrowButtonActiveStateChange}
				>
					<button
						type="button"
						class="ui5-button-root"
						disabled={this.disabled}
						data-sap-focus-ref
						aria-pressed={injectedProps?.ariaPressed}
						onFocusOut={this._onfocusouttextbutton}
						onClick={this._onclicktextbutton}
						onKeyDown={this._onkeydowntextbutton}
						onKeyUp={this._onkeyuptextbutton}
						onTouchEnd={this._ontouchendtextbutton}
						tabindex={this.tabIndexValue}
						aria-haspopup={this._hasPopup}
						aria-label={this.ariaLabelTextTextButton}
						aria-describedby={this.ariaDescribedbyText}
						aria-description={this.ariaDescriptionText}
						title={this.buttonTitle}
						role={this.effectiveAccRole}
					>
						{ this._stateIcon &&
							<Icon
								class="slimArrowDown"
								name={this._stateIcon

								}
								mode="Decorative"
								showTooltip={this.showIconTooltip}
							/>
						}

						{this.hasButtonType &&
							<span id="ui5-button-hiddenText-type" aria-hidden="true" class="ui5-hidden-text">{this.buttonTypeText}</span>
						}
					</button>
			</div>
			}
			<span id={`${this._id}-invisibleText`} class="ui5-hidden-text">{this.accInfo.root.description} {this.accInfo.root.keyboardHint} {this.accessibleName}</span>
			<span id={`${this._id}-invisibleTextDefault`} class="ui5-hidden-text">{this.textButtonAccText}</span>
		</div>
	</div>
	</div>
	);
}
