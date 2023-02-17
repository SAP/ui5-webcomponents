import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as n}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function f(o={}){const{wrapper:t}=Object.assign({},n(),o.components);return t?e.exports.jsx(t,Object.assign({},o,{children:e.exports.jsx(r,{})})):r();function r(){const s=Object.assign({h1:"h1",p:"p",a:"a",em:"em",pre:"pre",code:"code",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",ol:"ol",li:"li"},n(),o.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/CSP"}),`
`,e.exports.jsx(s.h1,{children:"CSP"}),`
`,e.exports.jsxs(s.p,{children:["To learn about Content Security Policy (CSP), click ",e.exports.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",children:"here"}),"."]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.em,{children:"Read this section if your site needs to be CSP-compliant. This article focuses on styles compliance."})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { setUseLinks, setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["These functions affect the way the UI5 Web Components framework manages CSS. This is important if you are aiming for CSP-compliance, since in order to be CSP-compliant, in the most general case, a site cannot use ",e.exports.jsx(s.code,{children:"<style>"})," tags."]}),`
`,e.exports.jsx(s.h2,{children:"Background"}),`
`,e.exports.jsxs(s.p,{children:["The UI5 Web Components framework can leverage CSS (for shadow roots and the ",e.exports.jsx(s.code,{children:"<head>"}),") in 3 ways: with Constructable StyleSheets (",e.exports.jsx(s.code,{children:"document.adoptedStyleSheets"}),`)
for the browsers that support them, with `,e.exports.jsx(s.code,{children:"<style>"})," tags, and with ",e.exports.jsx(s.code,{children:"<link>"})," tags."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Way to use CSS"}),e.exports.jsx(s.th,{children:"Supported by"}),e.exports.jsx(s.th,{children:"CSP Compliant"}),e.exports.jsx(s.th,{children:"Extra setup required"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsxs(s.td,{children:["Constructable Stylesheets (",e.exports.jsx(s.strong,{children:"default"})," for Chrome/Edge)"]}),e.exports.jsx(s.td,{children:"Chrome / Edge"}),e.exports.jsx(s.td,{children:"Yes"}),e.exports.jsx(s.td,{children:"No"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"<style>"})," (",e.exports.jsx(s.strong,{children:"default"})," for Firefox/Safari)"]}),e.exports.jsx(s.td,{children:"all"}),e.exports.jsx(s.td,{children:"No"}),e.exports.jsx(s.td,{children:"No"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsxs(s.td,{children:[e.exports.jsx(s.code,{children:"<link>"})," (",e.exports.jsx(s.em,{children:"optional for all browsers"}),")"]}),e.exports.jsx(s.td,{children:"all"}),e.exports.jsx(s.td,{children:"Yes"}),e.exports.jsx(s.td,{children:"Yes (CSS files must be statically served)"})]})]})]}),`
`,e.exports.jsxs(s.p,{children:[`In summary, Constructable Stylesheets are both CSP-compliant and require no extra work on your part.
Therefore, browsers that can use them (Chrome, Edge) are CSP-compliant out of the box. Firefox and Safari,
on the other hand, use `,e.exports.jsx(s.code,{children:"<style>"}),` tags by default, for both the shadow roots of web components, and in the HTML document's head,
and are therefore `,e.exports.jsx(s.strong,{children:"not"})," CSP-compliant by default."]}),`
`,e.exports.jsx(s.h2,{children:"Turning on CSP Compliance for Firefox and Safari"}),`
`,e.exports.jsxs(s.p,{children:[`To make UI5 Web Components CSP-compliant also on Firefox and Safari, you need to copy the CSS resources for all relevant
UI5 Web Components packages to where you can serve them, and use the `,e.exports.jsx(s.code,{children:"setUseLinks"})," and ",e.exports.jsx(s.code,{children:"setPackageCSSRoot"})," functions."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.ol,{children:[`
`,e.exports.jsxs(s.li,{children:["First, copy the CSS files for all relevant packages to a directory that can be served, in this example, ",e.exports.jsx(s.code,{children:"public/css/"}),":"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-shell",children:`cp -r node_modules/@ui5/webcomponents-base/dist/css/ public/css/base/
cp -r node_modules/@ui5/webcomponents-theming/dist/css/ public/css/theming/
cp -r node_modules/@ui5/webcomponents/dist/css/ public/css/main/
cp -r node_modules/@ui5/webcomponents-fiori/dist/css/ public/css/fiori/
`})}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.em,{children:"Note: make these commands part of your build task, if your app needs to be CSP-compliant on all browsers."})}),`
`,e.exports.jsxs(s.p,{children:["You will always need the CSS resources of the framework-level packages (",e.exports.jsx(s.code,{children:"@ui5/webcomponents-base"})," and ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-theming"}),`),
and additionally the ones of all components packages your app is going to use (such as `,e.exports.jsx(s.code,{children:"@ui5/webcomponents"})," and ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-fiori"}),")."]}),`
`,e.exports.jsxs(s.p,{children:["By convention, the CSS files are found in the ",e.exports.jsx(s.code,{children:"dist/css/"})," directory for each package that ships CSS resources."]}),`
`,e.exports.jsxs(s.ol,{start:"2",children:[`
`,e.exports.jsx(s.li,{children:"Call the 2 functions, described above, as follows:"}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";

setUseLinks(!document.adoptedStyleSheets); // or "true", to force all browsers to use links 
setPackageCSSRoot("@ui5/webcomponents-base", "public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "public/css/fiori/");
`})}),`
`,e.exports.jsxs(s.p,{children:["Calling ",e.exports.jsx(s.code,{children:"setUseLinks"})," with ",e.exports.jsx(s.code,{children:"!document.adoptedStyleSheets"}),` as its argument is an easy way to tell the
framework to use `,e.exports.jsx(s.code,{children:"<link>"}),` tags only for the browsers that don't support Constructable Stylesheets.
However, you can call `,e.exports.jsx(s.code,{children:"setUseLinks(true)"})," to make all browsers consume CSS from ",e.exports.jsx(s.code,{children:"<link>"}),"s, if you prefer so."]}),`
`,e.exports.jsxs(s.p,{children:["Then, for each package, call ",e.exports.jsx(s.code,{children:"setPackageCSSRoot"}),` and pass the directory, from which the CSS files will be
served. You can pass relative paths to your HTML page, as in the example above, or fully qualified paths, for example:`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`setPackageCSSRoot("@ui5/webcomponents-base", "https://my.site/path/to/public/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "https://my.site/path/to/public/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "https://my.site/path/to/public/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "https://my.site/path/to/public/css/fiori/");
`})}),`
`,e.exports.jsxs(s.p,{children:["It's simpler to just use relative paths, if your app is going to have one ",e.exports.jsx(s.code,{children:"index.html"}),` file, and you can
conveniently point to a directory, relative to it. However, in case components will be used in different
pages across your site, or you are using URL re-writing, it would be safest to use fully qualified paths.`]}),`
`,e.exports.jsx(s.h2,{children:"Links Preloading"}),`
`,e.exports.jsxs(s.p,{children:["By default, when using ",e.exports.jsx(s.code,{children:"<link>"}),"s, they are preloaded in the browser's ",e.exports.jsx(s.code,{children:"<head>"}),` (even the ones for shadow roots) in order to avoid
flashing of un-styled content. These preloads have the form: `,e.exports.jsx(s.code,{children:'<link rel="preload" as="style" ...>'}),"."]}),`
`,e.exports.jsxs(s.p,{children:["If, for any reason, you want to opt out of these preloads, you can do so by calling the ",e.exports.jsx(s.code,{children:"setPreloadLinks"})," function:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js";
setPreloadLinks(false);
`})}),`
`,e.exports.jsx(s.h2,{children:"Summary"}),`
`,e.exports.jsxs(s.p,{children:["By default, the UI5 Web Components framework manages CSS resources either with Constructable Stylesheets, or with ",e.exports.jsx(s.code,{children:"<style>"}),` tags.
Since Constructable Stylesheets are CSP-compliant, UI5 Web Components is CSP-compliant on browsers
that support them (Chrome, Edge) out of the box. For the other browsers (Firefox, Safari), in order to
achieve CSP-compliance, you must instruct the framework to use `,e.exports.jsx(s.code,{children:"<link>"})," instead of ",e.exports.jsx(s.code,{children:"<style>"}),` tags, but
then you must also copy the CSS resources to a directory you can serve them from.`]})]})}}export{f as default};
//# sourceMappingURL=08-CSP.0eff3f2e.js.map
