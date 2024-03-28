import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
/**
 * @class
 * A class to serve as a foundation
 * for the `ListItem` and `GroupHeaderListItem` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
declare class ListItemBase extends UI5Element implements ITabbable {
    /**
     * Defines the selected state of the `ListItem`.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the item is movable.
     * @default false
     * @private
     */
    movable: boolean;
    /**
    * Defines if the list item should display its bottom border.
    * @private
    */
    hasBorder: boolean;
    forcedTabIndex: string;
    /**
    * Defines whether `ui5-li` is in disabled state.
    *
    * **Note:** A disabled `ui5-li` is noninteractive.
    * @default false
    * @protected
    * @since 1.0.0-rc.12
    */
    disabled: boolean;
    /**
     * Indicates if the element is on focus
     * @private
     */
    focused: boolean;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _handleTabNext(e: KeyboardEvent): void;
    _handleTabPrevious(e: KeyboardEvent): void;
    shouldForwardTabAfter(): boolean;
    shouldForwardTabBefore(target: HTMLElement): boolean;
    get classes(): ClassMap;
    get _ariaDisabled(): true | undefined;
    get _focusable(): boolean;
    get hasConfigurableMode(): boolean;
    get _effectiveTabIndex(): string | 0 | -1;
}
export default ListItemBase;
