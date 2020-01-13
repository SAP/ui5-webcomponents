import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AvatarTemplate from "./generated/templates/AvatarTemplate.lit.js";

// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";

import AvatarSize from "./types/AvatarSize.js";
import AvatarShape from "./types/AvatarShape.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-avatar",
	properties: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {

		/**
		 * Defines the path to the desired image or icon.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		src: {
			type: String,
		},

		/**
		 * Defines the shape of the <code>Avatar</code>.
		 * @public
		 * @defaultvalue "Circle"
		 */
		shape: {
			type: String,
			defaultValue: AvatarShape.Circle,
		},

		/**
		 * Defines predefined size of the <code>Avatar</code>.
		 * * @public
		 * @defaultvalue "Square"
		 */
		size: {
			type: String,
			defaultValue: AvatarSize.S,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.Avatar.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An image-like control that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.	
 *
 * For the <code>ui5-avatar</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Avatar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Avatar
 * @extends UI5Element
 * @tagname ui5-avatar
 * @public
 */
class Avatar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return AvatarCss;
	}

	static get template() {
		return AvatarTemplate;
	}

	static async define(...params) {
		super.define(...params);
	}
}

Avatar.define();

export default Avatar;
