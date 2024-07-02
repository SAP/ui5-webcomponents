import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as a,F as d}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",p:"p",em:"em",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",h2:"h2",code:"code",pre:"pre"},s(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Getting started/Understanding components APIs"}),`
`,e.jsx(a,{}),`
`,e.jsx(n.h1,{id:"understanding-ui5-web-components-apis",children:"Understanding UI5 Web Components APIs"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"UI5 Web Components are just HTML."}),` Therefore, their usage is identical
to the usage of standard HTML elements. Usually, Web Components creation and manipulation
will be done internally by your framework of choice.`]}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"This section explains UI5 Web Components APIs and usage in general terms."})}),`
`,e.jsx(n.p,{children:"UI5 Web Components provide the following kinds of APIs:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"API Category"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#properties",children:"properties / attributes"})}),e.jsx(n.td,{children:"Define the look and behavior of the component"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#content",children:"slots"})}),e.jsx(n.td,{children:"Define whether you can put text or other HTML elements (and if yes, what kind) as DOM children of the component"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#events",children:"events"})}),e.jsx(n.td,{children:"Define what events the component fires due to user interaction"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"#methods",children:"public methods"})}),e.jsx(n.td,{children:"Methods you can call on the component"})]})]})]}),`
`,e.jsx(n.h2,{id:"1-how-do-i-create-a-ui5-web-component-instance",children:"1. How do I create a UI5 Web Component instance?"}),`
`,e.jsx("a",{name:"create"}),`
`,e.jsxs(n.p,{children:["The simplest way is to just add it somewhere in the ",e.jsx(n.code,{children:"<body>"})," of your HTML page."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button>Click me</ui5-button>
`})}),`
`,e.jsxs(n.p,{children:["You can also use ",e.jsx(n.code,{children:"document.createElement"}),` and then manually add
the element to the HTML document.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myButton = document.createElement("ui5-button");
document.body.appendChild(myButton);
`})}),`
`,e.jsx(n.p,{children:"In most real-world scenarios, the above will be done by your framework of choice."}),`
`,e.jsx(n.h2,{id:"2-how-do-i-set-the-propertiesattributes-of-ui5-web-components",children:"2. How do I set the properties/attributes of UI5 Web Components?"}),`
`,e.jsx("a",{name:"properties"}),`
`,e.jsxs(n.p,{children:[`You can use attributes and properties to the same effect. Keep in mind that attribute
names are "kebab-case" (e.g. `,e.jsx(n.code,{children:"value-state"}),') while property names are "camelCase" (e.g. ',e.jsx(n.code,{children:"valueState"}),")."]}),`
`,e.jsx(n.p,{children:"Attributes can be set directly on the web component in HTML."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-checkbox id="cb" value-state="Error"></ui5-checkbox>
`})}),`
`,e.jsx(n.p,{children:"Properties can only be set programmatically."}),`
`,e.jsx(n.p,{children:"To set a property:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.valueState = "Error";
`})}),`
`,e.jsx(n.p,{children:"To set an attribute:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.setAttribute("value-state", "Error");
`})}),`
`,e.jsx(n.p,{children:`A note on Boolean attributes: in HTML Boolean attributes may have no value
or any value (most commonly same as their name). In any case, the presence of the attribute
means it is "true" and its absence - "false".`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.setAttribute("checked", ""); // same as myCB.checked = true;
myCb.removeAttribute("checked"); // same as myCB.checked = false;
`})}),`
`,e.jsx(n.h2,{id:"3-how-do-i-set-the-content-of-ui5-web-components",children:"3. How do I set the content of UI5 Web Components?"}),`
`,e.jsx("a",{name:"content"}),`
`,e.jsx(n.p,{children:`Some UI5 Web Components do not accept children or text. They are only modified by
properties and attributes.`}),`
`,e.jsxs(n.p,{children:["An example of such a Web Component is the ",e.jsx(n.code,{children:"ui5-icon"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-icon name="add"></ui5-icon>
`})}),`
`,e.jsxs(n.p,{children:[`The icon accepts no text or other HTML elements inside its opening and closing tags.
Therefore, in the next example, the text inside the `,e.jsx(n.code,{children:"<ui5-icon>"})," will be ignored."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-icon name="add">This is an icon</ui5-icon>
`})}),`
`,e.jsxs(n.p,{children:["Other UI5 Web Components, such as ",e.jsx(n.code,{children:"<ui5-button>"})," accept text (and in addition HTML elements that make sense when writing text)."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button id="btn">This is the content of the button</ui5-button>
<ui5-button>This is the <strong>content<content> of the button</ui5-button>
<ui5-button>This is the <span class="myClass">content<span> of the button</ui5-button>
`})}),`
`,e.jsx(n.p,{children:"You can change the content of these elements with any suitable DOM API."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myButton = document.getElementById("btn");
myButton.textContent = "New text";
myButton.innerHTML = "New text"; // same effect as above
myButton.childNodes[0].nodeValue = "New text" // same result again
`})}),`
`,e.jsx(n.p,{children:`Usually, you'll never have to do this manually either, as you'll bind the content of the button via the means
provided by the framework you're using, and the framework will be the one updating it for you.`}),`
`,e.jsx(n.p,{children:"Finally, there are UI5 Web Components that only accept other HTML elements."}),`
`,e.jsxs(n.p,{children:["For example ",e.jsx(n.code,{children:"<ui5-popover>"})," may contain any HTML element - standard elements and other custom elements alike."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-popover>
	<div>This is my content</div>
	<p>This is some more content</p>
	<ui5-button>Button on a popover</ui5-button>
</ui5-popover>
`})}),`
`,e.jsx(n.p,{children:"Manipulating the content of such Web Components is done again with the standard DOM APIs."}),`
`,e.jsx(n.p,{children:"For example, to add something else to the popover above:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const popover = document.getElementsByTagName("ui5-popover")[0];
const newChild = document.createElement("div");
popover.appendChild(newChild);
`})}),`
`,e.jsx(n.p,{children:"Again, normally you won't need to do this manually, but your framework will do it for you."}),`
`,e.jsx(n.p,{children:"Now, let's have a look at a Web Component that is intended to have only certain children:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-tabcontainer id="tc1">
	<ui5-tab text="Laptops" additional-text="125"></ui5-tab>
	<ui5-tab-separator></ui5-tab-separator>
	<ui5-tab text="Phones" design="Positive" additional-text="25"></ui5-tab>
	<ui5-tab text="Tablets" design="Negative" additional-text="40"></ui5-tab>
</ui5-tabcontainer>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<ui5-tabcontainer>"})," should only contain ",e.jsx(n.code,{children:"<ui5-tab>"})," and ",e.jsx(n.code,{children:"<ui5-tab-separator>"}),"."]}),`
`,e.jsx(n.p,{children:"The manipulation is exactly the same as with the other Web Components. For example, to add a new tab:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const tc = document.getElementById("tc1");
const newTab = document.createElement("ui5-tab");
newTab.text = "Smart Watches";
newTab.design = "Positive";
tc.appendChild(newTab);
`})}),`
`,e.jsx(n.p,{children:`And finally, some UI5 Web Components may render their children in different places, depending on the purpose
of each child.`}),`
`,e.jsxs(n.p,{children:["Let's have a look at the ",e.jsx(n.code,{children:"<ui5-popover>"}),` again. After consulting the documentation, we can see that this particular
Web Component accepts three categories of children: `,e.jsx(n.code,{children:"default, footer, header"}),". For ",e.jsx(n.code,{children:"footer"})," and ",e.jsx(n.code,{children:"header"}),`
the children can be any type of HTML Element (hence `,e.jsx(n.code,{children:"HTMLElement"}),"), while for ",e.jsx(n.code,{children:"default"}),` they can be both
HTML Elements and text (hence `,e.jsx(n.code,{children:"Node"}),")."]}),`
`,e.jsxs(n.p,{children:["To tell the ",e.jsx(n.code,{children:"<ui5-popover>"})," which child goes where, use the ",e.jsx(n.code,{children:"slot"})," attribute on it."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-popover>
	<div slot="header">This will be used as a header</div>

	<div>Some popover content</div>
	<div>Some more content</div>
	This text will also go to the default slot.

	<div slot="footer">
		<ui5-button>Do some action</ui5-button>
	</div>
</ui5-popover>
`})}),`
`,e.jsxs(n.p,{children:["You do not have to supply the ",e.jsx(n.code,{children:"slot"})," attribute for the ",e.jsx(n.code,{children:"default"})," slot of any Web Component."]}),`
`,e.jsxs(n.p,{children:["Also, since text nodes cannot have attributes in HTML, this also means that only the ",e.jsx(n.code,{children:"default"}),` slot can
accept text (can be of type `,e.jsx(n.code,{children:"Node"}),`) and all text nodes go there. Every UI5 Web Component that has slots,
has at least a default slot.`]}),`
`,e.jsxs(n.p,{children:["Here's a summary of ",e.jsx(n.code,{children:"slot"})," types:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot Type"}),e.jsx(n.th,{children:"Allowed Children"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Node"})}),e.jsx(n.td,{children:"All HTML elements and text"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"ui5-button"})," default slot"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"HTMLElement"})}),e.jsx(n.td,{children:"HTML elements only (no text)"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"ui5-popover"})," ",e.jsx(n.code,{children:"header"})," slot"]})]})]})]}),`
`,e.jsx(n.h2,{id:"4-how-do-i-listen-for-events",children:"4. How do I listen for events?"}),`
`,e.jsx("a",{name:"events"}),`
`,e.jsx(n.p,{children:"For this task, you can again use standard DOM methods:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myMessage = document.getElementsByTagName("ui5-message-strip")[0];
myMessage.addEventListener("close", () => {
	console.log("The user dismissed the message");
});

const myButton = document.getElementsByTagName("ui5-button")[0];
myButton.addEventListener("click", () => {
	console.log("The user clicked the button");
});
`})}),`
`,e.jsx(n.p,{children:"For the events fired by each UI5 Web Component, consult the documentation."}),`
`,e.jsxs(n.p,{children:[`Like with most other tasks, you'll use your framework's syntax to bind to events, and you'll rarely,
if ever, need to call `,e.jsx(n.code,{children:"addEventListener"})," yourself."]}),`
`,e.jsxs(n.p,{children:[`Please, note, however that some frameworks (e.g. React) cannot use their standard syntax
for binding to custom events (such as `,e.jsx(n.code,{children:"close"}),"), but only for standard ones (such as ",e.jsx(n.code,{children:"click"}),`).
So, for custom events in React you'd have to get a reference to the element and call `,e.jsx(n.code,{children:"addEventListener"})," manually."]}),`
`,e.jsxs(n.p,{children:["For more information, please check our ",e.jsx(n.a,{href:"./?path=/docs/docs-frameworks-react--docs",children:"React tutorial"}),"."]}),`
`,e.jsx(n.h2,{id:"5-how-do-i-call-public-methods",children:"5. How do I call public methods?"}),`
`,e.jsx("a",{name:"methods"}),`
`,e.jsx(n.p,{children:"Get a reference to the UI5 Web Component and call the method on it, as you would with any other HTML element."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const myDialog = document.getElementsByTagName("ui5-dialog")[0];
myDialog.show();
`})}),`
`,e.jsx(n.p,{children:"Consult the documentation for the available public methods for each UI5 Web Component."}),`
`,e.jsx(n.h2,{id:"6-conclusion",children:"6. Conclusion"}),`
`,e.jsx("a",{name:"conclusion"}),`
`,e.jsxs(n.p,{children:[`As you can see from this article, UI5 Web Components, being HTML elements in the first place,
comply with the same rules. There are some novelties that come with the Web Components standard,
such as `,e.jsx(n.code,{children:"slot"}),", but otherwise everything else is what you already know and use from HTML."]}),`
`,e.jsx(d,{})]})}function g(t={}){const{wrapper:n}=Object.assign({},s(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{g as default};
