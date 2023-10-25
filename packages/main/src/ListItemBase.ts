import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

// Styles
import styles from "./generated/themes/ListItemBase.css.js";

/**
 * @class
 * A class to serve as a foundation
 * for the <code>ListItem</code> and <code>GroupHeaderListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ListItemBase
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
@customElement({
	renderer: litRender,
	styles,
})
@event("_focused")
@event("_forward-after")
@event("_forward-before")
class ListItemBase extends UI5Element implements ITabbable {
	/**
	 * Defines the selected state of the <code>ListItem</code>.
	 * @type {boolean}
	 * @name sap.ui.webc.main.ListItemBase.prototype.selected
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	* Defines if the list item should display its bottom border.
	* @private
	*/
	@property({ type: Boolean })
	hasBorder!: boolean;

	@property({ defaultValue: "-1", noAttribute: true })
	_tabIndex!: string;

	/**
	* Defines whether <code>ui5-li</code> is in disabled state.
	* <br><br>
	* <b>Note:</b> A disabled <code>ui5-li</code> is noninteractive.
	* @type {boolean}
	* @name sap.ui.webc.main.ListItemBase.prototype.disabled
	* @defaultvalue false
	* @protected
	* @since 1.0.0-rc.12
	*/
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Indicates if the element is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	_onfocusin(e: FocusEvent) {
		if (e.target !== this.getFocusDomRef()) {
			return;
		}

		this.focused = true;
		this.fireEvent("_focused", e);
	}

	_onfocusout() {
		this.focused = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isTabNext(e)) {
			return this._handleTabNext(e);
		}

		if (isTabPrevious(e)) {
			return this._handleTabPrevious(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {} // eslint-disable-line

	_handleTabNext(e: KeyboardEvent) {
		if (this.shouldForwardTabAfter()) {
			if (!this.fireEvent("_forward-after", {}, true)) {
				e.preventDefault();
			}
		}
	}

	_handleTabPrevious(e: KeyboardEvent) {
		const target = e.target as HTMLElement;

		if (this.shouldForwardTabBefore(target)) {
			this.fireEvent("_forward-before");
		}
	}

	/*
	* Determines if th current list item either has no tabbable content or
	* [TAB] is performed onto the last tabbale content item.
	*/
	shouldForwardTabAfter() {
		const aContent = getTabbableElements(this.getFocusDomRef()!);

		return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
	}

	/*
	* Determines if the current list item is target of [SHIFT+TAB].
	*/
	shouldForwardTabBefore(target: HTMLElement) {
		return this.getFocusDomRef() === target;
	}

	get classes(): ClassMap {
		return {
			main: {
				"ui5-li-root": true,
				"ui5-li--focusable": !this.disabled,
			},
		};
	}

	get _ariaDisabled() {
		return this.disabled ? true : undefined;
	}

	get hasConfigurableMode() {
		return false;
	}

	get _effectiveTabIndex() {
		if (this.disabled) {
			return -1;
		}
		if (this.selected) {
			return 0;
		}
		return this._tabIndex;
	}
}

export default ListItemBase;
