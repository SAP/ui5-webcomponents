import NavigationMenu from "./NavigationMenu.js";
import NavigationMenuItem from "./NavigationMenuItem.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import SideNavigation from "./SideNavigation.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";

export default function SideNavigationTemplate(this: SideNavigation) {
	return (<>
		<NavigationMenu
			id={`${this._id}-side-navigation-overflow-menu`}
			onBeforeOpen={this._onBeforeMenuOpen}
			onBeforeClose={this._onBeforeMenuClose}
			onui5-item-click={this.handleOverflowItemClick} // TOFIX
			class="ui5-side-navigation-popover ui5-side-navigation-overflow-menu"
		>
			{this._menuPopoverItems.map(item =>
				<NavigationMenuItem
					accessibilityAttributes={item.accessibilityAttributes}
					text={item.text}
					icon={item.icon}
					disabled={item.disabled}
					href={item.href}
					target={item.target}
					title={item.title}
					ref={this.captureRef.bind(item)}
				>
					{item.items.map(subItem =>
						<NavigationMenuItem
							accessibilityAttributes={subItem.accessibilityAttributes}
							text={subItem.text}
							icon={subItem.icon}
							disabled={subItem.disabled}
							ref={this.captureRef.bind(subItem)}
							href={subItem.href}
							target={subItem.target}
							title={subItem.title}
						/>
					)}
				</NavigationMenuItem>
			)}
		</NavigationMenu>
		<ResponsivePopover
			verticalAlign="Top"
			class="ui5-side-navigation-popover"
			accessibleNameRef={`${this._id}-sideNavigationPopoverText`}
			onOpen={this._onAfterPopoverOpen}
			onBeforeOpen={this._onBeforePopoverOpen}
			onBeforeClose={this._onBeforePopoverClose}
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
						accessibilityAttributes={this._popoverContents.item.accessibilityAttributes}
						text={this._popoverContents.item.text}
						tooltip={this._popoverContents.item._tooltip}
						href={this._popoverContents.item._href}
						target={this._popoverContents.item._target}
						design={this._popoverContents.item.design}
						disabled={this._popoverContents.item.disabled}
						expanded={true}
						_fixed={true}
						selected={this._popoverContents.item.selected}
						unselectable={this._popoverContents.item.unselectable}
						onui5-click={this.handlePopupItemClick}
						ref={this.captureRef.bind(this._popoverContents.item)}
					>
						{this._popoverContents.subItems.map(item =>
							<SideNavigationSubItem
								accessibilityAttributes={item.accessibilityAttributes}
								text={item.text}
								tooltip={item._tooltip}
								href={item._href}
								target={item._target}
								design={item.design}
								disabled={item.disabled}
								selected={item.selected}
								unselectable={item.unselectable}
								onui5-click={this.handlePopupItemClick}
								ref={this.captureRef.bind(item)}
							/>
						)}
					</SideNavigationItem>
				</SideNavigation>
			</>}
		</ResponsivePopover>
	</>);
}
