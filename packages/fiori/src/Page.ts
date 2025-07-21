import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import PageTemplate from "./PageTemplate.js";

// Styles
import PageCss from "./generated/themes/Page.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-page` is a container component that holds one whole screen of an application.
 * The page has three distinct areas that can hold content - a header, content area and a footer.
 * ### Structure
 * #### Header
 * The top most area of the page is occupied by the header. The standard header includes a navigation button and a title.
 * #### Content
 * The content occupies the main part of the page. Only the content area is scrollable by default.
 * This can be prevented by setting `noScrolling` to `true`.
 * #### Footer
 * The footer is optional and occupies the part above the bottom part of the content. Alternatively, the footer can be fixed at the bottom of the page by enabling the `fixedFooter` property.
 *
 * **Note:** `ui5-page` occipues the whole available space of its parent. In order to achieve the intended design you have to make sure
 * that there is enough space for the `ui5-page` to be rendered.
 * **Note:** In order for the `ui5-page` to be displayed, the parent element should have fixed height.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Page.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.12
 * @public
 * @csspart content - Used to style the content section of the component
 */
@customElement({
	tag: "ui5-page",
	languageAware: true,
	renderer: jsxRenderer,
	styles: [
		PageCss,
		getEffectiveScrollbarStyle(),
	],
	template: PageTemplate,
})
class Page extends UI5Element {
	@property()
	items!: Array<{ text: string }>;

	handleInput() {
		this.items = [
			{
				text: `Apple ${Math.random()}`,
			},
			{
				text: `Red Apple ${Math.random()}`,
			},
			{
				text: `Application ${Math.random()}`,
			},
		];
	}
}

Page.define();

export default Page;
