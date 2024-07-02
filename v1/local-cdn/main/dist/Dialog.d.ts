import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Popup from "./Popup.js";
import type { PopupBeforeCloseEventDetail as DialogBeforeCloseEventDetail } from "./Popup.js";
import "@ui5/webcomponents-icons/dist/resize-corner.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
/**
 * @class
 * ### Overview
 * The `ui5-dialog` component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The `ui5-dialog` interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 *
 * The `ui5-dialog` is modal, which means that an user action is required before it is possible to return to the parent window.
 * To open multiple dialogs, each dialog element should be separate in the markup. This will ensure the correct modal behavior. Avoid nesting dialogs within each other.
 * The content of the `ui5-dialog` is fully customizable.
 *
 * ### Structure
 * A `ui5-dialog` consists of a header, content, and a footer for action buttons.
 * The `ui5-dialog` is usually displayed at the center of the screen.
 * Its position can be changed by the user. To enable this, you need to set the property `draggable` accordingly.

 *
 * ### Responsive Behavior
 * The `stretch` property can be used to stretch the
 * `ui5-dialog` on full screen.
 *
 * **Note:** When a `ui5-bar` is used in the header or in the footer, you should remove the default dialog's paddings.
 *
 * For more information see the sample "Bar in Header/Footer".

 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * When the `ui5-dialog` has the `draggable` property set to `true` and the header is focused, the user can move the dialog
 * with the following keyboard shortcuts:
 *
 * - [Up] or [Down] arrow keys - Move the dialog up/down.
 * - [Left] or [Right] arrow keys - Move the dialog left/right.
 *
 * #### Resizing
 * When the `ui5-dialog` has the `resizable` property set to `true` and the header is focused, the user can change the size of the dialog
 * with the following keyboard shortcuts:
 *
 * - [Shift] + [Up] or [Down] - Decrease/Increase the height of the dialog.
 * - [Shift] + [Left] or [Right] - Decrease/Increase the width of the dialog.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Dialog";`
 *
 * **Note:** We recommend placing popup-like components (`ui5-dialog` and `ui5-popover`)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * **Note:** We don't recommend nesting popup-like components (`ui5-dialog`, `ui5-popover`).
 * @constructor
 * @extends Popup
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
declare class Dialog extends Popup {
    /**
     * Defines the header text.
     *
     * **Note:** If `header` slot is provided, the `headerText` is ignored.
     * @default ""
     * @public
     */
    headerText: string;
    /**
     * Determines whether the component should be stretched to fullscreen.
     *
     * **Note:** The component will be stretched to approximately
     * 90% of the viewport.
     * @default false
     * @public
     */
    stretch: boolean;
    /**
     * Determines whether the component is draggable.
     * If this property is set to true, the Dialog will be draggable by its header.
     *
     * **Note:** The component can be draggable only in desktop mode.
     *
     * **Note:** This property overrides the default HTML "draggable" attribute native behavior.
     * When "draggable" is set to true, the native browser "draggable"
     * behavior is prevented and only the Dialog custom logic ("draggable by its header") works.
     * @default false
     * @since 1.0.0-rc.9
     * @public
     */
    draggable: boolean;
    /**
     * Configures the component to be resizable.
     * If this property is set to true, the Dialog will have a resize handle in its bottom right corner in LTR languages.
     * In RTL languages, the resize handle will be placed in the bottom left corner.
     *
     * **Note:** The component can be resizable only in desktop mode.
     *
     * **Note:** Upon resizing, externally defined height and width styling will be ignored.
     * @default false
     * @since 1.0.0-rc.10
     * @public
     */
    resizable: boolean;
    /**
     * Defines the state of the `Dialog`.
     *
     * **Note:** If `"Error"` and `"Warning"` state is set, it will change the
     * accessibility role to "alertdialog", if the accessibleRole property is set to `"Dialog"`.
     * @default "None"
     * @public
     * @since 1.0.0-rc.15
     */
    state: `${ValueState}`;
    /**
     * @private
     */
    onPhone: boolean;
    /**
     * @private
     */
    onDesktop: boolean;
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
    _draggedOrResized: boolean;
    /**
     * Defines the header HTML Element.
     *
     * **Note:** When a `ui5-bar` is used in the header, you should remove the default dialog's paddings.
     *
     * **Note:** If `header` slot is provided, the labelling of the dialog is a responsibility of the application developer.
     * `accessibleName` should be used.
     * @public
     */
    header: Array<HTMLElement>;
    /**
     * Defines the footer HTML Element.
     *
     * **Note:** When a `ui5-bar` is used in the footer, you should remove the default dialog's paddings.
     * @public
     */
    footer: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    constructor();
    static onDefine(): Promise<void>;
    static _isHeader(element: HTMLElement): boolean;
    /**
     * Shows the dialog.
     * @param [preventInitialFocus=false] Prevents applying the focus inside the popup
     * @public
     * @returns Resolves when the dialog is open
     */
    show(preventInitialFocus?: boolean): Promise<void>;
    get isModal(): boolean;
    get shouldHideBackdrop(): boolean;
    get _ariaLabelledBy(): string | undefined;
    get ariaRoleDescriptionHeaderText(): string | undefined;
    get effectiveAriaDescribedBy(): string | undefined;
    get ariaDescribedByHeaderTextResizable(): string;
    get ariaDescribedByHeaderTextDraggable(): string;
    get ariaDescribedByHeaderTextDraggableAndResizable(): string;
    get _displayProp(): string;
    /**
     * Determines if the header should be shown.
     */
    get _displayHeader(): string | number | boolean;
    get _movable(): boolean;
    get _headerTabIndex(): "0" | undefined;
    get _showResizeHandle(): boolean;
    get _minHeight(): number;
    get hasValueState(): boolean;
    get _dialogStateIcon(): string;
    get _role(): string | undefined;
    _show(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    /**
     * @override
     */
    _resize(): void;
    _screenResize(): void;
    _attachScreenResizeHandler(): void;
    _detachScreenResizeHandler(): void;
    _center(): void;
    _revertSize: () => void;
    /**
     * Event handlers
     */
    _onDragMouseDown(e: DragEvent): void;
    _onDragMouseMove(e: MouseEvent): void;
    _onDragMouseUp(): void;
    _onDragOrResizeKeyDown(e: KeyboardEvent): void;
    _dragWithEvent(e: KeyboardEvent): void;
    _resizeWithEvent(e: KeyboardEvent): void;
    _attachMouseDragHandlers(): void;
    _detachMouseDragHandlers(): void;
    _onResizeMouseDown(e: MouseEvent): void;
    _onResizeMouseMove(e: MouseEvent): void;
    _onResizeMouseUp(): void;
    _handleDragStart(e: DragEvent): void;
    _attachMouseResizeHandlers(): void;
    _detachMouseResizeHandlers(): void;
}
export default Dialog;
export type { DialogBeforeCloseEventDetail, };
