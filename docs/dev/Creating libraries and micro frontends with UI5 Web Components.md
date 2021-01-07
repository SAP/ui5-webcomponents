# Creating libraries and micro frontends with UI5 Web Components

## Who should read this

This guide is aimed primarily at *library* and *micro frontend* developers, although some of the points are also relevant for *applications*.

## Preface

There might be several runtimes of UI5 Web Components on a single HTML page (for example an app built with UI5 Web Components may use several independently loaded third-party libraries or micro-frentends, also built with UI5 Web Components, and they all might be of different versions).

In such a scenario, there are several **common assets on the HTML page** that are inherently shared between all these runtimes due to their nature:
 - The HTML tag names (an HTML tag can only be defined once, this is how [window.customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) works). The first runtime that tries to define a tag will succeed, all others will reuse.
 - The [configuration script](../Configuration.md) (`<script data-ui5-config type="application/json">`) is single for the whole HTML page and affects all UI5 Web Components instances
 - CSS Variables, both from [Theme Designer](https://github.com/SAP/theming-base-content) (`@ui5/webcomponents-theme-base` package) and package specific ones (such as `@ui5/webcomponents-fiori`) are defined at `:root` level and affect the whole page.
 
In addition, there are other **Javascript** assets that can be either private for each UI5 Web Components runtime, or shared purely for performance reasons (and not due to browser/setup limitations):
 - SVG Icons
 - CLDR assets (resource sharing not yet implemented)
 - i18n texts (resource sharing not yet implemented)

## Best practices for library/micro frontend authors

Following these practices will lead to more efficient and straightforward resource sharing, conflict avoidance and overall easier problem resolution.

### Create an **alias** for your library/micro frontend:
 
 ```js
 import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";
 setRuntimeAlias("Common business components");
 ```
 
 Just set the name of your library/micro frontend so that it appears in console messages and warnings which will let you identify what resources were modified/used by your library more easily.
 
 This is purely optional, but is a good first step in setting up your library.
 
 ### Set custom elements **scoping**
 
 ```js
 import { setCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
 setCustomElementsScopingSuffix("cbc");
  ```
 
 Following the previous example, if your library is called "Common business components", "cbc" could be your suffix of choice. By doing so, your runtime will successfully define all tags with its own version.
 You'll start using all tags with the suffix from here on, for example: `ui5-button-cbc` instead of `ui5-button`.
 
 See [Scoping](../Scoping.md) for details.
 
 ### Set **resource sharing policy**
 
 ```js
 import { setSharedResourcePolicy } from "@ui5/webcomponents-base/dist/SharedResources.js";
 import SharedResourceReusePolicy from "@ui5/webcomponents-base/dist/types/SharedResourceReusePolicy.js";
 import SharedResourceReuseType from "@ui5/webcomponents-base/dist/types/SharedResourceType.js";
 setSharedResourcePolicy(SharedResourceReuseType.SVGIcons, SharedResourceReusePolicy.OnlyNewer);
 setSharedResourcePolicy(SharedResourceReuseType.ThemeProperties, SharedResourceReusePolicy.OnlyNewer);
 ```
 
 **Note:** The default settings are recommended, so usually you don't need to change these.
 
 There are currently two types of resources that can be configured: **SVG Icons** and **Theme Properties**.
 
 #### 1. SVGIcons:
 
 You can configure whether and under what conditions your library/micro frontend is going to reuse icons, already registered by other libraries or the app itself.
 
  - **Never**: register icons *locally* (do not use the shared resource registry `<ui5-shared-resources></ui5-shared-resources>`). Will never reuse icons from other runtimes, and other runtimes cannot reuse icons by this runtime either.
  - **Always (default setting)**: register icons in the *shared resource registry*, unless already registered. If an icon is already registered, it will be reused.
  - **OnlyNewer**: register icons in the *shared resource registry*. If an icon is already registered, it will be reused only if created by a runtime of the same version or newer. Otherwise it will be overwritten. 
  
 #### 2. ThemeProperties:
 
 The **ThemeProperties** resource refers to the style tags with CSS Variables for a certain package, f.e.: `<style type="text/css" data-ui5-theme-properties="@ui5/webcomponents-theme-base"></style>`.
 You can configure how your library/micro frontend should react when it encounters CSS Variables, already registered by other libraries or the app itself *for the same theme*.
 
  - **Never**: style tags with CSS Variables, created by other runtimes, will never be reused. They will always be overwritten with the CSS Variables of the current runtime, regardless of version.
  - **Always**: style tags with CSS Variables, created by other runtimes, will always be reused, even if created by an older runtime.
  - **OnlyNewer (default setting)**: style tags with CSS Variables, created by other runtimes, will be reused only if created by a runtime of the same version or newer. Otherwise, their content will be overwritten with the CSS Variables of the current runtime.
 
  **Important:** You can define how you want your library/micro frontend to act regarding shared resources, but you cannot control other libraries/micro frontends or the app.

  ### Declare **OpenUI5 support** (if relevant)
  
  ```js
  import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
  ```
  
  [OpenUI5](https://openui5.org/) is an open source UI framework from the same product family as UI5 Web Components. If your library/micro frontend will be used on HTML pages that already run OpenUI5,
  you might want to enable OpenUI5 support. For the benefits, see [OpenUI5 integration](../Public%20Module%20Imports.md#6-openui5-integration) 
  
  ### Treat configuration settins as read-only
  
  In order to provide [configuration](../Configuration.md) settings, applications use the following ```<script>``` element in their HTML page:
  
  ```html
  <script data-ui5-config type="application/json">
  {
  	"language": "ja",
  	"calendarType": "Japanese",
  	"formatSettings": {
  		"firstDayOfWeek": 0
  	},
  	"theme": "sap_belize_hcb"
  }
  </script>
  ```
  
  For most of these settings there are both read/write APIs, for example:
  
  ```js
  import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
  import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
  ```
  
  which let you not only read, but also change these settings at runtime. 
  
  Usually it's the application's responsibility to set the global configuration settings and libraries/micro frontends should normally just read them, but not try to change them.
  
  Examples of unwanted side effects:
   - If your library sets `language` to a value, different than the one in the global configuration, some parts of the HTML page will appear in a different language.
   - If your library sets `theme` to a different value, this will replace the content of the Theme Properties style tags with CSS Variables for the newly-set theme, making unintentional parts of the HTML page switch to that theme as well.
   
  Therefore the best practice for libraries is to treat configuration as read only and leave changing/setting it to the application.  
