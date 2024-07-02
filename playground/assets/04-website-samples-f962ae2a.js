import{j as e}from"./jsx-runtime-670e1be8.js";import{M as l}from"./index-6087c063.js";import{B as o,F as r}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(s){const n=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",h2:"h2",pre:"pre",h3:"h3",ul:"ul",li:"li"},i(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Docs/Contributing/Website samples"}),`
`,e.jsx(o,{}),`
`,e.jsx(n.h1,{id:"creating-website-samples",children:"Creating Website Samples"}),`
`,e.jsxs(n.p,{children:["The website app is developed in its own package ",e.jsx(n.code,{children:"packages/website"}),`. Components features or states are demonstrated via samples meant for consumers.
The samples are placed in the `,e.jsx(n.code,{children:"/packages/website/docs/_samples"})," folder."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"For example:"}),`
The Button samples can be found in the `,e.jsx(n.code,{children:"/packages/website/docs/_samples/main/Button"})," folder."]}),`
`,e.jsx(n.h2,{id:"run-the-website",children:"Run the Website"}),`
`,e.jsx(n.p,{children:"Runs project build + website start"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`yarn start:website
`})}),`
`,e.jsx(n.p,{children:`However, in most cases you have the project built, so faster would be
to just start the website:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`cd packages/website
yarn start
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," In case of issues with the second flow, most likely you need ",e.jsx(n.code,{children:"yarn build"})," in the root."]}),`
`,e.jsx(n.h2,{id:"create-new-sample",children:"Create New Sample"}),`
`,e.jsxs(n.p,{children:["A regular component sample consists of a folder + 3 files (",e.jsx(n.code,{children:"{sample_name}.md"}),", ",e.jsx(n.code,{children:"main.js"})," and ",e.jsx(n.code,{children:"sample.html"}),") that you need to create. Let's go trough every one of them:"]}),`
`,e.jsxs(n.h3,{id:"the-mainjs-file",children:["The ",e.jsx(n.code,{children:"main.js"})," file"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"main.js"})," file, we import the components and assets (icons, illustration) required by the sample."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"For example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/account.js";
`})}),`
`,e.jsxs(n.h3,{id:"the-samplehtml-file",children:["The ",e.jsx(n.code,{children:"sample.html"})," file"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"sample.html"})," file, we use the web components as in regular HTML page"]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"For example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- playground-fold -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample</title>
</head>

<body style="background-color: var(--sapBackgroundColor)">
    <!-- playground-fold-end -->

    <ui5-button icon="sap-icon://edit" design="Default" tooltip="Edit Button"></ui5-button>
    <ui5-button icon="sap-icon://account" design="Transparent" tooltip="Account Button"></ui5-button>
    <!-- playground-fold -->
    <script type="module" src="main.js"><\/script>
</body>

</html>
<!-- playground-fold-end -->

`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The ",e.jsx(n.code,{children:"playground-fold"})," comments will fold this part of the code to highlight the important part - the components usage."]}),`
`,e.jsxs(n.h3,{id:"the-sample_namemd-file",children:["The ",e.jsx(n.code,{children:"{sample_name}.md"})," file"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:".md"})," file we instantiate the ",e.jsx(n.code,{children:"Editor"})," component (file editor + preview) that will display your sample and show the code behind it."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"For example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-md",children:`import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
`})}),`
`,e.jsx(n.h2,{id:"show-the-sample",children:"Show the Sample"}),`
`,e.jsx(n.p,{children:"In the previous step we have created our sample. Now it's time to show and document it."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Open the ",e.jsx(n.code,{children:"packages/website/docs/_components_pages"})," folder"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Find your component's ",e.jsx(n.code,{children:".mdx"})," file."]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"For example:"})," ",e.jsx(n.code,{children:"packages/website/docs/_components_pages/main/Button.mdx"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Import the newly created sample"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"For example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:'import MyNewSample from "../../_samples/main/Button/MyNewSample/MyNewSample.md";`\n'})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Instantiate the sample and add title + description"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"For example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-.md",children:`### My New Sample
The Button supports several designs to indicate the priority or the nature of the action.

<MyNewSample />

`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Changes in the sample files (",e.jsx(n.code,{children:".md"}),", ",e.jsx(n.code,{children:".html"}),", ",e.jsx(n.code,{children:".js"}),") are detected and the server reloads. However, changes in the ",e.jsx(n.code,{children:".mdx"})," file are not watched - restart of the server is needed."]}),`
`,e.jsx(n.h2,{id:"conventions",children:"Conventions"}),`
`,e.jsx(n.h3,{id:"sample-name",children:"Sample Name"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["The sample name and the folder that includes the sample files should match the ",e.jsx(n.code,{children:".md"})," file name (",e.jsx(n.code,{children:"Button/IconOnly/IconOnly.md"}),")."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Regarding the naming, it's best to consult with KM and use existing ones as reference."}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"sample-title-and-description",children:"Sample Title and Description"}),`
`,e.jsx(n.p,{children:'The title ("My New Sample") and the description ("The Button..") will be displayed on top of the sample itself. Adding title and description is recommended -  they help viewers better understand what they are looking at.'}),`
`,e.jsx(n.h3,{id:"sample-order",children:"Sample Order"}),`
`,e.jsx(n.p,{children:'Add new samples in the "More Samples" section where it best fits among the existing samples.'}),`
`,e.jsx(n.h3,{id:"the-basic-sample",children:'The "Basic" Sample'}),`
`,e.jsx(n.p,{children:`All components have sample, called "Basic" and it's used as the first sample, displayed right-after the component's overview. Don't use "Basic" for other samples.`}),`
`,e.jsx(r,{})]})}function f(s={}){const{wrapper:n}=Object.assign({},i(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{f as default};
