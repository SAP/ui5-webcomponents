# VueJS

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