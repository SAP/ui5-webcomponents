# Using the framework

Most of the time you'll be using the UI5 Web Components' APIs to do your job. However, there are also certain framework-level
APIs you should be aware of.

*This section mentions framework-level APIs that do not have a dedicated section.*

# 1. Executing code on boot

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

