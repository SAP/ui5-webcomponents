# Using the Framework

*This section mentions framework-level APIs that do not have a dedicated section.*

Most of the time you'll be using the UI5 Web Components' APIs to do your job. However, there are also certain framework-level
APIs you should be aware of.


# Executing Code on Boot

```js
import { attachBoot } from "@ui5/webcomponents-base/dist/Boot.js";
```

The `attachBoot` function allows you to execute custom code when the framework has finished booting.

Example:

```js
attachBoot(() => {
	console.log("Framework booted");
});
```

Next: [UI5 Web Components i18n for Apps](../using-i18n-for-apps)
