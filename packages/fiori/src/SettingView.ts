import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";

// Templates
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import SettingViewTemplate from "./generated/templates/SettingViewTemplate.lit.js";

@customElement({
	tag: "ui5-setting-view",
	renderer: litRender,
	template: SettingViewTemplate,
})
	/**
	 * @class
	 * Base class for the items that are accepted by the `ui5-setting-view` component.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @abstract
	 * @public
	 * @since
	 */
class SettingView extends UI5Element implements ITabbable {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;
}
SettingView.define();
export default SettingView;