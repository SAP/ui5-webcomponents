/**
 * This class is responsible for processing the attributes of the story.
 * Remove attributes that are not needed. E.g. private attributes such as _id, _mode, _* and ui5-* attributes.
 */
export class AttributeProcessor {
    process(node) {
        this.removeAttributes(node);
    }
    test(attribute) {
        return [
            (attr) => attr.name.startsWith("ui5-"),
            (attr) => attr.name.startsWith("_"),
        ].some((test) => {
            if (test(attribute)) {
                return true;
            }
        });
    }
    removeAttributes(node) {
        const attributes = Array.from(node.attributes);
        for (let attribute of attributes) {
            if (this.test(attribute)) {
                node.removeAttribute(attribute.name);
            }
        }
    }
}
//# sourceMappingURL=AttributeProcessor.js.map