# UI5 Web Components & Vue.js

In this tutorial you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new Vue.js applications and to already existing ones.

## Setting up a Vite and Vue.js project with UI5 Web Components

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


## Two-Way Data Binding

In order to use two-way data binding, use `v-model` as follows:

```html
<ui5-input v-model="inputValue"></ui5-input>
```

For the `CheckBox` and `RadioButton` web components, you need to include an additional `type` attribute. This informs the Vue compiler that these components use the `checked` property (unlike most input-type components that use the `value` property).

```html
<ui5-radio-button type="radio" v-model="rbValue"></ui5-radio-button>
<ui5-checkbox type="checkbox" v-model="cbValue"></ui5-checkbox>
```

