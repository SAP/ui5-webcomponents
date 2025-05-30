import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type SideNavigationItem from "./SideNavigationItem.js";

export default function SideNavigationItemTemplate(this: SideNavigationItem) {
	if (this.sideNavCollapsed) {
		return MenuItemTemplate.call(this);
	}
	return TreeItemTemplate.call(this);
}

function MenuItemTemplate(this: SideNavigationItem) {
	return (<>
		{this._href ?
			<a id={this._id}
				class={`ui5-sn-item ui5-sn-item-level1 ${this._classes}`}
				role={this.ariaRole}
				data-sap-focus-ref
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onMouseEnter={this._onmouseenter}
				onMouseLeave={this._onmouseleave}
				tabIndex={this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined}
				aria-haspopup={this._ariaHasPopup}
				aria-checked={this._ariaChecked}
				title={this._tooltip}
				href={this._href}
				target={this._target}
			>
				<Icon class="ui5-sn-item-icon" name={this.icon}/>
				<div class="ui5-sn-item-text">{this.text}</div>
				{!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						name={navRightArrow}
					/>
				}
				{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						name={arrowRight}
					/>
				}
			</a>
			:
			<div id={this._id}
				class={`ui5-sn-item ui5-sn-item-level1 ${this._classes}`}
				role={this.ariaRole}
				data-sap-focus-ref
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onMouseEnter={this._onmouseenter}
				onMouseLeave={this._onmouseleave}
				tabIndex={this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined}
				aria-haspopup={this._ariaHasPopup}
				aria-checked={this._ariaChecked}
				title={this._tooltip}
				aria-label={this._ariaLabel}
			>
				<Icon class="ui5-sn-item-icon" name={this.icon}/>
				<div class="ui5-sn-item-text">{this.text}</div>
				{!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						name={navRightArrow}
					/>
				}
				{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						name={arrowRight}
					/>
				}
			</div>
		}
	</>);
}

function TreeItemTemplate(this: SideNavigationItem) {
	return (
		<li id={this._id} class="ui5-sn-list-li" role="none">
			{this._href ?
				<a class={`ui5-sn-item ui5-sn-item-level1 ${this._classes}`}
					role={this.ariaRole}
					data-sap-focus-ref
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
					onFocusIn={this._onfocusin}
					tabIndex={this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined}
					aria-expanded={this._expanded}
					aria-current={this._ariaCurrent}
					aria-selected={this.selected}
					title={this._tooltip}
					aria-owns={this._groupId}
					href={this._href}
					target={this._target}
				>
					{this.icon &&
					<Icon class="ui5-sn-item-icon" name={this.icon}/>
					}
					<div class="ui5-sn-item-text">{this.text}</div>
					{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						name={arrowRight}
					/>
					}
					{!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						name={this.expanded ? navDownArrow : navRightArrow}
						accessibleName={this._arrowTooltip}
						showTooltip={true}
						onClick={this._onToggleClick}
					/>
					}
				</a>
				:
				<div class={`ui5-sn-item ui5-sn-item-level1 ${this._classes}`}
					role={this.ariaRole}
					data-sap-focus-ref
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
					onFocusIn={this._onfocusin}
					tabIndex={this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined}
					aria-expanded={this._expanded}
					aria-current={this._ariaCurrent}
					aria-selected={this.selected}
					aria-haspopup={this.accessibilityAttributes?.hasPopup}
					title={this._tooltip}
					aria-owns={this._groupId}
				>
					{this.icon &&
					<Icon class="ui5-sn-item-icon" name={this.icon}/>
					}
					<div class="ui5-sn-item-text">{this.text}</div>
					{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						name={arrowRight}
					/>
					}
					{!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						name={this.expanded ? navDownArrow : navRightArrow}
						accessibleName={this._arrowTooltip}
						showTooltip={true}
						onClick={this._onToggleClick}
					/>
					}
				</div>
			}
			{!!this.items.length &&
			<ul id={this._groupId}
				class="ui5-sn-item-ul"
				aria-label={this.text}
				role="group"
			>
				<slot></slot>
			</ul>
			}
		</li>
	);
}
