import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import BusyIndicatorSize from "./types/BusyIndicatorSize.js";
import BusyIndicatorTextPlacement from "./types/BusyIndicatorTextPlacement.js";
import Label from "./Label.js";

// Template
import BusyIndicatorTemplate from "./generated/templates/BusyIndicatorTemplate.lit.js";

import { BUSY_INDICATOR_TITLE } from "./generated/i18n/i18n-defaults.js";

// Styles
import busyIndicatorCss from "./generated/themes/BusyIndicator.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-busy-indicator` signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * ### Usage
 * For the `ui5-busy-indicator` you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 *
 * In order to show busy state over an HTML element, simply nest the HTML element in a `ui5-busy-indicator` instance.
 *
 * **Note:** Since `ui5-busy-indicator` has `display: inline-block;` by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set `display: block` to the busy indicator as well.
 *
 * #### When to use:
 *
 * - The user needs to be able to cancel the operation.
 * - Only part of the application or a particular component is affected.
 *
 * #### When not to use:
 *
 * - The operation takes less than one second.
 * - You need to block the screen and prevent the user from starting another activity.
 * - Do not show multiple busy indicators at once.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/BusyIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Determines the content over which the component will appear.
 * @since 0.12.0
 */
@customElement({
	tag: "ui5-busy-indicator",
	languageAware: true,
	styles: busyIndicatorCss,
	renderer: litRender,
	template: BusyIndicatorTemplate,
	dependencies: [Label],
})
class BusyIndicator extends UI5Element {
	/**
	 * Defines text to be displayed below the component. It can be used to inform the user of the current operation.
	 * @public
	 * @default ""
	 * @since 1.0.0-rc.7
	 */
	@property()
	text!: string;

	/**
	 * Defines the size of the component.
	 * @default "M"
	 * @public
	 */
	@property({ type: BusyIndicatorSize, defaultValue: BusyIndicatorSize.M })
	size!: `${BusyIndicatorSize}`;

	/**
	 * Defines if the busy indicator is visible on the screen. By default it is not.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be visible on the screen.
	 * @default 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	delay!: number;

	/**
	 * Defines the placement of the text.
	 *
	 * @default "Bottom"
	 * @public
	 */
	@property({ type: BusyIndicatorTextPlacement, defaultValue: BusyIndicatorTextPlacement.Bottom })
	textPlacement!: `${BusyIndicatorTextPlacement}`;

	/**
	 * Defines if the component is currently in busy state.
	 * @private
	 */
	@property({ type: Boolean })
	_isBusy!: boolean;

	_keydownHandler: (e: KeyboardEvent) => void;
	_preventEventHandler: (e: KeyboardEvent) => void;
	_busyTimeoutId?: Timeout;
	focusForward?: boolean;

	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._keydownHandler = this._handleKeydown.bind(this);
		this._preventEventHandler = this._preventEvent.bind(this);
	}

	onEnterDOM() {
		this.addEventListener("keydown", this._keydownHandler, {
			capture: true,
		});
		this.addEventListener("keyup", this._preventEventHandler, {
			capture: true,
		});
	}

	onExitDOM() {
		if (this._busyTimeoutId) {
			clearTimeout(this._busyTimeoutId);
			delete this._busyTimeoutId;
		}

		this.removeEventListener("keydown", this._keydownHandler, true);
		this.removeEventListener("keyup", this._preventEventHandler, true);
	}

	static async onDefine() {
		BusyIndicator.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get ariaTitle() {
		return BusyIndicator.i18nBundle.getText(BUSY_INDICATOR_TITLE);
	}

	get labelId() {
		return this.text ? `${this._id}-label` : undefined;
	}

	get classes() {
		return {
			root: {
				"ui5-busy-indicator-root": true,
			},
			textPosition: {
				"ui5-busy-indicator-text-placement-top ": this.textPlacement === BusyIndicatorTextPlacement.Top,
				"ui5-busy-indicator-text-placement-bottom ": this.textPlacement === BusyIndicatorTextPlacement.Bottom,
			},
		};
	}
	get textPosition() {
		return {
			top: this.text && this.textPlacement === BusyIndicatorTextPlacement.Top,
			bottom: this.text && this.textPlacement === BusyIndicatorTextPlacement.Bottom,
		};
	}

	onBeforeRendering() {
		if (this.active) {
			if (!this._isBusy && !this._busyTimeoutId) {
				this._busyTimeoutId = setTimeout(() => {
					delete this._busyTimeoutId;
					this._isBusy = true;
				}, Math.max(0, this.delay));
			}
		} else {
			if (this._busyTimeoutId) {
				clearTimeout(this._busyTimeoutId);
				delete this._busyTimeoutId;
			}
			this._isBusy = false;
		}
	}

	_handleKeydown(e: KeyboardEvent) {
		if (!this._isBusy) {
			return;
		}

		e.stopImmediatePropagation();

		// move the focus to the last element in this DOM and let TAB continue to the next focusable element
		if (isTabNext(e)) {
			this.focusForward = true;
			this.shadowRoot!.querySelector<HTMLElement>("[data-ui5-focus-redirect]")!.focus();
			this.focusForward = false;
		}
	}

	_preventEvent(e: KeyboardEvent) {
		if (this._isBusy) {
			e.stopImmediatePropagation();
		}
	}

	/**
	 * Moves the focus to busy area when coming with SHIFT + TAB
	 */
	_redirectFocus(e: FocusEvent) {
		if (this.focusForward) {
			return;
		}

		e.preventDefault();
		this.shadowRoot!.querySelector<HTMLElement>(".ui5-busy-indicator-busy-area")!.focus();
	}
}

BusyIndicator.define();

export default BusyIndicator;
