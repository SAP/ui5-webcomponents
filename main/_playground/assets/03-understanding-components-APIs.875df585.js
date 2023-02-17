import{j as e}from"./jsx-runtime.7897cedd.js";import{M as a}from"./index.8cb7a9d9.js";import{u as r}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function b(n={}){const{wrapper:s}=Object.assign({},r(),n.components);return s?e.exports.jsx(s,Object.assign({},n,{children:e.exports.jsx(o,{})})):o();function o(){const t=Object.assign({h1:"h1",p:"p",em:"em",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",h2:"h2",code:"code",pre:"pre"},r(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(a,{title:"Docs/Getting started/Understanding components APIs"}),`
`,e.exports.jsx(t.h1,{children:"Understanding UI5 Web Components APIs"}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.em,{children:"UI5 Web Components are just HTML."}),` Therefore, their usage is identical
to the usage of standard HTML elements. Usually, Web Components creation and manipulation
will be done internally by your framework of choice.`]}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.em,{children:"This section explains UI5 Web Components APIs and usage in general terms."})}),`
`,e.exports.jsx(t.p,{children:"UI5 Web Components provide the following kinds of APIs:"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"API Category"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"#properties",children:"properties / attributes"})}),e.exports.jsx(t.td,{children:"Define the look and behavior of the component"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"#content",children:"slots"})}),e.exports.jsx(t.td,{children:"Define whether you can put text or other HTML elements (and if yes, what kind) as DOM children of the component"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"#events",children:"events"})}),e.exports.jsx(t.td,{children:"Define what events the component fires due to user interaction"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.a,{href:"#methods",children:"public methods"})}),e.exports.jsx(t.td,{children:"Methods you can call on the component"})]})]})]}),`
`,e.exports.jsx(t.h2,{children:"1. How do I create a UI5 Web Component instance?"}),`
`,e.exports.jsx("a",{name:"create"}),`
`,e.exports.jsxs(t.p,{children:["The simplest way is to just add it somewhere in the ",e.exports.jsx(t.code,{children:"<body>"})," of your HTML page."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button>Click me</ui5-button>
`})}),`
`,e.exports.jsxs(t.p,{children:["You can also use ",e.exports.jsx(t.code,{children:"document.createElement"}),` and then manually add
the element to the HTML document.`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myButton = document.createElement("ui5-button");
document.body.appendChild(myButton);
`})}),`
`,e.exports.jsx(t.p,{children:"In most real-world scenarios, the above will be done by your framework of choice."}),`
`,e.exports.jsx(t.h2,{children:"2. How do I set the properties/attributes of UI5 Web Components?"}),`
`,e.exports.jsx("a",{name:"properties"}),`
`,e.exports.jsxs(t.p,{children:[`You can use attributes and properties to the same effect. Keep in mind that attribute
names are "kebab-case" (e.g. `,e.exports.jsx(t.code,{children:"value-state"}),') while property names are "camelCase" (e.g. ',e.exports.jsx(t.code,{children:"valueState"}),")."]}),`
`,e.exports.jsx(t.p,{children:"Attributes can be set directly on the web component in HTML."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-checkbox id="cb" value-state="Error"></ui5-checkbox>
`})}),`
`,e.exports.jsx(t.p,{children:"Properties can only be set programmatically."}),`
`,e.exports.jsx(t.p,{children:"To set a property:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.valueState = "Error";
`})}),`
`,e.exports.jsx(t.p,{children:"To set an attribute:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.setAttribute("value-state", "Error");
`})}),`
`,e.exports.jsx(t.p,{children:`A note on Boolean attributes: in HTML Boolean attributes may have no value
or any value (most commonly same as their name). In any case, the presence of the attribute
means it is "true" and its absence - "false".`}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myCb = document.getElementById("cb");
myCb.setAttribute("checked", ""); // same as myCB.checked = true;
myCb.removeAttribute("checked"); // same as myCB.checked = false;
`})}),`
`,e.exports.jsx(t.h2,{children:"3. How do I set the content of UI5 Web Components?"}),`
`,e.exports.jsx("a",{name:"content"}),`
`,e.exports.jsx(t.p,{children:`Some UI5 Web Components do not accept children or text. They are only modified by
properties and attributes.`}),`
`,e.exports.jsxs(t.p,{children:["An example of such a Web Component is the ",e.exports.jsx(t.code,{children:"ui5-icon"}),":"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-icon name="add"></ui5-icon>
`})}),`
`,e.exports.jsxs(t.p,{children:[`The icon accepts no text or other HTML elements inside its opening and closing tags.
Therefore, in the next example, the text inside the `,e.exports.jsx(t.code,{children:"<ui5-icon>"})," will be ignored."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-icon name="add">This is an icon</ui5-icon>
`})}),`
`,e.exports.jsxs(t.p,{children:["Other UI5 Web Components, such as ",e.exports.jsx(t.code,{children:"<ui5-button>"})," accept text (and in addition HTML elements that make sense when writing text)."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="btn">This is the content of the button</ui5-button>
<ui5-button>This is the <strong>content<content> of the button</ui5-button>
<ui5-button>This is the <span class="myClass">content<span> of the button</ui5-button>
`})}),`
`,e.exports.jsx(t.p,{children:"You can change the content of these elements with any suitable DOM API."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myButton = document.getElementById("btn");
myButton.textContent = "New text";
myButton.innerHTML = "New text"; // same effect as above
myButton.childNodes[0].nodeValue = "New text" // same result again
`})}),`
`,e.exports.jsx(t.p,{children:`Usually, you'll never have to do this manually either, as you'll bind the content of the button via the means
provided by the framework you're using, and the framework will be the one updating it for you.`}),`
`,e.exports.jsx(t.p,{children:"Finally, there are UI5 Web Components that only accept other HTML elements."}),`
`,e.exports.jsxs(t.p,{children:["For example ",e.exports.jsx(t.code,{children:"<ui5-popover>"})," may contain any HTML element - standard elements and other custom elements alike."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-popover>
	<div>This is my content</div>
	<p>This is some more content</p>
	<ui5-button>Button on a popover</ui5-button>
</ui5-popover>
`})}),`
`,e.exports.jsx(t.p,{children:"Manipulating the content of such Web Components is done again with the standard DOM APIs."}),`
`,e.exports.jsx(t.p,{children:"For example, to add something else to the popover above:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const popover = document.getElementsByTagName("ui5-popover")[0];
const newChild = document.createElement("div");
popover.appendChild(newChild);
`})}),`
`,e.exports.jsx(t.p,{children:"Again, normally you won't need to do this manually, but your framework will do it for you."}),`
`,e.exports.jsx(t.p,{children:"Now, let's have a look at a Web Component that is intended to have only certain children:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-tabcontainer id="tc1">
	<ui5-tab text="Laptops" additional-text="125"></ui5-tab>
	<ui5-tab-separator></ui5-tab-separator>
	<ui5-tab text="Phones" design="Positive" additional-text="25"></ui5-tab>
	<ui5-tab text="Tablets" design="Negative" additional-text="40"></ui5-tab>
</ui5-tabcontainer>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"<ui5-tabcontainer>"})," should only contain ",e.exports.jsx(t.code,{children:"<ui5-tab>"})," and ",e.exports.jsx(t.code,{children:"<ui5-tab-separator>"}),"."]}),`
`,e.exports.jsx(t.p,{children:"The manipulation is exactly the same as with the other Web Components. For example, to add a new tab:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const tc = document.getElementById("tc1");
const newTab = document.createElement("ui5-tab");
newTab.text = "Smart Watches";
newTab.design = "Positive";
tc.appendChild(newTab);
`})}),`
`,e.exports.jsx(t.p,{children:`And finally, some UI5 Web Components may render their children in different places, depending on the purpose
of each child.`}),`
`,e.exports.jsxs(t.p,{children:["Let's have a look at the ",e.exports.jsx(t.code,{children:"<ui5-popover>"}),` again. After consulting the documentation, we can see that this particular
Web Component accepts three categories of children: `,e.exports.jsx(t.code,{children:"default, footer, header"}),". For ",e.exports.jsx(t.code,{children:"footer"})," and ",e.exports.jsx(t.code,{children:"header"}),`
the children can be any type of HTML Element (hence `,e.exports.jsx(t.code,{children:"HTMLElement"}),"), while for ",e.exports.jsx(t.code,{children:"default"}),` they can be both
HTML Elements and text (hence `,e.exports.jsx(t.code,{children:"Node"}),")."]}),`
`,e.exports.jsxs(t.p,{children:["To tell the ",e.exports.jsx(t.code,{children:"<ui5-popover>"})," which child goes where, use the ",e.exports.jsx(t.code,{children:"slot"})," attribute on it."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-popover>
	<div slot="header">This will be used as a header</div>

	<div>Some popover content</div>
	<div>Some more content</div>
	This text will also go to the default slot.

	<div slot="footer">
		<ui5-button>Do some action</ui5-button>
	</div>
</ui5-popover>
`})}),`
`,e.exports.jsxs(t.p,{children:["You do not have to supply the ",e.exports.jsx(t.code,{children:"slot"})," attribute for the ",e.exports.jsx(t.code,{children:"default"})," slot of any Web Component."]}),`
`,e.exports.jsxs(t.p,{children:["Also, since text nodes cannot have attributes in HTML, this also means that only the ",e.exports.jsx(t.code,{children:"default"}),` slot can
accept text (can be of type `,e.exports.jsx(t.code,{children:"Node"}),`) and all text nodes go there. Every UI5 Web Component that has slots,
has at least a default slot.`]}),`
`,e.exports.jsxs(t.p,{children:["Here's a summary of ",e.exports.jsx(t.code,{children:"slot"})," types:"]}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Slot Type"}),e.exports.jsx(t.th,{children:"Allowed Children"}),e.exports.jsx(t.th,{children:"Example"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"Node"})}),e.exports.jsx(t.td,{children:"All HTML elements and text"}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"ui5-button"})," default slot"]})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"HTMLElement"})}),e.exports.jsx(t.td,{children:"HTML elements only (no text)"}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"ui5-popover"})," ",e.exports.jsx(t.code,{children:"header"})," slot"]})]})]})]}),`
`,e.exports.jsx(t.h2,{children:"4. How do I listen for events?"}),`
`,e.exports.jsx("a",{name:"events"}),`
`,e.exports.jsx(t.p,{children:"For this task, you can again use standard DOM methods:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myMessage = document.getElementsByTagName("ui5-message-strip")[0];
myMessage.addEventListener("close", () => {
	console.log("The user dismissed the message");
});

const myButton = document.getElementsByTagName("ui5-button")[0];
myButton.addEventListener("click", () => {
	console.log("The user clicked the button");
});
`})}),`
`,e.exports.jsx(t.p,{children:"For the events fired by each UI5 Web Component, consult the documentation."}),`
`,e.exports.jsxs(t.p,{children:[`Like with most other tasks, you'll use your framework's syntax to bind to events, and you'll rarely,
if ever, need to call `,e.exports.jsx(t.code,{children:"addEventListener"})," yourself."]}),`
`,e.exports.jsxs(t.p,{children:[`Please, note, however that some frameworks (e.g. React) cannot use their standard syntax
for binding to custom events (such as `,e.exports.jsx(t.code,{children:"close"}),"), but only for standard ones (such as ",e.exports.jsx(t.code,{children:"click"}),`).
So, for custom events in React you'd have to get a reference to the element and call `,e.exports.jsx(t.code,{children:"addEventListener"})," manually."]}),`
`,e.exports.jsxs(t.p,{children:["For more information, please check our ",e.exports.jsx(t.a,{href:"React-tutorial.md",children:"React tutorial"}),"."]}),`
`,e.exports.jsx(t.h2,{children:"5. How do I call public methods?"}),`
`,e.exports.jsx("a",{name:"methods"}),`
`,e.exports.jsx(t.p,{children:"Get a reference to the UI5 Web Component and call the method on it, as you would with any other HTML element."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const myDialog = document.getElementsByTagName("ui5-dialog")[0];
myDialog.show();
`})}),`
`,e.exports.jsx(t.p,{children:"Consult the documentation for the available public methods for each UI5 Web Component."}),`
`,e.exports.jsx(t.h2,{children:"6. Conclusion"}),`
`,e.exports.jsx("a",{name:"conclusion"}),`
`,e.exports.jsxs(t.p,{children:[`As you can see from this article, UI5 Web Components, being HTML elements in the first place,
comply with the same rules. There are some novelties that come with the Web Components standard,
such as `,e.exports.jsx(t.code,{children:"slot"}),", but otherwise everything else is what you already know and use from HTML."]}),`
`,e.exports.jsxs(t.p,{children:["Next: ",e.exports.jsx(t.a,{href:"../using-icons",children:"Using Icons"})]})]})}}export{b as default};
//# sourceMappingURL=03-understanding-components-APIs.875df585.js.map
