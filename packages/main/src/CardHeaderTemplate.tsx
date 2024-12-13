import type CardHeader from "./CardHeader.js";
import { isFirefox } from "@ui5/webcomponents-base/dist/Device.js";

export default function CardHeaderTemplate(this: CardHeader) {
	return (
		<div
			id={`${this._id}--header`}
			class={{
				"ui5-card-header": true,
				"ui5-card-header--interactive": this.interactive,
				"ui5-card-header--active": this.interactive && this._headerActive,
				"ui5-card-header-ff": isFirefox(),
			}}
			part="root"
			role="group"
			aria-roledescription={this.ariaRoleDescription}
			onClick={this._click}
			onKeyDown={this._keydown}
			onKeyUp={this._keyup}
		>
			<div
				class="ui5-card-header-focusable-element"
				aria-labelledby={this.ariaLabelledBy}
				role={this.ariaRoleFocusableElement}
				data-sap-focus-ref
				tabindex={0}
			>
				{this.hasAvatar &&
					<div id={`${this._id}-avatar`} class="ui5-card-header-avatar" aria-label={this.ariaCardAvatarLabel}>
						<slot name="avatar"></slot>
					</div>
				}

				<div class="ui5-card-header-text">
					<div class="ui5-card-header-first-line">
						{this.titleText &&
							<div
								id={`${this._id}-title`}
								class="ui5-card-header-title"
								part="title"
								role="heading"
								aria-level={3}
							>{this.titleText}</div>
						}

						{this.additionalText &&
							<div class="ui5-card-header-additionalText">
								<span id={`${this._id}-additionalText`} part="additional-text" dir="auto">{this.additionalText}</span>
							</div>
						}
					</div>

					{this.subtitleText &&
						<div id={`${this._id}-subtitle`} class="ui5-card-header-subtitle" part="subtitle">{this.subtitleText}</div>
					}
				</div>
			</div>

			{this.hasAction &&
				<div
					class="ui5-card-header-action"
					onFocusIn={this._actionsFocusin}
					onFocusOut={this._actionsFocusout}
				>
					<slot name="action"></slot>
				</div>
			}
		</div>
	);
}
