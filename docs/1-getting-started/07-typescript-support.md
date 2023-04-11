# TypeScript Support

**Note: TypeScript support is experimental and subject to change**. If you consume the web components via TypeScript, you might have to adjust your code before the TypeScript definitions become final and officially supported.

Since `1.11.0` we are providing `TypeScript definitions` (as `.d.ts` files) for all framework's and components' APIs, available to applications, written in TypeScript. Previously, without definitions, the usage of UI5 Web Components in TypeScript application was not optimal as the types have been missing and inferred by the TS compiler as `any`.
Now, when accessing a public API, you will benefit from static code checks, autocompletion, etc. as expected in a TypeScript app.

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


Next: [Wrapping Up](./08-wrapping-up)
