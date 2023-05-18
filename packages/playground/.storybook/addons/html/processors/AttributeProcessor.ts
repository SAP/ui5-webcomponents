import { IProcessor } from "./IProcessor";

/**
 * This class is responsible for processing the attributes of the story.
 * Remove attributes that are not needed. E.g. private attributes such as _id, _mode, _* and ui5-* attributes.
 */
export class AttributeProcessor implements IProcessor {
    process(node: HTMLElement): void {
        this.removeAttributes(node);
    }

    private test(attribute: Attr): boolean {
        return [
            (attr: Attr) => attr.name.startsWith("ui5-"),
            (attr: Attr) => attr.name.startsWith("_"),
        ].some((test) => {
            if (test(attribute)) {
                return true;
            }
        });
    }

    private removeAttributes(node: HTMLElement): void {
        const attributes = node.attributes;

        for (let attribute of attributes) {
            if (this.test(attribute)) {
                node.removeAttribute(attribute.name);
            }
        }
    }
}
