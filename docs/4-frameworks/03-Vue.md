# Get Started with UI5 Web Components & Vue.js

In this tutorial you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new Vue.js applications and to already existing ones.

### Step 1. Install Vue CLI.

```bash
npm install -g @vue/cli
```

### Step 2. Init a new app.

```bash
vue create ui5-web-components-application
cd ui5-web-components-application
```

### Step 3. Add UI5 Web Components.

```bash
npm install @ui5/webcomponents --save
```

### Step 4a. In Vue 2.x add UI5 Web Components to Vue `ignoredElement`.

Add the following line to your ```main.js``` file:

```js
Vue.config.ignoredElements = [/^ui5-/];
```

### Step 4b. In Vue 3.x the web components check is performed during template compilation. There are two options to instruct the compiler to treat UI5 Web Components as custom elements.

- If using a build step: pass the `isCustomElement` option to the Vue template compiler. If using `vue-loader`, this should be passed via vue-loader's `compilerOptions` option:

```js
// in webpack config
rules: [
	{
		test: /\.vue$/,
		use: 'vue-loader',
		options: {
			compilerOptions: {
				isCustomElement: tag => tag.startsWith("ui5-")
			}
		}
	}
]
```

- If using on-the-fly template compilation, pass the check via `app.config.isCustomElement`:

```js
const app = createApp({})
app.config.isCustomElement = tag => tag.startsWith("ui5-");
```
### Step 5. Import the components that you are going to use.

```js
import "@ui5/webcomponents/dist/Button.js";
```

### Step 6. Use the imported elements in your application.

```html
<ui5-button>Hello world!</ui5-button>
```

### Step 7. Launch the application.

```bash
yarn serve
```

## Additional Info

### Two-Way Data Binding

`v-model` binding doesn't work for custom elements. In order to use two-way data binding, you need to bind and update the value yourself like this:

```html
<ui5-input
	:value="inputValue"
	@input="inputValue = $event.target.value">
</ui5-input>
```
