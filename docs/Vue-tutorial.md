# Get started with UI5 Web Components & VueJS

In this tutorial, we are going to show how to get add UI5 Web Components in your application. UI5 Web Components can be added to both new VueJS application as well as already existing one.

## 1. Install Vue CLI:
```
npm install -g @vue/cli
```

## 2. Init new appp:
```
vue create ui5-web-components-application
cd ui5-web-components-application
```

## 3. Add UI5 Web Components:
```
npm install @ui5/webcomponents --save
```

## 4. Add UI5 Web Components to Vue ignoredElement by adding the following line to your ```main.js``` file

```js
Vue.config.ignoredElements = [/^ui5-/];
```

## 5. Import the components that you are going to use:
```js
import "@ui5/webcomponents/dist/Button";
```

## 6. Use the imported elements in your application:
```html
<ui5-button>Hello world!</ui5-button>
```