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
const LONG_TOUCH_DURATION = 1000; // duration for long-touch interaction
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
 * <code>ui5-time-picker-clock</code> is the single clock item to use inside a <code>ui5-time-picker-clocks</code>.
 * <code>ui5-time-picker-clocks</code> is one of the internal controls of <code>ui5-time-picker</code>
 *
 * <h3>Usage</h3>y
 *
 * <code>ui5-time-picker-clock</code> can display hours, minutes or seconds
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TimePickerClock.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimePickerClock
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-time-picker-clock
 * @since 1.??.??
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
 * @event sap.ui.webc.main.TimePickerClock#change
 * @public
 * @param { Integer } value The new <code>value</code> of the clock.
 * @param { string } stringValue The new <code>value</code> of the clock, as string, zero-prepended when necessary.
 * @param { Boolean } finalChange <code>true</code> when a value is selected and confirmed, <code>false</code> when a value is only selected but not confirmed.
 */
@event("change", {
	detail: {
		value: { type: Integer },
		stringValue: { type: String },
		finalChange: { type: Boolean },
	},
})

class TimePickerClock extends UI5Element {
	/**
	 * Determines whether the component is displayed as disabled.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.disabled
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines whether the component is active (visible).
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.active
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Minimum item value for the outer circle of the clock.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.itemMin
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	itemMin!: number;

	/**
	 * Maximum item value for the outer circle of the clock.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.itemMax
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	itemMax!: number;

	/**
	 * If set to <code>true</code>, an inner circle is displayed.
	 * The first item value of the inner circle will be itemMax + 1
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.innerItems
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	innerItems!: boolean;

	/**
	 * Label of the clock dial - for example, 'Hours', 'Minutes', or 'Seconds'.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.label
	 * @type {String}
	 * @defaultvalue undefined
	 * @public
	 */
	@property({ type: String, defaultValue: undefined })
	label?: string;

	/**
	 * If set to <code>true</code>, a surrounding circle with markers (dots) will be hidden.
	 * (for example, on the 'Minutes' clock-dial, markers represent minutes).
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.hideFractions
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideFractions!: boolean;

	/**
	 * If provided, this will replace the last item displayed. If there is only one (outer) circle,
	 * the last item from outer circle will be replaced; if there is an inner circle too, the last
	 * item of inner circle will be replaced. Usually, the last item '24' is replaced with '0'.
	 * Do not replace the last item if <code>support2400</code> is set to <code>true</code>.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.lastItemReplacement
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	lastItemReplacement!: number;

	/**
	 * Prepend with zero flag. If <code>true</code>, values less than 10 will be prepend with 0.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.prependZero
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	prependZero!: boolean;

	/**
	 * The currently selected value of the clock.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.selectedValue
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	selectedValue!: number;

	/**
	 * The step for displaying of one unit of items.
	 * 1 means 1/60 of the circle.
	 * The default display step is 5 which means minutes and seconds are displayed as "0", "5", "10", etc.
	 * For hours the display step must be set to 1.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.displayStep
	 * @type {Integer}
	 * @defaultvalue 5
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 5 })
	displayStep!: number;

	/**
	 * The step for selection of items.
	 * 1 means 1 unit:
	 * - if the clock displays hours - 1 unit = 1 hour
	 * - if the clock displays minutes/seconds - 1 unit = 1 minute/second
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.valueStep
	 * @type {Integer}
	 * @defaultvalue 1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	valueStep!: number;

	/**
	 * Allows to set a value of 24:00, used to indicate the end of the day.
	 * Works only with HH or H formats. Don't use it together with am/pm.
	 *
	 * When this property is set to <code>true</code>, the clock can display either 24 or 00 as last hour.
	 * The change between 24 and 00 (and vice versa) can be done as follows:
	 *
	 * - on a desktop device: hold down the <code>Ctrl</code> key (this changes 24 to 00 and vice versa), and either
	 * click with mouse on the 00/24 number, or navigate to this value using Arrow keys/PageUp/PageDown and press
	 * <code>Space</code> key (Space key selects the highlighted value and switch to the next available clock).
	 *
	 * - on mobile/touch device: make a long touch on 24/00 value - this action toggles the value to the opposite one.
	 *
	 * - on both device types, if there is a keyboard attached: 24 or 00 can be typed directly.
	 *
	 * <b>Note:</b> Don't use it together with am/pm.
	 *
	 * @name sap.ui.webc.main.TimePickerClock.prototype.support2400
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	support2400!: boolean;

	/**
	 * Defines the currently available Time Picker Clock items depending on Clock setup.
	 *
	 * @type {Array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_items!: Array<TimePickerClockItem>;

	/**
	 * Defines the currently selected Time Picker Clock item.
	 *
	 * @type {TimePickerClockSelectedItem}
	 * @private
	 */
	@property({ type: Object })
	_selectedItem!: TimePickerClockSelectedItem;

	/**
	 * Keeps variables used in interaction calculations.
	 *
	 * @type {TimePickerClockDimensions}
	 * @private
	 */
	@property({ type: Object })
	_dimensionParameters!: TimePickerClockDimensions;

	/**
	 * Mousedown or Touchstart event flag.
	 *
	 * @type {Boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_mouseOrTouchDown!: boolean;

	/**
	 * Cancel Mouseout flag.
	 *
	 * @type {Boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_cancelTouchOut!: boolean;

	/**
	 * Visibility of '24' on Hours clock flag.
	 *
	 * @type {Boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_is24HoursVisible!: boolean;

	/**
	 * Calculated selected value of the clock during interactions.
	 *
	 * @type {Integer}
	 * @defaultvalue -1
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_selectedValue!: number;

	/**
	 * Selected value of the clock during interactions.
	 *
	 * @type {Integer}
	 * @defaultvalue -1
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_movSelectedValue!: number;

	/**
	 * Hovered value of the clock during interactions.
	 *
	 * @type {Integer}
	 * @defaultvalue -1
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_hoveredValue!: number;

	/**
	 * Previously hovered value of the clock during interactions.
	 *
	 * @type {Integer}
	 * @defaultvalue -1
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_prevHoveredValue!: number;

	/**
	 * Animation in progress flag.
	 *
	 * @type {Boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_animationInProgress!: boolean;

	/**
	 * Stores the ID of the long touch timeout.
	 *
	 * @type {Integer}
	 * @defaultvalue -1
	 * @private
	 */
	@property({ validator: Integer, defaultValue: -1, noAttribute: true })
	_longTouchId!: number;

	constructor() {
		super();
		// attach global event
		document.addEventListener("mouseup", this._onMouseOutUp.bind(this), false);
	}

	get classes(): ClassMap {
		return <ClassMap>{
			clock: {
				"ui5-tp-clock": true,
				"ui5-tp-clock-inner": this.innerItems,
				"ui5-tp-clock-active": this.active,
			},
		};
	}

	onBeforeRendering() {
		this._prepareClockItems();
		const value: number = this._fixReplacementValue(this.selectedValue);
		this._updateSelectedValueObject(value);
	}

	/**
	 * Returns the real value of the passed clock item, if the replacement must be done, returns the replaced value.
	 *
	 * @param {number} value The value of the clock item
	 * @returns {number} The real/replaced value
	 * @private
	 */
	_fixReplacementValue(value: number) {
		let realValue = value;
		const maxValue = this.itemMax * (this.innerItems ? 2 : 1);

		if (!this.support2400)	{
			if (realValue === 0) {
				realValue = maxValue;
			}
			if (realValue === maxValue && this.lastItemReplacement !== -1) {
				realValue = this.lastItemReplacement;
			}
		}

		return realValue;
	}

	/**
	 * Updates internal selected value object constructed for rendering purposes.
	 *
	 * @param {number} value currently selected value.
	 * @private
	 */
	_updateSelectedValueObject(value: number) {
		if (value === -1) {
			this._selectedItem = {
				showMarker: false,
			};
			return;
		}

		const selectedOuter = (value >= this.itemMin && value <= this.itemMax) || (!this.innerItems && value === this.lastItemReplacement);
		const selectedInner = ((value >= this.itemMin + this.itemMax && value <= this.itemMax * 2) || value === this.lastItemReplacement) && this.innerItems;
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
		};
	}

	/**
	 * Prepares clock items objects according to current clock settings. Item objects are used for rendering purposes.
	 *
	 * @private
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
				"innerItem": this.innerItems ? (i + this.itemMax).toString() : undefined,
			});
		}

		if (this.lastItemReplacement !== -1) {
			if (this.innerItems && this.prependZero) {
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
			if (i % displayStep !== 0) {
				item = {};
			} else {
				item = values[valueIndex];
			}
			item.angle = i * CLOCK_ANGLE_STEP;
			this._items.push(item);
		}
	}

	/**
	 * Returns the DOM Reference of the clock cover element
	 *
	 * @returns {HTMLElement} the DOM Reference
	 * @private
	 */
	_getClockCoverContainerDomRef() {
		const domRef = this.getDomRef();
		return domRef && domRef.querySelector(".ui5-tp-clock-cover");
	}

	/**
	 * Returns the real max value of clock items, taking in count if there is inner circle or not.
	 *
	 * @returns {number} max value
	 * @private
	 */
	_getMaxValue() {
		return this.innerItems ? this.itemMax * 2 : this.itemMax;
	}

	/**
	 * Returns the visibility of '24' hour value as a last clock item.
	 *
	 * @returns {boolean} Visibility of the '24' hour value
	 * @private
	 */
	_get24HoursVisible() {
		return this.support2400 ? this._is24HoursVisible : false;
	}

	/**
	 * Sets the visibility of '24' hour
	 *
	 * @param {boolean} isVisible visibility of the '24' hour item.
	 * @private
	 */
	_set24HoursVisible(isVisible: boolean) {
		if (this.support2400) {
			this._is24HoursVisible = isVisible;
			this.lastItemReplacement = isVisible ? 24 : 0;
		} else {
			this._is24HoursVisible = false;
		}
	}

	/**
	 * Calculates the outer height of a HTML element.
	 *
	 * @param {HTMLElement} element The element which outer height to be calculated
	 * @returns {number} Outer height of the passed HTML element
	 * @private
	 */
	_outerHeight(element: HTMLElement) {
		if (!element) {
			return 0;
		}

		const style = window.getComputedStyle(element);
		return element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
	}

	/**
	 * Returns the Id of the DOM element of the clock item that display specific value.
	 *
	 * @param {number} value The value of the clock item
	 * @returns {string} Id of the clock item element
	 * @private
	 */
	_hoveredId(value: number) {
		if (value === this._getMaxValue() && this.lastItemReplacement !== -1) {
			value = this.lastItemReplacement;
		}
		const valueString = this.innerItems && value === this.lastItemReplacement && this.prependZero ? value.toString().padStart(2, "0") : value.toString();
		return `#${this._id}-${valueString}`;
	}

	/**
	 * Returns provided value as string. Padding with additional zero is applied if necessary.
	 *
	 * @param {number} value The value that should be returned as string
	 * @returns {string} The value as string
	 */
	_getStringValue(value: number) {
		return this.prependZero ? value.toString().padStart(2, "0") : value.toString();
	}

	/**
	 * Calculates dimension variables necessary for determining of item selection.
	 *
	 * @returns {TimePickerClockDimensions} Dimensions object
	 * @private
	 */
	_calculateDimensions() {
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
	 * @param {number} x X position of click/touch returned by the event
	 * @param {number} y Y position of click/touch returned by the event
	 * @private
	 */
	_calculatePosition(x: number, y: number) {
		const dX = x - this._dimensionParameters.offsetX + 1 - this._dimensionParameters.radius;
		const dY = y - this._dimensionParameters.offsetY + 1 - this._dimensionParameters.radius;
		const mod = dX >= 0 ? 0 : 180;
		const angle = ((Math.atan(dY / dX) * 180) / Math.PI) + 90 + mod;
		const angleStep = (360 / this.itemMax) * this.valueStep;
		const radius = Math.sqrt(dX * dX + dY * dY);
		const isOuter = radius <= this._dimensionParameters.outerMax && radius > (this.innerItems ? this._dimensionParameters.outerMin : this._dimensionParameters.innerMin);
		const isInner = this.innerItems && radius <= this._dimensionParameters.innerMax && radius > this._dimensionParameters.innerMin;
		const isOuterHover = radius <= this._dimensionParameters.outerMax && radius > this._dimensionParameters.outerMin;
		const isInnerHover = isInner;
		const is24HoursVisible = this._get24HoursVisible();
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
			if (this.support2400 && !is24HoursVisible && this._selectedValue === 24) {
				this._selectedValue = 0;
			}
		} else {
			this._selectedValue = -1;
		}

		// hover simulation calculations
		if (isInnerHover || isOuterHover) {
			this._hoveredValue = this.support2400 && !is24HoursVisible && this._selectedValue === 0 ? 24 : this._selectedValue;
		} else {
			this._hoveredValue = -1;
		}

		if (this._selectedValue === this._getMaxValue() && this.lastItemReplacement !== -1) {
			this._selectedValue = this.lastItemReplacement;
		}
	}

	/**
	 * Clears the currently existing long touch period and starts new one if requested.
	 *
	 * @private
	 */
	_resetLongTouch() {
		if (this._longTouchId !== -1) {
			clearTimeout(this._longTouchId);
		}
	}

	/**
	 * Starts new long touch period.
	 *
	 * @private
	 */
	_startLongTouch() {
		this._longTouchId = window.setTimeout(() => {
			const value = this._selectedValue;
			this._longTouchId = -1;
			if (value === 0 || value === 24) {
				this._toggle2400();
			}
		}, LONG_TOUCH_DURATION);
	}

	/**
	 * Does the animation between the old and the new value of the clock. Can be skipped with setting the second parameter to true.
	 *
	 * @param {number} newValue the new value that must be set
	 * @param {boolean} skipAnimation whether to skip the animation
	 * @private
	 */
	_changeValueAnimation(newValue: number, skipAnimation = false) {
		const maxValue = this.itemMax * (this.innerItems ? 2 : 1);
		let firstSelected = this._movSelectedValue;
		let	lastSelected = newValue;
		let direction = 1;
		let	path1;
		let path2;
		let delay;

		if (!skipAnimation) {
			// do the animation here
			if (firstSelected < lastSelected) {
				path1 = lastSelected - firstSelected;
				path2 = maxValue - path1;
				if (path2 < path1) {
					firstSelected += maxValue;
					direction = -1;
				}
			} else {
				path1 = firstSelected - lastSelected;
				path2 = maxValue - path1;
				if (path2 < path1) {
					lastSelected += maxValue;
				} else {
					direction = -1;
				}
			}

			if (firstSelected === lastSelected) {
				delay = 0;
			} else {
				delay = Math.ceil(ANIMATION_DURATION_MAX / Math.abs(firstSelected - lastSelected));
			}
			this._animationInProgress = true;
			this._selectNextNumber(firstSelected, lastSelected, direction, maxValue, newValue, delay);
		} else {
			this._setSelectedValue(newValue);
		}
	}

	/**
	 * Does the animation step between old and new selected values.
	 *
	 * @param {number} firstSelected first/current value to move from
	 * @param {number} lastSelected last value to move to
	 * @param {number} direction direction of the animation
	 * @param {number} maxValue max clock value
	 * @param {number} newValue new value
	 * @param {number} delay delay of the single step
	 * @private
	 */
	_selectNextNumber(firstSelected: number, lastSelected: number, direction: number, maxValue: number, newValue: number, delay: number) {
		let current;
		const is24HoursVisible = this._get24HoursVisible();

		if (firstSelected === lastSelected) {
			this._animationInProgress = false;
		}

		current = firstSelected > maxValue ? firstSelected - maxValue : firstSelected;
		if (this.support2400) {
			if (current === 24 && !is24HoursVisible) {
				current = 0;
			} else if (current === 0 && is24HoursVisible) {
				current = 24;
			}
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
	 * @param {boolean} increase whether to increase or decrease the value
	 * @private
	 */
	_modifyValue(increase: boolean) {
		let selectedValue: number = this.selectedValue;
		let	replacementValue: number = this.lastItemReplacement;
		let	minValue: number = this.itemMin;
		let	maxValue: number = this.itemMax * (this.innerItems ? 2 : 1);
		let	step: number = this.valueStep;
		let	newValue: number;

		// fix step in order to change value to the nearest possible if step is > 1
		if (selectedValue % step !== 0) {
			newValue = increase ? Math.ceil(selectedValue / step) * step : Math.floor(selectedValue / step) * step;
			step = Math.abs(selectedValue - newValue);
		}

		if (this.support2400 && !this._get24HoursVisible()) {
			minValue = 0;
			maxValue = 23;
			replacementValue = -1;
		}

		if (selectedValue === replacementValue) {
			selectedValue = maxValue;
		}
		if (increase) {
			selectedValue += step;
			if (selectedValue > maxValue) {
				selectedValue = this.support2400 ? minValue : selectedValue - maxValue;
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
	 * @param {number} value
	 * @private
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
	 * Toggles 24 and 0 values when a clock has <code>support2400</code> property set.
	 *
	 * @param {boolean} skipSelection Whether to skip the setting of the toggled value
	 * @returns {this} the clock object for chaining
	 * @private
	 */
	_toggle2400(skipSelection = false) {
		const bIs24HoursVisible: boolean = this._get24HoursVisible();
		const value: number = bIs24HoursVisible ? 0 : 24;

		this._cancelTouchOut = true;
		this._set24HoursVisible(!bIs24HoursVisible);
		this.lastItemReplacement = value;
		if (!skipSelection) {
			this._movSelectedValue = value;
			this._setSelectedValue(value);
		}

		return this;
	}

	/**
	 * TouchStart/MouseDown event handler.
	 *
	 * @param {event} evt Event object
	 * @private
	 */
	_onTouchStart(evt: Event) {
		this._cancelTouchOut = false;

		if (this.disabled || this._mouseOrTouchDown) {
			return;
		}

		const x = evt.type === "touchstart" ? (evt as TouchEvent).touches[0].pageX : (evt as MouseEvent).pageX;
		const y = evt.type === "touchstart" ? (evt as TouchEvent).touches[0].pageY : (evt as MouseEvent).pageY;
		// console.warn(x, y);

		this._movSelectedValue = this.selectedValue;
		this._calculateDimensions();
		this._calculatePosition(x, y);

		if (this.support2400 && evt.type === "touchstart" && (this._selectedValue === 24 || this._selectedValue === 0)) {
			this._resetLongTouch();
			this._startLongTouch();
		}
		this._mouseOrTouchDown = true;
	}

	/**
	 * TouchMove/MouseMove event handler.
	 *
	 * @param {event} evt Event object
	 * @private
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
				if (this.support2400 && evt.type === "touchmove" && (this._selectedValue === 24 || this._selectedValue === 0)) {
					this._resetLongTouch();
					this._startLongTouch();
				}
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
	 * @param {event} evt Event object
	 * @private
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

		if (evt.type === "touchend") {
			this._resetLongTouch();
		}

		if (!this._cancelTouchOut) {
			this._changeValueAnimation(this._selectedValue);
		}
	}

	/**
	 * Mouse Wheel event handler.
	 *
	 * @param {WheelEvent} evt Event object
	 * @private
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
	 *
	 * @private
	 */
	_onMouseOut() {
		const hoveredNumber = (this.getDomRef() as HTMLElement).querySelector(this._hoveredId(this._hoveredValue));

		hoveredNumber && hoveredNumber.classList.remove(CLOCK_NUMBER_HOVER_CLASS);
		this._hoveredValue = -1;
		this._prevHoveredValue = -1;
	}

	/**
	 * MouseUp event handler on document level.
	 *
	 * @private
	 */
	_onMouseOutUp() {
		this._mouseOrTouchDown = false;
	}
}

TimePickerClock.define();

export default TimePickerClock;
export type { TimePickerClockChangeEventDetail };
