import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as o}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.exports.jsx(n,Object.assign({},t,{children:e.exports.jsx(r,{})})):r();function r(){const s=Object.assign({h1:"h1",code:"code",p:"p",h2:"h2",ol:"ol",li:"li",a:"a",ul:"ul",pre:"pre",strong:"strong",h3:"h3",em:"em"},o(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Development/Understanding hbs templates"}),`
`,e.exports.jsxs(s.h1,{children:["Understanding the Handlebars (",e.exports.jsx(s.code,{children:".hbs"}),") templates"]}),`
`,e.exports.jsx(s.p,{children:"The preferred way to write the renderers for UI5 Web Components (and supported directly by the build tools) is to use standard Handlebars templates with some additional custom syntax."}),`
`,e.exports.jsx(s.h2,{children:"Table of contents"}),`
`,e.exports.jsxs(s.ol,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#compilation",children:"Handlebars compilation"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#design_goals",children:"Design goals"})}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsxs(s.a,{href:"#context",children:["The context in ",e.exports.jsx(s.code,{children:".hbs"})," files"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#context_global",children:"Global context"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#context_loops",children:"Context in loops"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#context_loops_accessing",children:"Accessing the global context from loops"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsxs(s.a,{href:"#syntax",children:["The ",e.exports.jsx(s.code,{children:".hbs"})," syntax"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_bindings",children:"Bindings"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_conditional",children:"Conditions"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_loops",children:"Loops"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsxs(s.a,{href:"#syntax_dot",children:["Property assignment (the ",e.exports.jsx(s.code,{children:"."})," prefix)"]})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsxs(s.a,{href:"#syntax_question_mark",children:["Boolean attribute assignment (the ",e.exports.jsx(s.code,{children:"?"})," prefix)"]})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsxs(s.a,{href:"#syntax_at",children:["Event handlers assignment (the ",e.exports.jsx(s.code,{children:"@"})," prefix)"]})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_style_maps",children:"Style maps"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_class_maps",children:"Class maps"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_partials",children:"Partials"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#syntax_include",children:"Include"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsxs(s.a,{href:"#slots",children:["Using the ",e.exports.jsx(s.code,{children:"slot"})," element"]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#slots_rendering",children:"Rendering slots"})}),`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.a,{href:"#slots_individual",children:"Individual slots"})}),`
`]}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.h2,{children:["1. Handlebars compilation ",e.exports.jsx("a",{name:"compilation"})]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.a,{href:"https://handlebarsjs.com/guide/#simple-expressions",children:"Handlebars"})," templates (",e.exports.jsx(s.code,{children:".hbs"}),") are compiled during build/development to ",e.exports.jsx(s.a,{href:"https://lit.dev/docs/v1/lit-html/introduction/",children:"lit-html"})," templates (",e.exports.jsx(s.code,{children:".lit.js"}),") and the lit templates are what's actually executed during runtime."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.p,{children:["The following ",e.exports.jsx(s.code,{children:"src/Demo.hbs"})," template"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<button>{{text}}</button>
`})}),`
`,e.exports.jsxs(s.p,{children:["will be compiled to ",e.exports.jsx(s.code,{children:"dist/generated/templates/DemoTemplate.lit.js"})," with the following content:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:'import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";\nconst block0 = (context, tags, suffix) => html`<button>${ifDefined(context.text)}</button>`;\nexport default block0;\n'})}),`
`,e.exports.jsx(s.p,{children:"and later tree-shaken by the bundler and bundled along with the rest of the component's code."}),`
`,e.exports.jsxs(s.p,{children:["Therefore, the ",e.exports.jsx(s.code,{children:".hbs"})," file is there just for convenience, the end result will always be optimized lit-html."]}),`
`,e.exports.jsxs(s.h2,{children:["2. Design goals of the Handlebars templates ",e.exports.jsx("a",{name:"design_goals"})]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.strong,{children:"Declarative"}),": write HTML in a form as close as possible to what will eventually be in the DOM (rather than writing template functions directly)."]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.strong,{children:"Abstract"}),": the template could be compiled to other formats in the future (not just lit-html) so it should only use universal concepts and no lit-specific features."]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.strong,{children:"Separation of concerns"}),": the template must be as simple as possible with no complex expressions or calculations - variables that control structures (for example, ",e.exports.jsx(s.code,{children:"{{#if}}"})," statements) should be precalculated."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["For these reasons, we would suggest you use ",e.exports.jsx(s.code,{children:".hbs"})," templates and have them compiled to lit-html, instead of directly writing ",e.exports.jsx(s.code,{children:"lit-html"})," renderers, although that's also possible if you prefer so."]}),`
`,e.exports.jsxs(s.h2,{children:["3. The context in ",e.exports.jsx(s.code,{children:".hbs"})," files ",e.exports.jsx("a",{name:"context"})]}),`
`,e.exports.jsxs(s.h3,{children:["3.1 Global context ",e.exports.jsx("a",{name:"context_global"})]}),`
`,e.exports.jsxs(s.p,{children:["The context in the ",e.exports.jsx(s.code,{children:".hbs"})," file is the ",e.exports.jsx(s.strong,{children:"web component instance"}),", and you do not have to write the ",e.exports.jsx(s.code,{children:"this"}),` keyword (although you can).
Therefore, you can directly use metadata entities (property, slot, event names) or any other Javascript property on the component directly:`]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:"this.age = 30;\nthis.fullName = `${this.name} ${this.lastName}`;\n"})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file you can just use them directly:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{fullName}}</p>
<p>{{age}}</p>
`})}),`
`,e.exports.jsx(s.p,{children:"The following code will have exactly the same result:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{this.fullName}}</p>
<p>{{this.age}}</p>
`})}),`
`,e.exports.jsxs(s.p,{children:["but ",e.exports.jsx(s.code,{children:"this"})," is optional, so it's almost never used."]}),`
`,e.exports.jsxs(s.h3,{children:["3.2 Context in loops  ",e.exports.jsx("a",{name:"context_loops"})]}),`
`,e.exports.jsx(s.p,{children:"In a loop the context is always the current item, and not the component itself."}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.items = [
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
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 role="option"
		 aria-posinset="{{posinset}}"
		 aria-setsize="{{setsize}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Again, you can use the ",e.exports.jsx(s.code,{children:"this"})," keyword, but it's not necessary. The following code will be the same as the one above:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{this.id}}"
		 role="option"
		 aria-posinset="{{this.posinset}}"
		 aria-setsize="{{this.setsize}}"
	>{{this.text}}</div>
{{/each}}
`})}),`
`,e.exports.jsxs(s.p,{children:["The only use case where you must use the ",e.exports.jsx(s.code,{children:"this"})," keyword is when you want to refer to the looped over item directly (and not its properties)."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 .item="{{this}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Here, each ",e.exports.jsx(s.code,{children:"div"})," inside the loop gets assigned an ",e.exports.jsx(s.code,{children:"item"})," property that points to the respective item from the array we're looping over."]}),`
`,e.exports.jsxs(s.p,{children:["Here's another example for the ",e.exports.jsx(s.code,{children:"this"})," keyword:"]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.numbers = [
	[1, 2, 3],
	[4, 5, 6]
];
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each numbers}}
	<div>
		{{#each this}}
			<span>{{this}}</span>
		{{/each}}
	</div>
{{/each}}
`})}),`
`,e.exports.jsx(s.p,{children:"The result in the DOM would be:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<div><span>1</span><span>2</span><span>3</span></div>
<div><span>4</span><span>5</span><span>6</span></div>
`})}),`
`,e.exports.jsxs(s.p,{children:["In this example, the first usage of ",e.exports.jsx(s.code,{children:"this"})," (in the nested ",e.exports.jsx(s.code,{children:"#each"}),") is the nested array (for example, ",e.exports.jsx(s.code,{children:"[1, 2, 3]"}),"), and the second usage of ",e.exports.jsx(s.code,{children:"this"})," inside the ",e.exports.jsx(s.code,{children:"span"})," is the number itself."]}),`
`,e.exports.jsxs(s.h3,{children:["3.3 Accessing the global context from loops  ",e.exports.jsx("a",{name:"context_loops_accessing"})]}),`
`,e.exports.jsxs(s.p,{children:['You can access the global context inside loops with the "one-level-up" expression: ',e.exports.jsx(s.code,{children:"../"})]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.name = "John Smith";
this.items = [
	{
		id: "item1"
	},
	{
		id: "item2"
	}
]
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}">{{../name}}</div>
{{/each}}
`})}),`
`,e.exports.jsxs(s.p,{children:["In this example, even though we're looping over an item from the array, we can still access the global context and use the ",e.exports.jsx(s.code,{children:"name"})," property of the web component instance."]}),`
`,e.exports.jsxs(s.h2,{children:["4. The ",e.exports.jsx(s.code,{children:".hbs"})," syntax ",e.exports.jsx("a",{name:"syntax"})]}),`
`,e.exports.jsxs(s.p,{children:["You can use the following features when writing ",e.exports.jsx(s.code,{children:".hbs"})," templates:"]}),`
`,e.exports.jsxs(s.h3,{children:["Bindings ",e.exports.jsx("a",{name:"syntax_bindings"})]}),`
`,e.exports.jsxs(s.p,{children:["You can access any property from the context (generally the web component instance) in your ",e.exports.jsx(s.code,{children:".hbs"})," template with ",e.exports.jsx(s.code,{children:"{{"})," and ",e.exports.jsx(s.code,{children:"}}"}),"."]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.tooltip = "Some tooltip";
this.txt = "Some text";
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<button title="{{tooltip}}">{{txt}}<button/>
`})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," You must always create valid HTML, so you can only use bindings for attribute values or text nodes."]}),`
`,e.exports.jsxs(s.p,{children:["For example, the following is ",e.exports.jsx(s.strong,{children:"not allowed"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<{{tag}} {{attr}}="Hello">This will not compile</{{tag}}>
`})}),`
`,e.exports.jsx(s.p,{children:"You can access object properties:"}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.person = {
	name: "John",
	lastName: "Smith"
}
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{person.name}} {{person.lastName}}</p>
`})}),`
`,e.exports.jsxs(s.p,{children:["but you cannot use expressions inside ",e.exports.jsx(s.code,{children:".hbs"})," templates. The following is ",e.exports.jsx(s.strong,{children:"not allowed"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{person.name + " " + person.lastName}}</p>
`})}),`
`,e.exports.jsxs(s.p,{children:["Instead, you should precalculate the required value in the ",e.exports.jsx(s.code,{children:".js"})," file and use it directly in the template:"]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:"get fullName() {\n	return `${this.person.name} ${this.person.lastName}`;\n}\n"})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{fullName}}</p>
`})}),`
`,e.exports.jsxs(s.p,{children:["By default, all content that you pass is ",e.exports.jsx(s.em,{children:"escaped"}),` for security purposes.
However, you can pass `,e.exports.jsx(s.strong,{children:"arbitrary HTML"})," with ",e.exports.jsx(s.code,{children:"{{{"})," and ",e.exports.jsx(s.code,{children:"}}}"}),":"]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:"this.unsafeMessage = `<span>This is unsafe content</span>`;\n"})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{{unsafeMessage}}}</p>
`})}),`
`,e.exports.jsx(s.p,{children:"The result in DOM would be:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<p><span>This is unsafe content</span></p>
`})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," Using ",e.exports.jsx(s.code,{children:"{{{"})," and ",e.exports.jsx(s.code,{children:"}}}"}),` is strongly discouraged and should be avoided whenever possible. If you must use it, make sure you've sanitized
your HTML manually beforehand. A common use-case for the `,e.exports.jsx(s.code,{children:"{{{"})," and ",e.exports.jsx(s.code,{children:"}}}"})," binding is to manually add ",e.exports.jsx(s.code,{children:"<strong>"}),` tags to parts of a string
to implement highlighting while the user is typing. Here's an example:`]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:"this.userInput = `<strong>Arg</strong>entina`;\n"})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div>{{{userInput}}}</div>
`})}),`
`,e.exports.jsx(s.p,{children:'Thus, if the user has typed "Arg" (while typing "Argentina"), this part of the name will be highlighted.'}),`
`,e.exports.jsx(s.p,{children:"Finally, it is possible to pass HTML elements (not just strings as in all examples above), and they will be rendered:"}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.messageDiv = document.createElement("div");
this.messageDiv.textContent = "Hello";
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<p>{{messageDiv}}</p>
`})}),`
`,e.exports.jsx(s.p,{children:"The result in DOM would be:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<p><div>Hello</div></p>
`})}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," This is not to be confused with ",e.exports.jsx(s.code,{children:"{{{"})," and ",e.exports.jsx(s.code,{children:"}}}"}),". The ",e.exports.jsx(s.code,{children:"{{{"})," and ",e.exports.jsx(s.code,{children:"}}}"})," binding expects a ",e.exports.jsx(s.em,{children:"string, containing HTML"}),`,
while the example above demonstrates passing an `,e.exports.jsx(s.em,{children:"HTML element"})," (hence ",e.exports.jsx(s.code,{children:"Object"}),", not ",e.exports.jsx(s.code,{children:"String"}),") directly."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"}),` Although this technique is allowed and has its uses (such as cloning slotted elements to another component),
passing HTML directly is strongly discouraged. The best practice is to always write your HTML explicitly in the template.`]}),`
`,e.exports.jsxs(s.h3,{children:["Conditions ",e.exports.jsx("a",{name:"syntax_conditional"})]}),`
`,e.exports.jsxs(s.p,{children:["You can use ",e.exports.jsx(s.code,{children:"if"}),", ",e.exports.jsx(s.code,{children:"else"})," and ",e.exports.jsx(s.code,{children:"unless"})," to create conditions."]}),`
`,e.exports.jsx(s.p,{children:"Examples:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#if hasText}}
	<label class="ui5-badge-text"><bdi><slot></slot></bdi></label>
{{/if}}
`})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#if hasText}}
	<label class="has-text"><span>{{text}}</span></label>
{{else}}
	<label class="empty-label"></label>
{{/if}}
`})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#unless _isPhone}}
	<p>Some content</p>
{{/unless}}
`})}),`
`,e.exports.jsx(s.p,{children:"You can chain if-else-if, as follows:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#if hasImage}}
	<slot></slot>
{{else if icon}}
	<ui5-icon class="ui5-avatar-icon" name="{{icon}}" accessible-name="{{accessibleNameText}}"></ui5-icon>
{{else if initials}}
	<span class="ui5-avatar-initials">{{validInitials}}</span>
{{/if}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Again, you cannot use expressions, so the following is ",e.exports.jsx(s.strong,{children:"not allowed"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#if person.access === "admin" }}
	<p>Show admin functionality</p>
{{/if}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Instead, you should have a precalculated value in your ",e.exports.jsx(s.code,{children:".js file"}),", for example:"]}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Demo.js"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`get isAdmin() {
	return this.person.access === "admin";
}
`})}),`
`,e.exports.jsxs(s.p,{children:["and then use this value in ",e.exports.jsx(s.code,{children:"Demo.hbs"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#if isAdmin }}
	<p>Show admin functionality</p>
{{/if}}
`})}),`
`,e.exports.jsxs(s.h3,{children:["Loops ",e.exports.jsx("a",{name:"syntax_loops"})]}),`
`,e.exports.jsxs(s.p,{children:["You can use ",e.exports.jsx(s.code,{children:"each"})," to loop over arrays."]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.items = [
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
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 role="option"
		 aria-posinset="{{posinset}}"
		 aria-setsize="{{setsize}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.exports.jsxs(s.p,{children:["See the previous section (especially the ",e.exports.jsx(s.a,{href:"#context_loops",children:"Context in loops"})," part) for more examples and the meaning of the ",e.exports.jsx(s.code,{children:"this"})," keyword in loops."]}),`
`,e.exports.jsxs(s.p,{children:["You can access the index of the currently looped item with the special ",e.exports.jsx(s.code,{children:"{{@index}}"})," variable. Note that ",e.exports.jsx(s.code,{children:"{{@index}}"})," is zero-based."]}),`
`,e.exports.jsx(s.p,{children:"For example, the following template:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	<div id="{{id}}"
		 part="item-{{@index}}"
	>{{text}}</div>
{{/each}}
`})}),`
`,e.exports.jsx(s.p,{children:"will produce:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<div id="item1" part="item-0"></div>
<div id="item2" part="item-1"></div>
`})}),`
`,e.exports.jsxs(s.p,{children:["This is a common technique to create unique ",e.exports.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/::part",children:"shadow parts"}),` for items
within a UI5 Web Component.`]}),`
`,e.exports.jsxs(s.h3,{children:["Property assignment (the ",e.exports.jsx(s.code,{children:"."})," prefix) ",e.exports.jsx("a",{name:"syntax_dot"})]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"."})," prefix allows you to bind by property, rather than by attribute."]}),`
`,e.exports.jsx(s.p,{children:"Consider the following example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.id = "myId";
this.someString = "Some data";
this.item = {
	a: 1,
	b: 2
};
this.text = "Some text";
`})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div
		id="{{id}}"
		data-info="{{someString}}"
		.item="{{myItem}}"
>
	{{text}}
</div>
`})}),`
`,e.exports.jsxs(s.p,{children:["While ",e.exports.jsx(s.code,{children:"data-info"})," is set as an attribute (default assignment), ",e.exports.jsx(s.code,{children:"item"})," is set as a property due to the ",e.exports.jsx(s.code,{children:"."}),` used.
The result in the DOM would be:`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<div id="myId" data-info="Some data">Some text</div>
`})}),`
`,e.exports.jsxs(s.p,{children:["There would be no ",e.exports.jsx(s.code,{children:"item"})," in the DOM at all, but the following code:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`document.getElementById("myId").item
`})}),`
`,e.exports.jsxs(s.p,{children:["would return the ",e.exports.jsx(s.code,{children:"item"})," object because it was set as a property."]}),`
`,e.exports.jsxs(s.h3,{children:["Boolean attribute assignment (the ",e.exports.jsx(s.code,{children:"?"})," prefix) ",e.exports.jsx("a",{name:"syntax_question_mark"})]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"?"})," prefix signifies that an attribute must not be set in DOM at all, if the bound value is falsy."]}),`
`,e.exports.jsx(s.p,{children:"Consider the following example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this._id = "myCB";
this.checked = false;
this.readonly = false;
this.disabled = false;
`})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<input
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
`,e.exports.jsxs(s.p,{children:["Since the ",e.exports.jsx(s.code,{children:"checked"}),", ",e.exports.jsx(s.code,{children:"readonly"}),", and ",e.exports.jsx(s.code,{children:"disabled"})," attributes are all ",e.exports.jsx(s.code,{children:"Boolean"}),", they must not be in the DOM if we want the ",e.exports.jsx(s.code,{children:"<input>"})," to be interactive."]}),`
`,e.exports.jsx(s.p,{children:"The output in DOM would be:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<input
	id="myCB-CB"
	type='checkbox'
	tabindex="-1"
	aria-hidden="true"
	data-sap-no-tab-ref
/>
`})}),`
`,e.exports.jsxs(s.p,{children:["All attributes that had the ",e.exports.jsx(s.code,{children:"?"})," prefix and were bound to a falsy value are gone from DOM."]}),`
`,e.exports.jsxs(s.p,{children:["However, if you did not use the ",e.exports.jsx(s.code,{children:"?"})," prefix:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<input
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
`,e.exports.jsxs(s.p,{children:["even though ",e.exports.jsx(s.code,{children:"checked"}),", ",e.exports.jsx(s.code,{children:"readonly"}),", and ",e.exports.jsx(s.code,{children:"disabled"})," are equal to ",e.exports.jsx(s.code,{children:"false"}),", the resulting DOM would be:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<input
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
`,e.exports.jsxs(s.p,{children:[`which is not what we want, since boolean HTML attributes don't need to have a value at all to be considered set, only their presence is required.
Therefore, always bind boolean attributes with `,e.exports.jsx(s.code,{children:"?"}),"."]}),`
`,e.exports.jsxs(s.h3,{children:["Event handlers assignment (the ",e.exports.jsx(s.code,{children:"@"})," prefix) ",e.exports.jsx("a",{name:"syntax_at"})]}),`
`,e.exports.jsx(s.p,{children:"You can bind events as follows:"}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.onClick = event => {};
`})}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<button @click="{{onClick}}"></button>
`})}),`
`,e.exports.jsxs(s.h3,{children:["Style maps ",e.exports.jsx("a",{name:"syntax_style_maps"})]}),`
`,e.exports.jsx(s.p,{children:"Style maps are an easy and useful tool to apply multiple styles to an element dynamically."}),`
`,e.exports.jsxs(s.p,{children:["In order to use a style map in your ",e.exports.jsx(s.code,{children:".hbs"})," template you must bind a ",e.exports.jsx(s.code,{children:"styles"})," property (or as in the next example, a getter called ",e.exports.jsx(s.code,{children:"styles"}),`).
Any binding to a `,e.exports.jsx(s.code,{children:"styles"})," object on a ",e.exports.jsx(s.code,{children:"style"})," attribute will be treated as a style map."]}),`
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.js"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`get styles() {
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
`,e.exports.jsxs(s.p,{children:["In the ",e.exports.jsx(s.code,{children:"Demo.hbs"})," file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div style="{{styles.root}}">
	Some content
	<footer style="{{styles.footer}}"></footer>
</div>
`})}),`
`,e.exports.jsxs(s.p,{children:["After the following code is run, both the ",e.exports.jsx(s.code,{children:"div"})," and the ",e.exports.jsx(s.code,{children:"footer"})," will have the respective CSS styles applied to them."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Important:"}),` do not build styles manually. Always use style maps as they are CSP-compliant and they will not build style strings and assign them,
but will use Javascript APIs to apply each style/CSS variable separately.`]}),`
`,e.exports.jsxs(s.p,{children:["The following is an anti-pattern and is ",e.exports.jsx(s.strong,{children:"not allowed"})," in the latest version of the handlebars-to-lit compiler:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`this.display = "block";
this.styles = "display: none; visibility: hidden";
`})}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div style="display: {{display}}"></div>
<div style="{{styles}}"></div>
`})}),`
`,e.exports.jsx(s.p,{children:`In the first example we build a style value manually, and in the second example we pass hard-coded styles as a string. None of these are CSP-compliant.
The correct way would be to pass objects (as in the first example), in which case a style map will be used.`}),`
`,e.exports.jsxs(s.h3,{children:["Class maps ",e.exports.jsx("a",{name:"syntax_class_maps"})]}),`
`,e.exports.jsx(s.p,{children:"Class maps are an easy tool to set multiple classes to an element - either conditionally, or unconditionally."}),`
`,e.exports.jsxs(s.p,{children:["In order to use a class map in your ",e.exports.jsx(s.code,{children:".hbs"})," template you must bind a ",e.exports.jsx(s.code,{children:"classes"})," property (or as in the next example, a getter called ",e.exports.jsx(s.code,{children:"classes"}),") to a ",e.exports.jsx(s.code,{children:"class"})," attribute:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`get classes() {
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
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<article class="{{classes.main}}">
	<div class="{{classes.content}}"></div>
	<section class="{{classes.section}}"></section>
</article>
`})}),`
`,e.exports.jsxs(s.p,{children:[`Here, all 3 HTML elements will have their classes applied based on the conditions in the definition of the class map. Some entries in the class map
are unconditional (`,e.exports.jsx(s.code,{children:"ui5-demo-main"})," and ",e.exports.jsx(s.code,{children:"ui5-section"}),") so these classes will always be set, however the rest are going to be set only if certain criteria are met."]}),`
`,e.exports.jsxs(s.h3,{children:["Partials ",e.exports.jsx("a",{name:"syntax_partials"})]}),`
`,e.exports.jsxs(s.p,{children:["You can use partials to reuse code in ",e.exports.jsx(s.code,{children:".hbs"})," templates:"]}),`
`,e.exports.jsxs(s.p,{children:["You can define a partial with ",e.exports.jsx(s.code,{children:'{{#*inline "NAME"}}'})," and use it with ",e.exports.jsx(s.code,{children:"{{>NAME}}"})," where ",e.exports.jsx(s.code,{children:"NAME"})," is the name of the partial."]}),`
`,e.exports.jsx(s.p,{children:"Consider the following example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div>
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
`,e.exports.jsxs(s.p,{children:["Here we define some common code in the ",e.exports.jsx(s.code,{children:"valueStateMessage"})," partial and use it twice within the template."]}),`
`,e.exports.jsxs(s.p,{children:["Partials are very often used to define ",e.exports.jsx(s.strong,{children:"hooks"})," - extension points for other components."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Demo.hbs"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<section>
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
`,e.exports.jsxs(s.p,{children:["Here we define two empty partials (",e.exports.jsx(s.code,{children:"beforeContent"})," and ",e.exports.jsx(s.code,{children:"afterContent"}),") for others to implement."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"}),` Partials do not have their own context. When a partial is processed, its content is treated as if directly
written at the partial's insertion point.`]}),`
`,e.exports.jsxs(s.h3,{children:["Include ",e.exports.jsx("a",{name:"syntax_include"})]}),`
`,e.exports.jsxs(s.p,{children:["You can include other ",e.exports.jsx(s.code,{children:".hbs"})," files with ",e.exports.jsx(s.code,{children:'{{>include "PATH_TO_FILE"}}'})," where ",e.exports.jsx(s.code,{children:"PATH_TO_FILE"})," is a relative or absolute path to the ",e.exports.jsx(s.code,{children:".hbs"})," file you want to include."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{>include "./Demo.hbs"}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Paths to ",e.exports.jsx(s.code,{children:".hbs"})," files from other ",e.exports.jsx(s.code,{children:"node_modules/"})," libraries are also supported."]}),`
`,e.exports.jsx(s.p,{children:"Example:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{>include "@ui5/webcomponents/src/Popup.hbs"}}
`})}),`
`,e.exports.jsxs(s.p,{children:["The most common use case for ",e.exports.jsx(s.code,{children:"{{>include}}"})," is to include an ",e.exports.jsx(s.code,{children:".hbs"})," file that has extension points (hooks) and implement them. Given the example from the previous section (about Partials), consider the following:"]}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Demo2.hbs"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{>include "./Demo.hbs"}}

{{#*inline "beforeContent"}}
	<span>Implementation here</span>
{{/inline}}

{{#*inline "afterContent"}}
	<span>Another implementation here</span>
{{/inline}}
`})}),`
`,e.exports.jsxs(s.p,{children:["Then the ",e.exports.jsx(s.code,{children:"Demo2"})," component will use the ",e.exports.jsx(s.code,{children:".hbs"})," file of the ",e.exports.jsx(s.code,{children:"Demo"})," component, however with its own version of its partials."]}),`
`,e.exports.jsxs(s.h2,{children:["5. Using the ",e.exports.jsx(s.code,{children:"slot"})," element ",e.exports.jsx("a",{name:"slots"})]}),`
`,e.exports.jsxs(s.h3,{children:["Rendering slots ",e.exports.jsx("a",{name:"slots_rendering"})]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",children:"slot"}),` element allows you to render children, nested in your web component, in a desired place in the shadow DOM.
You should render each slot, defined in your component's metadata (see `,e.exports.jsx(s.a,{href:"./03-understanding-components-metadata.md",children:"Understanding UI5 Web Components Metadata"}),"), somewhere in the ",e.exports.jsx(s.code,{children:".hbs"})," template."]}),`
`,e.exports.jsxs(s.p,{children:["To render the default slot simply render a ",e.exports.jsx(s.code,{children:"slot"})," tag:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<slot></slot>
`})}),`
`,e.exports.jsx(s.p,{children:"and to render a named slot:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<slot name="tabs"></slot>
`})}),`
`,e.exports.jsx(s.p,{children:`Here's a real-world example of a "page" component:`}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Page.js"})," (metadata object):"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`slots: {
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
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Page.hbs"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`<div class="ui5-page-root">
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
`,e.exports.jsxs(s.p,{children:["We render 3 ",e.exports.jsx(s.code,{children:"slot"})," elements - a default slot (unnamed) and 2 named slots - respectively with ",e.exports.jsx(s.code,{children:"name"})," equal to ",e.exports.jsx(s.code,{children:"header"})," and ",e.exports.jsx(s.code,{children:"footer"}),"."]}),`
`,e.exports.jsxs(s.p,{children:["All children, passed to the component, with no ",e.exports.jsx(s.code,{children:"slot"})," attribute will then be rendered by the browser where the default ",e.exports.jsx(s.code,{children:"<slot></slot>"}),` is,
and all children with attributes `,e.exports.jsx(s.code,{children:'slot="header"'})," / ",e.exports.jsx(s.code,{children:'slot="footer"'})," will be rendered where the respective named ",e.exports.jsx(s.code,{children:"slot"})," is."]}),`
`,e.exports.jsxs(s.h3,{children:["Individual slots ",e.exports.jsx("a",{name:"slots_individual"})]}),`
`,e.exports.jsxs(s.p,{children:["All children, assigned to a certain ",e.exports.jsx(s.code,{children:"slot"}),`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.`]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"individualSlots"})," slot metadata configuration setting (see ",e.exports.jsx(s.a,{href:"./03-understanding-components-metadata.md",children:"Understanding UI5 Web Components Metadata"}),") allows you to have a separate physical slot for each child belonging to a certain slot."]}),`
`,e.exports.jsxs(s.p,{children:["However, setting ",e.exports.jsx(s.code,{children:"individualSlots: true"})," in the metadata configuration only creates an ",e.exports.jsx(s.code,{children:"_individualSlot"}),` property on each element belonging to the slot, but does not create any slots automatically.
The individual slots must be explicitly rendered by the developer in the `,e.exports.jsx(s.code,{children:".hbs"})," template."]}),`
`,e.exports.jsxs(s.p,{children:["To do so, simply render a ",e.exports.jsx(s.code,{children:"slot"})," with a ",e.exports.jsx(s.code,{children:"name"})," property equal to the ",e.exports.jsx(s.code,{children:"_individualSlot"})," value for each child."]}),`
`,e.exports.jsx(s.p,{children:"Here's an example:"}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Demo.js"})," (metadata object):"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`{
	slots: {
		"default": {
			type: HTMLElement,
			propertyName: "items",
			individualSlots: true
		}
	}
}
`})}),`
`,e.exports.jsxs(s.p,{children:["Since ",e.exports.jsx(s.code,{children:"propertyName"})," is set to ",e.exports.jsx(s.code,{children:"items"}),", the children of the default slot will be accessible on the web component instance with ",e.exports.jsx(s.code,{children:"this.items"}),`;
and since `,e.exports.jsx(s.code,{children:"individualSlots"})," is set to ",e.exports.jsx(s.code,{children:"true"}),", every child in ",e.exports.jsx(s.code,{children:"this.items"})," (every child slotted in the default slot) will have an ",e.exports.jsx(s.code,{children:"_individualSlots"})," property created by the framework."]}),`
`,e.exports.jsxs(s.p,{children:["In ",e.exports.jsx(s.code,{children:"Demo.hbs"})," you must render a slot for each child with ",e.exports.jsx(s.code,{children:"name"})," equal to the ",e.exports.jsx(s.code,{children:"_individualSlot"})," property value for this child:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-handlebars",children:`{{#each items}}
	 <div class="item-wrapper">
		<slot name="{{_individualSlot}}"></slot>
	</div>
{{/each}}
`})}),`
`,e.exports.jsx(s.p,{children:"The resulting DOM from the loop above will look like this:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<div class="item-wrapper"><slot name="items-1"></slot></div>
<div class="item-wrapper"><slot name="items-2"></slot></div>
<div class="item-wrapper"><slot name="items-3"></slot></div>
`})}),`
`,e.exports.jsx(s.p,{children:"This allows you to have arbitrary DOM around each child and implement complex UX design, otherwise impossible if all children were just normally rendered next to each other in a single slot."}),`
`,e.exports.jsxs(s.p,{children:["Next: ",e.exports.jsx(s.a,{href:"./05-testing-UI5-Web-Components.md",children:"Testing UI5 Web Components"})]})]})}}export{g as default};
//# sourceMappingURL=04-understanding-hbs-templates.e7347a57.js.map
