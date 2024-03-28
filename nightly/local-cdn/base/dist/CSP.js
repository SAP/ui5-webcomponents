const roots = new Map();
let useLinks = false;
let preloadLinks = true;
/**
 * Use this function to provide the path to the directory where the css resources for the given package will be served from.
 *
 * @public
 * @param packageName name of the package that is being configured
 * @param root path, accessible by the server that will serve the css resources
 */
const setPackageCSSRoot = (packageName, root) => {
    roots.set(packageName, root);
};
const getUrl = (packageName, path) => {
    const packageCSSRoot = roots.get(packageName);
    if (!packageCSSRoot) {
        console.warn(`Root path to the CSS resources ${packageName} not provided - use "setPackageCSSRoot" to provide the root.`); // eslint-disable-line
        return "";
    }
    return `${packageCSSRoot}${path}`;
};
/**
 * Call this function to enable or disable the usage of `<link>` tags instead of `<style>` tags to achieve CSP compliance
 *
 * Example: "setUseLinks(true)" will unconditionally use `<link>` tags for all browsers.
 *
 * Example: "setUseLinks(!document.adoptedStyleSheets) will only enable the usage of `<link>` tags for browsers that do not support constructable stylesheets.
 *
 * @public
 * @param use whether links will be used
 */
const setUseLinks = (use) => {
    useLinks = use;
};
/**
 * Call this function to enable or disable the preloading of `<link>` tags.
 *
 * **Note:** only taken into account when `<link>` tags are being used.
 * **Note:** links are being preloaded by default, so call "setPreloadLinks(false)" to opt out of this.
 *
 * @public
 * @param preload
 */
const setPreloadLinks = (preload) => {
    preloadLinks = preload;
};
const shouldUseLinks = () => {
    return useLinks;
};
const shouldPreloadLinks = () => {
    return preloadLinks;
};
export { setPackageCSSRoot, getUrl, setUseLinks, setPreloadLinks, shouldUseLinks, shouldPreloadLinks, };
//# sourceMappingURL=CSP.js.map