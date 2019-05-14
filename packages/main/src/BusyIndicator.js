import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";

import BusyIndicatorTemplateContext from "./BusyIndicatorTemplateContext.js";
import BusyIndicatorRenderer from "./build/compiled/BusyIndicatorRenderer.lit.js";
import Icon from "./Icon.js";

// Styles
import busyIndicatorCss from "./themes/BusyIndicator.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-busy-indicator",
	usesNodeText: true,
	properties: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {

	},
	events: /** @lends sap.ui.webcomponents.main.BusyIndicator.prototype */ {

	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-busy-indicator</code> component can be used while loading resources.
 *
 *
 * <h3>Usage</h3>
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/BusyIndicator";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.BusyIndicator
 * @extends UI5Element
 * @tagname ui5-busy-indicator
 * @usestextcontent
 * @public
 */
class BusyIndicator extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return busyIndicatorCss;
	}

	static get renderer() {
		return BusyIndicatorRenderer;
	}

	static get calculateTemplateContext() {
		return BusyIndicatorTemplateContext.calculate;
	}

	onAfterRendering() {
		const circles = this.getCircles();

		circles.forEach((circle, index) => {
			setTimeout(() => {
				circle.classList.add(`circle-animation-${index}`);
			}, 600);
		});
	}

	getCircles() {
		return this.getDomRef().querySelectorAll(`.circle`);
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	BusyIndicator.define();
});

export default BusyIndicator;
