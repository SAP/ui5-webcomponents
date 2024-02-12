import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigation from "./SideNavigation.js";

/**
 * @class
 * A class to serve as a foundation
 * for the <code>SideNavigationItem</code> and <code>SideNavigationSubItem</code> classes.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
class SideNavigationItemBase extends UI5Element implements ITabbable {
	constructor() {
		super();

		// this.sideNavExpanded = true;
	}
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default ""
	 */
	@property()
	text!: string;

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 *
	 * @default false
	 * @public
	 * @since 1.19.0
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @default ""
	 * @private
	 * @since 1.0.0-rc.16
	 */
	@property()
	title!: string;

	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	// @property({ type: Boolean, noAttribute: true })
	// sideNavExpanded!: boolean;

	get _tooltip() {
		return this.title || this.text;
	}

	get classesArray() {
		const classes = [];

		if (this.disabled) {
			classes.push("ui5-sn-item-disabled");
		}

		return classes;
	}

	get _classes() {
		return this.classesArray.join(" ");
	}

	get _effectiveTabIndex() {
		if (this.disabled) {
			return undefined;
		}

		return this.forcedTabIndex;
	}

	get sideNavExpanded() {
		return !this.sideNavigation?.collapsed;
	}

	get sideNavigation() : SideNavigation | undefined {
		let parentElement = this.parentElement;

		while (parentElement) {
			if (parentElement.hasAttribute("ui5-side-navigation")) {
				return parentElement as SideNavigation;
			}

			parentElement = parentElement.parentElement;
		}
	}

	get isFixedItem() {
		return true;
	}
}

export default SideNavigationItemBase;
