import { IProcessor } from "./IProcessor";
/**
 * This class is responsible for formatting the style elements of the story:
 * merge multiple style elements and unify their indentation.
 */
export declare class StylesProcessor implements IProcessor {
    process(node: HTMLElement): void;
    private mergeStyles;
    private removeIndentation;
}
