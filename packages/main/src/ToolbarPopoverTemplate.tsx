import clsx from "clsx";
import type Toolbar from "./Toolbar.js";
import Popover from "./Popover.js";

export default function(this: Toolbar) {
	return (
		<Popover
			class="ui5-overflow-popover"
			placement="Bottom"
			horizontal-align="End"
			onClose={this.onOverflowPopoverClosed}
			onOpen={this.onOverflowPopoverOpened}
			onBeforeOpen={(e) => {}}
			onExtra={(e) => {}}
			hide-arrow
		>
			<div class={
				clsx({
					"ui5-overflow-list": true,
					"ui5-overflow-list--alignleft": this.hasItemWithText,
				})
			}>
				{ this.overflowItems.map(item => (
					item.toolbarPopoverTemplate.call(item.context)
				))}
			</div>
		</Popover>
	);
};
