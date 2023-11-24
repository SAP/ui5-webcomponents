import { sanitizeHTML } from "@ui5/webcomponents-base/dist/util/HTMLSanitizer.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/**
 * This class is responsible for transforming the user input into HTML code.
 * Then it is sanitizing it to ensure its validity.
 */

export const sanitizedUnsafeHTML = (html: string): string => {
    return sanitizeHTML(unsafeHTML(html));
}