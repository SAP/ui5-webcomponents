import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ProductSwitchItemTemplate from "./generated/templates/ProductSwitchItemTemplate.lit.js";
import type { IProductSwitchItem } from "./ProductSwitch.js";

// Styles
import ProductSwitchItemCss from "./generated/themes/ProductSwitchItem.css.js";

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-product-switch-item</code> web component represents the items displayed in the
 * <code>ui5-product-switch</code> web component.
 * <br><br>
 * <b>Note:</b> <code>ui5-product-switch-item</code> is not supported when used outside of <code>ui5-product-switch</code>.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-product-switch</code> provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * <ul>
 * <li>[SPACE/ENTER/RETURN] - Trigger <code>ui5-click</code> event</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IProductSwitchItem}
 * @since 1.0.0-rc.5
 */
@customElement({
	tag: "ui5-product-switch-item",
	renderer: litRender,
	styles: ProductSwitchItemCss,
	template: ProductSwitchItemTemplate,
	dependencies: [Icon],
})
/**
 * Fired when the <code>ui5-product-switch-item</code> is activated either with a
 * click/tap or by using the Enter or Space key.
 *
 * @public
 */
@event("click")
@event("_focused")
class ProductSwitchItem extends UI5Element implements IProductSwitchItem {
	constructor() {
		super();

		this._deactivate = () => {
			if (this.active) {
				this.active = false;
			}
		};
	}

	/**
	 * Defines the title of the component.
	 * @default ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the subtitle of the component.
	 * @default ""
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	subtitleText!: string;

	/**
	 * Defines the icon to be displayed as a graphical element within the component.
	 * <br><br>
	 * Example:
	 * <br>
	 * <pre>ui5-product-switch-item icon="palette"</pre>
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines a target where the <code>targetSrc</code> content must be open.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>_self</code></li>
	 * <li><code>_top</code></li>
	 * <li><code>_blank</code></li>
	 * <li><code>_parent</code></li>
	 * <li><code>_search</code></li>
	 * </ul>
	 * @default "_self"
	 * @public
	 */
	@property({ defaultValue: "_self" })
	target!: string;

	/**
	 * Defines the component target URI. Supports standard hyperlink behavior.
	 * @default ""
	 * @public
	 */
	@property()
	targetSrc!: string;

	/**
	 * Used to switch the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	private active!: boolean;

	/**
	 * Indicates whether the element is focused.
	 * @private
	 */
	@property({ type: Boolean })
	private focused!: boolean;

	/**
	 * Used to set the selected state of the component. Only one selected in a sequence.
	 * <b>Note:</b> Set by the <code>ProductSwitch</code>
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the component tabindex.
	 */
	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	_deactivate: () => void;

	onEnterDOM() {
		document.addEventListener("mouseup", this._deactivate);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._deactivate);
	}

	_onmousedown() {
		this.active = true;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.active = true;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._fireItemClick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.active = false;
		}

		if (isSpace(e)) {
			if (isSpaceShift(e)) {
				e.stopPropagation();
			}
			this._fireItemClick();
		}
	}

	_onfocusout() {
		this.active = false;
		this.focused = false;
	}

	_onfocusin(e: FocusEvent) {
		this.focused = true;

		this.fireEvent("_focused", e);
	}

	_fireItemClick() {
		this.fireEvent("click", { item: this });
	}
}

ProductSwitchItem.define();

export default ProductSwitchItem;
