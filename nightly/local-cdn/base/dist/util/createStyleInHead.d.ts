/**
 * Creates a `<style>` tag in the `<head>` tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
declare const createStyleInHead: (cssText: string, attributes?: Record<string, string>) => HTMLStyleElement;
export default createStyleInHead;
