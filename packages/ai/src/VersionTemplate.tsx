import type Version from "./Version.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

export default function VersionTemplate(this: Version) {
	return <>
		{
			<div id="version-history">
				<Button
					design="Transparent"
					icon="navigation-left-arrow"
					title="Previous Version (Shift+Ctrl+Z)"
					accessibleName="Previous Version"
					aria-roledescription="button"
					aria-haspopup="false"
					aria-keyshortcut="Shift+Ctrl+Z"
					disabled={this.currentStep <= 1}
					onClick={this._handlePreviousVersionClick}
				></Button>
				<Label>
					{this.currentStep} / {this.totalSteps}
				</Label>
				<Button
					design="Transparent"
					icon="navigation-right-arrow"
					title="Next Version (Shift+Ctrl+Y)"
					accessibleName="Next Version"
					aria-roledescription="button"
					aria-haspopup="false"
					aria-keyshortcut="Shift+Ctrl+Y"
					disabled={this.currentStep === this.totalSteps}
					onClick={this._handleNextVersionClick}
				></Button>
			</div>
		}
	</>;
}
