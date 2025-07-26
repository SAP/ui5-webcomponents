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
					onClick={this._onLinkPress}>
				</Button>
			}
			{this.displayMode !== AINoticeIndicatorDisplayMode.IconOnly &&
                this.attributionText &&
				(<>
					<Link
						onClick={this._onLinkPress}
						disabled={this.disabled}
						icon={this.showIcon ? "ai" : ""}>
						{this.attributionText}
					</Link>
					{this.displayMode !== AINoticeIndicatorDisplayMode.Shortened &&
                        this.verificationText &&
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
