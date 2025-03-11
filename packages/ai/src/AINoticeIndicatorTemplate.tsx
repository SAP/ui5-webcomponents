import type AINoticeIndicator from "./AINoticeIndicator.js";
import Button from "./Button.js";
import Icon from "../../main/src/Icon.js";
import Label from "@ui5/webcomponents/dist/Label";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Text from "@ui5/webcomponents/dist/Text.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	return (
		<div>
			<Button class="ui5-ai-notice-indicator-button">
                <Icon name="ai"/>
				Created with AI
			</Button>

            <Label class="ui5-ai-notice-indicator-label">
				Verify results before use.
			</Label>

			{this._maxCharactersExceeded && <>
				<span class="ui5-exp-text-ellipsis">{this._ellipsisText}</span>

				{this._usePopover &&
					<ResponsivePopover
						open={this._expanded}
						opener="toggle"
						accessibleNameRef="popover-text"
						contentOnlyOnDesktop={true}
						_hideHeader={true}
						class="ui5-exp-text-popover"
						onClose={this._handlePopoverClose}
					>
						<Text id="popover-text">Created with A</Text>
						<div
							slot="footer"
							class="ui5-exp-text-footer"
						>
							<Button
								design="Transparent"
								onClick={this._handleCloseButtonClick}
							>
								{this._closeButtonText}
							</Button>
						</div>
					</ResponsivePopover>
				}
			</>
			}
		</div>
	);
}
