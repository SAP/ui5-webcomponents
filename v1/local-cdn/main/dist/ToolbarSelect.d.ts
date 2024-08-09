import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ToolbarSelectTemplate from "./generated/templates/ToolbarSelectTemplate.lit.js";
import ToolbarPopoverSelectTemplate from "./generated/templates/ToolbarPopoverSelectTemplate.lit.js";
import ToolbarItem from "./ToolbarItem.js";
import type ToolbarSelectOption from "./ToolbarSelectOption.js";
import type { SelectChangeEventDetail } from "./Select.js";
type ToolbarSelectChangeEventDetail = SelectChangeEventDetail;
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
declare class ToolbarSelect extends ToolbarItem {
    /**
     * Defines the width of the select.
     *
     * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
     * @default undefined
     * @public
     */
    width?: string;
    /**
     * Defines the component options.
     *
     * **Note:** Only one selected option is allowed.
     * If more than one option is defined as selected, the last one would be considered as the selected one.
     *
     * **Note:** Use the `ui5-toolbar-select-option` component to define the desired options.
     * @public
     */
    options: Array<ToolbarSelectOption>;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default ""
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the select.
     * @default ""
     * @public
     */
    accessibleNameRef: string;
    _onEvent: EventListener;
    static get toolbarTemplate(): typeof ToolbarSelectTemplate;
    static get toolbarPopoverTemplate(): typeof ToolbarPopoverSelectTemplate;
    get subscribedEvents(): Map<any, any>;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    attachEventListeners(): void;
    detachEventListeners(): void;
    _onEventHandler(e: Event): void;
    get styles(): {
        width: string | undefined;
    };
}
export default ToolbarSelect;
export type { ToolbarSelectChangeEventDetail, };
