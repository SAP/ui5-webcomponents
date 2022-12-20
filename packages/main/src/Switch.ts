import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import Icon from "./Icon.js";
import SwitchDesign from "./types/SwitchDesign.js";

// Template
import SwitchTemplate from "./generated/templates/SwitchTemplate.lit.js";

// Styles
import switchCss from "./generated/themes/Switch.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-switch</code> component is used for changing between binary states.
 * <br>
 * The component can display texts, that will be switched, based on the component state, via the <code>textOn</code> and <code>textOff</code> properties,
 * but texts longer than 3 letters will be cutted off.
 * <br>
 * However, users are able to customize the width of <code>ui5-switch</code> with pure CSS (<code>&lt;ui5-switch style="width: 200px"></code>), and set widths, depending on the texts they would use.
 * <br>
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * <h3>Keyboard Handling</h3>
 * The state can be changed by pressing the Space and Enter keys.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-switch</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>slider - Used to style the track, where the handle is being slid</li>
 * <li>text-on - Used to style the <code>textOn</code> property text</li>
 * <li>text-off - Used to style the <code>textOff</code> property text</li>
 * <li>handle - Used to style the handle of the switch</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Switch";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Switch
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-switch
 * @public
 * @since 0.8.0
 */
@customElement("ui5-switch")
@languageAware

/**
 * Fired when the component checked state changes.
 *
 * @public
 * @event sap.ui.webc.main.Switch#change
 */
@event("change")
class Switch extends UI5Element {
	/**
	 * Defines the component design.
	 * <br><br>
	 * <b>Note:</b> If <code>Graphical</code> type is set,
	 * positive and negative icons will replace the <code>textOn</code> and <code>textOff</code>.
	 *
	 * @public
	 * @type {sap.ui.webc.main.types.SwitchDesign}
	 * @name sap.ui.webc.main.Switch.prototype.design
	 * @defaultValue "Textual"
	 */
	@property({ type: SwitchDesign, defaultValue: SwitchDesign.Textual })
	design!: SwitchDesign;

	/**
	 * Defines if the component is checked.
	 * <br><br>
	 * <b>Note:</b> The property can be changed with user interaction,
	 * either by cliking the component, or by pressing the <code>Enter</code> or <code>Space</code> key.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Switch.prototype.checked
	 * @defaultvalue false
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property({ type: Boolean })
	checked!: boolean;

	/**
	 * Defines whether the component is disabled.
	 * <br><br>
	 * <b>Note:</b> A disabled component is noninteractive.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Switch.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean

	/**
	 * Defines the text, displayed when the component is checked.
	 *
	 * <br><br>
	 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * <b>Note:</b> This property will have no effect if the theme is set to <code>sap_horizon</code>.
	 * @type {string}
	 * @name sap.ui.webc.main.Switch.prototype.textOn
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	textOn!: string

	/**
	 * Defines the text, displayed when the component is not checked.
	 * <br><br>
	 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * <b>Note:</b> This property will have no effect if the theme is set to <code>sap_horizon</code>.
	 * @type {string}
	 * @name sap.ui.webc.main.Switch.prototype.textOff
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	textOff!: string

	/**
	 * Sets the accessible ARIA name of the component.
	 *
	 * <b>Note</b>: We recommend that you set an accessibleNameRef pointing to an external label or at least an <code>accessibleName</code>.
	 * Providing an <code>accessibleNameRef</code> or an <code>accessibleName</code> is mandatory in the cases when <code>textOn</code> and <code>textOff</code> properties aren't set.
	 * @type {string}
	 * @name sap.ui.webc.main.Switch.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * <b>Note</b>: We recommend that you set an accessibleNameRef pointing to an external label or at least an <code>accessibleName</code>.
	 * Providing an <code>accessibleNameRef</code> or an <code>accessibleName</code> is mandatory in the cases when <code>textOn</code> and <code>textOff</code> properties aren't set.
	 * @type {string}
	 * @name sap.ui.webc.main.Switch.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the tooltip of the component.
	 * <br>
	 * <b>Note:</b> If applicable an external label reference should always be the preferred option to provide context to the <code>ui5-switch</code> component over a tooltip.
	 * @type {string}
	 * @name sap.ui.webc.main.Switch.prototype.tooltip
	 * @defaultvalue: ""
	 * @public
	 * @since 1.9.0
	 */
	@property()
	tooltip!: string;

	static i18nBundle: I18nBundle;

	static get styles() {
		return switchCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SwitchTemplate;
	}

	get sapNextIcon() {
		return this.checked ? "accept" : "less";
	}

	_onclick() {
		this.toggle();
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this.toggle();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.toggle();
		}
	}

	toggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			this.fireEvent("change");
			// Angular two way data binding;
			this.fireEvent("value-changed");
		}
	}

	get graphical() {
		return this.design === SwitchDesign.Graphical;
	}

	get hasNoLabel() {
		return !(this.graphical || this.textOn || this.textOff);
	}

	get _textOn() {
		return this.graphical ? "" : this.textOn;
	}

	get _textOff() {
		return this.graphical ? "" : this.textOff;
	}

	get effectiveTabIndex() {
		return this.disabled ? undefined : "0";
	}

	get classes(): ClassMap {
		const hasLabel = this.graphical || this.textOn || this.textOff;

		return {
			main: {
				"ui5-switch-desktop": isDesktop(),
				"ui5-switch--disabled": this.disabled,
				"ui5-switch--checked": this.checked,
				"ui5-switch--semantic": this.graphical,
				"ui5-switch--no-label": !hasLabel,
			},
		};
	}

	get effectiveAriaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get accessibilityOnText() {
		return this._textOn;
	}

	get accessibilityOffText() {
		return this._textOff;
	}

	get hiddenText() {
		return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
	}

	get ariaLabelText() {
		return [getEffectiveAriaLabelText(this), this.hiddenText].join(" ").trim();
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		Switch.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Switch.define();

export default Switch;
