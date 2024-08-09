import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import PageBackgroundDesign from "./types/PageBackgroundDesign.js";
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
 * This can be prevented by setting  `enableScrolling` to `false`.
 * #### Footer
 * The footer is optional and occupies the fixed bottom part of the page. Alternatively, the footer can be floating above the bottom part of the content.
 * This is enabled with the `floatingFooter` property.
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
declare class Page extends UI5Element {
    /**
     * Defines the background color of the `ui5-page`.
     *
     * **Note:** When a ui5-list is placed inside the page, we recommend using “List” to ensure better color contrast.
     * @default "Solid"
     * @public
     */
    backgroundDesign: `${PageBackgroundDesign}`;
    /**
     * Disables vertical scrolling of page content.
     * If set to true, there will be no vertical scrolling at all.
     * @default false
     * @public
     */
    disableScrolling: boolean;
    /**
     * Defines if the footer should float over the content.
     *
     * **Note:** When set to true the footer floats over the content with a slight offset from the bottom, otherwise it is fixed at the very bottom of the page.
     * @default true
     * @public
     */
    floatingFooter: boolean;
    /**
     * Defines the footer visibility.
     * @default false
     * @public
     */
    hideFooter: boolean;
    /**
     * Defines the current media query size.
     * @private
     * @since 1.0.0-rc.15
     */
    mediaRange: string;
    /**
     * Defines the header HTML Element.
     * @public
     */
    header: Array<HTMLElement>;
    /**
     * Defines the content HTML Element.
     * @public
     */
    content: Array<HTMLElement>;
    /**
     * Defines the footer HTML Element.
     * @public
     */
    footer: Array<HTMLElement>;
    _updateMediaRange: ResizeObserverCallback;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    updateMediaRange(): void;
    get _contentBottom(): "0" | "2.75rem";
    get _contentPaddingBottom(): "0" | "3.5rem";
    get _contentTop(): "2.75rem" | "0rem";
    get styles(): {
        content: {
            "padding-bottom": string | 0;
            bottom: string | 0;
            top: string;
        };
        footer: {};
    };
}
export default Page;
