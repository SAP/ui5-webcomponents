import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
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
	 * Defines the title text of the view.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines whether the view is selected. There can be just one selected view at a time.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Indicates weather the view is a secondary. It is relevant only if the view is used in `pages` slot of `ui5-settings-item` and controls the visibility of the back button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	secondary = false;

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
