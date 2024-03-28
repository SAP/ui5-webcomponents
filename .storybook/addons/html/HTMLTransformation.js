import { AttributeProcessor, StylesProcessor } from "./processors";
/**
 * This class is responsible for transforming the HTML code of the story.
 * Used by the HTML addon.
 */
export class HTMLTransformation {
    constructor(headProcessors, bodyProcessors) {
        this.headProcessors = headProcessors;
        this.bodyProcessors = bodyProcessors;
        this.headProcessors = headProcessors;
        this.bodyProcessors = bodyProcessors;
    }
    transform(html) {
        let transformed = "";
        const dom = this.convertToDOM(html), head = dom.head, body = dom.body;
        this.headProcessors.forEach((processor) => {
            processor.process(head);
        });
        this.walk(body, (node) => {
            this.bodyProcessors.forEach((processor) => {
                processor.process(node);
            });
        });
        if (head.innerHTML) {
            transformed += this.convertToString(head);
        }
        transformed += this.convertToString(body);
        return transformed;
    }
    walk(node, callback) {
        callback(node);
        node = node.firstElementChild;
        while (node) {
            this.walk(node, callback);
            node = node.nextElementSibling;
        }
    }
    convertToString(dom) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }
    convertToDOM(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc;
    }
}
const headProcessors = [new StylesProcessor()];
const bodyProcessors = [new AttributeProcessor()];
export const htmlTransformation = new HTMLTransformation(headProcessors, bodyProcessors);
//# sourceMappingURL=HTMLTransformation.js.map