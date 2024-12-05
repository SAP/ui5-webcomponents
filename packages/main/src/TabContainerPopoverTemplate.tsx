import type TabContainer from "./TabContainer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import type Tab from "./Tab.js";

export default function (this: TabContainer) {
	return (
		<ResponsivePopover
			id={ `${this._id}-overflowMenu` }
			horizontalAlign="End"
			placement="Bottom"
			contentOnlyOnDesktop={true}
			hideArrow
			_hideHeader={true}
			class="ui5-tab-container-responsive-popover"
			onDragStart={this._onDragStart}
		>
			<List
				selectionMode="Single"
				separators="None"
				onItemClick={this._onOverflowListItemClick}
				onMoveOver={this._onPopoverListMoveOver}
				onMove={this._onPopoverListMove}
				onKeyDown={this._onPopoverListKeyDown}
			>
				{this._popoverItemsFlat.map(item =>
					(item as Tab).overflowPresentation
				)}
			</List>
			<div slot="footer" class="ui5-responsive-popover-footer">
				<ui5-button
					design="Transparent"
					onClick={this._closePopover}
				>{this.popoverCancelButtonText}</ui5-button>
			</div>
		</ResponsivePopover>
	);
}
