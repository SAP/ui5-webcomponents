# Styling UI5 Web Components

The current article decribes general patterns to style the UI5 Web Components.

One of the core principles of Web Components is the encapsulation. The html and styles are encapsulated in the Shadow DOM. This avoids clashes with any CSS, brought by the rest of the app, but also makes custimization harder. However, there are quite some options to apply custom styling.


## Styles on tag level
We designed some components such as Title, Label, Badge, Buttom, Input and few more in such way, that it is possible to set styles/classes on the custom elements like that will take effect.

<b>For example:</b>
```css
  ui5-input {
    width: 150px;
    color: yellow;
    background: purple;
  }
```
You can try this yourself in the Input's [test page](https://sap.github.io/ui5-webcomponents/main/playground/main/pages/Input/). 

Unfortunately, this can't be done for all components, because it depends on the complexity of the DOM structure.


## Usage of Shadow Parts: 
For more complex components, the styling on tag level is not possible, therefore we introduced shadow parts on specific elements in the components’ Shadow DOM, that the user can restyle, using [standard CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for shadow parts.

<b>For example:</b> you can change the appearance of the CardHeader’s status with the CSS shadow parts syntax:

```html
<ui5-card>
	<ui5-card-header
        title-text="Quick Links"
		status="4 of 10"
		slot="header">
	</ui5-card-header>
</ui5-card>
```

```css
  ui5-card-header::part(status) {
    color: red;
  }
```

<b>Note:</b> All the available shadow parts are described in the API reference, as part of the "Overview" section of each component


## Changing CSS Vars
The UI5 WebComponents leverage CSS variables, so if you inspect the elements inside the Shadow DOM, you will probably find which variable you need to change. Check the list of all [Global CSS Variables]((https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css)) that we use in the component. Altering them will change the component appearance.


## Custom Theme schema
To change the entire colour scheme, the users can create their own theme.
You can find here more info in the next article.

Next: [Custom Theming](./02-theme.md)
