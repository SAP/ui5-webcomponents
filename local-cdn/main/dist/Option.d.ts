import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IOption } from "./Select.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IOption}
 * @public
 * @abstract
 */
declare class Option extends UI5Element implements IOption {
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is hidden.
     * @default false
     * @public
     * @since 1.0.0-rc.12
     */
    disabled: boolean;
    /**
     * Defines the tooltip of the component.
     * @default ""
     * @private
     * @since 1.1.0
     */
    title: string;
    /**
     * Defines the `icon` source URI.
     *
     * **Note:**
     * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
     * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default null
     * @public
     */
    icon?: string | null;
    /**
     * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
     * For more information on HTML Form support, see the `name` property of `ui5-select`.
     * @default ""
     * @public
     */
    value: string;
    /**
     * Defines the additional text displayed at the end of the option element.
     * @default ""
     * @public
     * @since 1.3.0
     */
    additionalText: string;
    /**
     * Defines the focused state of the component.
     * @default false
     * @since 1.0.0-rc.13
     * @private
     */
    focused: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: Array<Node>;
    get stableDomRef(): string;
}
export default Option;
