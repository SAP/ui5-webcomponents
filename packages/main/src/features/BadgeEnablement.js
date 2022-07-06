import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import Badge from "../Badge.js";
import Icon from "../Icon.js";

/**
 * A class to enable badge support for components.
 *
 * @class
 * @private
 * @author SAP SE
 */
class BadgeEnablement {
	constructor(component) {
		// The component that BadgeEnablement would plug into.
		this.component = component;

		// The ui5-badge instance.
		this.Badge = new Badge();

		/* Used for style scoping in Badge.css, for cases when the slotted ui5-icon should be styled.
		This is due to inability to expose a ::part for slotted elements and style them from e.g. Button.css.
		The string prefix CSS selector [attr^=value] should be used to ensure scoping suffix support.
		For example, to style ui5-avatar's badge icon, the selector used in Badge.css should be:
		:host([ui5-badge-enablement^="ui5-avatar"]) ::slotted([ui5-icon][slot="icon"]) { ... } */
		this.Badge.setAttribute("ui5-badge-enablement", this.component.localName);

		this.fnOnChange = this.onChange.bind(this);
		this.fnOnIconNameChange = this.onIconNameChange.bind(this);
		this.component.addEventListener("ui5-badge-enablement-change", this.fnOnChange);
		this.component.addEventListener("ui5-badge-enablement-icon-name-change", this.fnOnIconNameChange);
	}

	onChange(event) {
		this.removeChildNodes();
		this.Badge.append(event.detail);
	}

	onIconNameChange(event) {
		const iconName = event.detail;

		this.removeChildNodes();

		if (iconName) {
			const icon = new Icon();
			icon.name = iconName;
			icon.slot = "icon";
			this.Badge.append(icon);
		}
	}

	removeChildNodes() {
		const badge = this.Badge;

		while (badge.firstChild) {
			badge.removeChild(badge.firstChild);
		}
	}

	get shadowRoot() {
		return this.Badge.shadowRoot;
	}
}

registerFeature("BadgeEnablement", BadgeEnablement);
