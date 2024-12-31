import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import type SideNavigationGroup from "./SideNavigationGroup.js";

export default function SideNavigationGroupTemplate(this: SideNavigationGroup) {
	if (this.sideNavCollapsed) {
		return (<>
			<div class={`ui5-sn-item-separator ${this.belowGroupClassName}`}></div>
			<slot></slot>
			<div class="ui5-sn-item-separator"></div>
		</>);
	}

	return TreeItemTemplate.call(this);
}

function TreeItemTemplate(this: SideNavigationGroup) {
	return (
		<li id={this._id}
			class={`ui5-sn-list-li ${this.belowGroupClassName}`}
			role="none"
		>
			<div class="ui5-sn-item-separator"></div>
			<div class={`ui5-sn-item ui5-sn-item-group ${this._classes}`}
				role="treeitem"
				data-sap-focus-ref
				onKeyDown={this._onkeydown}
				onClick={this._onclick}
				onFocusIn={this._onfocusin}
				tabIndex={this.effectiveTabIndex ? parseInt(this.effectiveTabIndex) : undefined}
				aria-expanded={this._expanded}
				aria-description={this.accDescription}
				title={this._tooltip}
				aria-owns={this._groupId}
			>
				<div class="ui5-sn-item-text">{this.text}</div>
				{!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						name={this.expanded ? navDownArrow : navRightArrow}
					/>
				}
			</div>
			{!!this.items.length &&
				<ul id={this._groupId}
					class="ui5-sn-item-ul"
					role="group"
				>
					<slot></slot>
				</ul>
			}
			<div class="ui5-sn-item-separator"></div>
		</li>
	);
}
