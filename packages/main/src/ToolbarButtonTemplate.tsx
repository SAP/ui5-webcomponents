import type ToolbarButton from "./ToolbarButton.js";
import Button from "./Button.js";

export default function ToolbarButtonTemplate(this: ToolbarButton) {
	return (
		<Button
			class="ui5-tb-button ui5-tb-item"
			id={this.id}
			style={{
				width: this.isInsideOverflowPopover ? "100%" : this.width,
				display: this.hidden ? "none" : this.isInsideOverflowPopover ? "block" : "inline-block",
			}}
			icon={this.icon}
			endIcon={this.endIcon}
			tooltip={this.tooltip}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			accessibilityAttributes={this.accessibilityAttributes}
			design={this.design}
			disabled={this.disabled}
			hidden={this.hidden}
			data-ui5-external-action-item-id={this._id}
			data-ui5-stable={this.stableDomRef}
			onClick={(...args) => this.onClick(...args)}
		>
			{this.text}
		</Button>
	);
}
