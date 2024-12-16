import List from "./List.js";
import Button from "./Button.js";
import BusyIndicator from "./BusyIndicator.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type NavigationMenu from "./NavigationMenu.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";

export default function NavigationMenuTemplate(this: NavigationMenu) {
	return (
		<ResponsivePopover
			id={`${this._id}-navigation-menu-rp`}
			class="ui5-menu-rp ui5-navigation-menu"
			verticalAlign="Center"
			opener={this.opener}
			open={this.open}
			preventInitialFocus={true}
			preventFocusRestore={true}
			accessibleNameRef={`${this._id}-navigationMenuPopoverText`}
			onBeforeOpen={this._beforePopoverOpen}
			onOpen={this._afterPopoverOpen}
			onBeforeClose={this._beforePopoverClose}
			onClose={this._afterPopoverClose}
		>
			<span id={`${this._id}-navigationMenuPopoverText`} class="ui5-hidden-text">{this.accSideNavigationPopoverHiddenText}</span>
			{this.isPhone &&
				<div slot="header" class="ui5-menu-dialog-header">
					<div class="ui5-menu-dialog-title">
						<div>{this.headerText}</div>
					</div>
					<Button
						icon={declineIcon}
						design="Transparent"
						aria-label={this.labelClose}
						onClick={this._close}
					>
					</Button>
				</div>
			}
			<div id={`${this._id}-menu-main`} class="ui5-navigation-menu-main">
				{this.items.length > 0 ?
					<List
						id={`${this._id}-menu-list`}
						accessibleRole="Tree"
						selectionMode="None"
						loading={this.loading}
						loadingDelay={this.loadingDelay}
						separators="None"
						onItemClick={this._itemClick}
						onKeyDown={this._itemKeyDown}
						// events bubbling from slotted items
						onui5-close-menu={this._close}
					>
						<slot></slot>
					</List>
					:
					this.loading &&
						<BusyIndicator
							id={`${this._id}-menu-busy-indicator`}
							active={true}
							delay={this.loadingDelay}
							class="ui5-menu-busy-indicator"
						></BusyIndicator>
				}
			</div>
		</ResponsivePopover>
	);
}
