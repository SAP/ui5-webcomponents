"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[1916],{56665:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>a,toc:()=>d});var t=s(31085),i=s(71184);const l={},o="Running the Website",a={id:"docs/contributing/website",title:"Running the Website",description:"The UI5 Web Components Website app is the entry point of the UI5 Web Components project.",source:"@site/docs/docs/5-contributing/04-website.md",sourceDirName:"docs/5-contributing",slug:"/docs/contributing/website",permalink:"/ui5-webcomponents/nightly/docs/contributing/website",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Definition of Done",permalink:"/ui5-webcomponents/nightly/docs/contributing/DoD"},next:{title:"Migration Guides",permalink:"/ui5-webcomponents/nightly/docs/migration-guides/"}},r={},d=[{value:"Run the Website",id:"run-the-website",level:2},{value:"Create New Sample",id:"create-new-sample",level:2},{value:"The <code>main.js</code> file",id:"the-mainjs-file",level:3},{value:"The <code>sample.html</code> file",id:"the-samplehtml-file",level:3},{value:"The <code>{sample_name}.md</code> file",id:"the-sample_namemd-file",level:3},{value:"Show the Sample",id:"show-the-sample",level:2},{value:"Conventions",id:"conventions",level:2},{value:"Sample Name",id:"sample-name",level:3},{value:"Sample Title and Description",id:"sample-title-and-description",level:3},{value:"Sample Order",id:"sample-order",level:3},{value:"The &quot;Basic&quot; Sample",id:"the-basic-sample",level:3}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"running-the-website",children:"Running the Website"}),"\n",(0,t.jsx)(n.p,{children:"The UI5 Web Components Website app is the entry point of the UI5 Web Components project.\nThe app includes documentation, API reference and samples for all the available web components."}),"\n",(0,t.jsx)(n.p,{children:"The website can be run locally to test your changes and samples.\nIn order to do so, you have to follow the steps below:"}),"\n",(0,t.jsx)(n.p,{children:"In your terminal, run the following commands:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn\nyarn start:website\n"})}),"\n",(0,t.jsx)(n.p,{children:"This will build all the necessary assets and will start local server on your machine\nand finally open the website in your browser."}),"\n",(0,t.jsx)(n.h1,{id:"creating-website-samples",children:"Creating Website Samples"}),"\n",(0,t.jsxs)(n.p,{children:["The website app is developed in its own package ",(0,t.jsx)(n.code,{children:"packages/website"}),". Components features or states are demonstrated via samples meant for consumers.\nThe samples are placed in the ",(0,t.jsx)(n.code,{children:"/packages/website/docs/_samples"})," folder."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"For example:"}),"\nThe Button samples can be found in the ",(0,t.jsx)(n.code,{children:"/packages/website/docs/_samples/main/Button"})," folder."]}),"\n",(0,t.jsx)(n.h2,{id:"run-the-website",children:"Run the Website"}),"\n",(0,t.jsx)(n.p,{children:"Runs project build + website start."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn start:website\n"})}),"\n",(0,t.jsx)(n.p,{children:"However, in most cases you have the project built, so it would be faster\nto just start the website:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cd packages/website\nyarn start\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," In case of issues with the second flow, most likely you need ",(0,t.jsx)(n.code,{children:"yarn build"})," in the root."]}),"\n",(0,t.jsx)(n.h2,{id:"create-new-sample",children:"Create New Sample"}),"\n",(0,t.jsxs)(n.p,{children:["A regular component sample consists of a folder + 3 files (",(0,t.jsx)(n.code,{children:"{sample_name}.md"}),", ",(0,t.jsx)(n.code,{children:"main.js"})," and ",(0,t.jsx)(n.code,{children:"sample.html"}),") that you need to create. Let's go trough every one of them:"]}),"\n",(0,t.jsxs)(n.h3,{id:"the-mainjs-file",children:["The ",(0,t.jsx)(n.code,{children:"main.js"})," file"]}),"\n",(0,t.jsxs)(n.p,{children:["In the ",(0,t.jsx)(n.code,{children:"main.js"})," file, we import the components and assets (icons, illustration) required by the sample."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For example:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import "@ui5/webcomponents/dist/Button.js";\nimport "@ui5/webcomponents-icons/dist/edit.js";\nimport "@ui5/webcomponents-icons/dist/account.js";\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"the-samplehtml-file",children:["The ",(0,t.jsx)(n.code,{children:"sample.html"})," file"]}),"\n",(0,t.jsxs)(n.p,{children:["In the ",(0,t.jsx)(n.code,{children:"sample.html"})," file, we use the web components as in regular HTML page."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For example:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-button icon="sap-icon://edit" design="Default" tooltip="Edit Button"></ui5-button>\n    <ui5-button icon="sap-icon://account" design="Transparent" tooltip="Account Button"></ui5-button>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n\n'})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," The ",(0,t.jsx)(n.code,{children:"playground-fold"})," comments will fold this part of the code to highlight the important part - the components usage."]}),"\n",(0,t.jsxs)(n.h3,{id:"the-sample_namemd-file",children:["The ",(0,t.jsx)(n.code,{children:"{sample_name}.md"})," file"]}),"\n",(0,t.jsxs)(n.p,{children:["In the ",(0,t.jsx)(n.code,{children:".md"})," file we instantiate the ",(0,t.jsx)(n.code,{children:"Editor"})," component (file editor + preview) that will display your sample and show the code behind it."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For example:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:"import html from '!!raw-loader!./sample.html';\nimport js from '!!raw-loader!./main.js';\n\n<Editor html={html} js={js} />\n"})}),"\n",(0,t.jsx)(n.h2,{id:"show-the-sample",children:"Show the Sample"}),"\n",(0,t.jsx)(n.p,{children:"In the previous step we have created our sample. Now, it's time to show and document it."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Open the ",(0,t.jsx)(n.code,{children:"packages/website/docs/_components_pages"})," folder."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Find your component's ",(0,t.jsx)(n.code,{children:".mdx"})," file."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"For example:"})," ",(0,t.jsx)(n.code,{children:"packages/website/docs/_components_pages/main/Button.mdx"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Import the newly created sample."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For example:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'import MyNewSample from "../../_samples/main/Button/MyNewSample/MyNewSample.md";`\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Instantiate the sample and add title + description."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For example:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-.md",children:"### My New Sample\nThe Button supports several designs to indicate the priority or the nature of the action.\n\n<MyNewSample />\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," Changes in the sample files (",(0,t.jsx)(n.code,{children:".md"}),", ",(0,t.jsx)(n.code,{children:".html"}),", ",(0,t.jsx)(n.code,{children:".js"}),") are detected and the server reloads. However, changes in the ",(0,t.jsx)(n.code,{children:".mdx"})," file are not watched - restart of the server is needed."]}),"\n",(0,t.jsx)(n.h2,{id:"conventions",children:"Conventions"}),"\n",(0,t.jsx)(n.h3,{id:"sample-name",children:"Sample Name"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["The sample name and the folder that includes the sample files should match the ",(0,t.jsx)(n.code,{children:".md"})," file name (",(0,t.jsx)(n.code,{children:"Button/IconOnly/IconOnly.md"}),")."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Regarding the naming, it's best to consult with KM and use existing ones as reference."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"sample-title-and-description",children:"Sample Title and Description"}),"\n",(0,t.jsx)(n.p,{children:'The title ("My New Sample") and the description ("The Button..") will be displayed at the top of the sample itself. Adding title and description is recommended -  they help viewers better understand what they are looking at.'}),"\n",(0,t.jsx)(n.h3,{id:"sample-order",children:"Sample Order"}),"\n",(0,t.jsx)(n.p,{children:'Add new samples in the "More Samples" section where it best fits among the existing samples.'}),"\n",(0,t.jsx)(n.h3,{id:"the-basic-sample",children:'The "Basic" Sample'}),"\n",(0,t.jsx)(n.p,{children:'All components have a sample called "Basic" used as the first sample displayed right-after the component\'s overview. Don\'t use "Basic" for other samples.'})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},71184:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(14041);const i={},l=t.createContext(i);function o(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);