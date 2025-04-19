"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[8574],{705:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var n=t(1085),r=t(1184);const s={},i="Creating Storybook Samples",a={id:"docs/contributing/storybook-samples",title:"Creating Storybook Samples",description:"The UI5 Web Components Storybook app is a playground for testing and documenting the UI5 Web Components library.",source:"@site/docs/docs/6-contributing/06-storybook-samples.md",sourceDirName:"docs/6-contributing",slug:"/docs/contributing/storybook-samples",permalink:"/ui5-webcomponents/v1/docs/contributing/storybook-samples",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Running Storybook Locally",permalink:"/ui5-webcomponents/v1/docs/contributing/storybook"},next:{title:"Frequently Asked Questions",permalink:"/ui5-webcomponents/v1/docs/FAQ"}},d={},l=[{value:"Running the Storybook App Locally",id:"running-the-storybook-app-locally",level:2},{value:"1. In the root folder of the project, run the following command:",id:"1-in-the-root-folder-of-the-project-run-the-following-command",level:3},{value:"What&#39;s a Story",id:"whats-a-story",level:2},{value:"Where to write stories",id:"where-to-write-stories",level:2},{value:"How to write stories",id:"how-to-write-stories",level:2},{value:"Story Decorators",id:"story-decorators",level:3},{value:"Story parameters",id:"story-parameters",level:3},{value:"Documentation",id:"documentation",level:2},{value:"Docs page",id:"docs-page",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Build scripts",id:"build-scripts",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2}];function c(e){const o={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.h1,{id:"creating-storybook-samples",children:"Creating Storybook Samples"}),"\n",(0,n.jsx)(o.p,{children:"The UI5 Web Components Storybook app is a playground for testing and documenting the UI5 Web Components library.\nIt allows developers to create stories for each UI component, capturing its rendered state in various scenarios,\nand to document all the potential states that a component can display."}),"\n",(0,n.jsx)(o.h2,{id:"running-the-storybook-app-locally",children:"Running the Storybook App Locally"}),"\n",(0,n.jsxs)(o.p,{children:["To run the ",(0,n.jsx)(o.a,{href:"https://sap.github.io/ui5-webcomponents/",children:"UI5 Web Components Storybook app"})," locally and test your changes and samples, follow the steps below:"]}),"\n",(0,n.jsx)(o.h3,{id:"1-in-the-root-folder-of-the-project-run-the-following-command",children:"1. In the root folder of the project, run the following command:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",children:"yarn\nyarn start:storybook\n"})}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)("b",{children:"Note:"})," This are required only for running the Storybook app locally and not for general development."]}),"\n",(0,n.jsx)(o.h2,{id:"whats-a-story",children:"What's a Story"}),"\n",(0,n.jsx)(o.p,{children:"A story is a documentation of a UI component that captures its rendered state in various scenarios. Stories are useful for documenting all the potential states that a component can display, and they allow developers to test UI components in isolation."}),"\n",(0,n.jsx)(o.p,{children:"UI components can be rendered in various scenarios, such as with different props or state, or in different layouts or contexts. Stories capture these scenarios and provide documentation of the component's behavior in each scenario."}),"\n",(0,n.jsx)(o.h2,{id:"where-to-write-stories",children:"Where to write stories"}),"\n",(0,n.jsxs)(o.p,{children:["Stories are written in the ",(0,n.jsx)(o.code,{children:"_stories"})," folder of the playground package. For example, the stories for the ",(0,n.jsx)(o.code,{children:"ui5-button"})," component are located in the ",(0,n.jsx)(o.code,{children:"packages/playground/_stories/Button.stories.ts"})," file."]}),"\n",(0,n.jsx)(o.h2,{id:"how-to-write-stories",children:"How to write stories"}),"\n",(0,n.jsxs)(o.p,{children:["The storybook app uses the ",(0,n.jsx)(o.a,{href:"https://storybook.js.org/docs/basics/introduction/",children:"Storybook framework"})," to render the stories. The stories are written in the ",(0,n.jsx)(o.a,{href:"https://storybook.js.org/docs/web-components/api/csf",children:"Component Story Format (CSF)"})," format."]}),"\n",(0,n.jsx)(o.p,{children:"The args object is used to define the properties of the component, which can be edited in the playground by users. Decorators and parameters can be used to enhance the documentation of stories."}),"\n",(0,n.jsx)(o.p,{children:"Here is an example of a story for the ui5-button component:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ts",children:'import { html } from "lit";\nimport { ifDefined } from "lit/directives/if-defined.js";\nimport { unsafeHTML } from "lit/directives/unsafe-html.js";\n\nexport default {\n  title: "main/Button",\n  component: "ui5-button",\n};\n\nexport const Default = (args) => html`\n  <ui5-button ?disabled="${ifDefined(args.disabled)}">${unsafeHTML(args.default)}</ui5-button>\n`;\n\nexport const Disabled = Template.bind({});\nDisabled.args = {\n  disabled: true,\n  default: "Disabled",\n};\n\nDisabled.decorators = [ ... ];\nDisabled.parameters = { ... };\nDisabled.storyName = \'So simple!\'; // e.g. to rename the story in the sidebar, if not set the name of the const export is used\n'})}),"\n",(0,n.jsxs)(o.p,{children:["Every property defined in the ",(0,n.jsx)(o.code,{children:"args"})," object of the named export will end up as input control in the playground that users can edit."]}),"\n",(0,n.jsx)(o.h3,{id:"story-decorators",children:"Story Decorators"}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.a,{href:"https://storybook.js.org/docs/web-components/writing-stories/decorators",children:"Decorators"})," are used to wrap stories with extra markup or context. This is useful if you want to include additional script."]}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ts",children:'export const Template = (args) => html`\n  <ui5-dialog id="myDialog">\n\t${unsafeHTML(args.default)}\n  </ui5-dialog>\n`;\n\nBasicDialog.decorators = [\n  (story) => html`\n\t<ui5-button id="dialogOpener">Open Dialog</ui5-button>\n\t${story()}\n\t<script>\n\t\tdocument.getElementById("dialogOpener").addEventListener("click", () => {\n\t\t\tdocument.getElementById("myDialog").open();\n\t\t});\n\t<\/script>\n  `,\n];\n'})}),"\n",(0,n.jsx)(o.h3,{id:"story-parameters",children:"Story parameters"}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.a,{href:"https://storybook.js.org/docs/web-components/writing-stories/parameters",children:"Parameters"})," are static, metadata about a story, used to control the behavior of Storybook features and addons."]}),"\n",(0,n.jsx)(o.p,{children:"They can be used both on the default export (Component parameters), applicable to all stories of the component:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ts",children:'export default {\n  title: "main/CheckBox",\n  component: "ui5-checkbox",\n  parameters: {\n\t  controls: { include: ["indeterminate", "checked"] }\n  }\n};\n'})}),"\n",(0,n.jsx)(o.p,{children:"Or per every named export (Story Parameters), applicable to a specific story:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ts",children:'BasicCheckBox.parameters = {\n    controls: {\n        include: ["indeterminate", "checked"],\n    },\n};\n'})}),"\n",(0,n.jsxs)(o.p,{children:["Or globally in the ",(0,n.jsx)(o.code,{children:".storybook/preview.ts"})," file."]}),"\n",(0,n.jsxs)(o.p,{children:["The above example includes only the ",(0,n.jsx)(o.code,{children:"indeterminate"}),", ",(0,n.jsx)(o.code,{children:"checked"})," properties in the playground for users to edit."]}),"\n",(0,n.jsx)(o.h2,{id:"documentation",children:"Documentation"}),"\n",(0,n.jsxs)(o.p,{children:["The documentation for each component is automatically produced using the ",(0,n.jsx)(o.code,{children:"custom-elements.json"})," file. Additionally, there is an ",(0,n.jsx)(o.code,{children:"argTypes.ts"})," file located beside each ",(0,n.jsx)(o.code,{children:".stories.ts"})," file. It is generated during build time and contains extra properties that enhance the documentation beyond what is available in the ",(0,n.jsx)(o.code,{children:"custom-elements.json"})," file. This file should not be edited directly, as it can only be modified by the ",(0,n.jsx)(o.code,{children:"packages/playground/build-scripts-storybook/samples-prepare.ts"})," script."]}),"\n",(0,n.jsx)(o.h3,{id:"docs-page",children:"Docs page"}),"\n",(0,n.jsxs)(o.p,{children:["Every story has a ",(0,n.jsx)(o.code,{children:"docs"})," page in the storybook's sidebar. Usually, this page is generated automatically by storybook but it can be customized by adding a ",(0,n.jsx)(o.code,{children:"docs"})," property to the story parameters."]}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ts",children:'export default {\n    title: "Main/Button",\n    component,\n    argTypes,\n} as Meta<Button>;\n'})}),"\n",(0,n.jsx)(o.h2,{id:"configuration",children:"Configuration"}),"\n",(0,n.jsxs)(o.p,{children:["Storybook configuration is located in the ",(0,n.jsx)(o.code,{children:".storybook"})," folder."]}),"\n",(0,n.jsxs)(o.p,{children:["The ",(0,n.jsx)(o.code,{children:"preview.ts"})," file is the main configuration file. It is used to configure the storybook app in terms of UI features, global parameters and decorators."]}),"\n",(0,n.jsxs)(o.p,{children:["The ",(0,n.jsx)(o.code,{children:"main.js"})," file is used to configure the storybook app in terms of the stories that should be loaded, as well as the addons that should be used. Build time configuration is also done here."]}),"\n",(0,n.jsxs)(o.p,{children:["The Manager configured in ",(0,n.jsx)(o.code,{children:"manager.tsx"})," file is the UI responsible for rendering the search, the toolbar, registering custom addons, as well as theming the UI."]}),"\n",(0,n.jsx)(o.h3,{id:"build-scripts",children:"Build scripts"}),"\n",(0,n.jsxs)(o.p,{children:["Several build scripts are used to generate the stories documentation. They are located in the ",(0,n.jsx)(o.code,{children:"packages/playground/build-scripts-storybook"})," folder. Ran before every build of the storybook, they are responsible for generating the ",(0,n.jsx)(o.code,{children:"argTypes.ts"})," file, to merge the ",(0,n.jsx)(o.code,{children:"custom-elements.json"})," files and parse the content of the ",(0,n.jsx)(o.code,{children:"docs"})," folder to ",(0,n.jsx)(o.code,{children:"mdx"})," format."]}),"\n",(0,n.jsx)(o.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,n.jsx)(o.p,{children:"If you encounter an error when running yarn storybook, try the following:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:["Storybook parses the documentation from the ",(0,n.jsx)(o.code,{children:"docs"})," folder. Files are transformed from ",(0,n.jsx)(o.code,{children:".md"})," to ",(0,n.jsx)(o.code,{children:".mdx"})," format. If you encounter an error, check if it is mdx related, locate the errored file and use the ",(0,n.jsx)(o.a,{href:"https://mdxjs.com/playground/",children:"MDX Playground"})," to fix it."]}),"\n"]})]})}function h(e={}){const{wrapper:o}={...(0,r.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},1184:(e,o,t)=>{t.d(o,{R:()=>i,x:()=>a});var n=t(4041);const r={},s=n.createContext(r);function i(e){const o=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:o},e.children)}}}]);