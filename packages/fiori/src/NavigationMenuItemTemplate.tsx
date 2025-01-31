import type NavigationMenuItem from "./NavigationMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import type { MenuItemHooks } from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import arrowRightIcon from "@ui5/webcomponents-icons/dist/arrow-right.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

const predefinedHooks: Partial<MenuItemHooks> = {
	listItemContent,
	iconBegin,
	iconEnd,
	listItemPostContent: () => { },
};

export default function NavigationMenuItemTemplate(this: NavigationMenuItem, hooks?: Partial<MenuItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks, };

	return <>
		{
			this._href ? (
				<a role="treeitem"
					class="ui5-navmenu-item-link"
					href={this.href}
					target={this.target}
				>
					{MenuItemTemplate.call(this, currentHooks)}
				</a>
			) : MenuItemTemplate.call(this, currentHooks)
		}

		{listItemPostContent.call(this)}
	</>;
}

function listItemContent(this: NavigationMenuItem) {
	return <>{this.text}</>;
}

function iconBegin(this: NavigationMenuItem) {
	if (this.hasIcon) {
		return <Icon part="icon"
			class="ui5-li-icon"
			name={this.icon}
		/>;
	}

	if (this._siblingsWithIcon) {
		return <div class="ui5-menu-item-dummy-icon"></div>;
	}
}

function iconEnd(this: NavigationMenuItem) {
	if (this.hasSubmenu) {
		return <Icon
			part="icon"
			name={slimArrowRightIcon}
			class="ui5-menu-item-icon-end"
		/>;
	}

	if (this.href) {
		return <Icon
			class="ui5-sn-item-external-link-icon"
			name={arrowRightIcon}
		/>;
	}
}

function listItemPostContent(this: NavigationMenuItem) {
	return this.hasSubmenu && <ResponsivePopover
		id={`${this._id}-navigation-menu-rp`}
		class="ui5-menu-rp ui5-navigation-menu ui5-menu-rp-sub-menu"
		verticalAlign="Center"
		preventInitialFocus
		preventFocusRestore
		accessibleNameRef={`${this._id}-navigationMenuPopoverText`}
		onBeforeOpen={this._beforePopoverOpen}
		onOpen={this._afterPopoverOpen}
		onBeforeClose={this._beforePopoverClose}
		onClose={this._afterPopoverClose}
	>
		<span id={`${this._id}-navigationMenuPopoverText`} class="ui5-hidden-text">{this.accSideNavigationPopoverHiddenText}</span>

		{this.isPhone && (
			<div slot="header" class="ui5-menu-dialog-header">
				{this.isSubMenuOpen && (
					<Button
						icon={navBackIcon}
						class="ui5-menu-back-button"
						design="Transparent"
						aria-label={this.labelBack}
						onClick={this._close}
					/>
				)}

				<div class="ui5-menu-dialog-title">
					<div>
						{this.menuHeaderTextPhone}
					</div>
				</div>

				<Button
					icon={declineIcon}
					design="Transparent"
					aria-label={this.labelClose}
					onClick={this._closeAll}
				/>
			</div>
		)}

		<div id={`${this._id}-menu-main`} class="ui5-navigation-menu-main">
			{this.items.length ? (
				<List
					accessibleRole="Tree"
					id={`${this.id}-menu-list`}
					selectionMode="None"
					loading={this.loading}
					loadingDelay={this.loadingDelay}
					separators="None"
					// handles event from slotted children
					onui5-close-menu={this._close}
				>
					<slot></slot>
				</List>
			) : (
				this.loading && (
					<BusyIndicator
						id={`${this._id}-menu-busy-indicator`}
						delay={this.loadingDelay}
						class="ui5-menu-busy-indicator"
						active={true}
					/>
				)
			)}
		</div>

	</ResponsivePopover >;
}
