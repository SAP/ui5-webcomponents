import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type ShellBar from "./ShellBar.js";

export default function PopoversTemplate(this: ShellBar) {
	return (
		<>
			<Popover class="ui5-shellbar-menu-popover"
				hideArrow={true}
				placement="Bottom"
				preventInitialFocus={true}
				onBeforeOpen={this._menuPopoverBeforeOpen}
				onClose={this._menuPopoverAfterClose}
			>
				<List separators="None" selectionMode="Single" onSelectionChange={this._menuItemPress}>
					<slot name="menuItems"></slot>
				</List>
			</Popover>

			<Popover class="ui5-shellbar-overflow-popover"
				placement="Bottom"
				preventInitialFocus={true}
				horizontalAlign={this.popoverHorizontalAlign}
				hideArrow={true}
				onBeforeOpen={this._overflowPopoverBeforeOpen}
				onClose={this._overflowPopoverAfterClose}
			>
				<List separators="None" onItemClick={this._handleActionListClick}>
					{this._hiddenIcons.map((icon, index) => (
						<ListItemStandard
							key={index}
							data-count={icon.count}
							data-ui5-external-action-item-id={icon.refItemid}
							icon={icon.icon ? icon.icon : ""}
							type="Active"
							onui5-_press={icon.press}
							tooltip={icon.tooltip}
						>
							{icon.text}
						</ListItemStandard>
					))}
				</List>
			</Popover>
		</>
	);
}
