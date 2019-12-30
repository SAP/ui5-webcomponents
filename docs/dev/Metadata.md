# Metadata

Metadata is a JavaScript object, containing information about the public interface of a UI5 Web Component (tag name, properties, etc...)

*Disclaimer: The information below is for UI5 Web Components development only. It is experimental and may change*

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

*Note about attributes:* By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in `kebab-case` rather than `camelCase`.
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

Setting | Type | Default | Description
--------|------|--------| -----------
`type`    | Property type | N/A | The type of the property. For more information on types see the table below. 
`defaultValue` | Any valid value for the type | undefined | Default value of the property. Cannot be set for type "Boolean". Booleans are always false by default in HTML
`multiple` | Boolean | false | Indicates whether the property represents a single value or is an array of values of the given type
`noAttribute` | Boolean | false | No attribute equivalent will be created for that property. Always false for properties of type Object.

The `type` setting is required.

#### Types

Type | Class to use | Description
-----|-------|------
string | `String` | String value
boolean | `Boolean` | Boolean value - always false by default
object | `Object` | JS Object
custom type | Extend `@ui5/webcomponents-base/dist/types/DataType.js` | Used mainly for enumerations

#### Examples of prebuilt custom types

Type | Class to use | Description
-----|-------|------
Integer | `@ui5/webcomponents-base/dist/types/Integer.js` | Integer value
CSSSize | `@ui5/webcomponents-base/dist/types/CSSSize.js` | Any valid CSS size definition (`px`, `rem`, etc...)
ValueState | `@ui5/webcomponents-base/dist/types/ValueState.js` | Enumeration with: `None`, `Error`, `Warning`, `Success` values

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

Setting | Type | Default | Description
--------|------|--------|-----------
`type`    | `HTMLElement` or `Node` | N/A | The type of the children that can go into that slot 
`individualSlots` | `Boolean` | false | If set to `true`, each child will have its own slot, allowing you to arrange/wrap the children arbitrarily.
`propertyName` | `String` | N/A | Allows to set the name of the property on the Web Component, where the children belonging to this slot will be stored.
`listenFor` | `Object` | N/A | **Experimental, do not use.** If set, whenever the children, belonging to this slot have their properties changed, the Web Component will be invalidated. 

The `type` setting is required.

Notes:
 - Children without a `slot` attribute will be assigned to the `default` slot. 
 - All HTML text nodes will be assigned to the `default` slot, as they cannot have a `slot` attribute.
 - For all slots the Web Component will have a property created, with the name of the slot, to hold a list of all children assigned to this slot.
 For example, if you have a slot named "rows", "this.rows" will be an array, holding references to all children with `slot="rows"`, or no slot, if rows was default.
 - For the `default` slot you can provide a `propertyName` setting. 
 For example, if your default slot has a `propertyName: "items"`, then "this.items" will hold all children that were assigned to the default slot.
 
 #### Allowed slot types
 
 Type | Description
 -----|-------------
 Node | Accepts both Text nodes and HTML Elements
 HTMLElement | Accepts HTML Elements only
