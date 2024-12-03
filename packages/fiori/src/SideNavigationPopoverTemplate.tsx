import NavigationMenu from "@ui5/webcomponents/dist/NavigationMenu.js"
import NavigationMenuItem from "@ui5/webcomponents/dist/NavigationMenuItem.js"
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js"
import SideNavigation from "./SideNavigation.js"
import SideNavigationItem from "./SideNavigationItem.js"
import SideNavigationSubItem from "./SideNavigationSubItem.js"

export default function(this: SideNavigation) {
	return (<>
		<NavigationMenu
			id={`${this._id}-side-navigation-overflow-menu`}
			onui5-before-open={this._onBeforeMenuOpen}
			onui5-before-close={this._onBeforeMenuClose}
			onui5-item-click={this.handleOverflowItemClick}
			class="ui5-side-navigation-popover ui5-side-navigation-overflow-menu"
		>
			{this._menuPopoverItems.map(item =>
				<NavigationMenuItem
					text={item.text}
					icon={item.icon}
					disabled={item.disabled}
					// expanded={true}
					href={item.href}
					target={item.target}
					title={item.title}
					ref={this.captureRef.bind(item)}
				>
						{item.items.map(subItem =>
							<NavigationMenuItem
								text={subItem.text}
								icon={subItem.icon}
								disabled={subItem.disabled}
								ref={this.captureRef.bind(subItem)}
								// expanded={true}
								href={subItem.href}
								target={subItem.target}
								title={subItem.title}
							></NavigationMenuItem>
						)}
				</NavigationMenuItem>
			)}
		</NavigationMenu>
		<ResponsivePopover
			verticalAlign="Top"
			class="ui5-side-navigation-popover"
			accessibleNameRef={`${this._id}-sideNavigationPopoverText`}
			onui5-open={this._onAfterPopoverOpen}
			onui5-before-open={this._onBeforePopoverOpen}
			onui5-before-close={this._onBeforePopoverClose}
		>
			{this._popoverContents && <>
				<span id={`${this._id}-sideNavigationPopoverText`}
					class="ui5-hidden-text"
				>{this.accSideNavigationPopoverHiddenText}</span>
				<SideNavigation
					inPopover={true}
					class="ui5-side-navigation-in-popover"
				>
					<SideNavigationItem
						text={this._popoverContents.item.text}
						tooltip={this._popoverContents.item._tooltip}
						href={this._popoverContents.item._href}
						target={this._popoverContents.item._target}
						disabled={this._popoverContents.item.disabled}
						// expanded={true}
						_fixed={true}
						selected={this._popoverContents.item.selected}
						onui5-click={this.handlePopupItemClick}
						ref={this.captureRef.bind(this._popoverContents.item)}
					>
					{this._popoverContents.subItems.map(item =>
						<SideNavigationSubItem
							text={item.text}
							tooltip={item._tooltip}
							href={item._href}
							target={item._target}
							disabled={item.disabled}
							selected={item.selected}
							onui5-click={this.handlePopupItemClick}
							ref={this.captureRef.bind(item)}
						></SideNavigationSubItem>
					)}
					</SideNavigationItem>
				</SideNavigation>
			</>}
		</ResponsivePopover>
	</>);
};
