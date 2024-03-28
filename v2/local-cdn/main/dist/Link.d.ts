import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import LinkDesign from "./types/LinkDesign.js";
import WrappingType from "./types/WrappingType.js";
import HasPopup from "./types/HasPopup.js";
type LinkClickEventDetail = {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
};
type AccessibilityAttributes = {
    expanded?: "true" | "false" | boolean;
    hasPopup?: `${HasPopup}`;
};
/**
 * @class
 *
 * ### Overview
 * The `ui5-link` is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 * ### Usage
 *
 * You can set the `ui5-link` to be enabled or disabled.
 *
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * `Subtle` or the more important ones as `Emphasized`,
 * by using the `design` property.
 *
 * If the `href` property is set, the link behaves as the HTML
 * anchor tag (`<a></a>`) and opens the specified URL in the given target frame (`target` property).
 * To specify where the linked content is opened, you can use the `target` property.
 *
 * ### Responsive behavior
 *
 * If there is not enough space, the text of the `ui5-link` becomes truncated.
 * If the `wrappingType` property is set to `"Normal"`, the text is displayed
 * on several lines instead of being truncated.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Link";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
declare class Link extends UI5Element implements ITabbable {
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** When disabled, the click event cannot be triggered by the user.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the tooltip of the component.
     * @default ""
     * @private
     * @since 1.18.0
     */
    title: string;
    /**
     * Defines the component href.
     *
     * **Note:** Standard hyperlink behavior is supported.
     * @default ""
     * @public
     */
    href: string;
    /**
     * Defines the component target.
     *
     * **Notes:**
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **This property must only be used when the `href` property is set.**
     * @default ""
     * @public
     */
    target: string;
    /**
     * Defines the component design.
     *
     * **Note:** Avaialble options are `Default`, `Subtle`, and `Emphasized`.
     * @default "Default"
     * @public
     */
    design: `${LinkDesign}`;
    /**
     * Defines how the text of a component will be displayed when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * @default "None"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default ""
     * @public
     * @since 1.2.0
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the input
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef: string;
    /**
     * Defines the ARIA role of the component.
     *
     * **Note:** Use the "button" role in cases when navigation is not expected to occur and the href property is not defined.
     * @default "link"
     * @public
     * @since 1.9.0
     */
    accessibleRole: string;
    /**
     * An object of strings that defines several additional accessibility attribute values
     * for customization depending on the use case.
     *
     * It supports the following fields:
     *
     * - `expanded`: Indicates whether the anchor element, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
     *	- `true`
     *	- `false`
     * - `hasPopup`: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the anchor element. Accepts the following string values:
     *	- `Dialog`
     *	- `Grid`
     *	- `ListBox`
     *	- `Menu`
     *	- `Tree`
     * @public
     * @since 1.1.0
     * @default {}
     */
    accessibilityAttributes: AccessibilityAttributes;
    _rel: string | undefined;
    forcedTabIndex: string;
    /**
     * Indicates if the element is on focus.
     * @private
     */
    focused: boolean;
    _dummyAnchor: HTMLAnchorElement;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    _isCrossOrigin(): boolean;
    get effectiveTabIndex(): string;
    get ariaLabelText(): string | undefined;
    get hasLinkType(): boolean;
    static typeTextMappings(): Record<string, I18nText>;
    get linkTypeText(): string;
    get parsedRef(): string | undefined;
    get effectiveAccRole(): string;
    get _hasPopup(): string | undefined;
    static onDefine(): Promise<void>;
    _onclick(e: MouseEvent | KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
}
export default Link;
export type { LinkClickEventDetail, AccessibilityAttributes, };
