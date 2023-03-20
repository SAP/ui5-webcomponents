import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import TimePickerClockTemplate from "./generated/templates/TimePickerClockTemplate.lit.js";

// Styles
import TimePickerClockCss from "./generated/themes/TimePickerClock.css.js";

type TimePickerClockItem = {
	angle?: number,
	item?: string,
	innerItem?: string,
}

type TimePickerClockSelection = {
	showMarker: boolean,
	itemClasses: string,
	innerItemClasses: string,
}

type TimePickerClockSelectedItem = TimePickerClockItem & TimePickerClockSelection;

const CLOCK_ANGLE_STEP = 6;

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
 * @public
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
	 * @name sap.ui.webc.main.TimePickerClock.prototype.support2400
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	support2400!: boolean;

	/**
	 * Defines the currently available Time Picker Clock items depending on Clock setup.
	 * @type {array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_items!: Array<TimePickerClockItem>;

	/**
	 * Defines the currently selected Time Picker Clock item.
	 * @type {TimePickerClockSelectedItem}
	 * @private
	 */
	@property({ type: Object })
	_selectedItem!: TimePickerClockSelectedItem;

	// constructor() {
	// 	super();

	// 	// this._onMouseWheel = this._onMouseWheel.bind(this);
	// 	// this._iHoveredValue = -1;
	// 	// this._iPrevHoveredValue = -1;
	// }

	get classes() {
		return {
			clock: {
				"ui5-tp-clock": true,
				"ui5-tp-clock-inner": this.innerItems,
				"ui5-tp-clock-active": true,
			},
		};
	}

	onBeforeRendering() {
		this._prepareClockItems();
//		this.selectItem(12);
	}

	selectItem(value: number) {
		const selectedOuter = (value >= this.itemMin && value <= this.itemMax) || (!this.innerItems && value === this.lastItemReplacement);
		const selectedInner = ((value >= this.itemMin + this.itemMax && value <= this.itemMax * 2) || value === this.lastItemReplacement) && this.innerItems;
		const stepAngle = 360 / (this.itemMax - this.itemMin + 1);
		let angle: number | undefined = selectedOuter || selectedInner ? value * stepAngle : undefined;

		if (angle !== undefined) {
			angle = angle % 360;
		}

		this._selectedItem = {
			angle: angle,
			item: selectedOuter ? value.toString() : "",
			innerItem: selectedInner ? value.toString() : "",
			showMarker: selectedOuter || selectedInner,
			itemClasses: "ui5-tp-clock-number" + (selectedOuter ? " ui5-tp-clock-selected" : ""),
			innerItemClasses: "ui5-tp-clock-number" + (selectedInner ? " ui5-tp-clock-selected" : ""),
		}

	}

	_prepareClockItems() {
		let values = [];
		let displayStep = this.displayStep;
		let item: TimePickerClockItem;
		let itemStep;
		let valueIndex;
		let i;

		this._items = [];

		for (i = this.itemMin; i <= this.itemMax; i++) {
			values.push({
				item: i.toString(),
				innerItem: this.innerItems ? (i + this.itemMax).toString() : undefined,
			});
		}

		if (this.lastItemReplacement !== -1) {
			if (this.innerItems) {
				values[values.length - 1].innerItem = this.lastItemReplacement.toString().padStart(2, "0");
			} else {
				values[values.length - 1].item = this.lastItemReplacement.toString();
			}
		}

		// determines angle step for values display
		itemStep = 360 / CLOCK_ANGLE_STEP / values.length;
		// determines step for values display in units
		if (this.valueStep * itemStep > displayStep) {
			displayStep = this.valueStep * itemStep;
		}

		for (let i = 1; i <= 60; i++) {
			valueIndex = i / itemStep - 1;
			if (i % displayStep !== 0) {
				item = {};
			} else {
				item = values[valueIndex];
			}
			item.angle = i * CLOCK_ANGLE_STEP;
			this._items.push(item);
		}

		console.table(values);
		console.table(this._items);
	}
}

TimePickerClock.define();

export default TimePickerClock;
