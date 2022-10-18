# Understanding UI5 Web Components Metadata

Metadata is a JavaScript object, containing information about the public interface of a UI5 Web Component (tag name, properties, etc.).

*Disclaimer: The information below is for UI5 Web Components development only. It is experimental and may change.*

## Tag

Defines the HTML tag for the Web Component.

#### Example:

```json
{
	"tag": "ui5-my-element",
}
``` 

## Properties / Attributes

Defines the HTML properties for the Web Component. 

**Note about attributes:** By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in `kebab-case` rather than `camelCase`.
Properties of type `Object`, properties with `multiple` set to`true` and properties with `noAttribute` set to `true` do not have an attribute equivalent. 

#### Example

```json
{
	"properties": {
		"message": {
			"type": String,
			"defaultValue": "Hello",
		},
		"shown": {
			"type": Boolean,
			"noAttribute": true,
		},
		"settings": {
			"type": Object,
		},
		"nums": {
			"type": Integer,
			"multiple": true,
		},
		"animationDuration": {
			"type": Integer,
		},
		"width": {
			"type": CSSSize,
			"defaultValue": "",
		},
	},
}
```

#### Property configuration settings

| Setting        | Type                         | Default   | Description                                                                                                   |
|----------------|------------------------------|-----------|---------------------------------------------------------------------------------------------------------------|
| `type`         | Property type                | N/A       | The type of the property. For more information on types see the table below.                                  |
| `defaultValue` | Any valid value for the type | undefined | Default value of the property. Cannot be set for type "Boolean". Booleans are always false by default in HTML.|
| `multiple`     | Boolean                      | false     | Indicates whether the property represents a single value or is an array of values of the given type.          |
| `noAttribute`  | Boolean                      | false     | No attribute equivalent will be created for that property. Always true for properties of type Object.        |

The `type` setting is required.

#### Types

| Type        | Class to Use                                            | Description                             |
|-------------|---------------------------------------------------------|-----------------------------------------|
| string      | `String`                                                | String value                            |
| boolean     | `Boolean`                                               | Boolean value - always false by default |
| object      | `Object`                                                | JS Object                               |
| custom type | Extend `@ui5/webcomponents-base/dist/types/DataType.js` | Used mainly for enumerations            |


#### Examples of prebuilt custom types

| Type       | Class to Use                                       | Description                                                    |
|------------|----------------------------------------------------|----------------------------------------------------------------|
| Integer    | `@ui5/webcomponents-base/dist/types/Integer.js`    | Integer value                                                  |
| CSSSize    | `@ui5/webcomponents-base/dist/types/CSSSize.js`    | Any valid CSS size definition (`px`, `rem`, etc.)              |
| ValueState | `@ui5/webcomponents-base/dist/types/ValueState.js` | Enumeration with: `None`, `Error`, `Warning`, `Success` values |

## Slots

Defines the `slots` that will be provided by this UI5 Web Component.

#### Example

```json
{
	"slots": {
		"default": {
			"type": Node,
		},
		"footer": {
			"type": HTMLElement,
		},
		"rows": {
			"type": HTMLElement,
			"individualSlots": true,
		}
	}
}
```

#### Slot configuration settings

| Setting                      | Type                    | Default | Description                                                                                                                                                          |
|------------------------------|-------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` *                     | `HTMLElement` or `Node` | N/A     | The type of the children that can go into that slot.                                                                                                                  |
| `individualSlots`            | `Boolean`               | false   | If set to `true`, each child will have its own slot, allowing you to arrange/wrap the children arbitrarily.                                                          |
| `propertyName`               | `String`                | N/A     | Allows to set the name of the property on the Web Component, where the children belonging to this slot will be stored.                                               |
| `invalidateOnChildChange` ** | `Boolean` or `Object`   | false   | **Experimental, do not use.** Defines whether every invalidation of a UI5 Web Component in this slot should trigger an invalidation of the parent UI5 Web Component. |

`*` The `type` setting is required.

`**` 
**Important:** `invalidateOnChildChange` is not meant to be used with standard DOM Elements and is not to be confused with `MutationObserver`-like functionality. 
It rather targets the use case of components that slot abstract items (`UI5Element` instances without a template) and require to be invalidated in turn whenever these items are invalidated.  

The `invalidateOnChildChange` setting can be either a `Boolean` (`true` meaning invalidate the component on any change of a child in this slot) or an `Object` with `properties` and `slots` fields. They in turn can be either of
type `Boolean` (`true` meaning invalidate on any property change or any slot change) or `Array` of strings indicating exactly which properties or slots lead to invalidation.

Examples:

 - In the following example, since `invalidateOnChildChange` is not used (`false` by default), the component will be invalidated whenever children are added/removed in the `tabs` slot,
 but not whenever a child in that slot changes.
 ```json
{
	managedSlots: true,
	slots: {
		"default": {
			"type": "HTMLElement",
			"propertyName": "tabs",
		}
	}
}
```

 - Setting `invalidateOnChildChange` to `true` means: invalidate the component whenever a child in the `tabs` slot gets invalidated, regardless of the reason.
 ```json
{
	managedSlots: true,
	slots: {
		"default": {
			"type": "HTMLElement",
			"propertyName": "tabs",
			"invalidateOnChildChange": true
		}
	}
}
```

 - The example below results in exactly the same behavior as the one above, but it uses the more explicit `Object` format:
 ```json
{
	managedSlots: true,
	slots: {
		"default": {
			"type": "HTMLElement",
			"propertyName": "tabs",
			"invalidateOnChildChange": {
				"properties": true,
				"slots": true
			}
		}
	}
}
```

 - The following example uses the `Object` format again and means: invalidate the component whenever the children in this slot are invalidated due to property changes, but not due 
 to slot changes. Here `"slots": false` is added for completeness (as `false` is the default value for both `properties` and `slots`)
 ```json
{
	managedSlots: true,
	slots: {
		"default": {
			"type": "HTMLElement",
			"propertyName": "tabs",
			"invalidateOnChildChange": {
				"properties": true,
				"slots": false
			}
		}
	}
}
```

 - The final example shows the most complex format of `invalidateOnChildChange` which allows to define which slots or properties in the children inside that slot lead to invalidation of the component:
 ```json
{
	managedSlots: true,
	slots: {
		"default": {
			"type": "HTMLElement",
			"propertyName": "tabs",
			"invalidateOnChildChange": {
				"properties": ["text", "selected", "disabled"],
				"slots": ["default"]
			}
		}
	}
}
```

Notes:
 - Children without a `slot` attribute will be assigned to the `default` slot. 
 - All HTML text nodes will be assigned to the `default` slot, as they cannot have a `slot` attribute.
 - For all slots the Web Component will have a property created, with the name of the slot, to hold a list of all children assigned to this slot.
 For example, if you have a slot named "rows", "this.rows" will be an array, holding references to all children with `slot="rows"`, or no slot, if rows was default.
 - For the `default` slot you can provide a `propertyName` setting. 
 For example, if your default slot has a `propertyName: "items"`, then "this.items" will hold all children that were assigned to the default slot.
 
 #### Allowed slot types

| Type        | Description                               |
|-------------|-------------------------------------------|
| Node        | Accepts both Text nodes and HTML Elements |
| HTMLElement | Accepts HTML Elements only                |

## Managed slots

Determines whether the framework should manage the slots of this UI5 Web Component. 

This setting is useful for UI5 Web Components that don't just slot children, but additionally base their own 
rendering on the presence/absence/type of children.

```json
{
	"managedSlots": true
}
```

When `managedSlots` is set to `true`:
 - The framework will invalidate this UI5 Web Component, whenever its children are added/removed/rearranged (and additionally when invalidated, if `invalidateOnChildChange` is set).
 - If any of this UI5 Web Component's children are custom elements, the framework will await until they are all
 defined and upgraded, before rendering the component for the first time.
 - The framework will create properties for each slot on this UI5 Web Component's instances for easier access
 to the slotted children. For example, if there are `header`, `content` and `footer` slots, there will be
 respectively `header`, `content` and `footer` properties of type `Array` holding the slotted children for each slot.
 **Note:** You can use the `propertyName` metadata entity, described above, to modify these. 
 
 In essence, set this to `true` if the UI5 Web Component you're developing should be aware of its children
 for the purposes of its own state management and rendering (contrary to just displaying them).
 
 An example of a component that would benefit from `managedSlots` is a Tab Container that monitors its children (Tabs)
 in order to display a link on its Tab Strip for each Tab child. Therefore, it would need to be invalidated whenever
 Tabs are added/removed, in order to update its own state and visualization.

## Language-aware components

The `languageAware` metadata setting determines if the component should be re-rendered whenever the language changes.

```json
{
	"languageAware": true
}
```

You should use this setting if your component has translatable texts, therefore needs to be re-rendered when the app
changes the language.

## Theme-aware components

The `themeAware` metadata setting determines if the component should re-render whenever the theme changes.

```json
{
	"themeAware": true
}
```

**Important: You should almost never use this setting.**

Normally components are built in such a way that their structure
is exactly the same for all themes and whenever the theme changes *only CSS Variables are changed* and the component itself
does not need to be re-rendered - the browser automatically updates the styles when CSS Variables get new values.

However, there are some very rare cases where a component must behave differently (opposed to just look differently) based on the theme.
For example, the `ui5-icon` component must show different versions of the icons based on the theme. Use the `themeAware` setting
in these exceptional cases to guarantee that your component will be re-rendered on theme change.

Next: [Understanding the Handlebars (`.hbs`) templates](./04-understanding-hbs-templates.md)
