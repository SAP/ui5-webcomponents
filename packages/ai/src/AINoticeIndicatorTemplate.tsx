import type AINoticeIndicator from "./AINoticeIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Text from "@ui5/webcomponents/dist/Text.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	this.getMode();
	
	return (
		<div
			class={{
				"ui5-ai-notice-indicator-root": true,
			}}>
			<div
				role="button"
				aria-haspopup="dialog"
				aria-expanded="true"
				aria-label="string">
				<Link
					id="toggle"
					class="ui5-ai-notice-indicator-toggle"
					accessibleRole="Button"
					onClick={this._handleToggleClick}
				>
					{(this.isEmphasized || this.isIconOnly) &&
						<Icon id="icon" name="ai" />
					}
					{!this.isIconOnly &&
						this._titleText
					}
				</Link>

				{!this.isShortened && !this.isIconOnly &&
					<Label>
						{this._verificationText}
					</Label>
				}
			</div>

			<ResponsivePopover
				open={this._expanded}
				opener="toggle"
				title={this._titleText}
				accessibleNameRef="popover-text"
				contentOnlyOnDesktop={true}
				_hideHeader={true}
				placement="Bottom"
				class="ui5-ai-notice-indicator-inner"
				onClose={this._handlePopoverClose}
				_role="dialog"
				_ariaLabel={this._titleText}
			>
				<div class="ui5-ai-notice-indicator-container">
					<Label class="ui5-ai-notice-indicator-title">{this._titleText}</Label>
					<Text id="popover-text" class="ui5-ai-notice-indicator-description">
						{this._popoverText}
					</Text>
					<div class="ui5-ai-notice-indicator-footer">
						<Button design="Transparent" class="ui5-ai-notice-indicator-close" onClick={this._handleCloseButtonClick}>
							{this._closeButtonText}
						</Button>
					</div>
				</div>
			</ResponsivePopover>
		</div>
	);
}
