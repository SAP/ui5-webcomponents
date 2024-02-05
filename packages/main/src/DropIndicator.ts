import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import DropPlacement from "./types/DropPlacement.js";
import Orientation from "./types/Orientation.js";

import DropIndicatorTemplate from "./generated/templates/DropIndicatorTemplate.lit.js";

// Styles
import DropIndicatorCss from "./generated/themes/DropIndicator.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-drop-indicator</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/DropIndicator.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-drop-indicator",
	renderer: litRender,
	styles: DropIndicatorCss,
	template: DropIndicatorTemplate,
	dependencies: [],
})
class DropIndicator extends UI5Element {
	/**
	 * Defines the placement of the indicator relative to the item.
	 *
	 * @default "Before"
	 * @public
	 */
	@property({ type: DropPlacement, defaultValue: DropPlacement.Before })
	placement!: `${DropPlacement}`;

	/**
	 * Defines the placement of the indicator relative to the item.
	 *
	 * @default "Vertical"
	 * @public
	 */
	@property({ type: Orientation, defaultValue: Orientation.Vertical })
	orientation!: `${Orientation}`;

	/**
	 * Defines the id of the element where the drop indicator will be shown.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	target!: string;

	/**
	 * Defines the id of the element where the drop indicator will be shown.
	 *
	 * @default ""
	 * @public
	 */
	@property({ validator: Integer, defaultValue: Number.POSITIVE_INFINITY })
	maxNestingLevel!: number;

	@property({ type: Object, defaultValue: undefined })
	_owner!: Node;

	// /**
	//  * Sets the position of the indicator.
	//  *
	//  * @private
	//  */
	// @property({ validator: Integer, defaultValue: 0, noAttribute: true })
	// position!: number;

	get _positionProperty() {
		if (this.orientation === Orientation.Vertical) {
			return "left";
		}

		return "top";
	}

	constructor() {
		super();

		this.hide();
	}

	onAfterRendering() {
		if (!this.target) {
			return;
		}

		const container = this._owner as HTMLElement;
		const element = container.querySelector(`[id="${this.target}"`);
		if (!element) {
			return;
		}

		const {
			left, width, right, top, bottom, height,
		} = element.getBoundingClientRect();

		const {
			top: containerTop,
		} = container.getBoundingClientRect();

		let position = 0;
		const style = {
			[this._positionProperty]: "",
			width: "",
			height: "",
		};

		if (this.orientation === Orientation.Vertical) {
			switch (this.placement) {
			case DropPlacement.Before:
				position = left;
				break;
			case DropPlacement.On:
				style.width = `${width}px`;
				position = left;
				break;
			case DropPlacement.After:
				position = right;
				break;
			}
		}

		if (this.orientation === Orientation.Horizontal) {
			switch (this.placement) {
			case DropPlacement.Before:
				position = top;
				break;
			case DropPlacement.On:
				style.height = `${height}px`;
				position = top;
				break;
			case DropPlacement.After:
				position = bottom;
				break;
			}

			position -= containerTop;
		}

		style[this._positionProperty] = `${position}px`;
		style.height = `${height}px`;
		style.width = `${width}px`;

		Object.assign(this.style, style);
	}

	hide() {
		// eslint-disable-next-line no-warning-comments
		// TODO: properly hide the indicator if it doesn't have target
		this.style.display = "none";
	}

	show() {
		this.style.display = "";
	}

	get classes() {
		return {
			root: {
				"ui5-di-rect": this.placement === DropPlacement.On,
				"ui5-di-needle": this.placement !== DropPlacement.On,
			},
		};
	}
}

DropIndicator.define();

export default DropIndicator;
