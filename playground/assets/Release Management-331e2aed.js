import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as i,F as l}from"./Banner-a1178143.js";import{u as t}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function r(s){const n=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",ul:"ul",li:"li",strong:"strong"},t(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Release Management"}),`
`,e.jsx(i,{}),`
`,e.jsx(n.h1,{id:"release-management",children:"Release Management"}),`
`,e.jsx(n.p,{children:"The article describes the release process management of UI5 Web Components."}),`
`,e.jsx(n.h2,{id:"release-strategy",children:"Release Strategy"}),`
`,e.jsxs(n.p,{children:["The UI5 Web Components follow the well-known ",e.jsx(n.a,{href:"https://docs.npmjs.com/about-semantic-versioning",target:"_blank",rel:"nofollow noopener noreferrer",children:"NPM Semantic Versioning strategy"}),`
and produce the following type of releases:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Patch releases"})}),`
`]}),`
`,e.jsx(n.p,{children:"Includes backward compatible bug fixes and increments the third digit, e.g. 1.0.1."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Minor releases"})}),`
`]}),`
`,e.jsx(n.p,{children:"Includes backward compatible new features and increments the middle digit and resets the last digit to zero, e.g. 1.1.0."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Major releases"})}),`
`]}),`
`,e.jsx(n.p,{children:"Includes changes that break backward compatibility and increments the first digit and resets the middle and last digits to zero, e.g. 2.0.0."}),`
`,e.jsx(n.h2,{id:"release-schedule",children:"Release Schedule"}),`
`,e.jsx(n.p,{children:"Here is the established release process of UI5 Web Components:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Monthly Stable Releases"})," - 1.11.0, 1.12.0....1.18.0"]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Every start of the month, a new minor version is released, which we consider stable and recommended for consumers.
Check the `,e.jsx(n.a,{href:"https://github.com/SAP/ui5-webcomponents/projects?type=classic",target:"_blank",rel:"nofollow noopener noreferrer",children:"Release Timelines"})," for up-to-date information (the related content is at the bottom of the page)."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Weekly Preview Releases"})," - 1.13.0-rc.0, 1.13.0-rc.1, 1.13.0-rc.2 (preview of 1.13)"]}),`
`]}),`
`,e.jsx(n.p,{children:`Every week on Thursday, a new release candidate version is released, considered a preview of the upcoming minor version.
It's more up-to-date with the latest development and it's useful for consumers that would like to get frequent updates and test upcoming features in the minor version.`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"On-demand Patch Releases"})," - 1.13.1, 1.13.2, 1.13.3"]}),`
`]}),`
`,e.jsx(n.p,{children:"Patches are released on-demand for high-priority issues."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The changelog of all releases can be found on the ",e.jsx(n.a,{href:"https://github.com/SAP/ui5-webcomponents/releases",target:"_blank",rel:"nofollow noopener noreferrer",children:"GitHub Release"})," page."]}),`
`,e.jsx(l,{})]})}function b(s={}){const{wrapper:n}=Object.assign({},t(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(r,s)})):r(s)}export{b as default};
