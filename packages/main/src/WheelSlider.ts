import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isDown,
	isUp,
	isPageUp,
	isPageDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
import "@ui5/webcomponents-icons/dist/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import WheelSliderTemplate from "./generated/templates/WheelSliderTemplate.lit.js";
import Button from "./Button.js";

// Styles
import WheelSliderCss from "./generated/themes/WheelSlider.css.js";

const CELL_SIZE_COMPACT = 32;
const CELL_SIZE_COZY = 46;

type WheelSliderSelectEventDetail = { value: string }

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <h3>Usage</h3>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/WheelSlider.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.WheelSlider
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-wheelslider
 * @public
 * @since 1.0.0-rc.6
 */
@customElement("ui5-wheelslider")

/**
 *  Fires when new value is selected.
 */
@event("select", {
	detail: {
		value: {
			type: String,
		},
	},
})

/**
 * Fires when the wheel slider is expanded.
 */
@event("expand")

/**
 * Fires when the wheel slider is collapsed.
 */
@event("collapse")
class WheelSlider extends UI5Element {
	/**
	 * Defines whether the component is disabled
	 * (default is set to <code>false</code>).
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.WheelSlider.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the currently selected value
	 * @type {string}
	 * @name sap.ui.webc.main.WheelSlider.prototype.value
	 * @defaultvalue ""
	 * @public
	 */
	@property({ defaultValue: "0" })
	value!: string;

	/**
	 * Defines the label of the wheelslider.
	 * @type {string}
	 * @name sap.ui.webc.main.WheelSlider.prototype.label
	 * @defaultvalue ""
	 * @public
	 */
	@property({ defaultValue: "" })
	label!: string;

	/**
	 * Indicates if the wheelslider is expanded.
	 * @type {boolean}
	 * @name sap.ui.webc.main.WheelSlider.prototype.expanded
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	expanded!: boolean;

	/**
	 * Indicates if the wheelslider has a cyclic behaviour.
	 * @type {boolean}
	 * @name sap.ui.webc.main.WheelSlider.prototype.cyclic
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	cyclic!: boolean;

	@property({ multiple: true, compareValues: true })
	_items!: Array<string>;

	@property({ type: Object, multiple: true })
	_itemsToShow!: Array<{
		value: string,
		selected: boolean,
	}>;

	_currentElementIndex: number;
	_scroller: ScrollEnablement;
	_prevWheelTimestamp?: number;

	static get render() {
		return litRender;
	}

	static get styles() {
		return WheelSliderCss;
	}

	static get template() {
		return WheelSliderTemplate;
	}

	constructor() {
		super();
		this._currentElementIndex = 0;
		this._itemsToShow = [];
		this._scroller = new ScrollEnablement(this);
		this._scroller.attachEvent("scroll", this._updateScrolling.bind(this));
		this._scroller.attachEvent("mouseup", this._handleScrollTouchEnd.bind(this));
		this._scroller.attachEvent("touchend", this._handleScrollTouchEnd.bind(this));
	}

	onBeforeRendering() {
		if (!this.expanded && this.cyclic) {
			const index = this._currentElementIndex % this._items.length;
			this._currentElementIndex = (this._timesMultipliedOnCyclic() / 2) * this._items.length + index;
		}

		if (!this.value) {
			this.value = this._items[0];
		}

		this._buildItemsToShow();
	}

	static get dependencies() {
		return [Button];
	}

	onAfterRendering() {
		if (!this._scroller.scrollContainer) {
			this._scroller.scrollContainer = this.shadowRoot!.querySelector(`#${this._id}--wrapper`)!;
		}

		if (!this.expanded) {
			this._scroller.scrollTo(0, 0);
		}

		if (this.expanded) {
			const elements = this.shadowRoot!.querySelectorAll(".ui5-wheelslider-item");
			for (let i = 0; i < elements.length; i++) {
				const el = elements[i] as HTMLElement;
				if (el.textContent === this.value) {
					this._selectElementByIndex(Number(el.dataset.itemIndex) + this._getCurrentRepetition() * this._items.length);
					return true;
				}
			}

			this._selectElement(elements[0] as HTMLElement);
		}
	}

	get classes() {
		return {
			root: {
				"ui5-wheelslider-root": true,
				"ui5-phone": isPhone(),
			},
		};
	}

	expandSlider() {
		this.expanded = true;
		this.fireEvent("expand", {});
	}

	collapseSlider() {
		this.expanded = false;
		this.fireEvent("collapse", {});
	}

	get _itemCellHeight() {
		const defaultSize = getEffectiveContentDensity(document.body) === "compact" ? CELL_SIZE_COMPACT : CELL_SIZE_COZY;

		if (this.shadowRoot!.querySelectorAll(".ui5-wheelslider-item").length) {
			const itemComputedStyle = getComputedStyle(this.shadowRoot!.querySelector(".ui5-wheelslider-item")!);
			const itemHeightValue = itemComputedStyle.getPropertyValue("--_ui5_wheelslider_item_height");
			const onlyDigitsValue = itemHeightValue.replace("px", "");
			return Number(onlyDigitsValue) || defaultSize;
		}

		return defaultSize;
	}

	_updateScrolling() {
		const cellSizeInPx = this._itemCellHeight,
			scrollWhere = this._scroller.scrollContainer.scrollTop;
		let offsetIndex;

		if (!scrollWhere) {
			return;
		}

		offsetIndex = Math.round(scrollWhere / cellSizeInPx);

		if (this.value === this._itemsToShow[offsetIndex].value) {
			return;
		}

		if (this.cyclic) {
			const newIndex = this._handleArrayBorderReached(offsetIndex);
			if (offsetIndex !== newIndex) {
				offsetIndex = newIndex;
			}
		}

		this.value = this._itemsToShow[offsetIndex].value;
		this._currentElementIndex = offsetIndex;
	}

	_handleScrollTouchEnd() {
		if (this.expanded) {
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_selectElement(element: HTMLElement) {
		if (element && element.textContent && this._items.indexOf(element.textContent) > -1) {
			this._currentElementIndex = Number(element.dataset.itemIndex);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_getCurrentRepetition() {
		if (this._currentElementIndex) {
			return Math.floor(this._currentElementIndex / this._items.length);
		}

		return 0;
	}

	_selectElementByIndex(currentIndex: number) {
		let index = currentIndex;
		const itemsCount = this._itemsToShow.length;
		const cellSizeInPx = this._itemCellHeight;
		const scrollBy = cellSizeInPx * index;

		if (this.cyclic) {
			index = this._handleArrayBorderReached(index);
		}

		if (index < itemsCount && index > -1) {
			this._scroller.scrollTo(0, scrollBy, 5, 100); // sometimes the container isn't painted yet so retry 5 times (although it succeeds on the 1st)
			this._currentElementIndex = index;
			this.value = this._items[index - (this._getCurrentRepetition() * this._items.length)];
			this.fireEvent("select", { value: this.value });
		}
	}

	_timesMultipliedOnCyclic() {
		const minElementsInCyclicWheelSlider = 70;
		const repetitionCount = Math.round(minElementsInCyclicWheelSlider / this._items.length);
		const minRepetitionCount = 3;

		return Math.max(minRepetitionCount, repetitionCount);
	}

	_buildItemsToShow() {
		let itemsToShow = this._items;
		if (this.cyclic) {
			if (itemsToShow.length < this._items.length * this._timesMultipliedOnCyclic()) {
				for (let i = 0; i < this._timesMultipliedOnCyclic(); i++) {
					itemsToShow = itemsToShow.concat(this._items);
				}
			}
		}

		this._itemsToShow = itemsToShow.map(value => {
			return {
				value,
				"selected": (value === this.value),
			};
		});
	}

	_handleArrayBorderReached(currentIndex: number) {
		const arrayLength = this._itemsToShow.length;
		const maxVisibleElementsOnOneSide = 7;
		let index = currentIndex;

		if (maxVisibleElementsOnOneSide > index) {
			index += this._items.length * 2;
		} else if (index > arrayLength - maxVisibleElementsOnOneSide) {
			index -= this._items.length * 2;
		}

		return index;
	}

	/**
	 *
	 * @param {event} e Wheel Event
	 * @private
	 *
	 * The listener for this event can't be passive as it calls preventDefault()
	 */
	_handleWheel(e: WheelEvent) {
		if (!e) {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if (e.timeStamp === this._prevWheelTimestamp || !this.expanded) {
			return;
		}

		if (e.deltaY > 0) {
			this._itemUp();
		} else if (e.deltaY < 0) {
			this._itemDown();
		}

		this._prevWheelTimestamp = e.timeStamp;
	}

	_onclick(e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (!target.classList.contains("ui5-wheelslider-item")) {
			return;
		}

		if (this.expanded) {
			this.value = target.textContent || "";
			this._selectElement(target);
			this.fireEvent("select", { value: this.value });
		} else {
			this.expanded = true;
		}
	}

	_onArrowDown(e: KeyboardEvent) {
		e.preventDefault();
		this._itemDown();
	}

	_onArrowUp(e: KeyboardEvent) {
		e.preventDefault();
		this._itemUp();
	}

	_itemDown() {
		const nextElementIndex = this._currentElementIndex + 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_itemUp() {
		const nextElementIndex = this._currentElementIndex - 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this.expanded) {
			return;
		}

		if (isUp(e)) {
			this._onArrowUp(e);
		}

		if (isDown(e)) {
			this._onArrowDown(e);
		}

		if (isPageDown(e)) {
			this._selectLimitCell(e, false);
		}

		if (isPageUp(e)) {
			this._selectLimitCell(e, true);
		}
	}

	_selectLimitCell(e: KeyboardEvent, isMax: boolean) {
		e.preventDefault();
		const intexIncrease = this.cyclic ? this._items.length : 0;
		if (isMax) {
			this._selectElementByIndex(this._items.length - 1 + intexIncrease);
		} else {
			this._selectElementByIndex(intexIncrease);
		}
	}
}

WheelSlider.define();

export default WheelSlider;
export type { WheelSliderSelectEventDetail };
