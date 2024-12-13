import type { JsxTemplate } from "@ui5/webcomponents-base";
import type MenuItem from "./MenuItem.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import ListItemTemplate from "./ListItemTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

export type MenuItemHooks = ListItemHooks & {
	listItemPostContent: JsxTemplate,
}

const predefinedHooks: Partial<MenuItemHooks> = {
	listItemContent,
	iconBegin,
};

export default function MenuItemTemplate(this: MenuItem, hooks?: Partial<MenuItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return <>
		{ListItemTemplate.call(this, currentHooks)}

		{listItemPostContent.call(this)}
	</>;
}

function listItemContent(this: MenuItem) {
	return (<>
		{this.text && <div class="ui5-menu-item-text">{this.text}</div>}

		{rightContent.call(this)}

		{this.hasSubmenu && (
			<div class="ui5-menu-item-submenu-icon" >
				<Icon
					part="subicon"
					name={slimArrowRight}
					class="ui5-menu-item-icon-end"
				/>
			</div>
		)}
	</>);
}

function rightContent(this: MenuItem) {
	switch (true) {
	case this.hasSubmenu:
		return (
			<div class="ui5-menu-item-submenu-icon" >
				<Icon
					part="subicon"
					name={slimArrowRight}
					class="ui5-menu-item-icon-end"
				/>
			</div>
		);
	case this.hasEndContent:
		return <slot name="endContent"></slot>;
	case !!this.additionalText:
		return (
			<span
				part="additional-text"
				class="ui5-li-additional-text"
				aria-hidden={this._accInfo.ariaHidden}
			>
				{this.additionalText}
			</span>
		);
	}
}

function iconBegin(this: MenuItem) {
	if (this.hasIcon) {
		return <Icon class="ui5-li-icon" name={this.icon} />;
	}

	if (this._siblingsWithIcon) {
		return <div class="ui5-menu-item-dummy-icon"></div>;
	}
}

function listItemPostContent(this: MenuItem) {
	return this.hasSubmenu && <ResponsivePopover
		id={`${this._id}-menu-rp`}
		class="ui5-menu-rp .ui5-menu-rp-sub-menu"
		preventInitialFocus={true}
		preventFocusRestore={true}
		hideArrow={true}
		allowTargetOverlap={true}
		placement={this.placement}
		verticalAlign="Top"
		accessibleName={this.acessibleNameText}
		onBeforeOpen={this._beforePopoverOpen}
		onOpen={this._afterPopoverOpen}
		onBeforeClose={this._beforePopoverClose}
		onClose={this._afterPopoverClose}
	>
		{
			this.isPhone && (
				<>
					<div slot="header" class="ui5-menu-dialog-header" >
						<Button
							icon={navBackIcon}
							class="ui5-menu-back-button"
							design="Transparent"
							aria-label={this.labelBack}
							onClick={this._close}
						/>
						<div class="ui5-menu-dialog-title" >
							<div>
								{this.text}
							</div>
						</div>
						<Button
							icon={declineIcon}
							design="Transparent"
							aria-label={this.labelClose}
							onClick={this._closeAll}
						/>
					</div >
				</>
			)
		}

		<div id={`${this._id}-menu-main`}>
			{
				this.items.length ? (
					<List
						id={`${this._id}-menu-list`}
						selectionMode="None"
						separators="None"
						accessibleRole="Menu"
						loading={this.loading}
						loadingDelay={this.loadingDelay}
						// handles event from slotted children
						onui5-close-menu={this._close}
					>
						<slot></slot>
					</List>
				) : this.loading && <BusyIndicator
					id={`${this._id}-menu-busy-indicator`}
					delay={this.loadingDelay}
					class="ui5-menu-busy-indicator"
					active={true}
				/>
			}
		</div >
	</ResponsivePopover>;
}
