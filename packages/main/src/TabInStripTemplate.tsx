import type Tab from "./Tab.js";
import Button from "./Button.js";
import Icon from "./Icon.js";

function additionalText(this: Tab) {
	return (
		<span class={this.stripClasses.additionalTextClasses} id={ `${this._id}-additionalText` }>
			{this.additionalText}
		</span>
	);
}

export default function (this: Tab) {
	return (
		<div id={this._id}
			class={this.stripClasses.itemClasses}
			tabindex={ -1 }
			role="tab"
			aria-roledescription={this._roleDescription}
			aria-haspopup={this._ariaHasPopup}
			aria-posinset={this._forcedPosinset}
			aria-setsize={this._forcedSetsize}
			aria-controls="ui5-tc-content"
			aria-selected={this.effectiveSelected}
			aria-disabled={this.effectiveDisabled}
			aria-labelledby={this.ariaLabelledBy}
			draggable={this.movable}
			onDragStart={this._ondragstart}
			onDragEnd={this._ondragend}
			ref={this.captureRef}
		>
			{this.icon &&
				<div class="ui5-tab-strip-item-icon-outer">
					<Icon
						id={ `${this._id}-icon` }
						name={this.icon}
						class="ui5-tab-strip-item-icon"
					></Icon>
				</div>
			}

			{this._designDescription &&
				<div id={ `${this._id}-designDescription` }
					 class="ui5-tab-strip-design-description"
				>
					{this._designDescription}
				</div>
			}

			<div class="ui5-tab-strip-itemContent">
				{!this._isInline &&
					additionalText.call(this)
				}

				{this.text &&
					<span
						class="ui5-tab-strip-itemText"
						id={ `${this._id}-text` }
					>
						{this.semanticIconName && (
							<Icon class={this.semanticIconClasses} name={this.semanticIconName}></Icon>
						)}
						{this.displayText}
						{this.isSingleClickArea &&
							<span class="ui5-tab-single-click-icon">
								<Icon name="slim-arrow-down"></Icon>
							</span>
						}
					</span>
				}
			</div>

			{this.requiresExpandButton &&
				<>
					<div class="ui5-tab-expand-button-separator"></div>
					<div
						class="ui5-tab-expand-button"
					>
						<Button
							ref={this.captureButtonRef}
							icon="slim-arrow-down"
							design="Transparent"
							tabindex={ -1 }
							disabled={this.disabled}
							tooltip={this.expandButtonTitle}
							accessibilityAttributes={this.expandBtnAccessibilityAttributes}
						></Button>
					</div>
				</>
			}
		</div>
	);
}
