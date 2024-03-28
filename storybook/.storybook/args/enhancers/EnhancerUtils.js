import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
const element = document.createElement('div');
const root = createRoot(element);
export const JSXToHtmlString = (component) => {
    flushSync(() => {
        root.render(component);
    });
    return element.innerHTML;
};
//# sourceMappingURL=EnhancerUtils.js.map