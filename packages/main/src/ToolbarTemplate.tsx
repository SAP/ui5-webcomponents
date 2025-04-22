import Button from "./Button.js";
import type Toolbar from "./Toolbar.js";
import Popover from "./Popover.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";

export default function ToolbarTemplate(this: Toolbar) {
	return (<>
		<div
			class={{
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
			}}
			role={this.accInfo.root.role}
			aria-label={this.accInfo.root.accessibleName}
		>
			{this.standardItems.map(item => {
				if ("styles" in item.context) {
					return (
						<div class="ui5-tb-item" style={item.context.styles as string}>
							<slot name={item.context._individualSlot}></slot>
						</div>
					);
				}
				return (
					<div class="ui5-tb-item">
						<slot name={item.context._individualSlot}></slot>
					</div>
				);
			})}
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

		<Popover
			class="ui5-overflow-popover"
			placement="Bottom"
			horizontalAlign="End"
			onClose={this.onOverflowPopoverClosed}
			onOpen={this.onOverflowPopoverOpened}
			accessibleName={this.accInfo.popover.accessibleName}
			hideArrow={true}
		>
			<div class={{
				"ui5-overflow-list": true
			}}>
				{ this.overflowItems.map(item => (
					<div class="ui5-tb-popover-item"><slot name={item.context._individualSlot} class="ui5-tb-popover-item"></slot></div>
				))}
			</div>
		</Popover>
	</>);
}
