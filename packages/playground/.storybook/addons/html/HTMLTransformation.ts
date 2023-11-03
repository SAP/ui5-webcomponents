import { AttributeProcessor, StylesProcessor, IProcessor } from "./processors";

export interface IHTMLTransformation {
    transform(html: string): string;
}

/**
 * This class is responsible for transforming the HTML code of the story.
 * Used by the HTML addon.
 */
export class HTMLTransformation implements IHTMLTransformation {
    constructor(private headProcessors: IProcessor[], private bodyProcessors: IProcessor[]) {
        this.headProcessors = headProcessors;
        this.bodyProcessors = bodyProcessors;
    }

    transform(html: string): string {
        let transformed = "";
        const dom = this.convertToDOM(html),
            head = dom.head,
            body = dom.body;

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

    private walk(node: HTMLElement, callback: (node: HTMLElement) => void) {
        callback(node);
        node = node.firstElementChild as HTMLElement;
        while (node) {
            this.walk(node, callback);
            node = node.nextElementSibling as HTMLElement;
        }
    }

    private convertToString(dom: HTMLElement): string {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }

    private convertToDOM(html: string): Document {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc;
    }

}

const headProcessors = [new StylesProcessor()];
const bodyProcessors = [new AttributeProcessor()];

export const htmlTransformation = new HTMLTransformation(headProcessors, bodyProcessors);
