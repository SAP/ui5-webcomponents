# How to use UI5 Web Components

UI5 Web Components are just HTML. Therefore, their usage is identical
to the usage of standard HTML elements. Usually Web Components creation and manipulation
will be done internally by your framework of choice.

Table of contents:

- [How do I create a UI5 Web Component instance?](#create)
- [How do I set the properties/attributes of UI5 Web Components?](#properties)
- [How do I set the content of UI5 Web Components?](#content)
- [How do I listen for events?](#events)
- [How do I call public methods?](#methods)
- [Concusion](#conclusion)

<a name="create"></a>
## 1. How do I create a UI5 Web Component instance?

The simplest way is to just add it to the `<body>`.

```html
<ui5-button>Click me</ui5-button>
```

You can also use `document.createElement` and then manually add
the element to the HTML document.

```js
const myButton = document.createElement("ui5-button");
document.body.appendChild(myButton);
```

In most real-world scenarios the above will be done by your framework of choice.

<a name="properties"></a>
## 2. How do I set the properties/attributes of UI5 Web Components?

You can use attributes and properties to the same effect. Keep in mind that attribute
names are "kebab-case" (f.e. `value-state`) while property names are "camelCase" (f.e. `valueState`).

Attributes can be set directly on the web component in HTML.

```html
<ui5-checkbox id="cb" value-state="Error"></ui5-checkbox>
```

Properties can only be set programmatically.

To set a property:

```js
const myCb = document.getElementById("cb");
myCb.valueState = "Error";
```

To set an attribute:

```js
const myCb = document.getElementById("cb");
myCb.setAttribute("value-state", "Error");
```

A note on boolean attributes: in HTML boolean attributes may have no value
or any value (most commonly same as their name). In any case, the presence of the attribute
means it is "true" and its absence - "false".

```js
const myCb = document.getElementById("cb");
myCb.setAttribute("checked", ""); // same as myCB.checked = true;
myCb.removeAttribute("checked"); // same as myCB.checked = false;
```

<a name="content"></a>
## 3. How do I set the content of UI5 Web Components?

Some UI5 Web Components do not accept children or text. They are just modified by
properties and attributes.

An example of such web component is the `ui5-icon`:

```html
<ui5-icon name="add"></ui5-icon>
```

The icon accepts no text or other HTML elements inside its opening and closing tags.
Therefore, in the next example, the text inside the `<ui5-icon>` will be ignored.

```html
<ui5-icon name="add">This is an icon</ui5-icon>
```

Other UI5 Web Components, such as `<ui5-button>` accept text (and in addition HTML elements that make sense when writing text)

```html
<ui5-button id="btn">This is the content of the button</ui5-button>
<ui5-button>This is the <strong>content<content> of the button</ui5-button>
<ui5-button>This is the <span class="myClass">content<span> of the button</ui5-button>
```

You can change the content of these elements with any suitable DOM API.

```js
const myButton = document.getElementById("btn");
myButton.textContent = "New text";
myButton.innerHTML = "New text"; // same effect as above
myButton.childNodes[0].nodeValue = "New text" // same result again
```

Usually you'll never have to do this manually either, as you'll bind the content of the button via the means
provided by the framework you're using, and the framework will be the one updating it for you.

Finally, there are UI5 Web Components that only accept other HTML elements.

For example `<ui5-popover>` may contain any HTML element - standard elements and other custom elements alike.

```html
<ui5-popover>
	<div>This is my content</div>
	<p>This is some more content</p>
	<ui5-button>Button on a popover</ui5-button>
</ui5-popover>
```

Manipulating the content of such Web Components is done again with the standard DOM APIs.

For example to add something else to the popover above:

```js
const popover = document.getElementsByTagName("ui5-popover")[0];
const newChild = document.createElement("div");
popover.appendChild(newChild);
```

Again, normally you won't need to do this manually, but your framework will do it for you.

Now let's have a look at a Web Component that is intended to have only certain children:

```html
<ui5-tabcontainer id="tc1" fixed collapsed show-overflow>
	<ui5-tab text="Laptops" additional-text="125"></ui5-tab>
	<ui5-tab-separator></ui5-tab-separator>
	<ui5-tab text="Phones" icon-color="Positive" additional-text="25"></ui5-tab>
	<ui5-tab text="Tablets"  icon-color="Negative" additional-text="40"></ui5-tab>
</ui5-tabcontainer>
```

The `<ui5-tabcontainer>` should only contain `<ui5-tab>` and `<ui5-tab-separator>`.

The manipulation is exactly the same as with the other Web Components. For example to add a new tab:

```js
const tc = document.getElementById("tc1");
const newTab = document.createElement("ui5-tab");
newTab.text = "Smart Watches";
newTab.iconColor = "Positive";
tc.appendChild(newTab);
```

And finally, some UI5 Web Components may render their children in different places, depending on the purpose
of each child.

Let's have a look at the `<ui5-popover>` again. After consulting the documentation we can see that this particular
Web Component accepts three categories of children: `default, footer, header`. For `footer` and `header`
the children can be any type of HTML Element (hence `HTMLElement`) while for `default` they can be both
HTML Elements and text (hence `Node`).

To tell the `<ui5-popover>` which child goes where, use the `slot` attribute on it.

```html
<ui5-popover>
	<div slot="header">This will be used as a header</div>

	<div>Some popover content</div>
	<div>Some more content</div>
	This text will also go to the default slot.

	<div slot="footer">
		<ui5-button>Do some action</ui5-button>
	</div>
</ui5-popover>
```

You do not have to supply the `slot` attribute for the `default` slot of any Web Component.

Also, since text nodes cannot have attributes in HTML, this also means that only the `default` slot can
accept text (can be of type `Node`) and all text nodes go there. Every UI5 Web Component that has slots,
has at least a default slot.

Here's a summary of `slot` types:

 |           Slot type            |               Allowed children                |                                    Example                                     |
 | ------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------ |
 | `Node`                         | All HTML Elements and text                    | `ui5-button` default slot                                                      |
 | `HTMLElement`                  | HTML Elements only (no text)                  | `ui5-popover` `header` slot                                                    |
 
<a name="events"></a>
## 4. How do I listen for events?

Again, you can use standard DOM methods for this task:

```js
const myMessage = document.getElementsByTagName("ui5-messagestrip")[0];
myMessage.addEventListener("close", () => {
	console.log("The user dismissed the message");
});

const myButton = document.getElementsByTagName("ui5-button")[0];
myButton.addEventListener("click", () => {
	console.log("The user clicked the button");
});
```

For the events fired by each UI5 Web Component, consult the documentation.

Like with most other tasks, you'll use your framework's syntax to bind to events and you'll rarely,
if ever, need to call `addEventListener` yourself.

Please note however that some frameworks (f.e. React) cannot use their standard syntax
for binding to custom events (such as `close`), but only for standard ones (such as `click`).
So for custom events in React you'd have to get a reference to the element and call `addEventListener` manually.

For more information, please check our [React tutorial](React-tutorial.md);

<a name="methods"></a>
## 5. How do I call public methods?

Get a reference to the UI5 Web Component and call the method on it, as you would with any other HTML element.

```js
const myDialog = document.getElementsByTagName("ui5-dialog")[0];
myDialog.open();
```

Again, consult the documentation for the available public methods for each UI5 Web Component.

<a name="conclusion"></a>
## 6. Conclusion

As you can see from this article, UI5 Web Components, being HTML elements in the first place,
comply to the same rules. There are some novelties that come with the Web Components standard,
such as `slot`, but otherwise everything else is what you already know and use from HTML.
