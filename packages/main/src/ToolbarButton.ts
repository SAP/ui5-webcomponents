import ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";

import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-toolbar-button",
	properties: {
		/**
		 * Defines if the action is disabled.
		 * <br><br>
		 * <b>Note:</b> a disabled action can't be pressed or focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the action design.
		 * <br><br>
		 * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
		 * "Negative", and "Transparent".
		 *
		 * @type {ButtonDesign}
		 * @defaultvalue "Transparent"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Transparent,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br><br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Button text
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Button width
		 * @public
		 */
		width: {
			type: String,
		},

		/**
		 * Button image source
		 * @public
		 */
		imageSrc: {
			type: String,
		},

		/**
		 * Button image alt
		 * @public
		 */
		imageAlt: {
			type: String,
		},

		/**
		 * Button image width
		 * @public
		 */
		imageWidth: {
			type: Number,
		},

		/**
		 * Button image height
		 * @public
		 */
		imageHeight: {
			type: Number,
		},

		/**
		 * When set, moves the image after, rather than before, the text
		 * @public
		 */
		imageLast: {
			type: Boolean,
		},
	},
	slots: {
	},
	events: {
		click: {},
	},
};

/**
 * @class
 * The <code>ui5-toolbar-button</code> represents an abstract action,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias ToolbarButton
 * @extends UI5Element
 * @public
 */
class ToolbarButton extends ToolbarItem {
	static get metadata() {
		return metadata;
	}

	get styles() {
		return {
			width: this.width,
			display: this.hidden ? "none" : "block",
		};
	}

	get toolbarTemplate() {
		return ToolbarButtonTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarPopoverButtonTemplate;
	}
}

ToolbarButton.define();

export default ToolbarButton;
