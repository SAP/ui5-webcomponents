# TypeScript Support

**TypeScript Support is enabled for both component development and component consumption.**

Since version `1.11.0`, we have been providing TypeScript definitions under an experimental flag, and starting from version `1.19.0`, all TypeScript definitions are considered `stable`.
With TypeScript definitions you will benefit from static code checks, autocompletion, and other expected features as expected in a TypeScript application.


**Note:** In exceptional cases, some of the available TypeScript types may change. In such instances, we will document all changes in a prominent manner within our release change log.


**Example:** usage of `setLanguage` from `@ui5/webcomponents-base`

```ts
import  { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";

setLanguage("de");

```

You will get a proper documentation

```html
setLanguage(language: string): Promise<void>

Changes the current language, re-fetches all message bundles, updates all language-aware components and returns a promise that resolves when all rendering is done.

@public
@returns
```

When you pass a wrong argument:

```ts
setLanguage(false)
```

You will get a TypeScript error:
```html
Argument of type 'boolean' is not assignable to parameter of type 'string'.
```

### Component properties

In TypeScript, when a property is declared optional using the ? syntax in an interface, it means that the property can either have a defined value of a certain type or be absent altogether. This doesn't imply that the property can be explicitly set to null or undefined unless explicitly stated.

For instance, if the `value` property of the `ui5-combobox` component is defined as optional with the type string (value?: string). This indicates that the property can be set with a string value or be absent/omitted.

However, setting it explicitly to null might lead to runtime errors because the component might not handle null values correctly. To ensure proper handling of optional properties, **TypeScript offers a feature we suggest enabling called "Exact Optional Property Types"**. See https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes .
When enabled, TypeScript enforces stricter rules regarding optional properties, ensuring that they can only be assigned values that are explicitly allowed by the type definition.

For instance, consider the following interface:
```typescript
interface UserDefaults { 
    colorThemeOverride?: "dark" | "light"; 
}
```

Without "Exact Optional Property Types" enabled, TypeScript allows setting `colorThemeOverride` to `dark`, `light`, or `undefined`. However, enabling "Exact Optional Property Types" ensures that only these values are permitted, disallowing null or other unexpected values.

In summary, it's essential to ensure that the a property of type string is handled according to its type definition (for example, by setting empty string, instead of `null`, where type is `string`), and if necessary, enable "Exact Optional Property Types" in TypeScript to enforce stricter rules regarding optional properties.