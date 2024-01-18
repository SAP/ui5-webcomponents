import { unsafeHTML } from "lit/directives/unsafe-html.js";

const wrapUnsafeHTML = (html: string) => {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(`<div>${html}</div>`, "application/xml");

    if (doc1.documentElement.querySelector("parsererror")) {
      return unsafeHTML(doc1.documentElement.querySelector("parsererror")?.textContent);
    } else {
     return unsafeHTML(html);
    }
  }

  export default wrapUnsafeHTML;