import{j as e}from"./jsx-runtime-670e1be8.js";import{M as s}from"./index-6087c063.js";import{B as r,F as l}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",h2:"h2",code:"code",p:"p",pre:"pre",strong:"strong",ul:"ul",li:"li"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Advanced/Scoping"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"micro-frontends-and-custom-elements-scoping",children:"Micro-Frontends and Custom Elements Scoping"}),`
`,e.jsxs(n.h2,{id:"what-does-scoping-mean",children:["What does ",e.jsx(n.code,{children:"scoping"})," mean?"]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"scoping"})," feature lets you add an arbitrary suffix to the names of all UI5 Web Components' custom elements:"]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
`})}),`
`,e.jsx(n.p,{children:"Then all names can only be used with the supplied suffix:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-card-demo>
	<ui5-title-demo>This card is scoped</ui5-title-demo>
	<ui5-button-demo>Click me</ui5-button-demo>
</ui5-card-demo>
`})}),`
`,e.jsx(n.p,{children:"Trying to use them with the standard names will not work (the custom elements won't be upgraded), so for example the following:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button>Click me</ui5-button>
`})}),`
`,e.jsx(n.p,{children:"will not have any effect."}),`
`,e.jsxs(n.h2,{id:"when-do-i-need-to-use-the-scoping-feature",children:["When do I need to use the ",e.jsx(n.code,{children:"scoping"})," feature?"]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"scoping"})," feature is completely optional. It is not needed for application development, but it is strongly recommended when building ",e.jsx(n.strong,{children:"libraries"})," and ",e.jsx(n.strong,{children:"micro-frontends"}),`.
It ensures that the custom elements that your code uses have not already been reserved by another library or an older version of UI5 Web Components.`]}),`
`,e.jsx(n.p,{children:`If, for example, your code may be loaded on demand by unknown applications as a third-party service, there is always the risk that the app
or another third-party library, loaded by the app, may use an older version of UI5 Web Components which means that all custom elements will be
upgraded with this version, while your code may rely on newer features.`}),`
`,e.jsx(n.p,{children:"Imagine the following integration scenario of an app, using several third-party libraries, loaded on demand (and not bundled with the app):"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<body>

	<!-- Application code, using UI5 Web Components version 1.0.1 -->
	<div id="application-container">
		<ui5-title>This is the new app with many third-party extensions!</ui5-title>
		<ui5-card>
			<ui5-button>Hello</ui5-button>
			<ui5-input></ui5-input>
		</ui5-card>
	</div>

	<!-- Code inserted by "common help" library, using UI5 Web Components version 1.2.0 -->
	<div id="common-help-container">
		<ui5-button-chlp new-button-prop="1">Help Menu</ui5-button-chlp>
		<ui5-input-chlp value="Type your question"></ui5-input-chlp>
	</div>

	<!-- Code inserted by "global footer" library, using UI5 Web Components version 1.3.0 -->
	<footer id="global-footer-container">
		<global-footer-main>
			<ui5-button-glob-foot new-button-prop="2" even-newer-button-prop="3">Profile</ui5-button-glob-foot>
			<ui5-link-glob-foot>Contacts</ui5-link-glob-foot>
		</global-footer-main>
	</footer>

</body>
`})}),`
`,e.jsx(n.p,{children:"In the example above:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The app itself is using an old version (",e.jsx(n.code,{children:"1.0.1"}),") of UI5 Web Components (which has already upgraded the ",e.jsx(n.code,{children:"ui5-card"}),", ",e.jsx(n.code,{children:"ui5-button"})," and ",e.jsx(n.code,{children:"ui5-input"})," tags)."]}),`
`,e.jsxs(n.li,{children:['The imaginary "common help" library, based on a newer version (',e.jsx(n.code,{children:"1.2.0"}),"), uses the scoping suffix ",e.jsx(n.code,{children:"chlp"}),"."]}),`
`,e.jsxs(n.li,{children:['The imaginary "global footer" library, based on an even newer version (',e.jsx(n.code,{children:"1.3.0"}),"), uses the scoping suffix ",e.jsx(n.code,{children:"glob-foot"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["This allows the libraries to use new ",e.jsx(n.code,{children:"ui5-button"})," properties such as ",e.jsx(n.code,{children:"newButtonProp"})," and ",e.jsx(n.code,{children:"evenNewerButtonProp"})," that are not found in older versions."]}),`
`,e.jsx(n.h2,{id:"how-can-i-fine-tune-the-scoping-feature",children:"How can I fine-tune the scoping feature?"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-my-/, /-test-/]});
`})}),`
`,e.jsxs(n.p,{children:["By default, all UI5 Web Components starting with ",e.jsx(n.code,{children:"ui5-"})," are scoped when you call ",e.jsx(n.code,{children:"setCustomElementsScopingSuffix"}),`.
However, you have full control over which tags are scoped and which not. In the example above, tags starting with `,e.jsx(n.code,{children:"ui5-my-"}),` and tags
having the word `,e.jsx(n.code,{children:"-test-"})," in their name are not scoped."]}),`
`,e.jsx(n.p,{children:`Setting scoping rules is handy if, for example, your library uses both standard and custom UI5 Web Components and you don't want
to scope the custom ones (as no disambiguation will be necessary for them).`}),`
`,e.jsx(l,{})]})}function j(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{j as default};
