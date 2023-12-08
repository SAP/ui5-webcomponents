import { isPhone, isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import {
	isUp, isDown, isLeft, isRight,
	isUpShift, isDownShift, isLeftShift, isRightShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Popup from "./Popup.js";
import type { PopupBeforeCloseEventDetail as DialogBeforeCloseEventDetail } from "./Popup.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/resize-corner.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";

import {
	DIALOG_HEADER_ARIA_ROLE_DESCRIPTION,
	DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE,
	DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE,
	DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE,
} from "./generated/i18n/i18n-defaults.js";

// Template
import DialogTemplate from "./generated/templates/DialogTemplate.lit.js";
// Styles
import browserScrollbarCSS from "./generated/themes/BrowserScrollbar.css.js";
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import dialogCSS from "./generated/themes/Dialog.css.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";

/**
 * Defines the step size at which this component would change by when being dragged or resized with the keyboard.
 */
const STEP_SIZE = 16;

type ValueStateWithIcon = ValueState.Error | ValueState.Warning | ValueState.Success | ValueState.Information;
/**
 * Defines the icons corresponding to the dialog's state.
 */
const ICON_PER_STATE: Record<ValueStateWithIcon, string> = {
	[ValueState.Error]: "error",
	[ValueState.Warning]: "alert",
	[ValueState.Success]: "sys-enter-2",
	[ValueState.Information]: "information",
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that an user action is required before it is possible to return to the parent window.
 * To open multiple dialogs, each dialog element should be separate in the markup. This will ensure the correct modal behavior. Avoid nesting dialogs within each other.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 * Its position can be changed by the user. To enable this, you need to set the property <code>draggable</code> accordingly.

 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <b>Note:</b> When a <code>ui5-bar</code> is used in the header or in the footer, you should remove the default dialog's paddings.
 * <br>
 * For more information see the sample "Bar in Header/Footer".

 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * <b>Note: </b> We recommend placing popup-like components (<code>ui5-dialog</code> and <code>ui5-popover</code>)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>).
 *
 * @constructor
 * @extends Popup
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-dialog",
	template: DialogTemplate,
	styles: [
		browserScrollbarCSS,
		PopupsCommonCss,
		dialogCSS,
	],
	dependencies: [
		Icon,
	],
})
class Dialog extends Popup {
	/**
	 * Defines the header text.
	 * <br><br>
	 * <b>Note:</b> If <code>header</code> slot is provided, the <code>headerText</code> is ignored.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Determines whether the component should be stretched to fullscreen.
	 * <br><br>
	 * <b>Note:</b> The component will be stretched to approximately
	 * 90% of the viewport.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	stretch!: boolean;

	/**
	 * Determines whether the component is draggable.
	 * If this property is set to true, the Dialog will be draggable by its header.
	 * <br><br>
	 * <b>Note:</b> The component can be draggable only in desktop mode.
	 * <br><br>
	 * <b>Note:</b> This property overrides the default HTML "draggable" attribute native behavior.
	 * When "draggable" is set to true, the native browser "draggable"
	 * behavior is prevented and only the Dialog custom logic ("draggable by its header") works.
	 * @default false
	 * @since 1.0.0-rc.9
	 * @public
	 */
	@property({ type: Boolean })
	draggable!: boolean;

	/**
	 * Configures the component to be resizable.
	 * If this property is set to true, the Dialog will have a resize handle in its bottom right corner in LTR languages.
	 * In RTL languages, the resize handle will be placed in the bottom left corner.
	 * <br><br>
	 * <b>Note:</b> The component can be resizable only in desktop mode.
	 * <br>
	 * <b>Note:</b> Upon resizing, externally defined height and width styling will be ignored.
	 * @default false
	 * @since 1.0.0-rc.10
	 * @public
	 */
	@property({ type: Boolean })
	resizable!: boolean;

	/**
	 * Defines the state of the <code>Dialog</code>.
	 * <br><b>Note:</b> If <code>"Error"</code> and <code>"Warning"</code> state is set, it will change the
	 * accessibility role to "alertdialog", if the accessibleRole property is set to <code>"Dialog"</code>.
	 * @default "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	state!: `${ValueState}`;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	onPhone!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	onDesktop!: boolean;

	_screenResizeHandler: () => void;
	_dragMouseMoveHandler: (e: MouseEvent) => void;
	_dragMouseUpHandler: (e: MouseEvent) => void;
	_resizeMouseMoveHandler: (e: MouseEvent) => void;
	_resizeMouseUpHandler: (e: MouseEvent) => void;
	_dragStartHandler: (e: DragEvent) => void;
	_y?: number;
	_x?: number;
	_isRTL?: boolean;
	_screenResizeHandlerAttached?: boolean;
	_initialX?: number;
	_initialY?: number;
	_initialWidth?: number;
	_initialHeight?: number;
	_initialTop?: number;
	_initialLeft?: number;
	_minWidth?: number;
	_cachedMinHeight?: number;
	_draggedOrResized = false;

	/**
	 * Defines the header HTML Element.
	 * <br><br>
	 * <b>Note:</b> When a <code>ui5-bar</code> is used in the header, you should remove the default dialog's paddings.
	 * <br><br>
	 * <b>Note:</b> If <code>header</code> slot is provided, the labelling of the dialog is a responsibility of the application developer.
	 * <code>accessibleName</code> should be used.
	 *
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * Defines the footer HTML Element.
	 * <br><br>
	 * <b>Note:</b> When a <code>ui5-bar</code> is used in the footer, you should remove the default dialog's paddings.
	 *
	 * @public
	 */
	@slot()
	footer!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._screenResizeHandler = this._screenResize.bind(this);

		this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
		this._dragMouseUpHandler = this._onDragMouseUp.bind(this);

		this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
		this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);

		this._dragStartHandler = this._handleDragStart.bind(this);
	}

	static async onDefine() {
		Dialog.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static _isHeader(element: HTMLElement) {
		return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
	}

	/**
	 * Shows the dialog.
	 *
	 * @param [preventInitialFocus=false] Prevents applying the focus inside the popup
	 * @public
	 * @returns Resolves when the dialog is open
	 */
	async show(preventInitialFocus = false): Promise<void> {
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

		if (this.headerText !== "" && !this._ariaLabel) {
			ariaLabelledById = "ui5-popup-header-text";
		}

		return ariaLabelledById;
	}

	get ariaRoleDescriptionHeaderText() {
		return (this.resizable || this.draggable) ? Dialog.i18nBundle.getText(DIALOG_HEADER_ARIA_ROLE_DESCRIPTION) : undefined;
	}

	get effectiveAriaDescribedBy() {
		return (this.resizable || this.draggable) ? `${this._id}-descr` : undefined;
	}

	get ariaDescribedByHeaderTextResizable() {
		return Dialog.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE);
	}

	get ariaDescribedByHeaderTextDraggable() {
		return Dialog.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE);
	}

	get ariaDescribedByHeaderTextDraggableAndResizable() {
		return Dialog.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE);
	}

	get _displayProp() {
		return "flex";
	}

	/**
	 * Determines if the header should be shown.
	 */
	get _displayHeader() {
		return this.header.length || this.headerText || this.draggable || this.resizable;
	}

	get _movable() {
		return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
	}

	get _headerTabIndex() {
		return this._movable ? "0" : undefined;
	}

	get _showResizeHandle() {
		return this.resizable && this.onDesktop;
	}

	get _minHeight() {
		let minHeight = Number.parseInt(window.getComputedStyle(this.contentDOM).minHeight);

		const header = this._root.querySelector<HTMLElement>(".ui5-popup-header-root");
		if (header) {
			minHeight += header.offsetHeight;
		}

		const footer = this._root.querySelector<HTMLElement>(".ui5-popup-footer-root");
		if (footer) {
			minHeight += footer.offsetHeight;
		}

		return minHeight;
	}

	get hasValueState() {
		return this.state !== ValueState.None;
	}

	get _dialogStateIcon() {
		return ICON_PER_STATE[this.state as ValueStateWithIcon];
	}

	get _role(): string | undefined {
		if (this.accessibleRole === PopupAccessibleRole.None) {
			return undefined;
		}

		if (this.state === ValueState.Error || this.state === ValueState.Warning) {
			return PopupAccessibleRole.AlertDialog.toLowerCase();
		}

		return this.accessibleRole.toLowerCase();
	}

	_show() {
		super._show();
		this._center();
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		this._isRTL = this.effectiveDir === "rtl";
		this.onPhone = isPhone();
		this.onDesktop = isDesktop();
	}

	onAfterRendering() {
		super.onAfterRendering();

		if (!this.isOpen() && this.open) {
			this.show();
		} else if (this.isOpen() && !this.open) {
			this.close();
		}
	}

	onEnterDOM() {
		super.onEnterDOM();
		this._attachScreenResizeHandler();

		this.addEventListener("dragstart", this._dragStartHandler);
	}

	onExitDOM() {
		super.onExitDOM();
		this._detachScreenResizeHandler();

		this.removeEventListener("dragstart", this._dragStartHandler);
	}

	/**
	 * @override
	 */
	_resize() {
		super._resize();

		if (!this._draggedOrResized) {
			this._center();
		}
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
			this._screenResizeHandlerAttached = false; // prevent dialog from repositioning during resizing
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

	/**
	 * Event handlers
	 */
	_onDragMouseDown(e: DragEvent) {
		// allow dragging only on the header
		if (!this._movable || !this.draggable || !Dialog._isHeader(e.target as HTMLElement)) {
			return;
		}

		e.preventDefault();

		const {
			top,
			left,
		} = this.getBoundingClientRect();
		const {
			width,
			height,
		} = window.getComputedStyle(this);

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
			width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
			height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`,
		});

		this._x = e.clientX;
		this._y = e.clientY;

		this._draggedOrResized = true;
		this._attachMouseDragHandlers();
	}

	_onDragMouseMove(e: MouseEvent) {
		e.preventDefault();

		const { clientX, clientY } = e;
		const calcX = this._x! - clientX;
		const calcY = this._y! - clientY;
		const {
			left,
			top,
		} = this.getBoundingClientRect();

		Object.assign(this.style, {
			left: `${Math.floor(left - calcX)}px`,
			top: `${Math.floor(top - calcY)}px`,
		});

		this._x = clientX;
		this._y = clientY;
	}

	_onDragMouseUp() {
		delete this._x;
		delete this._y;

		this._detachMouseDragHandlers();
	}

	_onDragOrResizeKeyDown(e: KeyboardEvent) {
		if (!this._movable || !Dialog._isHeader(e.target as HTMLElement)) {
			return;
		}

		if (this.draggable && [isUp, isDown, isLeft, isRight].some(key => key(e))) {
			this._dragWithEvent(e);
			return;
		}

		if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some(key => key(e))) {
			this._resizeWithEvent(e);
		}
	}

	_dragWithEvent(e: KeyboardEvent) {
		const {
			top,
			left,
			width,
			height,
		} = this.getBoundingClientRect();

		let newPos = 0;
		let posDirection: "top" | "left" = "top";

		switch (true) {
		case isUp(e):
			newPos = top - STEP_SIZE;
			posDirection = "top";
			break;
		case isDown(e):
			newPos = top + STEP_SIZE;
			posDirection = "top";
			break;
		case isLeft(e):
			newPos = left - STEP_SIZE;
			posDirection = "left";
			break;
		case isRight(e):
			newPos = left + STEP_SIZE;
			posDirection = "left";
			break;
		}

		newPos = clamp(
			newPos,
			0,
			posDirection === "left" ? window.innerWidth - width : window.innerHeight - height,
		);

		this.style[posDirection] = `${newPos}px`;
	}

	_resizeWithEvent(e: KeyboardEvent) {
		this._draggedOrResized = true;
		this.addEventListener("ui5-before-close", this._revertSize, { once: true });

		const { top, left } = this.getBoundingClientRect(),
			style = window.getComputedStyle(this),
			minWidth = Number.parseFloat(style.minWidth),
			maxWidth = window.innerWidth - left,
			maxHeight = window.innerHeight - top;

		let width = Number.parseFloat(style.width),
			height = Number.parseFloat(style.height);

		switch (true) {
		case isUpShift(e):
			height -= STEP_SIZE;
			break;
		case isDownShift(e):
			height += STEP_SIZE;
			break;
		case isLeftShift(e):
			width -= STEP_SIZE;
			break;
		case isRightShift(e):
			width += STEP_SIZE;
			break;
		}

		width = clamp(width, minWidth, maxWidth);
		height = clamp(height, this._minHeight, maxHeight);

		Object.assign(this.style, {
			width: `${width}px`,
			height: `${height}px`,
		});
	}

	_attachMouseDragHandlers() {
		window.addEventListener("mousemove", this._dragMouseMoveHandler);
		window.addEventListener("mouseup", this._dragMouseUpHandler);
	}

	_detachMouseDragHandlers() {
		window.removeEventListener("mousemove", this._dragMouseMoveHandler);
		window.removeEventListener("mouseup", this._dragMouseUpHandler);
	}

	_onResizeMouseDown(e: MouseEvent) {
		if (!this._movable || !this.resizable) {
			return;
		}

		e.preventDefault();

		const {
			top,
			left,
		} = this.getBoundingClientRect();
		const {
			width,
			height,
			minWidth,
		} = window.getComputedStyle(this);

		this._initialX = e.clientX;
		this._initialY = e.clientY;
		this._initialWidth = Number.parseFloat(width);
		this._initialHeight = Number.parseFloat(height);
		this._initialTop = top;
		this._initialLeft = left;
		this._minWidth = Number.parseFloat(minWidth);
		this._cachedMinHeight = this._minHeight;

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
		});

		this._draggedOrResized = true;
		this._attachMouseResizeHandlers();
	}

	_onResizeMouseMove(e: MouseEvent) {
		const { clientX, clientY } = e;

		let newWidth,
			newLeft;

		if (this._isRTL) {
			newWidth = clamp(
				this._initialWidth! - (clientX - this._initialX!),
				this._minWidth!,
				this._initialLeft! + this._initialWidth!,
			);

			newLeft = clamp(
				this._initialLeft! + (clientX - this._initialX!),
				0,
				this._initialX! + this._initialWidth! - this._minWidth!,
			);
		} else {
			newWidth = clamp(
				this._initialWidth! + (clientX - this._initialX!),
				this._minWidth!,
				window.innerWidth - this._initialLeft!,
			);
		}

		const newHeight = clamp(
			this._initialHeight! + (clientY - this._initialY!),
			this._cachedMinHeight!,
			window.innerHeight - this._initialTop!,
		);

		Object.assign(this.style, {
			height: `${newHeight}px`,
			width: `${newWidth}px`,
			left: newLeft ? `${newLeft}px` : undefined,
		});
	}

	_onResizeMouseUp() {
		delete this._initialX;
		delete this._initialY;
		delete this._initialWidth;
		delete this._initialHeight;
		delete this._initialTop;
		delete this._initialLeft;
		delete this._minWidth;
		delete this._cachedMinHeight;

		this._detachMouseResizeHandlers();
	}

	_handleDragStart(e: DragEvent) {
		if (this.draggable) {
			e.preventDefault();
		}
	}

	_attachMouseResizeHandlers() {
		window.addEventListener("mousemove", this._resizeMouseMoveHandler);
		window.addEventListener("mouseup", this._resizeMouseUpHandler);
		this.addEventListener("ui5-before-close", this._revertSize, { once: true });
	}

	_detachMouseResizeHandlers() {
		window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
		window.removeEventListener("mouseup", this._resizeMouseUpHandler);
	}
}

Dialog.define();

export default Dialog;
export type {
	DialogBeforeCloseEventDetail,
};
