import{j as e}from"./jsx-runtime-670e1be8.js";import{M as s}from"./index-6087c063.js";import{B as i,F as a}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function n(t){const o=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",h3:"h3",pre:"pre",code:"code",ul:"ul",li:"li"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Contributing/Storybook samples"}),`
`,e.jsx(i,{}),`
`,e.jsx(o.h1,{id:"creating-storybook-samples",children:"Creating Storybook Samples"}),`
`,e.jsx(o.p,{children:`The UI5 Web Components Storybook app is a playground for testing and documenting the UI5 Web Components library.
It allows developers to create stories for each UI component, capturing its rendered state in various scenarios,
and to document all the potential states that a component can display.`}),`
`,e.jsx(o.h2,{id:"running-the-storybook-app-locally",children:"Running the Storybook App Locally"}),`
`,e.jsxs(o.p,{children:["To run the ",e.jsx(o.a,{href:"https://sap.github.io/ui5-webcomponents/",target:"_blank",rel:"nofollow noopener noreferrer",children:"UI5 Web Components Storybook app"})," locally and test your changes and samples, follow the steps below:"]}),`
`,e.jsx(o.h3,{id:"1-in-the-root-folder-of-the-project-run-the-following-command",children:"1. In the root folder of the project, run the following command:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-bash",children:`yarn
yarn start:storybook
`})}),`
`,e.jsxs(o.p,{children:[e.jsx("b",{children:"Note:"})," This are required only for running the Storybook app locally and not for general development."]}),`
`,e.jsx(o.h2,{id:"whats-a-story",children:"What's a Story"}),`
`,e.jsx(o.p,{children:"A story is a documentation of a UI component that captures its rendered state in various scenarios. Stories are useful for documenting all the potential states that a component can display, and they allow developers to test UI components in isolation."}),`
`,e.jsx(o.p,{children:"UI components can be rendered in various scenarios, such as with different props or state, or in different layouts or contexts. Stories capture these scenarios and provide documentation of the component's behavior in each scenario."}),`
`,e.jsx(o.h2,{id:"where-to-write-stories",children:"Where to write stories"}),`
`,e.jsxs(o.p,{children:["Stories are written in the ",e.jsx(o.code,{children:"_stories"})," folder of the playground package. For example, the stories for the ",e.jsx(o.code,{children:"ui5-button"})," component are located in the ",e.jsx(o.code,{children:"packages/playground/_stories/Button.stories.ts"})," file."]}),`
`,e.jsx(o.h2,{id:"how-to-write-stories",children:"How to write stories"}),`
`,e.jsxs(o.p,{children:["The storybook app uses the ",e.jsx(o.a,{href:"https://storybook.js.org/docs/basics/introduction/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Storybook framework"})," to render the stories. The stories are written in the ",e.jsx(o.a,{href:"https://storybook.js.org/docs/web-components/api/csf",target:"_blank",rel:"nofollow noopener noreferrer",children:"Component Story Format (CSF)"})," format."]}),`
`,e.jsx(o.p,{children:"The args object is used to define the properties of the component, which can be edited in the playground by users. Decorators and parameters can be used to enhance the documentation of stories."}),`
`,e.jsx(o.p,{children:"Here is an example of a story for the ui5-button component:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-ts",children:`import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export default {
  title: "main/Button",
  component: "ui5-button",
};

export const Default = (args) => html\`
  <ui5-button ?disabled="\${ifDefined(args.disabled)}">\${unsafeHTML(args.default)}</ui5-button>
\`;

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  default: "Disabled",
};

Disabled.decorators = [ ... ];
Disabled.parameters = { ... };
Disabled.storyName = 'So simple!'; // e.g. to rename the story in the sidebar, if not set the name of the const export is used
`})}),`
`,e.jsxs(o.p,{children:["Every property defined in the ",e.jsx(o.code,{children:"args"})," object of the named export will end up as input control in the playground that users can edit."]}),`
`,e.jsx(o.h3,{id:"story-decorators",children:"Story Decorators"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.a,{href:"https://storybook.js.org/docs/web-components/writing-stories/decorators",target:"_blank",rel:"nofollow noopener noreferrer",children:"Decorators"})," are used to wrap stories with extra markup or context. This is useful if you want to include additional script."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-ts",children:`export const Template = (args) => html\`
  <ui5-dialog id="myDialog">
	\${unsafeHTML(args.default)}
  </ui5-dialog>
\`;

BasicDialog.decorators = [
  (story) => html\`
	<ui5-button id="dialogOpener">Open Dialog</ui5-button>
	\${story()}
	<script>
		document.getElementById("dialogOpener").addEventListener("click", () => {
			document.getElementById("myDialog").open();
		});
	<\/script>
  \`,
];
`})}),`
`,e.jsx(o.h3,{id:"story-parameters",children:"Story parameters"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.a,{href:"https://storybook.js.org/docs/web-components/writing-stories/parameters",target:"_blank",rel:"nofollow noopener noreferrer",children:"Parameters"})," are static, metadata about a story, used to control the behavior of Storybook features and addons."]}),`
`,e.jsx(o.p,{children:"They can be used both on the default export (Component parameters), applicable to all stories of the component:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-ts",children:`export default {
  title: "main/CheckBox",
  component: "ui5-checkbox",
  parameters: {
	  controls: { include: ["indeterminate", "checked"] }
  }
};
`})}),`
`,e.jsx(o.p,{children:"Or per every named export (Story Parameters), applicable to a specific story:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-ts",children:`BasicCheckBox.parameters = {
    controls: {
        include: ["indeterminate", "checked"],
    },
};
`})}),`
`,e.jsxs(o.p,{children:["Or globally in the ",e.jsx(o.code,{children:".storybook/preview.ts"})," file."]}),`
`,e.jsxs(o.p,{children:["The above example includes only the ",e.jsx(o.code,{children:"indeterminate"}),", ",e.jsx(o.code,{children:"checked"})," properties in the playground for users to edit."]}),`
`,e.jsx(o.h2,{id:"documentation",children:"Documentation"}),`
`,e.jsxs(o.p,{children:["The documentation for each component is automatically produced using the ",e.jsx(o.code,{children:"custom-elements.json"})," file. Additionally, there is an ",e.jsx(o.code,{children:"argTypes.ts"})," file located beside each ",e.jsx(o.code,{children:".stories.ts"})," file. It is generated during build time and contains extra properties that enhance the documentation beyond what is available in the ",e.jsx(o.code,{children:"custom-elements.json"})," file. This file should not be edited directly, as it can only be modified by the ",e.jsx(o.code,{children:"packages/playground/build-scripts-storybook/samples-prepare.ts"})," script."]}),`
`,e.jsx(o.h3,{id:"docs-page",children:"Docs page"}),`
`,e.jsxs(o.p,{children:["Every story has a ",e.jsx(o.code,{children:"docs"})," page in the storybook's sidebar. Usually, this page is generated automatically by storybook but it can be customized by adding a ",e.jsx(o.code,{children:"docs"})," property to the story parameters."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-ts",children:`export default {
    title: "Main/Button",
    component,
    argTypes,
} as Meta<Button>;
`})}),`
`,e.jsx(o.h2,{id:"configuration",children:"Configuration"}),`
`,e.jsxs(o.p,{children:["Storybook configuration is located in the ",e.jsx(o.code,{children:".storybook"})," folder."]}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"preview.ts"})," file is the main configuration file. It is used to configure the storybook app in terms of UI features, global parameters and decorators."]}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"main.js"})," file is used to configure the storybook app in terms of the stories that should be loaded, as well as the addons that should be used. Build time configuration is also done here."]}),`
`,e.jsxs(o.p,{children:["The Manager configured in ",e.jsx(o.code,{children:"manager.tsx"})," file is the UI responsible for rendering the search, the toolbar, registering custom addons, as well as theming the UI."]}),`
`,e.jsx(o.h3,{id:"build-scripts",children:"Build scripts"}),`
`,e.jsxs(o.p,{children:["Several build scripts are used to generate the stories documentation. They are located in the ",e.jsx(o.code,{children:"packages/playground/build-scripts-storybook"})," folder. Ran before every build of the storybook, they are responsible for generating the ",e.jsx(o.code,{children:"argTypes.ts"})," file, to merge the ",e.jsx(o.code,{children:"custom-elements.json"})," files and parse the content of the ",e.jsx(o.code,{children:"docs"})," folder to ",e.jsx(o.code,{children:"mdx"})," format."]}),`
`,e.jsx(o.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(o.p,{children:"If you encounter an error when running yarn storybook, try the following:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Storybook parses the documentation from the ",e.jsx(o.code,{children:"docs"})," folder. Files are transformed from ",e.jsx(o.code,{children:".md"})," to ",e.jsx(o.code,{children:".mdx"})," format. If you encounter an error, check if it is mdx related, locate the errored file and use the ",e.jsx(o.a,{href:"https://mdxjs.com/playground/",target:"_blank",rel:"nofollow noopener noreferrer",children:"MDX Playground"})," to fix it."]}),`
`]}),`
`,e.jsx(a,{})]})}function j(t={}){const{wrapper:o}=Object.assign({},r(),t.components);return o?e.jsx(o,Object.assign({},t,{children:e.jsx(n,t)})):n(t)}export{j as default};
