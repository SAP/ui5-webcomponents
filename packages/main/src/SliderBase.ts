import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type { ComponentStylesData, PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import "@ui5/webcomponents-icons/dist/direction-arrows.js";
import {
	isEscape, isHome, isEnd, isUp, isDown, isRight, isLeft, isUpCtrl, isDownCtrl, isRightCtrl, isLeftCtrl, isPlus, isMinus, isPageUp, isPageDown,
} from "@ui5/webcomponents-base/dist/Keys.js";

// Styles
import styles from "./generated/themes/SliderBase.css.js";

type StateStorage = {
	[key: string]: number | undefined,
}

type DirectionStart = "left" | "right";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SliderBase
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-slider
 * @public
 */

/**
 * Fired when the value changes and the user has finished interacting with the slider.
 *
 * @event sap.ui.webc.main.SliderBase#change
 * @public
 */
@event("change")

/**
 * Fired when the value changes due to user interaction that is not yet finished - during mouse/touch dragging.
 *
 * @event sap.ui.webc.main.SliderBase#input
 * @public
 */
@event("input")
class SliderBase extends UI5Element {
	/**
	 * Defines the minimum value of the slider.
	 *
	 * @type {sap.ui.webc.base.types.Float}
	 * @name sap.ui.webc.main.SliderBase.prototype.min
	 * @defaultvalue 0
	 * @public
	 */
	@property({ validator: Float, defaultValue: 0 })
	min!: number;

	/**
	 * Defines the maximum value of the slider.
	 *
	 * @type {sap.ui.webc.base.types.Float}
	 * @name sap.ui.webc.main.SliderBase.prototype.max
	 * @defaultvalue 100
	 * @public
	 */
	@property({ validator: Float, defaultValue: 100 })
	max!: number;

	/**
	 * Defines the size of the slider's selection intervals (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
	 * <br><br>
	 * <b>Note:</b> If set to 0 the slider handle movement is disabled. When negative number or value other than a number, the component fallbacks to its default value.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.SliderBase.prototype.step
	 * @defaultvalue 1
	 * @public
	 */
	@property({ validator: Float, defaultValue: 1 })
	step!: number;

	/**
	 * Displays a label with a value on every N-th step.
	 * <br><br>
	 * <b>Note:</b> The step and tickmarks properties must be enabled.
	 * Example - if the step value is set to 2 and the label interval is also specified to 2 - then every second
	 * tickmark will be labelled, which means every 4th value number.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.SliderBase.prototype.labelInterval
	 * @defaultvalue 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	labelInterval!: number;

	/**
	 * Enables tickmarks visualization for each step.
	 * <br><br>
	 * <b>Note:</b> The step must be a positive number.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.SliderBase.prototype.showTickmarks
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showTickmarks!: boolean;

	/**
	 * Enables handle tooltip displaying the current value.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.SliderBase.prototype.showTooltip
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showTooltip!: boolean;

	/**
	 * Defines whether the slider is in disabled state.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.SliderBase.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SliderBase.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 * @since 1.4.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * @private
	 */
	@property({ defaultValue: "hidden" })
	_tooltipVisibility!: string;

	@property({ type: Boolean })
	_labelsOverlapping!: boolean;

	@property({ type: Boolean })
	_hiddenTickmarks!: boolean;

	_resizeHandler: () => void;
	_moveHandler: (e: TouchEvent | MouseEvent) => void;
	_upHandler: () => void;
	_stateStorage: StateStorage;
	_ontouchstart: PassiveEventListenerObject;
	notResized = false;
	_isUserInteraction = false;
	_isInnerElementFocusing = false;
	_oldNumberOfLabels?: number;
	_labelWidth = 0;
	_labelValues?: Array<string>;

	constructor() {
		super();
		this._resizeHandler = this._handleResize.bind(this);
		this._moveHandler = this._handleMove.bind(this);
		this._upHandler = this._handleUp.bind(this);

		this._stateStorage = {
			step: undefined,
			min: undefined,
			max: undefined,
			labelInterval: undefined,
		};

		const handleTouchStartEvent = (e: TouchEvent) => {
			this._onmousedown(e);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	_handleMove(e: TouchEvent | MouseEvent) {} // eslint-disable-line

	_handleUp() {}

	_onmousedown(e: TouchEvent | MouseEvent) {} // eslint-disable-line

	_handleActionKeyPress(e: Event) {} // eslint-disable-line

	static get render() {
		return litRender;
	}

	static get styles(): ComponentStylesData {
		return styles;
	}

	static get ACTION_KEYS() {
		return [
			isLeft,
			isRight,
			isUp,
			isDown,
			isLeftCtrl,
			isRightCtrl,
			isUpCtrl,
			isDownCtrl,
			isPlus,
			isMinus,
			isHome,
			isEnd,
			isPageUp,
			isPageDown,
			isEscape,
		];
	}

	static get MIN_SPACE_BETWEEN_TICKMARKS() {
		return 8;
	}

	static get TOOLTIP_VISIBILITY() {
		return {
			VISIBLE: "visible",
			HIDDEN: "hidden",
		};
	}

	get classes() {
		return {
			root: {
				"ui5-slider-root-phone": isPhone(),
			},
			labelContainer: {
				"ui5-slider-hidden-labels": this._labelsOverlapping,
			},
		};
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._resizeHandler);
	}

	onAfterRendering() {
		// Only call if the resize is triggered by a state changes other than
		// the ones that occured on the previous resize and those caused by user interaction.
		if (this.notResized) {
			this._resizeHandler();
		}
	}

	/** Shows the tooltip(s) if the <code>showTooltip</code> property is set to true
	 *
	 * @private
	 */
	_onmouseover() {
		if (this.showTooltip) {
			this._tooltipVisibility = SliderBase.TOOLTIP_VISIBILITY.VISIBLE;
		}
	}

	/**
	 * Hides the tooltip(s) if the <code>showTooltip</code> property is set to true
	 *
	 * @private
	 */
	_onmouseout() {
		if (this.showTooltip && !this.shadowRoot!.activeElement) {
			this._tooltipVisibility = SliderBase.TOOLTIP_VISIBILITY.HIDDEN;
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (this.disabled || this._effectiveStep === 0) {
			return;
		}

		if (SliderBase._isActionKey(e)) {
			e.preventDefault();

			this._isUserInteraction = true;
			this._handleActionKeyPress(e);
		}
	}

	_onkeyup() {
		if (this.disabled) {
			return;
		}

		this._isUserInteraction = false;
	}

	/**
	 * Flags if an inner element is currently being focused
	 *
	 * @private
	 */
	_preserveFocus(isFocusing: boolean) {
		this._isInnerElementFocusing = isFocusing;
	}

	/**
	 * Return if an inside element within the component is currently being focused
	 *
	 * @private
	 */
	_isFocusing() {
		return this._isInnerElementFocusing;
	}

	/**
	 * Prevent focus out when inner element within the component is currently being in process of focusing in.
	 * In theory this can be achieved either if the shadow root is focusable and 'delegatesFocus' attribute of
	 * the .attachShadow() customElement method is set to true, or if we forward it manually.

	 * As we use lit-element as base of our core UI5 element class that 'delegatesFocus' property is not set to 'true' and
	 * we have to manage the focus here. If at some point in the future this changes, the focus delegating logic could be
	 * removed as it will become redundant.
	 *
	 * When we manually set the focus on mouseDown to the first focusable element inside the shadowDom,
	 * that inner focus (shadowRoot.activeElement) is set a moment before the global document.activeElement
	 * is set to the customElement (ui5-slider) causing a 'race condition'.
	 *
	 * In order for a element within the shadowRoot to be focused, the global document.activeElement MUST be the parent
	 * customElement of the shadow root, in our case the ui5-slider component. Because of that after our focusin of the handle,
	 * a focusout event fired by the browser immidiatly after, resetting the focus. Focus out must be manually prevented
	 * in both initial focusing and switching the focus between inner elements of the component cases.

	 * Note: If we set the focus to the handle with a timeout or a bit later in time, on a mouseup or click event it will
	 * work fine and we will avoid the described race condition as our host customElement will be already finished focusing.
	 * However, that does not work for us as we need the focus to be set to the handle exactly on mousedown,
	 * because of the nature of the component and its available drag interactions.
	 *
	 * @private
	 */
	_preventFocusOut() {
		this.focusInnerElement();
	}

	/**
	 * Manages the focus between the component's inner elements
	 * @protected
	 */
	focusInnerElement() {
		this.focus();
	}

	/**
	 * Handle the responsiveness of the Slider's UI elements when resizing
	 *
	 * @private
	 */
	_handleResize() {
		if (!this.showTickmarks) {
			return;
		}

		// Mark resizing to avoid unneccessary calls to that function after rendering
		this.notResized = false;

		// Convert the string represented calculation expression to a normal one
		// Check the distance  in pixels exist between every tickmark
		const spaceBetweenTickmarks = this._spaceBetweenTickmarks();

		// If the pixels between the tickmarks are less than 8 only the first and the last one should be visible
		// In such case the labels must correspond to the tickmarks, only the first and the last one should exist.
		if (spaceBetweenTickmarks < SliderBase.MIN_SPACE_BETWEEN_TICKMARKS) {
			this._hiddenTickmarks = true;
			this._labelsOverlapping = true;
		} else {
			this._hiddenTickmarks = false;
		}

		if (this.labelInterval <= 0 || this._hiddenTickmarks) {
			return;
		}

		// Check if there are any overlapping labels.
		// If so - only the first and the last one should be visible
		const labelItems = this.shadowRoot!.querySelectorAll(".ui5-slider-labels li");
		this._labelsOverlapping = [...labelItems].some(label => label.scrollWidth > label.clientWidth);
	}

	/**
	 * Called when the user starts interacting with the slider.
	 * After a down event on the slider root, listen for move events on window, so the slider value
	 * is updated even if the user drags the pointer outside the slider root.
	 *
	 * @protected
	 */
	handleDownBase(e: TouchEvent | MouseEvent) {
		const min = this._effectiveMin;
		const max = this._effectiveMax;
		const domRect = this.getBoundingClientRect();
		const directionStart = this.directionStart;
		const step = this._effectiveStep;
		const newValue = SliderBase.getValueFromInteraction(e, step, min, max, domRect, directionStart);

		// Mark start of a user interaction
		this._isUserInteraction = true;

		window.addEventListener("mouseup", this._upHandler);
		window.addEventListener("touchend", this._upHandler);
		// Only allow one type of move event to be listened to (the first one registered after the down event)
		if (e instanceof TouchEvent) {
			window.addEventListener("touchmove", this._moveHandler);
		} else {
			window.addEventListener("mousemove", this._moveHandler);
		}

		this._handleFocusOnMouseDown(e);
		return newValue;
	}

	/**
	 * Forward the focus to an inner inner part within the component on press
	 *
	 * @private
	 */
	_handleFocusOnMouseDown(e: TouchEvent | MouseEvent) {
		const focusedElement = this.shadowRoot!.activeElement;

		if (!focusedElement || focusedElement !== e.target) {
			this._preserveFocus(true);
			this.focusInnerElement();
		}
	}

	/**
	 * Called when the user finish interacting with the slider
	 * Fires an <code>change</code> event indicating a final value change, after user interaction is finished.
	 *
	 * @protected
	 */
	handleUpBase() {
		window.removeEventListener("mouseup", this._upHandler);
		window.removeEventListener("touchend", this._upHandler);
		// Only one of the following was attached, but it's ok to remove both as there is no error
		window.removeEventListener("mousemove", this._moveHandler);
		window.removeEventListener("touchmove", this._moveHandler);

		this._isUserInteraction = false;
		this._preserveFocus(false);
	}

	/**
	 * Updates state storage for the value-related property
	 * Fires an <code>input</code> event indicating a value change via interaction that is not yet finished.
	 *
	 * @protected
	 */
	updateStateStorageAndFireInputEvent(valueType: string) {
		this.storePropertyState(valueType);
		if (this._isUserInteraction) {
			this.fireEvent("input");
		}
	}

	/**
	 * Goes through the key shortcuts available for the component and returns 'true' if the event is triggered by one.
	 *
	 * @private
	 */
	static _isActionKey(e: KeyboardEvent) {
		return this.ACTION_KEYS.some(actionKey => actionKey(e));
	}

	/**
	 * Locks the given value between min and max boundaries based on slider properties
	 *
	 * @protected
	 */
	static clipValue(value: number, min: number, max: number): number {
		value = Math.min(Math.max(value, min), max);
		return value;
	}

	/**
	 * Sets the slider value from an event
	 *
	 * @protected
	 */
	static getValueFromInteraction(e: TouchEvent | MouseEvent, stepSize: number, min: number, max: number, boundingClientRect: DOMRect, directionStart: DirectionStart): number {
		const pageX = this.getPageXValueFromEvent(e);
		const value = this.computedValueFromPageX(pageX, min, max, boundingClientRect, directionStart);
		const steppedValue = this.getSteppedValue(value, stepSize, min);

		return this.clipValue(steppedValue, min, max);
	}

	/**
	 * "Stepify" the raw value - calculate the new value depending on the specified step property
	 *
	 * @protected
	 */
	static getSteppedValue(value: number, stepSize: number, min: number): number {
		const stepModuloValue = Math.abs((value - min) % stepSize);

		if (stepSize === 0 || stepModuloValue === 0) {
			return value;
		}

		// Clip (snap) the new value to the nearest step
		value = (stepModuloValue * 2 >= stepSize) ? (value + stepSize) - stepModuloValue : value - stepModuloValue;

		// If the step value is not a round number get its precision
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(stepSize);
		return Number(value.toFixed(stepPrecision));
	}

	/**
	 * Gets pageX value from event on user interaction with the Slider
	 *
	 * @protected
	 */
	static getPageXValueFromEvent(e: TouchEvent | MouseEvent): number {
		if (e instanceof TouchEvent) {
			if (e.targetTouches && e.targetTouches.length > 0) {
				return e.targetTouches[0].pageX;
			}
			return 0;
		}

		return e.pageX; // MouseEvent
	}

	/**
	 * Computes the new value (in %) from the pageX position of the cursor.
	 * Returns the value rounded to a precision of at most 2 digits after decimal point.
	 *
	 * @protected
	 */
	static computedValueFromPageX(pageX: number, min: number, max: number, boundingClientRect: DOMRect, directionStart: DirectionStart) {
		// Determine pageX position relative to the Slider DOM
		const xRelativePosition = directionStart === "left" ? pageX - boundingClientRect[directionStart] : boundingClientRect[directionStart] - pageX;
		// Calculate the percentage complete (the "progress")
		const percentageComplete = xRelativePosition / boundingClientRect.width;
		// Fit (map) the complete percentage between the min/max value range
		return min + percentageComplete * (max - min);
	}

	/**
	 * Calculates the precision (decimal places) of a number, returns 0 if integer
	 * Handles scientific notation cases.
	 * @private
	 */
	static _getDecimalPrecisionOfNumber(value: number) {
		if (Number.isInteger(value)) {
			return 0;
		}
		const match = (String(value)).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match || match.length < 2) {
			return 0;
		}
		return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? Number(match[2]) : 0));
	}

	/**
	 * In order to always keep the visual UI representation and the internal
	 * state in sync, the component has a 'state storage' that is updated when the
	 * current state is changed due to a user action.
	 *
	 * Check if the previously saved state is outdated. That would mean
	 * a property has been changed programmatically because the previous state
	 * is always updated in the interaction handlers.
	 *
	 * Will return true if any of the properties is not equal to its previously
	 * stored value.
	 *
	 * @protected
	 */
	isCurrentStateOutdated() {
		return Object.entries(this._stateStorage).some(([propName, propValue]) => this[propName as keyof SliderBase] !== propValue);
	}

	/**
	 * Returns the last stored value of a property
	 *
	 * @protected
	 */
	getStoredPropertyState(prop: string) {
		return this._stateStorage[prop as keyof StateStorage];
	}

	/**
	 * Check if one or more properties have been updated compared to their last
	 * saved values in the state storage.
	 *
	 * @protected
	 */
	isPropertyUpdated(...props: Array<string>) {
		return props.some(prop => this.getStoredPropertyState(prop) !== this[prop as keyof SliderBase]);
	}

	/**
	 * Updates the previously saved in the _stateStorage values of one or more properties.
	 *
	 * @protected
	 */
	storePropertyState(...props: Array<string>) {
		props.forEach(prop => {
			this._stateStorage[prop as keyof StateStorage] = this[prop as keyof SliderBase] as number;
		});
	}

	/**
	 * Returns the start side of a direction - left for LTR, right for RTL
	 */
	get directionStart() {
		return this.effectiveDir === "rtl" ? "right" : "left";
	}

	/**
	 * Calculates the labels amount, width and text and creates them
	 *
	 * @private
	 */
	_createLabels() {
		if (!this.labelInterval || !this.showTickmarks) {
			return;
		}

		const labelInterval = this.labelInterval;
		const step = this._effectiveStep;
		const newNumberOfLabels = (this._effectiveMax - this._effectiveMin) / (step * labelInterval);

		// If the required labels are already rendered
		if (newNumberOfLabels === this._oldNumberOfLabels) {
			return;
		}

		this._oldNumberOfLabels = newNumberOfLabels;
		this._labelWidth = 100 / newNumberOfLabels;
		this._labelValues = [];

		// If the step value is not a round number get its precision
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(step);

		// numberOfLabels below can be float so that the "distance betweenlabels labels"
		// calculation to be precize (exactly the same as the distance between the tickmarks).
		// That's ok as the loop stop condition is set to an integer, so it will practically
		// "floor" the number of labels anyway.
		for (let i = 0; i <= newNumberOfLabels; i++) {
			// Format the label numbers with the same decimal precision as the value of the step property
			const labelItemNumber = ((i * step * labelInterval) + this._effectiveMin).toFixed(stepPrecision);
			this._labelValues.push(labelItemNumber);
		}
	}

	_handleActionKeyPressBase(e: KeyboardEvent, affectedPropName: string) {
		const isUpAction = SliderBase._isIncreaseValueAction(e);
		const isBigStep = SliderBase._isBigStepAction(e);

		const currentValue = this[affectedPropName as keyof SliderBase] as number;
		const min = this._effectiveMin;
		const max = this._effectiveMax;

		// We need to take into consideration the effective direction of the slider - rtl or ltr.
		// While in ltr, the left arrow key decreases the value, in rtl it should actually increase it.
		let step = this.effectiveDir === "rtl" ? -this._effectiveStep : this._effectiveStep;

		// If the action key corresponds to a long step and the slider has more than 10 normal steps,
		// make a jump of 1/10th of the Slider's length, otherwise just use the normal step property.
		step = isBigStep && ((max - min) / step > 10) ? (max - min) / 10 : step;

		if (isEnd(e)) {
			return max - currentValue;
		}

		if (isHome(e)) {
			return (currentValue - min) * -1;
		}

		return isUpAction ? step : step * -1;
	}

	static _isDecreaseValueAction(e: KeyboardEvent) {
		return isDown(e) || isDownCtrl(e) || isLeft(e) || isLeftCtrl(e) || isMinus(e) || isPageDown(e);
	}

	static _isIncreaseValueAction(e: KeyboardEvent) {
		return isUp(e) || isUpCtrl(e) || isRight(e) || isRightCtrl(e) || isPlus(e) || isPageUp(e);
	}

	static _isBigStepAction(e: KeyboardEvent) {
		return isDownCtrl(e) || isUpCtrl(e) || isLeftCtrl(e) || isRightCtrl(e) || isPageUp(e) || isPageDown(e);
	}

	get _tickmarksCount() {
		return (this._effectiveMax - this._effectiveMin) / this._effectiveStep;
	}

	/**
	 * Calculates space between tickmarks
	 *
	 * @private
	 */
	_spaceBetweenTickmarks() {
		return this.getBoundingClientRect().width / this._tickmarksCount;
	}

	/**
	 * Notify in case of a invalid step value type
	 *
	 * @private
	 */
	_validateStep(step: number) {
		if (step === 0) {
			console.warn("The 'step' property must be a positive float number"); // eslint-disable-line
		}

		if (step < 0) {
			console.warn("The 'step' property must be a positive float number. The provided negative number has been converted to its positve equivalent"); // eslint-disable-line
		}

		if (Number.isNaN(step)) {
			console.warn("The 'step' property must be a positive float number. It has been set to its default value of 1"); // eslint-disable-line
		}
	}

	get _labels() {
		return this._labelValues || [];
	}

	/**
	 * Normalizes a new <code>step</code> property value.
	 * If tickmarks are enabled recreates them according to it.
	 *
	 * @private
	 */
	get _effectiveStep() {
		let step = this.step;

		if (step < 0) {
			step = Math.abs(step);
		}

		if (Number.isNaN(step)) {
			step = 1;
		}

		return step;
	}

	get _effectiveMin() {
		return Math.min(this.min, this.max);
	}

	get _effectiveMax() {
		return Math.max(this.min, this.max);
	}

	get _tabIndex() {
		return this.disabled ? "-1" : "0";
	}

	get _ariaLabelledByHandleRefs() {
		return [`${this._id}-accName`, `${this._id}-sliderDesc`].join(" ").trim();
	}
}

export default SliderBase;
