import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import TimePickerClockTemplate from "./generated/templates/TimePickerClockTemplate.lit.js";

// Styles
import TimePickerClockCss from "./generated/themes/TimePickerClock.css.js";

type TimePickerClockChangeEventDetail = {
	value: number,
	stringValue: string,
	finalChange: boolean,
}

type TimePickerClockItem = {
	angle?: number,
	item?: string,
	innerItem?: string,
	outerStyles?: object,
	innerStyles?: object,
}

type TimePickerClockSelection = {
	showMarker: boolean,
	itemClasses?: string,
	innerItemClasses?: string,
}

type TimePickerClockDimensions = {
	radius: number,
	centerX: number,
	centerY: number,
	dotHeight: number,
	numberHeight: number,
	outerMax: number,
	outerMin: number,
	innerMax: number,
	innerMin: number,
	offsetX: number,
	offsetY: number,
}

type TimePickerClockSelectedItem = TimePickerClockItem & TimePickerClockSelection;

const ANIMATION_DURATION_MAX = 200; // total animation duration, without the delay before firing the event
const ANIMATION_DELAY_EVENT = 100; // delay before firing the event
const CLOCK_ANGLE_STEP = 6;
const CLOCK_NUMBER_CLASS = "ui5-tp-clock-number";
const CLOCK_NUMBER_HOVER_CLASS = "ui5-tp-clock-number-hover";
const CLOCK_NUMBER_SELECTED_CLASS = "ui5-tp-clock-selected";
const CLOCK_MIDDOT_CLASS = "ui5-tp-clock-mid-dot";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-time-picker-clock</code> allows selecting of hours,minutes or seconds (depending on property set).
 * The component supports interactions with mouse, touch and mouse wheel.
 * Depending on settings, the clock can display only outer set of items (when the clock displays hours in 12-hour mode,
 * minutes or seconds), or outer and inner sets of items (when the clock displays hours in 24-hours mode).
 * The step for displaying or selecting of items can be configured.
 *
 * <code>ui5-time-picker-clock</code> is used as part of <code>ui5-time-selection-clocks</code> component, which
 * is used in <code>ui5-time-picker</code> component respectively.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-time-picker-clock</code> can display hours, minutes or seconds
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TimePickerClock.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @since 1.15.0
 * @private
 */
@customElement({
	tag: "ui5-time-picker-clock",
	renderer: litRender,
	styles: TimePickerClockCss,
	template: TimePickerClockTemplate,
})

/**
 * Fired when a value of clock is changed.
 *
 * @param { integer } value The new <code>value</code> of the clock.
 * @param { string } stringValue The new <code>value</code> of the clock, as string, zero-prepended when necessary.
 * @param { boolean } finalChange <code>true</code> when a value is selected and confirmed, <code>false</code> when a value is only selected but not confirmed.
 */
@event<TimePickerClockChangeEventDetail>("change", {
	detail: {
		/**
		 * @public
		 */
		value: { type: Integer },
		/**
		 * @public
		 */
		stringValue: { type: String },
		/**
		 * @public
		 */
		finalChange: { type: Boolean },
	},
})

class TimePickerClock extends UI5Element {
	/**
	 * Determines whether the component is displayed as disabled.
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines whether the component is active (visible).
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Minimum item value for the outer circle of the clock.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	itemMin!: number;

	/**
	 * Maximum item value for the outer circle of the clock.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	itemMax!: number;

	/**
	 * If set to <code>true</code>, an inner circle is displayed.
	 * The first item value of the inner circle will be itemMax + 1
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	showInnerCircle!: boolean;

	/**
	 * Label of the clock dial - for example, 'Hours', 'Minutes', or 'Seconds'.
	 *
	 * @default undefined
	 */
	@property({ type: String, defaultValue: undefined })
	label?: string;

	/**
	 * If set to <code>true</code>, a surrounding circle with markers (dots) will be hidden.
	 * (for example, on the 'Minutes' clock-dial, markers represent minutes).
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	hideFractions!: boolean;

	/**
	 * If provided, this will replace the last item displayed. If there is only one (outer) circle,
	 * the last item from outer circle will be replaced; if there is an inner circle too, the last
	 * item of inner circle will be replaced. Usually, the last item '24' is replaced with '0'.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	lastItemReplacement!: number;

	/**
	 * Prepend with zero flag. If <code>true</code>, values less than 10 will be prepend with 0.
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	prependZero!: boolean;

	/**
	 * The currently selected value of the clock.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	selectedValue!: number;

	/**
	 * The step for displaying of one unit of items.
	 * 1 means 1/60 of the circle.
	 * The default display step is 5 which means minutes and seconds are displayed as "0", "5", "10", etc.
	 * For hours the display step must be set to 1.
	 *
	 * @default 5
	 */
	@property({ validator: Integer, defaultValue: 5 })
	displayStep!: number;

	/**
	 * The step for selection of items.
	 * 1 means 1 unit:
	 * - if the clock displays hours - 1 unit = 1 hour
	 * - if the clock displays minutes/seconds - 1 unit = 1 minute/second
	 *
	 * @default 1
	 */
	@property({ validator: Integer, defaultValue: 1 })
	valueStep!: number;

	/**
	 * Defines the currently available Time Picker Clock items depending on Clock setup.
	 */
	@property({ type: Object, multiple: true })
	_items!: Array<TimePickerClockItem>;

	/**
	 * Defines the currently selected Time Picker Clock item.
	 */
	@property({ type: Object })
	_selectedItem!: TimePickerClockSelectedItem;

	/**
	 * Keeps variables used in interaction calculations.
	 */
	@property({ type: Object })
	_dimensionParameters!: TimePickerClockDimensions;

	/**
	 * Mousedown or Touchstart event flag.
	 *
	 * @default false
	 */
	@property({ type: Boolean, noAttribute: true })
	_mouseOrTouchDown!: boolean;

	/**
	 * Cancel Mouseout flag.
	 *
	 * @default false
	 */
	@property({ type: Boolean, noAttribute: true })
	_cancelTouchOut!: boolean;

	/**
	 * Calculated selected value of the clock during interactions.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_selectedValue!: number;

	/**
	 * Selected value of the clock during interactions.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_movSelectedValue!: number;

	/**
	 * Hovered value of the clock during interactions.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_hoveredValue!: number;

	/**
	 * Previously hovered value of the clock during interactions.
	 *
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_prevHoveredValue!: number;

	/**
	 * Animation in progress flag.
	 *
	 * @default false
	 */
	@property({ type: Boolean, noAttribute: true })
	_animationInProgress!: boolean;

	_fnOnMouseOutUp: () => void;

	constructor() {
		super();

		this._fnOnMouseOutUp = () => {
			this._mouseOrTouchDown = false;
		};
	}

	get classes(): ClassMap {
		return <ClassMap>{
			clock: {
				"ui5-tp-clock": true,
				"ui5-tp-clock-inner": this.showInnerCircle,
				"ui5-tp-clock-active": this.active,
			},
		};
	}

	onEnterDOM() {
		document.addEventListener("mouseup", this._fnOnMouseOutUp, false);
	}

	onExitDOM() {
		document.removeEventListener("mouseup", this._fnOnMouseOutUp, false);
	}

	onBeforeRendering() {
		this._prepareClockItems();
		const value: number = this._fixReplacementValue(this.selectedValue);
		this._updateSelectedValueObject(value);
	}

	/**
	 * Returns the real value of the passed clock item, if the replacement must be done, returns the replaced value.
	 *
	 * @param value The value of the clock item
	 * @returns The real/replaced value
	 */
	_fixReplacementValue(value: number): number {
		let realValue = value;
		const maxValue = this.itemMax * (this.showInnerCircle ? 2 : 1);

		if (realValue === 0) {
			realValue = maxValue;
		}
		if (realValue === maxValue && this.lastItemReplacement !== -1) {
			realValue = this.lastItemReplacement;
		}

		return realValue;
	}

	/**
	 * Updates internal selected value object constructed for rendering purposes.
	 *
	 * @param value currently selected value.
	 */
	_updateSelectedValueObject(value: number) {
		if (value === -1) {
			this._selectedItem = {
				showMarker: false,
			};
			return;
		}

		const selectedOuter = (value >= this.itemMin && value <= this.itemMax) || (!this.showInnerCircle && value === this.lastItemReplacement);
		const selectedInner = ((value >= this.itemMin + this.itemMax && value <= this.itemMax * 2) || value === this.lastItemReplacement) && this.showInnerCircle;
		const stepAngle = 360 / (this.itemMax - this.itemMin + 1);
		const innerValue = this.lastItemReplacement === -1 || !this.prependZero ? value.toString() : value.toString().padStart(2, "0");
		let currentAngle: number | undefined = selectedOuter || selectedInner ? value * stepAngle : undefined;

		if (currentAngle !== undefined) {
			currentAngle %= 360;
		}

		this._selectedItem = {
			"angle": currentAngle,
			"item": selectedOuter ? value.toString() : "",
			"innerItem": selectedInner ? innerValue : "",
			"showMarker": selectedOuter || selectedInner,
			"itemClasses": CLOCK_NUMBER_CLASS + (selectedOuter ? ` ${CLOCK_NUMBER_SELECTED_CLASS}` : ""),
			"innerItemClasses": CLOCK_NUMBER_CLASS + (selectedInner ? ` ${CLOCK_NUMBER_SELECTED_CLASS}` : ""),
			"outerStyles": {
				transform: `translate(-50%) rotate(${currentAngle || 0}deg)`,
			},
			"innerStyles": {
				transform: `rotate(-${currentAngle || 0}deg)`,
			},
		};
	}

	/**
	 * Prepares clock items objects according to current clock settings. Item objects are used for rendering purposes.
	 */
	_prepareClockItems() {
		const values = [];
		let displayStep = this.displayStep;
		let item: TimePickerClockItem;
		let valueIndex;
		let i;

		this._items = [];

		for (i = this.itemMin; i <= this.itemMax; i++) {
			values.push({
				"item": i.toString(),
				"innerItem": this.showInnerCircle ? (i + this.itemMax).toString() : undefined,
			});
		}
		if (this.lastItemReplacement !== -1) {
			if (this.showInnerCircle && this.prependZero) {
				values[values.length - 1].innerItem = this.lastItemReplacement.toString().padStart(2, "0");
			} else {
				values[values.length - 1].item = this.lastItemReplacement.toString();
			}
		}

		// determines angle step for values display
		const itemStep = 360 / CLOCK_ANGLE_STEP / values.length;

		// determines step for values display in units
		if (this.valueStep * itemStep > displayStep) {
			displayStep = this.valueStep * itemStep;
		}

		for (i = 1; i <= 60; i++) {
			valueIndex = i / itemStep - 1;
			item = i % displayStep !== 0 ? {} : values[valueIndex];
			item.angle = i * CLOCK_ANGLE_STEP;
			item.outerStyles = {
				transform: `translate(-50%) rotate(${i * 6}deg)`,
			};
			item.innerStyles = {
				transform: `rotate(-${i * 6}deg)`,
			};
			this._items.push(item);
		}
	}

	/**
	 * Returns the DOM Reference of the clock cover element
	 *
	 * @returns the DOM Reference
	 */
	_getClockCoverContainerDomRef(): Element | null | undefined {
		const domRef = this.getDomRef();
		return domRef && domRef.querySelector(".ui5-tp-clock-cover");
	}

	/**
	 * Returns the real max value of clock items, taking in count if there is inner circle or not.
	 *
	 * @returns max value
	 */
	_getMaxValue(): number {
		return this.showInnerCircle ? this.itemMax * 2 : this.itemMax;
	}

	/**
	 * Calculates the outer height of a HTML element.
	 *
	 * @param element The element which outer height to be calculated
	 * @returns Outer height of the passed HTML element
	 */
	_outerHeight(element: HTMLElement): number {
		if (!element) {
			return 0;
		}

		const style = window.getComputedStyle(element);

		return element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
	}

	/**
	 * Returns the Id of the DOM element of the clock item that display specific value.
	 *
	 * @param value The value of the clock item
	 * @returns Id of the clock item element
	 */
	_hoveredId(value: number): string {
		if (value === this._getMaxValue() && this.lastItemReplacement !== -1) {
			value = this.lastItemReplacement;
		}

		const valueString = this.showInnerCircle && value === this.lastItemReplacement && this.prependZero ? value.toString().padStart(2, "0") : value.toString();

		return `#${this._id}-${valueString}`;
	}

	/**
	 * Returns provided value as string. Padding with additional zero is applied if necessary.
	 *
	 * @param value The value that should be returned as string
	 * @returns The value as string
	 */
	_getStringValue(value: number): string {
		return this.prependZero ? value.toString().padStart(2, "0") : value.toString();
	}

	/**
	 * Calculates dimension variables necessary for determining of item selection.
	 *
	 * @returns Dimensions object
	 */
	_calculateDimensions(): TimePickerClockDimensions | undefined {
		const cover = this.getDomRef() as HTMLElement;
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (!cover) {
			return;
		}

		const domRef = this.getDomRef() as HTMLElement;
		const dotElement = domRef.querySelector(`.${CLOCK_MIDDOT_CLASS}`) as HTMLElement;
		const numberElement = domRef.querySelector(`.${CLOCK_NUMBER_CLASS}`) as HTMLElement;
		const radius = Math.round(cover.offsetHeight / 2);
		const dotHeight = this._outerHeight(dotElement);
		const numberHeight = this._outerHeight(numberElement);
		const offset = cover.getBoundingClientRect();

		this._dimensionParameters = {
			"radius": radius,
			"centerX": radius,
			"centerY": radius,
			"dotHeight": dotHeight,
			"numberHeight": numberHeight,
			"outerMax": radius,
			"outerMin": radius - numberHeight,
			"innerMax": radius - numberHeight - 1,
			"innerMin": radius - numberHeight * 2 - 1,
			"offsetX": offset.left + scrollLeft,
			"offsetY": offset.top + scrollTop,
		};
	}

	/**
	 * Calculates selected and hovered values based on click/touch position.
	 *
	 * @param x X position of click/touch returned by the event
	 * @param y Y position of click/touch returned by the event
	 */
	_calculatePosition(x: number, y: number) {
		const dX = x - this._dimensionParameters.offsetX + 1 - this._dimensionParameters.radius;
		const dY = y - this._dimensionParameters.offsetY + 1 - this._dimensionParameters.radius;
		const mod = dX >= 0 ? 0 : 180;
		const angle = ((Math.atan(dY / dX) * 180) / Math.PI) + 90 + mod;
		const angleStep = (360 / this.itemMax) * this.valueStep;
		const radius = Math.sqrt(dX * dX + dY * dY);
		const isOuter = radius <= this._dimensionParameters.outerMax && radius > (this.showInnerCircle ? this._dimensionParameters.outerMin : this._dimensionParameters.innerMin);
		const isInner = this.showInnerCircle && radius <= this._dimensionParameters.innerMax && radius > this._dimensionParameters.innerMin;
		const isOuterHover = radius <= this._dimensionParameters.outerMax && radius > this._dimensionParameters.outerMin;
		const isInnerHover = isInner;
		let finalAngle = Math.round((angle === 0 ? 360 : angle) / angleStep) * angleStep;

		if (finalAngle === 0) {
			finalAngle = 360;
		}

		// selected item calculations
		if (isInner || isOuter) {
			this._selectedValue = (finalAngle / angleStep) * this.valueStep;
			if (isInner) {
				this._selectedValue += this.itemMax;
			}
		} else {
			this._selectedValue = -1;
		}

		// hover simulation calculations
		this._hoveredValue = isInnerHover || isOuterHover ? this._selectedValue : -1;

		if (this._selectedValue === this._getMaxValue() && this.lastItemReplacement !== -1) {
			this._selectedValue = this.lastItemReplacement;
		}
	}

	/**
	 * Does the animation between the old and the new value of the clock. Can be skipped with setting the second parameter to true.
	 *
	 * @param newValue the new value that must be set
	 * @param skipAnimation whether to skip the animation
	 */
	_changeValueAnimation(newValue: number, skipAnimation = false) {
		const maxValue = this.itemMax * (this.showInnerCircle ? 2 : 1);
		let firstSelected = this._movSelectedValue;
		let	lastSelected = newValue;
		let direction = 1;
		let	path1;
		let path2;
		let delay;

		if (!skipAnimation) {
			// do the animation here

			path1 = Math.abs(firstSelected - lastSelected);
			path2 = maxValue - path1;

			if (firstSelected < lastSelected) {
				if (path2 < path1) {
					firstSelected += maxValue;
					direction = -1;
				}
			} else if (path2 < path1) {
				lastSelected += maxValue;
			} else {
				direction = -1;
			}

			delay = firstSelected === lastSelected ? 0 : Math.ceil(ANIMATION_DURATION_MAX / Math.abs(firstSelected - lastSelected));
			this._animationInProgress = true;
			this._selectNextNumber(firstSelected, lastSelected, direction, maxValue, newValue, delay);
		} else {
			this._setSelectedValue(newValue);
		}
	}

	/**
	 * Does the animation step between old and new selected values.
	 *
	 * @param firstSelected first/current value to move from
	 * @param lastSelected last value to move to
	 * @param direction direction of the animation
	 * @param maxValue max clock value
	 * @param newValue new value
	 * @param delay delay of the single step
	 */
	_selectNextNumber(firstSelected: number, lastSelected: number, direction: number, maxValue: number, newValue: number, delay: number) {
		const current = firstSelected > maxValue ? firstSelected - maxValue : firstSelected;

		if (firstSelected === lastSelected) {
			this._animationInProgress = false;
		}
		this._setSelectedValue(current);
		if (firstSelected !== lastSelected) {
			firstSelected += direction;
			setTimeout(() => {
				this._selectNextNumber(firstSelected, lastSelected, direction, maxValue, newValue, delay);
			}, delay);
		} else {
			// the new value is set, fire event
			setTimeout(() => {
				this.fireEvent<TimePickerClockChangeEventDetail>("change", {
					"value": newValue,
					"stringValue": this._getStringValue(newValue),
					"finalChange": true,
				});
			}, ANIMATION_DELAY_EVENT);
		}
	}

	/**
	 * Mousewheel handler. Increases/decreases value of the clock.
	 *
	 * @param increase whether to increase or decrease the value
	 */
	_modifyValue(increase: boolean) {
		let selectedValue = this.selectedValue;
		const replacementValue = this.lastItemReplacement;
		const minValue = this.itemMin;
		const maxValue = this.itemMax * (this.showInnerCircle ? 2 : 1);
		let step = this.valueStep;
		let newValue;

		// fix step in order to change value to the nearest possible if step is > 1
		if (selectedValue % step !== 0) {
			newValue = increase ? Math.ceil(selectedValue / step) * step : Math.floor(selectedValue / step) * step;
			step = Math.abs(selectedValue - newValue);
		}

		if (selectedValue === replacementValue) {
			selectedValue = maxValue;
		}
		if (increase) {
			selectedValue += step;
			if (selectedValue > maxValue) {
				selectedValue -= maxValue;
			}
		} else {
			selectedValue -= step;
			if (selectedValue < minValue) {
				selectedValue = maxValue;
			}
		}

		this._setSelectedValue(selectedValue);
	}

	/**
	 * Sets new selected value, fires change event and updates selected value object used for rendering purposes.
	 *
	 * @param value
	 */
	_setSelectedValue(value: number) {
		const realValue: number = this._fixReplacementValue(value);
		this.selectedValue = realValue;
		this.fireEvent<TimePickerClockChangeEventDetail>("change", {
			"value": realValue,
			"stringValue": this._getStringValue(realValue),
			"finalChange": false,
		});
		this._updateSelectedValueObject(realValue);
	}

	/**
	 * TouchStart/MouseDown event handler.
	 *
	 * @param evt Event object
	 */
	_onTouchStart(evt: Event) {
		this._cancelTouchOut = false;
		if (this.disabled || this._mouseOrTouchDown) {
			return;
		}

		const x = evt.type === "touchstart" ? (evt as TouchEvent).touches[0].pageX : (evt as MouseEvent).pageX;
		const y = evt.type === "touchstart" ? (evt as TouchEvent).touches[0].pageY : (evt as MouseEvent).pageY;

		this._movSelectedValue = this.selectedValue;
		this._calculateDimensions();
		this._calculatePosition(x, y);
		this._mouseOrTouchDown = true;
	}

	/**
	 * TouchMove/MouseMove event handler.
	 *
	 * @param evt Event object
	 */
	_onTouchMove(evt: Event) {
		let	hoveredNumber;
		const domRef = this.getDomRef();

		evt.preventDefault();
		if (this._mouseOrTouchDown) {
			const x = evt.type === "touchmove" ? (evt as TouchEvent).touches[0].pageX : (evt as MouseEvent).pageX;
			const y = evt.type === "touchmove" ? (evt as TouchEvent).touches[0].pageY : (evt as MouseEvent).pageY;
			this._calculatePosition(x, y);
			if (!this.disabled && this._selectedValue !== -1 && this._selectedValue !== this._movSelectedValue) {
				this._setSelectedValue(this._selectedValue);
				this._movSelectedValue = 0 + this._selectedValue;
			}
		} else if (evt.type === "mousemove") {
			if (!this._dimensionParameters.radius) {
				this._calculateDimensions();
			}
			this._calculatePosition((evt as MouseEvent).pageX, (evt as MouseEvent).pageY);
			if (this.displayStep > 1 && this._hoveredValue !== -1) {
				this._hoveredValue = Math.round(this._hoveredValue / this.displayStep) * this.displayStep;
			}

			if (!this.disabled && this._hoveredValue !== this._prevHoveredValue) {
				hoveredNumber = (domRef as HTMLElement).querySelector(this._hoveredId(this._prevHoveredValue));
				hoveredNumber && hoveredNumber.classList.remove(CLOCK_NUMBER_HOVER_CLASS);
				this._prevHoveredValue = this._hoveredValue;
				hoveredNumber = (domRef as HTMLElement).querySelector(this._hoveredId(this._prevHoveredValue));
				hoveredNumber && hoveredNumber.classList.add(CLOCK_NUMBER_HOVER_CLASS);
			}
		}
	}

	/**
	 * TouchEnd/MouseUp event handler.
	 *
	 * @param evt Event object
	 */
	_onTouchEnd(evt: Event) {
		if (!this._mouseOrTouchDown) {
			return;
		}
		this._mouseOrTouchDown = false;
		evt.preventDefault();
		if (this.disabled || this._selectedValue === -1) {
			return;
		}
		if (!this._cancelTouchOut) {
			this._changeValueAnimation(this._selectedValue);
		}
	}

	/**
	 * Mouse Wheel event handler.
	 *
	 * @param evt Event object
	 */
	_onMouseWheel(evt: WheelEvent) {
		const increase = evt.detail ? (evt.detail > 0) : (evt.deltaY > 0 || evt.deltaX > 0);

		evt.preventDefault();
		if (!this._mouseOrTouchDown) {
			this._modifyValue(increase);
		}
	}

	/**
	 * MouseOut event handler.
	 */
	_onMouseOut() {
		const hoveredNumber = (this.getDomRef() as HTMLElement).querySelector(this._hoveredId(this._hoveredValue));

		hoveredNumber && hoveredNumber.classList.remove(CLOCK_NUMBER_HOVER_CLASS);
		this._hoveredValue = -1;
		this._prevHoveredValue = -1;
	}
}

TimePickerClock.define();

export default TimePickerClock;
export type { TimePickerClockChangeEventDetail };
