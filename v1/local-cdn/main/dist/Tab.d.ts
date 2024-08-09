import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import SemanticColor from "./types/SemanticColor.js";
import ListItemType from "./types/ListItemType.js";
import type { ITab } from "./TabContainer.js";
import TabInStripTemplate from "./generated/templates/TabInStripTemplate.lit.js";
import TabInOverflowTemplate from "./generated/templates/TabInOverflowTemplate.lit.js";
/**
 * @class
 * The `ui5-tab` represents a selectable item inside a `ui5-tabcontainer`.
 * It defines both the item in the tab strip (top part of the `ui5-tabcontainer`) and the
 * content that is presented to the user once the tab is selected.
 * @abstract
 * @constructor
 * @extends UI5Element
 * @implements {ITab}
 * @public
 */
declare class Tab extends UI5Element implements ITab, ITabbable {
    /**
     * The text to be displayed for the item.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Disabled tabs can't be selected.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Represents the "additionalText" text, which is displayed in the tab. In the cases when in the same time there are tabs with icons and tabs without icons, if a tab has no icon the "additionalText" is displayed larger.
     * @default ""
     * @public
     */
    additionalText: string;
    /**
     * Defines the icon source URI to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous built-in icons.
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines the component's design color.
     *
     * The design is applied to:
     *
     * - the component icon
     * - the `text` when the component overflows
     * - the tab selection line
     *
     * Available designs are: `"Default"`, `"Neutral"`, `"Positive"`, `"Critical"` and `"Negative"`.
     *
     * **Note:** The design depends on the current theme.
     * @default "Default"
     * @public
     */
    design: `${SemanticColor}`;
    /**
     * Specifies if the component is selected.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines if the tab is movable.
     *
     * @default false
     * @private
     */
    movable: boolean;
    forcedSelected: boolean;
    realTabReference: Tab;
    isTopLevelTab: boolean;
    _selectedTabReference: Tab;
    /**
     * Holds the content associated with this tab.
     * @public
     */
    content: Array<Node>;
    /**
     * Defines hierarchies with nested sub tabs.
     *
     * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
     * @public
     */
    subTabs: Array<ITab>;
    isInline?: boolean;
    forcedMixedMode?: boolean;
    getElementInStrip?: () => ITab | null;
    _individualSlot: string;
    static i18nBundle: I18nBundle;
    set forcedTabIndex(val: string);
    get forcedTabIndex(): string;
    get displayText(): string;
    get isSeparator(): boolean;
    get stripPresentation(): object;
    get overflowPresentation(): object;
    get stableDomRef(): string;
    get requiresExpandButton(): boolean;
    get isSingleClickArea(): boolean;
    get isTwoClickArea(): boolean;
    get isOnSelectedTabPath(): boolean;
    get _effectiveSlotName(): string;
    get _defaultSlotName(): "" | "disabled-slot";
    get hasOwnContent(): boolean;
    /**
     * Returns the DOM reference of the tab that is placed in the header.
     *
     * **Note:** Tabs, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs will return `null`.
     *
     * **Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.
     * @public
     * @since 1.0.0-rc.16
     */
    getTabInStripDomRef(): ITab | null;
    getFocusDomRef(): HTMLElement | undefined;
    focus(focusOptions?: FocusOptions): Promise<void>;
    get isMixedModeTab(): boolean | undefined;
    get isTextOnlyTab(): boolean;
    get isIconTab(): boolean;
    get effectiveDisabled(): true | undefined;
    get effectiveSelected(): boolean;
    get effectiveHidden(): boolean;
    get tabs(): Array<Tab>;
    get ariaLabelledBy(): string;
    get stripClasses(): {
        itemClasses: string;
        additionalTextClasses: string;
    };
    get additionalTextClasses(): string;
    get expandButtonTitle(): string;
    get _roleDescription(): string | undefined;
    get _ariaHasPopup(): "menu" | undefined;
    get semanticIconName(): "sys-enter-2" | "error" | "alert" | null;
    get _designDescription(): string | null;
    get semanticIconClasses(): string;
    get overflowClasses(): string;
    get overflowState(): ListItemType.Inactive | ListItemType.Active;
    static get stripTemplate(): typeof TabInStripTemplate;
    static get overflowTemplate(): typeof TabInOverflowTemplate;
    static onDefine(): Promise<void>;
    _ondragstart(e: DragEvent): void;
    _ondragend(e: DragEvent): void;
}
export default Tab;
