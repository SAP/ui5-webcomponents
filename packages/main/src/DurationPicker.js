import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DurationPickerTemplate from "./generated/templates/DurationPickerTemplate.lit.js";
import DurationPickerPopoverTemplate from "./generated/templates/DurationPickerPopoverTemplate.lit.js";
import WheelSlider from "./WheelSlider.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Input from "./Input.js";

// Styles
import DurationPickerCss from "./generated/themes/DurationPicker.css.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-duration-picker",
	properties: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		disabled: {
			type: Boolean,
		},
		readonly: {
			type: Boolean,
		},
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},
		value: {
			type: String,
		},
		/**
		 * @private
		 */
		_isPickerOpen: {
			type: Boolean,
		}
	},
	slots: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-duration-picker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/DurationPicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DurationPicker
 * @extends UI5Element
 * @tagname ui5-duration-picker
 * @public
 */
class DurationPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return DurationPickerCss;
	}

	static get template() {
		return DurationPickerTemplate;
	}

	static get staticAreaTemplate() {
		return DurationPickerPopoverTemplate;
	}

	async togglePicker() {
		await this._getResponsivePopover();

		if (this.responsivePopover.opened) {
			this._isPickerOpen = false;
			this.responsivePopover.close();
		} else {
			this._isPickerOpen = true;
			this.responsivePopover.open();
		}
	}

	async _getResponsivePopover() {
		if (this.responsivePopover) {
			return this.responsivePopover;
		}

		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("ui5-responsive-popover");
		return this.responsivePopover;
	}

	static async onDefine(...params) {
		await Promise.all([
			WheelSlider.define(),
			ResponsivePopover.define(),
			Input.define(),
		]);
	}
}

DurationPicker.define();

export default DurationPicker;
