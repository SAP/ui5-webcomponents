import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as r}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function b(n={}){const{wrapper:o}=Object.assign({},r(),n.components);return o?e.exports.jsx(o,Object.assign({},n,{children:e.exports.jsx(s,{})})):s();function s(){const t=Object.assign({h1:"h1",p:"p",strong:"strong",a:"a",h3:"h3",code:"code",pre:"pre",h2:"h2"},r(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Frameworks/React"}),`
`,e.exports.jsx(t.h1,{children:"Get Started with UI5 Web Components & React"}),`
`,e.exports.jsx(t.p,{children:"In this tutorial, you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new React applications and to already existing ones."}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Important:"})," The get the best development experience, we recommend using the ",e.exports.jsx(t.a,{href:"https://github.com/SAP/ui5-webcomponents-react",children:"UI5 Web Components for React"})," and follow the ",e.exports.jsx(t.a,{href:"https://developers.sap.com/mission.react-spa.html",children:"UI5 Web Components for React \u0422utorial"}),'. UI5 Web Components for React library is a React implementation of UI5 Web Components which overcomes several limitations of React in handling web components in general, explained in the "Additional Info" section below.']}),`
`,e.exports.jsx(t.p,{children:"Here are the steps to use pure UI5 Web Components in React:"}),`
`,e.exports.jsxs(t.h3,{children:["Step 1. Create a new application. For example, with ",e.exports.jsx(t.code,{children:"create-react-app"}),"."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-bash",children:`npx create-react-app ui5-web-components-application
cd ui5-web-components-application
`})}),`
`,e.exports.jsx(t.h3,{children:"Step 2. Add UI5 Web Components."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-bash",children:`npm install @ui5/webcomponents --save
`})}),`
`,e.exports.jsx(t.h3,{children:"Step 3. Import the components that you are going to use."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js";
`})}),`
`,e.exports.jsx(t.h3,{children:"Step 4. Use the imported elements in your application."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button>Hello world!</ui5-button>
`})}),`
`,e.exports.jsx(t.h3,{children:"Step 5. Launch the application."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-bash",children:`yarn start
`})}),`
`,e.exports.jsx(t.h2,{children:"Additional Info"}),`
`,e.exports.jsx(t.p,{children:"When developing with React, there are two slight React limitations you should know about. These are not related to UI5 Web Components per se, but with using custom elements in React in general."}),`
`,e.exports.jsx(t.h3,{children:"Event Binding"}),`
`,e.exports.jsxs(t.p,{children:["In order to use the events provided by UI5 Web Components, currently you need to get a ",e.exports.jsx(t.code,{children:"ref"})," to the component because React doesn't support custom events. Here is an example of what you need to do in order to use the events provided by UI5 Web Components:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class Home extends Component {

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
`,e.exports.jsx(t.h3,{children:"Boolean Properties Binding"}),`
`,e.exports.jsxs(t.p,{children:["For boolean properties like ",e.exports.jsx(t.code,{children:"collapsed"}),"  in ",e.exports.jsx(t.code,{children:"ui5-panel"}),", instead of setting true or false, you have to take care of the presence of the property. Here is an example:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-panel header-text="Achievements" collapsed={!this.state.achievements.length || undefined}>
    <!-- Content of ui5-panel -->
</ui5-panel>
`})}),`
`,e.exports.jsx(t.h3,{children:"UI5 Web Components for React"}),`
`,e.exports.jsxs(t.p,{children:["As mentioned above, for a better development experience (and to elegantly work around these 2 React limitations), check out UI5 Web Components for React, ",e.exports.jsx(t.a,{href:"https://github.com/SAP/ui5-webcomponents-react",children:"UI5 Web Components for React"})," and ",e.exports.jsx(t.a,{href:"https://developers.sap.com/mission.react-spa.html",children:"this tutorial"}),"."]})]})}}export{b as default};
//# sourceMappingURL=01-React.58636379.js.map
