# Get Started with UI5 Web Components & VueJS

In this tutorial you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new VueJS applications, as well as already existing ones.

## Step 1. Install Vue CLI

```bash
npm install -g @vue/cli
```

## Step 2. Init New App

```bash
vue create ui5-web-components-application
cd ui5-web-components-application
```

## Step 3. Add UI5 Web Components

```bash
npm install @ui5/webcomponents --save
```

## Step 4. Add UI5 Web Components to Vue ignoredElement

Add the following line to your ```main.js``` file:

```js
Vue.config.ignoredElements = [/^ui5-/];
```

## Step 5. Import the Components That You Are Going to Use

```js
import "@ui5/webcomponents/dist/Button";
```

## Step 6. Use the Imported Elements in Your Application

```html
<ui5-button>Hello world!</ui5-button>
```

## Step 7: Launch the Application

```bash
yarn serve
```

## Additional

### Two-Way Data Binding

`v-model` binding doesn't work as expected for custom elements. In order to use two way data binding, you should bind and update the value yourself like this:

```html
<ui5-input
    :value="inputValue"
    @input="inputValue = $event.target.value">
</ui5-input>
```
