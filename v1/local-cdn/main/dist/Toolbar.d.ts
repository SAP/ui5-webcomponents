import UI5Element, { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ToolbarAlign from "./types/ToolbarAlign.js";
import ToolbarItem from "./ToolbarItem.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - The control is not interactive, but can contain of interactive elements
 * - [Tab] - iterates through elements
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
declare class Toolbar extends UI5Element {
    static i18nBundle: I18nBundle;
    /**
     * Indicated the direction in which the Toolbar items will be aligned.
     * @public
     * @default "End"
     */
    alignContent: `${ToolbarAlign}`;
    /**
     * Calculated width of the whole toolbar.
     * @private
     * @default undefined
     */
    width?: number;
    /**
     * Calculated width of the toolbar content.
     * @private
     * @default undefined
     */
    contentWidth?: number;
    /**
     * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
     * @private
     */
    reverseOverflow: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default ""
     * @public
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the input.
     * @default ""
     * @public
     */
    accessibleNameRef: string;
    /**
     * Defines the items of the component.
     *
     * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
     * @public
     */
    items: Array<ToolbarItem>;
    _onResize: ResizeObserverCallback;
    _onInteract: EventListener;
    itemsToOverflow: Array<ToolbarItem>;
    itemsWidth: number;
    popoverOpen: boolean;
    itemsWidthMeasured: boolean;
    ITEMS_WIDTH_MAP: Map<string, number>;
    static get styles(): (string | import("@ui5/webcomponents-base/dist/types.js").StyleDataCSP | import("@ui5/webcomponents-base/dist/types.js").ComponentStylesData[])[];
    static get staticAreaStyles(): (string | import("@ui5/webcomponents-base/dist/types.js").StyleDataCSP | import("@ui5/webcomponents-base/dist/types.js").ComponentStylesData[])[];
    static get dependencies(): (typeof UI5Element)[];
    static onDefine(): Promise<void>;
    constructor();
    /**
     * Read-only members
     */
    get overflowButtonSize(): number;
    get padding(): number;
    get subscribedEvents(): string[];
    get alwaysOverflowItems(): ToolbarItem[];
    get movableItems(): ToolbarItem[];
    get overflowItems(): ({
        toolbarTemplate: object;
        toolbarPopoverTemplate: object;
    } | null)[];
    get standardItems(): ({
        toolbarTemplate: object;
        toolbarPopoverTemplate: object;
    } | null)[];
    get hideOverflowButton(): boolean;
    get classes(): {
        items: {
            "ui5-tb-items": boolean;
            "ui5-tb-items-full-width": boolean;
        };
        overflow: {
            "ui5-overflow-list--alignleft": boolean;
        };
        overflowButton: {
            "ui5-tb-item": boolean;
            "ui5-tb-overflow-btn": boolean;
            "ui5-tb-overflow-btn-hidden": boolean;
        };
    };
    get interactiveItemsCount(): number;
    /**
     * Accessibility
     */
    get hasAriaSemantics(): boolean;
    get accessibleRole(): "toolbar" | undefined;
    get ariaLabelText(): string | undefined;
    get accInfo(): {
        root: {
            role: string | undefined;
            accessibleName: string | undefined;
        };
        overflowButton: {
            accessibleName: string;
            tooltip: string;
            accessibilityAttributes: {
                expanded: boolean | "true" | "false" | undefined;
                hasPopup: string;
            };
        };
    };
    /**
     * Toolbar Overflow Popover
     */
    get overflowButtonDOM(): Button | null;
    get itemsDOM(): Element | null;
    get hasItemWithText(): boolean;
    get hasFlexibleSpacers(): boolean;
    /**
     * Lifecycle methods
     */
    onEnterDOM(): void;
    onExitDOM(): void;
    onInvalidation(changeInfo: ChangeInfo): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    /**
     * Returns if the overflow popup is open.
     * @public
     */
    isOverflowOpen(): Promise<boolean>;
    openOverflow(): Promise<void>;
    closeOverflow(): Promise<void>;
    toggleOverflow(): void;
    getOverflowPopover(): Promise<Popover | null>;
    /**
     * Layout management
     */
    processOverflowLayout(): void;
    storeItemsWidth(): void;
    distributeItems(overflowSpace?: number): void;
    distributeItemsThatAlwaysOverflow(): void;
    setSeperatorsVisibilityInOverflow(): void;
    shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<ToolbarItem>): boolean;
    /**
     * Event Handlers
     */
    onOverflowPopoverClosed(): void;
    onOverflowPopoverOpened(): void;
    onResize(): void;
    onInteract(e: CustomEvent): void;
    /**
     * Private members
     */
    attachListeners(): Promise<void>;
    detachListeners(): Promise<void>;
    onToolbarItemChange(): void;
    getItemsInfo(items: Array<ToolbarItem>): ({
        toolbarTemplate: object;
        toolbarPopoverTemplate: object;
    } | null)[];
    getItemWidth(item: ToolbarItem): number;
    getCachedItemWidth(id: string): number | undefined;
    getItemByID(id: string): ToolbarItem | undefined;
    getRegisteredToolbarItemByID(id: string): HTMLElement | null;
}
export default Toolbar;
