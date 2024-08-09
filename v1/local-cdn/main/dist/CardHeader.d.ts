import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ICardHeader } from "./Card.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card-header` is a component, meant to be used as a header of the `ui5-card` component.
 * It displays valuable information, that can be defined with several properties, such as: `titleText`, `subtitleText`, `status`
 * and two slots: `avatar` and `action`.
 *
 * ### Keyboard handling
 * In case you enable `interactive` property, you can press the `ui5-card-header` by Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CardHeader";`
 * @constructor
 * @implements {ICardHeader}
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @csspart root - Used to style the root DOM element of the CardHeader
 * @csspart title - Used to style the title of the CardHeader
 * @csspart subtitle - Used to style the subtitle of the CardHeader
 * @csspart status - Used to style the status of the CardHeader
 */
declare class CardHeader extends UI5Element implements ICardHeader {
    /**
     * Defines the title text.
     * @default ""
     * @public
    */
    titleText: string;
    /**
     * Defines the subtitle text.
     * @default ""
     * @public
    */
    subtitleText: string;
    /**
     * Defines the status text.
     * @default ""
     * @public
    */
    status: string;
    /**
     * Defines if the component would be interactive,
     * e.g gets hover effect, gets focus outline and `click` event is fired, when pressed.
     * @default false
     * @public
    */
    interactive: boolean;
    /**
     * Define the `aria-level` attribute of the component
     *
     * **Note: ** If the interactive property is set, `aria-level` attribute is not rendered at all.
     * @private
     * @default 3
    */
    _ariaLevel: number;
    _headerActive: boolean;
    /**
     * Defines an avatar image, displayed in the left most part of the header.
     * @public
    */
    avatar: Array<HTMLElement>;
    /**
     * Defines an action, displayed in the right most part of the header.
     * @public
    */
    action: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    get classes(): {
        root: {
            "ui5-card-header": boolean;
            "ui5-card-header--interactive": boolean;
            "ui5-card-header--active": boolean;
            "ui5-card-header-ff": boolean;
        };
    };
    get _root(): HTMLElement;
    get ariaRoleDescription(): string;
    get ariaRoleFocusableElement(): "button" | null;
    get ariaCardAvatarLabel(): string;
    get ariaLabelledBy(): string | undefined;
    get hasAvatar(): boolean;
    get hasAction(): boolean;
    static onDefine(): Promise<void>;
    _actionsFocusin(): void;
    _actionsFocusout(): void;
    _click(e: MouseEvent): void;
    _keydown(e: KeyboardEvent): void;
    _keyup(e: KeyboardEvent): void;
}
export default CardHeader;
export type { ICardHeader, };
