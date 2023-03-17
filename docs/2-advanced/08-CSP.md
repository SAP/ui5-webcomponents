# CSP

To learn about Content Security Policy (CSP), click [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

*Read this section if your site needs to be CSP-compliant. This article focuses on styles compliance.*

```js
import { setUseLinks, setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js";
```

These functions affect the way the UI5 Web Components framework manages CSS. This is important if you are aiming for CSP-compliance, since in order to be CSP-compliant, in the most general case, a site cannot use `<style>` tags.

## Background

The UI5 Web Components framework can leverage CSS (for shadow roots and the `<head>`) in 3 ways: with Constructable StyleSheets (`document.adoptedStyleSheets`)
for the browsers that support them, with `<style>` tags, and with `<link>` tags.

| Way to use CSS         | Supported by      | CSP Compliant | Extra setup required | 
|---------------------------|----------------|---------------|-------------|
| Constructable Stylesheets (**default** for Chrome/Edge) | Chrome / Edge  | Yes           | No          |
| `<style>` (**default** for Firefox/Safari)   | all | No            | No          | 
| `<link>` (*optional for all browsers*)     | all | Yes           | Yes (CSS files must be statically served)         |  

In summary, Constructable Stylesheets are both CSP-compliant and require no extra work on your part.
Therefore, browsers that can use them (Chrome, Edge) are CSP-compliant out of the box. Firefox and Safari,
on the other hand, use `<style>` tags by default, for both the shadow roots of web components, and in the HTML document's head,
and are therefore **not** CSP-compliant by default.

## Turning on CSP Compliance for Firefox and Safari

To make UI5 Web Components CSP-compliant also on Firefox and Safari, you need to copy the CSS resources for all relevant
UI5 Web Components packages to where you can serve them, and use the `setUseLinks` and `setPackageCSSRoot` functions.

Example:

1) First, copy the CSS files for all relevant packages to a directory that can be served, in this example, `public/css/`:

```shell
cp -r node_modules/@ui5/webcomponents-base/dist/css/ public/css/base/
cp -r node_modules/@ui5/webcomponents-theming/dist/css/ public/css/theming/
cp -r node_modules/@ui5/webcomponents/dist/css/ public/css/main/
cp -r node_modules/@ui5/webcomponents-fiori/dist/css/ public/css/fiori/
```

*Note: make these commands part of your build task, if your app needs to be CSP-compliant on all browsers.*

You will always need the CSS resources of the framework-level packages (`@ui5/webcomponents-base` and `@ui5/webcomponents-theming`),
and additionally the ones of all components packages your app is going to use (such as `@ui5/webcomponents` and `@ui5/webcomponents-fiori`).

By convention, the CSS files are found in the `dist/css/` directory for each package that ships CSS resources.

2) Call the 2 functions, described above, as follows:

```js
import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";

setUseLinks(!document.adoptedStyleSheets); // or "true", to force all browsers to use links 
setPackageCSSRoot("@ui5/webcomponents-base", "public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "public/css/fiori/");
```

Calling `setUseLinks` with `!document.adoptedStyleSheets` as its argument is an easy way to tell the
framework to use `<link>` tags only for the browsers that don't support Constructable Stylesheets.
However, you can call `setUseLinks(true)` to make all browsers consume CSS from `<link>`s, if you prefer so.

Then, for each package, call `setPackageCSSRoot` and pass the directory, from which the CSS files will be
served. You can pass relative paths to your HTML page, as in the example above, or fully qualified paths, for example:

```js
setPackageCSSRoot("@ui5/webcomponents-base", "https://my.site/path/to/public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "https://my.site/path/to/public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "https://my.site/path/to/public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "https://my.site/path/to/public/css/fiori/");
```

It's simpler to just use relative paths, if your app is going to have one `index.html` file, and you can
conveniently point to a directory, relative to it. However, in case components will be used in different
pages across your site, or you are using URL re-writing, it would be safest to use fully qualified paths.

## Links Preloading

By default, when using `<link>`s, they are preloaded in the browser's `<head>` (even the ones for shadow roots) in order to avoid
flashing of un-styled content. These preloads have the form: `<link rel="preload" as="style" ...>`.

If, for any reason, you want to opt out of these preloads, you can do so by calling the `setPreloadLinks` function:

```js
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js";
setPreloadLinks(false);
```

## Summary

By default, the UI5 Web Components framework manages CSS resources either with Constructable Stylesheets, or with `<style>` tags.
Since Constructable Stylesheets are CSP-compliant, UI5 Web Components is CSP-compliant on browsers
that support them (Chrome, Edge) out of the box. For the other browsers (Firefox, Safari), in order to
achieve CSP-compliance, you must instruct the framework to use `<link>` instead of `<style>` tags, but
then you must also copy the CSS resources to a directory you can serve them from.

Next: [Scrollbars customization](./09-scrollbars-customization.md)