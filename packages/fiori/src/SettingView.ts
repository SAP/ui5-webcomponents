import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slot } from "@ui5/webcomponents-base/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/renderer/JsxRenderer.js";
import SettingViewTemplate from "./SettingViewTemplate.js";
import SettingViewCss from "./generated/themes/SettingView.css.js";

@customElement({
	tag: "ui5-setting-view",
	renderer: jsxRenderer,
	template: SettingViewTemplate,
	styles: [SettingViewCss],
})
/**
	 * @class
	 * ### Overview
	 *
	 * The `ui5-setting-view` represents an view to be shown in the `ui5-setting-item`.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @experimental
	 * @public
	 */
class SettingView extends UI5Element {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines the content of the view.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	content!: Array<HTMLElement>;
}

SettingView.define();

export default SettingView;