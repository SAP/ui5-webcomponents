import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IIcon } from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-help-2.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import WrappingType from "./types/WrappingType.js";
import BadgeDesign from "./types/BadgeDesign.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-badge` is a component which serves
 * the purpose to attract the user attention to some piece
 * of information (state, quantity, condition, etc.).
 * It can contain icon and text information, and its design can be chosen from specific design types.
 *
 * ### Usage Guidelines
 *
 * - If the text is longer than the width of the component, it can wrap, or it can show ellipsis, depending on the `wrappingType` property.
  * - Colors can be semantic or not semantic.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Badge.js";`
 * @constructor
 * @extends UI5Element
 * @since 0.12.0
 * @public
 */
declare class Badge extends UI5Element {
    /**
     * Defines the design type of the component.
     * @default "Set3"
     * @public
     * @since 1.22.0
     */
    design: `${BadgeDesign}`;
    /**
     * Defines the color scheme of the component.
     * There are 10 predefined schemes.
     * To use one you can set a number from `"1"` to `"10"`. The `colorScheme` `"1"` will be set by default.
     *
     * **Note:** Color schemes have no visual representation in High Contrast Black (sap_belize_hcb) theme.
     * @default "1"
     * @public
     */
    colorScheme: string;
    /**
     * Defines if the default state icon is shown.
     * @default false
     * @public
     * @since 1.22.0
     */
    hideStateIcon: boolean;
    /**
     * Defines if the component is interactive (focusable and pressable).
     *
     * **Note:** The badge cannot be `interactive`
     * when `design` property is `BadgeDesign.Set3`
     * @default false
     * @public
     * @since 1.22.0
     */
    interactive: boolean;
    /**
     * Defines how the text of a component will be displayed when there is not enough space.
     *
     * **Note:** For option "Normal" the text will wrap and the
     * words will not be broken based on hyphenation.
     * @default "None"
     * @public
     * @since 1.22.0
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines if the badge has an icon.
     * @private
     */
    _hasIcon: boolean;
    /**
     * Defines if the badge has only an icon (and no text).
     * @private
     */
    _iconOnly: boolean;
    /**
     * Defines if the badge has "Tag" design type.
     * @private
     */
    _isTagDesign: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: Array<Node>;
    /**
     * Defines the icon to be displayed in the component.
     * @public
     */
    icon: Array<IIcon>;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    onBeforeRendering(): void;
    get _roleDescription(): string;
    get _valueState(): string | undefined;
    get hasText(): boolean;
    get hasIcon(): boolean;
    get iconOnly(): boolean;
    get _title(): string | undefined;
    get badgeDescription(): string | undefined;
    get _semanticIconName(): "sys-help-2" | "sys-enter-2" | "error" | "alert" | "information" | null;
    _onclick(): void;
}
export default Badge;
