import{j as e}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-6087c063.js";import{B as i,F as a}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",p:"p",strong:"strong",a:"a",h3:"h3",code:"code",pre:"pre",h2:"h2"},s(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Frameworks/React"}),`
`,e.jsx(i,{}),`
`,e.jsx(n.h1,{id:"get-started-with-ui5-web-components--react",children:"Get Started with UI5 Web Components & React"}),`
`,e.jsx(n.p,{children:"In this tutorial, you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new React applications and to already existing ones."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," To get the best development experience, we recommend using the ",e.jsx(n.a,{href:"https://github.com/SAP/ui5-webcomponents-react",target:"_blank",rel:"nofollow noopener noreferrer",children:"UI5 Web Components for React"})," and follow the ",e.jsx(n.a,{href:"https://developers.sap.com/mission.react-spa.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"UI5 Web Components for React Тutorial"}),'. UI5 Web Components for React library is a React implementation of UI5 Web Components which overcomes several limitations of React in handling web components in general, explained in the "Additional Info" section below.']}),`
`,e.jsx(n.p,{children:"Here are the steps to use pure UI5 Web Components in React:"}),`
`,e.jsxs(n.h3,{id:"step-1-create-a-new-application-for-example-with-create-react-app",children:["Step 1. Create a new application. For example, with ",e.jsx(n.code,{children:"create-react-app"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npx create-react-app ui5-web-components-application
cd ui5-web-components-application
`})}),`
`,e.jsx(n.h3,{id:"step-2-add-ui5-web-components",children:"Step 2. Add UI5 Web Components."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @ui5/webcomponents --save
`})}),`
`,e.jsx(n.h3,{id:"step-3-import-the-components-that-you-are-going-to-use",children:"Step 3. Import the components that you are going to use."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js";
`})}),`
`,e.jsx(n.h3,{id:"step-4-use-the-imported-elements-in-your-application",children:"Step 4. Use the imported elements in your application."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button>Hello world!</ui5-button>
`})}),`
`,e.jsx(n.h3,{id:"step-5-launch-the-application",children:"Step 5. Launch the application."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`yarn start
`})}),`
`,e.jsx(n.h2,{id:"additional-info",children:"Additional Info"}),`
`,e.jsx(n.p,{children:"When developing with React, there are two slight React limitations you should know about. These are not related to UI5 Web Components per se, but with using custom elements in React in general."}),`
`,e.jsx(n.h3,{id:"event-binding",children:"Event Binding"}),`
`,e.jsxs(n.p,{children:["In order to use the events provided by UI5 Web Components, currently you need to get a ",e.jsx(n.code,{children:"ref"})," to the component because React doesn't support custom events. Here is an example of what you need to do in order to use the events provided by UI5 Web Components:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`class Home extends Component {

    constructor (props) {
        super(props);
        this.switch = React.createRef();
    }

    componentDidMount() {
        this.switch.addEventListener('change', event => {
            console.log('switch is toggled');
        })
    }

    render(){
        return(
            <ui5-switch ref={this.switch}></ui5-switch>
        );
    }
}
`})}),`
`,e.jsx(n.h3,{id:"boolean-properties-binding",children:"Boolean Properties Binding"}),`
`,e.jsxs(n.p,{children:["For boolean properties like ",e.jsx(n.code,{children:"collapsed"}),"  in ",e.jsx(n.code,{children:"ui5-panel"}),", instead of setting true or false, you have to take care of the presence of the property. Here is an example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-panel header-text="Achievements" collapsed={!this.state.achievements.length || undefined}>
    <!-- Content of ui5-panel -->
</ui5-panel>
`})}),`
`,e.jsx(n.h3,{id:"ui5-web-components-for-react",children:"UI5 Web Components for React"}),`
`,e.jsxs(n.p,{children:["As mentioned above, for a better development experience (and to elegantly work around these 2 React limitations), check out UI5 Web Components for React, ",e.jsx(n.a,{href:"https://github.com/SAP/ui5-webcomponents-react",target:"_blank",rel:"nofollow noopener noreferrer",children:"UI5 Web Components for React"})," and ",e.jsx(n.a,{href:"https://developers.sap.com/mission.react-spa.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"this tutorial"}),"."]}),`
`,e.jsx(a,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},s(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{f as default};
