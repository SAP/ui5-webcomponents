import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as r,F as l}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(i){const n=Object.assign({h1:"h1",h2:"h2",p:"p",a:"a",code:"code",br:"br",h3:"h3",ul:"ul",li:"li",h4:"h4",h5:"h5",strong:"strong",pre:"pre"},s(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Contributing/Conventions and guidelines"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"development-conventions-and-guidelines",children:"Development Conventions and Guidelines"}),`
`,e.jsx(n.h2,{id:"javascript-coding-guidelines",children:"JavaScript Coding Guidelines"}),`
`,e.jsxs(n.p,{children:["We enforce code style rules using ",e.jsx(n.a,{href:"https://eslint.org",target:"_blank",rel:"nofollow noopener noreferrer",children:"ESLint"}),". Execute ",e.jsx(n.code,{children:"npm run lint"})," to check your code for style issues.",e.jsx(n.br,{}),`
`,"You may also find an ESLint integration for your favorite IDE ",e.jsx(n.a,{href:"https://eslint.org/docs/user-guide/integrations",target:"_blank",rel:"nofollow noopener noreferrer",children:"here"}),"."]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["Integration testing is based on ",e.jsx(n.a,{href:"https://webdriver.io/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Webdriver.io"}),". You can run all tests using ",e.jsx(n.code,{children:"npm run test"}),`.
If reasonable, take the time and write a test for the proposed change or fix. Learn more about testing at the `,e.jsx(n.a,{href:"./?path=/docs/docs-development-testing-ui5-web-components--docs",children:"Testing UI5 Web Components page"}),"."]}),`
`,e.jsx(n.h2,{id:"git-guidelines",children:"Git Guidelines"}),`
`,e.jsxs(n.p,{children:["We adhere to the ",e.jsx(n.a,{href:"https://conventionalcommits.org",target:"_blank",rel:"nofollow noopener noreferrer",children:"Conventional Commits"})," specification."]}),`
`,e.jsx(n.h3,{id:"commit-message-style",children:"Commit Message Style"}),`
`,e.jsx(n.p,{children:"The commit message consists of three parts:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"header"}),`
`,e.jsx(n.li,{children:"body (optional)"}),`
`,e.jsx(n.li,{children:"footer (optional)"}),`
`]}),`
`,e.jsx(n.h4,{id:"commit-header",children:"Commit Header"}),`
`,e.jsx(n.p,{children:"The commit header is the first line of the commit message. It consists of three parts: type, scope and description."}),`
`,e.jsx(n.h5,{id:"commit-type",children:"Commit Type"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["It must be one of the following:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"fix"})," - a bug fix (note: this will indicate a release). If possible, include a test in your change."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"feat"})," - a new feature (note: this will indicate a release)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"docs"})," - changes to the documentation or samples"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"style"})," - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"refactor"})," - a code change that neither fixes a bug nor adds a feature"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"perf"})," - a code change that improves performance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"test"})," - adding missing tests"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"chore"})," - changes to the build process or auxiliary tools and libraries such as documentation generation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"revert"})," - revert to a commit"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"WIP"})," - work in progress"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h5,{id:"commit-scope-optional",children:"Commit Scope (optional)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"It points to a specific component which is affected by the change. For example, ui5-button, ui5-card and ui5-table."}),`
`]}),`
`,e.jsx(n.h5,{id:"commit-description",children:"Commit Description"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.strong,{children:"imperative present tense"}),'. Instead of "I added feature xy" or "Adding tests for" use "Add feature xy" or "Add tests for".']}),`
`,e.jsxs(n.li,{children:["It should be no more than ",e.jsx(n.strong,{children:"100 characters"})," long."]}),`
`]}),`
`,e.jsx(n.h4,{id:"commit-body-optional",children:"Commit Body (optional)"}),`
`,e.jsx(n.p,{children:"After the commit header, there should be an empty line followed by the optional commit body."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Describe the intention and reasoning of the change."}),`
`]}),`
`,e.jsx(n.h4,{id:"commit-footer-optional",children:"Commit Footer (optional)"}),`
`,e.jsx(n.p,{children:"After the optional commit body, there should be an empty line followed by the optional footer."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the change introduces a breaking change, it should start with ",e.jsx(n.strong,{children:"BREAKING CHANGE:"})," followed by a description of the change.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"BREAKING CHANGE: remove press event"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If the change fixes an issue reported on GitHub, add the following line to the commit message:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Fixes #<issueNumber>"})," (e.g. ",e.jsx(n.code,{children:"Fixes #42"}),")"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h4,{id:"example",children:"Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
`})}),`
`,e.jsx(l,{})]})}function b(i={}){const{wrapper:n}=Object.assign({},s(),i.components);return n?e.jsx(n,Object.assign({},i,{children:e.jsx(t,i)})):t(i)}export{b as default};
