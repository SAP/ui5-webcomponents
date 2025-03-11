# UI5 Web Components Development Conventions

## TypeScript Development Conventions

UI5 Web Components is implemented in TypeScript and uses modern language features to define web components in a clear, declarative way. Key conventions include:

- **Decorators for Metadata:** Component classes are decorated to declare custom element metadata. A `@customElement` class decorator is used to register the element with a tag name and optional configuration (like template, styles, dependencies) ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=,base%20class)) ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=base%2Fdist%2Fdecorators%2FcustomElement.js)). For example: 

  ```typescript
  import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
  import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

  @customElement("my-demo-component")
  class MyDemoComponent extends UI5Element {
      // ...
  }
  ``` 

  This defines a `<my-demo-component>` custom element by extending the base `UI5Element` class ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=import%20UI5Element%20from%20%22%40ui5%2Fwebcomponents,base%2Fdist%2Fdecorators%2FcustomElement.js)). The decorator can also accept an object with config options (e.g. `renderer`, `styles`, `template`, `dependencies`) to tailor the component's behavior ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=%40customElement%28%7B%20tag%3A%20%22my,formAssociated%3A)).

- **Property Decorators:** Public component properties are defined with the `@property` decorator. This decorator is applied to class fields to declare their type, default value, and how they reflect to HTML attributes ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=)) ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=import%20property%20from%20%22%40ui5%2Fwebcomponents)). If no options are given, the property defaults to type `String` and will reflect to an attribute of the same name in kebab-case ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=By%20default%2C%20for%20each%20property%2C,not%20have%20an%20attribute%20equivalent)) ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=Note%3A%20If%20no%20argument%20is,type)). For example: 

  ```typescript
  import property from "@ui5/webcomponents-base/dist/decorators/property.js";

  @property({ type: Boolean })
  myProp = false;
  ``` 

  This defines a boolean property `myProp` (reflected as `my-prop` attribute) with default value `false` ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=import%20property%20from%20%22%40ui5%2Fwebcomponents)). Properties of type `Object` or `Array`, or those marked with `noAttribute`, do not reflect to attributes ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=By%20default%2C%20for%20each%20property%2C,not%20have%20an%20attribute%20equivalent)). 

- **Slot Decorators:** Named slots (for slotted child content) are declared with the `@slot` decorator on class fields of array type ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=import%20UI5Element%20from%20%22%40ui5%2Fwebcomponents,base%2Fdist%2Fdecorators%2Fslot.js)) ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=%40customElement%28%22my,HTMLElement%3E%3B)). The slot decorator can enforce what elements are allowed (via a `type` option like `HTMLElement` or `Node`) and mark a slot as the default slot ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=Type)) ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=Note%3A%20The%20default%20slot%20is,in%20the%20component%27s%20template)). For example: 

  ```typescript
  import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

  @slot({ type: HTMLElement, default: true })
  content!: Array<HTMLElement>;
  ``` 

  This defines a default slot named `content` that accepts any HTML element children ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=import%20UI5Element%20from%20%22%40ui5%2Fwebcomponents,base%2Fdist%2Fdecorators%2Fslot.js)). The framework will manage this slot's children: ensuring child web components are upgraded before rendering and auto-invalidation when children change ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=,is%20set)).

- **Event Decorators:** Custom DOM events fired by components are described with an `@event` decorator on the class. UI5 Web Components provides a strict version (`event-strict`) to define events with a name (and optional options like `bubbles` or `cancelable`) ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=The%20)) ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=%40event%28,false%20by%20default)). For example:

  ```typescript
  import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

  @customElement("my-demo-component")
  @event("change", { bubbles: true, cancelable: true })
  class MyDemoComponent extends UI5Element {
      // ...
      someMethod() {
          this.fireDecoratorEvent("change");
      }
  }
  ``` 

  The `@event("change")` decorator declares that the component fires a `"change"` event. The base class provides `this.fireDecoratorEvent("change")` to fire the event using the metadata (ensuring it bubbles or is cancelable as specified) ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=%40event%28,false%20by%20default)). By convention, events are also automatically fired with a `ui5-` prefix variant (e.g. `ui5-change`) unless a noConflict mode is enabled ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=By%20default%2C%20UI5%20Web%20Components,change%60%20event)), to avoid naming collisions.

- **Enumerations:** Many component properties that have a fixed set of values (design, size, state, etc.) are defined as TypeScript enums. UI5 Web Components provides various enums (e.g. `ButtonDesign`, `ListMode`, etc.) which are exported from the library ([Enums | UI5 Web Components](https://sap.github.io/ui5-webcomponents/components/main/enums/#:~:text=Enums)) ([ButtonDesign | UI5 Web Components](https://sap.github.io/ui5-webcomponents/components/enums/ButtonDesign/#:~:text=Name%20Description%20Default%20default%20type,emphasized%20type%20Attention%20attention%20type)). For instance, the `ButtonDesign` enum includes values like `Default`, `Emphasized`, `Positive`, etc., corresponding to different visual styles of the button ([ButtonDesign | UI5 Web Components](https://sap.github.io/ui5-webcomponents/components/enums/ButtonDesign/#:~:text=Name%20Description%20Default%20default%20type,emphasized%20type%20Attention%20attention%20type)). Developers use these enums for type-safe assignment to properties (for example, `<ui5-button design="Emphasized">` would correspond to `ButtonDesign.Emphasized` in TypeScript).  

- **Naming Conventions:** Public properties and events are named in camelCase in the TypeScript class, but their corresponding HTML attributes/events use kebab-case. For example, a `valueState` property would be reflected as an attribute `value-state`. Internally, private fields are often prefixed with an underscore (e.g. `_internalCounter`) to indicate non-API state. File names for components typically use PascalCase matching the component class (e.g. `Button.ts` contains the `Button` class) and enums or other helpers may reside in an `enums/` subfolder or similarly named file (e.g. `ButtonDesign.ts`). 

## Testing Practices

UI5 Web Components emphasizes integration testing of components in realistic scenarios. The project historically used WebdriverIO (WDIO) for end-to-end tests, and is transitioning to Cypress for a more modern testing experience:

- **WebdriverIO Integration Tests:** The official test setup has been based on WDIO, which drives a headless Chrome via ChromeDriver ([Testing | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/testing/#:~:text=The%20test%20framework%20of%20choice,excellent%20support%20for%20Web%20Components)). Tests are written in a BDD style (using frameworks like Mocha) and live under a `test/specs/` directory in each package. The WDIO configuration (in a `wdio.conf.js` under a `config/` folder) provides a base setup that can be extended ([Testing | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/testing/#:~:text=)). These tests instantiate components in a browser context and verify their behavior (DOM output, user interactions, etc.) via selectors and assertions.  

- **Migration to Cypress:** As of version 2.x, the team is moving away from WDIO to use Cypress for testing. The monorepo's tooling package has an ongoing effort to **“remove `wdio` test tools, support `cypress` only”** ([API Changes Suggestions · Issue #9943 · SAP/ui5-webcomponents · GitHub](https://github.com/SAP/ui5-webcomponents/issues/9943#:~:text=%40ui5%2Fwebcomponents)). Cypress offers a more developer-friendly UI and debugging experience. In fact, UI5 Web Components now **recommends using Cypress** for testing components ([ui5-webcomponents-react/CHANGELOG.md at main · SAP/ui5-webcomponents-react · GitHub](https://github.com/SAP/ui5-webcomponents-react/blob/main/CHANGELOG.md#:~:text=match%20at%20L863%20the%20,component%20instead)). Existing WDIO tests are being ported to Cypress tests.

- **Test Structure:** Tests are organized by component or feature. For example, there may be separate spec files for each UI component (Button.spec.js, List.spec.js, etc.), each launching a simple HTML page with that component and running a series of interactions/assertions. The project uses a dev server (via `npm start` in a package) to serve test pages, and a test runner (`npm test`) that builds the components and executes the suite ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=watch%20Watch%20for%20changes%20only,directory)) ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=The%20)). Before running tests for the first time, a build is required to generate the component runtime (since templates and assets need to be built) ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=Note%3A%20In%20order%20to%20run,build)).

- **Cypress Custom Commands:** Testing web components can be tricky due to Shadow DOM. To simplify this, UI5 Web Components provides a set of custom Cypress commands in the `@ui5/webcomponents-cypress-commands` package ([@ui5/webcomponents-cypress-commands - npm](https://www.npmjs.com/package/%40ui5%2Fwebcomponents-cypress-commands#:~:text=Since%20testing%20web%20components%20is,easier%20to%20interact%20with%20them)). By importing this package in your Cypress setup, you gain commands and queries tailored for UI5 Web Components ([@ui5/webcomponents-cypress-commands - npm](https://www.npmjs.com/package/%40ui5%2Fwebcomponents-cypress-commands#:~:text=Installation)). For example, these custom commands let you easily select shadow DOM elements or interact with UI5 components without worrying about their internal shadow structure. After installing, one simply adds `import '@ui5/webcomponents-cypress-commands';` to the test setup, and then can use the provided commands in tests ([@ui5/webcomponents-cypress-commands - npm](https://www.npmjs.com/package/%40ui5%2Fwebcomponents-cypress-commands#:~:text=npm%20install%20%40ui5%2Fwebcomponents)). (For instance, a command might allow selecting a UI5 component by its tag and text, or retrieving a shadow part for assertion). These conventions ensure test code is concise and robust against internal implementation changes.

- **Best Practices:** The team encourages writing tests for any new feature or bugfix (as noted in the contribution guidelines) ([Conventions and Guidelines | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/contributing/conventions-and-guidelines/#:~:text=Testing)). Tests should cover keyboard interactions, mouse/touch interactions, and visual state changes of components. There is also an emphasis on accessibility testing (for example using Axe or similar tools) to ensure ARIA attributes and roles are correctly applied. With Cypress, developers can take advantage of its time-travel debugging and snapshot features to ensure UI5 components render and behave as expected in various states.

## Component Structure and Lifecycle

UI5 Web Components follow a consistent component model and lifecycle, built on the native Custom Elements API with some enhancements:

- **Component Class Structure:** Every UI5 Web Component is a class (usually in its own file) that extends the base `UI5Element` class ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=,base%20class)). This base provides foundational functionality such as property change tracking, rendering, and lifecycle hooks. Components are registered as custom elements via the `@customElement` decorator (which ultimately calls `customElements.define` under the hood). Components typically also import a template and styles which are linked via the decorator configuration or through static getters. For example, a `Button` component class will import `ButtonTemplate.js` and `Button.css` and pass them to the customElement decorator so the framework knows how to render it.

- **Files and Templates:** In UI5 Web Components v1, templates were written in Handlebars (`.hbs` files), whereas in v2 they have moved to JSX/TSX templates for better type checking and maintainability ([API Changes Suggestions · Issue #9943 · SAP/ui5-webcomponents · GitHub](https://github.com/SAP/ui5-webcomponents/issues/9943#:~:text=%40ui5%2Fwebcomponents)). Each component has a template function (often in a separate `<Component>Template.ts` file) that returns JSX describing the component's shadow DOM structure ([JSX Templates | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/templates/#:~:text=Writing%20a%20component%20template)). This template is executed with the component instance bound as `this`, allowing the template to access properties, slots, etc., with full TypeScript type safety ([JSX Templates | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/templates/#:~:text=export%20default%20function%20,div%3E%3B)). The rendered output is inserted into the component's shadow root, along with scoped styles.

- **Lifecycle Hooks:** UI5 Web Components extend the standard Custom Elements callbacks with additional, conveniently named hooks:
  - **`onBeforeRendering`:** Called before every render (update) of the component. This is where a component should compute or prepare any data needed for the template. It's used to derive state or set default values based on current properties before the UI is (re)rendered ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=In%20summary%3A%20,template)). For example, a component might calculate an internal property for iteration in the template here. This hook is preferred for state updates rather than doing work in the template itself.
  - **`onAfterRendering`:** Called after the component has re-rendered and its DOM is updated. This hook allows direct DOM manipulation or post-update logic, such as setting focus or measuring DOM elements ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=)) ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=onAfterRendering%28%29%20%7B%20this.shadowRoot.querySelector%28%22,component%22%29.offsetWidth%3B)). However, it should be used sparingly. The project explicitly treats manual DOM updates as an anti-pattern – it's recommended to let the framework handle DOM changes via state and template, and only use `onAfterRendering` for tasks that cannot be done declaratively (e.g. focusing an element, or integrating with a third-party library) ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=You%20should%20avoid%20using%20this,to%20manually%20change%20the%20DOM)). In short, **do not** modify the DOM in ways that contradict the template output.
  - **`onEnterDOM` and `onExitDOM`:** These correspond to the element being attached or detached from the document DOM (they tie into the browser's `connectedCallback`/`disconnectedCallback`) ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=match%20at%20L1107%20Unlike%20,a%20whole%20in%20this%20article)) ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=,method%27s%20execution)). They are used for setup or cleanup tasks that should only happen while the component is in the page. For example, a component might register a global event listener or a `ResizeObserver` in `onEnterDOM` and remove it in `onExitDOM` ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=Common%20use%20cases%20are%3A)). These hooks are independent of rendering; a component can exist (and even render itself off-DOM) without `onEnterDOM` having run, so such code should purely deal with interactions with the outside environment.
  
  Additionally, because UI5 Web Components manage their own shadow DOM, they ensure that all child elements (for slots) are upgraded and ready before the first render ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=,is%20set)). The framework may delay initial rendering until dependencies and children are resolved, to avoid multiple re-renders and ensure a complete UI is painted at once.

- **Invalidate and Update Cycle:** When a property changes (through its setter), or a slotted child mutates, the component is invalidated. The UI5Element base class schedules an update (similar to a React or Lit element render cycle). Multiple property changes are batched if they occur together, ensuring efficient re-renders. The template is re-run with the latest state, producing a new virtual DOM which is diffed against the current DOM. UI5 Web Components uses a lightweight **JSX runtime diffing** algorithm ([JSX Templates | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/templates/#:~:text=Basic%20example%3A)), so only the minimal necessary DOM updates are applied (rather than replacing the entire innerHTML on every change). This efficient rendering technique improves performance for frequent updates.

- **Public Methods and Properties:** UI5 Web Components typically expose a small public API aside from attributes/properties, such as methods to toggle a component (e.g. open/close a Dialog programmatically). These are implemented as class methods. The convention is to avoid complex logic in setters or getters beyond calling `this.invalidate()`; most logic lives in the template or in the lifecycle hooks. When a component fires an event, it will often have a corresponding method call internally (for example, a ComboBox might call `this.fireEvent("change", { detail })` when an item is selected).

- **Clean-Up:** Components are designed to clean up on removal. The `onExitDOM` hook (disconnected) should remove any listeners or timers. Moreover, components can rely on the garbage collector for internals, but any global resources need explicit teardown. UI5 Web Components do not require a manual destroy call (unlike old SAP UI5 controls) – removing the element from the DOM is sufficient in normal cases.

## Project Structure and Organization

UI5 Web Components is a monorepo containing multiple scoped packages, each responsible for a different aspect of the project. The layout is designed for clarity, reuse, and tree-shaking:

- **Monorepo Packages:** The repository is organized under a top-level `packages/` folder with sub-packages for different modules ([ui5-webcomponents/lerna.json at main · SAP/ui5-webcomponents · GitHub](https://github.com/SAP/ui5-webcomponents/blob/main/lerna.json#:~:text=)). Major packages include:
  - `@ui5/webcomponents-base`: The core framework code (base classes like UI5Element, utilities, decorators, etc.).
  - `@ui5/webcomponents-theming`: The theming base assets (SAP theming variables and CSS resets).
  - `@ui5/webcomponents`: The “main” UI components library (core UI elements like Button, Input, etc.).
  - `@ui5/webcomponents-fiori`: Additional Fiori-specific components (more complex or enterprise-specific components such as Wizard, UploadCollection, Dialog, etc.).
  - `@ui5/webcomponents-icons`, `@ui5/webcomponents-icons-tnt`, `@ui5/webcomponents-icons-business-suite`: Sets of icon assets (SAP icon collections) packaged separately so apps only load the icons they need.
  - `@ui5/webcomponents-localization`: Localization utilities and CLDR data (for dates, numbers, etc.).
  - `@ui5/webcomponents-tools`: Development and build tools (configurations for bundling, testing, tooling scripts like the project initializer).
  - `@ui5/webcomponents-website`: The documentation website source.
  - `@ui5/webcomponents-compat`: Backwards-compatibility layer (for deprecated APIs or V1->V2 migration helpers).
  - (There are also experimental packages like `@ui5/webcomponents-ai` for AI integrations, listed for future/experimental features.)

  This structure means each package can be published independently to NPM and consumers can pick only what they need.

- **Component File Structure:** Within a component package (e.g. the `main` package), the source files for each component follow a clear pattern. Each UI component has:
  - A main class file (TypeScript) defining the component (e.g. `Button.ts` for the `<ui5-button>` component).
  - A template file, now written in TSX/JSX (previously Handlebars `.hbs`). For example `ButtonTemplate.ts` (or `.tsx`) contains the render function for the component's shadow DOM structure.
  - A CSS file for the component's styles, written with CSS custom properties (e.g. `Button.css`). This defines the component's appearance in a theme-independent way.
  - Theme-specific parameter files for any custom CSS variables. Under `src/themes/<themeName>/` there are `parameters-bundle.css` files providing values for the component's CSS variables for each supported theme ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=File%20Purpose%20,bundle.css%20%60Values%20for%20the%20component)). The build will combine these with the global theme variables. For example, `src/themes/sap_horizon/parameters-bundle.css` might set `--ui5-button-background: #fafafa` (just as an illustration) for the Horizon theme, while `sap_horizon_dark/parameters-bundle.css` provides a different value for dark mode.
  - An internationalization file (if the component has text that needs translation). By convention there's a base `messagebundle.properties` (key-value pairs for default texts) and locale-specific files like `messagebundle_de.properties`, `messagebundle_en.properties`, etc. for translations ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=)). These are plain text property files. At build time, they are converted to JSON or JS modules.
  - An `Assets.js` entry file that gathers all asset imports (themes and i18n) for that package ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=,texts%2C%20etc)). Importing `Assets.js` ensures that all the necessary theme CSS and text bundles are registered.

  As a concrete example, a **sample project structure** for a custom component might look like:

  ```plaintext
  packages/my-package/src/
  ├── MyComponent.ts               # Component class (extends UI5Element)
  ├── MyComponentTemplate.tsx      # Component JSX template
  ├── themes/
  │   ├── MyComponent.css          # Component styles (theme-independent)
  │   ├── sap_horizon/parameters-bundle.css       # CSS vars for Horizon theme
  │   ├── sap_horizon_dark/parameters-bundle.css  # CSS vars for Horizon Dark theme
  │   ├── sap_fiori_3/parameters-bundle.css       # CSS vars for Quartz Light (Fiori 3) theme
  │   └── ... (other themes as needed)
  ├── i18n/
  │   ├── messagebundle.properties         # Default texts
  │   ├── messagebundle_de.properties      # German texts
  │   └── messagebundle_en.properties      # English texts (if differing from default)
  └── Assets.js                    # Imports base assets (theme base, etc.) for this package
  ```

  This convention is enforced by the project generator and build tools. It ensures each component is self-contained and can be built independently.

- **Build and Config:** The repository uses a shared build system (via `@ui5/webcomponents-tools`). Each package's `package.json` has scripts to build, test, start a dev server, etc. The `config/` directory in a package contains overrides for tooling configs, but by default they just require the central config from `@ui5/webcomponents-tools`, keeping things consistent ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=The%20)). For example, `rollup.config.js`, `.eslintrc.js`, and `wdio.conf.js` in a package's `config/` simply import a base config, which can be customized if needed ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=)).

- **Naming Patterns:** Component tag names are all prefixed with `ui5-` (for official UI5 Web Components) or another namespace if custom. The tag is specified in the @customElement decorator. The “pure” tag (without any framework-specific prefix) is stored as an attribute on the element as well ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=The%20,scoping%20is%20not%20used)) – for instance, a `<ui5-button>` element will automatically have an attribute `ui5-button` present on it in the DOM ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=For%20example%2C%20when%20you%20create,button)). This is a convention used to avoid conflicts and allow CSS scoping if necessary. Class names for CSS (inside shadow DOM) often start with `ui5-` as well, or at least have a predictable structure (e.g. the root element of Button might have a class `ui5-button-root`). However, since styles are encapsulated, these classes are mainly for the framework's own use.

- **Dependencies Between Components:** If a component internally uses other UI5 components, it declares them in its metadata (using the `dependencies` array in the customElement decorator) ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=%40customElement%28%7B%20tag%3A%20%22my,fastNavigation%3A)). This ensures that those dependent components are also defined. For example, the DatePicker might list the Calendar component as a dependency so that when DatePicker is imported, Calendar is automatically loaded and registered as well. This convention allows tree-shaking (only loading what's needed) while still making sure necessary sub-components are available.

## Theming and Styling

Theming in UI5 Web Components is achieved entirely through CSS custom properties (CSS variables) and is designed to allow effortless switching of themes and high contrast support:

- **CSS Variables Core:** Every visual property (colors, font sizes, spacing, etc.) is driven by CSS variables. UI5 Web Components rely on SAP's standard theming parameters exposed as CSS custom properties ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=CSS%20Variables)). For example, `--sapTextColor` defines the standard text color, `--sapButton_Background` might define a button's background, etc. The framework ships with the SAP theming base (`@sap-theming/theming-base-content`) which provides the CSS variables for all fundamental themes ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=To%20implement%20these%20themes%2C%20the,content%20package)). The built-in themes include **Quartz** (Light/Dark/HC) and **Horizon** (Morning/Evening/High Contrast) among others ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=UI5%20Web%20Components%20comes%20with,in%20themes)) – these correspond to SAP's Fiori design themes.

- **Component CSS:** Each component has a single CSS file that contains its styles, written using CSS vars for any values that need theming. For example, a simple component might do:

  ```css
  /* MyComponent.css */
  :host {
      font-size: var(--sapFontSize);
      font-family: var(--sapFontFamily);
      /* ...other base styles... */
  }
  ```
  
  This ensures it uses the theme's base font size and family ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=%2F%2A%20ui5,sapFontFamily)). Components can define their own custom variables for styling aspects specific to them. For instance, `--ui5-button-border-radius` could be a variable used in Button's CSS to set the border radius. These component-specific variables will be given values in each theme's parameters file.

- **Theme Parameters Files:** For each theme, the UI5 Web Components maintain a `parameters-bundle.css` that provides values for the custom properties of all components in that theme ([Create UI5 Web Components Project (Package) | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/package/#:~:text=File%20Purpose%20,bundle.css%20%60Values%20for%20the%20component)). For example, in the Horizon theme's parameters CSS, you might see:

  ```css
  /* packages/main/src/themes/sap_horizon/parameters-bundle.css */
  :root {
      --ui5-button-border-radius: 0.25rem;
      --ui5-button-background: var(--sapButton_Background); /* uses global theme var */
      /* ... other component vars ... */
  }
  ```
  
  Each theme folder (sap_fiori_3, sap_horizon, etc.) has such a file. At runtime, when a theme is applied, the corresponding CSS is loaded so all these variables take effect. Switching themes is as simple as loading a different CSS file (the framework handles this when you call the theme switch API or set the theme property).

- **Theming Customization:** Because all theming is based on CSS custom properties, customizing the look is straightforward. An application can override any of the CSS variables (global or component-specific) to tweak the theme. For example, to adjust the brand color, one could override `--sapBrandColor` in a global stylesheet. Such overrides cascade into the shadow DOM of components.

- **Content Density (Cozy/Compact):** UI5 Web Components support two density modes: **Cozy** (default, for touch) and **Compact** (condensed, for desktop). This is controlled via a CSS class or attribute on a parent element. Specifically, adding `class="ui5-content-density-compact"` on the `<body>` (or any ancestor element) will trigger compact mode ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=The%20%60data,can%20use%20the%20CSS%20class)). The framework also respects a `data-ui5-compact-size` attribute for the same purpose ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=the%20%60data,compact%60%20class)). Components define CSS that reacts to these selectors to adjust spacing. For example:

  ```css
  [data-ui5-compact-size],
  .ui5-content-density-compact {
      --my-component-padding: 0.5rem;
      /* ... */
  }
  ```
  
  In the above, if compact mode is on, the `--my-component-padding` variable is set to a smaller value ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=match%20at%20L327%20.ui5,padding%3A%200.5%20rem%3B)), which the component's CSS will use (instead of a larger default). This contract means the app developer controls density by adding the class, and all UI5 components automatically adjust their CSS accordingly ([Styles | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/styling/#:~:text=The%20%60data,can%20use%20the%20CSS%20class)).

- **Scoped Styles and BEM:** Since each component's CSS is encapsulated in its shadow root, there's less need for stringent naming like BEM to avoid collisions. Nonetheless, the project often uses descriptive class names prefixed with `ui5-` within the component for clarity (e.g., classes in the template for parts of the component). These are purely internal. UI5 Web Components does not encourage users to reach into shadow DOM to style parts; instead, customization should be done via CSS variables and public CSS parts (if provided). Some components might expose CSS Shadow Parts for styling, but generally the theming covers most needs.

- **High Contrast Support:** The provided themes include high-contrast variants (e.g. Horizon HCB and HCW for black/white high contrast). By relying on the theming-base-content, UI5 Web Components automatically get high contrast colors. The CSS is designed to meet accessibility contrast requirements (WCAG) in those themes. There's no additional effort needed from the component developer other than using the variables.

- **Custom Themes:** Advanced users can theoretically supply their own theme by mimicking the structure (i.e., providing a CSS custom properties file). The UI5 Web Components theming system will apply any theme as long as the variables expected by components are defined. The project structure and conventions make it possible to implement theme switching by loading different CSS, rather than swapping out entire component implementations.

## Accessibility Guidelines

Accessibility is a first-class concern in UI5 Web Components. The library adheres to WAI-ARIA and WCAG standards to ensure that components are usable by people with disabilities. Some key accessibility conventions include:

- **Built-in ARIA Roles and Attributes:** All UI5 Web Components automatically render appropriate ARIA roles and attributes in their shadow DOM. Developers using these components do not need to manually add roles for standard components. For example, a `<ui5-combobox>` will render an internal `<input role="combobox">` with the correct ARIA attributes for expanded/collapsed state, list associations, etc. ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=%3Cui5)). If a property like `disabled` or `readonly` is set on the component, the inner elements receive the corresponding aria-* or native attributes automatically ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=By%20doing%20so%2C%20you%20receive,and%20more)). This convention means using a UI5 component is as accessible as using the proper native element, without extra work.

- **Accessibility Properties:** Many components expose API properties to further aid accessibility. For instance, most components have an `accessibleName` property (and often an `accessibleNameRef`). These allow the developer to provide an invisible accessible label or reference an existing label. For example, `ui5-input` has `accessible-name` and `accessible-name-ref` attributes which map to aria-label and aria-labelledby under the hood. A developer can do:

  ```html
  <ui5-label id="lbl1" for="inp1">First Name</ui5-label>
  <ui5-input id="inp1" accessible-name-ref="lbl1"></ui5-input>
  ``` 

  In this case, the input will announce “First Name” to assistive technologies, because the `accessible-name-ref` links it to the label. This approach works around the fact that native label-element pairing doesn't cross the Shadow DOM boundary – UI5 Web Components provides its own mechanism to achieve the same effect ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=more%2C%20and%20aims%20at%20a,the%20input%20to%20a%20label)) ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=in%20order%20to%20create%20a,the%20input%20to%20a%20label)).

- **Keyboard Navigation:** UI5 Web Components follow the recommended keyboard interaction patterns for each component type. For example, List components support arrow key navigation, Home/End, page up/down for paging, etc., consistent with ARIA best practices for listboxes. Likewise, components like `ui5-dialog` trap focus and allow closing with Esc, menus use arrow keys and type-ahead, and so on. The framework often includes **“fast navigation”** support: if `fastNavigation` is enabled for a composite component, it sets `data-sap-ui-fastnavgroup` to allow F6 key (a convention from SAP/Fiori) to jump out of component groups easily ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=fastNavigation)) ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=%40customElement%28,%2F%2F%20class%20implementation)). By default, focus handling is managed such that tab order flows through web components as if they were normal HTML elements (with tabindex, etc., set appropriately internally).

- **Focus Visualization:** All focusable UI5 components have a consistent focus outline style (often a glowing blue outline in SAP Horizon, for example). This is built into the component styles, ensuring that as you tab through the UI, it's always clear which element is focused. There are also mechanisms to prevent focus from going into irrelevant elements (for instance, hidden or disabled content is not focusable).

- **Screen Reader Support:** The combination of proper roles and updates ensures screen readers announce UI5 components properly. Live regions are used where appropriate (for example, an invisible polite live region might be used to announce messages or changes for certain components). The library documentation notes that screen reader and keyboard should work out-of-the-box for all components ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=Screen%20Reader%20Support)) ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=%3Cui5)). Complex components like dialogs, tables, or comboboxes implement all required ARIA patterns (such as `aria-modal` for dialogs, `aria-multiselectable` for multi-select lists, `aria-expanded` on toggles, etc.). The project also tracks accessibility issues and addresses them (for example, ensuring every interactive part has an accessible name, no duplicate IDs, proper `aria-setsize` and `aria-posinset` for list items, etc., as seen in issue resolutions).

- **Testing and Verification:** The team uses tools to test accessibility compliance (e.g., axe-core). They have guidelines that any new component or feature should meet accessibility standards (color contrast, focus order, screen reader text). Many accessibility features (like high contrast theme support and text scaling) are built into the design tokens and components from the start ([Accessibility in UI5 Web Components | UI5 Web Components](https://sap.github.io/ui5-webcomponents/v1/docs/advanced/accessibility/#:~:text=Many%20accessibility%20features%20are%20built,text%20resizing%20are%20also%20available)). The philosophy is that **accessible defaults** are provided, and additional accessibility API is exposed for app-specific needs.

- **No Conflict Mode for Events:** While not strictly an accessibility feature, it's worth noting in context of avoiding confusion: UI5 Web Components by default fire events with their original name and a duplicate with a `ui5-` prefix to avoid clashing with native events ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=By%20default%2C%20UI5%20Web%20Components,change%60%20event)). In accessibility context, this ensures that a native `<input>` event and a UI5 `<ui5-input>` event can coexist. If needed, the library can be configured to only use the prefixed versions to avoid any conflict with user-defined events named the same as a UI5 event ([Events | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/events/#:~:text=The%20%60noConflict%60%20setting%20%28%60%40ui5%2Fwebcomponents,this%20behavior)).

Overall, the accessibility conventions ensure that UI5 Web Components are usable in enterprise applications that require strict conformance to a11y standards. Developers get most of this out-of-the-box simply by using the components and are encouraged to utilize the provided properties (like `accessibleName`) rather than hacking the DOM, to keep applications accessible.

## Performance Optimizations

UI5 Web Components are designed to be efficient in both load time and runtime performance. Several practices and features contribute to this:

- **Lightweight Framework:** The core runtime (base classes and infrastructure) is very small – roughly 20 KB gzipped ([GitHub - SAP/ui5-webcomponents: UI5 Web Components - the enterprise-flavored sugar on top of native APIs! Build SAP Fiori user interfaces with the technology of your choice.](https://github.com/SAP/ui5-webcomponents#:~:text=,React%2C%20Angular)). This is the overhead for using UI5 Web Components. Beyond that, you pay only for what you use: each component's code and associated assets.

- **Modular Architecture for Tree Shaking:** Because each component is a module, applications can import specific components and have unused components excluded from bundles. The library is split across multiple npm packages (and within packages, each component often has its own entry point), which means modern bundlers (Webpack, Rollup, etc.) can perform tree-shaking to drop unused code. For example, if an app only uses `<ui5-button>` and `<ui5-input>`, it might import those like:

  ```js
  import "@ui5/webcomponents/dist/Button.js";
  import "@ui5/webcomponents/dist/Input.js";
  ```
  
  Only the Button and Input modules (plus shared base and any dependencies like Icon for the Input's icons) will be pulled in. There are no large monolithic blobs of JS in UI5 WC; everything is as granular as possible. The project's `package.json` configuration ensures that side effects are minimal, enabling bundlers to eliminate code for un-imported components.

- **Lazy Loading of Assets:** Some heavy assets are loaded on-demand. For instance, icons are a separate package – the icon SVGs are not part of the core bundle. When an icon component is used, developers include the specific icon module (e.g. `import "@ui5/webcomponents-icons/dist/add.js";`) which registers that icon. This way, you don't incur the cost of all SAP icons, only those you need. Similarly, theming and i18n files are split by theme and locale. If your app only ever uses one theme and two languages, it will only load those CSS and translation files, not others.

- **Efficient Rendering:** As described in the lifecycle section, UI5 Web Components employ a virtual DOM diffing approach for updates. The JSX template of a component is compiled to efficient JavaScript (using a custom JSX runtime) that creates lightweight VDOM nodes ([JSX Templates | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/templates/#:~:text=Basic%20example%3A)). On property changes, the diff algorithm updates only the changed parts of the DOM. This avoids expensive full re-render or innerHTML replacements, making updates faster especially for large components or lists of many items. Also, by batching property changes and using microtask timing to coalesce updates, the framework reduces layout thrashing and repaints.

- **DOM Recycling:** The framework tries to reuse DOM elements when possible. For example, if a list is re-rendered with mostly the same items, it will reuse existing `<li>` elements and just update their contents, rather than tear down and rebuild everything. This is part of the diff logic and greatly improves performance for dynamic lists or frequent updates.

- **Avoiding Layout Jank:** UI5 Web Components best practices discourage direct DOM reads/writes that could cause reflows during updates. For instance, if you need a measurement (offsetWidth, etc.), it's often done in `onAfterRendering` after the DOM is updated and only when necessary ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=onAfterRendering%28%29%20%7B%20this.shadowRoot.querySelector%28%22,component%22%29.offsetWidth%3B)). The core team has optimized components to minimize such measurements and to use CSS for layout whenever possible (leveraging Flexbox, grid, etc., which are GPU-optimized, instead of manual JS positioning).

- **Fast Initialization:** When a component is first created, the framework waits to render until all of its declared **dependencies are loaded and all slotted children are defined** ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=,is%20set)). While this might seem counterintuitive for performance, it actually prevents multiple unnecessary renders. The component will do one final render when everything is ready, rather than re-render each time a dependency registers. This results in a quicker overall time-to-interactive with less flickering.

- **Code Splitting:** Because the repository is a collection of packages, consumers can even choose not to include certain packages at all. For example, if an application doesn't use any `@ui5/webcomponents-fiori` components, it never needs to load that bundle. Even within a package, one could lazy-load a component at runtime. UI5 Web Components can be dynamically loaded by importing their module on demand (since registration happens upon module execution). This is useful if some heavy component (like a rich text editor, hypothetically) is only needed after a user action – you can `import(...)` it asynchronously.

- **Memory Management:** Components clean up references when disconnected, helping to avoid memory leaks in long-running single-page apps. Also, because the library avoids global singletons as much as possible (aside from shared resources like the theming engine or localization), garbage collection can reclaim memory for components that are removed.

In summary, the development conventions of UI5 Web Components ensure that you only load and execute what you need (thanks to modular design), and that the runtime work is optimized under the hood (via virtual DOM diffing and careful lifecycle management). This results in a UI framework that delivers enterprise-grade features without heavyweight performance costs. These conventions – from lazy loading of assets to efficient re-rendering – enable UI5 Web Components apps to be both fast and scalable. 

**Sources:** The above conventions and best practices are drawn from the UI5 Web Components codebase and official documentation, including the project's Contributing Guide and Developer Handbook ([Conventions and Guidelines | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/contributing/conventions-and-guidelines/#:~:text=Testing)) ([Define Web Component | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/component/#:~:text=,base%20class)) ([Properties | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/properties/#:~:text=)) ([Slots | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/slots/#:~:text=,is%20set)) ([Deep dive and best practices | UI5 Web Components](https://sap.github.io/ui5-webcomponents/docs/development/deep-dive-and-best-practices/#:~:text=You%20should%20avoid%20using%20this,to%20manually%20change%20the%20DOM)) ([API Changes Suggestions · Issue #9943 · SAP/ui5-webcomponents · GitHub](https://github.com/SAP/ui5-webcomponents/issues/9943#:~:text=%40ui5%2Fwebcomponents)), which reflect the established patterns in the repository. All code examples are based on the actual implementation in the UI5 Web Components library.