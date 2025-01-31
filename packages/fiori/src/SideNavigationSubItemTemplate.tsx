import Icon from "@ui5/webcomponents/dist/Icon.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";

export default function SideNavigationSubItemTemplate(this: SideNavigationSubItem) {
	if (this.sideNavCollapsed) {
		return <></>;
	}

	return (
		<li id={this._id} class="ui5-sn-list-li" role="none">
			{this._href ?
				<a class={`ui5-sn-item ui5-sn-item-level2 ${this._classes}`}
					role="treeitem"
					data-sap-focus-ref
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
					onFocusIn={this._onfocusin}
					tabIndex={this.effectiveTabIndex ? parseInt(this.effectiveTabIndex) : undefined}
					aria-current={this._ariaCurrent}
					aria-selected={this.selected}
					title={this._tooltip}
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
				</a>
				:
				<div class={`ui5-sn-item ui5-sn-item-level2 ${this._classes}`}
					role="treeitem"
					data-sap-focus-ref
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					onClick={this._onclick}
					onFocusIn={this._onfocusin}
					tabIndex={this.effectiveTabIndex ? parseInt(this.effectiveTabIndex) : undefined}
					aria-current={this._ariaCurrent}
					aria-haspopup={this.accessibilityAttributes?.hasPopup}
					aria-selected={this.selected}
					title={this._tooltip}
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
				</div>
			}
		</li>
	);
}
