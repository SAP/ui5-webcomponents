import Version from "./Version.js";
import type AiWritingAssistantToolbar from "./AiWritingAssistantToolbar.js";

import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";

export default function AiWritingAssistantToolbarTemplate(this: AiWritingAssistantToolbar) {
	const isMultiResults = this.assistantState === "MultipleResults";
	const isBusy = this.assistantState === "Loading";
	const isDefault = this.assistantState === "Default";

	return (
		<Toolbar
			accessibleName="AI Writing Assistant Toolbar"
			aria-roledescription="toolbar"
			class="ui5-ai-writing-assistant-footer-bar"
			style={{
				borderTop:
					!isDefault
						? "1px solid var(--sapPageFooter_BorderColor)"
						: "none",
			}}
		>
			{isMultiResults && (
				<Version
					currentStep={this.currentVersionIndex}
					totalSteps={this.totalVersions}
					onPreviousVersionClick={this.handlePreviousVersionClick}
					onNextVersionClick={this.handleNextVersionClick}
				/>
			)}

			{!isDefault && (
				<Label style={{ marginLeft: "0.5rem" }}>{this.actionText}</Label>
			)}

			<ToolbarSpacer />

			<Button
				id="ai-menu-btn"
				design="Transparent"
				icon={isBusy ? "stop" : "ai"}
				title="AI Writing Assistant (Shift + F4)"
				onClick={this._handleGenerateClick}
			/>
		</Toolbar>
	);
}
