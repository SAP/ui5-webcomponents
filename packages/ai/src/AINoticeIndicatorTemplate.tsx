import type AINoticeIndicator from "./AINoticeIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Text from "@ui5/webcomponents/dist/Text.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	const linkId = this.isIconOnly ? "created-by-ai-button-link" : "created-by-ai-text-link";

	return (
		<>
			<div
				role="button"
				aria-haspopup="dialog"
				aria-expanded="true"
				aria-label="string">
				{this.isIconOnly ? 
					<Button id={linkId} icon="sap-icon://ai" design="Transparent" onClick={this._handleToggleClick}></Button> :
					<Link
						id={linkId}
						accessibleRole="Button"
						onClick={this._handleToggleClick}
						icon={this.isEmphasized ? "ai" : ""}
					>
						{this.attributionText}
					</Link>
				}

				<Label>
					{!this.isShortened && !this.isIconOnly && this.verificationText}
				</Label>
			</div>

			<ResponsivePopover
				opener={linkId}
				headerText={this.attributionText}
				placement="Bottom"
				accessibleName={this.attributionText}
			>
				<Text id="popover-text">
					{this._popoverText}
				</Text>
				<div slot="footer">
					<Button design="Transparent" onClick={this._handlePopoverClose}>
						{this._closeButtonText}
					</Button>
				</div>
			</ResponsivePopover>
		</>
	);
}
