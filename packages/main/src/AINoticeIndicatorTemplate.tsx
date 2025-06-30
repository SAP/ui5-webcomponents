import type AINoticeIndicator from "./AINoticeIndicator.js";
import Label from "./Label.js";
import Link from "./Link.js";
import Button from "./Button.js";
import AINoticeIndicatorDisplayMode from "./types/AINoticeIndicatorDisplayMode.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	const showIconButton =
		this.displayMode === AINoticeIndicatorDisplayMode.Emphasized ||
		this.displayMode === AINoticeIndicatorDisplayMode.IconOnly ||
		(!this.attributionText && !this.verificationText);

	return (
		<div class="ui5-ai-notice-indicator">
			{showIconButton &&
				<Button
					ref={el => { this._popoverAnchor = el as Button; }}
					icon="ai"
					disabled={!this.enabled}
					class="ui5-ai-notice-indicator-icon-button"
					onClick={this._handlePopoverToggleClick}>
				</Button>
			}
			{this.displayMode !== AINoticeIndicatorDisplayMode.IconOnly &&
				(<>
					<Link
						ref={el => { this._popoverAnchor = el as Link; }}
						onClick={this._handlePopoverToggleClick}
						disabled={!this.enabled}
						icon={this.showIcon ? "ai" : ""}>
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
