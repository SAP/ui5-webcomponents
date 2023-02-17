# Get Started with UI5 Web Components & Vue.js

In this tutorial you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new Vue.js applications and to already existing ones.

## Setting up a Vite and Vue.js project with UI5 Web Components
<br/>

### Step 1. Setup a Vue project with Vite.

To initialize a Vue project based on Vite, please follow the instructions provided in the [official Vue documentation.](https://vuejs.org/guide/quick-start.html)

### Step 2. Add UI5 Web Components
```bash
npm install @ui5/webcomponents
```

### Step 3. Instruct the compiler to treat UI5 Web Components as custom elements.

To avoid issues, it is recommended to exclude our custom elements from component resolution by specifying `compilerOptions.isCustomElement` in our `vite.config` file.

```ts
// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a ui5- as custom elements
          isCustomElement: tag => tag.includes('ui5-')
        }
      }
    })
  ]
})
```

### Step 4. Import the components that you are going to use.

```js
import "@ui5/webcomponents/dist/Button.js";
```

### Step 5. Use the imported elements in your application.

```html
<ui5-button>Hello world!</ui5-button>
```

### Step 6. Launch the application
```bash
npm run dev
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
