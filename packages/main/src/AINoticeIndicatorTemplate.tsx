import Button from "./Button.js";
import Link from "./Link.js";
import Label from "./Label.js";
import Icon from "./Icon.js";

import type AINoticeIndicator from "./AINoticeIndicator.js";

export default function AINoticeIndicatorTemplate(this: AINoticeIndicator) {
	const { mode, attributionTextValue, verificationTextValue } = this;

	const iconButton = (
		<Button design="Transparent">
			<Icon name="ai" />
		</Button>
	);

	const attributionLink = (
		<Link
			href="#"
			onClick={this._openRespPopover}
		>
			{attributionTextValue}
		</Link>
	);

	const verificationTextLabel = (
		<Label>
			{verificationTextValue}
		</Label>
	);

	return (
		<div class="ui5-ai-notice-indicator-root">
			{mode !== "Default" && mode !== "Shortened" && iconButton}
			{mode !== "IconOnly" && attributionLink}
			{mode !== "IconOnly" && mode !== "Shortened" && verificationTextLabel}
			<slot name="aiNoticePopover"></slot>
		</div>
	);
}
