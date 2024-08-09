/**
 * Use this function to provide the path to the directory where the css resources for the given package will be served from.
 *
 * @public
 * @param packageName name of the package that is being configured
 * @param root path, accessible by the server that will serve the css resources
 */
declare const setPackageCSSRoot: (packageName: string, root: string) => void;
declare const getUrl: (packageName: string, path: string) => string;
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
declare const setUseLinks: (use: boolean) => void;
/**
 * Call this function to enable or disable the preloading of `<link>` tags.
 *
 * **Note:** only taken into account when `<link>` tags are being used.
 * **Note:** links are being preloaded by default, so call "setPreloadLinks(false)" to opt out of this.
 *
 * @public
 * @param preload
 */
declare const setPreloadLinks: (preload: boolean) => void;
declare const shouldUseLinks: () => boolean;
declare const shouldPreloadLinks: () => boolean;
export { setPackageCSSRoot, getUrl, setUseLinks, setPreloadLinks, shouldUseLinks, shouldPreloadLinks, };
