import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Popup from "@ui5/webcomponents/dist/Popup.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import { getBackgroundImgSrc, getAvatarImgSrc } from "./ConfettiBackgroundImages.js";
import "@ui5/webcomponents-icons/dist/resize-corner.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
// Template
import confettiTemplate from "./generated/templates/ConfettiTemplate.lit.js";
// Styles
import confettiCSS from "./generated/themes/Confetti.css.js";

/**
 * @class
 * @constructor
 * @author SAP SE
 * @extends sap.ui.webc.main.Popup
 * @tagname ui5-dialog
 * @public
 */
@customElement({
	tag: "ui5-confetti",
	template: confettiTemplate,
	styles: [
		confettiCSS,
	],
	dependencies: [
		Button,
	],
})
class Confetti extends Popup {
	/**
	 * Defines the title text.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Confetti.prototype.titleText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the content text.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Confetti.prototype.contentText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	contentText!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })

	_screenResizeHandler: () => void;
	_screenResizeHandlerAttached?: boolean;

	constructor() {
		super();

		this._screenResizeHandler = this._screenResize.bind(this);
	}

	async show(preventInitialFocus = false) {
		await super._open(preventInitialFocus);
	}

	get isModal() {
		return true;
	}

	get shouldHideBackdrop() {
		return false;
	}

	get _ariaLabelledBy() {
		let ariaLabelledById;

		if (this.titleText !== "" && !this._ariaLabel) {
			ariaLabelledById = "ui5-confetti-title-text";
		}

		return ariaLabelledById;
	}

	_show() {
		super._show();
		this._center();
	}

	async onAfterRendering() {
		if (!this.isOpen() && this.open) {
			this.show();
		} else if (this.isOpen() && !this.open) {
			this.close();
		}
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		(staticAreaItem!.querySelector(".ui5-block-layer") as HTMLElement)!.style.backgroundImage = getBackgroundImgSrc();
		this.style.backgroundImage = getAvatarImgSrc();
	}

	onEnterDOM() {
		super.onEnterDOM();
		this._attachScreenResizeHandler();
	}

	onExitDOM() {
		super.onExitDOM();
		this._detachScreenResizeHandler();
	}

	_screenResize() {
		this._center();
	}

	_attachScreenResizeHandler() {
		if (!this._screenResizeHandlerAttached) {
			window.addEventListener("resize", this._screenResizeHandler);
			this._screenResizeHandlerAttached = true;
		}
	}

	_detachScreenResizeHandler() {
		if (this._screenResizeHandlerAttached) {
			window.removeEventListener("resize", this._screenResizeHandler);
			this._screenResizeHandlerAttached = false;
		}
	}

	_center() {
		const height = window.innerHeight - this.offsetHeight,
			width = window.innerWidth - this.offsetWidth;

		Object.assign(this.style, {
			top: `${Math.round(height / 2)}px`,
			left: `${Math.round(width / 2)}px`,
		});
	}

	_revertSize = () => {
		Object.assign(this.style, {
			top: "",
			left: "",
			width: "",
			height: "",
		});
	}

	get classes() {
		const allClasses = super.classes;
		allClasses.title = {
			"ui5-confetti-title": true,
		};
		allClasses.actions = {
			"ui5-confetti-actions": true,
		};
		return allClasses;
	}
}

Confetti.define();

export default Confetti;
