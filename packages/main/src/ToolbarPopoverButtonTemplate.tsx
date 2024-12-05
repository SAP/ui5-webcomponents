import type ToolbarButton from "./ToolbarButton.js";
import Button from "./Button.js";

export default function (this: ToolbarButton ) {
	return (
		<Button
			icon={this.icon}
			endIcon={this.endIcon}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			accessibilityAttributes={this.accessibilityAttributes}
			tooltip={this.tooltip}
			design={this.design}
			disabled={this.disabled}
			hidden={this.hidden}
			class="ui5-tb-popover-button ui5-tb-popover-item"
			data-ui5-external-action-item-id={this._id}
			data-ui5-stable={this.stableDomRef}
		>
			{this.text}
		</Button>
	);
};

