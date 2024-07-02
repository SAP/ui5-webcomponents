import{j as e}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-6087c063.js";import{B as i,F as a}from"./Banner-a1178143.js";import{u as t}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(n){const s=Object.assign({h1:"h1",p:"p",a:"a",em:"em",pre:"pre",code:"code",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",ol:"ol",li:"li"},t(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Advanced/CSP"}),`
`,e.jsx(i,{}),`
`,e.jsx(s.h1,{id:"csp",children:"CSP"}),`
`,e.jsxs(s.p,{children:["To learn about Content Security Policy (CSP), click ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",target:"_blank",rel:"nofollow noopener noreferrer",children:"here"}),"."]}),`
`,e.jsx(s.p,{children:e.jsx(s.em,{children:"Read this section if your site needs to be CSP-compliant. This article focuses on styles compliance."})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import { setUseLinks, setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js";
`})}),`
`,e.jsxs(s.p,{children:["These functions affect the way the UI5 Web Components framework manages CSS. This is important if you are aiming for CSP-compliance, since in order to be CSP-compliant, in the most general case, a site cannot use ",e.jsx(s.code,{children:"<style>"})," tags."]}),`
`,e.jsx(s.h2,{id:"background",children:"Background"}),`
`,e.jsxs(s.p,{children:["The UI5 Web Components framework can leverage CSS (for shadow roots and the ",e.jsx(s.code,{children:"<head>"}),") in 3 ways: with Constructable StyleSheets (",e.jsx(s.code,{children:"document.adoptedStyleSheets"}),`)
for the browsers that support them, with `,e.jsx(s.code,{children:"<style>"})," tags, and with ",e.jsx(s.code,{children:"<link>"})," tags."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Way to use CSS"}),e.jsx(s.th,{children:"Supported by"}),e.jsx(s.th,{children:"CSP Compliant"}),e.jsx(s.th,{children:"Extra setup required"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:["Constructable Stylesheets (",e.jsx(s.strong,{children:"default"})," for Chrome/Edge)"]}),e.jsx(s.td,{children:"Chrome / Edge"}),e.jsx(s.td,{children:"Yes"}),e.jsx(s.td,{children:"No"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"<style>"})," (",e.jsx(s.strong,{children:"default"})," for Firefox/Safari)"]}),e.jsx(s.td,{children:"all"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"<link>"})," (",e.jsx(s.em,{children:"optional for all browsers"}),")"]}),e.jsx(s.td,{children:"all"}),e.jsx(s.td,{children:"Yes"}),e.jsx(s.td,{children:"Yes (CSS files must be statically served)"})]})]})]}),`
`,e.jsxs(s.p,{children:[`In summary, Constructable Stylesheets are both CSP-compliant and require no extra work on your part.
Therefore, browsers that can use them (Chrome, Edge) are CSP-compliant out of the box. Firefox and Safari,
on the other hand, use `,e.jsx(s.code,{children:"<style>"}),` tags by default, for both the shadow roots of web components, and in the HTML document's head,
and are therefore `,e.jsx(s.strong,{children:"not"})," CSP-compliant by default."]}),`
`,e.jsx(s.h2,{id:"turning-on-csp-compliance-for-firefox-and-safari",children:"Turning on CSP Compliance for Firefox and Safari"}),`
`,e.jsxs(s.p,{children:[`To make UI5 Web Components CSP-compliant also on Firefox and Safari, you need to copy the CSS resources for all relevant
UI5 Web Components packages to where you can serve them, and use the `,e.jsx(s.code,{children:"setUseLinks"})," and ",e.jsx(s.code,{children:"setPackageCSSRoot"})," functions."]}),`
`,e.jsx(s.p,{children:"Example:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["First, copy the CSS files for all relevant packages to a directory that can be served, in this example, ",e.jsx(s.code,{children:"public/css/"}),":"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-shell",children:`cp -r node_modules/@ui5/webcomponents-base/dist/css/ public/css/base/
cp -r node_modules/@ui5/webcomponents-theming/dist/css/ public/css/theming/
cp -r node_modules/@ui5/webcomponents/dist/css/ public/css/main/
cp -r node_modules/@ui5/webcomponents-fiori/dist/css/ public/css/fiori/
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.em,{children:"Note: make these commands part of your build task, if your app needs to be CSP-compliant on all browsers."})}),`
`,e.jsxs(s.p,{children:["You will always need the CSS resources of the framework-level packages (",e.jsx(s.code,{children:"@ui5/webcomponents-base"})," and ",e.jsx(s.code,{children:"@ui5/webcomponents-theming"}),`),
and additionally the ones of all components packages your app is going to use (such as `,e.jsx(s.code,{children:"@ui5/webcomponents"})," and ",e.jsx(s.code,{children:"@ui5/webcomponents-fiori"}),")."]}),`
`,e.jsxs(s.p,{children:["By convention, the CSS files are found in the ",e.jsx(s.code,{children:"dist/css/"})," directory for each package that ships CSS resources."]}),`
`,e.jsxs(s.ol,{start:"2",children:[`
`,e.jsx(s.li,{children:"Call the 2 functions, described above, as follows:"}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";

setUseLinks(!document.adoptedStyleSheets); // or "true", to force all browsers to use links 
setPackageCSSRoot("@ui5/webcomponents-base", "public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "public/css/fiori/");
`})}),`
`,e.jsxs(s.p,{children:["Calling ",e.jsx(s.code,{children:"setUseLinks"})," with ",e.jsx(s.code,{children:"!document.adoptedStyleSheets"}),` as its argument is an easy way to tell the
framework to use `,e.jsx(s.code,{children:"<link>"}),` tags only for the browsers that don't support Constructable Stylesheets.
However, you can call `,e.jsx(s.code,{children:"setUseLinks(true)"})," to make all browsers consume CSS from ",e.jsx(s.code,{children:"<link>"}),"s, if you prefer so."]}),`
`,e.jsxs(s.p,{children:["Then, for each package, call ",e.jsx(s.code,{children:"setPackageCSSRoot"}),` and pass the directory, from which the CSS files will be
served. You can pass relative paths to your HTML page, as in the example above, or fully qualified paths, for example:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`setPackageCSSRoot("@ui5/webcomponents-base", "https://my.site/path/to/public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "https://my.site/path/to/public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "https://my.site/path/to/public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "https://my.site/path/to/public/css/fiori/");
`})}),`
`,e.jsxs(s.p,{children:["It's simpler to just use relative paths, if your app is going to have one ",e.jsx(s.code,{children:"index.html"}),` file, and you can
conveniently point to a directory, relative to it. However, in case components will be used in different
pages across your site, or you are using URL re-writing, it would be safest to use fully qualified paths.`]}),`
`,e.jsx(s.h2,{id:"links-preloading",children:"Links Preloading"}),`
`,e.jsxs(s.p,{children:["By default, when using ",e.jsx(s.code,{children:"<link>"}),"s, they are preloaded in the browser's ",e.jsx(s.code,{children:"<head>"}),` (even the ones for shadow roots) in order to avoid
flashing of un-styled content. These preloads have the form: `,e.jsx(s.code,{children:'<link rel="preload" as="style" ...>'}),"."]}),`
`,e.jsxs(s.p,{children:["If, for any reason, you want to opt out of these preloads, you can do so by calling the ",e.jsx(s.code,{children:"setPreloadLinks"})," function:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js";
setPreloadLinks(false);
`})}),`
`,e.jsx(s.h2,{id:"summary",children:"Summary"}),`
`,e.jsxs(s.p,{children:["By default, the UI5 Web Components framework manages CSS resources either with Constructable Stylesheets, or with ",e.jsx(s.code,{children:"<style>"}),` tags.
Since Constructable Stylesheets are CSP-compliant, UI5 Web Components is CSP-compliant on browsers
that support them (Chrome, Edge) out of the box. For the other browsers (Firefox, Safari), in order to
achieve CSP-compliance, you must instruct the framework to use `,e.jsx(s.code,{children:"<link>"})," instead of ",e.jsx(s.code,{children:"<style>"}),` tags, but
then you must also copy the CSS resources to a directory you can serve them from.`]}),`
`,e.jsx(a,{})]})}function S(n={}){const{wrapper:s}=Object.assign({},t(),n.components);return s?e.jsx(s,Object.assign({},n,{children:e.jsx(o,n)})):o(n)}export{S as default};
