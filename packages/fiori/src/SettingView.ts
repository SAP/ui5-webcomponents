import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slot } from "@ui5/webcomponents-base/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/renderer/JsxRenderer.js";
import SettingViewTemplate from "./SettingViewTemplate.js";
import SettingViewCss from "./generated/themes/SettingView.css.js";
import type SettingViewType from "./types/SettingViewType.js";

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
	 * Defines the title text of the tab item. It is used only if type is set to "Tab".
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines the view type.
	 * @default "Tab"
	 * @public
	 */
	@property()
	type: `${SettingViewType}` = "Tab";

	/**
	 * Defines whether the view is selected. There can be just one selected view at a time.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

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
