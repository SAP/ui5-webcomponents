import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";

import DropIndicatorTemplate from "./generated/templates/DropIndicatorTemplate.lit.js";

// Styles
import DropIndicatorCss from "./generated/themes/DropIndicator.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DropIndicator.js";`
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
	@property({ type: MovePlacement, defaultValue: MovePlacement.Before })
	placement!: `${MovePlacement}`;

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
			height: containerHeight,
		} = this.ownerReference.getBoundingClientRect();
		const style = {
			display: "",
			[this._positionProperty]: "",
			width: "",
			height: "",
		};
		let position = 0;
		let isLast = false;
		let isFirst = false;

		if (this.orientation === Orientation.Vertical) {
			switch (this.placement) {
			case MovePlacement.Before:
				position = left;
				break;
			case MovePlacement.On:
				style.width = `${width}px`;
				position = left;
				break;
			case MovePlacement.After:
				position = right;
				break;
			}

			style.height = `${height}px`;
		}

		if (this.orientation === Orientation.Horizontal) {
			switch (this.placement) {
			case MovePlacement.Before:
				position = top;
				break;
			case MovePlacement.On:
				style.height = `${height}px`;
				position = top;
				break;
			case MovePlacement.After:
				position = bottom;
				break;
			}

			style.width = `${width}px`;
			position -= containerTop;

			if (position <= 0) {
				isFirst = true;
			}

			if (position >= containerHeight) {
				isLast = true;
			}
		}

		style[this._positionProperty] = `${position}px`;
		this.toggleAttribute("first", isFirst);
		this.toggleAttribute("last", isLast);

		Object.assign(this.style, style);
	}

	get classes() {
		return {
			root: {
				"ui5-di-rect": this.placement === MovePlacement.On,
				"ui5-di-needle": this.placement !== MovePlacement.On,
			},
		};
	}
}

DropIndicator.define();

export default DropIndicator;
