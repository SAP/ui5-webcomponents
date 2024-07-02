import{j as e}from"./jsx-runtime-670e1be8.js";import{M as l}from"./index-6087c063.js";import{B as a,F as d}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(s){const n=Object.assign({h1:"h1",p:"p",h2:"h2",ol:"ol",li:"li",a:"a",code:"code",ul:"ul",pre:"pre",strong:"strong",h3:"h3",em:"em"},i(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Docs/Development/Understanding hbs templates"}),`
`,e.jsx(a,{}),`
`,e.jsx(n.h1,{id:"understanding-the-handlebars-hbs-templates",children:"Understanding the Handlebars (.hbs) Templates"}),`
`,e.jsx(n.p,{children:"The preferred way to write the renderers for UI5 Web Components (and supported directly by the build tools) is to use standard Handlebars templates with some additional custom syntax."}),`
`,e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#compilation",children:"Handlebars compilation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#design_goals",children:"Design goals"})}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.a,{href:"#context",children:["The context in ",e.jsx(n.code,{children:".hbs"})," files"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#context_global",children:"Global context"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#context_loops",children:"Context in loops"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#context_loops_accessing",children:"Accessing the global context from loops"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.a,{href:"#syntax",children:["The ",e.jsx(n.code,{children:".hbs"})," syntax"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_bindings",children:"Bindings"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_conditional",children:"Conditions"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_loops",children:"Loops"})}),`
`,e.jsx(n.li,{children:e.jsxs(n.a,{href:"#syntax_dot",children:["Property assignment (the ",e.jsx(n.code,{children:"."})," prefix)"]})}),`
`,e.jsx(n.li,{children:e.jsxs(n.a,{href:"#syntax_question_mark",children:["Boolean attribute assignment (the ",e.jsx(n.code,{children:"?"})," prefix)"]})}),`
`,e.jsx(n.li,{children:e.jsxs(n.a,{href:"#syntax_at",children:["Event handlers assignment (the ",e.jsx(n.code,{children:"@"})," prefix)"]})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_style_maps",children:"Style maps"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_class_maps",children:"Class maps"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_partials",children:"Partials"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#syntax_include",children:"Include"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.a,{href:"#slots",children:["Using the ",e.jsx(n.code,{children:"slot"})," element"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#slots_rendering",children:"Rendering slots"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#slots_individual",children:"Individual slots"})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"1-handlebars-compilation-",children:["1. Handlebars compilation ",e.jsx("a",{name:"compilation"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://handlebarsjs.com/guide/#simple-expressions",target:"_blank",rel:"nofollow noopener noreferrer",children:"Handlebars"})," templates (",e.jsx(n.code,{children:".hbs"}),") are compiled during build/development to ",e.jsx(n.a,{href:"https://lit.dev/docs/v1/lit-html/introduction/",target:"_blank",rel:"nofollow noopener noreferrer",children:"lit-html"})," templates (",e.jsx(n.code,{children:".lit.js"}),") and the lit templates are what's actually executed during runtime."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsxs(n.p,{children:["The following ",e.jsx(n.code,{children:"src/Demo.hbs"})," template"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<button>{{text}}</button>
`})}),`
`,e.jsxs(n.p,{children:["will be compiled to ",e.jsx(n.code,{children:"dist/generated/templates/DemoTemplate.lit.js"})," with the following content,"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:'import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";\nconst block0 = (context, tags, suffix) => html`<button>${ifDefined(context.text)}</button>`;\nexport default block0;\n'})}),`
`,e.jsx(n.p,{children:"and later tree-shaken by the bundler and bundled along with the rest of the component's code."}),`
`,e.jsxs(n.p,{children:["Therefore, the ",e.jsx(n.code,{children:".hbs"})," file is there just for convenience, the end result will always be an optimized lit-html."]}),`
`,e.jsxs(n.h2,{id:"2-design-goals-of-the-handlebars-templates-",children:["2. Design goals of the Handlebars templates ",e.jsx("a",{name:"design_goals"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Declarative"}),": write HTML in a form as close as possible to what will eventually be in the DOM (rather than writing template functions directly)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Abstract"}),": the template could be compiled to other formats in the future (not just lit-html) so it should only use universal concepts and no lit-specific features."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Separation of concerns"}),": the template must be as simple as possible with no complex expressions or calculations - variables that control structures (for example, ",e.jsx(n.code,{children:"{{#if}}"})," statements) should be precalculated."]}),`
`]}),`
`,e.jsxs(n.p,{children:["For these reasons, we would suggest you use ",e.jsx(n.code,{children:".hbs"})," templates and have them compiled to lit-html, instead of directly writing ",e.jsx(n.code,{children:"lit-html"})," renderers, although that's also possible if you prefer so."]}),`
`,e.jsxs(n.h2,{id:"3-the-context-in-hbs-files-",children:["3. The context in ",e.jsx(n.code,{children:".hbs"})," files ",e.jsx("a",{name:"context"})]}),`
`,e.jsxs(n.h3,{id:"31-global-context-",children:["3.1 Global context ",e.jsx("a",{name:"context_global"})]}),`
`,e.jsxs(n.p,{children:["The context in the ",e.jsx(n.code,{children:".hbs"})," file is the ",e.jsx(n.strong,{children:"web component instance"}),", and you do not have to write the ",e.jsx(n.code,{children:"this"}),` keyword (although you can).
Therefore, you can directly use metadata entities (property, slot, event names) or any other Javascript property on the component directly:`]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:"this.age = 30;\nthis.fullName = `${this.name} ${this.lastName}`;\n"})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file you can just use them directly:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{fullName}}</p>
<p>{{age}}</p>
`})}),`
`,e.jsx(n.p,{children:"The following code will have exactly the same result:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{this.fullName}}</p>
<p>{{this.age}}</p>
`})}),`
`,e.jsxs(n.p,{children:["but ",e.jsx(n.code,{children:"this"})," is optional, so it's almost never used."]}),`
`,e.jsxs(n.h3,{id:"32-context-in-loops--",children:["3.2 Context in loops  ",e.jsx("a",{name:"context_loops"})]}),`
`,e.jsx(n.p,{children:"In a loop, the context is always the current item, and not the component itself."}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.items = [
	{
		id: "item1",
		posinset: 1,
		setsize: 5,
		text: "Item 1"
	},
	{
		id: "item2",
		posinset: 2,
		setsize: 5,
		text: "Item 2"
	}
]
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 role="option"
		 aria-posinset="{{posinset}}"
		 aria-setsize="{{setsize}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.jsxs(n.p,{children:["Again, you can use the ",e.jsx(n.code,{children:"this"})," keyword, but it's not necessary. The following code will be the same as the one above:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{this.id}}"
		 role="option"
		 aria-posinset="{{this.posinset}}"
		 aria-setsize="{{this.setsize}}"
	>{{this.text}}</div>
{{/each}}
`})}),`
`,e.jsxs(n.p,{children:["The only use case where you must use the ",e.jsx(n.code,{children:"this"})," keyword is when you want to refer to the looped over item directly (and not its properties)."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 .item="{{this}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.jsxs(n.p,{children:["Here, each ",e.jsx(n.code,{children:"div"})," inside the loop gets assigned an ",e.jsx(n.code,{children:"item"})," property that points to the respective item from the array we're looping over."]}),`
`,e.jsxs(n.p,{children:["Here's another example for the ",e.jsx(n.code,{children:"this"})," keyword:"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.numbers = [
	[1, 2, 3],
	[4, 5, 6]
];
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each numbers}}
	<div>
		{{#each this}}
			<span>{{this}}</span>
		{{/each}}
	</div>
{{/each}}
`})}),`
`,e.jsx(n.p,{children:"The result in the DOM would be:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div><span>1</span><span>2</span><span>3</span></div>
<div><span>4</span><span>5</span><span>6</span></div>
`})}),`
`,e.jsxs(n.p,{children:["In this example, the first usage of ",e.jsx(n.code,{children:"this"})," (in the nested ",e.jsx(n.code,{children:"#each"}),") is the nested array (for example, ",e.jsx(n.code,{children:"[1, 2, 3]"}),"), and the second usage of ",e.jsx(n.code,{children:"this"})," inside the ",e.jsx(n.code,{children:"span"})," is the number itself."]}),`
`,e.jsxs(n.h3,{id:"33-accessing-the-global-context-from-loops--",children:["3.3 Accessing the global context from loops  ",e.jsx("a",{name:"context_loops_accessing"})]}),`
`,e.jsxs(n.p,{children:['You can access the global context inside loops with the "one-level-up" expression: ',e.jsx(n.code,{children:"../"})]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.name = "John Smith";
this.items = [
	{
		id: "item1"
	},
	{
		id: "item2"
	}
]
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}">{{../name}}</div>
{{/each}}
`})}),`
`,e.jsxs(n.p,{children:["In this example, even though we're looping over an item from the array, we can still access the global context and use the ",e.jsx(n.code,{children:"name"})," property of the web component instance."]}),`
`,e.jsxs(n.h2,{id:"4-the-hbs-syntax-",children:["4. The ",e.jsx(n.code,{children:".hbs"})," syntax ",e.jsx("a",{name:"syntax"})]}),`
`,e.jsxs(n.p,{children:["You can use the following features when writing ",e.jsx(n.code,{children:".hbs"})," templates:"]}),`
`,e.jsxs(n.h3,{id:"41-bindings-",children:["4.1 Bindings ",e.jsx("a",{name:"syntax_bindings"})]}),`
`,e.jsxs(n.p,{children:["You can access any property from the context (generally the web component instance) in your ",e.jsx(n.code,{children:".hbs"})," template with ",e.jsx(n.code,{children:"{{"})," and ",e.jsx(n.code,{children:"}}"}),"."]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.tooltip = "Some tooltip";
this.txt = "Some text";
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<button title="{{tooltip}}">{{txt}}<button/>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Note:"})," You must always create valid HTML, so you can only use bindings for attribute values or text nodes."]}),`
`,e.jsxs(n.p,{children:["For example, the following is ",e.jsx(n.strong,{children:"not allowed"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<{{tag}} {{attr}}="Hello">This will not compile</{{tag}}>
`})}),`
`,e.jsx(n.p,{children:"You can access object properties:"}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.person = {
	name: "John",
	lastName: "Smith"
}
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{person.name}} {{person.lastName}}</p>
`})}),`
`,e.jsxs(n.p,{children:["but you cannot use expressions inside ",e.jsx(n.code,{children:".hbs"})," templates. The following is ",e.jsx(n.strong,{children:"not allowed"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{person.name + " " + person.lastName}}</p>
`})}),`
`,e.jsxs(n.p,{children:["Instead, you should precalculate the required value in the ",e.jsx(n.code,{children:".js"})," file and use it directly in the template:"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:"get fullName() {\n	return `${this.person.name} ${this.person.lastName}`;\n}\n"})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{fullName}}</p>
`})}),`
`,e.jsxs(n.p,{children:["By default, all content that you pass is ",e.jsx(n.em,{children:"escaped"}),` for security purposes.
However, you can pass `,e.jsx(n.strong,{children:"arbitrary HTML"})," with ",e.jsx(n.code,{children:"{{{"})," and ",e.jsx(n.code,{children:"}}}"}),":"]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:"this.unsafeMessage = `<span>This is unsafe content</span>`;\n"})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{{unsafeMessage}}}</p>
`})}),`
`,e.jsx(n.p,{children:"The result in DOM would be:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<p><span>This is unsafe content</span></p>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Note:"})," Using ",e.jsx(n.code,{children:"{{{"})," and ",e.jsx(n.code,{children:"}}}"}),` is strongly discouraged and should be avoided whenever possible. If you must use it, make sure you've sanitized
your HTML manually beforehand. A common use-case for the `,e.jsx(n.code,{children:"{{{"})," and ",e.jsx(n.code,{children:"}}}"})," binding is to manually add ",e.jsx(n.code,{children:"<strong>"}),` tags to parts of a string
to implement highlighting while the user is typing. Here's an example:`]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:"this.userInput = `<strong>Arg</strong>entina`;\n"})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div>{{{userInput}}}</div>
`})}),`
`,e.jsx(n.p,{children:'Thus, if the user has typed "Arg" (while typing "Argentina"), this part of the name will be highlighted.'}),`
`,e.jsx(n.p,{children:"Finally, it is possible to pass HTML elements (not just strings as in all examples above), and they will be rendered:"}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.messageDiv = document.createElement("div");
this.messageDiv.textContent = "Hello";
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<p>{{messageDiv}}</p>
`})}),`
`,e.jsx(n.p,{children:"The result in DOM would be:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<p><div>Hello</div></p>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Note:"})," This is not to be confused with ",e.jsx(n.code,{children:"{{{"})," and ",e.jsx(n.code,{children:"}}}"}),". The ",e.jsx(n.code,{children:"{{{"})," and ",e.jsx(n.code,{children:"}}}"})," binding expects a ",e.jsx(n.em,{children:"string, containing HTML"}),`,
while the example above demonstrates passing an `,e.jsx(n.em,{children:"HTML element"})," (hence ",e.jsx(n.code,{children:"Object"}),", not ",e.jsx(n.code,{children:"String"}),") directly."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Note:"}),` Although this technique is allowed and has its uses (such as cloning slotted elements to another component),
passing HTML directly is strongly discouraged. The best practice is to always write your HTML explicitly in the template.`]}),`
`,e.jsxs(n.h3,{id:"42-conditions-",children:["4.2 Conditions ",e.jsx("a",{name:"syntax_conditional"})]}),`
`,e.jsxs(n.p,{children:["You can use ",e.jsx(n.code,{children:"if"}),", ",e.jsx(n.code,{children:"else"})," and ",e.jsx(n.code,{children:"unless"})," to create conditions."]}),`
`,e.jsx(n.p,{children:"Examples:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#if hasText}}
	<label class="ui5-badge-text"><bdi><slot></slot></bdi></label>
{{/if}}
`})}),`
`,e.jsx(n.p,{children:"or"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#if hasText}}
	<label class="has-text"><span>{{text}}</span></label>
{{else}}
	<label class="empty-label"></label>
{{/if}}
`})}),`
`,e.jsx(n.p,{children:"or"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#unless _isPhone}}
	<p>Some content</p>
{{/unless}}
`})}),`
`,e.jsx(n.p,{children:"You can chain if-else-if, as follows:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#if hasImage}}
	<slot></slot>
{{else if icon}}
	<ui5-icon class="ui5-avatar-icon" name="{{icon}}" accessible-name="{{accessibleNameText}}"></ui5-icon>
{{else if initials}}
	<span class="ui5-avatar-initials">{{validInitials}}</span>
{{/if}}
`})}),`
`,e.jsxs(n.p,{children:["Again, you cannot use expressions, so the following is ",e.jsx(n.strong,{children:"not allowed"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#if person.access === "admin" }}
	<p>Show admin functionality</p>
{{/if}}
`})}),`
`,e.jsxs(n.p,{children:["Instead, you should have a precalculated value in your ",e.jsx(n.code,{children:".js file"}),", for example:"]}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Demo.js"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`get isAdmin() {
	return this.person.access === "admin";
}
`})}),`
`,e.jsxs(n.p,{children:["and then use this value in ",e.jsx(n.code,{children:"Demo.hbs"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#if isAdmin }}
	<p>Show admin functionality</p>
{{/if}}
`})}),`
`,e.jsxs(n.h3,{id:"43-loops-",children:["4.3 Loops ",e.jsx("a",{name:"syntax_loops"})]}),`
`,e.jsxs(n.p,{children:["You can use ",e.jsx(n.code,{children:"each"})," to loop over arrays."]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.items = [
	{
		id: "item1",
		posinset: 1,
		setsize: 5,
		text: "Item 1"
	},
	{
		id: "item2",
		posinset: 2,
		setsize: 5,
		text: "Item 2"
	}
]
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 role="option"
		 aria-posinset="{{posinset}}"
		 aria-setsize="{{setsize}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.jsxs(n.p,{children:["See the previous section (especially the ",e.jsx(n.a,{href:"#context_loops",children:"Context in loops"})," part) for more examples and the meaning of the ",e.jsx(n.code,{children:"this"})," keyword in loops."]}),`
`,e.jsxs(n.p,{children:["You can access the index of the currently looped item with the special ",e.jsx(n.code,{children:"{{@index}}"})," variable. Note that ",e.jsx(n.code,{children:"{{@index}}"})," is zero-based."]}),`
`,e.jsx(n.p,{children:"For example, the following template,"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 part="item-{{@index}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.jsx(n.p,{children:"will produce:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div id="item1" part="item-0"></div>
<div id="item2" part="item-1"></div>
`})}),`
`,e.jsxs(n.p,{children:["This is a common technique to create unique ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/::part",target:"_blank",rel:"nofollow noopener noreferrer",children:"shadow parts"}),` for items
within a UI5 Web Component.`]}),`
`,e.jsxs(n.h3,{id:"44-property-assignment-the--prefix-",children:["4.4 Property assignment (the ",e.jsx(n.code,{children:"."})," prefix) ",e.jsx("a",{name:"syntax_dot"})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"."})," prefix allows you to bind by property, rather than by attribute."]}),`
`,e.jsx(n.p,{children:"Consider the following example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.id = "myId";
this.someString = "Some data";
this.item = {
	a: 1,
	b: 2
};
this.text = "Some text";
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div
		id="{{id}}"
		data-info="{{someString}}"
		.item="{{myItem}}"
>
	{{text}}
</div>
`})}),`
`,e.jsxs(n.p,{children:["While ",e.jsx(n.code,{children:"data-info"})," is set as an attribute (default assignment), ",e.jsx(n.code,{children:"item"})," is set as a property due to the ",e.jsx(n.code,{children:"."}),` used.
The result in the DOM would be:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div id="myId" data-info="Some data">Some text</div>
`})}),`
`,e.jsxs(n.p,{children:["There would be no ",e.jsx(n.code,{children:"item"})," in the DOM at all, but the following code:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`document.getElementById("myId").item
`})}),`
`,e.jsxs(n.p,{children:["would return the ",e.jsx(n.code,{children:"item"})," object because it was set as a property."]}),`
`,e.jsxs(n.h3,{id:"45-boolean-attribute-assignment-the--prefix-",children:["4.5 Boolean attribute assignment (the ",e.jsx(n.code,{children:"?"})," prefix) ",e.jsx("a",{name:"syntax_question_mark"})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"?"})," prefix signifies that an attribute must not be set in DOM at all, if the bound value is falsy."]}),`
`,e.jsx(n.p,{children:"Consider the following example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this._id = "myCB";
this.checked = false;
this.readonly = false;
this.disabled = false;
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<input
	id="{{_id}}-CB"
	type='checkbox'
	?checked="{{checked}}"
	?readonly="{{readonly}}"
	?disabled="{{disabled}}"
	tabindex="-1"
	aria-hidden="true"
	data-sap-no-tab-ref
/>
`})}),`
`,e.jsxs(n.p,{children:["Since the ",e.jsx(n.code,{children:"checked"}),", ",e.jsx(n.code,{children:"readonly"}),", and ",e.jsx(n.code,{children:"disabled"})," attributes are all ",e.jsx(n.code,{children:"Boolean"}),", they must not be in the DOM if we want the ",e.jsx(n.code,{children:"<input>"})," to be interactive."]}),`
`,e.jsx(n.p,{children:"The output in DOM would be:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input
	id="myCB-CB"
	type='checkbox'
	tabindex="-1"
	aria-hidden="true"
	data-sap-no-tab-ref
/>
`})}),`
`,e.jsxs(n.p,{children:["All attributes that had the ",e.jsx(n.code,{children:"?"})," prefix and were bound to a falsy value are gone from DOM."]}),`
`,e.jsxs(n.p,{children:["However, if you did not use the ",e.jsx(n.code,{children:"?"})," prefix"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<input
	id="{{_id}}-CB"
	type='checkbox'
	checked="{{checked}}"
	readonly="{{readonly}}"
	disabled="{{disabled}}"
	tabindex="-1"
	aria-hidden="true"
	data-sap-no-tab-ref
/>
`})}),`
`,e.jsxs(n.p,{children:["even though ",e.jsx(n.code,{children:"checked"}),", ",e.jsx(n.code,{children:"readonly"}),", and ",e.jsx(n.code,{children:"disabled"})," are equal to ",e.jsx(n.code,{children:"false"}),", the resulting DOM would be"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input
	id="myCB-CB"
	type='checkbox'
	checked=""
	readonly=""
	disabled=""
	tabindex="-1"
	aria-hidden="true"
	data-sap-no-tab-ref
/>
`})}),`
`,e.jsxs(n.p,{children:[`which is not what we want, since boolean HTML attributes don't need to have a value at all to be considered set, only their presence is required.
Therefore, always bind boolean attributes with `,e.jsx(n.code,{children:"?"}),"."]}),`
`,e.jsxs(n.h3,{id:"46-event-handlers-assignment-the--prefix-",children:["4.6 Event handlers assignment (the ",e.jsx(n.code,{children:"@"})," prefix) ",e.jsx("a",{name:"syntax_at"})]}),`
`,e.jsx(n.p,{children:"You can bind events as follows:"}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.onClick = event => {};
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<button @click="{{onClick}}"></button>
`})}),`
`,e.jsxs(n.h3,{id:"47-style-maps-",children:["4.7 Style maps ",e.jsx("a",{name:"syntax_style_maps"})]}),`
`,e.jsx(n.p,{children:"Style maps are an easy and useful tool to apply multiple styles to an element dynamically."}),`
`,e.jsxs(n.p,{children:["In order to use a style map in your ",e.jsx(n.code,{children:".hbs"})," template, you must bind a ",e.jsx(n.code,{children:"styles"})," property (or as in the next example, a getter called ",e.jsx(n.code,{children:"styles"}),`).
Any binding to a `,e.jsx(n.code,{children:"styles"})," object on a ",e.jsx(n.code,{children:"style"})," attribute will be treated as a style map."]}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.js"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`get styles() {
	return {
		root: {
			display: this.isBlock ? "block" : "inline",
			width: \`\${this.x}px\`,
			height: \`\${this.y}px\`
		},
		footer: {
			backgroundColor: this.bgColor 
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"Demo.hbs"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div style="{{styles.root}}">
	Some content
	<footer style="{{styles.footer}}"></footer>
</div>
`})}),`
`,e.jsxs(n.p,{children:["After the following code is run, both the ",e.jsx(n.code,{children:"div"})," and the ",e.jsx(n.code,{children:"footer"})," will have the respective CSS styles applied to them."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"}),` do not build styles manually. Always use style maps as they are CSP-compliant and they will not build style strings and assign them,
but will use Javascript APIs to apply each style/CSS variable separately.`]}),`
`,e.jsxs(n.p,{children:["The following is an anti-pattern and is ",e.jsx(n.strong,{children:"not allowed"})," in the latest version of the handlebars-to-lit compiler:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`this.display = "block";
this.styles = "display: none; visibility: hidden";
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div style="display: {{display}}"></div>
<div style="{{styles}}"></div>
`})}),`
`,e.jsx(n.p,{children:`In the first example, we build a style value manually, and in the second example we pass hard-coded styles as a string. None of these are CSP-compliant.
The correct way would be to pass objects (as in the first example), in which case a style map will be used.`}),`
`,e.jsxs(n.h3,{id:"48-class-maps-",children:["4.8 Class maps ",e.jsx("a",{name:"syntax_class_maps"})]}),`
`,e.jsx(n.p,{children:"Class maps are an easy tool to set multiple classes to an element - either conditionally, or unconditionally."}),`
`,e.jsxs(n.p,{children:["In order to use a class map in your ",e.jsx(n.code,{children:".hbs"})," template, you must bind a ",e.jsx(n.code,{children:"classes"})," property (or as in the next example, a getter called ",e.jsx(n.code,{children:"classes"}),") to a ",e.jsx(n.code,{children:"class"})," attribute:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`get classes() {
	return {
		main: {
			"ui5-demo-main": true,
			"ui5-demo-mobile": isPhone()
		},
		content :{
			"ui5-content-wide": this.width > 1024	
		},
		section: {
			"ui5-section": true,
			"ui5-section-with-items": this.items.length > 0,
			"ui5-section-desktop": !isPhone() && !isTablet()
		}
	}
}
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<article class="{{classes.main}}">
	<div class="{{classes.content}}"></div>
	<section class="{{classes.section}}"></section>
</article>
`})}),`
`,e.jsxs(n.p,{children:[`Here, all 3 HTML elements will have their classes applied based on the conditions in the definition of the class map. Some entries in the class map
are unconditional (`,e.jsx(n.code,{children:"ui5-demo-main"})," and ",e.jsx(n.code,{children:"ui5-section"}),") so these classes will always be set, however the rest are going to be set only if certain criteria are met."]}),`
`,e.jsxs(n.h3,{id:"49-partials-",children:["4.9 Partials ",e.jsx("a",{name:"syntax_partials"})]}),`
`,e.jsxs(n.p,{children:["You can use partials to reuse code in ",e.jsx(n.code,{children:".hbs"})," templates:"]}),`
`,e.jsxs(n.p,{children:["You can define a partial with ",e.jsx(n.code,{children:'{{#*inline "NAME"}}'})," and use it with ",e.jsx(n.code,{children:"{{>NAME}}"})," where ",e.jsx(n.code,{children:"NAME"})," is the name of the partial."]}),`
`,e.jsx(n.p,{children:"Consider the following example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div>
	{{>valueStateMessage}}
</div>
<p>Some more content</p>
<div>
	{{>valueStateMessage}}
</div>

{{#*inline "valueStateMessage"}}
	{{#if msg}}
		<span>{{msg}}</span>
	{{/if}}
{{/inline}}
`})}),`
`,e.jsxs(n.p,{children:["Here we define some common code in the ",e.jsx(n.code,{children:"valueStateMessage"})," partial and use it twice within the template."]}),`
`,e.jsxs(n.p,{children:["Partials are very often used to define ",e.jsx(n.strong,{children:"hooks"})," - extension points for other components."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Demo.hbs"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<section>
	<span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin={{forwardToLast}}></span>

	{{> beforeContent}}

	<div style="{{styles.content}}" class="{{classes.content}}"  @scroll="{{_scroll}}" part="content">
		<slot></slot>
	</div>

	{{> afterContent}}

	<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin={{forwardToFirst}}></span>
</section>


{{#*inline "beforeContent"}}{{/inline}}

{{#*inline "afterContent"}}{{/inline}}
`})}),`
`,e.jsxs(n.p,{children:["Here we define two empty partials (",e.jsx(n.code,{children:"beforeContent"})," and ",e.jsx(n.code,{children:"afterContent"}),") for others to implement."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"Note:"}),` Partials do not have their own context. When a partial is processed, its content is treated as if directly
written at the partial's insertion point.`]}),`
`,e.jsxs(n.h3,{id:"410-include-",children:["4.10 Include ",e.jsx("a",{name:"syntax_include"})]}),`
`,e.jsxs(n.p,{children:["You can include other ",e.jsx(n.code,{children:".hbs"})," files with ",e.jsx(n.code,{children:'{{>include "PATH_TO_FILE"}}'})," where ",e.jsx(n.code,{children:"PATH_TO_FILE"})," is a relative or absolute path to the ",e.jsx(n.code,{children:".hbs"})," file you want to include."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{>include "./Demo.hbs"}}
`})}),`
`,e.jsxs(n.p,{children:["Paths to ",e.jsx(n.code,{children:".hbs"})," files from other ",e.jsx(n.code,{children:"node_modules/"})," libraries are also supported."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{>include "@ui5/webcomponents/src/Popup.hbs"}}
`})}),`
`,e.jsxs(n.p,{children:["The most common use case for ",e.jsx(n.code,{children:"{{>include}}"})," is to include an ",e.jsx(n.code,{children:".hbs"})," file that has extension points (hooks) and implement them. Given the example from the previous section (about Partials), consider the following:"]}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Demo2.hbs"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{>include "./Demo.hbs"}}

{{#*inline "beforeContent"}}
	<span>Implementation here</span>
{{/inline}}

{{#*inline "afterContent"}}
	<span>Another implementation here</span>
{{/inline}}
`})}),`
`,e.jsxs(n.p,{children:["Then the ",e.jsx(n.code,{children:"Demo2"})," component will use the ",e.jsx(n.code,{children:".hbs"})," file of the ",e.jsx(n.code,{children:"Demo"})," component but with its own version of its partials."]}),`
`,e.jsxs(n.h2,{id:"5-using-the-slot-element-",children:["5. Using the ",e.jsx(n.code,{children:"slot"})," element ",e.jsx("a",{name:"slots"})]}),`
`,e.jsxs(n.h3,{id:"51-rendering-slots-",children:["5.1 Rendering slots ",e.jsx("a",{name:"slots_rendering"})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",target:"_blank",rel:"nofollow noopener noreferrer",children:"slot"}),` element allows you to render children, nested in your web component, in a desired place in the shadow DOM.
You should render each slot, defined in your component's metadata (see `,e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-components-metadata--docs",children:"Understanding UI5 Web Components Metadata"}),"), somewhere in the ",e.jsx(n.code,{children:".hbs"})," template."]}),`
`,e.jsxs(n.p,{children:["To render the default slot simply render a ",e.jsx(n.code,{children:"slot"})," tag:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<slot></slot>
`})}),`
`,e.jsx(n.p,{children:"and to render a named slot:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<slot name="tabs"></slot>
`})}),`
`,e.jsx(n.p,{children:`Here's a real-world example of a "page" component:`}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Page.js"})," (metadata object):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`slots: {
	header: {
		type: HTMLElement
	},
	"default": {
		type: HTMLElement,
		propertyName: "content"
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Page.hbs"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="ui5-page-root">
	<header class="ui5-page-header-root" id="ui5-page-header">
		<slot name="header"></slot>
	</header>

	<section part="content" class="ui5-page-content-root" style="{{styles.content}}">
		<slot></slot>
	</section>

	<footer class="ui5-page-footer-root" style="{{styles.footer}}">
		<slot name="footer"></slot>
	</footer>
</div>

`})}),`
`,e.jsxs(n.p,{children:["We render 3 ",e.jsx(n.code,{children:"slot"})," elements - a default slot (unnamed) and 2 named slots - respectively with ",e.jsx(n.code,{children:"name"})," equal to ",e.jsx(n.code,{children:"header"})," and ",e.jsx(n.code,{children:"footer"}),"."]}),`
`,e.jsxs(n.p,{children:["All children, passed to the component with no ",e.jsx(n.code,{children:"slot"})," attribute, will then be rendered by the browser where the default ",e.jsx(n.code,{children:"<slot></slot>"}),` is,
and all children with attributes `,e.jsx(n.code,{children:'slot="header"'})," / ",e.jsx(n.code,{children:'slot="footer"'})," will be rendered where the respective named ",e.jsx(n.code,{children:"slot"})," is."]}),`
`,e.jsxs(n.h3,{id:"52-individual-slots-",children:["5.2 Individual slots ",e.jsx("a",{name:"slots_individual"})]}),`
`,e.jsxs(n.p,{children:["All children assigned to a certain ",e.jsx(n.code,{children:"slot"}),`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"individualSlots"})," slot metadata configuration setting (see ",e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-components-metadata--docs",children:"Understanding UI5 Web Components Metadata"}),") allows you to have a separate physical slot for each child belonging to a certain slot."]}),`
`,e.jsxs(n.p,{children:["However, setting ",e.jsx(n.code,{children:"individualSlots: true"})," in the metadata configuration only creates an ",e.jsx(n.code,{children:"_individualSlot"}),` property on each element belonging to the slot, but does not create any slots automatically.
The individual slots must be explicitly rendered by the developer in the `,e.jsx(n.code,{children:".hbs"})," template."]}),`
`,e.jsxs(n.p,{children:["To do so, simply render a ",e.jsx(n.code,{children:"slot"})," with a ",e.jsx(n.code,{children:"name"})," property equal to the ",e.jsx(n.code,{children:"_individualSlot"})," value for each child."]}),`
`,e.jsx(n.p,{children:"Here's an example:"}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Demo.js"})," (metadata object):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
	slots: {
		"default": {
			type: HTMLElement,
			propertyName: "items",
			individualSlots: true
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["Since ",e.jsx(n.code,{children:"propertyName"})," is set to ",e.jsx(n.code,{children:"items"}),", the children of the default slot will be accessible on the web component instance with ",e.jsx(n.code,{children:"this.items"}),`;
and since `,e.jsx(n.code,{children:"individualSlots"})," is set to ",e.jsx(n.code,{children:"true"}),", every child in ",e.jsx(n.code,{children:"this.items"})," (every child slotted in the default slot) will have an ",e.jsx(n.code,{children:"_individualSlots"})," property created by the framework."]}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"Demo.hbs"})," you must render a slot for each child with ",e.jsx(n.code,{children:"name"})," equal to the ",e.jsx(n.code,{children:"_individualSlot"})," property value for this child:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`{{#each items}}
	 <div class="item-wrapper">
		<slot name="{{_individualSlot}}"></slot>
	</div>
{{/each}}
`})}),`
`,e.jsx(n.p,{children:"The resulting DOM from the loop above will look like this:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="item-wrapper"><slot name="items-1"></slot></div>
<div class="item-wrapper"><slot name="items-2"></slot></div>
<div class="item-wrapper"><slot name="items-3"></slot></div>
`})}),`
`,e.jsx(n.p,{children:"This allows you to have arbitrary DOM around each child and implement complex UX design, otherwise impossible if all children were just normally rendered next to each other in a single slot."}),`
`,e.jsx(d,{})]})}function f(s={}){const{wrapper:n}=Object.assign({},i(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{f as default};
