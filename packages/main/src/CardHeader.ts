import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isFirefox } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CardHeaderTemplate from "./generated/templates/CardHeaderTemplate.lit.js";

import {
	AVATAR_TOOLTIP,
	ARIA_ROLEDESCRIPTION_CARD_HEADER,
	ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardHeaderCss from "./generated/themes/CardHeader.css.js";

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card-header</code> is a component, meant to be used as a header of the <code>ui5-card</code> component.
 * It displays valuable information, that can be defined with several properties, such as: <code>titleText</code>, <code>subtitleText</code>, <code>status</code>
 * and two slots: <code>avatar</code> and <code>action</code>.
 *
 * <h3>Keyboard handling</h3>
 * In case you enable <code>interactive</code> property, you can press the <code>ui5-card-header</code> by Space and Enter keys.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-card</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the root DOM element of the CardHeader</li>
 * <li>title - Used to style the title of the CardHeader</li>
 * <li>subtitle - Used to style the subtitle of the CardHeader</li>
 * <li>status - Used to style the status of the CardHeader</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CardHeader";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CardHeader
 * @implements sap.ui.webc.main.ICardHeader
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-card-header
 * @public
 * @since 1.0.0-rc.15
 */
@customElement({
	tag: "ui5-card-header",
	languageAware: true,
	renderer: litRender,
	template: CardHeaderTemplate,
	styles: cardHeaderCss,
})
/**
 * Fired when the component is activated by mouse/tap or by using the Enter or Space key.
 * <br><br>
 * <b>Note:</b> The event would be fired only if the <code>interactive</code> property is set to true.
 * @event sap.ui.webc.main.CardHeader#click
 * @public
 */
@event("click")
class CardHeader extends UI5Element {
	/**
	 * Defines the title text.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.CardHeader.prototype.titleText
	 * @public
	*/
	@property()
	titleText!: string;

	/**
	 * Defines the subtitle text.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.CardHeader.prototype.subtitleText
	 * @public
	*/
	@property()
	subtitleText!: string;

	/**
	 * Defines the status text.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.CardHeader.prototype.status
	 * @public
	*/
	@property()
	status!: string;

	/**
	 * Defines if the component would be interactive,
	 * e.g gets hover effect, gets focus outline and <code>click</code> event is fired, when pressed.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.CardHeader.prototype.interactive
	 * @public
	*/
	@property({ type: Boolean })
	interactive!: boolean;

	/**
	 * Define the <code>aria-level</code> attribute of the component
	 * <b>Note: </b> If the interactive property is set, <code>aria-level</code> attribute is not rendered at all.
	 * @private
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultValue 3
	*/
	@property({ validator: Integer, defaultValue: 3 })
	_ariaLevel!: number;

	@property({ type: Boolean, noAttribute: true })
	_headerActive!: boolean;

	/**
	 * Defines an avatar image, displayed in the left most part of the header.
	 * @type {HTMLElement[]}
	 * @slot
	 * @name sap.ui.webc.main.CardHeader.prototype.avatar
	 * @public
	*/
	@slot()
	avatar!: Array<HTMLElement>;

	/**
	 * Defines an action, displayed in the right most part of the header.
	 * @type {HTMLElement[]}
	 * @slot
	 * @name sap.ui.webc.main.CardHeader.prototype.action
	 * @public
	*/
	@slot()
	action!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;

	get classes() {
		return {
			root: {
				"ui5-card-header": true,
				"ui5-card-header--interactive": this.interactive,
				"ui5-card-header--active": this.interactive && this._headerActive,
				"ui5-card-header-ff": isFirefox(),
			},
		};
	}

	get _root() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-card-header")!;
	}

	get ariaRoleDescription() {
		return this.interactive ? CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
	}

	get ariaRoleFocusableElement() {
		return this.interactive ? "button" : null;
	}

	get ariaCardAvatarLabel() {
		return CardHeader.i18nBundle.getText(AVATAR_TOOLTIP);
	}

	get ariaLabelledBy() {
		const labels = [];

		if (this.titleText) {
			labels.push(`${this._id}-title`);
		}

		if (this.subtitleText) {
			labels.push(`${this._id}-subtitle`);
		}

		if (this.status) {
			labels.push(`${this._id}-status`);
		}

		if (this.hasAvatar) {
			labels.push(`${this._id}-avatar`);
		}

		return labels.length !== 0 ? labels.join(" ") : undefined;
	}

	get hasAvatar() {
		return !!this.avatar.length;
	}

	get hasAction() {
		return !!this.action.length;
	}

	static async onDefine() {
		CardHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_actionsFocusin() {
		this._root.classList.add("ui5-card-header-hide-focus");
	}

	_actionsFocusout() {
		this._root.classList.remove("ui5-card-header-hide-focus");
	}

	_click(e: MouseEvent) {
		// prevents the native browser "click" event from firing
		e.stopImmediatePropagation();

		if (this.interactive && this._root.contains(e.target as HTMLElement)) {
			this.fireEvent("click");
		}
	}

	_keydown(e: KeyboardEvent) {
		if (!this.interactive || !this._root.contains(e.target as HTMLElement)) {
			return;
		}

		const enter = isEnter(e);
		const space = isSpace(e);

		this._headerActive = enter || space;

		if (enter) {
			this.fireEvent("click");
			return;
		}

		if (space) {
			e.preventDefault();
		}
	}

	_keyup(e: KeyboardEvent) {
		if (!this.interactive || !this._root.contains(e.target as HTMLElement)) {
			return;
		}

		const space = isSpace(e);

		this._headerActive = false;

		if (space) {
			this.fireEvent("click");
		}
	}
}

CardHeader.define();

export default CardHeader;
