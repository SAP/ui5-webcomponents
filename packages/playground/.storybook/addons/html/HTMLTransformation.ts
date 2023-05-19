import { AttributeProcessor, IProcessor } from "./processors";

export interface IHTMLTransformation {
    transform(html: string): string;
}

/**
 * This class is responsible for transforming the HTML code of the story.
 * Used by the HTML addon.
 */
export class HTMLTransformation implements IHTMLTransformation {
    constructor(private processors: IProcessor[]) {
        this.processors = processors;
    }

    transform(html: string): string {
        const dom = this.convertToDOM(html);

        this.walk(dom, (node) => {
            this.processors.forEach((processor) => {
                processor.process(node);
            });
        });

        const transformed = this.convertToString(dom);
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

    private convertToDOM(html: string): HTMLElement {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body;
    }
}

const processors = [new AttributeProcessor()];

export const htmlTransformation = new HTMLTransformation(processors);
