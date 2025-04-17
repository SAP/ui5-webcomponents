import Button from "./Button.js";
import type Toolbar from "./Toolbar.js";
import toolbarPopoverTemplate from "./ToolbarPopoverTemplate.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";

export default function ToolbarTemplate(this: Toolbar) {
	return (<>
		<div
			aria-live="polite"
			class={{
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
			}}
			role={this.accInfo.root.role}
			aria-label={this.accInfo.root.accessibleName}
		>
			{this.standardItems.map(item => (
				item.toolbarTemplate.call(item.context)
			))}

			<Button
				aria-hidden={this.hideOverflowButton}
				icon={overflowIcon}
				design="Transparent"
				onClick={this.toggleOverflow}
				class={{
					"ui5-tb-item": true,
					"ui5-tb-overflow-btn": true,
					"ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
				}}
				tooltip={this.accInfo.overflowButton.tooltip}
				accessibleName={this.accInfo.overflowButton.accessibleName}
				accessibilityAttributes={this.accInfo.overflowButton.accessibilityAttributes}
			/>
		</div>

		{toolbarPopoverTemplate.call(this)}
	</>);
}
