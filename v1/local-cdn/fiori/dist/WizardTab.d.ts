import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
type WizardTabInfo = {
    [key: string]: string;
};
/**
 * @class
 *
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class WizardTab extends UI5Element implements ITabbable {
    /**
     * Defines the `icon` of the step.
     * @default ""
     * @private
     */
    icon: string;
    /**
     * Defines the `titleText` of the step.
     * @default ""
     * @private
     * @since 1.0.0-rc.15
     */
    titleText: string;
    /**
     * Defines the `subtitleText` of the step.
     * @default ""
     * @private
     * @since 1.0.0-rc.15
     */
    subtitleText: string;
    /**
     * Defines the number that will be displayed in place of the `icon`, when it's missing.
     * @default ""
     * @private
     */
    number: string;
    /**
     * Defines if the step is `disabled` - the step is not responding to user interaction.
     * @default false
     * @private
     */
    disabled: boolean;
    /**
     * Defines if the step is `selected`.
     * @default false
     * @private
     */
    selected: boolean;
    /**
     * Defines if the step's separator is hidden or not.
     * @default false
     * @private
     */
    hideSeparator: boolean;
    /**
     * Defines if the step's separator is active or not.
     * @default false
     * @private
     */
    activeSeparator: boolean;
    /**
     * Defines if the step's separator is dashed or not.
     * @default false
     * @private
     */
    branchingSeparator: boolean;
    /**
     * Defines the tabindex of the step.
     * @default "-1"
     * @private
     */
    forcedTabIndex: string;
    _wizardTabAccInfo?: WizardTabInfo;
    _onclick(): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusin(): void;
    get tabIndex(): number;
    get hasTexts(): string;
    get accInfo(): {
        ariaSetsize: string | undefined;
        ariaPosinset: string | undefined;
        ariaLabel: string | undefined;
        ariaCurrent: string | undefined;
        ariaDisabled: string | undefined;
    };
}
export default WizardTab;
