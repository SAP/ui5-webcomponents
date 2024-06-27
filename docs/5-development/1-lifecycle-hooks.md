# Lifecycle Methods

UI5 Web Components are built on top of the native API, so they include all the lifecycle hooks found in native web components, such as `connectedCallback`, `disconnectedCallback`, etc. To ensure that the state of the component is synchronized with the element, the UI5 web components offer their own lifecycle methods: `onEnterDOM`, `onBeforeRendering`, `onAfterRendering`, and `onExitDOM`.

## onEnterDOM Method
This method is called every time the component is connected to the DOM. It is important to note that this method can be called multiple times whenever the element is attached or moved in the DOM. For logic that needs to run each time the element is attached or moved, it is best practice to use this lifecycle method.

**Note:** This method is often used to attach event listeners to observe the component size. Keep in mind that it is best practice to detach all event listeners when the component is disconnected from the DOM.

## onBeforeRendering
This method is called right before the component is rendered or re-rendered. It is triggered whenever the component state changes (e.g., when a property or slot is changed).

**Note:** When the component is rendered for the first time, its template is not yet attached to the shadow DOM, so accessing elements within the template might not be possible.

## onAfterRendering
This method is called right after the component is rendered. It is triggered whenever the component state changes (e.g., when a property or slot is changed).

## onExitDOM Method
This method is called every time the component is disconnected from the DOM. It is important to clean up any resources or detach any event listeners when this method is called to avoid memory leaks and ensure proper cleanup.

By understanding and utilizing these lifecycle methods, you can effectively manage the state and behavior of your UI5 Web Components throughout their lifecycle.