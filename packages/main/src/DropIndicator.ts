import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
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
	 * @default "Between"
	 * @public
	 */
	@property({ type: DropPlacement, defaultValue: DropPlacement.Between })
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
			left: containerLeft,
		} = container.getBoundingClientRect();

		let position = 0;
		if (this.orientation === Orientation.Vertical) {
			switch (this.placement) {
			case DropPlacement.Before:
				position = left;
				break;
			case DropPlacement.On:
				position = left + width / 2;
				break;
			case DropPlacement.After:
				position = right;
				break;
			}

			position -= containerLeft;
		}

		if (this.orientation === Orientation.Horizontal) {
			switch (this.placement) {
			case DropPlacement.Before:
				position = top;
				break;
			case DropPlacement.On:
				position = top + height / 2;
				break;
			case DropPlacement.After:
				position = bottom;
				break;
			}

			position -= containerTop;
		}

		const positionValue = position ? `${position}px` : "";
		this.style[this._positionProperty] = positionValue;
		console.log(this.style[this._positionProperty]);
	}
}

DropIndicator.define();

export default DropIndicator;
