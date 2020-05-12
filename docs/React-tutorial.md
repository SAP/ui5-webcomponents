# Get started with UI5 Web Components & React

In this tutorial you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new React applications, as well as already existing ones.

## Step 1. Start New Application. For Example with create-react-app

```bash
npx create-react-app ui5-web-components-application
cd ui5-web-components-application
```

## Step 2. Add UI5 Web Components

```bash
npm install @ui5/webcomponents --save
```

## Step 3. Import the Components That You Are Going to Use

```js
import "@ui5/webcomponents/dist/Button";
```

## Step 4. Use the Imported Elements in Your Application

```html
<ui5-button>Hello world!</ui5-button>
```

## Step 5. Launch the Application

```bash
yarn start
```

## Additional

### Event Binding

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
            <ui5-switch ref={this.switch}></ui5-switch>
        );
    }
}
```

### Bolean Properties Binding

For boolean properties like ```collapsed```  in ```ui5-panel```, instead of setting true or false, you have to take care of the presence of the property. Here is an example:

```html
<ui5-panel header-text="Achievements" collapsed={!this.state.achievements.length || undefined}>
    <!-- Content of ui5-panel -->
</ui5-panel>
```
