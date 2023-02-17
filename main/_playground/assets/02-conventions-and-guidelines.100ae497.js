import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as r}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function f(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.exports.jsx(n,Object.assign({},t,{children:e.exports.jsx(o,{})})):o();function o(){const s=Object.assign({h1:"h1",h2:"h2",p:"p",a:"a",code:"code",br:"br",h3:"h3",ul:"ul",li:"li",h4:"h4",h5:"h5",strong:"strong",pre:"pre"},r(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Contributing/Conventions and guidelines"}),`
`,e.exports.jsx(s.h1,{children:"Development Conventions and Guidelines"}),`
`,e.exports.jsx(s.h2,{children:"JavaScript Coding Guidelines"}),`
`,e.exports.jsxs(s.p,{children:["We enforce code style rules using ",e.exports.jsx(s.a,{href:"https://eslint.org",children:"ESLint"}),". Execute ",e.exports.jsx(s.code,{children:"npm run lint"})," to check your code for style issues.",e.exports.jsx(s.br,{}),`
`,"You may also find an ESLint integration for your favorite IDE ",e.exports.jsx(s.a,{href:"https://eslint.org/docs/user-guide/integrations",children:"here"}),"."]}),`
`,e.exports.jsx(s.h2,{children:"Testing"}),`
`,e.exports.jsxs(s.p,{children:["Integration testing is based on ",e.exports.jsx(s.a,{href:"https://webdriver.io/",children:"Webdriver.io"}),". You can run all tests using ",e.exports.jsx(s.code,{children:"npm run test"}),`.
If reasonable, take the time and write a test for the proposed change or fix. Learn more about testing at the `,e.exports.jsx(s.a,{href:"https://github.com/SAP/ui5-webcomponents/blob/main/docs/5-development/05-testing-UI5-Web-Components.md",children:"Testing UI5 Web Components page"}),"."]}),`
`,e.exports.jsx(s.h2,{children:"Git Guidelines"}),`
`,e.exports.jsxs(s.p,{children:["We adhere to the ",e.exports.jsx(s.a,{href:"https://conventionalcommits.org",children:"Conventional Commits"})," specification."]}),`
`,e.exports.jsx(s.h3,{children:"Commit Message Style"}),`
`,e.exports.jsx(s.p,{children:"The commit message consists of three parts:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"header"}),`
`,e.exports.jsx(s.li,{children:"body (optional)"}),`
`,e.exports.jsx(s.li,{children:"footer (optional)"}),`
`]}),`
`,e.exports.jsx(s.h4,{children:"Commit Header"}),`
`,e.exports.jsx(s.p,{children:"The commit header is the first line of the commit message. It consists of three parts: type, scope and description."}),`
`,e.exports.jsx(s.h5,{children:"Commit Type"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["It must be one of the following:",`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"fix"})," - a bug fix (note: this will indicate a release). If possible, include a test in your change."]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"feat"})," - a new feature (note: this will indicate a release)"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"docs"})," - documentation only changes"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"style"})," - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"refactor"})," - a code change that neither fixes a bug nor adds a feature"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"perf"})," - a code change that improves performance"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"test"})," - adding missing tests"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"chore"})," - changes to the build process or auxiliary tools and libraries such as documentation generation"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"revert"})," - revert to a commit"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"WIP"})," - work in progress"]}),`
`]}),`
`]}),`
`]}),`
`,e.exports.jsx(s.h5,{children:"Commit Scope (optional)"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"It points to a specific component which is affected by the change. For example, ui5-button, ui5-card and ui5-table."}),`
`]}),`
`,e.exports.jsx(s.h5,{children:"Commit Description"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["Use the ",e.exports.jsx(s.strong,{children:"imperative present tense"}),'. Instead of "I added feature xy" or "Adding tests for" use "Add feature xy" or "Add tests for".']}),`
`,e.exports.jsxs(s.li,{children:["It should be no more than ",e.exports.jsx(s.strong,{children:"100 characters"})," long."]}),`
`]}),`
`,e.exports.jsx(s.h4,{children:"Commit Body (optional)"}),`
`,e.exports.jsx(s.p,{children:"After the commit header, there should be an empty line followed by the optional commit body."}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"Describe the intention and reasoning of the change."}),`
`]}),`
`,e.exports.jsx(s.h4,{children:"Commit Footer (optional)"}),`
`,e.exports.jsx(s.p,{children:"After the optional commit body, there should be an empty line followed by the optional footer."}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["If the change introduces a breaking change, it should start with ",e.exports.jsx(s.strong,{children:"BREAKING CHANGE:"})," followed by a description of the change.",`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"BREAKING CHANGE: remove press event"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.li,{children:["If the change fixes an issue reported on GitHub, add the following line to the commit message:",`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"Fixes #<issueNumber>"})," (e.g. ",e.exports.jsx(s.code,{children:"Fixes #42"}),")"]}),`
`]}),`
`]}),`
`]}),`
`,e.exports.jsx(s.h4,{children:"Example"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
`})})]})}}export{f as default};
//# sourceMappingURL=02-conventions-and-guidelines.100ae497.js.map
