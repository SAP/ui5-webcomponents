import type Toolbar from "./Toolbar.js";
import Popover from "./Popover.js";

export default function ToolbarPopoverTemplate(this: Toolbar) {
	return (
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
				"ui5-overflow-list": true,
				"ui5-overflow-list--alignleft": this.hasItemWithText,
			}}>
				{ this.overflowItems.map(item => (
					item.toolbarPopoverTemplate.call(item.context)
				))}
			</div>
		</Popover>
	);
}
