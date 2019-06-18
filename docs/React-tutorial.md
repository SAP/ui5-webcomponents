# Get started with UI5 Web Components & React

In this tutorial, we are going to show how to get add UI5 Web Components in your application. UI5 Web Components can be added to both new React application as well as already existing one.

## 1. Start new application. For example with create-react-app:
```
npx create-react-app ui5-web-components-application
cd ui5-web-components-application
```

## 2. Add UI5 Web Components:
```
npm install @ui5/webcomponents --save
```

## 3. Import the components that you are going to use:
```js
import "@ui5/webcomponents/dist/Button";
```

## 4. Use the imported elements in your application:
```html
<ui5-button>Hello world!</ui5-button>
```

## 5. Launch the app:
```
npm start
```


## Additional:

### Event Binding:

In order to use the events, provided by UI5 Web Components, currently you need to get a ref to the component, because React doesn't support custom events. Here is an example of what you need to do in order to use the events provided by UI5 Web Components:

```js
class Home extends Component {

    constructor (props) {
        super(props);
        this.switch = React.createRef();
    }

    componentDidMount() {
        this.switch.addEventListener('change', event => {
            console.log('switch is toggled');
        })
    }

    render(){
        return(
            <ui5-switch ref={this.switch}></ui5-buttswitchon>
        );
    }
}
```

### Bolean Properties Binding:

For boolean properties like ```collapsed```  in ```ui5-panel```, instead of setting true or false, you have to take care of the presence of the property. Here is an example:

```html
<ui5-panel header-text="Achievements" collapsed={!this.state.achievements.length || undefined}>
    <!-- Content of ui5-panel -->
</ui5-panel>
```