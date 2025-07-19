import Icon from "@ui5/webcomponents/dist/Icon.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationItemBaseTemplate from "./SideNavigationItemBaseTemplate.js";

export default function SideNavigationSubItemTemplate(this: SideNavigationSubItem) {
	const EffectiveTag = this._effectiveTag;

	return (
		<li id={this._id} class="ui5-sn-list-li" role="none">
			{SideNavigationItemBaseTemplate.call(this, EffectiveTag, itemContent, this.templateAttributes)}
		</li>
	);

	function itemContent(this: SideNavigationSubItem) {
		return (
			<>
				{this.icon &&
					<Icon class="ui5-sn-item-icon" name={this.icon}/>
				}
				<div class="ui5-sn-item-text">{this.text}</div>
				{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						  name={arrowRight}
					/>
				}
			</>
		);
	}
}
