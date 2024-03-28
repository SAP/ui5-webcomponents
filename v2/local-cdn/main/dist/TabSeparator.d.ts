import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITab } from "./TabContainer.js";
import TabSeparatorInStripTemplate from "./generated/templates/TabSeparatorInStripTemplate.lit.js";
import TabSeparatorInOverflowTemplate from "./generated/templates/TabSeparatorInOverflowTemplate.lit.js";
/**
 * @class
 * The `ui5-tab-separator` represents a vertical line to separate tabs inside a `ui5-tabcontainer`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ITab}
 * @public
 */
declare class TabSeparator extends UI5Element implements ITab {
    realTabReference: TabSeparator;
    getElementInStrip?: () => ITab | null;
    static get stripTemplate(): typeof TabSeparatorInStripTemplate;
    static get overflowTemplate(): typeof TabSeparatorInOverflowTemplate;
    get classes(): {
        root: {
            "ui5-tc__separator": boolean;
        };
    };
    get isSeparator(): boolean;
    /**
     * Returns the DOM reference of the separator that is placed in the header.
     *
     * **Note:** Tabs and separators, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs or separators will return `null`.
     * @public
     */
    getTabInStripDomRef(): ITab | null;
    get stableDomRef(): string;
    get stripPresentation(): object;
    get overflowPresentation(): object;
}
export default TabSeparator;
