import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DropPlacement from "@ui5/webcomponents-base/dist/types/DropPlacement.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";

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
	 * Element where the drop indicator will be shown.
	 *
	 * @public
	 * @default null
	 */
	@property({ type: Object, defaultValue: null })
	targetReference!: HTMLElement | null;

	/**
	 * Owner of the indicator and the target.
	 * @public
	 * @default null
	 */
	@property({ type: Object, defaultValue: null })
	ownerReference!: HTMLElement | null;

	/**
	 * Placement of the indicator relative to the target.
	 *
	 * @default "Before"
	 * @public
	 */
	@property({ type: DropPlacement, defaultValue: DropPlacement.Before })
	placement!: `${DropPlacement}`;

	/**
	 * Orientation of the indicator.
	 *
	 * @default "Vertical"
	 * @public
	 */
	@property({ type: Orientation, defaultValue: Orientation.Vertical })
	orientation!: `${Orientation}`;

	get _positionProperty() {
		if (this.orientation === Orientation.Vertical) {
			return "left";
		}

		return "top";
	}

	constructor() {
		super();
	}

	onAfterRendering() {
		if (!this.targetReference || !this.ownerReference) {
			Object.assign(this.style, {
				display: "none",
			});

			return;
		}

		const {
			left, width, right, top, bottom, height,
		} = this.targetReference.getBoundingClientRect();
		const {
			top: containerTop,
		} = this.ownerReference.getBoundingClientRect();
		const style = {
			display: "",
			[this._positionProperty]: "",
			width: "",
			height: "",
		};
		let position = 0;

		if (this.orientation === Orientation.Vertical) {
			switch (this.placement) {
			case DropPlacement.Before:
				position = left - this._needle!.offsetWidth / 2;
				break;
			case DropPlacement.On:
				style.width = `${width}px`;
				position = left;
				break;
			case DropPlacement.After:
				position = right - this._needle!.offsetWidth / 2;
				break;
			}

			style.height = `${height}px`;
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

			style.width = `${width}px`;
			position -= containerTop;
		}

		style[this._positionProperty] = `${position}px`;

		Object.assign(this.style, style);
	}

	get classes() {
		return {
			root: {
				"ui5-di-rect": this.placement === DropPlacement.On,
				"ui5-di-needle": this.placement !== DropPlacement.On,
			},
		};
	}

	get _needle() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-di-needle");
	}
}

DropIndicator.define();

export default DropIndicator;
