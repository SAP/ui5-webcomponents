import { IProcessor } from "./IProcessor";
/**
 * This class is responsible for processing the attributes of the story.
 * Remove attributes that are not needed. E.g. private attributes such as _id, _mode, _* and ui5-* attributes.
 */
export declare class AttributeProcessor implements IProcessor {
    process(node: HTMLElement): void;
    private test;
    private removeAttributes;
}
