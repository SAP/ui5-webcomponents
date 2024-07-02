import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
declare const customElement: (tagNameOrComponentSettings?: string | {
    tag?: string;
    renderer?: Renderer;
    styles?: Styles;
    template?: Template;
    dependencies?: Array<typeof UI5Element>;
    staticAreaStyles?: Styles;
    staticAreaTemplate?: Template;
    languageAware?: boolean;
    themeAware?: boolean;
    fastNavigation?: boolean;
}) => ClassDecorator;
export default customElement;
