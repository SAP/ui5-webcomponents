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


Next: [Wrapping Up](./08-wrapping-up)
