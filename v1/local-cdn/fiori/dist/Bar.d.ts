import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import BarDesign from "./types/BarDesign.js";
/**
 * @class
 *
 * ### Overview
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * ### Usage
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * **Note:** Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * ### Responsive Behavior
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Bar.js";`
 * @csspart bar - Used to style the wrapper of the content of the component
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.11
 */
declare class Bar extends UI5Element {
    /**
     * Defines the component's design.
     * @default "Header"
     * @public
     */
    design: `${BarDesign}`;
    /**
    * Defines the content at the start of the bar.
    * @public
    */
    startContent: Array<HTMLElement>;
    /**
    * Defines the content in the middle of the bar.
    * @public
    */
    middleContent: Array<HTMLElement>;
    /**
    * Defines the content at the end of the bar.
    * @public
    */
    endContent: Array<HTMLElement>;
    _handleResizeBound: () => void;
    get accInfo(): {
        label: "Header" | "Subheader" | "Footer" | "FloatingFooter";
    };
    constructor();
    handleResize(): void;
    get classes(): {
        root: {
            "ui5-bar-root": boolean;
        };
    };
    onEnterDOM(): void;
    onExitDOM(): void;
}
export default Bar;
