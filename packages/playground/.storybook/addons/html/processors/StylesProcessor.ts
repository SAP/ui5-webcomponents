import { IProcessor } from "./IProcessor";

/**
 * This class is responsible for formatting the style elements of the story:
 * merge multiple style elements and unify their indentation.
 */
export class StylesProcessor implements IProcessor {
    process(node: HTMLElement): void {
        this.mergeStyles(node);
    }

    private mergeStyles(dom: HTMLElement) {
        const styleElements = Array.from(dom.getElementsByTagName('style'));
        if (styleElements.length > 1) { // merge needed
            let mergedStyles = "";
            for (let i = 0; i < styleElements.length; i++) {
                mergedStyles += this.removeIndentation(styleElements[i].innerHTML);
                styleElements[i].remove();
            }
            const mergedStyleElement = styleElements[0];
            mergedStyleElement.innerHTML = mergedStyles;
            dom.prepend(mergedStyleElement);
        }
    }

    private removeIndentation(str: string) {
        const lines = str.split('\n');
        let shortestIndent = Infinity;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().length === 0) {
                continue;
            }
            let indent = lines[i].search(/\S/);
            if (indent < shortestIndent && indent !== -1) {
                shortestIndent = indent;
            }
        }
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].substring(shortestIndent);
        }
        return lines.join('\n');
    }
}
