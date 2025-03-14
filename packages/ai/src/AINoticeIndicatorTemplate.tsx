import type AINoticeIndicator from "./AINoticeIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Text from "@ui5/webcomponents/dist/Text.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	return (
		<div
			class={{
				"ui5-ai-notice-indicator-root": true,
			}}>
            <Icon name="ai"/>
			<Link
					id="toggle"
					class="ui5-ai-notice-indicator-toggle"
					accessibleRole="Button"
					onClick={this._handleToggleClick}
				>
					{this._titleText}
			</Link>

            <Label>
				{this._verificationText}
			</Label>

				{/* {this._usePopover && */}
					<ResponsivePopover
						open={this._expanded}
						opener="toggle"
						title={this._titleText}
						accessibleNameRef="popover-text"
						contentOnlyOnDesktop={true}
						_hideHeader={true}
						class="ui5-ai-notice-indicator-inner"
						onClose={this._handlePopoverClose}
					>
						<Text id="popover-text" class="ui5-ai-notice-indicator-description">sdfsdfsd</Text>
						<div
							slot="footer"
							class="ui5-ai-notice-indicator-footer"
						>
							<Button
								design="Transparent"
								onClick={this._handleCloseButtonClick}
							>
								{this._closeButtonText}
							</Button>
						</div>
					</ResponsivePopover>
				{/* }  */}
		</div>
	);
}
