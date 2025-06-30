import type AINoticeIndicator from "./AINoticeIndicator.js";
import Label from "./Label.js";
import Link from "./Link.js";
import Button from "./Button.js";
import AINoticeIndicatorDisplayMode from "./types/AINoticeIndicatorDisplayMode.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	return (
		<div class="ui5-ai-notice-indicator">
			{this._showIconButton &&
				<Button
					icon="ai"
					disabled={this.disabled}
					id="ui5-ai-notice-indicator-icon-button"
					onClick={this._onLinkPress}>
				</Button>
			}
			{this.displayMode !== AINoticeIndicatorDisplayMode.IconOnly &&
				(<>
					<Link
						onClick={this._onLinkPress}
						disabled={this.disabled}
						icon={this.showIcon ? "ai" : ""}
						id="ui5-ai-notice-indicator-link">
						{this.attributionText}
					</Link>
					{this.displayMode !== AINoticeIndicatorDisplayMode.Shortened &&
						<Label>
							{this.verificationText}
						</Label>
					}
				</>
				)}
			<slot></slot>
		</div>
	);
}
